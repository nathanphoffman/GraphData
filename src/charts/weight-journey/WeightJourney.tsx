import { useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import "./styles.css";
import data from "../../../data/weight-journey.json";
import { type Averages, addAverages, addMuscle, compress, fillDays, project } from "./calculate";

const days = fillDays(data.weights as [string, number][]);
const withMuscle = addMuscle(days);
const projectedAdjusted = project(
  withMuscle.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })),
  90,
  90,
);
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

type Unit = "lb" | "kg";
const KG_PER_LB = 0.45359237;

/** Colour band for a weight, using the kg targets. Muscle-adjusted values add back 5 kg (the targets sit 5 kg lower). */
function band(lb: number | null, adjusted: boolean): string {
  if (lb === null) return "";
  const kg = lb * KG_PER_LB + (adjusted ? 5 : 0);
  if (kg < 80) return "band-orange";
  if (kg < 85) return "band-yellow";
  if (kg < 90) return "band-green";
  if (kg < 95) return "band-blue";
  if (kg < 100) return "band-green";
  if (kg < 110) return "band-yellow";
  return "band-red";
}

/** Mean of the 3-day, 30-day, 365-day, blended and 1-year projected values (projection is missing for the first 30 days). */
function allAverage(a: Averages): number {
  const values = [a.avg3, a.avg30, a.avg365, a.blended, yearly(a.blended, a.monthly)].filter((v): v is number => v !== null);
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

const yearly = (blended: number, monthly: number | null) => (monthly === null ? null : blended + monthly * 12);

const DAILY_WINDOWS = { short: 3, medium: 30, long: 365 };
// Days per row in the compressed view: 3 rows = 3x that many days, 30 rows = 30x, and the long average uses all data.
const COMPRESS_STEP = 3;
const COMPRESSED_WINDOWS = { short: 3, medium: 30, long: Infinity };

function buildRows(rows: typeof withMuscle, windows: typeof DAILY_WINDOWS, step: number) {
  const actual = addAverages(rows, windows, step);
  // Same averages again on weight minus the muscle gained so far.
  const adjusted = addAverages(rows.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })), windows, step);
  const baseRows = actual.map((d, i) => ({ ...d, adj: adjusted[i] }));
  const lag = windows.medium;
  const allActual = baseRows.map((d) => allAverage(d));
  const allAdjusted = baseRows.map((d) => allAverage(d.adj));
  /** All average now plus 12 times its change over the last `lag` rows, like the blended projection (change per 30 real days x 12). */
  const projectAll = (series: number[], i: number) =>
    i >= lag ? series[i] + ((series[i] - series[i - lag]) / step) * 12 : null;
  const projActual = allActual.map((_, i) => projectAll(allActual, i));
  const projAdjusted = allAdjusted.map((_, i) => projectAll(allAdjusted, i));
  /** Mean of the projected all average over this row and the 2 before it (rows with no projection yet are skipped). */
  const last3 = (series: (number | null)[], i: number) => {
    const values = series.slice(Math.max(0, i - 2), i + 1).filter((v): v is number => v !== null);
    return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
  };
  return baseRows.map((d, i) => ({
    ...d,
    allAvg: allActual[i],
    allAvgAdj: allAdjusted[i],
    allProj: projActual[i],
    allProjAdj: projAdjusted[i],
    allProj3: last3(projActual, i),
    allProj3Adj: last3(projAdjusted, i),
  }));
}

const dailyRows = buildRows(withMuscle, DAILY_WINDOWS, 1);
const compressedRows = buildRows(compress(withMuscle, COMPRESS_STEP), COMPRESSED_WINDOWS, COMPRESS_STEP);

function line(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
}

export default function WeightJourney() {
  const [range, setRange] = useState(RANGES[0]);
  const [compressed, setCompressed] = useState(false);
  const tableRows = compressed ? compressedRows : dailyRows;
  const [unit, setUnit] = useState<Unit>("lb");
  const k = unit === "kg" ? KG_PER_LB : 1;
  const w = (lb: number, digits = 1) => (lb * k).toFixed(digits);
  const signed = (lb: number) => `${lb > 0 ? "+" : ""}${w(lb)} ${unit}`;

  /** Actual value on top, muscle-adjusted value underneath; `colour` adds the target-band highlight. */
  const two = (
    actual: number | null,
    adjusted: number | null,
    colour = true,
    fmt: (lb: number) => string = w,
  ) => {
    const show = (n: number | null) => (n === null ? "—" : fmt(n));
    return (
      <>
        <span className={colour ? band(actual, false) : ""}>{show(actual)}</span>
        <br />
        <span className={`adjusted ${colour ? band(adjusted, true) : ""}`}>{show(adjusted)}</span>
      </>
    );
  };

  const chart = useMemo(() => {
    const shown = days.slice(-Math.min(range.days, days.length));
    const shownFuture = future;
    const shownAvg = tableRows.filter((d) => d.date >= shown[0].date);
    const all = [...shown, ...shownFuture, ...projectedAdjusted.future, ...shownAvg.map((d) => ({ weight: d.adj.avg3 }))] as { date: string; weight: number }[];
    const x = scaleTime()
      .domain([toDate(shown[0].date), toDate(shownFuture[shownFuture.length - 1].date)])
      .range([M.left, W - M.right]);
    const weights = all.map((d) => d.weight * k);
    const y = scaleLinear()
      .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
      .range([H - M.bottom, M.top]);
    const pt = (d: { date: string; weight: number }) => ({ x: x(toDate(d.date)), y: y(d.weight * k) });
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
  }, [range, k, tableRows]);

  const first = days[0];
  const latest = days[days.length - 1];
  const lowest = days.reduce((min, d) => (d.weight < min.weight ? d : min));
  const end = future[future.length - 1];
  const endAdjusted = projectedAdjusted.future[projectedAdjusted.future.length - 1];
  const today = tableRows[tableRows.length - 1];
  const yearOut = today.monthly === null ? null : Math.round((today.blended + today.monthly * 12) * 10) / 10;

  const [showAll, setShowAll] = useState(false);
  const newestFirst = useMemo(() => [...tableRows].reverse(), [tableRows]);
  const rows = showAll ? newestFirst : newestFirst.slice(0, 60);

  return (
    <div className="weight">
      <div className="weight-stats">
        <div><span>Start ({pretty(first.date)})</span><strong>{w(first.weight)} {unit}</strong></div>
        <div><span>Lowest ({pretty(lowest.date)})</span><strong>{w(lowest.weight)} {unit}</strong></div>
        <div><span>Latest ({pretty(latest.date)})</span><strong>{w(latest.weight)} {unit}</strong></div>
        <div><span>Lost so far</span><strong>{w(first.weight - latest.weight)} {unit}</strong></div>
        <div><span>Projected {pretty(end.date)}</span><strong>{w(end.weight)} {unit}</strong></div>
        <div><span>Muscle-adjusted projected {pretty(endAdjusted.date)}</span><strong>{w(endAdjusted.weight)} {unit}</strong></div>
        {yearOut !== null && (
          <div>
            <span>In 1 year ({w(today.blended)} blended + {w(today.monthly!)} × 12)</span>
            <strong>{w(yearOut)} {unit}</strong>
          </div>
        )}
      </div>

      <div className="weight-ranges">
        {(["lb", "kg"] as Unit[]).map((u) => (
          <button key={u} className={u === unit ? "active" : ""} onClick={() => setUnit(u)}>
            {u}
          </button>
        ))}
        <span className="weight-gap" />
        <label className="weight-compress">
          <input type="checkbox" checked={compressed} onChange={(e) => setCompressed(e.target.checked)} /> Compress to {COMPRESS_STEP} day view
        </label>
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
            <text x={M.left - 8} y={chart.y(t) + 4} textAnchor="end">{(t).toFixed(0)}</text>
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
          <tr><th>Date</th><th>Weight ({unit})</th><th>Muscle gain ({unit})</th><th>Muscle gained so far ({unit})</th><th>3-day avg<small>actual / muscle-adjusted</small></th><th>30-day avg</th><th>365-day avg</th><th>Blended avg</th><th>Projected / month</th><th>Projected in 1 year</th><th>All average</th><th>Projected all average</th><th>3 day projected all average</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.date} className={d.estimated ? "estimated" : ""}>
              <td>{pretty(d.date)}</td>
              <td><span className={band(d.weight, false)}>{w(d.weight)}</span></td>
              <td>{w(d.muscleDaily, 3)}</td>
              <td>{w(d.muscleTotal, 2)}</td>
              <td>{two(d.avg3, d.adj.avg3)}</td>
              <td>{two(d.avg30, d.adj.avg30)}</td>
              <td>{two(d.avg365, d.adj.avg365)}</td>
              <td>{two(d.blended, d.adj.blended)}</td>
              <td>{two(d.monthly, d.adj.monthly, false, signed)}</td>
              <td>{two(yearly(d.blended, d.monthly), yearly(d.adj.blended, d.adj.monthly))}</td>
              <td>{two(d.allAvg, d.allAvgAdj)}</td>
              <td>{two(d.allProj, d.allProjAdj)}</td>
              <td>{two(d.allProj3, d.allProj3Adj)}</td>
              <td>{d.estimated ? "estimated" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="weight-more" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show only the latest 60 rows" : `Show all ${tableRows.length} ${compressed ? "rows" : "days"}`}
      </button>
    </div>
  );
}
