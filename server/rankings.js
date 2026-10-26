import { readFileSync } from "node:fs";
import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, sendJson } from "./http.js";

const SEED_PATH = "data/top-rankings/top-rankings.json";
const MAX_RATING = 5;
const MAX_TEXT = 80;

// A column with a weight is rated; one without is just information. Item values line up with the columns.
db.exec(`
  CREATE TABLE IF NOT EXISTS rankings (id TEXT PRIMARY KEY, title TEXT NOT NULL, position INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS ranking_columns (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, label TEXT NOT NULL, short TEXT, weight REAL, best REAL, curve TEXT,
    PRIMARY KEY (ranking_id, position)
  );
  CREATE TABLE IF NOT EXISTS ranking_items (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, name TEXT NOT NULL, values_json TEXT NOT NULL,
    PRIMARY KEY (ranking_id, position)
  );
`);

// Databases made before short names existed get the column added; seed() fills it in.
if (!db.prepare("PRAGMA table_info(ranking_columns)").all().some((column) => column.name === "short")) {
  db.exec("ALTER TABLE ranking_columns ADD COLUMN short TEXT");
}
if (!db.prepare("PRAGMA table_info(ranking_columns)").all().some((column) => column.name === "best")) {
  db.exec("ALTER TABLE ranking_columns ADD COLUMN best REAL");
}
if (!db.prepare("PRAGMA table_info(ranking_columns)").all().some((column) => column.name === "curve")) {
  db.exec("ALTER TABLE ranking_columns ADD COLUMN curve TEXT");
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
  added.forEach((column, offset) => {
    db.prepare("INSERT INTO ranking_columns (ranking_id, position, label, short, weight, best, curve) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(ranking.id, current.length + offset, column.label, column.short ?? null, column.weight ?? null, column.best ?? null, column.curve ?? null);
  });
  for (const item of db.prepare("SELECT position, name, values_json FROM ranking_items WHERE ranking_id = ?").all(ranking.id)) {
    const extra = added.map((_column, offset) => fileValues.get(item.name)?.[current.length + offset] ?? null);
    db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND position = ?")
      .run(JSON.stringify([...JSON.parse(item.values_json), ...extra]), ranking.id, item.position);
  }
  db.exec("COMMIT");
  console.log(`Added ${added.length} column(s) to ranking "${ranking.title}"`);
}

/**
 * Load any ranking from the JSON file that the database does not have yet. For rankings the database already has,
 * the columns (names and weights) are re-read from the file every start, since they are edited there; the items stay as the database has them.
 */
function seed() {
  const { rankings } = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const exists = db.prepare("SELECT 1 FROM rankings WHERE id = ?");
  const insertRanking = db.prepare("INSERT INTO rankings (id, title, position) VALUES (?, ?, ?)");
  const insertColumn = db.prepare("INSERT INTO ranking_columns (ranking_id, position, label, short, weight, best, curve) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const updateColumn = db.prepare("UPDATE ranking_columns SET label = ?, short = ?, weight = ?, best = ?, curve = ? WHERE ranking_id = ? AND position = ?");
  const columnCount = db.prepare("SELECT COUNT(*) AS count FROM ranking_columns WHERE ranking_id = ?");
  const insertItem = db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json) VALUES (?, ?, ?, ?)");

  rankings.forEach((ranking, position) => {
    if (exists.get(ranking.id)) {
      dropRemovedColumns(ranking);
      addNewColumns(ranking);

      // Items line up with the columns by position, so a different number of columns cannot be applied safely.
      if (columnCount.get(ranking.id).count !== ranking.columns.length) {
        console.warn(`Ranking "${ranking.title}" has a different number of columns than the database, so its columns were not updated`);
        return;
      }

      ranking.columns.forEach((column, index) => {
        updateColumn.run(column.label, column.short ?? null, column.weight ?? null, column.best ?? null, column.curve ?? null, ranking.id, index);
      });
      return;
    }

    db.exec("BEGIN");
    insertRanking.run(ranking.id, ranking.title, position);
    ranking.columns.forEach((column, index) => {
      insertColumn.run(ranking.id, index, column.label, column.short ?? null, column.weight ?? null, column.best ?? null, column.curve ?? null);
    });
    ranking.items.forEach((item, index) => {
      insertItem.run(ranking.id, index, item.name, JSON.stringify(item.values));
    });
    db.exec("COMMIT");
    console.log(`Seeded ranking "${ranking.title}" with ${ranking.items.length} items from ${SEED_PATH}`);
  });
}

seed();

/** Same shape as top-rankings.json: { rankings: [{ id, title, columns, items }] }. */
function getRankings() {
  const columns = db.prepare("SELECT label, short, weight, best, curve FROM ranking_columns WHERE ranking_id = ? ORDER BY position");
  const items = db.prepare("SELECT name, values_json FROM ranking_items WHERE ranking_id = ? ORDER BY position");

  const rankings = db.prepare("SELECT id, title FROM rankings ORDER BY position").all().map(({ id, title }) => ({
    id,
    title,
    columns: columns.all(id).map(({ label, short, weight, best, curve }) => ({ label, ...(short === null ? {} : { short }), ...(weight === null ? {} : { weight }), ...(best === null ? {} : { best }), ...(curve === null ? {} : { curve }) })),
    items: items.all(id).map(({ name, values_json }) => ({ name, values: JSON.parse(values_json) })),
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
      const { values } = await readJson(request);
      checkValues(id, name, values);

      const changed = db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND name = ?").run(JSON.stringify(values), id, name);
      if (!changed.changes) {
        const { next } = db.prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM ranking_items WHERE ranking_id = ?").get(id);
        db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json) VALUES (?, ?, ?, ?)").run(id, next, name, JSON.stringify(values));
      }
      sendJson(response, 200, { name, values });
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
