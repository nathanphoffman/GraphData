import type { Ranking } from "../score/ranking_types";

export const FAMILIARITY_LABEL = "Familiarity";
export const COMPUTED_LABEL = "Computed Quality";

/** The rated column holding each item's final quality, the average of the two above. It is worked out whenever the ranking loads. */
export const QUALITY_LABEL = "Quality";

/** The information column holding each project's lines per language, like "Rust 1200, TypeScript 300". The line count script writes it. */
export const TECH_LINES_LABEL = "Tech Lines";

/** An information column holding 1 for a project that is retired: it still saves and syncs, but sits last and greyed, and counts in the n-factors at only DECOMMISSIONED_SHARE of its lines. */
export const DECOMMISSIONED_LABEL = "Decommissioned";

/** How much of a decommissioned project's lines count towards the n-factors, and how much weight its quality has. */
export const DECOMMISSIONED_SHARE = 1 / 6;

/** An information column holding 1 for an item that is only a wish (not owned yet): it is ranked to see if it is worth it, but greyed and left out of the numbering. */
export const WISHLIST_LABEL = "Wishlist";

/** The rated column holding each item's status out of 5, worked out from its Decommissioned checkbox whenever the ranking loads or an item is saved. */
export const STATUS_LABEL = "Status";

/** Whether the item has a 1 in the checkbox column with this label. */
function isChecked(ranking: Ranking, item: Ranking["items"][number], label: string): boolean {
  const column = ranking.columns.findIndex((candidate) => candidate.label === label);

  return column >= 0 && item.values[column] === 1;
}

/** Whether the item is marked decommissioned in this ranking. */
export const isDecommissioned = (ranking: Ranking, item: Ranking["items"][number]): boolean =>
  isChecked(ranking, item, DECOMMISSIONED_LABEL);

/** Whether the item is greyed out and left out of the rank numbers: decommissioned or on the wishlist. */
export const isDimmed = (ranking: Ranking, item: Ranking["items"][number]): boolean =>
  isDecommissioned(ranking, item) || isChecked(ranking, item, WISHLIST_LABEL);
