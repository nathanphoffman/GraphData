/** Colors and labels for the language outlook chart. */

const YEAR_GREYS = ["#111111", "#333333", "#555555", "#777777", "#999999", "#bbbbbb", "#dddddd", "#ffffff"];

export const PROJECTION_PREFIX = "Projection";
export const PROJECTION_CHANGE_KEY = "Projection change";

export const LINE_COLORS: Record<string, string> = {
  "Combined avg 2023-2026": "#3ddc84",
  "Combined avg 2019-2022": "#ff4d4d",
};

export const LINE_LABELS: Record<string, string> = {
  "Combined avg 2023-2026": "Outlook (2/3) + TIOBE (1/3) avg, 2023-2026",
  "Combined avg 2019-2022": "Outlook (2/3) + TIOBE (1/3) avg, 2019-2022",
};

/** Years go from near black (oldest) to white (newest); the projection is purple. */
export function seriesColor(series: string, index: number): string {
  if (series.startsWith(PROJECTION_PREFIX)) return "#b45cff";
  return YEAR_GREYS[Math.min(index, YEAR_GREYS.length - 1)];
}
