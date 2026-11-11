import { isNumber, LINES_LABEL, type Ranking } from "../score/ranking_types";
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
