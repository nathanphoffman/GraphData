import { type Column, GROWTH_LABEL, HIGHEST_RATING, type Item, isNumber, LOWEST_RATING } from "./ranking_types";
import { ratingOf } from "./rating";

/** Sum of rating squared times the column's weight, over the rated columns. */
export function score(columns: Column[], item: Item): number {
  const growth = item.values[columns.findIndex((column) => column.label === GROWTH_LABEL)];

  // Add up each rated column's squared rating times its weight, skipping missing values.
  return columns.reduce((total, column, index) => {
    const rating = item.values[index];

    return column.weight === undefined || !isNumber(rating)
      ? total
      : total + ratingOf(column, rating, growth) ** 2 * column.weight;
  }, 0);
}

/** The score if every rated column got this rating. */
function scoreOfAll(columns: Column[], rating: number): number {
  // Add up every rated column's weight, each times the same squared rating.
  return columns.reduce((total, column) => total + (column.weight ?? 0) * rating ** 2, 0);
}

/** The best possible score: every rated column rated the highest. */
export const maxScore = (columns: Column[]) => scoreOfAll(columns, HIGHEST_RATING);

/** The lowest score a real item gets: every rated column rated the lowest. */
export const minScore = (columns: Column[]) => scoreOfAll(columns, LOWEST_RATING);
