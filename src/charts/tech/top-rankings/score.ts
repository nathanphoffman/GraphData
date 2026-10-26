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

/** Sum of rating squared times the column's weight, over the rated columns. */
export function score(columns: Column[], item: Item): number {
  return columns.reduce((total, column, index) => {
    const rating = item.values[index];

    return column.weight === undefined || typeof rating !== "number" ? total : total + rating ** 2 * column.weight;
  }, 0);
}

/** Items best score first, each with its rank; items with the same score share a rank. */
export function rankItems(ranking: Ranking) {
  const scored = ranking.items.map((item) => ({ item, score: score(ranking.columns, item) })).sort((a, b) => b.score - a.score);

  return scored.map((entry) => ({ ...entry, rank: scored.findIndex((other) => other.score === entry.score) + 1 }));
}

/** Where a value sits between a low and a high, from 0 to 1; 0.5 when they are the same. */
export function fractionBetween(value: number, low: number, high: number): number {
  if (high === low) return 0.5;

  return Math.min(1, Math.max(0, (value - low) / (high - low)));
}
