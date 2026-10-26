/** Colors and sizes for the economic systems map. */

export const GROUP_COLORS: Record<string, string> = {
  presidents: "#1b2a6b",
  senate: "#00796b",
  "other-us": "#c2185b",
  thinkers: "#6a1b9a",
  leaders: "#c25e00",
  business: "#6d4c41",
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

/** The grid is this many cells across and down. */
export const GRID_COLUMNS = 4;
export const GRID_ROWS = 3;

/** A grid position of 0.5 is the middle of a cell. */
export const CELL_CENTER = 0.5;

export const BOLD = 700;

/** Text sizes in pixels. */
export const FONT_SIZE = { title: 22, header: 15, sizeHeader: 14, cellName: 15, example: 13, note: 12, legend: 13, footnote: 11, figure: 11, stability: 13 };

export const TITLE_BASELINE = 34;

/** Header text sits this far down from the top of its header cell (row headers are centered, then nudged down). */
export const HEADER_TEXT_BASELINE = 26;
export const ROW_HEADER_NUDGE = 5;

/** The box behind a cell name, measured from the top of the cell. */
export const CELL_NAME_BOX = { top: 5, height: 24, radius: 5, opacity: 0.75, textBaseline: 18, charWidth: 8.6, padding: 18 };

/** Where each example line sits from the top of its cell; the note under an example is one line below it. */
export const EXAMPLE_Y = { auth: 50, authNote: 68, dem: 70, demAfterNote: 88, noteGap: 18 };

/** Figure dots and their labels. */
export const DOT_RADIUS = 6;
export const FIGURE_LABEL = { height: 17, charWidth: 6.8, padding: 10, radius: 3, opacity: 0.8, textBaseline: 4 };
export const FIGURE_DOT_STROKE = 1.5;

/** A leader line is only drawn when the label is farther than this from its dot. */
export const LEADER_MIN_LENGTH = 8;
export const LEADER_OPACITY = 0.7;

/** Label placement tries rings of spots around a dot; each ring is this much farther out. */
export const LABEL_RING_EXTRAS = [0, 14, 30];
export const LABEL_GAP = { vertical: 2, horizontal: 3 };

/** Diagonal spots sit this share of the way out horizontally. */
export const DIAGONAL_SHARE = 0.7;

/** Cost added to a label spot that leaves the grid, and how close to the edge counts as leaving it. */
export const OFF_GRID_COST = 1000;
export const GRID_EDGE_MARGIN = 2;

/** The line of stability. */
export const STABILITY = {
  charWidth: 7.6,
  padding: 16,
  halfHeight: 11,
  radius: 6,
  boxOpacity: 0.9,
  textBaseline: 5,
  bandOpacity: 0.13,
  edgeWidth: 2.2,
  edgeOpacity: 0.8,
  centerOpacity: 0.35,
};

/** Straight angles, for turning a line's slope into degrees. */
export const HALF_TURN_DEGREES = 180;

/** The U.S. history region. */
export const OVERLAY_OPACITY = 0.1;
export const OVERLAY_STROKE = 2.2;

/** The highlighted cell is outlined inside its edges by this much. */
export const HIGHLIGHT_INSET = 2;
export const HIGHLIGHT_STROKE = 3.5;

/** The group key and footnote under the grid, measured from the bottom of the grid. */
export const LEGEND = {
  keyStartX: 10,
  keySpacing: 168,
  keyY: 28,
  keyLabelX: 12,
  keyLabelBaseline: 4,
  swatchX: 4,
  swatchY: 44,
  swatchWidth: 22,
  swatchHeight: 13,
  swatchOpacity: 0.1,
  swatchStroke: 2,
  overlayLabelX: 36,
  overlayLabelY: 55,
  footnoteY: 82,
};
