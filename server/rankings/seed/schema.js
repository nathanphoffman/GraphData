import { db } from "../../db.js";
import { OPTIONAL_FIELDS } from "../column_fields.js";

// A column with a weight is rated; one without is just information. Item values line up with the columns.
const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS rankings (id TEXT PRIMARY KEY, title TEXT NOT NULL, position INTEGER NOT NULL, grade_curve TEXT);
  CREATE TABLE IF NOT EXISTS ranking_columns (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, label TEXT NOT NULL,
    ${Object.entries(OPTIONAL_FIELDS)
      .map(([field, type]) => `${field} ${type}`)
      .join(", ")},
    PRIMARY KEY (ranking_id, position)
  );

  CREATE TABLE IF NOT EXISTS ranking_items (
    ranking_id TEXT NOT NULL, position INTEGER NOT NULL, name TEXT NOT NULL, values_json TEXT NOT NULL, updated_at INTEGER NOT NULL DEFAULT 0, features_json TEXT NOT NULL DEFAULT '[]',
    PRIMARY KEY (ranking_id, position)
  );
  CREATE TABLE IF NOT EXISTS ranking_renames (
    ranking_id TEXT NOT NULL, old_name TEXT NOT NULL, new_name TEXT NOT NULL, renamed_at INTEGER NOT NULL,
    PRIMARY KEY (ranking_id, old_name, renamed_at)
  );

`;

const columnNames = (table) =>
  db
    .prepare(`PRAGMA table_info(${table})`)
    .all()
    .map((column) => column.name);

/** Databases made before a column existed get it added; `definition` is its type and the default older rows get. */
function addColumnIfMissing(table, column, definition) {
  if (!columnNames(table).includes(column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

/** Create the ranking tables, then add any column that databases made by older versions are missing. */
export function prepareRankingTables() {
  db.exec(CREATE_TABLES_SQL);

  // Optional column fields are filled in by seeding.
  for (const [field, type] of Object.entries(OPTIONAL_FIELDS)) addColumnIfMissing("ranking_columns", field, type);

  addColumnIfMissing("rankings", "grade_curve", "TEXT");

  // Once weights are reordered on the site, the database's weights win over the JSON file's.
  addColumnIfMissing("rankings", "weights_custom", "INTEGER NOT NULL DEFAULT 0");

  // Older items count as changed at time 0, and every item starts with no planned features.
  addColumnIfMissing("ranking_items", "updated_at", "INTEGER NOT NULL DEFAULT 0");
  addColumnIfMissing("ranking_items", "features_json", "TEXT NOT NULL DEFAULT '[]'");
}
