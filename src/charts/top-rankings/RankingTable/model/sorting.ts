import type { RankedRow } from "./rankedRows";

export type SortKey = "rank" | "name" | "grade";

export interface Sort {
  key: SortKey;
  descending: boolean;
}

/** Rank and name read best first and A to Z; the grade starts with the highest. */
export const firstSort = (sortColumn: SortKey): Sort => ({ key: sortColumn, descending: sortColumn === "grade" });

/** How each sort key orders two ranked rows, smallest first. */
const COMPARE: Record<SortKey, (first: RankedRow, second: RankedRow) => number> = {
  rank: (first, second) => second.score - first.score,
  name: (first, second) => first.item.name.localeCompare(second.item.name),
  grade: (first, second) => first.grade - second.grade,
};

/** The rows whose name contains the search text, in the chosen order. */
export function matchingRows(rows: RankedRow[], search: string, sort: Sort): RankedRow[] {
  const matching = rows.filter(({ item }) => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  const compare = COMPARE[sort.key];

  return [...matching].sort((first, second) => (sort.descending ? compare(second, first) : compare(first, second)));
}
