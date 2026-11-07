import { useMemo } from "react";
import { DAY_MS, ISO_DATE_LENGTH } from "../../../constants";
import type { WeightRow } from "../../../model/rows";
import { toDate } from "../../../model/units";

/** The period filter value that means "the last 90 days". */
export const DEFAULT_PERIOD = "default";

/** Where the year and the month sit in YYYY-MM-DD, and how many months make a quarter. */
const YEAR_END = 4;
const MONTH_START = 5;
const MONTH_END = 7;
const MONTHS_PER_QUARTER = 3;

/** The table shows this many days by default. */
const DEFAULT_PERIOD_DAYS = 90;

/** Year and quarter of a date, for the period filter. */
const quarterOf = (isoDate: string) =>
  `${isoDate.slice(0, YEAR_END)}-Q${Math.floor((Number(isoDate.slice(MONTH_START, MONTH_END)) - 1) / MONTHS_PER_QUARTER) + 1}`;

/** Rows of one period: a quarter (e.g. "2025-Q3"), or by default the last 90 days. */
export function periodRows(newestFirst: WeightRow[], period: string) {
  if (period !== DEFAULT_PERIOD) return newestFirst.filter((tableRow) => quarterOf(tableRow.date) === period);
  const cutoff = new Date(toDate(newestFirst[0].date).getTime() - (DEFAULT_PERIOD_DAYS - 1) * DAY_MS)
    .toISOString()
    .slice(0, ISO_DATE_LENGTH);

  return newestFirst.filter((tableRow) => tableRow.date >= cutoff);
}

/** Table shows the last 90 days by default, or one chosen quarter. */
export function useTableRows(period: string, dailyRows: WeightRow[]) {
  const newestFirst = useMemo(() => [...dailyRows].reverse(), [dailyRows]);

  // Each distinct quarter in the data (like 2025-Q3), for the period filter.
  const quarters = useMemo(() => [...new Set(newestFirst.map((tableRow) => quarterOf(tableRow.date)))], [newestFirst]);
  const rows = useMemo(() => periodRows(newestFirst, period), [newestFirst, period]);

  return { newestFirst, rows, quarters };
}
