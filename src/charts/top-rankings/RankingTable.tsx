import { useState } from "react";
import { callApi } from "../../api";
import { dnContributions } from "./dnContribution";
import { FeaturesModal } from "./FeaturesModal";
import { isDimmed } from "./maintenance/maintenance_labels";
import { cellSaver } from "./RankingTable/model/cellSaver";
import { splitColumns } from "./RankingTable/model/columns";
import { rankedRows, scoreRange } from "./RankingTable/model/rankedRows";
import { matchingRows, type Sort, type SortKey } from "./RankingTable/model/sorting";
import { RankingRow } from "./RankingTable/parts/RankingRow";
import { TableHead } from "./RankingTable/parts/TableHead";
import type { Ranking } from "./score/ranking_types";

const PAGE_SIZE = 100;

interface TableProps {
  ranking: Ranking;
  source: Ranking;
  showScore: boolean;
  search: string;
  sort: Sort;
  onSort: (sortColumn: SortKey) => void;
  canEdit: boolean;
  onSaved: () => Promise<void>;

  /** Adds a Features column with each item's number of planned features, which opens a pop-up to edit them when `canEdit`. */
  showFeatures?: boolean;

  /** Shows a colored square per language before each name (sized by the language's share of the project), using these colors. */
  languageColors?: Map<string, string>;
}

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. `ranking` is what is shown; `source` is the same data as saved, which edits start from. */
export function RankingTable({
  ranking,
  source,
  showScore,
  search,
  sort,
  onSort,
  canEdit,
  onSaved,
  showFeatures = false,
  languageColors,
}: TableProps) {
  const columns = splitColumns(ranking);
  const contributions = dnContributions(ranking);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [featuresOf, setFeaturesOf] = useState<string | null>(null);
  const all = rankedRows(ranking);
  const matching = matchingRows(all, search, sort);
  const context = { columns, showScore, scoreRange: scoreRange(all), canEdit, saveCell: cellSaver(ranking, source, onSaved) };

  // The item is looked up by name so the pop-up always shows the latest saved list.
  const featuresItem = featuresOf === null ? undefined : ranking.items.find((item) => item.name === featuresOf);

  // Dragging a rated header onto another saves the new weight order.
  const reorder = (order: string[]) => {
    callApi(`/api/rankings/${ranking.id}/weights`, "PUT", { order }).then(onSaved);
  };

  return (
    <>
      <table>
        <TableHead
          columns={columns}
          showScore={showScore}
          showFeatures={showFeatures}
          sort={sort}
          onSort={onSort}
          onReorder={canEdit ? reorder : undefined}
        />
        <tbody>
          {matching.slice(0, shown).map((rankedRow) => (
            <RankingRow
              key={rankedRow.item.name}
              row={rankedRow}
              {...context}
              dimmed={isDimmed(ranking, rankedRow.item)}
              dn={contributions.get(rankedRow.item.name)}
              languageColors={languageColors}
              onFeatures={showFeatures ? (item) => setFeaturesOf(item.name) : undefined}
            />
          ))}
        </tbody>
      </table>
      {matching.length > shown && (
        <button type="button" className="rankings-more" onClick={() => setShown(shown + PAGE_SIZE)}>
          Show next {Math.min(PAGE_SIZE, matching.length - shown)} ({shown} of {matching.length} shown)
        </button>
      )}
      {canEdit && featuresItem && (
        <FeaturesModal
          key={featuresOf}
          rankingId={ranking.id}
          item={featuresItem}
          onClose={() => setFeaturesOf(null)}
          onSaved={onSaved}
        />
      )}
    </>
  );
}
