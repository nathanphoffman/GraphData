export interface DayWeight {
  date: string;
  weight: number;

  /** true when there was no weigh-in and the value is interpolated */
  estimated: boolean;
}

export interface Averages {
  avg3: number;
  avg30: number;
  avg365: number;

  /** (3 x avg3 + 2 x avg30 + 1 x avg365) / 6 */
  blended: number;

  /** blended now minus blended 30 days ago; null for the first 30 days */
  monthly: number | null;
}

export interface Muscle {
  /** pounds of muscle gained on this day */
  muscleDaily: number;

  /** pounds of muscle gained from MUSCLE_START up to and including this day */
  muscleTotal: number;
}

export interface Projection {
  date: string;
  weight: number;
}

const DAY_MS = 86_400_000;
import { DAYS_PER_MONTH, DAYS_PER_YEAR, ISO_DATE_LENGTH, TENTH } from "./constants";

const SHORT_WINDOW_DAYS = 3;

/** Weights for blending the short, medium and long averages. */
const BLEND_SHORT = 3;
const BLEND_MEDIUM = 2;
const BLEND_LONG = 1;
const BLEND_TOTAL = BLEND_SHORT + BLEND_MEDIUM + BLEND_LONG;

/** A month keeps this share of the last month's rate. */
const MONTHLY_KEEP = 11 / 12;

/** A quadratic has this many coefficients, which is the size of its equation system. */
const QUADRATIC_TERMS = 3;
const AUGMENTED_COLUMNS = QUADRATIC_TERMS + 1;

/** Round to one decimal place. */
export const round1 = (value: number) => Math.round(value * TENTH) / TENTH;

/** Date as milliseconds, read as UTC so the time zone cannot shift the day. */
const parse = (isoDate: string) => Date.parse(isoDate + "T00:00:00Z");

/** Milliseconds back to a YYYY-MM-DD date. */
const format = (milliseconds: number) => new Date(milliseconds).toISOString().slice(0, ISO_DATE_LENGTH);

/** One row per calendar day; gaps between weigh-ins are filled in a straight line. */
export function fillDays(weights: [string, number][]): DayWeight[] {
  const days: DayWeight[] = [];

  for (let index = 0; index < weights.length; index++) {
    const [date, weight] = weights[index];
    days.push({ date, weight, estimated: false });
    const next = weights[index + 1];

    if (!next) break;
    const start = parse(date);
    const gapDays = (parse(next[0]) - start) / DAY_MS;

    for (let step = 1; step < gapDays; step++) {
      days.push({
        date: format(start + step * DAY_MS),
        weight: round1(weight + ((next[1] - weight) * step) / gapDays),
        estimated: true,
      });
    }
  }

  return days;
}

/** Solve a 3x3 system (normal equations for a quadratic fit) by Gaussian elimination. */
function solve3(matrix: number[][], value: number[]): number[] {
  const augmented = matrix.map((matrixRow, index) => [...matrixRow, value[index]]);

  for (let column = 0; column < QUADRATIC_TERMS; column++) {
    let pivot = column;

    for (let rowIndex = column + 1; rowIndex < QUADRATIC_TERMS; rowIndex++) if (Math.abs(augmented[rowIndex][column]) > Math.abs(augmented[pivot][column])) pivot = rowIndex;
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];

    for (let rowIndex = column + 1; rowIndex < QUADRATIC_TERMS; rowIndex++) {
      const factor = augmented[rowIndex][column] / augmented[column][column];

      for (let columnIndex = column; columnIndex < AUGMENTED_COLUMNS; columnIndex++) augmented[rowIndex][columnIndex] -= factor * augmented[column][columnIndex];
    }
  }

  const xPos = [0, 0, 0];

  for (let rowIndex = 2; rowIndex >= 0; rowIndex--) {
    let total = augmented[rowIndex][QUADRATIC_TERMS];

    for (let columnIndex = rowIndex + 1; columnIndex < QUADRATIC_TERMS; columnIndex++) total -= augmented[rowIndex][columnIndex] * xPos[columnIndex];
    xPos[rowIndex] = total / augmented[rowIndex][rowIndex];
  }

  return xPos;
}

/** Quadratic least-squares curve through the last `fitDays` days, extended `aheadDays` into the future. */
export function project(days: DayWeight[], fitDays: number, aheadDays: number): { fit: Projection[]; future: Projection[] } {
  const recent = days.slice(-fitDays);
  const dayCount = recent.length;

  // Sums used for a least-squares fit over the recent days (x is the day index).
  const power = (exponent: number) => recent.reduce((total, _unused, index) => total + index ** exponent, 0);

  // Weighted sum used by the curve fit: each day's weight times its index to the power k.
  const weighted = (exponent: number) => recent.reduce((total, dayRecord, index) => total + dayRecord.weight * index ** exponent, 0);
  const [c, b, a] = solve3(
    // Row i, column j of the normal equations is the sum of x to the power i + j (power 0 is just n).
    Array.from({ length: QUADRATIC_TERMS }, (_equation, rowIndex) => Array.from({ length: QUADRATIC_TERMS }, (_column, column) => power(rowIndex + column))),
    Array.from({ length: QUADRATIC_TERMS }, (_term, exponent) => weighted(exponent)),
  );

  const weightAt = (index: number) => round1(c + b * index + a * index * index);
  const last = parse(recent[dayCount - 1].date);

  return {
    fit: recent.map((dayRecord, index) => ({ date: dayRecord.date, weight: weightAt(index) })),
    // Extend the fitted curve forward one point per future day.
    future: Array.from({ length: aheadDays }, (_unused, daysAhead) => ({
      date: format(last + (daysAhead + 1) * DAY_MS),
      weight: weightAt(dayCount + daysAhead),
    })),
  };
}

/** Trailing averages (the day itself plus the days before it) and the blended number built from them. */
export function addAverages<T extends DayWeight>(
  days: T[],
  windows = { short: SHORT_WINDOW_DAYS, medium: DAYS_PER_MONTH, long: DAYS_PER_YEAR },
  /** real days per row; the 30-row change is divided by it so `monthly` is always per 30 real days */
  step = 1,
): (T & Averages)[] {
  const prefix = [0];

  for (const dayRecord of days) prefix.push(prefix[prefix.length - 1] + dayRecord.weight);

  // Average of the last `size` rows, from running totals so each row takes constant time.
  const trailing = (index: number, size: number) => {
    const from = Math.max(0, index - size + 1);

    return (prefix[index + 1] - prefix[from]) / (index + 1 - from);
  };

  const blended = days.map((_unused, index) => (BLEND_SHORT * trailing(index, windows.short) + BLEND_MEDIUM * trailing(index, windows.medium) + BLEND_LONG * trailing(index, windows.long)) / BLEND_TOTAL);

  // Attach every average to its day, plus the monthly change once there is enough history.
  return days.map((dayRecord, index) => ({
    ...dayRecord,
    avg3: round1(trailing(index, windows.short)),
    avg30: round1(trailing(index, windows.medium)),
    avg365: round1(trailing(index, windows.long)),
    blended: round1(blended[index]),
    monthly: index >= windows.medium ? round1((blended[index] - blended[index - windows.medium]) / step) : null,
  }));
}

const MUSCLE_START = "2024-06-20";
const MUSCLE_TOTAL = 14.5;

/** How much the daily gain tapers by the end: 0 is a straight line, 0.5 means the last day gains 50% less than the first. */
const MUSCLE_TAPER = 0.5;

/** Estimated muscle gain: a nearly straight line from MUSCLE_START to the last day that adds up to MUSCLE_TOTAL lb. */
export function addMuscle<T extends DayWeight>(days: T[]): (T & Muscle)[] {
  const start = days.findIndex((dayRecord) => dayRecord.date >= MUSCLE_START);
  const span = days.length - 1 - start;

  // Cumulative share of the total at position u (0..1): a line bent slightly flat toward the end.
  const share = (progress: number) => (progress - (MUSCLE_TAPER * progress * progress) / 2) / (1 - MUSCLE_TAPER / 2);

  // Split the muscle total across the days so the daily gain tapers off.
  return days.map((dayRecord, index) => {
    const total = index < start ? 0 : MUSCLE_TOTAL * share((index - start) / span);
    const before = index <= start ? 0 : MUSCLE_TOTAL * share((index - 1 - start) / span);

    return { ...dayRecord, muscleDaily: total - before, muscleTotal: total };
  });
}

export interface TargetPoint {
  date: string;
  weight: number;

  /** weight minus all muscle gained so far, including the projected gain */
  adjusted: number;

  /** total muscle gained by this day, including the projected gain */
  muscle: number;
}

/**
 * Project `aheadDays` of weight loss. The daily loss starts at `monthlyLoss / 30` and the daily muscle gain
 * at `muscleDaily`; both shrink by the same factor each month. Each month keeps 11/12 of the last month's rate,
 * so the loss over all time adds up to 12x the first month.
 */
export function projectTapering(
  startDate: string,
  startWeight: number,
  startMuscle: number,
  monthlyLoss: number,
  muscleDaily: number,
  aheadDays: number,
): TargetPoint[] {
  const start = parse(startDate);
  let weight = startWeight;
  let muscle = startMuscle;
  const points: TargetPoint[] = [];

  for (let dayNumber = 1; dayNumber <= aheadDays; dayNumber++) {
    const factor = MONTHLY_KEEP ** (dayNumber / DAYS_PER_MONTH);
    weight -= (monthlyLoss / DAYS_PER_MONTH) * factor;
    muscle += muscleDaily * factor;
    points.push({ date: format(start + dayNumber * DAY_MS), weight: round1(weight), adjusted: round1(weight - muscle), muscle });
  }

  return points;
}

/**
 * Curve that ends up `totalLoss` below `startWeight` once all time has passed: each month's loss is 11/12 of the
 * previous one, so the first month loses totalLoss / 12. Returns the weight on each of the next `aheadDays` days.
 */
export function taperToTotal(startDate: string, startWeight: number, totalLoss: number, aheadDays: number): Projection[] {
  const start = parse(startDate);

  // One point per future day on the tapering curve.
  return Array.from({ length: aheadDays }, (_unused, index) => ({
    date: format(start + (index + 1) * DAY_MS),
    weight: round1(startWeight - totalLoss * (1 - MONTHLY_KEEP ** ((index + 1) / DAYS_PER_MONTH))),
  }));
}
