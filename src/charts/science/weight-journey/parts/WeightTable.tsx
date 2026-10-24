import { useMemo, useState } from "react";
import { averageTint, band, deltaBand } from "../model/bands";
import { yearly } from "../model/averages";
import { type Row, dailyRows } from "../model/rows";
import { type Format, type Unit, pretty, toDate } from "../model/units";

type BandOf = (pounds: number | null, adjusted: boolean) => string;

/** Actual value on top, muscle-adjusted value underneath, each highlighted by its target band. */
function Two({ actual, adjusted, fmt, bandOf = band }: { actual: number | null; adjusted: number | null; fmt: (pounds: number) => string; bandOf?: BandOf }) {
  const show = (n: number | null) => (n === null ? "—" : fmt(n));

  return (
    <>
      <span className={bandOf(actual, false)}>{show(actual)}</span>
      <br />
      <span className={`adjusted ${bandOf(adjusted, true)}`}>{show(adjusted)}</span>
    </>
  );
}

/** Year and quarter of a date, for the period filter. */
const quarterOf = (isoDate: string) => `${isoDate.slice(0, 4)}-Q${Math.floor((Number(isoDate.slice(5, 7)) - 1) / 3) + 1}`;

/** Rows of one period: a quarter (e.g. "2025-Q3"), or by default the last 90 days. */
function periodRows(newestFirst: Row[], period: string) {
  if (period !== "default") return newestFirst.filter((r) => quarterOf(r.date) === period);
  const cutoff = new Date(toDate(newestFirst[0].date).getTime() - 89 * 86_400_000).toISOString().slice(0, 10);

  return newestFirst.filter((r) => r.date >= cutoff);
}

/** Table shows the last 90 days by default, or one chosen quarter. */
function useTableRows(period: string) {
  const newestFirst = useMemo(() => [...dailyRows].reverse(), []);
  const quarters = useMemo(() => [...new Set(newestFirst.map((r) => quarterOf(r.date)))], [newestFirst]);
  const rows = useMemo(() => periodRows(newestFirst, period), [newestFirst, period]);

  return { newestFirst, rows, quarters };
}

type Show = { muscleDaily: boolean; muscleTotal: boolean; dayAverages: boolean; weightLoss: boolean; allAverages: boolean; wma: boolean };

const GROUPS: { key: keyof Show; label: string }[] = [
  { key: "dayAverages", label: "Day Averages" },
  { key: "weightLoss", label: "Weight Loss" },
  { key: "wma", label: "WMA" },
  { key: "allAverages", label: "All Averages" },
  { key: "muscleDaily", label: "Muscle gain" },
  { key: "muscleTotal", label: "Muscle gained so far" },
];

/** How a column's numbers are written and coloured: weights by target band, changes by delta band, muscle with 2 or 3 decimals. */
type Kind = "weight" | "change" | "muscle2" | "muscle3";

type Column = {
  /** Group that switches the column on; always shown when missing. */
  group?: keyof Show;
  title: (unit: Unit) => string;
  note?: string;
  kind: Kind;
  actual: (d: Row) => number | null;
  /** Muscle-adjusted value shown under the actual one. */
  adjusted?: (d: Row) => number | null;
};

const COLUMNS: Column[] = [
  { title: (unit) => `Weight (${unit})`, kind: "weight", actual: (d) => d.weight },
  { group: "wma", title: () => "Weight WMA", note: "14-day weighted moving average", kind: "weight", actual: (d) => d.weightWma, adjusted: (d) => d.weightWmaAdj },
  { group: "muscleDaily", title: (unit) => `Muscle gain (${unit})`, kind: "muscle3", actual: (d) => d.muscleDaily },
  { group: "muscleTotal", title: (unit) => `Muscle gained so far (${unit})`, kind: "muscle2", actual: (d) => d.muscleTotal },
  { group: "dayAverages", title: () => "3-day avg", note: "actual / muscle-adjusted", kind: "weight", actual: (d) => d.avg3, adjusted: (d) => d.adj.avg3 },
  { group: "weightLoss", title: () => "Recent weight loss / month", note: "from 15 and 30 day change", kind: "change", actual: (d) => d.recent, adjusted: (d) => d.recentAdj },
  { group: "weightLoss", title: () => "Weight loss 3-day / month", note: "3-day avg of the column before", kind: "change", actual: (d) => d.recent3, adjusted: (d) => d.recent3Adj },
  { group: "dayAverages", title: () => "30-day avg", kind: "weight", actual: (d) => d.avg30, adjusted: (d) => d.adj.avg30 },
  { group: "dayAverages", title: () => "365-day avg", kind: "weight", actual: (d) => d.avg365, adjusted: (d) => d.adj.avg365 },
  { group: "dayAverages", title: () => "Blended avg", kind: "weight", actual: (d) => d.blended, adjusted: (d) => d.adj.blended },
  { group: "dayAverages", title: () => "Projected / month", kind: "change", actual: (d) => d.monthly, adjusted: (d) => d.adj.monthly },
  { group: "dayAverages", title: () => "Projected in 1 year", kind: "weight", actual: (d) => yearly(d.blended, d.monthly), adjusted: (d) => yearly(d.adj.blended, d.adj.monthly) },
  { group: "allAverages", title: () => "All average", kind: "weight", actual: (d) => d.allAvg, adjusted: (d) => d.allAvgAdj },
  { group: "allAverages", title: () => "Projected all average", kind: "weight", actual: (d) => d.allProj, adjusted: (d) => d.allProjAdj },
  { group: "allAverages", title: () => "3 day projected all average", kind: "weight", actual: (d) => d.allProj3, adjusted: (d) => d.allProj3Adj },
  { group: "allAverages", title: () => "Complete average", note: "every weight column", kind: "weight", actual: (d) => d.complete, adjusted: (d) => d.completeAdj },
  { group: "wma", title: () => "Weight loss WMA / month", note: "14-day weighted moving average, newest counts most", kind: "change", actual: (d) => d.recentWma, adjusted: (d) => d.recentWmaAdj },
  { group: "wma", title: () => "WMA Projection", note: "weight WMA + 12 × loss WMA / month", kind: "weight", actual: (d) => d.wmaProj, adjusted: (d) => d.wmaProjAdj },
  { group: "wma", title: () => "WMA Projection Projected", note: "average of WMA Projection and WMA Projection + its monthly change", kind: "weight", actual: (d) => d.wmaAvg, adjusted: (d) => d.wmaAvgAdj },
  { title: () => "Average of Complete & WMA", note: "Complete average and WMA Projection Projected", kind: "weight", actual: (d) => d.finalAvg, adjusted: (d) => d.finalAvgAdj },
];

/** Writes a number the way its column shows it. */
const formatter = (kind: Kind, f: Format) => {
  if (kind === "change") return f.signed;
  if (kind === "muscle2") return (pounds: number) => f.w(pounds, 2);
  if (kind === "muscle3") return (pounds: number) => f.w(pounds, 3);

  return f.w;
};

type Range = { high: number; low: number } | null;

/** Highest and lowest value a column takes over the rows (null when it has none). */
function rangeOf(rows: Row[], column: Column): Range {
  const values = rows.map(column.actual).filter((value): value is number => value !== null);

  // Math.max/min spread would overflow the stack on a long history, so loop.
  return values.length ? { high: values.reduce((a, b) => Math.max(a, b)), low: values.reduce((a, b) => Math.min(a, b)) } : null;
}

/** Small print block: the label, then the high, then the low, each on its own line. */
const rangeBlock = (label: string, range: Range, fmt: (pounds: number) => string) => (
  <small className="range">
    {label}
    <br />
    {range ? `↑${fmt(range.high)}` : "—"}
    <br />
    {range ? `↓${fmt(range.low)}` : "—"}
  </small>
);

/** Table header; columns follow the options that are switched on, with the high and low of each for the period and for all time. */
function Head({ unit, f, columns, periodRanges, allTimeRanges }: { unit: Unit; f: Format; columns: Column[]; periodRanges: Range[]; allTimeRanges: Range[] }) {
  return (
    <thead>
      <tr className="titles">
        <th>Date</th>
        {columns.map((column) => <th key={column.title(unit)} title={column.note}>{column.title(unit)}</th>)}
      </tr>
      {/* Own row so the highs and lows line up across columns whatever the title length. */}
      <tr className="ranges">
        <th />
        {columns.map((column, index) => {
          const fmt = formatter(column.kind, f);

          return (
            <th key={column.title(unit)}>
              {rangeBlock("period:", periodRanges[index], fmt)}
              {rangeBlock("all time:", allTimeRanges[index], fmt)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

/** Bands of the values in the columns on screen (actual and muscle-adjusted); the weight is always shown. */
function bandClasses(d: Row, show: Show) {
  const weightClasses = (actual: (number | null)[], adjusted: (number | null)[]) => [...actual.map((w) => band(w, false)), ...adjusted.map((w) => band(w, true))];
  const changeClasses = (...values: (number | null)[]) => values.map(deltaBand);

  return [
    band(d.weight, false),
    band(d.finalAvg, false),
    band(d.finalAvgAdj, true),
    ...(show.dayAverages
      ? [
          ...weightClasses(
            [d.avg3, d.avg30, d.avg365, d.blended, yearly(d.blended, d.monthly)],
            [d.adj.avg3, d.adj.avg30, d.adj.avg365, d.adj.blended, yearly(d.adj.blended, d.adj.monthly)],
          ),
          ...changeClasses(d.monthly, d.adj.monthly),
        ]
      : []),
    ...(show.weightLoss ? changeClasses(d.recent, d.recent3, d.recentAdj, d.recent3Adj) : []),
    ...(show.allAverages
      ? weightClasses([d.allAvg, d.allProj, d.allProj3, d.complete], [d.allAvgAdj, d.allProjAdj, d.allProj3Adj, d.completeAdj])
      : []),
    ...(show.wma
      ? [...weightClasses([d.weightWma, d.wmaProj, d.wmaAvg], [d.weightWmaAdj, d.wmaProjAdj, d.wmaAvgAdj]), ...changeClasses(d.recentWma, d.recentWmaAdj)]
      : []),
  ];
}

/** One cell: actual value with the muscle-adjusted one under it when the column has one. */
function Cell({ column, d, f }: { column: Column; d: Row; f: Format }) {
  const fmt = formatter(column.kind, f);

  if (column.adjusted) return <Two actual={column.actual(d)} adjusted={column.adjusted(d)} fmt={fmt} bandOf={column.kind === "change" ? deltaBand : band} />;
  if (column.kind === "weight") return <span className={band(d.weight, false)}>{fmt(d.weight)}</span>;

  return <>{fmt(column.actual(d) ?? 0)}</>;
}

/** One day in the table; columns shown depend on the chosen options, and estimated days are styled differently. */
function DayRow({ d, f, show, columns }: { d: Row; f: Format; show: Show; columns: Column[] }) {
  const tint = averageTint(bandClasses(d, show));

  return (
    <tr className={d.estimated ? "estimated" : ""} style={{ backgroundColor: tint }}>
      <td>{pretty(d.date)}</td>
      {columns.map((column) => <td key={column.title("lb")}><Cell column={column} d={d} f={f} /></td>)}
      <td>{d.estimated ? "estimated" : ""}</td>
    </tr>
  );
}

/** Dropdown of periods, each with a square in the average colour of the values currently shown over that period. */
function PeriodPicker({ period, onChange, options }: { period: string; onChange: (period: string) => void; options: { value: string; label: string; color?: string }[] }) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === period) ?? options[0];

  return (
    <fieldset className="period-picker" onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}>
      <button type="button" className="period-button" onClick={() => setOpen(!open)}>
        <span className="period-square" style={{ background: current.color }} /> {current.label}
      </button>
      {open && (
        <ul className="period-list">
          {options.map((option) => (
            <li key={option.value}>
              <button type="button" className={option.value === period ? "active" : ""} onClick={() => { onChange(option.value); setOpen(false); }}>
                <span className="period-square" style={{ background: option.color }} /> {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}

/** Daily table with a period filter, showing the last 90 days by default. */
export function WeightTable({ unit, f }: { unit: Unit; f: Format }) {
  const [period, setPeriod] = useState("default");
  const [show, setShow] = useState<Show>({ muscleDaily: false, muscleTotal: false, dayAverages: false, weightLoss: false, allAverages: true, wma: true });
  const { newestFirst, rows, quarters } = useTableRows(period);

  // Columns on screen, with each one's high and low for the period and for all time.
  const columns = useMemo(() => COLUMNS.filter((column) => !column.group || show[column.group]), [show]);
  const allTimeRanges = useMemo(() => columns.map((column) => rangeOf(newestFirst, column)), [columns, newestFirst]);
  const periodRanges = useMemo(() => columns.map((column) => rangeOf(rows, column)), [columns, rows]);

  // Average colour of every shown value over each period, for the dropdown squares.
  const options = [{ value: "default", label: "[default] last 90 days" }, ...quarters.map((quarter) => ({ value: quarter, label: quarter.replace("-", " ") }))].map((option) => ({
    ...option,
    color: averageTint(periodRows(newestFirst, option.value).flatMap((r) => bandClasses(r, show)), 1),
  }));

  return (
    <>
      <div className="weight-controls table-controls">
        <div className="control-group">
          <span className="control-label">Table period</span>
          <PeriodPicker period={period} onChange={setPeriod} options={options} />
        </div>
        <div className="control-group">
          <span className="control-label">Column groups</span>
          <div className="toggles">
            {GROUPS.map(({ key, label }) => (
              <label key={key} className="toggle">
                <input type="checkbox" checked={show[key]} onChange={(event) => setShow({ ...show, [key]: event.target.checked })} /> {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <table>
        <Head unit={unit} f={f} columns={columns} periodRanges={periodRanges} allTimeRanges={allTimeRanges} />
        <tbody>
          {rows.map((d) => <DayRow key={d.date} d={d} f={f} show={show} columns={columns} />)}
        </tbody>
      </table>
    </>
  );
}
