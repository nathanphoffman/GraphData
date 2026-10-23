/** Pure layout helpers: unit-to-pixel conversion and greedy label placement. */
import { CELL_H, CELL_W, GRID_LEFT, GRID_TOP, HEADER_COL_W, HEADER_ROW_H } from "./style";
import type { Box, EconomicSystemsData, Figure, PlacedLabel } from "./types";

export const GRID_X0 = GRID_LEFT + HEADER_COL_W;
export const GRID_Y0 = GRID_TOP + HEADER_ROW_H;
export const GRID_W = CELL_W * 4;
export const GRID_H = CELL_H * 3;

/** Map a grid x position (0-4) to pixels. */
export const toX = (xPos: number): number => GRID_X0 + xPos * CELL_W;

/** Map a grid y position (0-3, bottom up) to pixels. */
export const toY = (yPos: number): number => GRID_Y0 + (3 - yPos) * CELL_H;

const DOT_R = 6;
const LABEL_H = 17;
const PADDING = 2;

/** Estimated pixel width of a label from its text length. */
export const labelWidth = (text: string): number => text.length * 6.8 + 10;

/** Estimated pixel width of a cell name from its text length. */
export const cellNameWidth = (text: string): number => text.length * 8.6 + 18;

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
        cx: toX(cell.col + 0.5),
        cy: GRID_Y0 + cell.row * CELL_H + 17,
        w: cellNameWidth(cell.name),
        h: 24,
      });
    }
  }

  return boxes;
}

/** Candidate label centers around a dot, nearest first. */
function candidates(width: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];

  for (const extra of [0, 14, 30]) {
    const deltaY = DOT_R + LABEL_H / 2 + 2 + extra;
    const deltaX = DOT_R + width / 2 + 3 + extra;
    out.push([0, deltaY], [0, -deltaY], [deltaX, 0], [-deltaX, 0], [deltaX * 0.7, deltaY], [-deltaX * 0.7, deltaY], [deltaX * 0.7, -deltaY], [-deltaX * 0.7, -deltaY]);
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
      if (box.cx - width / 2 < GRID_X0 + 2) cost += 1000;

      if (box.cx + width / 2 > GRID_X0 + GRID_W - 2) cost += 1000;

      if (box.cy - LABEL_H / 2 < GRID_Y0 + 2) cost += 1000;

      if (box.cy + LABEL_H / 2 > GRID_Y0 + GRID_H - 2) cost += 1000;

      if (!best || cost < best.cost) best = { box, cost };

      if (cost === 0) break;
    }

    const box = best!.box;
    taken.push(box);
    placed.push({ figure, dotX: dot.cx, dotY: dot.cy, box });
  });

  return placed;
}
