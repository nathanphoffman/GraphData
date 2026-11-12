import { GROWTH_LABEL, isNumber, LINES_LABEL, type Ranking } from "../score/ranking_types";
import { isDecommissioned, STATUS_LABEL } from "./maintenance_labels";

/** Lines added to every project's Completed Lines when the page shows and scores them, as the minimum scaffolding any project needs. Never saved. */
export const SCAFFOLDING_LINES = 256;

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

/** The most lines any project is expected to reach: its Completed Lines times its xLines (1 when it has none). 0 when no project has lines. */
function highestProjectedLines(ranking: Ranking, lines: number): number {
  const growth = ranking.columns.findIndex((column) => column.label === GROWTH_LABEL);

  // Work out each project's expected lines, leaving out the ones with no line count.
  const projected = ranking.items.map((item) => {
    const [count, times] = [item.values[lines], item.values[growth]];

    return isNumber(count) ? count * (isNumber(times) ? times : 1) : 0;
  });

  return Math.max(0, ...projected);
}

/** The line counts of the projects that have one. */
function lineCounts(ranking: Ranking, lines: number): number[] {
  return ranking.items.map((item) => item.values[lines]).filter(isNumber);
}

/**
 * The ranking with its Completed Lines rated on three points: 1 at the fewest lines any project has, 3 at the average, and 5 at the most any project is expected to reach.
 * Left as it is when the ranking has no Completed Lines column, or the three points do not rise (so the curve would divide by zero).
 */
export function withLinesCurve(ranking: Ranking): Ranking {
  const lines = ranking.columns.findIndex((column) => column.label === LINES_LABEL);
  const counts = lines < 0 ? [] : lineCounts(ranking, lines);
  const [low, high] = [Math.min(...counts), lines < 0 ? 0 : highestProjectedLines(ranking, lines)];
  const middle = counts.reduce((total, count) => total + count, 0) / counts.length;

  if (!(low < middle && middle < high)) return ranking;

  const curve = { type: "anchored", low, middle, high } as const;
  const columns = ranking.columns.map((column, index) => (index === lines ? { ...column, curve } : column));

  return { ...ranking, columns };
}
