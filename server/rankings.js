import { readFileSync, readdirSync } from "node:fs";
import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, readStamp, sendJson } from "./http.js";

// One JSON file per ranking: { id, title, columns, items }. The tabs follow the file names.
const SEED_DIR = "data/top-rankings";
const MAX_RATING = 5;
const MAX_TEXT = 80;
const MAX_FEATURES = 50;
const MAX_FEATURE_TEXT = 200;

// Everything a column can have besides its label, with its database type. A curve is an object, kept as JSON text.
const OPTIONAL_FIELDS = { short: "TEXT", weight: "REAL", best: "REAL", curve: "TEXT" };
const COLUMN_FIELDS = ["label", ...Object.keys(OPTIONAL_FIELDS)];
const placeholders = (count) => Array(count).fill("?").join(", ");

/** The ranking's grade curve as JSON text for the database, or null to use the default. */
const gradeCurveText = (ranking) => (ranking.gradeCurve === undefined ? null : JSON.stringify(ranking.gradeCurve));

/** A column as the values for its database fields, in COLUMN_FIELDS order. */
const columnToRow = (column) => COLUMN_FIELDS.map((field) => (column[field] === undefined ? null : field === "curve" ? JSON.stringify(column.curve) : column[field]));

/** A database row back to a column, leaving out the fields it does not have. */
const rowToColumn = (row) => Object.fromEntries(COLUMN_FIELDS.filter((field) => row[field] !== null).map((field) => [field, field === "curve" ? JSON.parse(row.curve) : row[field]]));

// A column with a weight is rated; one without is just information. Item values line up with the columns.
db.exec(`
  CREATE TABLE IF NOT EXISTS rankings (id TEXT PRIMARY KEY, title TEXT NOT NULL, position INTEGER NOT NULL, grade_curve TEXT);
  CREATE TABLE IF NOT EXISTS ranking_columns (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, label TEXT NOT NULL,
    ${Object.entries(OPTIONAL_FIELDS).map(([field, type]) => `${field} ${type}`).join(", ")},
    PRIMARY KEY (ranking_id, position)
  );
  CREATE TABLE IF NOT EXISTS ranking_items (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, name TEXT NOT NULL, values_json TEXT NOT NULL, updated_at INTEGER NOT NULL DEFAULT 0, features_json TEXT NOT NULL DEFAULT '[]',
    PRIMARY KEY (ranking_id, position)
  );
`);

// Databases made before a field existed get it added; seed() fills it in.
const existingFields = db.prepare("PRAGMA table_info(ranking_columns)").all().map((column) => column.name);
for (const [field, type] of Object.entries(OPTIONAL_FIELDS)) {
  if (!existingFields.includes(field)) db.exec(`ALTER TABLE ranking_columns ADD COLUMN ${field} ${type}`);
}

// Databases made before the grade curve existed get its column added.
if (!db.prepare("PRAGMA table_info(rankings)").all().some((column) => column.name === "grade_curve")) db.exec("ALTER TABLE rankings ADD COLUMN grade_curve TEXT");

// Databases made before items had a change time get it added; older items count as changed at time 0.
if (!db.prepare("PRAGMA table_info(ranking_items)").all().some((column) => column.name === "updated_at")) {
  db.exec("ALTER TABLE ranking_items ADD COLUMN updated_at INTEGER NOT NULL DEFAULT 0");
}

// Databases made before items had planned features get that added; every item starts with none.
if (!db.prepare("PRAGMA table_info(ranking_items)").all().some((column) => column.name === "features_json")) {
  db.exec("ALTER TABLE ranking_items ADD COLUMN features_json TEXT NOT NULL DEFAULT '[]'");
}

const insertColumn = db.prepare(`INSERT INTO ranking_columns (ranking_id, position, ${COLUMN_FIELDS.join(", ")}) VALUES (?, ?, ${placeholders(COLUMN_FIELDS.length)})`);
const updateColumn = db.prepare(`UPDATE ranking_columns SET ${COLUMN_FIELDS.map((field) => `${field} = ?`).join(", ")} WHERE ranking_id = ? AND position = ?`);

/** Rename database columns the JSON file marks with `was` (the old label), keeping every item's value. A label the database already has is left alone. */
function renameColumns(ranking) {
  const has = db.prepare("SELECT 1 FROM ranking_columns WHERE ranking_id = ? AND label = ?");
  for (const column of ranking.columns) {
    if (column.was === undefined || has.get(ranking.id, column.label)) continue;
    db.prepare("UPDATE ranking_columns SET label = ? WHERE ranking_id = ? AND label = ?").run(column.label, ranking.id, column.was);
  }
}

/** Delete the database columns the JSON file no longer has (matched by label), along with that value in every item. */
function dropRemovedColumns(ranking) {
  const keep = new Set(ranking.columns.map((column) => column.label));
  const current = db.prepare("SELECT position, label FROM ranking_columns WHERE ranking_id = ? ORDER BY position").all(ranking.id);
  const removed = current.filter((column) => !keep.has(column.label)).map((column) => column.position);
  if (!removed.length) return;

  db.exec("BEGIN");
  const deleteColumn = db.prepare("DELETE FROM ranking_columns WHERE ranking_id = ? AND position = ?");
  for (const position of removed) deleteColumn.run(ranking.id, position);

  // Close the gaps, lowest first so a column never moves onto one that is still there.
  current.filter((column) => !removed.includes(column.position)).forEach((column, index) => {
    db.prepare("UPDATE ranking_columns SET position = ? WHERE ranking_id = ? AND position = ?").run(index, ranking.id, column.position);
  });

  const items = db.prepare("SELECT position, values_json FROM ranking_items WHERE ranking_id = ?").all(ranking.id);
  items.forEach((item) => {
    const values = JSON.parse(item.values_json).filter((_value, index) => !removed.includes(index));
    db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND position = ?").run(JSON.stringify(values), ranking.id, item.position);
  });
  db.exec("COMMIT");
  console.log(`Removed column(s) ${removed.join(", ")} from ranking "${ranking.title}"`);
}

/** Add columns the JSON file has after the database's last one, giving every item the value the file has for it (matched by name). */
function addNewColumns(ranking) {
  const current = db.prepare("SELECT label FROM ranking_columns WHERE ranking_id = ? ORDER BY position").all(ranking.id);
  const added = ranking.columns.slice(current.length);
  if (!added.length || !current.every((column, index) => column.label === ranking.columns[index].label)) return;

  const fileValues = new Map(ranking.items.map((item) => [item.name, item.values]));
  db.exec("BEGIN");
  added.forEach((column, offset) => insertColumn.run(ranking.id, current.length + offset, ...columnToRow(column)));
  for (const item of db.prepare("SELECT position, name, values_json FROM ranking_items WHERE ranking_id = ?").all(ranking.id)) {
    const extra = added.map((_column, offset) => fileValues.get(item.name)?.[current.length + offset] ?? null);
    db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND position = ?")
      .run(JSON.stringify([...JSON.parse(item.values_json), ...extra]), ranking.id, item.position);
  }
  db.exec("COMMIT");
  console.log(`Added ${added.length} column(s) to ranking "${ranking.title}"`);
}

/**
 * Load any ranking file the database does not have yet. For rankings the database already has, the title, order, grade curve and
 * columns (names, weights and curves) are re-read from the file every start, since they are edited there; the items stay as the database has them.
 */
function seed() {
  const files = readdirSync(SEED_DIR).filter((file) => file.endsWith(".json")).sort();
  const exists = db.prepare("SELECT 1 FROM rankings WHERE id = ?");
  const insertRanking = db.prepare("INSERT INTO rankings (id, title, position, grade_curve) VALUES (?, ?, ?, ?)");
  const updateRanking = db.prepare("UPDATE rankings SET title = ?, position = ?, grade_curve = ? WHERE id = ?");
  const columnCount = db.prepare("SELECT COUNT(*) AS count FROM ranking_columns WHERE ranking_id = ?");
  const insertItem = db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json) VALUES (?, ?, ?, ?)");

  files.forEach((file, position) => {
    const ranking = JSON.parse(readFileSync(`${SEED_DIR}/${file}`, "utf8"));

    if (exists.get(ranking.id)) {
      updateRanking.run(ranking.title, position, gradeCurveText(ranking), ranking.id);
      renameColumns(ranking);
      dropRemovedColumns(ranking);
      addNewColumns(ranking);

      // Items line up with the columns by position, so a different number of columns cannot be applied safely.
      if (columnCount.get(ranking.id).count !== ranking.columns.length) {
        console.warn(`Ranking "${ranking.title}" has a different number of columns than the database, so its columns were not updated`);
        return;
      }

      ranking.columns.forEach((column, index) => updateColumn.run(...columnToRow(column), ranking.id, index));
      return;
    }

    db.exec("BEGIN");
    insertRanking.run(ranking.id, ranking.title, position, gradeCurveText(ranking));
    ranking.columns.forEach((column, index) => insertColumn.run(ranking.id, index, ...columnToRow(column)));
    ranking.items.forEach((item, index) => insertItem.run(ranking.id, index, item.name, JSON.stringify(item.values)));
    db.exec("COMMIT");
    console.log(`Seeded ranking "${ranking.title}" with ${ranking.items.length} items from ${SEED_DIR}/${file}`);
  });
}

seed();

/** { rankings: [{ id, title, columns, items }] }, each ranking shaped like its JSON file. */
function getRankings() {
  const columns = db.prepare(`SELECT ${COLUMN_FIELDS.join(", ")} FROM ranking_columns WHERE ranking_id = ? ORDER BY position`);
  const items = db.prepare("SELECT name, values_json, updated_at, features_json FROM ranking_items WHERE ranking_id = ? ORDER BY position");

  const rankings = db.prepare("SELECT id, title, grade_curve FROM rankings ORDER BY position").all().map(({ id, title, grade_curve }) => ({
    id,
    title,
    ...(grade_curve === null ? {} : { gradeCurve: JSON.parse(grade_curve) }),
    columns: columns.all(id).map(rowToColumn),
    items: items.all(id).map(({ name, values_json, updated_at, features_json }) => ({ name, values: JSON.parse(values_json), updatedAt: updated_at, features: JSON.parse(features_json) })),
  }));

  return { rankings };
}

/** Check an item's values against the ranking's columns: ratings are numbers from 0 to 5, information is a number, text or empty. */
function checkValues(rankingId, name, values) {
  const columns = db.prepare("SELECT label, weight, curve FROM ranking_columns WHERE ranking_id = ? ORDER BY position").all(rankingId);

  if (!columns.length) throw new HttpError(404, "No such ranking");
  if (typeof name !== "string" || !name.trim() || name.length > MAX_TEXT) throw new HttpError(400, `Name must be 1 to ${MAX_TEXT} characters`);
  if (!Array.isArray(values) || values.length !== columns.length) throw new HttpError(400, `Expected ${columns.length} values`);

  columns.forEach(({ label, weight, curve }, index) => {
    const value = values[index];

    if (curve !== null && !(typeof value === "number" && Number.isFinite(value))) throw new HttpError(400, `${label} must be a number`);
    if (weight !== null && curve === null && !(typeof value === "number" && value >= 0 && value <= MAX_RATING)) throw new HttpError(400, `${label} must be a number from 0 to ${MAX_RATING}`);
    if (weight === null && !(value === null || typeof value === "number" || (typeof value === "string" && value.length <= MAX_TEXT))) throw new HttpError(400, `${label} must be a number, short text or empty`);
  });
}

/** Check a list of planned features: an array of short, non-empty text. */
function checkFeatures(features) {
  if (!Array.isArray(features) || features.length > MAX_FEATURES) throw new HttpError(400, `Features must be a list of up to ${MAX_FEATURES}`);

  for (const feature of features) {
    if (typeof feature !== "string" || !feature.trim() || feature.length > MAX_FEATURE_TEXT) throw new HttpError(400, `Each feature must be 1 to ${MAX_FEATURE_TEXT} characters`);
  }
}

export const rankingRoutes = [
  {
    method: "GET",
    path: "/api/rankings",
    handler: (_request, response) => sendJson(response, 200, getRankings()),
  },
  // Adds the item with this name, or changes its values when the ranking already has it.
  {
    method: "PUT",
    path: "/api/rankings/:id/items/:name",
    handler: async (request, response, { id, name }) => {
      requireUser(request);
      const { values, updatedAt } = await readJson(request);
      checkValues(id, name, values);
      const stamp = readStamp(updatedAt);

      const changed = db.prepare("UPDATE ranking_items SET values_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?").run(JSON.stringify(values), stamp, id, name);
      if (!changed.changes) {
        const { next } = db.prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM ranking_items WHERE ranking_id = ?").get(id);
        db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json, updated_at) VALUES (?, ?, ?, ?, ?)").run(id, next, name, JSON.stringify(values), stamp);
      }
      sendJson(response, 200, { name, values, updatedAt: stamp });
    },
  },
  // Replaces the list of planned features of an item that already exists.
  {
    method: "PUT",
    path: "/api/rankings/:id/items/:name/features",
    handler: async (request, response, { id, name }) => {
      requireUser(request);
      const { features } = await readJson(request);
      checkFeatures(features);

      const { changes } = db.prepare("UPDATE ranking_items SET features_json = ? WHERE ranking_id = ? AND name = ?").run(JSON.stringify(features), id, name);
      if (!changes) throw new HttpError(404, "No such item in that ranking");

      sendJson(response, 200, { name, features });
    },
  },
  {
    method: "DELETE",
    path: "/api/rankings/:id/items/:name",
    handler: (request, response, { id, name }) => {
      requireUser(request);
      const { changes } = db.prepare("DELETE FROM ranking_items WHERE ranking_id = ? AND name = ?").run(id, name);
      if (!changes) throw new HttpError(404, "No such item in that ranking");

      sendJson(response, 200, { name });
    },
  },
];
