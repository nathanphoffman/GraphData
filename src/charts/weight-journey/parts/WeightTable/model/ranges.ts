import type { WeightRow } from "../../../model/rows";
import type { Column } from "./columns";

export type Range = { high: number; low: number; avg: number } | null;

/** Highest, lowest and average value a column takes over the rows (null when it has none). */
export function rangeOf(rows: WeightRow[], column: Column): Range {
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
