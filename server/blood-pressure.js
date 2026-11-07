import { readFileSync } from "node:fs";
import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, readStamp, sendJson } from "./http.js";
import { validDate } from "./weights.js";

const SEED_PATH = "data/weight-journey/blood-pressure.json";
const MAX_PRESSURE = 400;

/** The four numbers of a day's readings, in the order the JSON file and the database keep them. */
const VALUE_FIELDS = ["firstTop", "firstBottom", "secondTop", "secondBottom"];

const INSERT =
  "INSERT OR REPLACE INTO blood_pressure (date, first_top, first_bottom, second_top, second_bottom, updated_at) VALUES (?, ?, ?, ?, ?, ?)";

db.exec(`
  CREATE TABLE IF NOT EXISTS blood_pressure (
    date TEXT PRIMARY KEY, first_top REAL NOT NULL, first_bottom REAL NOT NULL, second_top REAL NOT NULL, second_bottom REAL NOT NULL,
    updated_at INTEGER NOT NULL DEFAULT 0
  );
`);

/** On a database without readings yet, load them from the JSON file. */
function seed() {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM blood_pressure").get();

  if (count > 0) return;

  const { readings } = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const insert = db.prepare(INSERT);
  db.exec("BEGIN");

  for (const reading of readings) insert.run(...reading, 0);
  db.exec("COMMIT");
  console.log(`Seeded ${readings.length} blood pressure readings from ${SEED_PATH}`);
}

seed();

/** Same shape as blood-pressure.json: { readings: [[date, first top, first bottom, second top, second bottom], ...] } oldest first, plus when each date last changed: updatedAt { date: ms }. */
function getReadings() {
  const rows = db
    .prepare("SELECT date, first_top, first_bottom, second_top, second_bottom, updated_at FROM blood_pressure ORDER BY date")
    .all();

  return {
    readings: rows.map((row) => [row.date, row.first_top, row.first_bottom, row.second_top, row.second_bottom]),
    updatedAt: Object.fromEntries(rows.map((row) => [row.date, row.updated_at])),
  };
}

export const bloodPressureRoutes = [
  {
    method: "GET",
    path: "/api/blood-pressure",
    handler: (_request, response) => sendJson(response, 200, getReadings()),
  },
  // Adds the day's readings, or changes them when the date already has some.
  {
    method: "PUT",
    path: "/api/blood-pressure/:date",
    handler: async (request, response, { date }) => {
      requireUser(request);
      const body = await readJson(request);

      if (!validDate(date)) throw new HttpError(400, "Date must be a real date like 2026-10-25");
      const values = VALUE_FIELDS.map((field) => body[field]);

      if (!values.every((value) => typeof value === "number" && value > 0 && value <= MAX_PRESSURE))

        throw new HttpError(400, `${VALUE_FIELDS.join(", ")} must each be a number up to ${MAX_PRESSURE}`);

      const stamp = readStamp(body.updatedAt);
      db.prepare(INSERT).run(date, ...values, stamp);
      sendJson(response, 200, { date, ...Object.fromEntries(VALUE_FIELDS.map((field, index) => [field, values[index]])), updatedAt: stamp });
    },
  },
  {
    method: "DELETE",
    path: "/api/blood-pressure/:date",
    handler: (request, response, { date }) => {
      requireUser(request);
      const { changes } = db.prepare("DELETE FROM blood_pressure WHERE date = ?").run(date);

      if (!changes) throw new HttpError(404, "No blood pressure readings on that date");

      sendJson(response, 200, { date });
    },
  },
];
