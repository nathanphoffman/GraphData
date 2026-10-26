import { round1 } from "../calculate";
import { yearly } from "../model/averages";
import { dailyRows, days, future, projectedAdjusted } from "../model/rows";
import { type Format, type Unit, pretty } from "../model/units";

/** One headline number with its label. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/** Row of headline numbers for the weigh-ins so far and the projections. */
export function StatsBar({ unit, f: unitFormat }: { unit: Unit; f: Format }) {
  const first = days[0];
  const latest = days[days.length - 1];

  // Keep the day with the lowest weight.
  const lowest = days.reduce((lowest, dayRecord) => (dayRecord.weight < lowest.weight ? dayRecord : lowest));
  const projection = future[future.length - 1];
  const endAdjusted = projectedAdjusted.future[projectedAdjusted.future.length - 1];
  const today = dailyRows[dailyRows.length - 1];
  const yearOut = today.monthly === null ? null : round1(yearly(today.blended, today.monthly)!);
  const show = (pounds: number) => `${unitFormat.w(pounds)} ${unit}`;

  return (
    <div className="weight-stats">
      <Stat label={`Start (${pretty(first.date)})`} value={show(first.weight)} />
      <Stat label={`Lowest (${pretty(lowest.date)})`} value={show(lowest.weight)} />
      <Stat label={`Latest (${pretty(latest.date)})`} value={show(latest.weight)} />
      <Stat label="Lost so far" value={show(first.weight - latest.weight)} />
      <Stat label={`Projected ${pretty(projection.date)}`} value={show(projection.weight)} />
      <Stat label={`Muscle-adjusted projected ${pretty(endAdjusted.date)}`} value={show(endAdjusted.weight)} />
      {yearOut !== null && <Stat label={`In 1 year (${unitFormat.w(today.blended)} blended + ${unitFormat.w(today.monthly!)} × 12)`} value={show(yearOut)} />}
    </div>
  );
}
