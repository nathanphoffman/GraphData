import { isNumber, type Ranking } from "../score/ranking_types";
import { COMPUTED_LABEL, FAMILIARITY_LABEL, QUALITY_LABEL } from "./maintenance_labels";

/** Percent scale, used for qualities. */
export const PERCENT = 100;

/** Qualities are rounded to one decimal place. */
const TENTH = 10;

/** Familiarity is rated out of 5, and 1 is 0% up to 5 being 100%. */
const FAMILIARITY_STEPS = 4;

/** A familiarity rating out of 5 as a percent. */
function familiarityPercent(rating: number): number {
  return ((rating - 1) / FAMILIARITY_STEPS) * PERCENT;
}

/** A project's quality: its familiarity (as a percent) and computed quality averaged, or whichever one it has. */
export function qualityOf(
  values: Ranking["items"][number]["values"],
  familiarity: number,
  computed: number,
): number | null {
  const [rating, quality] = [values[familiarity], values[computed]];
  const found = [isNumber(rating) ? familiarityPercent(rating) : null, quality].filter(isNumber);

  // Add up the numbers and divide by how many there are.
  return found.length ? found.reduce((runningTotal, value) => runningTotal + value, 0) / found.length : null;
}

/** The ranking with each item's Quality value set to the average of its Familiarity and Computed Quality (left as it is when it has neither). */
export function withQuality(ranking: Ranking): Ranking {
  // The position of each of the three columns in the ranking, or -1 when it is missing.
  const [quality, familiarity, computed] = [QUALITY_LABEL, FAMILIARITY_LABEL, COMPUTED_LABEL].map((label) =>
    ranking.columns.findIndex((column) => column.label === label),
  );

  if (quality < 0 || familiarity < 0 || computed < 0) return ranking;

  // Give each item the averaged Quality, or leave it as it is when it has no data.
  const items = ranking.items.map((item) => {
    const average = qualityOf(item.values, familiarity, computed);

    return average === null
      ? item
      : {
          ...item,
          values: item.values.map((value, index) => (index === quality ? Math.round(average * TENTH) / TENTH : value)),
        };
  });

  return { ...ranking, items };
}
