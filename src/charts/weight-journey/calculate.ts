export interface Day {
  date: string;
  weight: number;
  /** true when there was no weigh-in and the value is interpolated */
  estimated: boolean;
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
