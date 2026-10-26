/** Pure layout helpers: unit-to-pixel conversion and greedy label placement. */
import {
  CELL_CENTER, CELL_H, CELL_NAME_BOX, CELL_W, DIAGONAL_SHARE, DOT_RADIUS, FIGURE_LABEL, GRID_COLUMNS, GRID_EDGE_MARGIN, GRID_LEFT, GRID_ROWS, GRID_TOP,
  HEADER_COL_W, HEADER_ROW_H, LABEL_GAP, LABEL_RING_EXTRAS, OFF_GRID_COST,
} from "./style";
import type { Box, EconomicSystemsData, Figure, PlacedLabel } from "./types";

export const GRID_X0 = GRID_LEFT + HEADER_COL_W;
export const GRID_Y0 = GRID_TOP + HEADER_ROW_H;
export const GRID_W = CELL_W * GRID_COLUMNS;
export const GRID_H = CELL_H * GRID_ROWS;

/** Map a grid x position (0-4) to pixels. */
export const toX = (xPos: number): number => GRID_X0 + xPos * CELL_W;

/** Map a grid y position (0-3, bottom up) to pixels. */
export const toY = (yPos: number): number => GRID_Y0 + (GRID_ROWS - yPos) * CELL_H;

const DOT_R = DOT_RADIUS;
const LABEL_H = FIGURE_LABEL.height;
const PADDING = 2;

/** Estimated pixel width of a label from its text length. */
export const labelWidth = (text: string): number => text.length * FIGURE_LABEL.charWidth + FIGURE_LABEL.padding;

/** Estimated pixel width of a cell name from its text length. */
export const cellNameWidth = (text: string): number => text.length * CELL_NAME_BOX.charWidth + CELL_NAME_BOX.padding;

/** Area two boxes overlap, with a small padding so near-misses count too. */
function overlapArea(a: Box, b: Box): number {
  const ox = Math.min(a.cx + a.w / 2, b.cx + b.w / 2) - Math.max(a.cx - a.w / 2, b.cx - b.w / 2);
  const oy = Math.min(a.cy + a.h / 2, b.cy + b.h / 2) - Math.max(a.cy - a.h / 2, b.cy - b.h / 2);

  return ox > -PADDING && oy > -PADDING ? (ox + PADDING) * (oy + PADDING) : 0;
}

/** Boxes that labels must stay clear of: cell names. */
export function fixedObstacles(data: EconomicSystemsData, showNames = true): Box[] {
  const boxes: Box[] = [];

  if (showNames) {
    for (const cell of data.cells) {
      boxes.push({
        cx: toX(cell.col + CELL_CENTER),
        cy: GRID_Y0 + cell.row * CELL_H + CELL_NAME_BOX.top + CELL_NAME_BOX.height / 2,
        w: cellNameWidth(cell.name),
        h: CELL_NAME_BOX.height,
      });
    }
  }

  return boxes;
}

/** Candidate label centers around a dot, nearest first. */
function candidates(width: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];

  for (const extra of LABEL_RING_EXTRAS) {
    const deltaY = DOT_R + LABEL_H / 2 + LABEL_GAP.vertical + extra;
    const deltaX = DOT_R + width / 2 + LABEL_GAP.horizontal + extra;
    out.push([0, deltaY], [0, -deltaY], [deltaX, 0], [-deltaX, 0], [deltaX * DIAGONAL_SHARE, deltaY], [-deltaX * DIAGONAL_SHARE, deltaY], [deltaX * DIAGONAL_SHARE, -deltaY], [-deltaX * DIAGONAL_SHARE, -deltaY]);
  }

  return out;
}

/** Greedy placement: each label takes the nearest spot that does not collide with anything placed so far. */
export function placeLabels(data: EconomicSystemsData, figures: Figure[]): PlacedLabel[] {
  const dots: Box[] = figures.map((figure) => ({ cx: toX(figure.x), cy: toY(figure.y), w: DOT_R * 2, h: DOT_R * 2 }));
  const fixed = fixedObstacles(data);
  const placed: PlacedLabel[] = [];
  const taken: Box[] = [];

  // Place each label at the candidate position that overlaps the other labels least.
  figures.forEach((figure, index) => {
    const width = labelWidth(figure.name);
    const dot = dots[index];
    const others = [...fixed, ...dots.filter((_unused, j) => j !== index), ...taken];
    let best: { box: Box; cost: number } | null = null;

    for (const [dx, dy] of candidates(width)) {
      const box: Box = { cx: dot.cx + dx, cy: dot.cy + dy, w: width, h: LABEL_H };

      // Cost of a label position is how much it overlaps the other labels.
      let cost = others.reduce((total, other) => total + overlapArea(box, other), 0);

      // Keep labels inside the grid.
      if (box.cx - width / 2 < GRID_X0 + GRID_EDGE_MARGIN) cost += OFF_GRID_COST;

      if (box.cx + width / 2 > GRID_X0 + GRID_W - GRID_EDGE_MARGIN) cost += OFF_GRID_COST;

      if (box.cy - LABEL_H / 2 < GRID_Y0 + GRID_EDGE_MARGIN) cost += OFF_GRID_COST;

      if (box.cy + LABEL_H / 2 > GRID_Y0 + GRID_H - GRID_EDGE_MARGIN) cost += OFF_GRID_COST;

      if (!best || cost < best.cost) best = { box, cost };

      if (cost === 0) break;
    }

    const box = best!.box;
    taken.push(box);
    placed.push({ figure, dotX: dot.cx, dotY: dot.cy, box });
  });

  return placed;
}
