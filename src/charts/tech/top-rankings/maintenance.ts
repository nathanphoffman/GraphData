import { type Ranking, isNumber } from "./score";

export const LINES_LABEL = "Completed Lines";
const FAMILIARITY_LABEL = "Familiarity";
const COMPUTED_LABEL = "Computed Quality";

/** The rated column holding each item's final quality, the average of the two above. It is worked out whenever the ranking loads. */
export const QUALITY_LABEL = "Quality";
const GROWTH_LABEL = "xLines";

/** An information column holding 1 for a project that is retired: it still saves and syncs, but sits last and greyed, and counts in the n-factors at only DECOMMISSIONED_SHARE of its lines. */
export const DECOMMISSIONED_LABEL = "Decommissioned";

/** How much of a decommissioned project's lines count towards the n-factors, and how much weight its quality has. */
const DECOMMISSIONED_SHARE = 1 / 6;

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

/** Percent scale, used for qualities. */
export const PERCENT = 100;

/** How much AI use adds to the n-Factor a developer can hold together, by default. */
export const DEFAULT_AI_USE = 0.75;

/** How many times nFactor halves its range, which is plenty to settle on the answer. */
const HALVINGS = 60;

/** Qualities are rounded to one decimal place. */
const TENTH = 10;

/** The quality that leaves the n-factor as it is; better lifts it down, worse pushes it up. */
const NEUTRAL_QUALITY = 75;

/** How much of the combined n-Factor comes from the future one. */
export const FUTURE_WEIGHT = 0.75;

/** One n-factor with the lines behind it; the lines of decommissioned projects are counted at DECOMMISSIONED_SHARE. */
export interface NFactorResult {
  /** The n-Factor with the quality adjustment taken off. */
  graded: number;

  /** The lines the graded n-Factor stands for (n^n), and the same with the extent of AI use taken off first. */
  equivalentLines: number;
  manualLines: number;

  /** The decommissioned projects' lines at their full size (before DECOMMISSIONED_SHARE). */
  decommissionedLines: number;
}

export interface Maintenance {
  averageQuality: number;
  current: NFactorResult;
  future: NFactorResult;
  projected: NFactorResult;
}

/** The lines a hand-written codebase would be equivalent to at this n-Factor: aiUse off it, raised to itself. */
function manualLinesAt(n: number, aiUse: number): number {
  return (n - aiUse) ** (n - aiUse);
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

/** An n-Factor result for these (decommissioned-weighted) lines and the already adjusted n. */
function resultFor(graded: number, decommissionedLines: number, aiUse: number): NFactorResult {
  return { graded, equivalentLines: graded ** graded, manualLines: manualLinesAt(graded, aiUse), decommissionedLines };
}

/** The current, future and projected n-factors for a ranking with lines and quality columns, or null when it has neither or no lines. A qualityOverride replaces the average quality worked out from the projects. */
export function maintenance(ranking: Ranking, aiUse: number, qualityOverride?: number): Maintenance | null {
  const lines = ranking.columns.findIndex((column) => column.label === LINES_LABEL);
  const familiarity = ranking.columns.findIndex((column) => column.label === FAMILIARITY_LABEL);
  const computed = ranking.columns.findIndex((column) => column.label === COMPUTED_LABEL);
  const growth = ranking.columns.findIndex((column) => column.label === GROWTH_LABEL);

  if (lines < 0 || (familiarity < 0 && computed < 0)) return null;

  let totalLines = 0;
  let futureLines = 0;
  let [decomLines, futureDecomLines] = [0, 0];
  let qualityLines = 0;
  let weighted = 0;

  for (const item of ranking.items) {
    const { values } = item;
    const [rawCount, rating] = [values[lines], qualityOf(values, familiarity, computed)];

    if (!isNumber(rawCount)) continue;
    const decommissioned = isDecommissioned(ranking, item);
    const count = decommissioned ? rawCount * DECOMMISSIONED_SHARE : rawCount;
    totalLines += count;

    // A project with no growth number is expected to stay the size it is.
    const times = growth < 0 ? undefined : values[growth];
    const grown = isNumber(times) ? times : 1;
    futureLines += count * grown;

    if (decommissioned) {
      decomLines += rawCount;
      futureDecomLines += rawCount * grown;
    }

    if (rating === null) continue;
    qualityLines += count;
    weighted += count * rating;
  }

  if (totalLines === 0 || qualityLines === 0) return null;

  const averageQuality = qualityOverride ?? weighted / qualityLines;
  const adjustment = (averageQuality - NEUTRAL_QUALITY) / PERCENT;
  const [graded, gradedFuture] = [nFactor(totalLines) - adjustment, nFactor(futureLines) - adjustment];
  const projected = graded * (1 - FUTURE_WEIGHT) + gradedFuture * FUTURE_WEIGHT;

  return {
    averageQuality,
    current: resultFor(graded, decomLines, aiUse),
    future: resultFor(gradedFuture, futureDecomLines, aiUse),
    projected: resultFor(projected, decomLines * (1 - FUTURE_WEIGHT) + futureDecomLines * FUTURE_WEIGHT, aiUse),
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

/** The rated column holding each item's status out of 5, worked out from its Decommissioned checkbox whenever the ranking loads or an item is saved. */
export const STATUS_LABEL = "Status";

/** The status rating of an active and a decommissioned project. */
const ACTIVE_STATUS = 5;
const DECOMMISSIONED_STATUS = 1;

/** The ranking with each item's Status set from its Decommissioned checkbox (left as it is when the ranking has no Status column). */
export function withStatus(ranking: Ranking): Ranking {
  const status = ranking.columns.findIndex((column) => column.label === STATUS_LABEL);

  if (status < 0) return ranking;

  // Give each item its status, padding short value lists so the Status lands in the right column.
  const items = ranking.items.map((item) => {
    const rating = isDecommissioned(ranking, item) ? DECOMMISSIONED_STATUS : ACTIVE_STATUS;
    const values = ranking.columns.map((_, index) => (index === status ? rating : (item.values[index] ?? null)));

    return { ...item, values };
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
