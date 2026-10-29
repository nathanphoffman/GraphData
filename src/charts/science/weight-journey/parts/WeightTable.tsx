import { useMemo, useState } from "react";
import { ACTIVE_CLASS } from "../../../classNames";
import { averageTint, band, deltaBand } from "../model/bands";
import { ISO_DATE_LENGTH } from "../constants";
import { yearly } from "../model/averages";
import type { WeightRow } from "../model/rows";
import { type Format, type Unit, pretty, toDate } from "../model/units";

type BandOf = (pounds: number | null, adjusted: boolean) => string;

/** Actual value on top, muscle-adjusted value underneath, each highlighted by its target band. */
function ActualAndAdjusted({ actual, adjusted, fmt: formatWeight, bandOf = band }: { actual: number | null; adjusted: number | null; fmt: (pounds: number) => string; bandOf?: BandOf }) {
  const show = (value: number | null) => (value === null ? "—" : formatWeight(value));

  return (
    <>
      <span className={bandOf(actual, false)}>{show(actual)}</span>
      <br />
      <span className={`adjusted ${bandOf(adjusted, true)}`}>{show(adjusted)}</span>
    </>
  );
}

/** Year and quarter of a date, for the period filter. */
const quarterOf = (isoDate: string) =>
  `${isoDate.slice(0, YEAR_END)}-Q${Math.floor((Number(isoDate.slice(MONTH_START, MONTH_END)) - 1) / MONTHS_PER_QUARTER) + 1}`;

/** Rows of one period: a quarter (e.g. "2025-Q3"), or by default the last 90 days. */
function periodRows(newestFirst: WeightRow[], period: string) {
  if (period !== DEFAULT_PERIOD) return newestFirst.filter((tableRow) => quarterOf(tableRow.date) === period);
  const cutoff = new Date(toDate(newestFirst[0].date).getTime() - (DEFAULT_PERIOD_DAYS - 1) * DAY_MS).toISOString().slice(0, ISO_DATE_LENGTH);

  return newestFirst.filter((tableRow) => tableRow.date >= cutoff);
}

/** Table shows the last 90 days by default, or one chosen quarter. */
function useTableRows(period: string, dailyRows: WeightRow[]) {
  const newestFirst = useMemo(() => [...dailyRows].reverse(), [dailyRows]);

  // Each distinct quarter in the data (like 2025-Q3), for the period filter.
  const quarters = useMemo(() => [...new Set(newestFirst.map((tableRow) => quarterOf(tableRow.date)))], [newestFirst]);
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
  actual: (tableRow: WeightRow) => number | null;

  /** Muscle-adjusted value shown under the actual one. */
  adjusted?: (tableRow: WeightRow) => number | null;
};

const COLUMNS: Column[] = [
  { title: (unit) => `Weight (${unit})`, kind: "weight", actual: (tableRow) => tableRow.weight },
  { group: "wma", title: () => "Weight WMA", note: "14-day weighted moving average", kind: "weight", actual: (tableRow) => tableRow.weightWma, adjusted: (tableRow) => tableRow.weightWmaAdj },
  { group: "muscleDaily", title: (unit) => `Muscle gain (${unit})`, kind: "muscle3", actual: (tableRow) => tableRow.muscleDaily },
  { group: "muscleTotal", title: (unit) => `Muscle gained so far (${unit})`, kind: "muscle2", actual: (tableRow) => tableRow.muscleTotal },
  { group: "dayAverages", title: () => "3-day avg", note: "actual / muscle-adjusted", kind: "weight", actual: (tableRow) => tableRow.avg3, adjusted: (tableRow) => tableRow.adj.avg3 },
  { group: "weightLoss", title: () => "Recent weight loss / month", note: "from 15 and 30 day change", kind: "change", actual: (tableRow) => tableRow.recent, adjusted: (tableRow) => tableRow.recentAdj },
  { group: "weightLoss", title: () => "Weight loss 3-day / month", note: "3-day avg of the column before", kind: "change", actual: (tableRow) => tableRow.recent3, adjusted: (tableRow) => tableRow.recent3Adj },
  { group: "dayAverages", title: () => "30-day avg", kind: "weight", actual: (tableRow) => tableRow.avg30, adjusted: (tableRow) => tableRow.adj.avg30 },
  { group: "dayAverages", title: () => "365-day avg", kind: "weight", actual: (tableRow) => tableRow.avg365, adjusted: (tableRow) => tableRow.adj.avg365 },
  { group: "dayAverages", title: () => "Blended avg", kind: "weight", actual: (tableRow) => tableRow.blended, adjusted: (tableRow) => tableRow.adj.blended },
  { group: "dayAverages", title: () => "Projected / month", kind: "change", actual: (tableRow) => tableRow.monthly, adjusted: (tableRow) => tableRow.adj.monthly },
  { group: "dayAverages", title: () => "Projected in 1 year", kind: "weight", actual: (tableRow) => yearly(tableRow.blended, tableRow.monthly), adjusted: (tableRow) => yearly(tableRow.adj.blended, tableRow.adj.monthly) },
  { group: "allAverages", title: () => "All average", kind: "weight", actual: (tableRow) => tableRow.allAvg, adjusted: (tableRow) => tableRow.allAvgAdj },
  { group: "allAverages", title: () => "Projected all average", kind: "weight", actual: (tableRow) => tableRow.allProj, adjusted: (tableRow) => tableRow.allProjAdj },
  { group: "allAverages", title: () => "3 day projected all average", kind: "weight", actual: (tableRow) => tableRow.allProj3, adjusted: (tableRow) => tableRow.allProj3Adj },
  { group: "allAverages", title: () => "Complete average", note: "every weight column", kind: "weight", actual: (tableRow) => tableRow.complete, adjusted: (tableRow) => tableRow.completeAdj },
  { group: "wma", title: () => "Weight loss WMA / month", note: "14-day weighted moving average, newest counts most", kind: "change", actual: (tableRow) => tableRow.recentWma, adjusted: (tableRow) => tableRow.recentWmaAdj },
  { group: "wma", title: () => "WMA Projection", note: "weight WMA + 12 × loss WMA / month", kind: "weight", actual: (tableRow) => tableRow.wmaProj, adjusted: (tableRow) => tableRow.wmaProjAdj },
  { group: "wma", title: () => "WMA Projection Projected", note: "average of WMA Projection and WMA Projection + its monthly change", kind: "weight", actual: (tableRow) => tableRow.wmaAvg, adjusted: (tableRow) => tableRow.wmaAvgAdj },
  { title: () => "Average of Complete & WMA", note: "Complete average and WMA Projection Projected", kind: "weight", actual: (tableRow) => tableRow.finalAvg, adjusted: (tableRow) => tableRow.finalAvgAdj },
  { title: () => "3-day avg of Complete & WMA", note: "3-day average of the column before", kind: "weight", actual: (tableRow) => tableRow.finalAvg3, adjusted: (tableRow) => tableRow.finalAvg3Adj },
];

/** The period filter value that means "the last 90 days". */
const DEFAULT_PERIOD = "default";

/** Where the year and the month sit in YYYY-MM-DD, and how many months make a quarter. */
const YEAR_END = 4;
const MONTH_START = 5;
const MONTH_END = 7;
const MONTHS_PER_QUARTER = 3;

/** The table shows this many days by default. */
const DEFAULT_PERIOD_DAYS = 90;
const DAY_MS = 86_400_000;

/** Decimal places shown for the muscle columns. */
const MUSCLE3_DIGITS = 3;

/** Writes a number the way its column shows it. */
const formatter = (kind: Kind, unitFormat: Format) => {
  if (kind === "change") return unitFormat.signed;

  if (kind === "muscle2") return (pounds: number) => unitFormat.w(pounds, 2);

  if (kind === "muscle3") return (pounds: number) => unitFormat.w(pounds, MUSCLE3_DIGITS);

  return unitFormat.w;
};

type Range = { high: number; low: number; avg: number } | null;

/** Highest, lowest and average value a column takes over the rows (null when it has none). */
function rangeOf(rows: WeightRow[], column: Column): Range {
  const values = rows.map(column.actual).filter((value): value is number => value !== null);

  // Math.max/min spread would overflow the stack on a long history, so loop.
  return values.length
    ? {
        high: values.reduce((left, right) => Math.max(left, right)),
        low: values.reduce((left, right) => Math.min(left, right)),
        avg: values.reduce((sum, value) => sum + value, 0) / values.length,
      }
    : null;
}

/** Small print block: the label, then the high, the average, then the low, each on its own line. */
const rangeBlock = (label: string, range: Range, formatWeight: (pounds: number) => string) => (
  <small className="range">
    {label}
    <br />
    {range ? `↑${formatWeight(range.high)}` : "—"}
    <br />
    {range ? `~${formatWeight(range.avg)}` : "—"}
    <br />
    {range ? `↓${formatWeight(range.low)}` : "—"}
  </small>
);

/** The header shows each column's high, average and low for the period and for all time, so you can see where a day sits without scanning the table. */
function Head({ unit, f: unitFormat, columns, periodRanges, allTimeRanges }: { unit: Unit; f: Format; columns: Column[]; periodRanges: Range[]; allTimeRanges: Range[] }) {
  return (
    <thead>
      <tr className="titles">
        <th>Date</th>
        {columns.map((column) => <th key={column.title(unit)} title={column.note}>{column.title(unit)}</th>)}
      </tr>
      {/* Own row so the ranges line up across columns whatever the title length. */}
      <tr className="ranges">
        <th />
        {columns.map((column, index) => {
          const formatWeight = formatter(column.kind, unitFormat);

          return (
            <th key={column.title(unit)}>
              {rangeBlock("period:", periodRanges[index], formatWeight)}
              {rangeBlock("all time:", allTimeRanges[index], formatWeight)}
            </th>
          );
        })}

      </tr>
    </thead>
  );
}

/** Bands of the values in the columns on screen (actual and muscle-adjusted); the weight is always shown. */
function bandClasses(tableRow: WeightRow, show: Show) {
  // The colour band of each weight in the actual list, then in the muscle-adjusted list.
  const weightClasses = (actual: (number | null)[], adjusted: (number | null)[]) => [...actual.map((weight) => band(weight, false)), ...adjusted.map((weight) => band(weight, true))];
  const changeClasses = (...values: (number | null)[]) => values.map(deltaBand);

  return [
    band(tableRow.weight, false),
    band(tableRow.finalAvg, false),
    band(tableRow.finalAvgAdj, true),
    band(tableRow.finalAvg3, false),
    band(tableRow.finalAvg3Adj, true),
    ...(show.dayAverages
      ? [
          ...weightClasses(
            [tableRow.avg3, tableRow.avg30, tableRow.avg365, tableRow.blended, yearly(tableRow.blended, tableRow.monthly)],
            [tableRow.adj.avg3, tableRow.adj.avg30, tableRow.adj.avg365, tableRow.adj.blended, yearly(tableRow.adj.blended, tableRow.adj.monthly)],
          ),
          ...changeClasses(tableRow.monthly, tableRow.adj.monthly),
        ]

      : []),
    // Only colour the weight loss columns when they are shown.
    ...(show.weightLoss ? changeClasses(tableRow.recent, tableRow.recent3, tableRow.recentAdj, tableRow.recent3Adj) : []),
    ...(show.allAverages
      ? weightClasses([tableRow.allAvg, tableRow.allProj, tableRow.allProj3, tableRow.complete], [tableRow.allAvgAdj, tableRow.allProjAdj, tableRow.allProj3Adj, tableRow.completeAdj])
      : []),
    ...(show.wma
      ? [...weightClasses([tableRow.weightWma, tableRow.wmaProj, tableRow.wmaAvg], [tableRow.weightWmaAdj, tableRow.wmaProjAdj, tableRow.wmaAvgAdj]), ...changeClasses(tableRow.recentWma, tableRow.recentWmaAdj)]
      : []),
  ];
}

/** One cell: actual value with the muscle-adjusted one under it when the column has one. */
function Cell({ column, d: tableRow, f: unitFormat }: { column: Column; d: WeightRow; f: Format }) {
  const formatWeight = formatter(column.kind, unitFormat);

  if (column.adjusted) return <ActualAndAdjusted actual={column.actual(tableRow)} adjusted={column.adjusted(tableRow)} fmt={formatWeight} bandOf={column.kind === "change" ? deltaBand : band} />;

  if (column.kind === "weight") return <span className={band(tableRow.weight, false)}>{formatWeight(tableRow.weight)}</span>;

  return <>{formatWeight(column.actual(tableRow) ?? 0)}</>;
}

/** One day in the table; columns shown depend on the chosen options, and estimated days are styled differently. */
function DayRow({ d: tableRow, f: unitFormat, show, columns }: { d: WeightRow; f: Format; show: Show; columns: Column[] }) {
  const tint = averageTint(bandClasses(tableRow, show));

  return (
    <tr className={tableRow.estimated ? "estimated" : ""} style={{ backgroundColor: tint }}>
      <td>{pretty(tableRow.date)}</td>
      {columns.map((column) => <td key={column.title("lb")}><Cell column={column} d={tableRow} f={unitFormat} /></td>)} {/* One cell per column on screen. */}
      <td>{tableRow.estimated ? "estimated" : ""}</td>
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
          {options.map((option) => ( // One button per period choice.
            <li key={option.value}>
              <button type="button" className={option.value === period ? ACTIVE_CLASS : ""} onClick={() => { onChange(option.value); setOpen(false); }}>
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
export function WeightTable({ unit, f: unitFormat, dailyRows }: { unit: Unit; f: Format; dailyRows: WeightRow[] }) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [show, setShow] = useState<Show>({ muscleDaily: false, muscleTotal: false, dayAverages: false, weightLoss: false, allAverages: true, wma: true });
  const { newestFirst, rows, quarters } = useTableRows(period, dailyRows);

  // Columns on screen, with each one's high and low for the period and for all time.
  const columns = useMemo(() => COLUMNS.filter((column) => !column.group || show[column.group]), [show]);

  // The high and low of each column over all time.
  const allTimeRanges = useMemo(() => columns.map((column) => rangeOf(newestFirst, column)), [columns, newestFirst]);

  // The high and low of each column over the chosen period.
  const periodRanges = useMemo(() => columns.map((column) => rangeOf(rows, column)), [columns, rows]);

  // Average colour of every shown value over each period, for the dropdown squares.
  const options = [{ value: DEFAULT_PERIOD, label: "[default] last 90 days" }, ...quarters.map((quarter) => ({ value: quarter, label: quarter.replace("-", " ") }))].map((option) => ({
    ...option,
    color: averageTint(periodRows(newestFirst, option.value).flatMap((tableRow) => bandClasses(tableRow, show)), 1),
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
            {GROUPS.map(({ key: groupKey, label }) => ( // One checkbox per column group.
              <label key={groupKey} className="toggle">
                <input type="checkbox" checked={show[groupKey]} onChange={(event) => setShow({ ...show, [groupKey]: event.target.checked })} /> {label}
              </label>
            ))}

          </div>
        </div>
      </div>
      <table>
        <Head unit={unit} f={unitFormat} columns={columns} periodRanges={periodRanges} allTimeRanges={allTimeRanges} />
        <tbody>
          {rows.map((tableRow) => <DayRow key={tableRow.date} d={tableRow} f={unitFormat} show={show} columns={columns} />)}
        </tbody>
      </table>
    </>
  );
}
