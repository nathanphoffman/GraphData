import { ageRating, halvingRating, linearRating, log1pRating, logRating, peakRating } from "./curves";
import { type Column, type Curve, HIGHEST_RATING, isNumber, LINES_LABEL, LOWEST_RATING } from "./ranking_types";

/** Raw value to a rating from 1 to 5 by the given curve. */
function applyCurve(curve: Curve, value: number): number {
  switch (curve.type) {
    case "peak":
      return peakRating(curve, value);
    case "log":
      return logRating(curve, value);
    case "linear":
      return linearRating(curve, value);
    case "log1p":
      return log1pRating(curve, value);
    case "halving":
      return halvingRating(curve, value);
    case "age":
      return ageRating(curve, value);
  }
}

/** The rating a column counts as: as given, run through its curve, or when the column has a best rating, 5 at that rating down to 1 at the furthest end. */
export function effectiveRating(column: Column, rating: number): number {
  if (column.curve !== undefined) return applyCurve(column.curve, rating);

  if (column.best === undefined) return rating;

  const furthest = Math.max(column.best - LOWEST_RATING, HIGHEST_RATING - column.best);

  return HIGHEST_RATING - ((HIGHEST_RATING - LOWEST_RATING) * Math.abs(rating - column.best)) / furthest;
}

/** A project's lines are rated twice, as they are and as they are expected to grow, and the two ratings are averaged. */
function linesRating(column: Column, lines: number, growth: unknown): number {
  const grown = isNumber(growth) ? lines * growth : lines;

  return (effectiveRating(column, lines) + effectiveRating(column, grown)) / 2;
}

/** The rating a cell counts as: the column's effective rating, with the lines column also taking its growth into account. */
export function ratingOf(column: Column, rating: number, growth: unknown): number {
  return column.label === LINES_LABEL ? linesRating(column, rating, growth) : effectiveRating(column, rating);
}
