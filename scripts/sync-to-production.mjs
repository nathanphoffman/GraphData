// Syncs ranking items and weigh-ins between the local database and the live site, in both directions.
// For a row on both sides with different values, the one changed most recently wins. A row only on one side is copied to the other.
// Nothing is ever deleted, so a row you deleted on one side comes back from the other.
//
//   node scripts/sync-to-production.mjs [--dry-run] [--prefer local|remote]
//
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD (just reads them from .env). --prefer settles rows that differ but have the same
// change time, which is every difference the first time you sync (older rows have no time yet).
import { db } from "../server/db.js";
import "../server/board-games.js";
import "../server/rankings.js";
import "../server/weights.js";
import { connectToProd } from "./prod.mjs";

const dryRun = process.argv.includes("--dry-run");
const preferAt = process.argv.indexOf("--prefer");
const prefer = preferAt === -1 ? undefined : process.argv[preferAt + 1];

if (prefer !== undefined && prefer !== "local" && prefer !== "remote") {
  console.error("--prefer must be local or remote.");
  process.exit(1);
}

const call = await connectToProd();

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

// Board games, matched by title and release year. There are thousands, so they go in batches and only a summary is printed.
const GAME_BATCH = 500;
const gameKey = (game) => `${game.title}|${game.releaseDate}`;
const sameRatings = (first, second) => ["average", "weight", "num", "rank"].every((field) => first[field] === second[field]);

const { data: liveGames } = await call("GET", "/api/board-games/export");
const remoteGames = new Map(liveGames.games.map((game) => [gameKey(game), game]));
const localGames = db.prepare("SELECT title, release_date AS releaseDate, average, weight, num, rank, pulled_at AS pulledAt, updated_at AS updatedAt FROM board_games").all();
const [toSend, toSave] = [[], []];

for (const mine of localGames) {
  const theirs = remoteGames.get(gameKey(mine));
  remoteGames.delete(gameKey(mine));

  if (!theirs) toSend.push(mine);
  else if (sameRatings(mine, theirs)) stats.same++;
  else if (mine.updatedAt !== theirs.updatedAt) (mine.updatedAt > theirs.updatedAt ? toSend : toSave).push(mine.updatedAt > theirs.updatedAt ? mine : theirs);
  else if (prefer) (prefer === "local" ? toSend : toSave).push(prefer === "local" ? mine : theirs);
  else {
    stats.conflicts++;
    console.log(`CONFLICT (differs, same change time): board game ${gameKey(mine)}`);
  }
}
toSave.push(...remoteGames.values());

const saveGame = db.prepare("INSERT OR REPLACE INTO board_games (title, release_date, average, weight, num, rank, pulled_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
for (let start = 0; start < toSend.length && !dryRun; start += GAME_BATCH) {
  const batch = toSend.slice(start, start + GAME_BATCH);
  try {
    await call("PUT", "/api/board-games/bulk", { games: batch });
  } catch (error) {
    stats.failed += batch.length;
    console.error(`FAILED: ${batch.length} board games from ${batch[0].title}: ${error.message}`);
    toSend.length = 0;
    break;
  }
}
if (!dryRun) {
  db.exec("BEGIN");
  for (const game of toSave) saveGame.run(game.title, game.releaseDate, game.average, game.weight, game.num, game.rank, game.pulledAt, game.updatedAt);
  db.exec("COMMIT");
}
stats.pushed += toSend.length;
stats.pulled += toSave.length;
console.log(`${dryRun ? "would be " : ""}board games: ${toSend.length} sent, ${toSave.length} brought here`);

console.log(`${dryRun ? "Dry run: " : ""}${stats.pushed} sent to the live site, ${stats.pulled} brought here, ${stats.same} already the same, ${stats.conflicts} conflicts, ${stats.failed} failed.`);
if (stats.conflicts) console.log("Conflicts have the same change time but different values. Run again with --prefer local or --prefer remote to settle them.");
