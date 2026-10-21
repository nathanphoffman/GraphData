import { useMemo, useState } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import "./styles.css";
import data from "../../../data/weight-journey.json";
import { type Averages, addAverages, addMuscle, compress, fillDays, project, projectTapering, taperToTotal } from "./calculate";

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

/** Colour for a monthly change (lb, negative = loss) using kg thresholds. */
function deltaBand(lb: number | null): string {
  if (lb === null) return "";
  const kg = lb * KG_PER_LB;
  if (kg < -3) return "band-orange";
  if (kg >= -1.5 && kg <= -0.5) return "band-blue";
  if (kg < 0) return "band-green";
  if (kg < 1) return "band-yellow";
  return "band-red";
}

/** Mean of the 3-day, 30-day, 365-day, blended and 1-year projected values (projection is missing for the first 30 days). */
function allAverage(a: Averages): number {
  const values = [a.avg3, a.avg30, a.avg365, a.blended, yearly(a.blended, a.monthly)].filter((v): v is number => v !== null);
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

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
  /** Monthly rate from the 3-day average: change over 15 days doubled, averaged with the change over 30 days. */
  const lag15 = Math.round(15 / step);
  const lag30 = Math.round(30 / step);
  const recent = (get: (d: (typeof baseRows)[number]) => number, i: number) =>
    i >= lag30 ? round1((2 * (get(baseRows[i]) - get(baseRows[i - lag15])) + (get(baseRows[i]) - get(baseRows[i - lag30]))) / 2) : null;
  return baseRows.map((d, i) => ({
    ...d,
    recent: recent((r) => r.avg3, i),
    recentAdj: recent((r) => r.adj.avg3, i),
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

/** Tapering curve from `start` to `target` (treated as the total loss) over `ahead` days, starting at `date`. */
const taperCurve = (date: string, start: number, target: number, ahead: number) => [
  { date, weight: start },
  ...taperToTotal(date, start, start - target, ahead),
];

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
  const signed = (lb: number) => `${lb > 0 ? "+" : ""}${w(lb)}`;

  /** Actual value on top, muscle-adjusted value underneath; `colour` adds the target-band highlight. */
  const two = (
    actual: number | null,
    adjusted: number | null,
    colour = true,
    fmt: (lb: number) => string = w,
    bandOf: (lb: number | null, adjusted: boolean) => string = band,
  ) => {
    const show = (n: number | null) => (n === null ? "—" : fmt(n));
    return (
      <>
        <span className={colour ? bandOf(actual, false) : ""}>{show(actual)}</span>
        <br />
        <span className={`adjusted ${colour ? bandOf(adjusted, true) : ""}`}>{show(adjusted)}</span>
      </>
    );
  };

  // Projection tool: monthly loss typed in the shown unit, converted back to lb.
  const [lossInput, setLossInput] = useState("");
  const [projMonths, setProjMonths] = useState("12");
  const monthlyLoss = Number(lossInput) / k;
  const aheadDays = Math.round(Number(projMonths) * 30);
  const tapered = useMemo(() => {
    if (!lossInput || !(monthlyLoss > 0) || !(aheadDays > 0)) return null;
    const lastRow = dailyRows[dailyRows.length - 1];
    return projectTapering(
      lastRow.date,
      lastRow.avg3,
      withMuscle[withMuscle.length - 1].muscleTotal,
      monthlyLoss,
      withMuscle[withMuscle.length - 1].muscleDaily,
      aheadDays,
    );
  }, [lossInput, monthlyLoss, aheadDays]);

  const [showAllTrend, setShowAllTrend] = useState(true);
  /** Tapering curve from a row's 3-day average down to its 3 day projected all average, treated as the total loss (first month = 1/12 of it). Today, yesterday and the day before. */
  const allTrend = useMemo(() => {
    if (!showAllTrend) return null;
    const ahead = aheadDays > 0 ? aheadDays : 365;
    const curve = (date: string, start: number, target: number) => taperCurve(date, start, target, ahead);
    const trends = [0, 1, 2].flatMap((back) => {
      const row = tableRows[tableRows.length - 1 - back];
      if (!row || row.allProj3 === null || row.allProj3Adj === null) return [];
      return [{ back, actual: curve(row.date, row.avg3, row.allProj3), adjusted: curve(row.date, row.adj.avg3, row.allProj3Adj) }];
    });
    return trends.length ? { trends, date: trends[0].actual[trends[0].actual.length - 1].date } : null;
  }, [showAllTrend, tableRows, aheadDays]);

  const [showSpread, setShowSpread] = useState(true);
  /**
   * The last 7 rows each give a tapering curve to their own 3 day projected all average. Sorted best (lowest target)
   * to worst (highest), with a mean curve; used for the shaded range.
   */
  const spread = useMemo(() => {
    if (!showSpread) return null;
    const ahead = aheadDays > 0 ? aheadDays : 365;
    const rows7 = tableRows.slice(-7).filter((r) => r.allProj3 !== null && r.allProj3Adj !== null);
    if (rows7.length < 2) return null;
    const build = (start: (r: (typeof rows7)[number]) => number, target: (r: (typeof rows7)[number]) => number) => {
      const curves = rows7
        .map((r) => ({ target: target(r), points: taperCurve(r.date, start(r), target(r), ahead) }))
        .sort((a, b) => a.target - b.target);
      const mean = (f: (r: (typeof rows7)[number]) => number) => rows7.reduce((sum, r) => sum + f(r), 0) / rows7.length;
      return { curves, mean: taperCurve(rows7[rows7.length - 1].date, mean(start), mean(target), ahead) };
    };
    return {
      actual: build((r) => r.avg3, (r) => r.allProj3!),
      adjusted: build((r) => r.adj.avg3, (r) => r.allProj3Adj!),
    };
  }, [showSpread, tableRows, aheadDays]);

  const [showQuadratic, setShowQuadratic] = useState(true);
  const [showGeneral, setShowGeneral] = useState(true);
  /**
   * Quadratic projection averaged with the mean curve of the last week's 3 day projected all averages, day by day
   * (only the days both cover, which is the quadratic's 90 days ahead).
   */
  const general = useMemo(() => {
    const ahead = aheadDays > 0 ? aheadDays : 365;
    const rows7 = tableRows.slice(-7).filter((r) => r.allProj3 !== null);
    if (!rows7.length) return null;
    const mean = (f: (r: (typeof rows7)[number]) => number) => rows7.reduce((sum, r) => sum + f(r), 0) / rows7.length;
    const meanCurve = taperCurve(rows7[rows7.length - 1].date, mean((r) => r.avg3), mean((r) => r.allProj3!), ahead);
    const quadratic = new Map([fit[fit.length - 1], ...future].map((d) => [d.date, d.weight]));
    return meanCurve.flatMap((d) => {
      const q = quadratic.get(d.date);
      return q === undefined ? [] : [{ date: d.date, weight: (d.weight + q) / 2 }];
    });
  }, [tableRows, aheadDays]);

  const chart = useMemo(() => {
    const shown = days.slice(-Math.min(range.days, days.length));
    const shownFuture = tapered ? [...future, ...tapered] : future;
    const shownAvg = tableRows.filter((d) => d.date >= shown[0].date);
    const all = [...shown, ...shownFuture, ...projectedAdjusted.future, ...(tapered ?? []).flatMap((d) => [{ weight: d.weight }, { weight: d.adjusted }]), ...(allTrend ? allTrend.trends.flatMap((t) => [...t.actual, ...t.adjusted]) : []), ...(spread ? [spread.actual, spread.adjusted].flatMap((g) => [...g.curves[0].points, ...g.curves[g.curves.length - 1].points]) : []), ...shownAvg.map((d) => ({ weight: d.adj.avg3 }))] as { date: string; weight: number }[];
    const x = scaleTime()
      .domain([toDate(shown[0].date), toDate([shownFuture[shownFuture.length - 1].date, allTrend?.date ?? "", spread ? spread.actual.mean[spread.actual.mean.length - 1].date : ""].sort().pop()!)])
      .range([M.left, W - M.right]);
    const weights = all.map((d) => d.weight * k);
    const y = scaleLinear()
      .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
      .range([H - M.bottom, M.top]);
    const pt = (d: { date: string; weight: number }) => ({ x: x(toDate(d.date)), y: y(d.weight * k) });
    const firstShown = shown[0].date;
    /** Shaded bands between neighbouring curves: the closer two curves sit at the end, the more opaque the band (that's where the projections concentrate). */
    const shade = (g: NonNullable<typeof spread>["actual"]) => {
      const gaps = g.curves.slice(1).map((c, i) => Math.max(Math.abs(c.target - g.curves[i].target), 0.1));
      const densest = Math.max(...gaps.map((gap) => 1 / gap));
      return {
        bands: gaps.map((gap, i) => {
          const a = g.curves[i].points.map(pt);
          const b = g.curves[i + 1].points.map(pt).reverse();
          return { d: `${line(a)}L${line(b).slice(1)}Z`, opacity: 0.06 + (0.5 * (1 / gap)) / densest };
        }),
        best: line(g.curves[0].points.map(pt)),
        worst: line(g.curves[g.curves.length - 1].points.map(pt)),
        mean: line(g.mean.map(pt)),
      };
    };
    const lastRow = dailyRows[dailyRows.length - 1];
    const anchor = pt({ date: lastRow.date, weight: lastRow.avg3 });
    const anchorAdjusted = pt({ date: lastRow.date, weight: lastRow.adj.avg3 });
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
      future: line([pt(fit[fit.length - 1]), ...future.map(pt)]),
      general: general ? line(general.map(pt)) : "",
      spread: spread ? { actual: shade(spread.actual), adjusted: shade(spread.adjusted) } : null,
      allTrends: (allTrend?.trends ?? []).map((t) => ({
        back: t.back,
        actual: line(t.actual.map(pt)),
        adjusted: line(t.adjusted.map(pt)),
      })),
      taper: tapered ? line([anchor, ...tapered.map(pt)]) : "",
      taperAdjusted: tapered
        ? line([anchorAdjusted, ...tapered.map((d) => pt({ date: d.date, weight: d.adjusted }))])
        : "",
    };
  }, [range, k, tableRows, tapered, allTrend, spread, general]);

  const first = days[0];
  const latest = days[days.length - 1];
  const lowest = days.reduce((min, d) => (d.weight < min.weight ? d : min));
  const end = future[future.length - 1];
  const endAdjusted = projectedAdjusted.future[projectedAdjusted.future.length - 1];
  const today = tableRows[tableRows.length - 1];
  const yearOut = today.monthly === null ? null : Math.round((today.blended + today.monthly * 12) * 10) / 10;

  // Table shows the last 90 days by default, or one chosen quarter (e.g. "2025-Q3").
  const [period, setPeriod] = useState("default");
  const quarterOf = (iso: string) => `${iso.slice(0, 4)}-Q${Math.floor((Number(iso.slice(5, 7)) - 1) / 3) + 1}`;
  const newestFirst = useMemo(() => [...tableRows].reverse(), [tableRows]);
  const quarters = useMemo(() => [...new Set(newestFirst.map((r) => quarterOf(r.date)))], [newestFirst]);
  const rows = useMemo(() => {
    if (period !== "default") return newestFirst.filter((r) => quarterOf(r.date) === period);
    const cutoff = new Date(toDate(newestFirst[0].date).getTime() - 89 * 86_400_000).toISOString().slice(0, 10);
    return newestFirst.filter((r) => r.date >= cutoff);
  }, [newestFirst, period]);

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

      <div className="weight-controls">
        <div className="control-group">
          <span className="control-label">Units</span>
          <div className="segmented">
            {(["lb", "kg"] as Unit[]).map((u) => (
              <button key={u} className={u === unit ? "active" : ""} onClick={() => setUnit(u)}>
                {u}
              </button>
            ))}
          </div>
        </div>
        <div className="control-group">
          <span className="control-label">Chart range</span>
          <div className="segmented">
            {RANGES.map((r) => (
              <button key={r.label} className={r === range ? "active" : ""} onClick={() => setRange(r)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="control-group">
          <span className="control-label">Projection tool</span>
          <div className="field-row">
            <label className="field">
              Loss per month ({unit})
              <input type="number" min="0" step="0.5" value={lossInput} placeholder="e.g. 4" onChange={(e) => setLossInput(e.target.value)} />
            </label>
            <label className="field">
              Show for (months)
              <input type="number" min="1" step="1" value={projMonths} onChange={(e) => setProjMonths(e.target.value)} />
            </label>
          </div>
          {tapered && (
            <span className="muted">
              In {projMonths} months: {w(tapered[tapered.length - 1].weight)} {unit} ({w(tapered[tapered.length - 1].adjusted)} {unit} muscle-adjusted)
            </span>
          )}
        </div>
        <div className="control-group control-wide">
          <span className="control-label">Lines</span>
          <div className="toggles">
            <label className="toggle">
              <input type="checkbox" checked={showQuadratic} onChange={(e) => setShowQuadratic(e.target.checked)} /> Quadratic Projection
            </label>
            <label className="toggle">
              <input type="checkbox" checked={showGeneral} onChange={(e) => setShowGeneral(e.target.checked)} /> General Projection
            </label>
            <label className="toggle">
              <input type="checkbox" checked={showAllTrend} onChange={(e) => setShowAllTrend(e.target.checked)} /> Future trend lines (all average projection)
            </label>
            <label className="toggle">
              <input type="checkbox" checked={showSpread} onChange={(e) => setShowSpread(e.target.checked)} /> Best / worst range (last week)
            </label>
          </div>
        </div>
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
        {showQuadratic && <path d={chart.futureAdjusted} className="line-future-adjusted" />}
        <path d={chart.fit} className="line-fit" />
        {showQuadratic && <path d={chart.future} className="line-future" />}
        {showGeneral && <path d={chart.general} className="line-general" />}
        {chart.spread &&
          (["actual", "adjusted"] as const).map((series) => (
            <g key={series} className={`spread spread-${series}`}>
              {chart.spread![series].bands.map((b, i) => (
                <path key={i} d={b.d} className="spread-band" fillOpacity={b.opacity} />
              ))}
              <path d={chart.spread![series].best} className="spread-best" />
              <path d={chart.spread![series].worst} className="spread-worst" />
              <path d={chart.spread![series].mean} className="spread-mean" />
            </g>
          ))}
        {chart.allTrends.map((t) => (
          <g key={t.back} opacity={1 - t.back * 0.3}>
            <path d={t.adjusted} className="line-all-trend-adjusted" />
            <path d={t.actual} className="line-all-trend" />
          </g>
        ))}
        <path d={chart.taperAdjusted} className="line-taper-adjusted" />
        <path d={chart.taper} className="line-taper" />
      </svg>
      <p className="muted weight-legend">
        <span className="key actual" /> weight (gaps filled in a straight line) <span className="key avg3" /> 3-day average
        <span className="key avg3-adjusted" /> 3-day average minus muscle gained <span className="key fit" /> trend curve <span className="key future-adjusted" /> muscle-adjusted trend and projection
        {showSpread && (
          <>
            <span className="key spread-key" /> last week of projections: shaded range (darker where they bunch up), solid = best (lowest) and worst (highest), dotted = average. Purple is actual, cyan is muscle-adjusted
          </>
        )}
        {showAllTrend && (
          <>
            <span className="key all-trend" /> all average trend (3 day projected all average = total loss, tapering; fainter lines start from yesterday and the day before) <span className="key all-trend-adjusted" /> same, muscle-adjusted
          </>
        )}
        {tapered && (
          <>
            <span className="key taper" /> projection from your monthly loss <span className="key taper-adjusted" /> same, minus muscle gained (muscle gain continues and slows at the same rate; total loss tends to 12x the first month)
          </>
        )}
        {showQuadratic && (
          <>
            <span className="key future" /> Quadratic Projection (quadratic curve through the last 90 days, 90 days ahead)
          </>
        )}
        {showGeneral && (
          <>
            <span className="key general" /> General Projection (average of the Quadratic Projection and the mean of the last week's 3 day projected all average trend lines)
          </>
        )}
      </p>

      <div className="weight-controls table-controls">
        <div className="control-group">
          <span className="control-label">Table period</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="default">[default] last 90 days</option>
            {quarters.map((q) => (
              <option key={q} value={q}>{q.replace("-", " ")}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <span className="control-label">Table rows</span>
          <label className="toggle">
            <input type="checkbox" checked={compressed} onChange={(e) => setCompressed(e.target.checked)} /> Compress to {COMPRESS_STEP} day view
          </label>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>Date</th><th>Weight ({unit})</th><th>Muscle gain ({unit})</th><th>Muscle gained so far ({unit})</th><th>3-day avg<small>actual / muscle-adjusted</small></th><th>Recent weight loss / month<small>from 15 and 30 day change</small></th><th>30-day avg</th><th>365-day avg</th><th>Blended avg</th><th>Projected / month</th><th>Projected in 1 year</th><th>All average</th><th>Projected all average</th><th>3 day projected all average</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.date} className={d.estimated ? "estimated" : ""}>
              <td>{pretty(d.date)}</td>
              <td><span className={band(d.weight, false)}>{w(d.weight)}</span></td>
              <td>{w(d.muscleDaily, 3)}</td>
              <td>{w(d.muscleTotal, 2)}</td>
              <td>{two(d.avg3, d.adj.avg3)}</td>
              <td>{two(d.recent, d.recentAdj, true, signed, deltaBand)}</td>
              <td>{two(d.avg30, d.adj.avg30)}</td>
              <td>{two(d.avg365, d.adj.avg365)}</td>
              <td>{two(d.blended, d.adj.blended)}</td>
              <td>{two(d.monthly, d.adj.monthly, true, signed, deltaBand)}</td>
              <td>{two(yearly(d.blended, d.monthly), yearly(d.adj.blended, d.adj.monthly))}</td>
              <td>{two(d.allAvg, d.allAvgAdj)}</td>
              <td>{two(d.allProj, d.allProjAdj)}</td>
              <td>{two(d.allProj3, d.allProj3Adj)}</td>
              <td>{d.estimated ? "estimated" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
