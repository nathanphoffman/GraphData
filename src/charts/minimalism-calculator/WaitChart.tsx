import { gapLabel, goalColor, waitBuckets } from "./calculate";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

interface Props {
  owned: number;
  avgUses: number;
  goal: number;
}

/** Bar chart of how many items wait how long between plays, colored by closeness to the goal. */
export default function WaitChart({ owned, avgUses, goal }: Props) {
  const buckets = waitBuckets(avgUses).filter((b) => Math.round(b.p * owned) > 0);
  const tallest = Math.max(...buckets.map((b) => b.p));

  return (
    <div className="panel">
          <h3>How long items wait to be played</h3>
          <p className="muted">
            Picking at random, your {owned} items average{" "}
            {avgUses.toFixed(1)} uses a year each.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 140,
            }}
          >
            {buckets.map((b) => (
              <div
                key={b.label}
                style={{ flex: 1, textAlign: "center", fontSize: 12 }}
              >
                <div>{plural(Math.round(b.p * owned), "item")}</div>
                <div
                  title={`${(b.p * 100).toFixed(1)}% of items`}
                  style={{
                    height: Math.max(2, (b.p / tallest) * 90),
                    background: goalColor(b.mid, goal),
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {buckets.map((b) => (
              <div
                key={b.label}
                className="muted"
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 12,
                  whiteSpace: "pre-line",
                }}
              >
                {gapLabel(b).replace(/^Every /, "Every\n")}
              </div>
            ))}
          </div>
    </div>
  );
}
