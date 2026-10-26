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
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, label TEXT NOT NULL, short TEXT, weight REAL,
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

/** Load any ranking from the JSON file that the database does not have yet, and fill in short names it is missing. */
function seed() {
  const { rankings } = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const exists = db.prepare("SELECT 1 FROM rankings WHERE id = ?");
  const insertRanking = db.prepare("INSERT INTO rankings (id, title, position) VALUES (?, ?, ?)");
  const insertColumn = db.prepare("INSERT INTO ranking_columns (ranking_id, position, label, short, weight) VALUES (?, ?, ?, ?, ?)");
  const fillShort = db.prepare("UPDATE ranking_columns SET short = ? WHERE ranking_id = ? AND position = ? AND short IS NULL");
  const insertItem = db.prepare("INSERT INTO ranking_items (ranking_id, position, name, values_json) VALUES (?, ?, ?, ?)");

  rankings.forEach((ranking, position) => {
    if (exists.get(ranking.id)) {
      ranking.columns.forEach((column, index) => column.short && fillShort.run(column.short, ranking.id, index));
      return;
    }

    db.exec("BEGIN");
    insertRanking.run(ranking.id, ranking.title, position);
    ranking.columns.forEach((column, index) => insertColumn.run(ranking.id, index, column.label, column.short ?? null, column.weight ?? null));
    ranking.items.forEach((item, index) => insertItem.run(ranking.id, index, item.name, JSON.stringify(item.values)));
    db.exec("COMMIT");
    console.log(`Seeded ranking "${ranking.title}" with ${ranking.items.length} items from ${SEED_PATH}`);
  });
}

seed();

/** Same shape as top-rankings.json: { rankings: [{ id, title, columns, items }] }. */
function getRankings() {
  const columns = db.prepare("SELECT label, short, weight FROM ranking_columns WHERE ranking_id = ? ORDER BY position");
  const items = db.prepare("SELECT name, values_json FROM ranking_items WHERE ranking_id = ? ORDER BY position");

  const rankings = db.prepare("SELECT id, title FROM rankings ORDER BY position").all().map(({ id, title }) => ({
    id,
    title,
    columns: columns.all(id).map(({ label, short, weight }) => ({ label, ...(short === null ? {} : { short }), ...(weight === null ? {} : { weight }) })),
    items: items.all(id).map(({ name, values_json }) => ({ name, values: JSON.parse(values_json) })),
  }));

  return { rankings };
}

/** Check an item's values against the ranking's columns: ratings are numbers from 0 to 5, information is a number, text or empty. */
function checkValues(rankingId, name, values) {
  const columns = db.prepare("SELECT label, weight FROM ranking_columns WHERE ranking_id = ? ORDER BY position").all(rankingId);

  if (!columns.length) throw new HttpError(404, "No such ranking");
  if (typeof name !== "string" || !name.trim() || name.length > MAX_TEXT) throw new HttpError(400, `Name must be 1 to ${MAX_TEXT} characters`);
  if (!Array.isArray(values) || values.length !== columns.length) throw new HttpError(400, `Expected ${columns.length} values`);

  columns.forEach(({ label, weight }, index) => {
    const value = values[index];

    if (weight !== null && !(typeof value === "number" && value >= 0 && value <= MAX_RATING)) throw new HttpError(400, `${label} must be a number from 0 to ${MAX_RATING}`);
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
