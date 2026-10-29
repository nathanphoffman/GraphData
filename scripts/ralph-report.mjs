// Called by RalphLoops to report to the live site (which keeps only the newest events and commits per project).
//
//   node scripts/ralph-report.mjs <project> <kind> "<message>" [--source worker:world] [--state running] [--round 3] [--area world=done/open/blocked ...]
//   node scripts/ralph-report.mjs <project> commit "<subject>" --source worker:world --sha abc123 --added 12 --removed 3 --files 2 --total 5400
//   node scripts/ralph-report.mjs <project> file <name> --path /path/to/SPEC.md
//
// Example: node scripts/ralph-report.mjs my-game round "round 3 started" --state running --round 3 --area world=4/10/0 --area ui=2/5/1
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD, read from this repo's .env if they are not already set.
import { readFileSync } from "node:fs";
import { connectToProd } from "./prod.mjs";

try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  // No .env file: the variables must already be set.
}

const args = process.argv.slice(2);
const flag = (name) => args.flatMap((arg, at) => (arg === `--${name}` ? [args[at + 1]] : []));
const positional = args.filter((arg, at) => !arg.startsWith("--") && !args[at - 1]?.startsWith("--"));
const [project, kind, message] = positional;

if (!project || !kind) {
  console.error('Usage: ralph-report.mjs <project> <kind> "<message>" [--source s --state s --round n --area name=done/open/blocked ...]');
  process.exit(1);
}

const [source = "orchestrator"] = flag("source");
let route = "/api/ralph/report";
let body = { project, kind, message, source };

if (kind === "commit") {
  const [sha] = flag("sha");
  const [added, removed, files, total] = ["added", "removed", "files", "total"].map((name) => Number(flag(name)[0] ?? 0));
  route = "/api/ralph/commit";
  body = { project, source, sha, message, added, removed, files, total };
} else if (kind === "file") {
  route = "/api/ralph/file";
  body = { project, name: message, content: readFileSync(flag("path")[0] ?? "", "utf8") };
}

const [state] = flag("state");
if (state && route === "/api/ralph/report") {
  body.state = state;
  body.round = Number(flag("round")[0] ?? 0);
  body.areas = flag("area").map((area) => {
    const [name, counts = ""] = area.split("=");
    const [done, open, blocked] = counts.split("/").map(Number);

    return { name, done, open, blocked };
  });
}

try {
  const call = await connectToProd();
  await call("POST", route, body);
} catch (error) {
  console.error(`ralph-report failed: ${error.message}`);
  process.exit(1);
}
