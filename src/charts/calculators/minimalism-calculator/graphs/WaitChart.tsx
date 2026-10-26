import { PERCENT } from "../logic/constants";
import type { ItemType } from "../logic/items";
import { gapLabel, goalColor, waitBuckets, type Bucket } from "../logic/waiting";

/** Counts with the right singular or plural wording for the chosen item type. */
/** The tallest bar is this many pixels high. */
const TALLEST_BAR_PX = 90;

const count = (quantity: number, item: ItemType) => `${quantity} ${quantity === 1 ? item.one : item.many}`;

interface Props {
  owned: number;
  avgUses: number;
  goal: number;
  item: ItemType;
}

/** Bar chart of how many items wait how long between plays, colored by closeness to the goal. */
export default function WaitChart({ owned, avgUses, goal, item }: Props) {
  // Neighboring buckets that round to the same wait label (e.g. "Every ~2 months") become one bar.
  const merged = waitBuckets(avgUses).reduce<Bucket[]>((bucket, second) => {
    const last = bucket[bucket.length - 1];

    if (last && gapLabel(last) === gapLabel(second)) {
      const combinedShare = last.p + second.p;
      const middle = combinedShare > 0 ? (last.mid * last.p + second.mid * second.p) / combinedShare : last.mid;
      bucket[bucket.length - 1] = { ...last, label: `${last.label}+${second.label}`, mid: middle, p: combinedShare };
    } else {
      bucket.push(second);
    }

    return bucket;
  }, []);

  const buckets = merged.filter((bucket) => Math.round(bucket.p * owned) > 0);
  const tallest = Math.max(...buckets.map((bucket) => bucket.p));

  return (
    <div className="panel">
      <h3>How long {item.many} wait between {item.uses}</h3>
      <p className="muted">
        Picking at random, your {owned} {item.many} average {avgUses.toFixed(1)} {item.uses} a year each.
      </p>
      <div className="mini-bars">
        {/* One bar per bucket, sized by how many of your items land in it. */}
        {buckets.map((bucket) => (
          <div key={bucket.label} className="mini-bar">
            <div>{count(Math.round(bucket.p * owned), item)}</div>
            <div
              className="mini-bar-fill"
              title={`${(bucket.p * PERCENT).toFixed(1)}% of ${item.many}`}
              style={{ height: Math.max(2, (bucket.p / tallest) * TALLEST_BAR_PX), background: goalColor(bucket.mid, goal) }}
            />
          </div>
        ))}
      </div>
      <div className="mini-bar-labels">
        {/* One label per bucket under the bars; the line break lets "Every ..." wrap onto two lines. */}
        {buckets.map((bucket) => (
          <div key={bucket.label} className="muted">
            {gapLabel(bucket).replace(/^Every /, "Every\n")} {/* Put a line break after "Every" so the label wraps onto two lines (the regex only matches at the start). */}
          </div>
        ))}
      </div>
    </div>
  );
}
