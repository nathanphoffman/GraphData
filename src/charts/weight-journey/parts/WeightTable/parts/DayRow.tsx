import { averageTint } from "../../../model/bands";
import type { WeightRow } from "../../../model/rows";
import { type Format, pretty } from "../../../model/units";
import { bandColors } from "../model/bandColors";
import type { Column } from "../model/columns";
import type { Show } from "../model/showGroups";
import { Cell } from "./Cells";

/** One day in the table; columns shown depend on the chosen options, and estimated days are styled differently. */
export function DayRow({
  d: tableRow,
  f: unitFormat,
  show,
  columns,
}: {
  d: WeightRow;
  f: Format;
  show: Show;
  columns: Column[];
}) {
  const tint = averageTint(bandColors(tableRow, show));

  return (
    <tr className={tableRow.estimated ? "estimated" : ""} style={{ backgroundColor: tint }}>
      <td>{pretty(tableRow.date)}</td>
      {columns.map((column) => (
        <td key={column.title("lb")}>
          <Cell column={column} d={tableRow} f={unitFormat} />
        </td>
      ))}{" "}

      {/* One cell per column on screen. */}
      <td>{tableRow.estimated ? "estimated" : ""}</td>
    </tr>
  );
}
