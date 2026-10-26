export interface Column {
  label: string;
  /** Short name for the table header; the full label shows on hover. */
  short?: string;
  /** Rated columns count towards the score; columns without a weight are just information. */
  weight?: number;
}

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
 * How sharply the grade falls away as the score drops. With 3.2, all 5s grade 100, all 4s grade 90, all 3s grade 68,
 * all 2s grade 34 and all 1s grade 0: it barely moves near the top, then drops faster and faster. Higher is steeper.
 */
const GRADE_STEEPNESS = 3.2;

/** Sum of rating squared times the column's weight, over the rated columns. */
export function score(columns: Column[], item: Item): number {
  return columns.reduce((total, column, index) => {
    const rating = item.values[index];

    return column.weight === undefined || typeof rating !== "number" ? total : total + rating ** 2 * column.weight;
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

/** Grade out of 100 for a score, on an exponential curve: 0 for the lowest possible score and 100 for the best. */
export function grade(scoreValue: number, columns: Column[]): number {
  const [low, high] = [minScore(columns), maxScore(columns)];
  if (high === low) return 0;

  const share = Math.max(0, (scoreValue - low) / (high - low));

  return (100 * (1 - Math.exp(-GRADE_STEEPNESS * share))) / (1 - Math.exp(-GRADE_STEEPNESS));
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
