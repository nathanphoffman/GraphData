// Copies ranking items and weigh-ins from the local database to the live site through its API.
// Matching entries are overwritten with the local version, new ones are added, nothing is ever deleted.
//
//   PROD_URL=https://your-site PROD_USERNAME=... PROD_PASSWORD=... node scripts/sync-to-production.mjs [--dry-run]
import { DatabaseSync } from "node:sqlite";

const { PROD_URL, PROD_USERNAME, PROD_PASSWORD, DB_PATH = "data/graphdata.db" } = process.env;
const dryRun = process.argv.includes("--dry-run");

if (!PROD_URL || !PROD_USERNAME || !PROD_PASSWORD) {
  console.error("Set PROD_URL, PROD_USERNAME and PROD_PASSWORD first.");
  process.exit(1);
}

const base = PROD_URL.replace(/\/+$/, "");
const local = new DatabaseSync(DB_PATH, { readOnly: true });
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

const stats = { added: 0, changed: 0, same: 0, failed: 0 };

/** Send the entries that are new or different on the live site. */
async function sync(label, entries, liveValue, path, bodyOf) {
  for (const [key, value] of entries) {
    const live = liveValue(key);
    if (live !== undefined && JSON.stringify(live) === JSON.stringify(value)) {
      stats.same++;
      continue;
    }

    const kind = live === undefined ? "added" : "changed";
    try {
      if (!dryRun) await call("PUT", path(key), bodyOf(value));
      stats[kind]++;
      console.log(`${dryRun ? "would be " : ""}${kind}: ${label} ${key}`);
    } catch (error) {
      stats.failed++;
      console.error(`FAILED: ${label} ${key}: ${error.message}`);
    }
  }
}

// Ranking items, matched by ranking and name.
const { data: live } = await call("GET", "/api/rankings");
const liveRankings = new Map(live.rankings.map((ranking) => [ranking.id, new Map(ranking.items.map((item) => [item.name, item.values]))]));

for (const { id } of local.prepare("SELECT id FROM rankings").all()) {
  const items = local.prepare("SELECT name, values_json FROM ranking_items WHERE ranking_id = ? ORDER BY position").all(id);
  if (!liveRankings.has(id)) {
    console.error(`SKIPPED: ranking ${id} does not exist on the live site yet (deploy first)`);
    continue;
  }
  await sync(
    `${id} /`,
    items.map((item) => [item.name, JSON.parse(item.values_json)]),
    (name) => liveRankings.get(id).get(name),
    (name) => `/api/rankings/${id}/items/${encodeURIComponent(name)}`,
    (values) => ({ values }),
  );
}

// Weigh-ins, matched by date.
const { data: liveWeights } = await call("GET", "/api/weights");
const liveByDate = new Map(liveWeights.weights);
await sync(
  "weight",
  local.prepare("SELECT date, weight FROM weights ORDER BY date").all().map((row) => [row.date, row.weight]),
  (date) => liveByDate.get(date),
  (date) => `/api/weights/${date}`,
  (weight) => ({ weight }),
);

console.log(`${dryRun ? "Dry run: " : ""}${stats.added} added, ${stats.changed} changed, ${stats.same} already the same, ${stats.failed} failed.`);
