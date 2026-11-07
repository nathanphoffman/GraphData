import { role, time } from "../model/timeline";
import type { Commit } from "../model/types";

const CHART = { width: 600, height: 160, pad: 36 };

/**
 * Lines in the project after each commit. Workers commit on their own branches, so their totals only cover their branch (small dots);
 * the line follows the commits made on the merged result (planner, merger, fixer, orchestrator).
 */
export default function LinesChart({ commits }: { commits: Commit[] }) {
  const points = commits.filter((commit) => commit.total > 0).reverse();
  const merged = points.filter((commit) => role(commit.source) !== "worker");

  if (points.length < 2) return <p className="muted">The size graph appears once the loop has made a few commits.</p>;

  const [first, last] = [points[0]?.at ?? 0, points[points.length - 1]?.at ?? 1];
  const [low, high] = [
    Math.min(...points.map((commit) => commit.total)),
    Math.max(...points.map((commit) => commit.total)),
  ];

  const x = (at: number) => CHART.pad + ((at - first) / Math.max(1, last - first)) * (CHART.width - 2 * CHART.pad);

  const y = (total: number) =>
    CHART.height - CHART.pad - ((total - low) / Math.max(1, high - low)) * (CHART.height - 2 * CHART.pad);

  return (
    <svg
      viewBox={`0 0 ${CHART.width} ${CHART.height}`}
      className="ralph-chart"
      role="img"
      aria-label="Lines in the project over time"
    >
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

      <line
        x1={CHART.pad}
        x2={CHART.width - CHART.pad}
        y1={CHART.height - CHART.pad}
        y2={CHART.height - CHART.pad}
        className="ralph-grid"
      />
      <polyline
        fill="none"
        strokeWidth={2}
        className="ralph-line"
        points={merged.map((commit) => `${x(commit.at)},${y(commit.total)}`).join(" ")}
      />
      {points.map((commit) => (
        <circle
          key={commit.sha}
          cx={x(commit.at)}
          cy={y(commit.total)}
          r={role(commit.source) === "worker" ? 2 : 3.5}
          className={role(commit.source) === "worker" ? "ralph-dot" : "ralph-line-dot"}
        >
          <title>{`${commit.message}: ${commit.total.toLocaleString()} lines (${commit.source})`}</title>
        </circle>
      ))}

    </svg>
  );
}
