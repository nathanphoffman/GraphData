/** Pure layout helpers: chart size, scales, arrow shape and line segments. */
import { scaleLinear } from "d3-scale";
import type { LanguageOutlookData, LanguageRecord } from "./types";

export const CHART_WIDTH = 1100;
export const CHART_HEIGHT = 560;
export const MARGIN = { left: 50, right: 10, top: 10, bottom: 90 };

/** The y axis reaches at least this high and always ends on a multiple of this step. */
export const MIN_Y_MAX = 10;
export const Y_ROUND_STEP = 10;

/** Projection arrows: a base length plus a little per point of change (up to a cap), and their shape. */
const ARROW_BASE_LENGTH = 10;
const ARROW_MAX_EXTRA = 40;
const ARROW_PER_POINT = 6;
const ARROW_WIDTH_SHARE = 0.55;
const ARROW_HEAD_SHARE = 0.5;
const ARROW_STEM_DIVISOR = 6;

/** The look shared by the arrows on the chart and in the key. */
export const ARROW_STYLE = { fillOpacity: 0.5, strokeOpacity: 0.5, strokeWidth: 0.8, stroke: "#4c4c4c" };

/** Dots on the chart and in the key. */
export const PROJECTION_DOT_RADIUS = 6;

/** The middle of a language's column, as a share of the column. */
const COLUMN_MIDDLE = 0.5;

/** Y scale that fits the largest value among the series and lines currently shown. */
export function buildYScale(model: LanguageOutlookData, visible: Record<string, boolean>) {
  const shown: number[] = [];

  for (const lang of model.languages) {
    for (const key of [...model.series, ...model.lines]) {
      const value = lang.values[key];

      if (visible[key] && value != null) shown.push(value);
    }
  }

  const highest = Math.max(MIN_Y_MAX, Math.ceil(Math.max(...shown) / Y_ROUND_STEP) * Y_ROUND_STEP);

  return scaleLinear().domain([0, highest]).range([CHART_HEIGHT - MARGIN.bottom, MARGIN.top]);
}

/** Bigger changes get longer arrows, capped so one huge change cannot cover the chart. */
export function arrowPoints(centerX: number, centerY: number, change: number): string {
  const height = ARROW_BASE_LENGTH + Math.min(ARROW_MAX_EXTRA, Math.abs(change) * ARROW_PER_POINT);
  const width = height * ARROW_WIDTH_SHARE;
  const headBase = height - height * ARROW_HEAD_SHARE;
  const direction = change >= 0 ? -1 : 1;
  const pts: Array<[number, number]> = [
    [centerX, centerY + direction * height],
    [centerX - width / 2, centerY + direction * headBase],
    [centerX - width / ARROW_STEM_DIVISOR, centerY + direction * headBase],
    [centerX - width / ARROW_STEM_DIVISOR, centerY],
    [centerX + width / ARROW_STEM_DIVISOR, centerY],
    [centerX + width / ARROW_STEM_DIVISOR, centerY + direction * headBase],
    [centerX + width / 2, centerY + direction * headBase],
  ];

  return pts.map((p) => p.join(",")).join(" ");
}

/** X position of the i-th language, spread evenly across the plot. */
export function makeXAt(count: number): (index: number) => number {
  return (index) => MARGIN.left + ((index + COLUMN_MIDDLE) * (CHART_WIDTH - MARGIN.left - MARGIN.right)) / count;
}

/** Polyline point strings for one line, split wherever a language has no value. */
export function lineSegments(
  languages: LanguageRecord[],
  key: string,
  xAt: (index: number) => number,
  yAt: (value: number) => number,
): string[] {
  const segments: string[] = [];
  let current: string[] = [];

  // Break the line wherever a language has no value.
  languages.forEach((lang, index) => {
    const value = lang.values[key];

    if (value == null) {
      if (current.length > 1) segments.push(current.join(" "));
      current = [];
    } else {
      current.push(`${xAt(index)},${yAt(value)}`);
    }
  });

  if (current.length > 1) segments.push(current.join(" "));

  return segments;
}
