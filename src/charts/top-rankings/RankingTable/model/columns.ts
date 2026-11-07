import { TECH_LINES_LABEL } from "../../maintenance";
import { type Column, GROWTH_LABEL, type Ranking } from "../../score";

/** A column with this label holds each item's web address: it is not shown, and the item's name links to it instead. */
const LINK_LABEL = "Link";

/** A column with this label marks the items whose Seasons count is halved: it is not shown, and those items get an asterisk after their seasons. */
export const EPISODIC_LABEL = "Episodic";

interface IndexedColumn {
  column: Column;
  index: number;
}

export interface TableColumns {
  linkIndex: number;
  episodicIndex: number;
  techIndex: number;
  growthIndex: number;
  info: IndexedColumn[];
  rated: IndexedColumn[];
}

/** Sort the columns into those shown as plain information and those that are rated (heaviest first); the link and episodic columns are not shown. */
export function splitColumns(ranking: Ranking): TableColumns {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const hiddenLabels = [LINK_LABEL, EPISODIC_LABEL, TECH_LINES_LABEL];

  return {
    linkIndex: ranking.columns.findIndex((column) => column.label === LINK_LABEL),
    episodicIndex: ranking.columns.findIndex((column) => column.label === EPISODIC_LABEL),
    techIndex: ranking.columns.findIndex((column) => column.label === TECH_LINES_LABEL),
    growthIndex: ranking.columns.findIndex((column) => column.label === GROWTH_LABEL),
    info: indexed.filter(({ column }) => column.weight === undefined && !hiddenLabels.includes(column.label)),
    rated: indexed
      .filter(({ column }) => column.weight !== undefined)
      .sort((first, second) => (second.column.weight ?? 0) - (first.column.weight ?? 0)),
  };
}
