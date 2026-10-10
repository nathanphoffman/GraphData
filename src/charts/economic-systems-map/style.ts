/** Colors and sizes for the economic systems map. */

export const GROUP_COLORS: Record<string, string> = {
  presidents: "#1b2a6b",
  senate: "#00796b",
  "other-us": "#c2185b",
  thinkers: "#6a1b9a",
  leaders: "#c25e00",
};

export const COLORS = {
  cellLight: "#eef2f6",
  cellDark: "#dde5ee",
  border: "#ffffff",
  header: "#2b3a4a",
  headerText: "#ffffff",
  cellName: "#333333",
  stability: "#1e8a4a",
  overlay: "#b0182a",
  auth: "#8b1a1a",
  dem: "#1f4fbf",
  muted: "#555555",
};

/** Pixels per cell unit (a cell is 3.2 x 1.8 plot units, drawn at 80 px per unit). */
export const CELL_W = 3.2 * 80;
export const CELL_H = 1.8 * 80;
export const HEADER_COL_W = 120;
export const HEADER_ROW_H = 40;
export const GRID_TOP = 64;
export const GRID_LEFT = 8;
