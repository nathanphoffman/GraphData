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

type Show = { muscleDaily: boolean; dayAverages: boolean; weightLoss: boolean; allAverages: boolean; wma: boolean };

const GROUPS: { key: keyof Show; label: string }[] = [
  { key: "dayAverages", label: "Day Averages" },
  { key: "weightLoss", label: "Weight Loss" },
  { key: "wma", label: "WMA" },
  { key: "allAverages", label: "All Averages" },
  { key: "muscleDaily", label: "Muscle gain" },
];

/** Table header; columns follow the options that are switched on. */
function Head({ unit, show }: { unit: Unit; show: Show }) {
  return (
    <thead>
      <tr>
        <th>Date</th><th>Weight ({unit})</th>
        {show.wma && <th>Weight WMA<small>14-day weighted moving average</small></th>}
        {show.muscleDaily && <th>Muscle gain ({unit})</th>}<th>Muscle gained so far ({unit})</th>
        {show.dayAverages && <th>3-day avg<small>actual / muscle-adjusted</small></th>}
        {show.weightLoss && <><th>Recent weight loss / month<small>from 15 and 30 day change</small></th><th>Weight loss 3-day / month<small>3-day avg of the column before</small></th></>}
        {show.dayAverages && <><th>30-day avg</th><th>365-day avg</th><th>Blended avg</th><th>Projected / month</th><th>Projected in 1 year</th></>}
        {show.allAverages && <><th>All average</th><th>Projected all average</th><th>3 day projected all average</th></>}
        <th></th>
        {show.allAverages && <th>Complete average<small>every weight column</small></th>}
        {show.wma && <><th>Weight loss WMA / month<small>14-day weighted moving average, newest counts most</small></th><th>WMA Projection<small>weight WMA + 12 × loss WMA / month</small></th><th>WMA Projection Projection<small>WMA Projection + WMA Projection Loss</small></th></>}
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
      ? [...weightClasses([d.weightWma, d.wmaProj, d.wmaProj2], [d.weightWmaAdj, d.wmaProjAdj, d.wmaProj2Adj]), ...changeClasses(d.recentWma, d.recentWmaAdj)]
      : []),
  ];
}

/** One day in the table; columns shown depend on the chosen options, and estimated days are styled differently. */
function DayRow({ d, f, show }: { d: (typeof dailyRows)[number]; f: Format; show: Show }) {
  const two = (a: number | null, b: number | null, fmt = f.w, bandOf?: BandOf) => <Two actual={a} adjusted={b} fmt={fmt} bandOf={bandOf} />;

  const tint = averageTint(bandClasses(d, show));

  return (
    <tr className={d.estimated ? "estimated" : ""} style={{ backgroundColor: tint }}>
      <td>{pretty(d.date)}</td>
      <td><span className={band(d.weight, false)}>{f.w(d.weight)}</span></td>
      {show.wma && <td>{two(d.weightWma, d.weightWmaAdj)}</td>}
      {show.muscleDaily && <td>{f.w(d.muscleDaily, 3)}</td>}
      <td>{f.w(d.muscleTotal, 2)}</td>
      {show.dayAverages && <td>{two(d.avg3, d.adj.avg3)}</td>}
      {show.weightLoss && (
        <>
          <td>{two(d.recent, d.recentAdj, f.signed, deltaBand)}</td>
          <td>{two(d.recent3, d.recent3Adj, f.signed, deltaBand)}</td>
        </>
      )}
      {show.dayAverages && (
        <>
          <td>{two(d.avg30, d.adj.avg30)}</td>
          <td>{two(d.avg365, d.adj.avg365)}</td>
          <td>{two(d.blended, d.adj.blended)}</td>
          <td>{two(d.monthly, d.adj.monthly, f.signed, deltaBand)}</td>
          <td>{two(yearly(d.blended, d.monthly), yearly(d.adj.blended, d.adj.monthly))}</td>
        </>
      )}
      {show.allAverages && (
        <>
          <td>{two(d.allAvg, d.allAvgAdj)}</td>
          <td>{two(d.allProj, d.allProjAdj)}</td>
          <td>{two(d.allProj3, d.allProj3Adj)}</td>
        </>
      )}
      <td>{d.estimated ? "estimated" : ""}</td>
      {show.allAverages && <td>{two(d.complete, d.completeAdj)}</td>}
      {show.wma && (
        <>
          <td>{two(d.recentWma, d.recentWmaAdj, f.signed, deltaBand)}</td>
          <td>{two(d.wmaProj, d.wmaProjAdj)}</td>
          <td>{two(d.wmaProj2, d.wmaProj2Adj)}</td>
        </>
      )}
    </tr>
  );
}

/** Dropdown of periods, each with a square in the average colour of the values currently shown over that period. */
function PeriodPicker({ period, onChange, options }: { period: string; onChange: (period: string) => void; options: { value: string; label: string; color?: string }[] }) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === period) ?? options[0];

  return (
    <div className="period-picker" onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}>
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
    </div>
  );
}

/** Daily table with a period filter, showing the last 90 days by default. */
export function WeightTable({ unit, f }: { unit: Unit; f: Format }) {
  const [period, setPeriod] = useState("default");
  const [show, setShow] = useState<Show>({ muscleDaily: false, dayAverages: false, weightLoss: false, allAverages: true, wma: true });
  const { newestFirst, rows, quarters } = useTableRows(period);

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
        <Head unit={unit} show={show} />
        <tbody>
          {rows.map((d) => <DayRow key={d.date} d={d} f={f} show={show} />)}
        </tbody>
      </table>
    </>
  );
}
