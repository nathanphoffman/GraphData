// Syncs ranking items (values and planned features), weigh-ins and blood pressure readings between the local database and the live site, in both directions.
// For a row on both sides with different values, the one changed most recently wins. A row only on one side is copied to the other.
// Nothing is ever deleted, so a row you deleted on one side comes back from the other. A renamed ranking item is the exception:
// the rename is recorded and carried across, so the item is renamed on the other side instead of coming back under its old name.
//
//   node scripts/sync-to-production.mjs [--dry-run] [--prefer local|remote]
//
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD (just reads them from .env). --prefer settles rows that differ but have the same
// change time, which is every difference the first time you sync (older rows have no time yet).
import { db } from "../server/db.js";
import "../server/blood-pressure.js";
import "../server/board-games.js";
import { renameRankingItem } from "../server/rankings.js";
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

const stats = { pushed: 0, pulled: 0, same: 0, conflicts: 0, failed: 0, renamed: 0 };

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
let { data: live } = await call("GET", "/api/rankings");
let liveRankings = new Map(live.rankings.map((ranking) => [ranking.id, ranking.items]));

if ([...liveRankings.values()].some((items) => items.some((item) => item.updatedAt === undefined))) {
  console.error("The live site does not track change times yet. Deploy this version first, then sync.");
  process.exit(1);
}

if ([...liveRankings.values()].some((items) => items.some((item) => item.features === undefined))) {
  console.error("The live site does not track planned features yet. Deploy this version first, then sync.");
  process.exit(1);
}

if (live.rankings.some((ranking) => ranking.renames === undefined)) {
  console.error("The live site does not track renames yet. Deploy this version first, then sync.");
  process.exit(1);
}

/**
 * Carry one rename to the other side. An item still under the old name there, last changed before the rename, is renamed;
 * when the new name already exists there too, the old one is removed instead. Anything newer than the rename is left alone.
 */
async function applyRename(label, rename, items, renameThere, removeThere) {
  const old = items.get(rename.oldName);

  if (!old || old.at >= rename.at) return;
  const action = items.has(rename.newName) ? "removed (renamed earlier)" : "renamed";

  try {
    if (!dryRun) await (items.has(rename.newName) ? removeThere(rename.oldName) : renameThere(rename));
    stats.renamed++;
    console.log(`${dryRun ? "would be " : ""}${action}: ${label} ${rename.oldName} -> ${rename.newName}`);
  } catch (error) {
    stats.failed++;
    console.error(`FAILED: rename ${label} ${rename.oldName}: ${error.message}`);
  }
}

const localRenames = db.prepare(
  "SELECT old_name AS oldName, new_name AS newName, renamed_at AS at FROM ranking_renames WHERE ranking_id = ? ORDER BY renamed_at",
);

const localItemTimes = db.prepare("SELECT name, updated_at AS at FROM ranking_items WHERE ranking_id = ?");

// Renames first, in both directions, so the item comparison below sees the same names on both sides.
for (const liveRanking of live.rankings) {
  const { id } = liveRanking;
  const liveTimes = new Map(liveRanking.items.map((item) => [item.name, { at: item.updatedAt }]));
  const localTimes = new Map(localItemTimes.all(id).map((item) => [item.name, item]));

  for (const rename of localRenames.all(id))
    await applyRename(
      `${id} /`,
      rename,
      liveTimes,
      ({ oldName, newName, at }) =>
        call("PUT", `/api/rankings/${id}/items/${encodeURIComponent(oldName)}/name`, { name: newName, updatedAt: at }),
      (oldName) => call("DELETE", `/api/rankings/${id}/items/${encodeURIComponent(oldName)}`),
    );

  for (const rename of liveRanking.renames)
    await applyRename(
      `${id} /`,
      rename,
      localTimes,
      ({ oldName, newName, at }) => renameRankingItem(id, oldName, newName, at),
      (oldName) => db.prepare("DELETE FROM ranking_items WHERE ranking_id = ? AND name = ?").run(id, oldName),
    );
}

// The names may have changed on both sides, so fetch the live items again before comparing.
if (stats.renamed && !dryRun) {
  ({ data: live } = await call("GET", "/api/rankings"));
  liveRankings = new Map(live.rankings.map((ranking) => [ranking.id, ranking.items]));
}

const updateItem = db.prepare(
  "UPDATE ranking_items SET values_json = ?, features_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?",
);

const insertItem = db.prepare(
  "INSERT INTO ranking_items (ranking_id, position, name, values_json, features_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
);

const columnCount = db.prepare("SELECT COUNT(*) AS count FROM ranking_columns WHERE ranking_id = ?");

for (const { id } of db.prepare("SELECT id FROM rankings").all()) {
  if (!liveRankings.has(id)) {
    console.error(`SKIPPED: ranking ${id} does not exist on the live site yet (deploy first)`);

    continue;
  }

  // An item's values and planned features change together, so they are compared and copied as one row.
  const rows = (items) =>
    new Map(
      items.map((item) => [item.name, { value: { values: item.values, features: item.features }, at: item.updatedAt }]),
    );

  const localItems = db
    .prepare("SELECT name, values_json, features_json, updated_at FROM ranking_items WHERE ranking_id = ?")
    .all(id);

  await reconcile(
    `${id} /`,
    rows(
      localItems.map((item) => ({
        name: item.name,
        values: JSON.parse(item.values_json),
        features: JSON.parse(item.features_json),
        updatedAt: item.updated_at,
      })),
    ),
    rows(liveRankings.get(id)),
    (name, row) =>
      call("PUT", `/api/rankings/${id}/items/${encodeURIComponent(name)}`, {
        values: row.value.values,
        features: row.value.features,
        updatedAt: row.at,
      }),
    (name, row) => {
      if (row.value.values.length !== columnCount.get(id).count)

        throw new Error("it has a different number of columns than the local ranking");
      const [values, features] = [JSON.stringify(row.value.values), JSON.stringify(row.value.features)];

      if (updateItem.run(values, features, row.at, id, name).changes) return;

      const { next } = db
        .prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM ranking_items WHERE ranking_id = ?")
        .get(id);
      insertItem.run(id, next, name, values, features, row.at);
    },
  );
}

/** The labels of a ranking's rated columns, heaviest first; this order is the header order on the page. */
const headerOrder = (columns) =>
  columns
    .filter((column) => column.weight !== null && column.weight !== undefined)
    .sort((first, second) => second.weight - first.weight)
    .map((column) => column.label);

// Header order is not timestamped, so the local order always replaces the live one (reordering on the live site is overwritten).
for (const liveRanking of live.rankings) {
  const localColumns = db.prepare("SELECT label, weight FROM ranking_columns WHERE ranking_id = ?").all(liveRanking.id);
  const order = headerOrder(localColumns);

  if (JSON.stringify(order) === JSON.stringify(headerOrder(liveRanking.columns))) continue;

  try {
    if (!dryRun) await call("PUT", `/api/rankings/${liveRanking.id}/weights`, { order });
    stats.pushed++;
    console.log(`${dryRun ? "would be " : ""}pushed (header order): ${liveRanking.id}`);
  } catch (error) {
    stats.failed++;
    console.error(`FAILED: header order ${liveRanking.id}: ${error.message}`);
  }
}

// Weigh-ins, matched by date.
const { data: liveWeights } = await call("GET", "/api/weights");

if (liveWeights.updatedAt === undefined) {
  console.error("The live site does not track change times yet. Deploy this version first, then sync.");
  process.exit(1);
}

await reconcile(
  "weight",
  new Map(
    db
      .prepare("SELECT date, weight, updated_at FROM weights")
      .all()
      .map((row) => [row.date, { value: row.weight, at: row.updated_at }]),
  ),
  new Map(liveWeights.weights.map(([date, weight]) => [date, { value: weight, at: liveWeights.updatedAt[date] ?? 0 }])),
  (date, row) => call("PUT", `/api/weights/${date}`, { weight: row.value, updatedAt: row.at }),
  (date, row) =>
    db
      .prepare("INSERT OR REPLACE INTO weights (date, weight, updated_at) VALUES (?, ?, ?)")
      .run(date, row.value, row.at),
);

// Blood pressure readings, matched by date. Skipped until the live site has the blood pressure routes.
const PRESSURE_FIELDS = ["firstTop", "firstBottom", "secondTop", "secondBottom"];
const livePressure = await call("GET", "/api/blood-pressure").catch(() => null);

if (!livePressure) console.error("The live site has no blood pressure yet. Deploy this version first, then sync again.");
else

  await reconcile(
    "blood pressure",
    new Map(
      db
        .prepare("SELECT date, first_top, first_bottom, second_top, second_bottom, updated_at FROM blood_pressure")
        .all()
        .map((row) => [row.date, { value: [row.first_top, row.first_bottom, row.second_top, row.second_bottom], at: row.updated_at }]),
    ),
    new Map(
      livePressure.data.readings.map(([date, ...values]) => [date, { value: values, at: livePressure.data.updatedAt[date] ?? 0 }]),
    ),
    (date, row) =>
      call("PUT", `/api/blood-pressure/${date}`, {
        ...Object.fromEntries(PRESSURE_FIELDS.map((field, index) => [field, row.value[index]])),
        updatedAt: row.at,
      }),
    (date, row) =>
      db
        .prepare(
          "INSERT OR REPLACE INTO blood_pressure (date, first_top, first_bottom, second_top, second_bottom, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .run(date, ...row.value, row.at),
  );

// Board games, matched by title and release year. There are thousands, so they go in batches and only a summary is printed.
const GAME_BATCH = 500;

const gameKey = (game) => `${game.title}|${game.releaseDate}`;

const sameRatings = (first, second) =>
  ["average", "weight", "num", "rank"].every((field) => first[field] === second[field]);

let liveGames;

try {
  ({ data: liveGames } = await call("GET", "/api/board-games/export"));
} catch (error) {
  if (error.message !== "Not found") throw error;
  console.error("SKIPPED: the live site has no board games yet (deploy this version first, then sync again)");
}

if (liveGames) {
  const remoteGames = new Map(liveGames.games.map((game) => [gameKey(game), game]));
  const localGames = db
    .prepare(
      "SELECT title, release_date AS releaseDate, average, weight, num, rank, pulled_at AS pulledAt, updated_at AS updatedAt FROM board_games",
    )
    .all();
  const [toSend, toSave] = [[], []];

  for (const mine of localGames) {
    const theirs = remoteGames.get(gameKey(mine));
    remoteGames.delete(gameKey(mine));

    if (!theirs) toSend.push(mine);
    else if (sameRatings(mine, theirs)) stats.same++;
    else if (mine.updatedAt !== theirs.updatedAt)
      (mine.updatedAt > theirs.updatedAt ? toSend : toSave).push(mine.updatedAt > theirs.updatedAt ? mine : theirs);
    else if (prefer) (prefer === "local" ? toSend : toSave).push(prefer === "local" ? mine : theirs);
    else {
      stats.conflicts++;
      console.log(`CONFLICT (differs, same change time): board game ${gameKey(mine)}`);
    }
  }

  toSave.push(...remoteGames.values());

  const saveGame = db.prepare(
    "INSERT OR REPLACE INTO board_games (title, release_date, average, weight, num, rank, pulled_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  );

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

    for (const game of toSave)
      saveGame.run(
        game.title,
        game.releaseDate,
        game.average,
        game.weight,
        game.num,
        game.rank,
        game.pulledAt,
        game.updatedAt,
      );

    db.exec("COMMIT");
  }

  stats.pushed += toSend.length;
  stats.pulled += toSave.length;
  console.log(`${dryRun ? "would be " : ""}board games: ${toSend.length} sent, ${toSave.length} brought here`);
}

console.log(
  `${dryRun ? "Dry run: " : ""}${stats.pushed} sent to the live site, ${stats.pulled} brought here, ${stats.renamed} renamed, ${stats.same} already the same, ${stats.conflicts} conflicts, ${stats.failed} failed.`,
);

if (stats.conflicts)
  console.log(
    "Conflicts have the same change time but different values. Run again with --prefer local or --prefer remote to settle them.",
  );
