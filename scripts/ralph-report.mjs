// Called by RalphLoops to report to the live site (which keeps only the newest events per project).
//
//   node scripts/ralph-report.mjs <project> <kind> "<message>" [--state running] [--round 3] [--area world=done/open/blocked ...]
//
// Example: node scripts/ralph-report.mjs my-game round "round 3 started" --state running --round 3 --area world=4/10/0 --area ui=2/5/1
// Needs PROD_URL, PROD_USERNAME and PROD_PASSWORD, read from this repo's .env if they are not already set.
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
  console.error('Usage: ralph-report.mjs <project> <kind> "<message>" [--state s --round n --area name=done/open/blocked ...]');
  process.exit(1);
}

const body = { project, kind, message };
const [state] = flag("state");
if (state) {
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
  await call("POST", "/api/ralph/report", body);
} catch (error) {
  console.error(`ralph-report failed: ${error.message}`);
  process.exit(1);
}
