// Sends fake RalphLoops reports to your LOCAL server (never the live site), so /ralph-loops has something to show: a few starter reports, then (until Ctrl-C) a loop acting out rounds of workers, merge, checks, quality and planning. --once sends only the starter reports.
//
//   node scripts/ralph-fake-reports.mjs [--once] [--url http://localhost:3001]
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

const report = (body) => fetch(`${base}/api/ralph/report`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(body) });

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

const sources = ["orchestrator", "worker:world", "worker:ui", "planner", "merger", "quality"];
reports.forEach((body, index) => {
  body.source = sources[index % sources.length];
});

const post = (path, body) => fetch(`${base}${path}`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(body) });

for (const [index, source] of ["worker:world", "worker:ui", "planner"].entries()) {
  const sent = await post("/api/ralph/commit", {
    project: "fake-game",
    source,
    sha: `fake${index}abcdef`.padEnd(40, "0"),
    message: `ralph: fake commit ${index + 1}`,
    added: 40 * (index + 1),
    removed: 7 * index,
    files: index + 2,
    total: 5000 + 40 * index,
  });
  console.log(`${sent.ok ? "sent  " : "FAILED"} fake-game: commit ${index + 1}`);
}
const file = await post("/api/ralph/file", { project: "fake-game", name: "SPEC.md", content: "# Fake spec\n\nBuild a fake game.\n" });
console.log(`${file.ok ? "sent  " : "FAILED"} fake-game: SPEC.md`);

for (const body of reports) {
  const response = await report(body);
  console.log(`${response.ok ? "sent  " : "FAILED"} ${body.project}: ${body.message}`);
}

// Unless --once is given, keep acting out a loop until Ctrl-C: rounds of workers doing items and committing, then merge, checks, quality and plan.
if (!process.argv.includes("--once")) {
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const between = (low, high) => low + Math.floor(Math.random() * (high - low + 1));
  const pause = (low, high) => new Promise((resolve) => setTimeout(resolve, between(low, high) * 1000));
  const items = ["add terrain chunk loading", "fix the water shader", "build the inventory panel", "add the minimap", "save and load games", "tune enemy pathfinding", "add sound effects"];
  const workers = [
    { name: "world", open: 12, done: 0 },
    { name: "ui", open: 8, done: 0 },
  ];
  let round = 0;
  let total = 5200;

  const say = async (source, message, kind = "info") => {
    const counts = workers.map(({ name, done, open }) => ({ name, done, open, blocked: 0 }));
    await report({ project: "fake-game", kind, message, source, state: "running", round, areas: counts });
    console.log(`sent   [${source}] ${message}`);
  };
  const commit = async (source, message) => {
    const [added, removed] = [between(1, 300), between(0, 80)];
    total += added - removed;
    const sha = Array.from({ length: 40 }, () => between(0, 15).toString(16)).join("");
    await post("/api/ralph/commit", { project: "fake-game", source, sha, message, added, removed, files: between(1, 9), total });
    console.log(`sent   [${source}] commit: ${message} (+${added} -${removed})`);
  };
  const sendFile = async (name, content) => {
    await post("/api/ralph/file", { project: "fake-game", name, content });
    console.log(`sent   ${name}`);
  };

  console.log("Acting out a loop until you press Ctrl-C...");
  while (true) {
    round++;
    // Fresh tasks each round, like the planner writing them.
    for (const worker of workers) worker.open = between(4, 8);
    await say("orchestrator", `===== round ${round} =====`, "round");
    await sendFile("SPEC.md", `# Fake spec\n\nBuild a fake game.\n\nRound ${round} is in progress.\n`);

    // Both workers go at the same time, each at its own pace.
    await Promise.all(
      workers.map(async (worker) => {
        let item = 0;
        while (worker.open > 0) {
          item++;
          const task = pick(items);
          await say(`worker:${worker.name}`, `item ${item}: ${task}`);
          await pause(2, 6);
          if (Math.random() < 0.15) {
            await say(`worker:${worker.name}`, "no progress on item (fail 1 of 3)");
            continue;
          }
          worker.open--;
          worker.done++;
          await commit(`worker:${worker.name}`, `ralph(${worker.name}): checkpoint after item`);
        }
        await say(`worker:${worker.name}`, `done (${item} sessions)`);
      }),
    );

    await say("merger", `merge session started (round ${round})`);
    await pause(3, 6);
    if (Math.random() < 0.3) {
      await say("orchestrator", "checks failed in integration (attempt 1)", "problem");
      await say("fixer", `fixbuild session started (round ${round})`);
      await pause(3, 5);
      await commit("fixer", `ralph: formatting after round ${round}`);
    }
    await say("quality", `score ${between(70, 92)} B in merged, round ${round}`);
    await say("planner", `plan session started (round ${round})`);
    await pause(3, 6);
    await commit("planner", `ralph: round ${round} progress and next tasks`);
    await sendFile(
      "PROGRESS.md",
      `# Progress\n\nRound ${round} finished.\n${workers.map((worker) => `- ${worker.name}: ${worker.done} done`).join("\n")}\nUpdated ${new Date().toLocaleString("sv")}\n`,
    );
    await pause(3, 6);
  }
}
