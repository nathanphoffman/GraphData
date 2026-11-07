import { role, time } from "../model/timeline";
import type { Loop } from "../model/types";

const PERCENT = 100;

/** Round, project size, language split, commit count and the time of the last report. */
export default function LoopTiles({ loop }: { loop: Loop }) {
  // Newest first, so the first commit on the merged result (or else any commit) that knows the size is the current one.
  const sized = loop.commits.filter((commit) => commit.total > 0);
  const current = sized.find((commit) => role(commit.source) !== "worker") ?? sized[0];
  const { languages } = loop;

  return (
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
        <span className="ralph-tile-label">Deor / Rust lines</span>
        <strong>{languages ? `${languages.deor.toLocaleString()} / ${languages.rust.toLocaleString()}` : "—"}</strong>
        <span className="muted">
          {languages
            ? `${((languages.deor / Math.max(1, languages.deor + languages.rust)) * PERCENT).toFixed(1)}% Deor`
            : "no data yet"}
        </span>
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
  );
}
