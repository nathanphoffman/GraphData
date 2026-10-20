import { useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import "./styles.css";
import data from "../../../data/weight-journey.json";
import { fillDays, project } from "./calculate";

const days = fillDays(data.weights as [string, number][]);
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

function line(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
}

export default function WeightJourney() {
  const [range, setRange] = useState(RANGES[0]);

  const chart = useMemo(() => {
    const shown = days.slice(-Math.min(range.days, days.length));
    const shownFuture = future;
    const all = [...shown, ...shownFuture];
    const x = scaleTime()
      .domain([toDate(all[0].date), toDate(all[all.length - 1].date)])
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
      measured: shown.filter((d) => !d.estimated).map(pt),
      fit: line(fit.filter((d) => d.date >= firstShown).map(pt)),
      future: line([pt(fit[fit.length - 1]), ...shownFuture.map(pt)]),
    };
  }, [range]);

  const first = days[0];
  const latest = days[days.length - 1];
  const lowest = days.reduce((min, d) => (d.weight < min.weight ? d : min));
  const end = future[future.length - 1];

  const [showAll, setShowAll] = useState(false);
  const newestFirst = useMemo(() => [...days].reverse(), []);
  const rows = showAll ? newestFirst : newestFirst.slice(0, 60);

  return (
    <div className="weight">
      <div className="weight-stats">
        <div><span>Start ({pretty(first.date)})</span><strong>{first.weight} lb</strong></div>
        <div><span>Lowest ({pretty(lowest.date)})</span><strong>{lowest.weight} lb</strong></div>
        <div><span>Latest ({pretty(latest.date)})</span><strong>{latest.weight} lb</strong></div>
        <div><span>Lost so far</span><strong>{(first.weight - latest.weight).toFixed(1)} lb</strong></div>
        <div><span>Projected {pretty(end.date)}</span><strong>{end.weight} lb</strong></div>
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
        <path d={chart.fit} className="line-fit" />
        <path d={chart.future} className="line-future" />
      </svg>
      <p className="muted weight-legend">
        <span className="key actual" /> weight (gaps filled in a straight line) <span className="key fit" /> trend curve
        <span className="key future" /> projection (quadratic curve through the last 90 days, 90 days ahead)
      </p>

      <table>
        <thead>
          <tr><th>Date</th><th>Weight (lb)</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.date} className={d.estimated ? "estimated" : ""}>
              <td>{pretty(d.date)}</td>
              <td>{d.weight.toFixed(1)}</td>
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
