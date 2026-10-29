import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, sendJson } from "./http.js";

// Only the newest events and commits per project are kept, so the tables (and the page) never grow without limit.
const MAX_EVENTS_PER_PROJECT = 3000;
const MAX_COMMITS_PER_PROJECT = 1000;
const SHOWN_EVENTS = 400;
const SHOWN_COMMITS = 200;
const MAX_MESSAGE = 300;
const MAX_FILE_BYTES = 120_000;
const MAX_FILES_PER_PROJECT = 20;
// Several pages polling at once share one answer this long.
const CACHE_MS = 15_000;
const MAX_NAME = 80;
const MAX_AREAS = 20;

db.exec(`
  CREATE TABLE IF NOT EXISTS ralph_status (project TEXT PRIMARY KEY, state TEXT NOT NULL, round INTEGER NOT NULL, areas TEXT NOT NULL, updated_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS ralph_events (id INTEGER PRIMARY KEY AUTOINCREMENT, project TEXT NOT NULL, at INTEGER NOT NULL, kind TEXT NOT NULL, message TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS ralph_commits (
    id INTEGER PRIMARY KEY AUTOINCREMENT, project TEXT NOT NULL, at INTEGER NOT NULL, source TEXT NOT NULL, sha TEXT NOT NULL, message TEXT NOT NULL,
    added INTEGER NOT NULL, removed INTEGER NOT NULL, files INTEGER NOT NULL, UNIQUE (project, sha)
  );
  CREATE TABLE IF NOT EXISTS ralph_files (project TEXT NOT NULL, name TEXT NOT NULL, content TEXT NOT NULL, updated_at INTEGER NOT NULL, PRIMARY KEY (project, name));
`);

// Databases made before events said who wrote them get that added; old events count as the orchestrator's.
if (
  !db
    .prepare("PRAGMA table_info(ralph_events)")
    .all()
    .some((column) => column.name === "source")
) {
  db.exec("ALTER TABLE ralph_events ADD COLUMN source TEXT NOT NULL DEFAULT 'orchestrator'");
}

// Databases made before commits said how big the project was get that added; older commits count as unknown (0).
if (
  !db
    .prepare("PRAGMA table_info(ralph_commits)")
    .all()
    .some((column) => column.name === "total")
) {
  db.exec("ALTER TABLE ralph_commits ADD COLUMN total INTEGER NOT NULL DEFAULT 0");
}

let cached = { at: 0, projects: [] };

const text = (value, max, label) => {
  if (typeof value !== "string" || !value.trim() || value.length > max) throw new HttpError(400, `${label} must be text of 1 to ${max} characters`);

  return value.trim();
};

const count = (value, label) => {
  if (!Number.isInteger(value) || value < 0) throw new HttpError(400, `${label} must be a whole number`);

  return value;
};

/** Areas as [{ name, done, open, blocked }], checked so a bad report cannot store junk. */
function readAreas(areas) {
  if (!Array.isArray(areas) || areas.length > MAX_AREAS) throw new HttpError(400, `areas must be a list of up to ${MAX_AREAS}`);

  return areas.map((area) => {
    const counts = ["done", "open", "blocked"].map((key) => area?.[key]);
    if (!counts.every((count) => Number.isInteger(count) && count >= 0)) throw new HttpError(400, "each area needs whole-number done, open and blocked");

    return { name: text(area.name, MAX_NAME, "area name"), done: counts[0], open: counts[1], blocked: counts[2] };
  });
}

export const ralphRoutes = [
  // The loop reports: always an event, plus the new status when it sends one.
  {
    method: "POST",
    path: "/api/ralph/report",
    handler: async (request, response) => {
      requireUser(request);
      const body = await readJson(request);
      const project = text(body.project, MAX_NAME, "project");
      const kind = text(body.kind ?? "info", MAX_NAME, "kind");
      const source = text(body.source ?? "orchestrator", MAX_NAME, "source");
      const message = text(body.message ?? kind, Infinity, "message").slice(0, MAX_MESSAGE);
      const now = Date.now();

      db.exec("BEGIN");
      if (body.state !== undefined) {
        if (!Number.isInteger(body.round) || body.round < 0) throw new HttpError(400, "round must be a whole number");
        db.prepare("INSERT OR REPLACE INTO ralph_status (project, state, round, areas, updated_at) VALUES (?, ?, ?, ?, ?)").run(
          project,
          text(body.state, MAX_NAME, "state"),
          body.round,
          JSON.stringify(readAreas(body.areas ?? [])),
          now,
        );
      }
      db.prepare("INSERT INTO ralph_events (project, at, kind, message, source) VALUES (?, ?, ?, ?, ?)").run(project, now, kind, message, source);
      db.prepare("DELETE FROM ralph_events WHERE project = ? AND id NOT IN (SELECT id FROM ralph_events WHERE project = ? ORDER BY id DESC LIMIT ?)").run(project, project, MAX_EVENTS_PER_PROJECT);
      db.exec("COMMIT");
      sendJson(response, 200, { ok: true });
    },
  },
  // The loop made a git commit.
  {
    method: "POST",
    path: "/api/ralph/commit",
    handler: async (request, response) => {
      requireUser(request);
      const body = await readJson(request);
      const project = text(body.project, MAX_NAME, "project");

      db.prepare("INSERT OR IGNORE INTO ralph_commits (project, at, source, sha, message, added, removed, files, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
        project,
        Date.now(),
        text(body.source ?? "orchestrator", MAX_NAME, "source"),
        text(body.sha, 64, "sha"),
        text(body.message, Infinity, "message").slice(0, MAX_MESSAGE),
        count(body.added, "added"),
        count(body.removed, "removed"),
        count(body.files, "files"),
        count(body.total ?? 0, "total"),
      );
      db.prepare("DELETE FROM ralph_commits WHERE project = ? AND id NOT IN (SELECT id FROM ralph_commits WHERE project = ? ORDER BY id DESC LIMIT ?)").run(project, project, MAX_COMMITS_PER_PROJECT);
      sendJson(response, 200, { ok: true });
    },
  },
  // The loop sends the newest copy of a file it writes (SPEC.md, the log, ...); only the newest copy is kept.
  {
    method: "POST",
    path: "/api/ralph/file",
    handler: async (request, response) => {
      requireUser(request);
      const body = await readJson(request, MAX_FILE_BYTES * 2);
      const project = text(body.project, MAX_NAME, "project");
      const name = text(body.name, MAX_NAME, "name");
      if (typeof body.content !== "string" || body.content.length > MAX_FILE_BYTES) throw new HttpError(400, `content must be text of up to ${MAX_FILE_BYTES} characters`);

      const known = db.prepare("SELECT COUNT(*) AS total FROM ralph_files WHERE project = ? AND name != ?").get(project, name).total;
      if (known >= MAX_FILES_PER_PROJECT) throw new HttpError(400, `A project can have up to ${MAX_FILES_PER_PROJECT} files`);
      db.prepare("INSERT OR REPLACE INTO ralph_files (project, name, content, updated_at) VALUES (?, ?, ?, ?)").run(project, name, body.content, Date.now());
      sendJson(response, 200, { ok: true });
    },
  },
  {
    method: "GET",
    path: "/api/ralph/files/:project/:name",
    handler: (request, response, { project, name }) => {
      requireUser(request);
      const file = db.prepare("SELECT content, updated_at FROM ralph_files WHERE project = ? AND name = ?").get(project, name);
      if (!file) throw new HttpError(404, "No such file");

      sendJson(response, 200, { name, content: file.content, updatedAt: file.updated_at });
    },
  },
  // Everything the page shows. Answers are reused for CACHE_MS, so many open pages cost one set of queries.
  {
    method: "GET",
    path: "/api/ralph",
    handler: (request, response) => {
      requireUser(request);
      if (Date.now() - cached.at > CACHE_MS) cached = { at: Date.now(), projects: readProjects() };

      sendJson(response, 200, { projects: cached.projects, cachedAt: cached.at });
    },
  },
];

/** Every project with its status, newest events, newest commits and the names of its files. */
function readProjects() {
  return db
    .prepare("SELECT project, state, round, areas, updated_at FROM ralph_status ORDER BY project")
    .all()
    .map((row) => ({
      name: row.project,
      state: row.state,
      round: row.round,
      areas: JSON.parse(row.areas),
      updatedAt: row.updated_at,
      events: db.prepare("SELECT at, kind, message, source FROM ralph_events WHERE project = ? ORDER BY id DESC LIMIT ?").all(row.project, SHOWN_EVENTS),
      commits: db.prepare("SELECT at, source, sha, message, added, removed, files, total FROM ralph_commits WHERE project = ? ORDER BY id DESC LIMIT ?").all(row.project, SHOWN_COMMITS),
      files: db.prepare("SELECT name, updated_at AS updatedAt FROM ralph_files WHERE project = ? ORDER BY name").all(row.project),
    }));
}
