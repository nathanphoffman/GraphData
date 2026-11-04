// Removes loops from the /ralph-loops page on the live site (their status, events, commits and files).
//
//   node --env-file=.env scripts/ralph-remove.mjs <project> [<project> ...] [--dry-run]
//
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD, and the live site must already run the DELETE /api/ralph/project route.
import { connectToProd } from "./prod.mjs";

const dryRun = process.argv.includes("--dry-run");
const projects = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

if (!projects.length) {
  console.error("Usage: ralph-remove.mjs <project> [<project> ...] [--dry-run]");
  process.exit(1);
}

const call = await connectToProd();
const { data } = await call("GET", "/api/ralph");
const live = new Set(data.projects.map((project) => project.name));

for (const project of projects) {
  if (!live.has(project)) {
    console.log(`${project}: not on the live page, skipped`);
  } else if (dryRun) {
    console.log(`${project}: would be removed`);
  } else {
    await call("DELETE", `/api/ralph/project/${encodeURIComponent(project)}`);
    console.log(`${project}: removed`);
  }
}
