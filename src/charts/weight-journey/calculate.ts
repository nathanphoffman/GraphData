export interface Day {
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

const parse = (iso: string) => Date.parse(iso + "T00:00:00Z");
const format = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** One row per calendar day; gaps between weigh-ins are filled in a straight line. */
export function fillDays(weights: [string, number][]): Day[] {
  const days: Day[] = [];

  for (let i = 0; i < weights.length; i++) {
    const [date, weight] = weights[i];
    days.push({ date, weight, estimated: false });
    const next = weights[i + 1];

    if (!next) break;
    const start = parse(date);
    const gap = (parse(next[0]) - start) / DAY_MS;

    for (let step = 1; step < gap; step++) {
      days.push({
        date: format(start + step * DAY_MS),
        weight: Math.round((weight + ((next[1] - weight) * step) / gap) * 10) / 10,
        estimated: true,
      });
    }
  }

  return days;
}

/** Solve a 3x3 system (normal equations for a quadratic fit) by Gaussian elimination. */
function solve3(m: number[][], v: number[]): number[] {
  const a = m.map((row, i) => [...row, v[i]]);

  for (let col = 0; col < 3; col++) {
    let pivot = col;

    for (let r = col + 1; r < 3; r++) if (Math.abs(a[r][col]) > Math.abs(a[pivot][col])) pivot = r;
    [a[col], a[pivot]] = [a[pivot], a[col]];

    for (let r = col + 1; r < 3; r++) {
      const f = a[r][col] / a[col][col];

      for (let c = col; c < 4; c++) a[r][c] -= f * a[col][c];
    }
  }

  const x = [0, 0, 0];

  for (let r = 2; r >= 0; r--) {
    let sum = a[r][3];

    for (let c = r + 1; c < 3; c++) sum -= a[r][c] * x[c];
    x[r] = sum / a[r][r];
  }

  return x;
}

/** Quadratic least-squares curve through the last `fitDays` days, extended `aheadDays` into the future. */
export function project(days: Day[], fitDays: number, aheadDays: number): { fit: Projection[]; future: Projection[] } {
  const recent = days.slice(-fitDays);
  const n = recent.length;

  // Sums used for a least-squares fit over the recent days (x is the day index).
  const power = (k: number) => recent.reduce((sum, _, i) => sum + i ** k, 0);
  const weighted = (k: number) => recent.reduce((sum, d, i) => sum + d.weight * i ** k, 0);
  const [c, b, a] = solve3(
    [
      [n, power(1), power(2)],
      [power(1), power(2), power(3)],
      [power(2), power(3), power(4)],
    ],
    [weighted(0), weighted(1), weighted(2)],
  );

  const at = (i: number) => Math.round((c + b * i + a * i * i) * 10) / 10;
  const last = parse(recent[n - 1].date);

  return {
    fit: recent.map((d, i) => ({ date: d.date, weight: at(i) })),
    future: Array.from({ length: aheadDays }, (_, k) => ({
      date: format(last + (k + 1) * DAY_MS),
      weight: at(n + k),
    })),
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Trailing averages (the day itself plus the days before it) and the blended number built from them. */
export function addAverages<T extends Day>(
  days: T[],
  windows = { short: 3, medium: 30, long: 365 },
  /** real days per row; the 30-row change is divided by it so `monthly` is always per 30 real days */
  step = 1,
): (T & Averages)[] {
  const prefix = [0];

  for (const d of days) prefix.push(prefix[prefix.length - 1] + d.weight);
  const trailing = (i: number, size: number) => {
    const from = Math.max(0, i - size + 1);

    return (prefix[i + 1] - prefix[from]) / (i + 1 - from);
  };

  const blended = days.map((_, i) => (3 * trailing(i, windows.short) + 2 * trailing(i, windows.medium) + trailing(i, windows.long)) / 6);

  return days.map((d, i) => ({
    ...d,
    avg3: round1(trailing(i, windows.short)),
    avg30: round1(trailing(i, windows.medium)),
    avg365: round1(trailing(i, windows.long)),
    blended: round1(blended[i]),
    monthly: i >= windows.medium ? round1((blended[i] - blended[i - windows.medium]) / step) : null,
  }));
}

const MUSCLE_START = "2024-06-20";
const MUSCLE_TOTAL = 14.5;
/** How much the daily gain tapers by the end: 0 is a straight line, 0.5 means the last day gains 50% less than the first. */
const MUSCLE_TAPER = 0.5;

/** Estimated muscle gain: a nearly straight line from MUSCLE_START to the last day that adds up to MUSCLE_TOTAL lb. */
export function addMuscle<T extends Day>(days: T[]): (T & Muscle)[] {
  const start = days.findIndex((d) => d.date >= MUSCLE_START);
  const span = days.length - 1 - start;

  // Cumulative share of the total at position u (0..1): a line bent slightly flat toward the end.
  const share = (u: number) => (u - (MUSCLE_TAPER * u * u) / 2) / (1 - MUSCLE_TAPER / 2);

  return days.map((d, i) => {
    const total = i < start ? 0 : MUSCLE_TOTAL * share((i - start) / span);
    const before = i <= start ? 0 : MUSCLE_TOTAL * share((i - 1 - start) / span);
    return { ...d, muscleDaily: total - before, muscleTotal: total };
  });
}

export interface TargetPoint {
  date: string;
  weight: number;
  /** weight minus all muscle gained so far, including the projected gain */
  adjusted: number;
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

  for (let k = 1; k <= aheadDays; k++) {
    const factor = (11 / 12) ** (k / 30);
    weight -= (monthlyLoss / 30) * factor;
    muscle += muscleDaily * factor;
    points.push({ date: format(start + k * DAY_MS), weight: round1(weight), adjusted: round1(weight - muscle) });
  }

  return points;
}

/**
 * Curve that ends up `totalLoss` below `startWeight` once all time has passed: each month's loss is 11/12 of the
 * previous one, so the first month loses totalLoss / 12. Returns the weight on each of the next `aheadDays` days.
 */
export function taperToTotal(startDate: string, startWeight: number, totalLoss: number, aheadDays: number): Projection[] {
  const start = parse(startDate);

  return Array.from({ length: aheadDays }, (_, i) => ({
    date: format(start + (i + 1) * DAY_MS),
    weight: round1(startWeight - totalLoss * (1 - (11 / 12) ** ((i + 1) / 30))),
  }));
}
