import { InlineCell } from "./InlineCell";
import { COLD_LABEL, DECOMMISSIONED_LABEL, QUALITY_LABEL, STATUS_LABEL, WISHLIST_LABEL } from "./maintenance";
import { type Column, HIGHEST_RATING, type Item, LOWEST_RATING, effectiveRating, fractionBetween, isNumber, isText } from "./score";

/** Heat colours run from hue 0 (red) to this (green). */
const GREEN_HUE = 120;

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
export const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * GREEN_HUE)} 65% 45% / 0.35)` });

const SEASONS_LABEL = "Seasons";

type CellValue = number | string | null;

/** Takes an item and a column position, and gives back the function that saves a new value for that cell. */
export type SaveCell = (item: Item, index: number) => (value: CellValue) => Promise<void>;

/** The item's name, linking to its web address when it has one. */
export function NameCell({ item, linkIndex }: { item: Item; linkIndex: number }) {
  const link = item.values[linkIndex];

  return <td>{isText(link) && link !== "" ? <a href={link} target="_blank" rel="noreferrer">{item.name}</a> : item.name}</td>;
}

export interface CellProps {
  item: Item;
  column: Column;
  index: number;
  canEdit: boolean;
  saveCell: SaveCell;
}

/** The columns shown as a checkbox, with the words the checkbox's label ends in. */
const CHECKBOX_LABELS: Record<string, string> = { [DECOMMISSIONED_LABEL]: "decommissioned", [COLD_LABEL]: "cold", [WISHLIST_LABEL]: "on the wishlist" };

/** A plain information cell; the Decommissioned, Cold and Wishlist columns are checkboxes. */
export function InfoCell({ item, column, index, canEdit, saveCell }: CellProps) {
  if (column.label in CHECKBOX_LABELS) {
    const checked = item.values[index] === 1;

    return (
      <td>
        <input type="checkbox" checked={checked} disabled={!canEdit} aria-label={`${item.name} ${CHECKBOX_LABELS[column.label]}`} onChange={(changeEvent) => void saveCell(item, index)(changeEvent.target.checked ? 1 : 0)} />
      </td>
    );
  }

  return (
    <InlineCell column={column} itemName={item.name} value={item.values[index]} canEdit={canEdit && column.label !== QUALITY_LABEL} onSave={saveCell(item, index)}>
      {show(item.values[index])}
    </InlineCell>
  );
}

/** A rated cell: the value, coloured by its 1 to 5 rating, with that rating in brackets when the column has a curve or a best value. */
export function RatedCell({ item, column, index, canEdit, saveCell, episodic }: CellProps & { episodic: unknown }) {
  const rating = item.values[index];
  const used = isNumber(rating) ? effectiveRating(column, rating) : null;
  const colour = used === null ? undefined : heat(fractionBetween(used, LOWEST_RATING, HIGHEST_RATING));

  return (
    <InlineCell column={column} itemName={item.name} value={rating} canEdit={canEdit && column.label !== QUALITY_LABEL && column.label !== STATUS_LABEL} onSave={saveCell(item, index)} style={colour}>
      {show(rating)}
      {column.label === SEASONS_LABEL && episodic ? "*" : ""}
      {(column.best !== undefined || column.curve !== undefined) && used !== null && <small> ({Number(used.toFixed(1))})</small>}
    </InlineCell>
  );
}

