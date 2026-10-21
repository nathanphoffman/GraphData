import { dailyRows, days, future, projectedAdjusted } from "../model/rows";
import { type Format, type Unit, pretty } from "../model/units";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function StatsBar({ unit, f }: { unit: Unit; f: Format }) {
  const first = days[0];
  const latest = days[days.length - 1];
  const lowest = days.reduce((min, d) => (d.weight < min.weight ? d : min));
  const end = future[future.length - 1];
  const endAdjusted = projectedAdjusted.future[projectedAdjusted.future.length - 1];
  const today = dailyRows[dailyRows.length - 1];
  const yearOut = today.monthly === null ? null : Math.round((today.blended + today.monthly * 12) * 10) / 10;
  const show = (lb: number) => `${f.w(lb)} ${unit}`;
  return (
    <div className="weight-stats">
      <Stat label={`Start (${pretty(first.date)})`} value={show(first.weight)} />
      <Stat label={`Lowest (${pretty(lowest.date)})`} value={show(lowest.weight)} />
      <Stat label={`Latest (${pretty(latest.date)})`} value={show(latest.weight)} />
      <Stat label="Lost so far" value={show(first.weight - latest.weight)} />
      <Stat label={`Projected ${pretty(end.date)}`} value={show(end.weight)} />
      <Stat label={`Muscle-adjusted projected ${pretty(endAdjusted.date)}`} value={show(endAdjusted.weight)} />
      {yearOut !== null && <Stat label={`In 1 year (${f.w(today.blended)} blended + ${f.w(today.monthly!)} × 12)`} value={show(yearOut)} />}
    </div>
  );
}
