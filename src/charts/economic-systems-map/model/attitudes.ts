import type { Cell, Combo, EconomicSystemsData } from "./types";

/** A system or blend, and how far it sits from the selection. */
export interface Candidate {
  combo: boolean;
  name: string;
  names: string[];

  /** The selection itself (distance 0), which is listed but not linked. */
  self: boolean;
  distance: number;
}

interface AttitudeGroup {
  label: string;
  color: string;
  items: Candidate[];
}

type Comparator = (first: Candidate, second: Candidate) => number;

const nearestFirst: Comparator = (first, second) => first.distance - second.distance;
const farthestFirst: Comparator = (first, second) => second.distance - first.distance;

/** Orthogonal distance bands from the center of the selection: under 1 is loved, 1 to 1.5 is indifferent, 2 is disliked, over 2 is hated. */
const BANDS: { label: string; color: string; contains: (distance: number) => boolean; sort?: Comparator }[] = [
  { label: "Likely Loves", color: "#2e7d32", contains: (distance) => distance < 1, sort: nearestFirst },
  {
    label: "Likely Indifferent or Likes",
    color: "#73811e",
    contains: (distance) => distance >= 1 && distance <= 1.5,
    sort: nearestFirst,
  },
  { label: "Likely Indifferent or Dislikes", color: "#e65100", contains: (distance) => distance > 1.5 && distance <= 2 },
  { label: "Likely Hates", color: "#c62828", contains: (distance) => distance > 2, sort: farthestFirst },
];

/** Average grid position of some cells: the cell itself, the middle of a line, or the middle of a corner. */
function center(cells: Cell[]) {
  return {
    col: cells.reduce((sum, cell) => sum + cell.col, 0) / cells.length,
    row: cells.reduce((sum, cell) => sum + cell.row, 0) / cells.length,
  };
}

/** Every system and every blend, with its distance from the center of the selection. */
function candidatesFor(model: EconomicSystemsData, combos: Combo[], selectedCells: Cell[]): Candidate[] {
  const from = center(selectedCells);

  const sameCells = (names: string[]) =>
    names.length === selectedCells.length && selectedCells.every((cell) => names.includes(cell.name));

  return [
    ...model.cells.map((cell) => ({ combo: false, name: cell.name, names: [cell.name], cells: [cell] })),
    ...combos.map((combo) => ({
      combo: true,
      name: combo.name,
      names: combo.cells,
      cells: model.cells.filter((cell) => combo.cells.includes(cell.name)),
    })),
  ].map((candidate) => {
    const spot = center(candidate.cells);

    return {
      combo: candidate.combo,
      name: candidate.name,
      names: candidate.names,
      self: sameCells(candidate.names),
      distance: Math.abs(spot.col - from.col) + Math.abs(spot.row - from.row),
    };
  });
}

/** Systems and blends grouped by how much supporters of the selection are likely to like them. */
export function attitudes(model: EconomicSystemsData, combos: Combo[], selectedCells: Cell[]): AttitudeGroup[] {
  const candidates = candidatesFor(model, combos, selectedCells);

  return BANDS.map(({ label, color, contains, sort }) => {
    const items = candidates.filter((candidate) => contains(candidate.distance));

    return { label, color, items: sort ? items.sort(sort) : items };
  });
}
