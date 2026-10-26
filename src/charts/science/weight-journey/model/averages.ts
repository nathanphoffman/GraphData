import { type Averages, round1 } from "../calculate";
import { DAYS_PER_MONTH, HALF_MONTH_DAYS, MONTHS_PER_YEAR } from "../constants";

/** The blended average projected a year ahead, using the monthly change. */
export const yearly = (blended: number, monthly: number | null) => (monthly === null ? null : blended + monthly * MONTHS_PER_YEAR);

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
  index >= lag ? series[index] + ((series[index] - series[index - lag]) / step) * MONTHS_PER_YEAR : null;

/** Mean of a series (projected all average, recent rate) over this row and the 2 before it (rows with no projection yet are skipped). */
export function last3(series: (number | null)[], index: number) {
  const values = series.slice(Math.max(0, index - 2), index + 1).filter((entry): entry is number => entry !== null);

  // Sum the values for the mean, or null when there are none.
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : null;
}

/** Weighted moving average over the last `window` rows: newest counts `window` times, the one before `window - 1`, down to 1 (rows with no value are skipped). */
export function weightedAverage(series: (number | null)[], index: number, window: number) {
  let total = 0;
  let weights = 0;

  for (let back = 0; back < window && back <= index; back++) {
    const value = series[index - back];

    if (value === null) continue;
    total += value * (window - back);
    weights += window - back;
  }

  return weights ? round1(total / weights) : null;
}

/** Monthly rate from the 3-day average: change over 15 days doubled, averaged with the change over 30 days. */
export function recentRate(series: (number | null)[], index: number, step: number) {
  const lag15 = Math.round(HALF_MONTH_DAYS / step);
  const lag30 = Math.round(DAYS_PER_MONTH / step);

  if (index < lag30) return null;

  const [now, back15, back30] = [series[index], series[index - lag15], series[index - lag30]];

  // No rate until all three values exist.
  if (now === null || back15 === null || back30 === null) return null;

  return round1((2 * (now - back15) + (now - back30)) / 2);
}
