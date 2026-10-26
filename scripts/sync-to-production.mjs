// Syncs ranking items and weigh-ins between the local database and the live site, in both directions.
// For a row on both sides with different values, the one changed most recently wins. A row only on one side is copied to the other.
// Nothing is ever deleted, so a row you deleted on one side comes back from the other.
//
//   node scripts/sync-to-production.mjs [--dry-run] [--prefer local|remote]
//
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD (just reads them from .env). --prefer settles rows that differ but have the same
// change time, which is every difference the first time you sync (older rows have no time yet).
import { db } from "../server/db.js";
import "../server/rankings.js";
import "../server/weights.js";

const { PROD_URL, PROD_USERNAME, PROD_PASSWORD } = process.env;
const dryRun = process.argv.includes("--dry-run");
const preferAt = process.argv.indexOf("--prefer");
const prefer = preferAt === -1 ? undefined : process.argv[preferAt + 1];

if (!PROD_URL || !PROD_USERNAME || !PROD_PASSWORD) {
  console.error("Set PROD_URL, PROD_USERNAME and PROD_PASSWORD first.");
  process.exit(1);
}
if (prefer !== undefined && prefer !== "local" && prefer !== "remote") {
  console.error("--prefer must be local or remote.");
  process.exit(1);
}

const base = PROD_URL.replace(/\/+$/, "");
let cookie = "";

/** Call the live site's API; throws with the server's message when it says no. */
async function call(method, path, body) {
  const response = await fetch(base + path, {
    method,
    headers: { "Content-Type": "application/json", ...(cookie && { Cookie: cookie }) },
    body: body && JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? data.message ?? `${response.status} ${response.statusText}`);

  return { data, response };
}

const { response: login } = await call("POST", "/api/login", { username: PROD_USERNAME, password: PROD_PASSWORD });
cookie = login.headers.get("set-cookie").split(";")[0];

const stats = { pushed: 0, pulled: 0, same: 0, conflicts: 0, failed: 0 };

/**
 * Compare two sets of rows, each a Map of key to { value, at }, and bring the older or missing side up to date.
 * `send(key, row)` writes a row to the live site and `save(key, row)` writes one to the local database.
 */
async function reconcile(label, local, remote, send, save) {
  for (const key of new Set([...local.keys(), ...remote.keys()])) {
    const [mine, theirs] = [local.get(key), remote.get(key)];
    let direction;

    if (!theirs) direction = "push";
    else if (!mine) direction = "pull";
    else if (JSON.stringify(mine.value) === JSON.stringify(theirs.value)) {
      stats.same++;
      continue;
    } else if (mine.at !== theirs.at) direction = mine.at > theirs.at ? "push" : "pull";
    else if (prefer) direction = prefer === "local" ? "push" : "pull";
    else {
      stats.conflicts++;
      console.log(`CONFLICT (differs, same change time): ${label} ${key}`);
      continue;
    }

    const kind = direction === "push" ? "pushed" : "pulled";
    const row = direction === "push" ? mine : theirs;
    const target = (direction === "push" ? theirs : mine) ? "changed" : "new";
    try {
      if (!dryRun) await (direction === "push" ? send(key, row) : save(key, row));
      stats[kind]++;
      console.log(`${dryRun ? "would be " : ""}${kind} (${target}): ${label} ${key}`);
    } catch (error) {
      stats.failed++;
      console.error(`FAILED: ${label} ${key}: ${error.message}`);
    }
  }
}

// Ranking items, matched by ranking and name.
const { data: live } = await call("GET", "/api/rankings");
const liveRankings = new Map(live.rankings.map((ranking) => [ranking.id, ranking.items]));
if ([...liveRankings.values()].some((items) => items.some((item) => item.updatedAt === undefined))) {
  console.error("The live site does not track change times yet. Deploy this version first, then sync.");
  process.exit(1);
}

const updateItem = db.prepare("UPDATE ranking_items SET values_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?");
const insertItem = db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json, updated_at) VALUES (?, ?, ?, ?, ?)");
const columnCount = db.prepare("SELECT COUNT(*) AS count FROM ranking_columns WHERE ranking_id = ?");

for (const { id } of db.prepare("SELECT id FROM rankings").all()) {
  if (!liveRankings.has(id)) {
    console.error(`SKIPPED: ranking ${id} does not exist on the live site yet (deploy first)`);
    continue;
  }

  const rows = (items) => new Map(items.map((item) => [item.name, { value: item.values, at: item.updatedAt }]));
  const localItems = db.prepare("SELECT name, values_json, updated_at FROM ranking_items WHERE ranking_id = ?").all(id);

  await reconcile(
    `${id} /`,
    rows(localItems.map((item) => ({ name: item.name, values: JSON.parse(item.values_json), updatedAt: item.updated_at }))),
    rows(liveRankings.get(id)),
    (name, row) => call("PUT", `/api/rankings/${id}/items/${encodeURIComponent(name)}`, { values: row.value, updatedAt: row.at }),
    (name, row) => {
      if (row.value.length !== columnCount.get(id).count) throw new Error("it has a different number of columns than the local ranking");
      if (updateItem.run(JSON.stringify(row.value), row.at, id, name).changes) return;

      const { next } = db.prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM ranking_items WHERE ranking_id = ?").get(id);
      insertItem.run(id, next, name, JSON.stringify(row.value), row.at);
    },
  );
}

// Weigh-ins, matched by date.
const { data: liveWeights } = await call("GET", "/api/weights");
if (liveWeights.updatedAt === undefined) {
  console.error("The live site does not track change times yet. Deploy this version first, then sync.");
  process.exit(1);
}

await reconcile(
  "weight",
  new Map(db.prepare("SELECT date, weight, updated_at FROM weights").all().map((row) => [row.date, { value: row.weight, at: row.updated_at }])),
  new Map(liveWeights.weights.map(([date, weight]) => [date, { value: weight, at: liveWeights.updatedAt[date] ?? 0 }])),
  (date, row) => call("PUT", `/api/weights/${date}`, { weight: row.value, updatedAt: row.at }),
  (date, row) => db.prepare("INSERT OR REPLACE INTO weights (date, weight, updated_at) VALUES (?, ?, ?)").run(date, row.value, row.at),
);

console.log(`${dryRun ? "Dry run: " : ""}${stats.pushed} sent to the live site, ${stats.pulled} brought here, ${stats.same} already the same, ${stats.conflicts} conflicts, ${stats.failed} failed.`);
if (stats.conflicts) console.log("Conflicts have the same change time but different values. Run again with --prefer local or --prefer remote to settle them.");
