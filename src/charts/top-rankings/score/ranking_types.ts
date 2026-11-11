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
 * - peak: `at` is the best value (5). Below it the rating falls in a straight line to `fromRating` at `from`; above it, in a straight line to 1 at `to`.
 *   With `kneeAt` and `kneeRating`, the line above `at` is gentle down to `kneeRating` at `kneeAt`, then steeper to 1 at `to`.
 * - log: 5 at `from` down to 1 at `to`, on a log scale so a few huge values do not flatten the rest. For things where less is better.
 * - log1p: 5 at a value of 0 down to 1 at `to`, on a log scale of 1 + the value, so the first few count for much more than later ones. For counts where fewer is better.
 * - linear: 1 at `from` up to 5 at `to`, in a straight line. For measurements where more is better, like a quality score.
 * - halving: `start` (5 or 1) at a value of 0, and every +1 closes half the distance to the other end.
 * - age: years since the current year, so this year is 1 and each year that passes lifts older values. It climbs fast at first and slowly after
 *   (`offset` is how long the fast part lasts, larger `steepness` is faster), reaching 5 only at the `oldest` year.
 */
export type Curve =
  | { type: "peak"; at: number; from: number; fromRating: number; to: number; kneeAt?: number; kneeRating?: number }
  | { type: "log"; from: number; to: number }
  | { type: "log1p"; to: number }
  | { type: "linear"; from: number; to: number }
  | { type: "halving"; start: typeof LOWEST_RATING | typeof HIGHEST_RATING }
  | { type: "age"; oldest: number; offset: number; steepness: number };

export interface Item {
  name: string;

  /** One value per column, in the same order as the columns. */
  values: (number | string | null)[];

  /** When the item was last changed, in milliseconds since 1970; used by the sync script, not shown. */
  updatedAt?: number;

  /** Planned features, as short notes. Kept beside the values rather than in a column, and not used in scoring. */
  features?: string[];
}

export interface Ranking {
  id: string;
  title: string;
  columns: Column[];
  items: Item[];
  gradeCurve?: Partial<GradeCurve>;
}

/** A grade runs from 0 to this. */
export const MAX_GRADE = 100;

/** Type checks for the values in a ranking, where a cell may be a number, text or empty. */
export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isText = (value: unknown): value is string => typeof value === "string";

export const LOWEST_RATING = 1;
export const HIGHEST_RATING = 5;

/**
 * The shape of the grade curve, set per ranking in its JSON file as `gradeCurve` (any part left out uses the default):
 * - steepness: how sharply the grade falls away as the score drops. With 5.4, a score near the top barely loses anything and the grade drops faster and faster further down.
 * - bottomBend: above 1, low scores grade lower while high scores hardly change.
 * - middleLift, middleAt, middleWidth: lifts the middle of the curve by this many points, centred at this share of the score range and this wide, tapering off either side so the top and bottom stay put.
 */
export interface GradeCurve {
  steepness: number;
  bottomBend: number;
  middleLift: number;
  middleAt: number;
  middleWidth: number;
}

export const DEFAULT_GRADE_CURVE: GradeCurve = {
  steepness: 5.4,
  bottomBend: 1.75,
  middleLift: 9,
  middleAt: 0.42,
  middleWidth: 0.16,
};

/** The column holding each project's lines, and the one holding how many times bigger it is expected to grow. */
export const LINES_LABEL = "Completed Lines";
export const GROWTH_LABEL = "xLines";
