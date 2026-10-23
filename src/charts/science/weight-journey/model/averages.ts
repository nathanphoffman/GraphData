import type { Averages } from "../calculate";

/** Round to one decimal place. */
export const round1 = (n: number) => Math.round(n * 10) / 10;

/** The blended average projected a year ahead, using the monthly change. */
export const yearly = (blended: number, monthly: number | null) => (monthly === null ? null : blended + monthly * 12);

/** Mean of the 3-day, 30-day, 365-day, blended and 1-year projected values (projection is missing for the first 30 days). */
export function allAverage(averages: Averages): number {
  const values = [averages.avg3, averages.avg30, averages.avg365, averages.blended, yearly(averages.blended, averages.monthly)].filter((value): value is number => value !== null);

  // Sum all values, then divide for the mean.
  return values.reduce((total, value) => total + value, 0) / values.length;
}

/** Mean of every weight column in the table (not the monthly change or muscle ones); columns with no value yet are skipped. */
export function completeAverage(values: (number | null)[]): number {
  const present = values.filter((value): value is number => value !== null);

  // Sum all present values, then divide for the mean.
  return present.reduce((total, value) => total + value, 0) / present.length;
}

/** All average now plus 12 times its change over the last `lag` rows, like the blended projection (change per 30 real days x 12). */
export const projectAll = (series: number[], index: number, lag: number, step: number) =>
  index >= lag ? series[index] + ((series[index] - series[index - lag]) / step) * 12 : null;

/** Mean of the projected all average over this row and the 2 before it (rows with no projection yet are skipped). */
export function last3(series: (number | null)[], index: number) {
  const values = series.slice(Math.max(0, index - 2), index + 1).filter((entry): entry is number => entry !== null);

  // Sum the values for the mean, or null when there are none.
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : null;
}

/** Monthly rate from the 3-day average: change over 15 days doubled, averaged with the change over 30 days. */
export function recentRate(series: number[], index: number, step: number) {
  const lag15 = Math.round(15 / step);
  const lag30 = Math.round(30 / step);

  if (index < lag30) return null;

  return round1((2 * (series[index] - series[index - lag15]) + (series[index] - series[index - lag30])) / 2);
}
