/** Pure layout helpers: chart size, scales, arrow shape and line segments. */
import { scaleLinear } from "d3-scale";
import type { LanguageOutlookData, LanguageRecord } from "./types";

export const CHART_WIDTH = 1100;
export const CHART_HEIGHT = 560;
export const MARGIN = { left: 50, right: 10, top: 10, bottom: 90 };

/** Y scale that fits the largest value among the series and lines currently shown. */
export function buildYScale(model: LanguageOutlookData, visible: Record<string, boolean>) {
  const shown: number[] = [];

  for (const lang of model.languages) {
    for (const key of [...model.series, ...model.lines]) {
      const value = lang.values[key];

      if (visible[key] && value != null) shown.push(value);
    }
  }

  const highest = Math.max(10, Math.ceil(Math.max(...shown) / 10) * 10);

  return scaleLinear().domain([0, highest]).range([CHART_HEIGHT - MARGIN.bottom, MARGIN.top]);
}

/** Bigger changes get longer arrows, capped so one huge change cannot cover the chart. */
export function arrowPoints(centerX: number, centerY: number, change: number): string {
  const height = 10 + Math.min(40, Math.abs(change) * 6);
  const width = height * 0.55;
  const headBase = height - height * 0.5;
  const direction = change >= 0 ? -1 : 1;
  const pts: Array<[number, number]> = [
    [centerX, centerY + direction * height],
    [centerX - width / 2, centerY + direction * headBase],
    [centerX - width / 6, centerY + direction * headBase],
    [centerX - width / 6, centerY],
    [centerX + width / 6, centerY],
    [centerX + width / 6, centerY + direction * headBase],
    [centerX + width / 2, centerY + direction * headBase],
  ];

  return pts.map((p) => p.join(",")).join(" ");
}

/** X position of the i-th language, spread evenly across the plot. */
export function makeXAt(count: number): (index: number) => number {
  return (index) => MARGIN.left + ((index + 0.5) * (CHART_WIDTH - MARGIN.left - MARGIN.right)) / count;
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
