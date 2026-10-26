/** Allowed slider values, so the sliders can take bigger steps as the numbers grow. */

/** The values from `from` to `to` (inclusive), `step` apart. Rounded so 0.1 steps do not pick up float noise like 0.30000000000000004. */
function stopsBetween(from: number, last: number, step: number): number[] {
  const count = Math.round((last - from) / step);

  return Array.from({ length: count + 1 }, (_unused, index) => Number((from + index * step).toFixed(ROUND_DIGITS)));
}

const ROUND_DIGITS = 6;

/** Slider stops for uses per year: 0.1 steps below 5, 1 steps to 100, then 5 steps to 365. */
export const PER_YEAR_STOPS: number[] = [...stopsBetween(0.1, 4.9, 0.1), ...stopsBetween(5, 100, 1), ...stopsBetween(105, 365, 5)];

/** Slider stops for things owned: 1 steps to 30, 5 steps to 300, then 10 steps to 1000. */
export const OWNED_STOPS: number[] = [...stopsBetween(1, 30, 1), ...stopsBetween(35, 300, 5), ...stopsBetween(310, 1000, 10)];

export const PER_WEEK_MIN = 0.25;
export const PER_WEEK_MAX = 21;
export const PER_WEEK_STEP = 0.25;

/** Names shown on the uses-per-year slider when it sits exactly on a familiar frequency. */
export const PER_YEAR_BENCHMARKS: Record<number, string> = {
  0.1: "Decadely",
  0.5: "Biannually",
  1: "Annually",
  12: "Monthly",
  52: "Weekly",
  365: "Daily",
};
