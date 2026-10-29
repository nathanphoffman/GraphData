import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import { AuthGate } from "../../../auth/AuthGate";
import { useAuth } from "../../../auth/useAuth";
import "./styles.css";

interface Area {
  name: string;
  done: number;
  open: number;
  blocked: number;
}
interface LoopEvent {
  at: number;
  kind: string;
  message: string;
  source: string;
}
interface Commit {
  at: number;
  source: string;
  sha: string;
  message: string;
  added: number;
  removed: number;
  files: number;
  total: number;
}
interface LoopFile {
  name: string;
  updatedAt: number;
}
interface Loop {
  name: string;
  state: string;
  round: number;
  areas: Area[];
  updatedAt: number;
  events: LoopEvent[];
  commits: Commit[];
  files: LoopFile[];
}

/** One line of the timeline: a log event or a commit. */
type Entry = { at: number; source: string; text: string; commit?: Commit };

const POLL_MS = 15_000;
const STOP_POLLING_MS = 60 * 60 * 1000;
const time = (ms: number) => new Date(ms).toLocaleString("sv");

/** The part of a source before the colon: "worker:world" is a worker. */
const role = (source: string) => source.split(":")[0] ?? source;

const FILTERS = [
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

function Timeline({ entries }: { entries: Entry[] }) {
  if (!entries.length) return <p className="muted">Nothing here yet.</p>;

  return (
    <ul className="ralph-timeline">
      {entries.map((entry, index) => (
        <li key={`${entry.at}-${index}`} className={entry.commit ? "ralph-commit" : undefined}>
          <span className="ralph-time">{time(entry.at)}</span>
          <span className={`ralph-source ralph-${role(entry.source)}`}>{entry.source}</span>
          <span className="ralph-text">
            {entry.commit ? (
              <>
                <code>{entry.commit.sha.slice(0, 7)}</code> {entry.text} <span className="ralph-added">+{entry.commit.added}</span> <span className="ralph-removed">−{entry.commit.removed}</span>{" "}
                <span className="muted">
                  {entry.commit.files} {entry.commit.files === 1 ? "file" : "files"}
                </span>
              </>
            ) : (
              entry.text
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Lists the files the loop sent; clicking one shows its newest copy (loaded again whenever the loop sends a newer one). */
function Files({ loop }: { loop: Loop }) {
  const [name, setName] = useState<string>();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const selected = loop.files.find((file) => file.name === name);

  useEffect(() => {
    if (!selected) return;
    callApi<{ content: string }>(`/api/ralph/files/${encodeURIComponent(loop.name)}/${encodeURIComponent(selected.name)}`)
      .then((data) => {
        setContent(data.content);
        setError("");
      })
      .catch((problem: Error) => setError(problem.message));
  }, [loop.name, selected?.name, selected?.updatedAt]);

  if (!loop.files.length) return <p className="muted">The loop has not sent any files yet. It sends them when a round starts.</p>;

  return (
    <>
      <div className="ralph-filters">
        {loop.files.map((file) => (
          <button key={file.name} type="button" aria-pressed={file.name === name} onClick={() => setName(file.name)}>
            {file.name}
          </button>
        ))}
      </div>
      {selected && <p className="muted">Sent {time(selected.updatedAt)}</p>}
      {error ? <p>Could not load the file: {error}</p> : selected && <pre className="ralph-file">{content}</pre>}
    </>
  );
}

const CHART = { width: 600, height: 160, pad: 36 };

/**
 * Lines in the project after each commit. Workers commit on their own branches, so their totals only cover their branch (small dots);
 * the line follows the commits made on the merged result (planner, merger, fixer, orchestrator).
 */
function LinesChart({ commits }: { commits: Commit[] }) {
  const points = commits.filter((commit) => commit.total > 0).reverse();
  const merged = points.filter((commit) => role(commit.source) !== "worker");
  if (points.length < 2) return <p className="muted">The size graph appears once the loop has made a few commits.</p>;

  const [first, last] = [points[0]?.at ?? 0, points[points.length - 1]?.at ?? 1];
  const [low, high] = [Math.min(...points.map((commit) => commit.total)), Math.max(...points.map((commit) => commit.total))];
  const x = (at: number) => CHART.pad + ((at - first) / Math.max(1, last - first)) * (CHART.width - 2 * CHART.pad);
  const y = (total: number) => CHART.height - CHART.pad - ((total - low) / Math.max(1, high - low)) * (CHART.height - 2 * CHART.pad);

  return (
    <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} className="ralph-chart" role="img" aria-label="Lines in the project over time">
      <text x={4} y={y(high) + 4} className="ralph-axis">
        {high.toLocaleString()}
      </text>
      <text x={4} y={y(low) + 4} className="ralph-axis">
        {low.toLocaleString()}
      </text>
      <text x={CHART.pad} y={CHART.height - 8} className="ralph-axis">
        {time(first)}
      </text>
      <text x={CHART.width - CHART.pad} y={CHART.height - 8} textAnchor="end" className="ralph-axis">
        {time(last)}
      </text>
      {merged.length > 1 && (
        <polygon
          className="ralph-fill"
          points={`${x(merged[0]?.at ?? first)},${CHART.height - CHART.pad} ${merged.map((commit) => `${x(commit.at)},${y(commit.total)}`).join(" ")} ${x(merged[merged.length - 1]?.at ?? last)},${CHART.height - CHART.pad}`}
        />
      )}
      <line x1={CHART.pad} x2={CHART.width - CHART.pad} y1={CHART.height - CHART.pad} y2={CHART.height - CHART.pad} className="ralph-grid" />
      <polyline fill="none" strokeWidth={2} className="ralph-line" points={merged.map((commit) => `${x(commit.at)},${y(commit.total)}`).join(" ")} />
      {points.map((commit) => (
        <circle key={commit.sha} cx={x(commit.at)} cy={y(commit.total)} r={role(commit.source) === "worker" ? 2 : 3.5} className={role(commit.source) === "worker" ? "ralph-dot" : "ralph-line-dot"}>
          <title>{`${commit.message}: ${commit.total.toLocaleString()} lines (${commit.source})`}</title>
        </circle>
      ))}
    </svg>
  );
}

function LoopView({ loop }: { loop: Loop }) {
  const [filter, setFilter] = useState("all");
  const entries = timeline(loop);
  const shown = filter === "all" ? entries : filter === "commits" ? entries.filter((entry) => entry.commit) : entries.filter((entry) => role(entry.source) === filter);

  // Newest first, so the first commit on the merged result (or else any commit) that knows the size is the current one.
  const sized = loop.commits.filter((commit) => commit.total > 0);
  const current = sized.find((commit) => role(commit.source) !== "worker") ?? sized[0];

  return (
    <section className="ralph-card">
      <header className="ralph-head">
        <h2>{loop.name}</h2>
        <span className={`ralph-state ralph-state-${loop.state}`}>{loop.state}</span>
      </header>
      <div className="ralph-tiles">
        <div className="ralph-tile">
          <span className="ralph-tile-label">Round</span>
          <strong>{loop.round}</strong>
        </div>
        <div className="ralph-tile">
          <span className="ralph-tile-label">Project size</span>
          <strong>{current ? `${current.total.toLocaleString()} lines` : "—"}</strong>
        </div>
        <div className="ralph-tile">
          <span className="ralph-tile-label">Commits</span>
          <strong>{loop.commits.length}</strong>
        </div>
        <div className="ralph-tile">
          <span className="ralph-tile-label">Last report</span>
          <strong>{time(loop.updatedAt)}</strong>
        </div>
      </div>
      <div className="ralph-areas">
        {loop.areas.map((area) => {
          const total = Math.max(1, area.done + area.open + area.blocked);

          return (
            <div key={area.name} className="ralph-area">
              <span>{area.name}</span>
              <div className="ralph-bar" title={`${area.done} done, ${area.open} open, ${area.blocked} blocked`}>
                <i className="ralph-bar-done" style={{ width: `${(area.done / total) * 100}%` }} />
                <i className="ralph-bar-blocked" style={{ width: `${(area.blocked / total) * 100}%` }} />
              </div>
              <span className="muted">
                {area.done}/{total}
                {area.blocked > 0 && ` · ${area.blocked} blocked`}
              </span>
            </div>
          );
        })}
      </div>
      <LinesChart commits={loop.commits} />
      <div className="ralph-filters">
        {FILTERS.map((option) => (
          <button key={option.id} type="button" aria-pressed={filter === option.id} onClick={() => setFilter(option.id)}>
            {option.label}
          </button>
        ))}
      </div>
      {filter === "files" ? <Files loop={loop} /> : <Timeline entries={shown} />}
    </section>
  );
}

/** Shows every loop that has reported in: state, round, items per area, and a filterable timeline of log lines and commits. */
function Loops() {
  const [loops, setLoops] = useState<Loop[] | null>(null);
  const [error, setError] = useState("");
  const [stopped, setStopped] = useState(false);

  // Load when the page opens, then every 15 seconds while this window is focused, until an hour has passed (a refresh starts over).
  useEffect(() => {
    const started = Date.now();
    const load = () =>
      callApi<{ projects: Loop[] }>("/api/ralph")
        .then((data) => {
          setLoops(data.projects);
          setError("");
        })
        .catch((problem: Error) => setError(problem.message));
    const active = () => document.hasFocus() && !document.hidden;
    const expired = () => Date.now() - started > STOP_POLLING_MS;

    load();
    const timer = setInterval(() => {
      if (expired()) {
        clearInterval(timer);
        setStopped(true);
      } else if (active()) load();
    }, POLL_MS);
    // Catch up right away when coming back to the window (the server shares its answer, so this is cheap).
    const onFocus = () => {
      if (!expired()) load();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!loops) return error ? <p>Could not load RalphLoops: {error}</p> : <p>Loading…</p>;

  return (
    <>
      {error && <p>Could not refresh: {error}</p>}
      {stopped && <p className="muted">Live updates stopped after an hour. Refresh the page to start them again.</p>}
      {!loops.length && <p className="muted">No loop has reported yet.</p>}
      {loops.map((loop) => (
        <LoopView key={loop.name} loop={loop} />
      ))}
    </>
  );
}

/** Only visible once logged in; the server refuses the data otherwise too. */
export default function RalphLoops() {
  const auth = useAuth();

  return <AuthGate auth={auth}>{() => <Loops />}</AuthGate>;
}
