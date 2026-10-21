import { taperToTotal } from "../calculate";
import type { Row } from "./rows";

export interface Point {
  date: string;
  weight: number;
}

/** Tapering curve from `start` to `target` (treated as the total loss) over `ahead` days, starting at `date`. */
export const taperCurve = (date: string, start: number, target: number, ahead: number): Point[] => [
  { date, weight: start },
  ...taperToTotal(date, start, start - target, ahead),
];

const meanOf = (rows: Row[], f: (r: Row) => number) => rows.reduce((sum, r) => sum + f(r), 0) / rows.length;

/** Tapering curve from a row's 3-day average down to its 3 day projected all average (first month = 1/12 of the loss). Today, yesterday and the day before. */
export function buildAllTrend(rows: Row[], ahead: number) {
  const trends = [0, 1, 2].flatMap((back) => {
    const row = rows[rows.length - 1 - back];
    if (!row || row.allProj3 === null || row.allProj3Adj === null) return [];
    const actual = taperCurve(row.date, row.avg3, row.allProj3, ahead);
    return [{ back, actual, adjusted: taperCurve(row.date, row.adj.avg3, row.allProj3Adj, ahead) }];
  });
  return trends.length ? { trends, date: trends[0].actual[trends[0].actual.length - 1].date } : null;
}

/** One side of the spread: the last week's curves sorted best (lowest target) to worst, plus their mean curve. */
function spreadSide(rows7: Row[], start: (r: Row) => number, target: (r: Row) => number, ahead: number) {
  const curves = rows7
    .map((r) => ({ target: target(r), points: taperCurve(r.date, start(r), target(r), ahead) }))
    .sort((a, b) => a.target - b.target);
  return { curves, mean: taperCurve(rows7[rows7.length - 1].date, meanOf(rows7, start), meanOf(rows7, target), ahead) };
}

/** The last 7 rows each give a tapering curve to their own 3 day projected all average; used for the shaded range. */
export function buildSpread(rows: Row[], ahead: number) {
  const rows7 = rows.slice(-7).filter((r) => r.allProj3 !== null && r.allProj3Adj !== null);
  if (rows7.length < 2) return null;
  return {
    actual: spreadSide(rows7, (r) => r.avg3, (r) => r.allProj3!, ahead),
    adjusted: spreadSide(rows7, (r) => r.adj.avg3, (r) => r.allProj3Adj!, ahead),
  };
}

/**
 * Quadratic projection averaged with the mean curve of the last week's 3 day projected all averages, day by day
 * (only the days both cover, which is the quadratic's 90 days ahead).
 */
export function buildGeneral(rows: Row[], ahead: number, quadratic: Point[]) {
  const rows7 = rows.slice(-7).filter((r) => r.allProj3 !== null);
  if (!rows7.length) return null;
  const meanCurve = taperCurve(rows7[rows7.length - 1].date, meanOf(rows7, (r) => r.avg3), meanOf(rows7, (r) => r.allProj3!), ahead);
  const byDate = new Map(quadratic.map((d) => [d.date, d.weight]));
  return meanCurve.flatMap((d) => {
    const q = byDate.get(d.date);
    return q === undefined ? [] : [{ date: d.date, weight: (d.weight + q) / 2 }];
  });
}

export type AllTrend = NonNullable<ReturnType<typeof buildAllTrend>>;
export type Spread = NonNullable<ReturnType<typeof buildSpread>>;
export type General = NonNullable<ReturnType<typeof buildGeneral>>;
