import { useMemo, useState } from "react";
import { averageTint } from "../model/bands";
import type { WeightRow } from "../model/rows";
import type { Format, Unit } from "../model/units";
import { bandColors } from "./WeightTable/model/bandColors";
import { COLUMNS } from "./WeightTable/model/columns";
import { DEFAULT_PERIOD, periodRows, useTableRows } from "./WeightTable/model/periods";
import { rangeOf } from "./WeightTable/model/ranges";
import { DEFAULT_SHOW, type Show } from "./WeightTable/model/showGroups";
import { DayRow } from "./WeightTable/parts/DayRow";
import GroupToggles from "./WeightTable/parts/GroupToggles";
import { Head } from "./WeightTable/parts/Head";
import { PeriodPicker } from "./WeightTable/parts/PeriodPicker";

/** The period dropdown's choices, each with a square in the average colour of the values shown over that period. */
function periodOptions(quarters: string[], newestFirst: WeightRow[], show: Show) {
  const choices = [
    { value: DEFAULT_PERIOD, label: "[default] last 90 days" },
    ...quarters.map((quarter) => ({ value: quarter, label: quarter.replace("-", " ") })),
  ];

  return choices.map((option) => ({
    ...option,
    color: averageTint(
      periodRows(newestFirst, option.value).flatMap((tableRow) => bandColors(tableRow, show)),
      1,
    ),
  }));
}

/** Daily table with a period filter, showing the last 90 days by default. */
export function WeightTable({ unit, f: unitFormat, dailyRows }: { unit: Unit; f: Format; dailyRows: WeightRow[] }) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [show, setShow] = useState<Show>(DEFAULT_SHOW);
  const { newestFirst, rows, quarters } = useTableRows(period, dailyRows);

  // Columns on screen, with each one's high and low for the period and for all time.
  const columns = useMemo(() => COLUMNS.filter((column) => !column.group || show[column.group]), [show]);
  const allTimeRanges = useMemo(() => columns.map((column) => rangeOf(newestFirst, column)), [columns, newestFirst]);
  const periodRanges = useMemo(() => columns.map((column) => rangeOf(rows, column)), [columns, rows]);

  return (
    <>
      <div className="weight-controls table-controls">
        <div className="control-group">
          <span className="control-label">Table period</span>
          <PeriodPicker period={period} onChange={setPeriod} options={periodOptions(quarters, newestFirst, show)} />
        </div>
        <div className="control-group">
          <span className="control-label">Column groups</span>
          <GroupToggles show={show} onChange={setShow} />
        </div>
      </div>
      <table>
        <Head unit={unit} f={unitFormat} columns={columns} periodRanges={periodRanges} allTimeRanges={allTimeRanges} />
        <tbody>
          {rows.map((tableRow) => (
            <DayRow key={tableRow.date} d={tableRow} f={unitFormat} show={show} columns={columns} />
          ))}
        </tbody>
      </table>
    </>
  );
}
