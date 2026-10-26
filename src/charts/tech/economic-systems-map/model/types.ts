/** Shape of data/economic-systems/economic-systems-map.json. Positions are in "cell units": x 0-4, y 0-3 (0 = bottom). */
export type Point = [number, number];

export interface Cell {
  name: string;

  /** 0 = Communal ... 3 = Market. */
  col: number;

  /** 0 = Large (top) ... 2 = Small (bottom). */
  row: number;

  /** Authoritarian historical example. */
  auth: string;

  /** Democratic historical example. */
  dem: string;
}

export interface Figure {
  name: string;
  group: string;
  x: number;
  y: number;
}

export interface Group {
  id: string;
  label: string;
}

export interface EconomicSystemsData {
  title: string;
  columns: string[];
  rows: string[];
  cells: Cell[];
  stability: { label: string; upper: { from: Point; to: Point }; lower: { from: Point; to: Point } };
  overlay: { label: string; sublabel: string; polygon: Point[] };
  groups: Group[];
  figures: Figure[];
  theory: { heading: string; paragraphs: string[]; caveat: string };
  footnote: string;
}

/** An axis-aligned box in SVG pixels, given by its center. */
export interface LabelBox {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

export interface PlacedLabel {
  figure: Figure;
  dotX: number;
  dotY: number;
  box: LabelBox;
}

/** Shape of data/economic-systems/economic-systems-views.json: common views per cell, by policy category. */
export interface CellViews {
  summary: string;
  views: Record<string, string>;
}

export interface EconomicSystemsViewsData {
  categories: string[];
  cells: Record<string, CellViews>;
}

/** Shape of data/economic-systems/economic-systems-combos.json: one blend per pair of orthogonally adjacent cells. */
export interface Combo {
  /** The two cell names being blended. */
  cells: [string, string];
  name: string;
  summary: string;
  views: Record<string, string>;
}

export interface EconomicSystemsCombosData {
  combos: Combo[];
}
