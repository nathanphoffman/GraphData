// Deletes the items a ranking has on the live site but not in the local database, so rows you removed locally go away on prod too.
//
//   node --env-file=.env scripts/prune-prod-ranking.mjs [ranking-id] [--dry-run]
//
// The ranking defaults to project-priority. Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD.
import { db } from "../server/db.js";
import { connectToProd } from "./prod.mjs";

const dryRun = process.argv.includes("--dry-run");
const id = process.argv.slice(2).find((arg) => !arg.startsWith("--")) ?? "project-priority";

const call = await connectToProd();
const { data } = await call("GET", "/api/rankings");
const live = data.rankings.find((ranking) => ranking.id === id);

if (!live) {
  console.error(`The live site has no ranking "${id}".`);
  process.exit(1);
}

const local = new Set(db.prepare("SELECT name FROM ranking_items WHERE ranking_id = ?").all(id).map((item) => item.name));
if (!local.size) {
  console.error(`The local database has no items for "${id}", so nothing is deleted.`);
  process.exit(1);
}

const extra = live.items.filter((item) => !local.has(item.name));
for (const { name } of extra) {
  if (!dryRun) await call("DELETE", `/api/rankings/${id}/items/${encodeURIComponent(name)}`);
  console.log(`${dryRun ? "would delete" : "deleted"}: ${name}`);
}

console.log(`${extra.length} of ${live.items.length} live items ${dryRun ? "would be " : ""}deleted; ${local.size} local items kept.`);
