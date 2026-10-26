// Rewrites the seed JSON files from the data, so the files in git are a backup of what the site has.
// For each ranking item and weigh-in, the local database and the live site are compared and the most recently changed copy is written
// (local wins a tie). Items and weigh-ins that exist on only one side are included, and nothing is dropped from the data.
//
//   node scripts/backup-to-json.mjs [--local-only]
//
//   data/top-rankings/<id>.json         only the "items" are rewritten; the title, columns and grade curve stay as written in the file
//   data/weight-journey/weight-journey.json   the unit and weigh-ins; the 0 placeholder days stay until a real weigh-in replaces them
//
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD (just reads them from .env) unless --local-only is given.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { db } from "../server/db.js";
import "../server/rankings.js";
import "../server/weights.js";
import { connectToProd } from "./prod.mjs";

const RANKINGS_DIR = "data/top-rankings";
const WEIGHTS_PATH = "data/weight-journey/weight-journey.json";

const localOnly = process.argv.includes("--local-only");
const call = localOnly ? undefined : await connectToProd();
const live = call && {
  rankings: new Map((await call("GET", "/api/rankings")).data.rankings.map((ranking) => [ranking.id, ranking.items])),
  weights: (await call("GET", "/api/weights")).data,
};

/** The row with the later change time; the first one when they match. */
const newer = (mine, theirs) => (theirs && theirs.at > (mine?.at ?? -1) ? theirs : (mine ?? theirs));

/** One item the way the files write it: on a single line, with a space after each comma. */
const itemLine = (name, values) => `    {"name": ${JSON.stringify(name)}, "values": [${values.map((value) => JSON.stringify(value)).join(", ")}]}`;

let changedFiles = 0;
/** Write the file only when its text changed, and say so. */
function save(path, text, summary) {
  if (readFileSync(path, "utf8") === text) return console.log(`unchanged: ${path}`);
  writeFileSync(path, text);
  changedFiles++;
  console.log(`updated: ${path} (${summary})`);
}

// Rankings: one file each, matched to the database by id.
for (const file of readdirSync(RANKINGS_DIR).filter((name) => name.endsWith(".json")).sort()) {
  const path = `${RANKINGS_DIR}/${file}`;
  const text = readFileSync(path, "utf8");
  const ranking = JSON.parse(text);
  const block = text.match(/^([\s\S]*\n {2}"items": \[\n)([\s\S]*)\n {2}\]\n\}\n?$/);
  if (!block) throw new Error(`${path}: expected "items" to be the last thing in the file`);

  const local = db.prepare("SELECT name, values_json, updated_at FROM ranking_items WHERE ranking_id = ? ORDER BY position").all(ranking.id)
    .map((row) => ({ name: row.name, values: JSON.parse(row.values_json), at: row.updated_at }));
  if (!local.length) {
    console.warn(`SKIPPED: ${path} has no items in the local database`);
    continue;
  }
  const remote = new Map((live?.rankings.get(ranking.id) ?? []).map((item) => [item.name, { name: item.name, values: item.values, at: item.updatedAt ?? 0 }]));

  // Local order first, then items only the live site has.
  const merged = local.map((item) => newer(item, remote.get(item.name)));
  for (const item of remote.values()) if (!local.some((mine) => mine.name === item.name)) merged.push(item);

  // The file's items line up with its columns, so a row of another length (the live site is behind) cannot be written.
  const fits = merged.filter((item) => {
    if (item.values.length === ranking.columns.length) return true;
    console.warn(`SKIPPED: ${ranking.id} / ${item.name} has ${item.values.length} values but the file has ${ranking.columns.length} columns (is the live site behind?)`);
    return false;
  });

  // An item that did not change keeps its old line, so numbers like 2.0 do not turn into noise in the diff.
  const oldLines = new Map(block[2].split("\n").map((line) => [JSON.parse(line.replace(/,$/, "")).name, line.replace(/,$/, "")]));
  const lines = fits.map((item) => {
    const old = oldLines.get(item.name);
    return old && JSON.stringify(JSON.parse(old).values) === JSON.stringify(item.values) ? old : itemLine(item.name, item.values);
  });
  const changed = lines.filter((line, index) => line !== oldLines.get(fits[index].name)).length;

  save(path, `${block[1]}${lines.join(",\n")}\n  ]\n}\n`, `${changed} item(s) changed or added, ${fits.length} total`);
}

// Weigh-ins: the real ones come from the data; placeholder days (weight 0) in the file stay unless a real weigh-in takes their date.
const { unit, weights: fileWeights } = JSON.parse(readFileSync(WEIGHTS_PATH, "utf8"));
const rows = new Map(db.prepare("SELECT date, weight, updated_at FROM weights").all().map((row) => [row.date, { weight: row.weight, at: row.updated_at }]));
for (const [date, weight] of live?.weights.weights ?? []) rows.set(date, newer(rows.get(date), { weight, at: live.weights.updatedAt[date] ?? 0 }));

const days = new Map(fileWeights.filter(([, weight]) => weight === 0).map(([date]) => [date, 0]));
for (const [date, { weight }] of rows) days.set(date, weight);
const sorted = [...days].sort(([a], [b]) => a.localeCompare(b));
const localUnit = db.prepare("SELECT value FROM settings WHERE key = 'unit'").get()?.value ?? unit;
const weightText = `{"unit": ${JSON.stringify(localUnit)}, "weights": [${sorted.map(([date, weight]) => `["${date}", ${weight === 0 ? 0 : Number.isInteger(weight) ? weight.toFixed(1) : weight}]`).join(", ")}]}`;
save(WEIGHTS_PATH, weightText, `${rows.size} weigh-ins`);

console.log(`${changedFiles} file(s) updated${localOnly ? " (local data only)" : ""}. Review with git diff.`);
