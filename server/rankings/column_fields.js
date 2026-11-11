import { db } from "../db.js";

/** Everything a column can have besides its label, with its database type. A curve is an object, kept as JSON text. */
export const OPTIONAL_FIELDS = { short: "TEXT", weight: "REAL", best: "REAL", curve: "TEXT" };
export const COLUMN_FIELDS = ["label", ...Object.keys(OPTIONAL_FIELDS)];

const placeholders = (count) => Array(count).fill("?").join(", ");

/** The ranking's grade curve as JSON text for the database, or null to use the default. */
export const gradeCurveText = (ranking) => (ranking.gradeCurve === undefined ? null : JSON.stringify(ranking.gradeCurve));

/** A column as the values for its database fields, in COLUMN_FIELDS order. */
export const columnToRow = (column) =>
  COLUMN_FIELDS.map((field) =>
    column[field] === undefined ? null : field === "curve" ? JSON.stringify(column.curve) : column[field],
  );

/** A database row back to a column, leaving out the fields it does not have. */
export const rowToColumn = (row) =>
  Object.fromEntries(
    COLUMN_FIELDS.filter((field) => row[field] !== null).map((field) => [
      field,
      field === "curve" ? JSON.parse(row.curve) : row[field],
    ]),
  );

// The statements are made when asked for, because the tables only exist once prepareRankingTables has run.
export const prepareInsertColumn = () =>
  db.prepare(
    `INSERT INTO ranking_columns (ranking_id, position, ${COLUMN_FIELDS.join(", ")}) VALUES (?, ?, ${placeholders(COLUMN_FIELDS.length)})`,
  );

export const prepareUpdateColumn = () =>
  db.prepare(
    `UPDATE ranking_columns SET ${COLUMN_FIELDS.map((field) => `${field} = ?`).join(", ")} WHERE ranking_id = ? AND position = ?`,
  );
