/** Colors and labels for the language outlook chart. */

const YEAR_GREYS = ["#111111", "#333333", "#555555", "#777777", "#999999", "#bbbbbb", "#dddddd", "#ffffff"];

/** The newest year of data: the chart sorts by it first and draws its dots bigger. */
export const NEWEST_YEAR_SERIES = "Year 2026";

export const PROJECTION_PREFIX = "Projection";
export const PROJECTION_CHANGE_KEY = "Projection change";
export const FIX_PREFIX = "Projection with";
export const HEALTH_PREDICTION_PREFIX = "Projection of Healthiness";

/** Key in `values` holding the change from 2026 for a projection series. */
export function changeKey(series: string): string {
  return series.startsWith("Projection (") ? PROJECTION_CHANGE_KEY : `${series} change`;
}

export const LINE_COLORS: Record<string, string> = {
  "Combined avg 2024-2026": "#3ddc84",
  "Combined avg 2021-2023": "#ff4d4d",
  "Popularity avg 2024-2026": "#ffffff",
  "Popularity avg 2021-2023": "#ffffff",
  "Healthiness (average all metrics)": "#ffe14d",
  "Healthiness backtest 2025": "#b39b00",
  "Healthiness backtest 2026": "#fff3a0",
  "Backtest projection 2025": "#ffb020",
  "Backtest projection 2026": "#20c0ff",
};

/** Dotted lines: SVG dash pattern (dot, gap). The older window gets wider gaps so the two can be told apart. */
export const LINE_DASHES: Record<string, string> = {
  "Popularity avg 2024-2026": "1 5",
  "Popularity avg 2021-2023": "1 10",
};

export const LINE_LABELS: Record<string, string> = {
  "Combined avg 2024-2026": "Outlook (2/3) + TIOBE (1/3) avg, 2024-2026",
  "Combined avg 2021-2023": "Outlook (2/3) + TIOBE (1/3) avg, 2021-2023",
  "Popularity avg 2024-2026": "Stack Overflow usage (1/2) + TIOBE (1/2), no opinion, 2024-2026",
  "Popularity avg 2021-2023": "Stack Overflow usage (1/2) + TIOBE (1/2), no opinion, 2021-2023",
  "Healthiness backtest 2025": "Healthiness backtest: 2025 from 2019-2024 data",
  "Healthiness backtest 2026": "Healthiness backtest: 2026 from 2019-2024 data",
  "Backtest projection 2025": "Backtest: 2025 projected from 2019-2024 data",
  "Backtest projection 2026": "Backtest: 2026 projected from 2019-2024 data",
};

/** Lines and dots that start unchecked. */
export const HIDDEN_BY_DEFAULT_PREFIXES = ["Backtest", "Healthiness backtest", "Popularity avg", "Projection ("];

/** Years go from near black (oldest) to white (newest); the Historical Fix projection is purple, the plain projection pink. */
export function seriesColor(series: string, index: number): string {
  if (series.startsWith(FIX_PREFIX)) return "#b45cff";

  if (series.startsWith(HEALTH_PREDICTION_PREFIX)) return "#ffe14d";

  if (series.startsWith(PROJECTION_PREFIX)) return "#ff7ad9";

  return YEAR_GREYS[Math.min(index, YEAR_GREYS.length - 1)];
}

/** Legend sections, in display order. Each key belongs to the first group whose test it passes. */
export const LEGEND_GROUPS: Array<{ title: string; description: string; test: (key: string) => boolean }> = [
  {
    title: "Outlook by year",
    description:
      "Each year's popularity weighted by opinion: Stack Overflow usage multiplied by how much developers like the language.",
    test: (key) => key.startsWith("Year ") },
  {
    title: "Averages",
    description:
      "3-year averages of the outlook and TIOBE, plus a version using raw Stack Overflow usage with no opinion. The older and newer windows show which way a language is moving.",
    test: (key) => key.includes(" avg ") },
  {
    title: "Healthiness",
    description:
      "A closer guide to likely real-world use than the projections. It averages the last 3 years of outlook with raw Stack Overflow usage (no opinion) and TIOBE, plus two projection points. The dot is that score projected 10 years out. It still leans partly on opinion-weighted numbers.",
    test: (key) => key.startsWith("Healthiness") || key.startsWith(HEALTH_PREDICTION_PREFIX),
  },
  {
    title: "Outlook Projections",
    description:
      "Where each language lands in 10 years, leaning on hype and love: usage is included, but multiplied by how much developers like the language, with TIOBE (1/3) as the only opinion-free part. The trend is half the long-run change and half the last 3 years, fading out over time. Historical Fix adds half of how far the backtest missed.",
    test: (key) => key.startsWith(PROJECTION_PREFIX) },
  {
    title: "Backtests",
    description:
      "A test of the hype-and-love projection: the same math run with data through 2024 only, to predict 2025 and 2026. Compare against the real dots to see how far off it was.",
    test: (key) => key.startsWith("Backtest") },
];
