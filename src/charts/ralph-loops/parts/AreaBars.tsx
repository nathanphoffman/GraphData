import type { Area } from "../model/types";

const PERCENT = 100;

/** One progress bar per area of work: how many items are done, open and blocked. */
export default function AreaBars({ areas }: { areas: Area[] }) {
  return (
    <div className="ralph-areas">
      {areas.map((area) => {
        const total = Math.max(1, area.done + area.open + area.blocked);

        return (
          <div key={area.name} className="ralph-area">
            <span>{area.name}</span>
            <div className="ralph-bar" title={`${area.done} done, ${area.open} open, ${area.blocked} blocked`}>
              <i className="ralph-bar-done" style={{ width: `${(area.done / total) * PERCENT}%` }} />
              <i className="ralph-bar-blocked" style={{ width: `${(area.blocked / total) * PERCENT}%` }} />
            </div>
            <span className="muted">
              {area.done}/{total}
              {area.blocked > 0 && ` · ${area.blocked} blocked`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
