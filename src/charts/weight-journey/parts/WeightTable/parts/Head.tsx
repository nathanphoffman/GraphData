import type { Format, Unit } from "../../../model/units";
import type { Column } from "../model/columns";
import { formatter } from "../model/formatter";
import type { Range } from "../model/ranges";

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
export function Head({
  unit,
  f: unitFormat,
  columns,
  periodRanges,
  allTimeRanges,
}: {
  unit: Unit;
  f: Format;
  columns: Column[];
  periodRanges: Range[];
  allTimeRanges: Range[];
}) {
  return (
    <thead>
      <tr className="titles">
        <th>Date</th>
        {columns.map((column) => (
          <th key={column.title(unit)} title={column.note}>
            {column.title(unit)}
          </th>
        ))}

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
