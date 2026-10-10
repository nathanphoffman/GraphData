import type { ComponentType } from "react";
import LanguageOutlook from "./language-outlook/LanguageOutlook";

export interface ChartEntry {
  /** URL slug, e.g. #/chart/language-outlook */
  id: string;
  title: string;
  description: string;
  component: ComponentType;
}

/**
 * Every chart in the project is listed here.
 * To add a chart: create a component under src/charts/<name>/, import it, and add one entry below.
 */
export const charts: ChartEntry[] = [
  {
    id: "language-outlook",
    title: "Language Outlook",
    description:
      "Programming language popularity weighted by developer opinion, 2019-2026, with 4-year trend lines and a 10-year projection.",
    component: LanguageOutlook,
  },
];

export function findChart(id: string | undefined): ChartEntry | undefined {
  return charts.find((chart) => chart.id === id);
}
