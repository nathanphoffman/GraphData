/** Allowed slider values, so the sliders can take bigger steps as the numbers grow. */

/** Slider stops for uses per year: 0.1 steps below 5, 1 steps to 100, then 5 steps to 365. */
export const PER_YEAR_STOPS: number[] = [];

for (let index = 1; index < 50; index++) PER_YEAR_STOPS.push(index / 10);

for (let value = 5; value <= 100; value++) PER_YEAR_STOPS.push(value);

for (let value = 105; value <= 365; value += 5) PER_YEAR_STOPS.push(value);

/** Slider stops for things owned: 1 steps to 30, 5 steps to 300, then 10 steps to 1000. */
export const OWNED_STOPS: number[] = [];

for (let value = 1; value <= 30; value++) OWNED_STOPS.push(value);

for (let value = 35; value <= 300; value += 5) OWNED_STOPS.push(value);

for (let value = 310; value <= 1000; value += 10) OWNED_STOPS.push(value);

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
