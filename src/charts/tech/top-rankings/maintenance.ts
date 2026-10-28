import { type Ranking, isNumber } from "./score";

export const LINES_LABEL = "Completed Lines";
const FAMILIARITY_LABEL = "Familiarity";
const COMPUTED_LABEL = "Computed Quality";

/** The rated column holding each item's final quality, the average of the two above. It is worked out whenever the ranking loads. */
export const QUALITY_LABEL = "Quality";
const GROWTH_LABEL = "xLines";

/** An information column holding 1 for a project that is retired: it still saves and syncs, but sits last, greyed, and is left out of the maintenance numbers. */
export const DECOMMISSIONED_LABEL = "Decommissioned";

/** An information column holding 1 for an item that is only a wish (not owned yet): it is ranked to see if it is worth it, but greyed and left out of the numbering. */
export const WISHLIST_LABEL = "Wishlist";

/** Whether the item has a 1 in the checkbox column with this label. */
function isChecked(ranking: Ranking, item: Ranking["items"][number], label: string): boolean {
  const column = ranking.columns.findIndex((candidate) => candidate.label === label);

  return column >= 0 && item.values[column] === 1;
}

/** Whether the item is marked decommissioned in this ranking. */
export const isDecommissioned = (ranking: Ranking, item: Ranking["items"][number]): boolean => isChecked(ranking, item, DECOMMISSIONED_LABEL);

/** Whether the item is greyed out and left out of the rank numbers: decommissioned or on the wishlist. */
export const isDimmed = (ranking: Ranking, item: Ranking["items"][number]): boolean => isDecommissioned(ranking, item) || isChecked(ranking, item, WISHLIST_LABEL);

/** Lines added to every project's Completed Lines when the page shows and scores them, as the minimum scaffolding any project needs. Never saved. */
export const SCAFFOLDING_LINES = 256;

/** Percent scale, used for qualities and for the maintenance percent. */
export const PERCENT = 100;

/** The shape of the maintenance percent curve: its steepness, where it crosses its midpoint, and how it is skewed. */
const CURVE_STEEPNESS = 3.85;
const CURVE_MIDPOINT = 7.14;
const CURVE_SKEW = 0.9;

/** How many times nFactor halves its range, which is plenty to settle on the answer. */
const HALVINGS = 60;

/** Qualities are rounded to one decimal place. */
const TENTH = 10;

/** The quality that leaves the n-factor as it is; better lifts it down, worse pushes it up. */
const NEUTRAL_QUALITY = 75;

/** Taken off the combined n-Factor to get the lines a hand-written (manual) codebase would be equivalent to. */
const MANUAL_ADJUSTMENT = 0.66;

/** How much of the combined n-Factor comes from the future one. */
const FUTURE_WEIGHT = 0.75;

/**
 * The combined n-Factor as a percent, on a curve fitted by eye to these marks: 1 is 100%, 6 is 95%, 6.75 is 85%, 7 is 65%, 8 is 5% and 10 is about 0%.
 * It is a stretched S-curve: nearly flat at the top, then falling steeply between 6.5 and 8. It lands within about 4 points of each mark.
 */
export function maintenancePercent(combined: number): number {
  if (combined <= 1) return PERCENT;

  return PERCENT / (1 + Math.exp(CURVE_STEEPNESS * (combined - CURVE_MIDPOINT))) ** CURVE_SKEW;
}

export interface Maintenance {
  totalLines: number;
  nFactor: number;
  averageQuality: number;
  gradedNFactor: number;
  futureLines: number;
  futureNFactor: number;
  gradedFutureNFactor: number;
  combinedNFactor: number;
  maintenancePercent: number;
  equivalentLines: number;
  manualLines: number;
  gradedManualLines: number;
  gradedFutureManualLines: number;
}

/** The lines a hand-written codebase would be equivalent to at this n-Factor: MANUAL_ADJUSTMENT off it, raised to itself. */
function manualLinesAt(n: number): number {
  return (n - MANUAL_ADJUSTMENT) ** (n - MANUAL_ADJUSTMENT);
}

/** The n that makes n^n equal the total, found by halving a range until it is close enough. 1 for a total of 1 or less. */
export function nFactor(total: number): number {
  if (total <= 1) return 1;
  const target = Math.log(total);
  let [low, high] = [1, 2];

  while (high * Math.log(high) < target) high *= 2;

  for (let step = 0; step < HALVINGS; step++) {
    const middle = (low + high) / 2;

    if (middle * Math.log(middle) < target) low = middle;
    else high = middle;
  }

  return (low + high) / 2;
}

/** Familiarity is rated out of 5, and 1 is 0% up to 5 being 100%. */
const FAMILIARITY_STEPS = 4;

/** A familiarity rating out of 5 as a percent. */
export function familiarityPercent(rating: number): number {
  return ((rating - 1) / FAMILIARITY_STEPS) * PERCENT;
}

/** A project's quality: its familiarity (as a percent) and computed quality averaged, or whichever one it has. */
export function qualityOf(values: Ranking["items"][number]["values"], familiarity: number, computed: number): number | null {
  const [rating, quality] = [values[familiarity], values[computed]];
  const found = [isNumber(rating) ? familiarityPercent(rating) : null, quality].filter(isNumber);

  // Add up the numbers and divide by how many there are.
  return found.length ? found.reduce((runningTotal, value) => runningTotal + value, 0) / found.length : null;
}

/** The code maintenance numbers for a ranking with lines and quality columns, or null when it has neither or no lines. */
export function maintenance(ranking: Ranking): Maintenance | null {
  const lines = ranking.columns.findIndex((column) => column.label === LINES_LABEL);
  const familiarity = ranking.columns.findIndex((column) => column.label === FAMILIARITY_LABEL);
  const computed = ranking.columns.findIndex((column) => column.label === COMPUTED_LABEL);
  const growth = ranking.columns.findIndex((column) => column.label === GROWTH_LABEL);

  if (lines < 0 || (familiarity < 0 && computed < 0)) return null;

  let totalLines = 0;
  let futureLines = 0;
  let qualityLines = 0;
  let weighted = 0;

  for (const item of ranking.items) {
    if (isDecommissioned(ranking, item)) continue;

    const { values } = item;
    const [count, rating] = [values[lines], qualityOf(values, familiarity, computed)];

    if (!isNumber(count)) continue;
    totalLines += count;

    // A project with no growth number is expected to stay the size it is.
    const times = growth < 0 ? undefined : values[growth];
    futureLines += count * (isNumber(times) ? times : 1);

    if (rating === null) continue;
    qualityLines += count;
    weighted += count * rating;
  }

  if (totalLines === 0 || qualityLines === 0) return null;

  const averageQuality = weighted / qualityLines;
  const currentNFactor = nFactor(totalLines);
  const adjustment = (averageQuality - NEUTRAL_QUALITY) / PERCENT;
  const futureN = nFactor(futureLines);
  const [graded, gradedFuture] = [currentNFactor - adjustment, futureN - adjustment];
  const combined = graded * (1 - FUTURE_WEIGHT) + gradedFuture * FUTURE_WEIGHT;

  // The lines figures ignore quality, as if it were the neutral 75.
  const ungraded = currentNFactor * (1 - FUTURE_WEIGHT) + futureN * FUTURE_WEIGHT;

  return {
    totalLines,
    nFactor: currentNFactor,
    averageQuality,
    gradedNFactor: graded,
    futureLines,
    futureNFactor: futureN,
    gradedFutureNFactor: gradedFuture,
    combinedNFactor: combined,
    maintenancePercent: maintenancePercent(combined),
    equivalentLines: ungraded ** ungraded,
    manualLines: manualLinesAt(ungraded),
    gradedManualLines: manualLinesAt(graded),
    gradedFutureManualLines: manualLinesAt(gradedFuture),
  };
}

/** The ranking with each item's Quality value set to the average of its Familiarity and Computed Quality (left as it is when it has neither). */
export function withQuality(ranking: Ranking): Ranking {
  // The position of each of the three columns in the ranking, or -1 when it is missing.
  const [quality, familiarity, computed] = [QUALITY_LABEL, FAMILIARITY_LABEL, COMPUTED_LABEL].map((label) => ranking.columns.findIndex((column) => column.label === label));

  if (quality < 0 || familiarity < 0 || computed < 0) return ranking;

  // Give each item the averaged Quality, or leave it as it is when it has no data.
  const items = ranking.items.map((item) => {
    const average = qualityOf(item.values, familiarity, computed);

    return average === null ? item : { ...item, values: item.values.map((value, index) => (index === quality ? Math.round(average * TENTH) / TENTH : value)) };
  });

  return { ...ranking, items };
}

/** The ranking with SCAFFOLDING_LINES added to each item's Completed Lines, for showing and scoring only. */
export function withScaffolding(ranking: Ranking): Ranking {
  const lines = ranking.columns.findIndex((column) => column.label === LINES_LABEL);

  if (lines < 0) return ranking;

  // Copy each item with the scaffolding lines added to its Completed Lines.
  const items = ranking.items.map((item) => ({
    ...item,
    values: item.values.map((value, index) => (index === lines && isNumber(value) ? value + SCAFFOLDING_LINES : value)),
  }));

  return { ...ranking, items };
}
