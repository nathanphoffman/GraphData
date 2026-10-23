/** Allowed slider values, so the sliders can take bigger steps as the numbers grow. */

/** Slider stops for uses per year: 0.1 steps below 5, 1 steps to 100, then 5 steps to 365. */
export const PER_YEAR_STOPS: number[] = [];

for (let i = 1; i < 50; i++) PER_YEAR_STOPS.push(i / 10);

for (let v = 5; v <= 100; v++) PER_YEAR_STOPS.push(v);

for (let v = 105; v <= 365; v += 5) PER_YEAR_STOPS.push(v);

/** Slider stops for things owned: 1 steps to 30, 5 steps to 300, then 10 steps to 1000. */
export const OWNED_STOPS: number[] = [];

for (let v = 1; v <= 30; v++) OWNED_STOPS.push(v);

for (let v = 35; v <= 300; v += 5) OWNED_STOPS.push(v);

for (let v = 310; v <= 1000; v += 10) OWNED_STOPS.push(v);

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
