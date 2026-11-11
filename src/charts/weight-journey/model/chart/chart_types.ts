import type { projectTapering } from "../../calculate";
import type { AllTrend, General, Point, Spread } from "../curves";
import type { FatProjection } from "../rows";

export const CHART_WIDTH = 1000;
export const CHART_HEIGHT = 420;
export const CHART_MARGIN = { top: 16, right: 20, bottom: 32, left: 48 };

export type Tapered = ReturnType<typeof projectTapering>;

export interface ChartInput {
  rangeDays: number;
  k: number;

  /** whether the Health line is drawn, so the y axis only makes room for it when it is */
  showHealth: boolean;
  tapered: Tapered | null;
  allTrend: AllTrend | null;
  spread: Spread | null;
  general: General | null;
  fat: FatProjection | null;
}

export type PointMapper = (point: Point) => { x: number; y: number };
