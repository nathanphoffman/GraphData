/** Pure layout helpers: chart size, scales, arrow shape and line segments. */
import { scaleLinear } from "d3-scale";
import type { LanguageOutlookData, LanguageRecord } from "./types";

export const W = 1100;
export const H = 560;
export const MARGIN = { left: 50, right: 10, top: 10, bottom: 90 };

/** Y scale that fits the largest value among the series and lines currently shown. */
export function buildYScale(model: LanguageOutlookData, visible: Record<string, boolean>) {
  const shown: number[] = [];

  for (const lang of model.languages) {
    for (const key of [...model.series, ...model.lines]) {
      const v = lang.values[key];

      if (visible[key] && v != null) shown.push(v);
    }
  }

  const max = Math.max(10, Math.ceil(Math.max(...shown) / 10) * 10);

  return scaleLinear().domain([0, max]).range([H - MARGIN.bottom, MARGIN.top]);
}

/** Arrow whose tail sits on (cx, cy); it points up for a positive change, down for a negative one,
 *  and gets longer the bigger the change. */
export function arrowPoints(cx: number, cy: number, change: number): string {
  const h = 10 + Math.min(40, Math.abs(change) * 6);
  const w = h * 0.55;
  const headBase = h - h * 0.5;
  const dir = change >= 0 ? -1 : 1;
  const pts: Array<[number, number]> = [
    [cx, cy + dir * h],
    [cx - w / 2, cy + dir * headBase],
    [cx - w / 6, cy + dir * headBase],
    [cx - w / 6, cy],
    [cx + w / 6, cy],
    [cx + w / 6, cy + dir * headBase],
    [cx + w / 2, cy + dir * headBase],
  ];

  return pts.map((p) => p.join(",")).join(" ");
}

/** X position of the i-th language, spread evenly across the plot. */
export function makeXAt(count: number): (i: number) => number {
  return (i) => MARGIN.left + ((i + 0.5) * (W - MARGIN.left - MARGIN.right)) / count;
}

/** Polyline point strings for one line, split wherever a language has no value. */
export function lineSegments(
  languages: LanguageRecord[],
  key: string,
  xAt: (i: number) => number,
  yAt: (v: number) => number,
): string[] {
  const segments: string[] = [];
  let current: string[] = [];
  languages.forEach((lang, i) => {
    const v = lang.values[key];

    if (v == null) {
      if (current.length > 1) segments.push(current.join(" "));
      current = [];
    } else {
      current.push(`${xAt(i)},${yAt(v)}`);
    }
  });

  if (current.length > 1) segments.push(current.join(" "));

  return segments;
}
