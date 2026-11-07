import type { Entry, Loop } from "./types";

export const time = (ms: number) => new Date(ms).toLocaleString("sv");

/** The part of a source before the colon: "worker:world" is a worker. */
export const role = (source: string) => source.split(":")[0] ?? source;

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "orchestrator", label: "Orchestrator" },
  { id: "worker", label: "Workers" },
  { id: "planner", label: "Planner" },
  { id: "merger", label: "Merger" },
  { id: "fixer", label: "Fixer" },
  { id: "quality", label: "Quality" },
  { id: "commits", label: "Commits" },
  { id: "files", label: "Files" },
];

/** Log events and commits together, newest first. */
function timeline(loop: Loop): Entry[] {
  const events = loop.events.map((event) => ({ at: event.at, source: event.source, text: event.message }));
  const commits = loop.commits.map((commit) => ({
    at: commit.at,
    source: commit.source,
    text: commit.message,
    commit,
  }));

  return [...events, ...commits].sort((first, second) => second.at - first.at);
}

/** The timeline entries a filter button shows: everything, only commits, or one role's entries. */
export function entriesFor(loop: Loop, filter: string): Entry[] {
  const entries = timeline(loop);

  if (filter === "all") return entries;

  if (filter === "commits") return entries.filter((entry) => entry.commit);

  return entries.filter((entry) => role(entry.source) === filter);
}
