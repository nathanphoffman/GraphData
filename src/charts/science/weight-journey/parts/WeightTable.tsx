import { useMemo, useState } from "react";
import { band, deltaBand } from "../model/bands";
import { yearly } from "../model/averages";
import { dailyRows } from "../model/rows";
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

/** Table shows the last 90 days by default, or one chosen quarter (e.g. "2025-Q3"). */
function useTableRows(period: string) {
  const newestFirst = useMemo(() => [...dailyRows].reverse(), []);
  const quarters = useMemo(() => [...new Set(newestFirst.map((r) => quarterOf(r.date)))], [newestFirst]);

  // Show the chosen quarter, or by default the last 90 days.
  const rows = useMemo(() => {
    if (period !== "default") return newestFirst.filter((r) => quarterOf(r.date) === period);
    const cutoff = new Date(toDate(newestFirst[0].date).getTime() - 89 * 86_400_000).toISOString().slice(0, 10);

    return newestFirst.filter((r) => r.date >= cutoff);
  }, [newestFirst, period]);

  return { rows, quarters };
}

type Show = { muscleDaily: boolean; monthly: boolean };

/** Table header; columns follow the options that are switched on. */
function Head({ unit, show }: { unit: Unit; show: Show }) {
  return (
    <thead>
      <tr><th>Date</th><th>Weight ({unit})</th>{show.muscleDaily && <th>Muscle gain ({unit})</th>}<th>Muscle gained so far ({unit})</th><th>3-day avg<small>actual / muscle-adjusted</small></th><th>Recent weight loss / month<small>from 15 and 30 day change</small></th><th>30-day avg</th><th>365-day avg</th><th>Blended avg</th>{show.monthly && <th>Projected / month</th>}<th>Projected in 1 year</th><th>All average</th><th>Projected all average</th><th>3 day projected all average</th><th></th><th>Complete average<small>every weight column</small></th></tr>
    </thead>
  );
}

/** One day in the table; columns shown depend on the chosen options, and estimated days are styled differently. */
function DayRow({ d, f, show }: { d: (typeof dailyRows)[number]; f: Format; show: Show }) {
  const two = (a: number | null, b: number | null, fmt = f.w, bandOf?: BandOf) => <Two actual={a} adjusted={b} fmt={fmt} bandOf={bandOf} />;

  return (
    <tr className={d.estimated ? "estimated" : ""}>
      <td>{pretty(d.date)}</td>
      <td><span className={band(d.weight, false)}>{f.w(d.weight)}</span></td>
      {show.muscleDaily && <td>{f.w(d.muscleDaily, 3)}</td>}
      <td>{f.w(d.muscleTotal, 2)}</td>
      <td>{two(d.avg3, d.adj.avg3)}</td>
      <td>{two(d.recent, d.recentAdj, f.signed, deltaBand)}</td>
      <td>{two(d.avg30, d.adj.avg30)}</td>
      <td>{two(d.avg365, d.adj.avg365)}</td>
      <td>{two(d.blended, d.adj.blended)}</td>
      {show.monthly && <td>{two(d.monthly, d.adj.monthly, f.signed, deltaBand)}</td>}
      <td>{two(yearly(d.blended, d.monthly), yearly(d.adj.blended, d.adj.monthly))}</td>
      <td>{two(d.allAvg, d.allAvgAdj)}</td>
      <td>{two(d.allProj, d.allProjAdj)}</td>
      <td>{two(d.allProj3, d.allProj3Adj)}</td>
      <td>{d.estimated ? "estimated" : ""}</td>
      <td>{two(d.complete, d.completeAdj)}</td>
    </tr>
  );
}

/** Daily table with a period filter, showing the last 90 days by default. */
export function WeightTable({ unit, f }: { unit: Unit; f: Format }) {
  const [period, setPeriod] = useState("default");
  const [show, setShow] = useState<Show>({ muscleDaily: false, monthly: false });
  const { rows, quarters } = useTableRows(period);

  return (
    <>
      <div className="weight-controls table-controls">
        <div className="control-group">
          <span className="control-label">Table period</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option value="default">[default] last 90 days</option>
            {/* One dropdown entry per quarter that has data. */}
            {quarters.map((quarter) => (
              <option key={quarter} value={quarter}>{quarter.replace("-", " ")}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <span className="control-label">Extra columns</span>
          <div className="toggles">
            <label className="toggle">
              <input type="checkbox" checked={show.muscleDaily} onChange={(event) => setShow({ ...show, muscleDaily: event.target.checked })} /> Muscle gain
            </label>
            <label className="toggle">
              <input type="checkbox" checked={show.monthly} onChange={(event) => setShow({ ...show, monthly: event.target.checked })} /> Projected / month
            </label>
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
