import { useState } from "react";
import { callApi } from "../../../api";
import { InlineCell } from "./InlineCell";
import { LINES_LABEL, PERCENT, QUALITY_LABEL, SCAFFOLDING_LINES, withQuality } from "./maintenance";
import { type Column, HIGHEST_RATING, type Item, LOWEST_RATING, type Ranking, effectiveRating, fractionBetween, isNumber, isText, letterGrade, rankItems } from "./score";

/** Heat colours run from hue 0 (red) to this (green). */
const GREEN_HUE = 120;

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
export const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * GREEN_HUE)} 65% 45% / 0.35)` });

const PAGE_SIZE = 100;

/** A column with this label holds each item's web address: it is not shown, and the item's name links to it instead. */
const LINK_LABEL = "Link";

/** A column with this label marks the items whose Seasons count is halved: it is not shown, and those items get an asterisk after their seasons. */
export const EPISODIC_LABEL = "Episodic";
const SEASONS_LABEL = "Seasons";

export type SortKey = "rank" | "name" | "grade";

export interface Sort {
  key: SortKey;
  descending: boolean;
}

/** Rank and name read best first and A to Z; the grade starts with the highest. */
export const firstSort = (sortColumn: SortKey): Sort => ({ key: sortColumn, descending: sortColumn === "grade" });

type RankedRow = ReturnType<typeof rankItems>[number];
type CellValue = number | string | null;
/** Takes an item and a column position, and gives back the function that saves a new value for that cell. */
type SaveCell = (item: Item, index: number) => (value: CellValue) => Promise<void>;

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
  rank: (first, second) => first.rank - second.rank,
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
    const changed = { ...saved, values: saved.values.map((oldValue, valueIndex) => (valueIndex === index ? (isLines ? value - SCAFFOLDING_LINES : value) : oldValue)) };

    // Quality is worked out from the other two, so save it fresh along with the change.
    const { values } = withQuality({ ...source, items: [changed] }).items[0];

    // Save the whole item; the server adds it or changes it by name.
    await callApi(`/api/rankings/${ranking.id}/items/${encodeURIComponent(item.name)}`, "PUT", { values });
    await onSaved();
  };
}

interface HeadProps {
  columns: TableColumns;
  showScore: boolean;
  sort: Sort;
  onSort: (sortColumn: SortKey) => void;
}

/** The header row: rank, name, information columns, score, grade, then the rated columns with their weights. */
function TableHead({ columns, showScore, sort, onSort }: HeadProps) {
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
      </tr>
    </thead>
  );
}

/** The item's name, linking to its web address when it has one. */
function NameCell({ item, linkIndex }: { item: Item; linkIndex: number }) {
  const link = item.values[linkIndex];

  return <td>{isText(link) && link !== "" ? <a href={link} target="_blank" rel="noreferrer">{item.name}</a> : item.name}</td>;
}

interface CellProps {
  item: Item;
  column: Column;
  index: number;
  canEdit: boolean;
  saveCell: SaveCell;
}

/** A plain information cell. */
function InfoCell({ item, column, index, canEdit, saveCell }: CellProps) {
  return (
    <InlineCell column={column} itemName={item.name} value={item.values[index]} canEdit={canEdit && column.label !== QUALITY_LABEL} onSave={saveCell(item, index)}>
      {show(item.values[index])}
    </InlineCell>
  );
}

/** A rated cell: the value, coloured by its 1 to 5 rating, with that rating in brackets when the column has a curve or a best value. */
function RatedCell({ item, column, index, canEdit, saveCell, episodic }: CellProps & { episodic: unknown }) {
  const rating = item.values[index];
  const used = isNumber(rating) ? effectiveRating(column, rating) : null;
  const colour = used === null ? undefined : heat(fractionBetween(used, LOWEST_RATING, HIGHEST_RATING));

  return (
    <InlineCell column={column} itemName={item.name} value={rating} canEdit={canEdit && column.label !== QUALITY_LABEL} onSave={saveCell(item, index)} style={colour}>
      {show(rating)}
      {column.label === SEASONS_LABEL && episodic ? "*" : ""}
      {(column.best !== undefined || column.curve !== undefined) && used !== null && <small> ({Number(used.toFixed(1))})</small>}
    </InlineCell>
  );
}

interface RowProps {
  row: RankedRow;
  columns: TableColumns;
  showScore: boolean;
  scoreRange: [number, number];
  canEdit: boolean;
  saveCell: SaveCell;
}

/** One ranked item: rank, name, information, score, grade and rated cells. */
function RankingRow({ row: rankedRow, columns, showScore, scoreRange, canEdit, saveCell }: RowProps) {
  const { item, score, grade, rank } = rankedRow;
  const cell = { item, canEdit, saveCell };

  return (
    <tr>
      <td>{rank}</td>
      <NameCell item={item} linkIndex={columns.linkIndex} />
      {columns.info.map(({ column, index }) => <InfoCell key={column.label} {...cell} column={column} index={index} />)}

      {showScore && <td style={heat(fractionBetween(score, scoreRange[0], scoreRange[1]))}>{Number(score.toFixed(2))}</td>}
      <td style={heat(grade / PERCENT)}>
        {grade.toFixed(1)}
        <small> ({letterGrade(grade)})</small>
      </td>
      {columns.rated.map(({ column, index }) => <RatedCell key={column.label} {...cell} column={column} index={index} episodic={item.values[columns.episodicIndex]} />)}
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
}

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. `ranking` is what is shown; `source` is the same data as saved, which edits start from. */
export function RankingTable({ ranking, source, showScore, search, sort, onSort, canEdit, onSaved }: TableProps) {
  const columns = splitColumns(ranking);
  const [shown, setShown] = useState(PAGE_SIZE);
  const rows = rankItems(ranking);
  const matching = matchingRows(rows, search, sort);
  const scores = rows.map((rankedRow) => rankedRow.score);
  const context = { columns, showScore, scoreRange: [Math.min(...scores), Math.max(...scores)] as [number, number], canEdit, saveCell: cellSaver(ranking, source, onSaved) };

  return (
    <>
      <table>
        <TableHead columns={columns} showScore={showScore} sort={sort} onSort={onSort} />
        <tbody>
          {matching.slice(0, shown).map((rankedRow) => <RankingRow key={rankedRow.item.name} row={rankedRow} {...context} />)}
        </tbody>
      </table>
      {matching.length > shown && (
        <button type="button" className="rankings-more" onClick={() => setShown(shown + PAGE_SIZE)}>
          Show next {Math.min(PAGE_SIZE, matching.length - shown)} ({shown} of {matching.length} shown)
        </button>
      )}
    </>
  );
}
