import { useState } from "react";
import { callApi } from "../../../api";
import { FeaturesModal } from "./FeaturesModal";
import { InfoCell, NameCell, RatedCell, type SaveCell, heat } from "./RankingCells";
import { COLD_LABEL, DECOMMISSIONED_LABEL, LINES_LABEL, PERCENT, SCAFFOLDING_LINES, isCold, isDimmed, withQuality, withStatus } from "./maintenance";
import { type Column, type Item, type Ranking, fractionBetween, isNumber, letterGrade, rankItems } from "./score";

const PAGE_SIZE = 100;

/** A column with this label holds each item's web address: it is not shown, and the item's name links to it instead. */
const LINK_LABEL = "Link";

/** A column with this label marks the items whose Seasons count is halved: it is not shown, and those items get an asterisk after their seasons. */
export const EPISODIC_LABEL = "Episodic";
export type SortKey = "rank" | "name" | "grade";

export interface Sort {
  key: SortKey;
  descending: boolean;
}

/** Rank and name read best first and A to Z; the grade starts with the highest. */
export const firstSort = (sortColumn: SortKey): Sort => ({ key: sortColumn, descending: sortColumn === "grade" });

/** A ranked item; the rank is null for a dimmed item, which keeps its score and grade but has no place in the numbering. */
type RankedRow = Omit<ReturnType<typeof rankItems>[number], "rank"> & { rank: number | null };

interface IndexedColumn {
  column: Column;
  index: number;
}

interface TableColumns {
  linkIndex: number;
  episodicIndex: number;
  info: IndexedColumn[];
  rated: IndexedColumn[];
}

/** How each sort key orders two ranked rows, smallest first. */
const COMPARE: Record<SortKey, (first: RankedRow, second: RankedRow) => number> = {
  rank: (first, second) => second.score - first.score,
  name: (first, second) => first.item.name.localeCompare(second.item.name),
  grade: (first, second) => first.grade - second.grade,
};

/** A header cell that sorts the table by its column when clicked; a second click reverses it. */
function SortHeader({ label, sortKey, sort, onSort, title }: { label: string; sortKey: SortKey; sort: Sort; onSort: (sortColumn: SortKey) => void; title?: string }) {
  const active = sort.key === sortKey;

  return (
    // aria-sort tells screen readers the direction: ascending or descending on the sorted column, none on the rest.
    <th title={title} aria-sort={active ? (sort.descending ? "descending" : "ascending") : "none"}>
      <button type="button" className="rankings-sort" onClick={() => onSort(sortKey)}>
        {label}
        {active && (sort.descending ? " ▼" : " ▲")}
      </button>
    </th>
  );
}

/** Sort the columns into those shown as plain information and those that are rated (heaviest first); the link and episodic columns are not shown. */
function splitColumns(ranking: Ranking): TableColumns {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const hiddenLabels = [LINK_LABEL, EPISODIC_LABEL];

  return {
    linkIndex: ranking.columns.findIndex((column) => column.label === LINK_LABEL),
    episodicIndex: ranking.columns.findIndex((column) => column.label === EPISODIC_LABEL),
    info: indexed.filter(({ column }) => column.weight === undefined && !hiddenLabels.includes(column.label)),
    rated: indexed.filter(({ column }) => column.weight !== undefined).sort((first, second) => (second.column.weight ?? 0) - (first.column.weight ?? 0)),
  };
}

/** The rows whose name contains the search text, in the chosen order. */
function matchingRows(rows: RankedRow[], search: string, sort: Sort): RankedRow[] {
  const matching = rows.filter(({ item }) => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  const compare = COMPARE[sort.key];

  return [...matching].sort((first, second) => (sort.descending ? compare(second, first) : compare(first, second)));
}

/**
 * Returns a function that saves one changed value of an item, keeping the rest of its saved values (`source`).
 * Completed Lines is shown with the scaffolding added, so that comes back off before saving.
 */
function cellSaver(ranking: Ranking, source: Ranking, onSaved: () => Promise<void>): SaveCell {
  // The item and column pick the cell; the inner function runs once the new value has been typed.
  return (item, index) => async (value) => {
    const saved = source.items.find((candidate) => candidate.name === item.name) ?? item;
    const isLines = ranking.columns[index].label === LINES_LABEL && isNumber(value);

    // Copy the saved item with the one value changed; a Lines value comes back without the scaffolding lines.
    const label = ranking.columns[index].label;

    // Decommissioned and Cold exclude each other, so ticking one unticks the other.
    const rival = value === 1 ? { [DECOMMISSIONED_LABEL]: COLD_LABEL, [COLD_LABEL]: DECOMMISSIONED_LABEL }[label] : undefined;
    const rivalIndex = ranking.columns.findIndex((column) => column.label === rival);

    // Pad short value lists so the rival column can be set to 0.
    const padded = ranking.columns.map((_, valueIndex) => saved.values[valueIndex] ?? null);
    const changed = { ...saved, values: padded.map((oldValue, valueIndex) => (valueIndex === index ? (isLines ? value - SCAFFOLDING_LINES : value) : valueIndex === rivalIndex ? 0 : oldValue)) };

    // Quality and Status are worked out from the other values, so save them fresh along with the change.
    const { values } = withStatus(withQuality({ ...source, items: [changed] })).items[0];

    // Save the whole item; the server adds it or changes it by name.
    await callApi(`/api/rankings/${ranking.id}/items/${encodeURIComponent(item.name)}`, "PUT", { values });
    await onSaved();
  };
}

interface HeadProps {
  columns: TableColumns;
  showScore: boolean;
  showFeatures: boolean;
  sort: Sort;
  onSort: (sortColumn: SortKey) => void;
}

/** The header row: rank, name, information columns, score, grade, then the rated columns with their weights. */
function TableHead({ columns, showScore, showFeatures, sort, onSort }: HeadProps) {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        {columns.info.map(({ column }) => (
          <th key={column.label} title={column.label}>{column.short ?? column.label}</th>
        ))}

        {showScore && <th title="Each rating squared times its weight, added up">Score</th>}
        <SortHeader label="Grade" sortKey="grade" sort={sort} onSort={onSort} title="The score as a grade out of 100 on a curve: it eases off near the top and drops faster further down" />
        {columns.rated.map(({ column }) => (
          <th key={column.label} title={`${column.label} (weight ×${column.weight})${column.best === undefined ? "" : `, best rating ${column.best}`}${column.curve === undefined ? "" : `, shown with its 1 to 5 rating`}`}>
            {column.short ?? column.label}
            <small>×{column.weight}</small>
          </th>
        ))}
        {showFeatures && <th title="Planned features">Features</th>}

      </tr>
    </thead>
  );
}

interface RowProps {
  row: RankedRow;
  columns: TableColumns;
  showScore: boolean;
  scoreRange: [number, number];
  canEdit: boolean;
  saveCell: SaveCell;
  dimmed: boolean;
  cold: boolean;
  onFeatures?: (item: Item) => void;
}

/** One ranked item: rank, name, information, score, grade and rated cells. */
function RankingRow({ row: rankedRow, columns, showScore, scoreRange, canEdit, saveCell, dimmed, cold, onFeatures }: RowProps) {
  const { item, score, grade, rank } = rankedRow;
  const cell = { item, canEdit, saveCell };

  return (
    <tr className={dimmed ? "rankings-dimmed" : cold ? "rankings-cold" : undefined}>
      <td>{dimmed ? "" : rank}</td>
      <NameCell item={item} linkIndex={columns.linkIndex} />
      {columns.info.map(({ column, index }) => <InfoCell key={column.label} {...cell} column={column} index={index} />)}

      {showScore && <td style={heat(fractionBetween(score, scoreRange[0], scoreRange[1]))}>{Number(score.toFixed(2))}</td>}
      <td style={heat(grade / PERCENT)}>
        {grade.toFixed(1)}
        <small> ({letterGrade(grade)})</small>
      </td>
      {columns.rated.map(({ column, index }) => <RatedCell key={column.label} {...cell} column={column} index={index} episodic={item.values[columns.episodicIndex]} />)}
      {onFeatures && (
        <td>
          {canEdit ? <button type="button" className="rankings-features" title={`Edit ${item.name}'s planned features`} onClick={() => onFeatures(item)}>{item.features?.length ?? 0}</button> : (item.features?.length ?? 0)}
        </td>
      )}
    </tr>
  );
}

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
}

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. `ranking` is what is shown; `source` is the same data as saved, which edits start from. */
export function RankingTable({ ranking, source, showScore, search, sort, onSort, canEdit, onSaved, showFeatures = false }: TableProps) {
  const columns = splitColumns(ranking);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [featuresOf, setFeaturesOf] = useState<string | null>(null);

  // Dimmed items (decommissioned or wishlist) sit where their score puts them, but only the others are numbered.
  const dimmed = (item: Item) => isDimmed(ranking, item);
  const numbers = new Map(rankItems({ ...ranking, items: ranking.items.filter((item) => !dimmed(item)) }).map((rankedRow) => [rankedRow.item.name, rankedRow.rank]));
  const all: RankedRow[] = rankItems(ranking).map((rankedRow) => ({ ...rankedRow, rank: numbers.get(rankedRow.item.name) ?? null }));
  const matching = matchingRows(all, search, sort);
  const scores = all.filter((rankedRow) => rankedRow.rank !== null).map((rankedRow) => rankedRow.score);
  const context = { columns, showScore, scoreRange: [Math.min(...scores), Math.max(...scores)] as [number, number], canEdit, saveCell: cellSaver(ranking, source, onSaved) };

  return (
    <>
      <table>
        <TableHead columns={columns} showScore={showScore} showFeatures={showFeatures} sort={sort} onSort={onSort} />
        <tbody>
          {matching.slice(0, shown).map((rankedRow) => <RankingRow key={rankedRow.item.name} row={rankedRow} {...context} dimmed={dimmed(rankedRow.item)} cold={isCold(ranking, rankedRow.item)} onFeatures={showFeatures ? (item) => setFeaturesOf(item.name) : undefined} />)}
        </tbody>
      </table>
      {matching.length > shown && (
        <button type="button" className="rankings-more" onClick={() => setShown(shown + PAGE_SIZE)}>
          Show next {Math.min(PAGE_SIZE, matching.length - shown)} ({shown} of {matching.length} shown)
        </button>
      )}
      {/* The item is looked up by name so the pop-up always shows the latest saved list. */}
      {canEdit && featuresOf !== null && ranking.items.find((item) => item.name === featuresOf) && (
        <FeaturesModal key={featuresOf} rankingId={ranking.id} item={ranking.items.find((item) => item.name === featuresOf) as Item} onClose={() => setFeaturesOf(null)} onSaved={onSaved} />
      )}
    </>
  );
}
