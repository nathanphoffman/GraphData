export interface Column {
  label: string;
  /** Short name for the table header; the full label shows on hover. */
  short?: string;
  /** Rated columns count towards the score; columns without a weight are just information. */
  weight?: number;
  /** The rating that is ideal when it is not the highest one; ratings further from it count for less. */
  best?: number;
  /** The value is a raw measurement (not a 1 to 5 rating) turned into a 1 to 5 rating by this curve. */
  curve?: Curve;
}

/**
 * How a raw value becomes a rating from 1 to 5, set per column in the ranking's JSON file:
 * - peak: `at` is the best value (5). Below it the rating falls quickly to `fromRating` at `from`; above it, in a straight line to 1 at `to`.
 * - log: 5 at `from` down to 1 at `to`, on a log scale so a few huge values do not flatten the rest. For things where less is better.
 * - halving: `start` (5 or 1) at a value of 0, and every +1 closes half the distance to the other end.
 * - age: years since the current year, so this year is 1 and each year that passes lifts older values. It climbs fast at first and slowly after
 *   (`offset` is how long the fast part lasts, larger `steepness` is faster), reaching 5 only at the `oldest` year.
 */
export type Curve =
  | { type: "peak"; at: number; from: number; fromRating: number; to: number }
  | { type: "log"; from: number; to: number }
  | { type: "halving"; start: 1 | 5 }
  | { type: "age"; oldest: number; offset: number; steepness: number };

export interface Item {
  name: string;
  /** One value per column, in the same order as the columns. */
  values: (number | string | null)[];
}

export interface Ranking {
  id: string;
  title: string;
  columns: Column[];
  items: Item[];
}

export const LOWEST_RATING = 1;
export const HIGHEST_RATING = 5;

/**
 * How sharply the grade falls away as the score drops. With 5.4, a score near the top barely loses anything and the grade
 * drops faster and faster further down. Higher is steeper.
 */
const GRADE_STEEPNESS = 5.4;

/** Bends the bottom of the grade curve down: above 1, low scores grade lower while high scores hardly change. */
const GRADE_BOTTOM_BEND = 1.75;

/** Lifts the middle of the grade curve by this many points, tapering off either side so the top and bottom stay put. */
const GRADE_MIDDLE_LIFT = 9;
const GRADE_MIDDLE_AT = 0.42;
const GRADE_MIDDLE_WIDTH = 0.16;

const clamp = (rating: number) => Math.min(HIGHEST_RATING, Math.max(LOWEST_RATING, rating));

/** Raw value to a rating from 1 to 5 by the given curve. */
function applyCurve(curve: Curve, value: number): number {
  switch (curve.type) {
    case "peak": {
      if (value > curve.at) return clamp(HIGHEST_RATING - ((HIGHEST_RATING - LOWEST_RATING) * (value - curve.at)) / (curve.to - curve.at));

      const distance = (value - curve.from) / (curve.at - curve.from);

      return clamp(curve.fromRating + (HIGHEST_RATING - curve.fromRating) * distance * Math.abs(distance));
    }
    case "log": {
      const share = (Math.log(value) - Math.log(curve.from)) / (Math.log(curve.to) - Math.log(curve.from));

      return clamp(HIGHEST_RATING - (HIGHEST_RATING - LOWEST_RATING) * share);
    }
    case "halving": {
      const other = HIGHEST_RATING + LOWEST_RATING - curve.start;

      return other + (curve.start - other) * 0.5 ** value;
    }
    case "age": {
      const falloff = (age: number) => (1 + age / curve.offset) ** -curve.steepness;
      const now = new Date().getFullYear();
      const share = (1 - falloff(Math.max(0, now - value))) / (1 - falloff(now - curve.oldest));

      return clamp(LOWEST_RATING + (HIGHEST_RATING - LOWEST_RATING) * share);
    }
  }
}

/** The rating a column counts as: as given, run through its curve, or when the column has a best rating, 5 at that rating down to 1 at the furthest end. */
export function effectiveRating(column: Column, rating: number): number {
  if (column.curve !== undefined) return applyCurve(column.curve, rating);
  if (column.best === undefined) return rating;

  const furthest = Math.max(column.best - LOWEST_RATING, HIGHEST_RATING - column.best);

  return HIGHEST_RATING - ((HIGHEST_RATING - LOWEST_RATING) * Math.abs(rating - column.best)) / furthest;
}

/** Sum of rating squared times the column's weight, over the rated columns. */
export function score(columns: Column[], item: Item): number {
  return columns.reduce((total, column, index) => {
    const rating = item.values[index];

    return column.weight === undefined || typeof rating !== "number" ? total : total + effectiveRating(column, rating) ** 2 * column.weight;
  }, 0);
}

/** The score if every rated column got this rating. */
function scoreOfAll(columns: Column[], rating: number): number {
  return columns.reduce((total, column) => total + (column.weight ?? 0) * rating ** 2, 0);
}

/** The best possible score: every rated column rated the highest. */
export const maxScore = (columns: Column[]) => scoreOfAll(columns, HIGHEST_RATING);

/** The lowest score a real item gets: every rated column rated the lowest. */
export const minScore = (columns: Column[]) => scoreOfAll(columns, LOWEST_RATING);

/** The points added to the grade at this share: a bump centred on the middle. */
const middleLift = (share: number) => GRADE_MIDDLE_LIFT * Math.exp(-(((share - GRADE_MIDDLE_AT) / GRADE_MIDDLE_WIDTH) ** 2) / 2);

/** Grade out of 100 for a score, on an exponential curve: 0 for the lowest possible score and 100 for the best. */
export function grade(scoreValue: number, columns: Column[]): number {
  const [low, high] = [minScore(columns), maxScore(columns)];
  if (high === low) return 0;

  const share = Math.max(0, (scoreValue - low) / (high - low));

  const curve = (100 * (1 - Math.exp(-GRADE_STEEPNESS * share ** GRADE_BOTTOM_BEND))) / (1 - Math.exp(-GRADE_STEEPNESS));
  const lift = middleLift(share) - (1 - share) * middleLift(0) - share * middleLift(1);

  return Math.min(100, curve + lift);
}

/** Items best score first, each with its grade and rank; items with the same score share a rank. */
export function rankItems(ranking: Ranking) {
  const scored = ranking.items
    .map((item) => ({ item, score: score(ranking.columns, item) }))
    .map((entry) => ({ ...entry, grade: grade(entry.score, ranking.columns) }))
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => ({ ...entry, rank: scored.findIndex((other) => other.score === entry.score) + 1 }));
}

/** Where a value sits between a low and a high, from 0 to 1; 0.5 when they are the same. */
export function fractionBetween(value: number, low: number, high: number): number {
  if (high === low) return 0.5;

  return Math.min(1, Math.max(0, (value - low) / (high - low)));
}

const LETTER_GRADES: [number, string][] = [
  [97, "A+"], [93, "A"], [90, "A-"], [87, "B+"], [83, "B"], [80, "B-"], [77, "C+"], [73, "C"], [70, "C-"], [67, "D+"], [63, "D"], [60, "D-"],
];

/** The usual school letter for a grade out of 100: A at 93, B at 83, and so on down to F under 60. */
export const letterGrade = (gradeValue: number): string => LETTER_GRADES.find(([minimum]) => Math.round(gradeValue) >= minimum)?.[1] ?? "F";
