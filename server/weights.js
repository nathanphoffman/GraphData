import { readFileSync } from "node:fs";
import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, sendJson } from "./http.js";

const SEED_PATH = "data/weight-journey/weight-journey.json";
const MAX_WEIGHT = 2000;

db.exec(`
  CREATE TABLE IF NOT EXISTS weights (date TEXT PRIMARY KEY, weight REAL NOT NULL);
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);

/** On a brand new database, load the weigh-ins from the JSON file. Placeholder rows (weight 0) are skipped. */
function seed() {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM weights").get();
  if (count > 0) return;

  const { unit, weights } = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const insert = db.prepare("INSERT INTO weights (date, weight) VALUES (?, ?)");
  db.exec("BEGIN");
  for (const [date, weight] of weights) if (weight > 0) insert.run(date, weight);
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('unit', ?)").run(unit);
  db.exec("COMMIT");
  console.log(`Seeded ${weights.filter(([, weight]) => weight > 0).length} weigh-ins from ${SEED_PATH}`);
}

seed();

/** Same shape as weight-journey.json: { unit, weights: [[date, weight], ...] } oldest first. */
function getWeights() {
  const unit = db.prepare("SELECT value FROM settings WHERE key = 'unit'").get()?.value ?? "lb";
  const weights = db.prepare("SELECT date, weight FROM weights ORDER BY date").all().map((row) => [row.date, row.weight]);

  return { unit, weights };
}

/** A real calendar date written YYYY-MM-DD. */
function validDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && new Date(`${date}T00:00:00Z`).toISOString().startsWith(date);
}

export const weightRoutes = [
  {
    method: "GET",
    path: "/api/weights",
    handler: (_request, response) => sendJson(response, 200, getWeights()),
  },
  // Adds the weigh-in for a date, or changes it when the date already has one.
  {
    method: "PUT",
    path: "/api/weights/:date",
    handler: async (request, response, { date }) => {
      requireUser(request);
      const { weight } = await readJson(request);
      if (!validDate(date)) throw new HttpError(400, "Date must be a real date like 2026-10-25");
      if (typeof weight !== "number" || !(weight > 0 && weight <= MAX_WEIGHT)) throw new HttpError(400, `Weight must be a number up to ${MAX_WEIGHT}`);

      db.prepare("INSERT OR REPLACE INTO weights (date, weight) VALUES (?, ?)").run(date, weight);
      sendJson(response, 200, { date, weight });
    },
  },
  {
    method: "DELETE",
    path: "/api/weights/:date",
    handler: (request, response, { date }) => {
      requireUser(request);
      const { changes } = db.prepare("DELETE FROM weights WHERE date = ?").run(date);
      if (!changes) throw new HttpError(404, "No weigh-in on that date");

      sendJson(response, 200, { date });
    },
  },
];
