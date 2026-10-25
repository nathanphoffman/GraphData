import { mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

const DB_PATH = process.env.DB_PATH ?? "data/graphdata.db";
const SEED_PATH = "data/weight-journey/weight-journey.json";

mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);

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
export function getWeights() {
  const unit = db.prepare("SELECT value FROM settings WHERE key = 'unit'").get()?.value ?? "lb";
  const weights = db.prepare("SELECT date, weight FROM weights ORDER BY date").all().map((row) => [row.date, row.weight]);

  return { unit, weights };
}
