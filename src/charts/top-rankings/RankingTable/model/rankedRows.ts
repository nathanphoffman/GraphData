import { isDimmed } from "../../maintenance/maintenance_labels";
import { rankItems } from "../../score/grade";
import type { Ranking } from "../../score/ranking_types";

/** A ranked item; the rank is null for a dimmed item, which keeps its score and grade but has no place in the numbering. */
export type RankedRow = Omit<ReturnType<typeof rankItems>[number], "rank"> & { rank: number | null };

/** Every item with its rank, best score first. Dimmed items (decommissioned or wishlist) sit where their score puts them, but only the others are numbered. */
export function rankedRows(ranking: Ranking): RankedRow[] {
  const numbered = rankItems({ ...ranking, items: ranking.items.filter((item) => !isDimmed(ranking, item)) });
  const numbers = new Map(numbered.map((rankedRow) => [rankedRow.item.name, rankedRow.rank]));

  return rankItems(ranking).map((rankedRow) => ({ ...rankedRow, rank: numbers.get(rankedRow.item.name) ?? null }));
}

/** The lowest and highest score among the numbered rows, which the score colours are spread across. */
export function scoreRange(rows: RankedRow[]): [number, number] {
  const scores = rows.filter((rankedRow) => rankedRow.rank !== null).map((rankedRow) => rankedRow.score);

  return [Math.min(...scores), Math.max(...scores)];
}
