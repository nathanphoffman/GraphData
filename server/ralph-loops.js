import { requireUser } from "./auth.js";
import { db } from "./db.js";
import { HttpError, readJson, sendJson } from "./http.js";

// Only the newest events per project are kept, so the table (and the page) never grows without limit.
const MAX_EVENTS_PER_PROJECT = 100;
const MAX_MESSAGE = 300;
const MAX_NAME = 80;
const MAX_AREAS = 20;

db.exec(`
  CREATE TABLE IF NOT EXISTS ralph_status (project TEXT PRIMARY KEY, state TEXT NOT NULL, round INTEGER NOT NULL, areas TEXT NOT NULL, updated_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS ralph_events (id INTEGER PRIMARY KEY AUTOINCREMENT, project TEXT NOT NULL, at INTEGER NOT NULL, kind TEXT NOT NULL, message TEXT NOT NULL);
`);

const text = (value, max, label) => {
  if (typeof value !== "string" || !value.trim() || value.length > max) throw new HttpError(400, `${label} must be text of 1 to ${max} characters`);

  return value.trim();
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
      const message = text(body.message ?? kind, MAX_MESSAGE, "message");
      const now = Date.now();

      db.exec("BEGIN");
      if (body.state !== undefined) {
        if (!Number.isInteger(body.round) || body.round < 0) throw new HttpError(400, "round must be a whole number");
        db.prepare("INSERT OR REPLACE INTO ralph_status (project, state, round, areas, updated_at) VALUES (?, ?, ?, ?, ?)").run(
          project, text(body.state, MAX_NAME, "state"), body.round, JSON.stringify(readAreas(body.areas ?? [])), now,
        );
      }
      db.prepare("INSERT INTO ralph_events (project, at, kind, message) VALUES (?, ?, ?, ?)").run(project, now, kind, message);
      db.prepare("DELETE FROM ralph_events WHERE project = ? AND id NOT IN (SELECT id FROM ralph_events WHERE project = ? ORDER BY id DESC LIMIT ?)").run(project, project, MAX_EVENTS_PER_PROJECT);
      db.exec("COMMIT");
      sendJson(response, 200, { ok: true });
    },
  },
  {
    method: "GET",
    path: "/api/ralph",
    handler: (request, response) => {
      requireUser(request);
      const projects = db.prepare("SELECT project, state, round, areas, updated_at FROM ralph_status ORDER BY project").all().map((row) => ({
        name: row.project,
        state: row.state,
        round: row.round,
        areas: JSON.parse(row.areas),
        updatedAt: row.updated_at,
        events: db.prepare("SELECT at, kind, message FROM ralph_events WHERE project = ? ORDER BY id DESC LIMIT 30").all(row.project),
      }));
      sendJson(response, 200, { projects });
    },
  },
];
