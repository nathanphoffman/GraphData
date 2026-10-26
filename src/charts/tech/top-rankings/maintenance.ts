import type { Ranking } from "./score";

export const LINES_LABEL = "Completed Lines";
const FAMILIARITY_LABEL = "Familiarity";
const COMPUTED_LABEL = "Computed Quality";

/** The rated column holding each item's final quality, the average of the two above. It is worked out whenever the ranking loads. */
export const QUALITY_LABEL = "Quality";
const GROWTH_LABEL = "xLines";

/** Lines added to every project's Completed Lines when the page shows and scores them, as the minimum scaffolding any project needs. Never saved. */
export const SCAFFOLDING_LINES = 256;

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
  if (combined <= 1) return 100;
  return 100 / (1 + Math.exp(3.85 * (combined - 7.14))) ** 0.9;
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
}

/** The n that makes n^n equal the total, found by halving a range until it is close enough. 1 for a total of 1 or less. */
export function nFactor(total: number): number {
  if (total <= 1) return 1;
  const target = Math.log(total);
  let [low, high] = [1, 2];
  while (high * Math.log(high) < target) high *= 2;
  for (let step = 0; step < 60; step++) {
    const middle = (low + high) / 2;
    if (middle * Math.log(middle) < target) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

/** A project's quality: its familiarity and computed quality averaged, or whichever one it has. */
export function qualityOf(values: Ranking["items"][number]["values"], familiarity: number, computed: number): number | null {
  const found = [values[familiarity], values[computed]].filter((value): value is number => typeof value === "number");
  return found.length ? found.reduce((sum, value) => sum + value, 0) / found.length : null;
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
  for (const { values } of ranking.items) {
    const [count, rating] = [values[lines], qualityOf(values, familiarity, computed)];
    if (typeof count !== "number") continue;
    totalLines += count;
    // A project with no growth number is expected to stay the size it is.
    const times = growth < 0 ? undefined : values[growth];
    futureLines += count * (typeof times === "number" ? times : 1);
    if (rating === null) continue;
    qualityLines += count;
    weighted += count * rating;
  }
  if (totalLines === 0 || qualityLines === 0) return null;

  const averageQuality = weighted / qualityLines;
  const n = nFactor(totalLines);
  const adjustment = (averageQuality - NEUTRAL_QUALITY) / 100;
  const futureN = nFactor(futureLines);
  const [graded, gradedFuture] = [n - adjustment, futureN - adjustment];
  const combined = graded * (1 - FUTURE_WEIGHT) + gradedFuture * FUTURE_WEIGHT;
  // The lines figures ignore quality, as if it were the neutral 75.
  const ungraded = n * (1 - FUTURE_WEIGHT) + futureN * FUTURE_WEIGHT;
  return {
    totalLines,
    nFactor: n,
    averageQuality,
    gradedNFactor: graded,
    futureLines,
    futureNFactor: futureN,
    gradedFutureNFactor: gradedFuture,
    combinedNFactor: combined,
    maintenancePercent: maintenancePercent(combined),
    equivalentLines: ungraded ** ungraded,
    manualLines: (ungraded - MANUAL_ADJUSTMENT) ** (ungraded - MANUAL_ADJUSTMENT),
  };
}

/** The ranking with each item's Quality value set to the average of its Familiarity and Computed Quality (left as it is when it has neither). */
export function withQuality(ranking: Ranking): Ranking {
  const [quality, familiarity, computed] = [QUALITY_LABEL, FAMILIARITY_LABEL, COMPUTED_LABEL].map((label) => ranking.columns.findIndex((column) => column.label === label));
  if (quality < 0 || familiarity < 0 || computed < 0) return ranking;

  const items = ranking.items.map((item) => {
    const average = qualityOf(item.values, familiarity, computed);

    return average === null ? item : { ...item, values: item.values.map((value, index) => (index === quality ? Math.round(average * 10) / 10 : value)) };
  });

  return { ...ranking, items };
}

/** The ranking with SCAFFOLDING_LINES added to each item's Completed Lines, for showing and scoring only. */
export function withScaffolding(ranking: Ranking): Ranking {
  const lines = ranking.columns.findIndex((column) => column.label === LINES_LABEL);
  if (lines < 0) return ranking;

  const items = ranking.items.map((item) => ({
    ...item,
    values: item.values.map((value, index) => (index === lines && typeof value === "number" ? value + SCAFFOLDING_LINES : value)),
  }));

  return { ...ranking, items };
}
