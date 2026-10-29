// Sends a few fake RalphLoops reports to your LOCAL server (never the live site), so /ralph-loops has something to show.
//
//   node scripts/ralph-fake-reports.mjs [--url http://localhost:3001]
//
// Logs in as ADMIN_USERNAME / ADMIN_PASSWORD from .env, or admin / admin like local dev does.
try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  // No .env file: local dev uses admin / admin.
}

const urlAt = process.argv.indexOf("--url");
const base = (urlAt === -1 ? "http://localhost:3001" : process.argv[urlAt + 1]).replace(/\/+$/, "");

if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)) {
  console.error(`Refusing to send fake reports to ${base}; this only works on localhost.`);
  process.exit(1);
}

const login = await fetch(`${base}/api/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: process.env.ADMIN_USERNAME ?? "admin", password: process.env.ADMIN_PASSWORD ?? "admin" }),
});
if (!login.ok) {
  console.error(`Could not log in to ${base}: ${login.status}. Is the server running?`);
  process.exit(1);
}
const cookie = login.headers.get("set-cookie").split(";")[0];

const report = (body) =>
  fetch(`${base}/api/ralph/report`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(body) });

const areas = (world, ui) => [
  { name: "world", done: world, open: 12 - world, blocked: 0 },
  { name: "ui", done: ui, open: 8 - ui, blocked: ui > 5 ? 1 : 0 },
];

const reports = [
  { project: "fake-game", kind: "round", message: "round 1", state: "running", round: 1, areas: areas(0, 0) },
  { project: "fake-game", kind: "round", message: "round 2", state: "running", round: 2, areas: areas(5, 3) },
  { project: "fake-game", kind: "problem", message: "WARNING: ui could not be rebased onto main, left as is", state: "running", round: 2, areas: areas(5, 3) },
  { project: "fake-game", kind: "round", message: "round 3", state: "running", round: 3, areas: areas(9, 6) },
  { project: "fake-tool", kind: "info", message: "COMPLETE", state: "complete", round: 4, areas: [{ name: "core", done: 10, open: 0, blocked: 0 }] },
  { project: "fake-api", kind: "problem", message: "round 2 is still red after fixing attempts", state: "stopped", round: 2, areas: [{ name: "server", done: 3, open: 4, blocked: 2 }] },
];

for (const body of reports) {
  const response = await report(body);
  console.log(`${response.ok ? "sent  " : "FAILED"} ${body.project}: ${body.message}`);
}
