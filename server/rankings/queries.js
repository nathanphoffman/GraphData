import { db } from "../db.js";
import { HttpError } from "../http.js";
import { COLUMN_FIELDS, rowToColumn } from "./column_fields.js";
import { checkName } from "./checks.js";

/** { rankings: [{ id, title, columns, items }] }, each ranking shaped like its JSON file. */
export function getRankings() {
  const columns = db.prepare(
    `SELECT ${COLUMN_FIELDS.join(", ")} FROM ranking_columns WHERE ranking_id = ? ORDER BY position`,
  );

  const items = db.prepare(
    "SELECT name, values_json, updated_at, features_json FROM ranking_items WHERE ranking_id = ? ORDER BY position",
  );

  const renames = db.prepare(
    "SELECT old_name, new_name, renamed_at FROM ranking_renames WHERE ranking_id = ? ORDER BY renamed_at",
  );

  const rankings = db
    .prepare("SELECT id, title, grade_curve FROM rankings ORDER BY position")
    .all()
    .map(({ id, title, grade_curve }) => ({
      id,
      title,
      ...(grade_curve === null ? {} : { gradeCurve: JSON.parse(grade_curve) }),
      columns: columns.all(id).map(rowToColumn),
      items: items.all(id).map(({ name, values_json, updated_at, features_json }) => ({
        name,
        values: JSON.parse(values_json),
        updatedAt: updated_at,
        features: JSON.parse(features_json),
      })),
      // Every rename ever made, so a sync can rename the same item on the other side instead of duplicating it.
      renames: renames.all(id).map(({ old_name, new_name, renamed_at }) => ({
        oldName: old_name,
        newName: new_name,
        at: renamed_at,
      })),
    }));

  return { rankings };
}

/**
 * Rename an item, keeping its values, planned features and place in the list, and record the rename (with its time)
 * so syncing can carry it to the other side. Throws when the item is missing or the new name is already used.
 */
export function renameRankingItem(rankingId, oldName, newName, stamp) {
  checkName(newName);
  const trimmed = newName.trim();
  const taken = db.prepare("SELECT 1 FROM ranking_items WHERE ranking_id = ? AND name = ?").get(rankingId, trimmed);

  if (taken && trimmed !== oldName) throw new HttpError(409, "The ranking already has an item with that name");

  const { changes } = db
    .prepare("UPDATE ranking_items SET name = ?, updated_at = ? WHERE ranking_id = ? AND name = ?")
    .run(trimmed, stamp, rankingId, oldName);

  if (!changes) throw new HttpError(404, "No such item in that ranking");

  db.prepare(
    "INSERT OR REPLACE INTO ranking_renames (ranking_id, old_name, new_name, renamed_at) VALUES (?, ?, ?, ?)",
  ).run(rankingId, oldName, trimmed, stamp);

  return trimmed;
}

/** Change the item with this name, or add it at the end of the ranking when it is not there yet. Features are only replaced when given. */
export function saveItem(rankingId, name, values, stamp, features) {
  const changed = db
    .prepare(
      "UPDATE ranking_items SET values_json = ?, updated_at = ?, features_json = COALESCE(?, features_json) WHERE ranking_id = ? AND name = ?",
    )
    .run(JSON.stringify(values), stamp, features === undefined ? null : JSON.stringify(features), rankingId, name);

  if (changed.changes) return;

  const { next } = db
    .prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM ranking_items WHERE ranking_id = ?")
    .get(rankingId);
  db.prepare(
    "INSERT INTO ranking_items (ranking_id, position, name, values_json, updated_at, features_json) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(rankingId, next, name, JSON.stringify(values), stamp, JSON.stringify(features ?? []));
}

/** The labels of a ranking's rated columns (the ones with a weight). */
export function ratedColumnLabels(rankingId) {
  return db
    .prepare("SELECT label FROM ranking_columns WHERE ranking_id = ? AND weight IS NOT NULL")
    .all(rankingId)
    .map((column) => column.label);
}

/** Give the rated columns weights from their order, heaviest first, and keep them over the JSON file's from now on. */
export function saveWeightOrder(rankingId, order) {
  db.exec("BEGIN");
  order.forEach((label, index) =>
    db
      .prepare("UPDATE ranking_columns SET weight = ? WHERE ranking_id = ? AND label = ?")
      .run(order.length - index, rankingId, label),
  );

  db.prepare("UPDATE rankings SET weights_custom = 1 WHERE id = ?").run(rankingId);
  db.exec("COMMIT");
}
