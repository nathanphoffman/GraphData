import { useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import "./styles.css";
import data from "../../../data/weight-journey.json";
import { addAverages, addMuscle, fillDays, project } from "./calculate";

const days = fillDays(data.weights as [string, number][]);
const withMuscle = addMuscle(days);
const actual = addAverages(withMuscle);
// Same averages again on weight minus the muscle gained so far.
const adjusted = addAverages(withMuscle.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })));
const projectedAdjusted = project(
  withMuscle.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })),
  90,
  90,
);
const tableRows = actual.map((d, i) => ({ ...d, adj: adjusted[i] }));
const { fit, future } = project(days, 90, 90);

const RANGES = [
  { label: "All", days: Infinity },
  { label: "3 years", days: 1095 },
  { label: "1 year", days: 365 },
  { label: "90 days", days: 90 },
];

const W = 1000;
const H = 420;
const M = { top: 16, right: 20, bottom: 32, left: 48 };

const toDate = (iso: string) => new Date(iso + "T00:00:00Z");
const pretty = (iso: string) =>
  toDate(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

const signed = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)} lb`;
const yearly = (blended: number, monthly: number | null) => (monthly === null ? null : blended + monthly * 12);

/** Actual value on top, muscle-adjusted value underneath. */
function two(actual: number | null, adjusted: number | null, fmt: (n: number) => string = (n) => n.toFixed(1)) {
  const show = (n: number | null) => (n === null ? "—" : fmt(n));
  return (
    <>
      {show(actual)}
      <br />
      <span className="adjusted">{show(adjusted)}</span>
    </>
  );
}

function line(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
}

export default function WeightJourney() {
  const [range, setRange] = useState(RANGES[0]);

  const chart = useMemo(() => {
    const shown = days.slice(-Math.min(range.days, days.length));
    const shownFuture = future;
    const shownAvg = tableRows.slice(-shown.length);
    const all = [...shown, ...shownFuture, ...projectedAdjusted.future, ...shownAvg.map((d) => ({ weight: d.adj.avg3 }))] as { date: string; weight: number }[];
    const x = scaleTime()
      .domain([toDate(shown[0].date), toDate(shownFuture[shownFuture.length - 1].date)])
      .range([M.left, W - M.right]);
    const weights = all.map((d) => d.weight);
    const y = scaleLinear()
      .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
      .range([H - M.bottom, M.top]);
    const pt = (d: { date: string; weight: number }) => ({ x: x(toDate(d.date)), y: y(d.weight) });
    const firstShown = shown[0].date;
    return {
      x,
      y,
      actual: line(shown.map(pt)),
      avg3: line(shownAvg.map((d) => pt({ date: d.date, weight: d.avg3 }))),
      avg3Adjusted: line(shownAvg.map((d) => pt({ date: d.date, weight: d.adj.avg3 }))),
      fitAdjusted: line(projectedAdjusted.fit.filter((d) => d.date >= firstShown).map(pt)),
      futureAdjusted: line([
        pt(projectedAdjusted.fit[projectedAdjusted.fit.length - 1]),
        ...projectedAdjusted.future.map(pt),
      ]),
      measured: shown.filter((d) => !d.estimated).map(pt),
      fit: line(fit.filter((d) => d.date >= firstShown).map(pt)),
      future: line([pt(fit[fit.length - 1]), ...shownFuture.map(pt)]),
    };
  }, [range]);

  const first = days[0];
  const latest = days[days.length - 1];
  const lowest = days.reduce((min, d) => (d.weight < min.weight ? d : min));
  const end = future[future.length - 1];
  const endAdjusted = projectedAdjusted.future[projectedAdjusted.future.length - 1];
  const today = tableRows[tableRows.length - 1];
  const yearOut = today.monthly === null ? null : Math.round((today.blended + today.monthly * 12) * 10) / 10;

  const [showAll, setShowAll] = useState(false);
  const newestFirst = useMemo(() => [...tableRows].reverse(), []);
  const rows = showAll ? newestFirst : newestFirst.slice(0, 60);

  return (
    <div className="weight">
      <div className="weight-stats">
        <div><span>Start ({pretty(first.date)})</span><strong>{first.weight} lb</strong></div>
        <div><span>Lowest ({pretty(lowest.date)})</span><strong>{lowest.weight} lb</strong></div>
        <div><span>Latest ({pretty(latest.date)})</span><strong>{latest.weight} lb</strong></div>
        <div><span>Lost so far</span><strong>{(first.weight - latest.weight).toFixed(1)} lb</strong></div>
        <div><span>Projected {pretty(end.date)}</span><strong>{end.weight} lb</strong></div>
        <div><span>Muscle-adjusted projected {pretty(endAdjusted.date)}</span><strong>{endAdjusted.weight} lb</strong></div>
        {yearOut !== null && (
          <div>
            <span>In 1 year ({today.blended} blended + {today.monthly} × 12)</span>
            <strong>{yearOut} lb</strong>
          </div>
        )}
      </div>

      <div className="weight-ranges">
        {RANGES.map((r) => (
          <button key={r.label} className={r === range ? "active" : ""} onClick={() => setRange(r)}>
            {r.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="weight-chart" role="img" aria-label="Weight over time">
        {chart.y.ticks(8).map((t) => (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={chart.y(t)} y2={chart.y(t)} className="grid" />
            <text x={M.left - 8} y={chart.y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        {chart.x.ticks(8).map((t) => (
          <text key={t.getTime()} x={chart.x(t)} y={H - 10} textAnchor="middle">
            {t.toLocaleDateString(undefined, { month: "short", year: "2-digit", timeZone: "UTC" })}
          </text>
        ))}
        <path d={chart.actual} className="line-actual" />
        {range.days <= 365 &&
          chart.measured.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} className="dot" />)}
        <path d={chart.avg3Adjusted} className="line-avg3-adjusted" />
        <path d={chart.avg3} className="line-avg3" />
        <path d={chart.fitAdjusted} className="line-fit-adjusted" />
        <path d={chart.futureAdjusted} className="line-future-adjusted" />
        <path d={chart.fit} className="line-fit" />
        <path d={chart.future} className="line-future" />
      </svg>
      <p className="muted weight-legend">
        <span className="key actual" /> weight (gaps filled in a straight line) <span className="key avg3" /> 3-day average
        <span className="key avg3-adjusted" /> 3-day average minus muscle gained <span className="key fit" /> trend curve <span className="key future-adjusted" /> muscle-adjusted trend and projection
        <span className="key future" /> projection (quadratic curve through the last 90 days, 90 days ahead)
      </p>

      <table>
        <thead>
          <tr><th>Date</th><th>Weight (lb)</th><th>Muscle gain (lb)</th><th>Muscle gained so far (lb)</th><th>3-day avg<small>actual / muscle-adjusted</small></th><th>30-day avg</th><th>365-day avg</th><th>Blended avg</th><th>Projected / month</th><th>Projected in 1 year</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.date} className={d.estimated ? "estimated" : ""}>
              <td>{pretty(d.date)}</td>
              <td>{d.weight.toFixed(1)}</td>
              <td>{d.muscleDaily.toFixed(3)}</td>
              <td>{d.muscleTotal.toFixed(2)}</td>
              <td>{two(d.avg3, d.adj.avg3)}</td>
              <td>{two(d.avg30, d.adj.avg30)}</td>
              <td>{two(d.avg365, d.adj.avg365)}</td>
              <td>{two(d.blended, d.adj.blended)}</td>
              <td>{two(d.monthly, d.adj.monthly, signed)}</td>
              <td>{two(yearly(d.blended, d.monthly), yearly(d.adj.blended, d.adj.monthly))}</td>
              <td>{d.estimated ? "estimated" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="weight-more" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show only the latest 60 days" : `Show all ${days.length} days`}
      </button>
    </div>
  );
}
