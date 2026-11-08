// Called by RalphLoops to report to the live site (which keeps only the newest events and commits per project).
//
//   node scripts/ralph-report.mjs <project> <kind> "<message>" [--source worker:world] [--state running] [--round 3] [--area world=done/open/blocked ...]
//   node scripts/ralph-report.mjs <project> commit "<subject>" --source worker:world --sha abc123 --added 12 --removed 3 --files 2 --total 5400
//   node scripts/ralph-report.mjs <project> file <name> --path /path/to/SPEC.md
//
// Example: node scripts/ralph-report.mjs my-game round "round 3 started" --state running --round 3 --area world=4/10/0 --area ui=2/5/1
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD, read from this repo's .env if they are not already set.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
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
  console.error(
    'Usage: ralph-report.mjs <project> <kind> "<message>" [--source s --state s --round n --area name=done/open/blocked ...]',
  );

  process.exit(1);
}

const [source = "orchestrator"] = flag("source");
let route = "/api/ralph/report";
let body = { project, kind, message, source };

if (kind === "commit") {
  const [sha] = flag("sha");
  const [added, removed, files, total] = ["added", "removed", "files", "total"].map((name) =>
    Number(flag(name)[0] ?? 0),
  );

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

// Projects whose Deor/Rust line counts are watched: the folder tokei counts. Counted when a round starts, on each commit and when the loop stops.
const HOME_DIR = process.env.RALPH_HOST_HOME ?? homedir();
const CODE_FOLDERS = { "3dspacegame-deor-rewrite": join(HOME_DIR, "Code/3dSpaceGameWT/3dSpaceGame-deor/src") };

// Where each project's workers commit. The main checkout only changes when a round merges, so a running tally adds each
// worktree's change since the main checkout to the main checkout's own count.
const WORKTREE_ROOTS = { "3dspacegame-deor-rewrite": join(HOME_DIR, "Code/RalphLoops/runs/3dspacegame-deor-rewrite/worktrees") };

/** Hand-written Rust and Deor lines from the game's own counter (generated Rust and tests left out), or undefined when it cannot run. */
function countWithGameScript(folder) {
  const script = join(folder, "..", "scripts", "deor_share.py");

  if (!existsSync(script)) return undefined;

  const found = JSON.parse(execFileSync("python3", [script, "--json"], { encoding: "utf8", timeout: 30_000 }));

  // `rust_block` is Rust written inside .deor files (wrappers); it is still Rust.
  return { deor: found.deor, rust: found.rust + found.rust_block };
}

/** Lines of code (no blanks or comments) in Deor and Rust under <folder>, or undefined when it cannot be counted.
 *  The loop runs in Docker without tokei, so the game's own script is tried first and tokei is the fallback. */
function countLanguages(folder) {
  try {
    const fromScript = countWithGameScript(folder);

    if (fromScript) return fromScript;
  } catch (error) {
    console.error(`ralph-report: deor_share.py failed, trying tokei: ${error.message}`);
  }

  try {
    const found = JSON.parse(
      execFileSync("tokei", ["-t=Rust,Deor", "-o", "json", folder], { encoding: "utf8", timeout: 30_000 }),
    );

    return { deor: found.Deor?.code ?? 0, rust: found.Rust?.code ?? 0 };
  } catch (error) {
    console.error(`ralph-report: no language count (${error.message})`);

    return undefined;
  }
}

/** The main checkout's count plus what every worktree has added or removed since, so the tally moves with each commit. */
function countWithWorktrees(project, folder) {
  const base = countLanguages(folder);
  const root = WORKTREE_ROOTS[project];

  if (!base || !root || !existsSync(root)) return base;

  const total = { ...base };

  for (const area of readdirSync(root)) {
    const areaFolder = join(root, area, "src");
    const counted = existsSync(areaFolder) ? countLanguages(areaFolder) : undefined;

    if (!counted) continue;

    total.deor += counted.deor - base.deor;
    total.rust += counted.rust - base.rust;
  }

  return total;
}

try {
  const call = await connectToProd();
  await call("POST", route, body);

  const folder = CODE_FOLDERS[project];
  const counts =
    folder && (kind === "commit" || kind === "round" || (state && state !== "running"))
      ? countWithWorktrees(project, folder)
      : undefined;

  if (counts) await call("POST", "/api/ralph/languages", { project, ...counts });
} catch (error) {
  console.error(`ralph-report failed: ${error.message}`);
  process.exit(1);
}
