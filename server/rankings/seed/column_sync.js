import { db } from "../../db.js";
import { columnToRow, prepareInsertColumn } from "../column_fields.js";

/** Rename database columns the JSON file marks with `was` (the old label), keeping every item's value. A label the database already has is left alone. */
export function renameColumns(ranking) {
  const has = db.prepare("SELECT 1 FROM ranking_columns WHERE ranking_id = ? AND label = ?");

  for (const column of ranking.columns) {
    if (column.was === undefined || has.get(ranking.id, column.label)) continue;
    db.prepare("UPDATE ranking_columns SET label = ? WHERE ranking_id = ? AND label = ?").run(
      column.label,
      ranking.id,
      column.was,
    );
  }
}

/** Close the gaps the removed positions leave, lowest first so a column never moves onto one that is still there. */
function closeColumnGaps(rankingId, current, removed) {
  current
    .filter((column) => !removed.includes(column.position))
    .forEach((column, index) => {
      db.prepare("UPDATE ranking_columns SET position = ? WHERE ranking_id = ? AND position = ?").run(
        index,
        rankingId,
        column.position,
      );
    });
}

/** Take the value at each removed position out of every item. */
function removeValuesAt(rankingId, removed) {
  const items = db.prepare("SELECT position, values_json FROM ranking_items WHERE ranking_id = ?").all(rankingId);

  items.forEach((item) => {
    const values = JSON.parse(item.values_json).filter((_value, index) => !removed.includes(index));
    db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND position = ?").run(
      JSON.stringify(values),
      rankingId,
      item.position,
    );
  });
}

/** Delete the database columns the JSON file no longer has (matched by label), along with that value in every item. */
export function dropRemovedColumns(ranking) {
  const keep = new Set(ranking.columns.map((column) => column.label));
  const current = db
    .prepare("SELECT position, label FROM ranking_columns WHERE ranking_id = ? ORDER BY position")
    .all(ranking.id);
  const removed = current.filter((column) => !keep.has(column.label)).map((column) => column.position);

  if (!removed.length) return;

  db.exec("BEGIN");
  const deleteColumn = db.prepare("DELETE FROM ranking_columns WHERE ranking_id = ? AND position = ?");

  for (const position of removed) deleteColumn.run(ranking.id, position);

  closeColumnGaps(ranking.id, current, removed);
  removeValuesAt(ranking.id, removed);
  db.exec("COMMIT");
  console.log(`Removed column(s) ${removed.join(", ")} from ranking "${ranking.title}"`);
}

/** Add columns the JSON file has after the database's last one, giving every item the value the file has for it (matched by name). */
export function addNewColumns(ranking) {
  const current = db
    .prepare("SELECT label FROM ranking_columns WHERE ranking_id = ? ORDER BY position")
    .all(ranking.id);
  const added = ranking.columns.slice(current.length);

  if (!added.length || !current.every((column, index) => column.label === ranking.columns[index].label)) return;

  const insertColumn = prepareInsertColumn();
  const fileValues = new Map(ranking.items.map((item) => [item.name, item.values]));
  db.exec("BEGIN");
  added.forEach((column, offset) => insertColumn.run(ranking.id, current.length + offset, ...columnToRow(column)));

  for (const item of db
    .prepare("SELECT position, name, values_json FROM ranking_items WHERE ranking_id = ?")
    .all(ranking.id)) {
    const extra = added.map((_column, offset) => fileValues.get(item.name)?.[current.length + offset] ?? null);
    db.prepare("UPDATE ranking_items SET values_json = ? WHERE ranking_id = ? AND position = ?").run(
      JSON.stringify([...JSON.parse(item.values_json), ...extra]),
      ranking.id,
      item.position,
    );
  }

  db.exec("COMMIT");
  console.log(`Added ${added.length} column(s) to ranking "${ranking.title}"`);
}
