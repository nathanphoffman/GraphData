import { readdirSync, readFileSync } from "node:fs";
import { db } from "../../db.js";
import { COLUMN_FIELDS, columnToRow, gradeCurveText, prepareInsertColumn, prepareUpdateColumn } from "../column_fields.js";
import { addNewColumns, dropRemovedColumns, renameColumns } from "./column_sync.js";
import { prepareRankingTables } from "./schema.js";

// One JSON file per ranking: { id, title, columns, items }. The tabs follow the file names.
const SEED_DIR = "data/top-rankings";

/** Re-apply the file's columns to a ranking the database already has. Reordered weights are kept: the file's weights only apply until the first reorder. */
function updateColumnsFromFile(ranking) {
  const updateColumn = prepareUpdateColumn();
  const custom = db.prepare("SELECT weights_custom FROM rankings WHERE id = ?").get(ranking.id).weights_custom === 1;
  const savedWeights = db
    .prepare("SELECT weight FROM ranking_columns WHERE ranking_id = ? ORDER BY position")
    .all(ranking.id);

  ranking.columns.forEach((column, index) => {
    const row = columnToRow(column);

    if (custom) row[COLUMN_FIELDS.indexOf("weight")] = savedWeights[index].weight;
    updateColumn.run(...row, ranking.id, index);
  });
}

/** Bring a ranking the database already has up to date with its file; the items stay as the database has them. */
function updateExistingRanking(ranking, position) {
  db.prepare("UPDATE rankings SET title = ?, position = ?, grade_curve = ? WHERE id = ?").run(
    ranking.title,
    position,
    gradeCurveText(ranking),
    ranking.id,
  );
  renameColumns(ranking);
  dropRemovedColumns(ranking);
  addNewColumns(ranking);

  // Items line up with the columns by position, so a different number of columns cannot be applied safely.
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM ranking_columns WHERE ranking_id = ?").get(ranking.id);

  if (count !== ranking.columns.length) {
    console.warn(
      `Ranking "${ranking.title}" has a different number of columns than the database, so its columns were not updated`,
    );

    return;
  }

  updateColumnsFromFile(ranking);
}

/** Add a ranking, its columns and its items from the file in one go. */
function insertNewRanking(ranking, position, file) {
  const insertColumn = prepareInsertColumn();
  const insertItem = db.prepare(
    "INSERT INTO ranking_items (ranking_id, position, name, values_json) VALUES (?, ?, ?, ?)",
  );

  db.exec("BEGIN");
  db.prepare("INSERT INTO rankings (id, title, position, grade_curve) VALUES (?, ?, ?, ?)").run(
    ranking.id,
    ranking.title,
    position,
    gradeCurveText(ranking),
  );
  ranking.columns.forEach((column, index) => insertColumn.run(ranking.id, index, ...columnToRow(column)));
  ranking.items.forEach((item, index) => insertItem.run(ranking.id, index, item.name, JSON.stringify(item.values)));
  db.exec("COMMIT");
  console.log(`Seeded ranking "${ranking.title}" with ${ranking.items.length} items from ${SEED_DIR}/${file}`);
}

/**
 * Make sure the tables exist, then load any ranking file the database does not have yet. For rankings the database already has,
 * the title, order, grade curve and columns (names, weights and curves) are re-read from the file every start, since they are edited there.
 */
export function seedRankings() {
  prepareRankingTables();
  const exists = db.prepare("SELECT 1 FROM rankings WHERE id = ?");
  const files = readdirSync(SEED_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort();

  files.forEach((file, position) => {
    const ranking = JSON.parse(readFileSync(`${SEED_DIR}/${file}`, "utf8"));

    if (exists.get(ranking.id)) updateExistingRanking(ranking, position);
    else insertNewRanking(ranking, position, file);
  });
}
