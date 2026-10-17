import type { ItemType } from "./items";
import { gapLabel, goalColor, waitBuckets } from "./waiting";

const count = (n: number, item: ItemType) => `${n} ${n === 1 ? item.one : item.many}`;

interface Props {
  owned: number;
  avgUses: number;
  goal: number;
  item: ItemType;
}

/** Bar chart of how many items wait how long between plays, colored by closeness to the goal. */
export default function WaitChart({ owned, avgUses, goal, item }: Props) {
  const buckets = waitBuckets(avgUses).filter((b) => Math.round(b.p * owned) > 0);
  const tallest = Math.max(...buckets.map((b) => b.p));

  return (
    <div className="panel">
      <h3>How long {item.many} wait between {item.uses}</h3>
      <p className="muted">
        Picking at random, your {owned} {item.many} average {avgUses.toFixed(1)} {item.uses} a year each.
      </p>
      <div className="mini-bars">
        {buckets.map((b) => (
          <div key={b.label} className="mini-bar">
            <div>{count(Math.round(b.p * owned), item)}</div>
            <div
              className="mini-bar-fill"
              title={`${(b.p * 100).toFixed(1)}% of ${item.many}`}
              style={{ height: Math.max(2, (b.p / tallest) * 90), background: goalColor(b.mid, goal) }}
            />
          </div>
        ))}
      </div>
      <div className="mini-bar-labels">
        {buckets.map((b) => (
          <div key={b.label} className="muted">
            {gapLabel(b).replace(/^Every /, "Every\n")}
          </div>
        ))}
      </div>
    </div>
  );
}
