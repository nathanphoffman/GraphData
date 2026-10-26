import { taperToTotal } from "../calculate";
import { SPREAD_ROWS } from "../constants";
import type { FatProjection, WeightRow } from "./rows";

export interface Point {
  date: string;
  weight: number;
}

/** Tapering curve from `start` to `target` (treated as the total loss) over `ahead` days, starting at `date`. */
export const taperCurve = (date: string, start: number, target: number, ahead: number): Point[] => [
  { date, weight: start },
  ...taperToTotal(date, start, start - target, ahead),
];

// Average of f over all rows.
const meanOf = (rows: WeightRow[], pick: (latestRow: WeightRow) => number) => rows.reduce((total, latestRow) => total + pick(latestRow), 0) / rows.length;

/** Tapering curve from a row's 3-day average down to its 3 day projected all average (first month = 1/12 of the loss). Today, yesterday and the day before. */
export function buildAllTrend(rows: WeightRow[], ahead: number, fatProjection: FatProjection | null = null) {
  // Up to three past trend lines (today, 1 and 2 steps back) so you can see how the projection has shifted.
  const trends = [0, 1, 2].flatMap((back) => {
    const latestRow = rows[rows.length - 1 - back];

    if (!latestRow || latestRow.allProj3 === null || latestRow.allProj3Adj === null) return [];
    const actual = taperCurve(latestRow.date, latestRow.avg3, latestRow.allProj3, ahead);

    const fatRow = fatProjection?.rows[rows.length - 1 - back];
    const fatCurve = fatRow && fatRow.allProj3 !== null ? taperCurve(latestRow.date, fatRow.avg3, fatRow.allProj3, ahead) : null;

    return [{ back, actual, adjusted: taperCurve(latestRow.date, latestRow.adj.avg3, latestRow.allProj3Adj, ahead), fat: fatCurve }];
  });

  return trends.length ? { trends, date: trends[0].actual[trends[0].actual.length - 1].date } : null;
}

/** One side of the spread: the last week's curves sorted best (lowest target) to worst, plus their mean curve. */
function spreadSide(rows7: WeightRow[], start: (latestRow: WeightRow) => number, target: (latestRow: WeightRow) => number, ahead: number) {
  const curves = rows7
    .map((latestRow) => ({ target: target(latestRow), points: taperCurve(latestRow.date, start(latestRow), target(latestRow), ahead) }))
    .sort((first, second) => first.target - second.target);

  return { curves, mean: taperCurve(rows7[rows7.length - 1].date, meanOf(rows7, start), meanOf(rows7, target), ahead) };
}

/** The last 7 rows each give a tapering curve to their own 3 day projected all average; used for the shaded range. */
export function buildSpread(rows: WeightRow[], ahead: number) {
  const rows7 = rows.slice(-SPREAD_ROWS).filter((latestRow) => latestRow.allProj3 !== null && latestRow.allProj3Adj !== null);

  if (rows7.length < 2) return null;

  return {
    actual: spreadSide(rows7, (latestRow) => latestRow.avg3, (latestRow) => latestRow.allProj3!, ahead),
    adjusted: spreadSide(rows7, (latestRow) => latestRow.adj.avg3, (latestRow) => latestRow.allProj3Adj!, ahead),
  };
}

/**
 * Quadratic projection averaged with the mean curve of the last week's 3 day projected all averages, day by day
 * (only the days both cover, which is the quadratic's 90 days ahead).
 */
export function buildGeneral(rows: WeightRow[], ahead: number, quadratic: Point[]) {
  const rows7 = rows.slice(-SPREAD_ROWS).filter((latestRow) => latestRow.allProj3 !== null);

  if (!rows7.length) return null;
  const meanCurve = taperCurve(rows7[rows7.length - 1].date, meanOf(rows7, (latestRow) => latestRow.avg3), meanOf(rows7, (latestRow) => latestRow.allProj3!), ahead);
  const byDate = new Map(quadratic.map((point) => [point.date, point.weight]));

  // Average the two projections on days where both exist.
  return meanCurve.flatMap((point) => {
    const quadraticWeight = byDate.get(point.date);

    return quadraticWeight === undefined ? [] : [{ date: point.date, weight: (point.weight + quadraticWeight) / 2 }];
  });
}

export type AllTrend = NonNullable<ReturnType<typeof buildAllTrend>>;
export type Spread = NonNullable<ReturnType<typeof buildSpread>>;
export type General = NonNullable<ReturnType<typeof buildGeneral>>;
