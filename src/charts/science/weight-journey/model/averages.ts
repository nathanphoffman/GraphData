import type { Averages } from "../calculate";

export const round1 = (n: number) => Math.round(n * 10) / 10;

export const yearly = (blended: number, monthly: number | null) => (monthly === null ? null : blended + monthly * 12);

/** Mean of the 3-day, 30-day, 365-day, blended and 1-year projected values (projection is missing for the first 30 days). */
export function allAverage(a: Averages): number {
  const values = [a.avg3, a.avg30, a.avg365, a.blended, yearly(a.blended, a.monthly)].filter((v): v is number => v !== null);

  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Mean of every weight column in the table (not the monthly change or muscle ones); columns with no value yet are skipped. */
export function completeAverage(values: (number | null)[]): number {
  const present = values.filter((v): v is number => v !== null);

  return present.reduce((sum, v) => sum + v, 0) / present.length;
}

/** All average now plus 12 times its change over the last `lag` rows, like the blended projection (change per 30 real days x 12). */
export const projectAll = (series: number[], i: number, lag: number, step: number) =>
  i >= lag ? series[i] + ((series[i] - series[i - lag]) / step) * 12 : null;

/** Mean of the projected all average over this row and the 2 before it (rows with no projection yet are skipped). */
export function last3(series: (number | null)[], i: number) {
  const values = series.slice(Math.max(0, i - 2), i + 1).filter((v): v is number => v !== null);

  return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
}

/** Monthly rate from the 3-day average: change over 15 days doubled, averaged with the change over 30 days. */
export function recentRate(series: number[], i: number, step: number) {
  const lag15 = Math.round(15 / step);
  const lag30 = Math.round(30 / step);

  if (i < lag30) return null;

  return round1((2 * (series[i] - series[i - lag15]) + (series[i] - series[i - lag30])) / 2);
}
