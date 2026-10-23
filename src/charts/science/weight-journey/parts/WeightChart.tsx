import { useMemo } from "react";
import { type ChartInput, CHART_HEIGHT, M, CHART_WIDTH, buildChart } from "../model/chart";
import type { Lines } from "../useProjections";

type Chart = ReturnType<typeof buildChart>;

/** Grid lines and tick labels for the chart. */
function Axes({ chart }: { chart: Chart }) {
  return (
    <>
      {/* One horizontal grid line and label per weight tick. */}
      {chart.y.ticks(8).map((t) => (
        <g key={t}>
          <line x1={M.left} x2={CHART_WIDTH - M.right} y1={chart.y(t)} y2={chart.y(t)} className="grid" />
          <text x={M.left - 8} y={chart.y(t) + 4} textAnchor="end">{t.toFixed(0)}</text>
        </g>
      ))}

      {/* One date label per time tick. */}
      {chart.x.ticks(8).map((t) => (
        <text key={t.getTime()} x={chart.x(t)} y={CHART_HEIGHT - 10} textAnchor="middle">
          {t.toLocaleDateString(undefined, { month: "short", year: "2-digit", timeZone: "UTC" })}
        </text>
      ))}
    </>
  );
}

/** Shaded range showing how far apart the recent projections are. */
function SpreadBands({ spread }: { spread: NonNullable<Chart["spread"]> }) {
  return (
    <>
      {/* Draw the shaded range for both the actual and the muscle-adjusted weight. */}
      {(["actual", "adjusted"] as const).map((series) => (
        <g key={series} className={`spread spread-${series}`}>
          {/* One shaded band between neighbouring curves. */}
          {spread[series].bands.map((band, index) => (
            <path key={index} d={band.d} className="spread-band" fillOpacity={band.opacity} />
          ))}
          <path d={spread[series].best} className="spread-best" />
          <path d={spread[series].worst} className="spread-worst" />
          <path d={spread[series].mean} className="spread-mean" />
        </g>
      ))}
    </>
  );
}

/** Trend lines for recent days, fading as they get older. */
function AllTrends({ trends }: { trends: Chart["allTrends"] }) {
  return (
    <>
      {/* Draw the last few trend lines, fading older ones. */}
      {trends.map((trend) => (
        <g key={trend.back} opacity={1 - trend.back * 0.3}>
          <path d={trend.adjusted} className="line-all-trend-adjusted" />
          <path d={trend.actual} className="line-all-trend" />
        </g>
      ))}
    </>
  );
}

/** The weight chart; recalculated only when the chart inputs change, since it is a lot of drawing. */
export function WeightChart({ input, lines }: { input: ChartInput; lines: Lines }) {
  const { rangeDays, k, tapered, allTrend, spread, general } = input;
  const chart = useMemo(() => buildChart(input), [rangeDays, k, tapered, allTrend, spread, general]);

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="weight-chart" role="img" aria-label="Weight over time">
      <Axes chart={chart} />
      <path d={chart.actual} className="line-actual" />
      {rangeDays <= 365 && chart.measured.map((p, index) => <circle key={index} cx={p.x} cy={p.y} r={2.5} className="dot" />)}
      <path d={chart.avg3Adjusted} className="line-avg3-adjusted" />
      <path d={chart.avg3} className="line-avg3" />
      <path d={chart.fitAdjusted} className="line-fit-adjusted" />
      {lines.quadratic && <path d={chart.futureAdjusted} className="line-future-adjusted" />}
      <path d={chart.fit} className="line-fit" />
      {lines.quadratic && <path d={chart.future} className="line-future" />}
      {lines.general && <path d={chart.general} className="line-general" />}
      {chart.spread && <SpreadBands spread={chart.spread} />}
      <AllTrends trends={chart.allTrends} />
      <path d={chart.taperAdjusted} className="line-taper-adjusted" />
      <path d={chart.taper} className="line-taper" />
    </svg>
  );
}
