import type { ComponentType } from "react";
import LanguageOutlook from "./language-outlook/LanguageOutlook";
import EconomicSystemsMap from "./economic-systems-map/EconomicSystemsMap";
import NeuronIntelligence from "./neuron-intelligence/NeuronIntelligence";
import RuleOfAuthorship from "./rule-of-authorship/RuleOfAuthorship";
import MaintainabilityCalculator from "./maintainability-calculator/MaintainabilityCalculator";
import DndSales from "./dnd-sales/DndSales";
import TinyMightyBestiary from "./tiny-mighty-bestiary/TinyMightyBestiary";

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
  {
    id: "maintainability-calculator",
    title: "Maintainability Calculator",
    description:
      "How hard a codebase is to maintain, by line count, team size, code quality, AI involvement and developer skill level.",
    component: MaintainabilityCalculator,
  },
  {
    id: "rule-of-authorship",
    title: "True Authors of DND",
    description: "Who wrote which rules of Dungeons & Dragons, Arneson or Gygax, based on the Arneson v. Gygax case file.",
    component: RuleOfAuthorship,
  },
  {
    id: "neuron-intelligence",
    title: "Neuron Intelligence Explorer",
    description:
      "Ranks animals by neuron count against body weight, with adjustable exponents: Neurons^x / Weight^w, then Score^k.",
    component: NeuronIntelligence,
  },
  {
    id: "economic-systems-map",
    title: "Economic Systems Map",
    description:
      "A two-axis map of economic systems (orientation vs. size of power) with a band of historical stability, the U.S. 1865-present, and where well-known figures sit.",
    component: EconomicSystemsMap,
  },
  {
    id: "dnd-sales",
    title: "DND Sales over Time",
    description:
      "Estimated lifetime Player's Handbook sales for each edition of D&D, from OD&D to the 2024 (5.5e) rules, with confidence ranges and sources.",
    component: DndSales,
  },
  {
    id: "tiny-mighty-bestiary",
    title: "Tiny Mighty RPG Bestiary",
    description:
      "Classic fantasy creatures statted with the Tiny Mighty RPG combat table: health, defense, bonus, turns and powers.",
    component: TinyMightyBestiary,
  },
];

export function findChart(id: string | undefined): ChartEntry | undefined {
  return charts.find((chart) => chart.id === id);
}
