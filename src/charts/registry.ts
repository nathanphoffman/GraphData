import type { ComponentType } from "react";
import LanguageOutlook from "./tech/language-outlook/LanguageOutlook";
import EconomicSystemsMap from "./tech/economic-systems-map/EconomicSystemsMap";
import NeuronIntelligence from "./science/neuron-intelligence/NeuronIntelligence";
import RuleOfAuthorship from "./tabletop/rule-of-authorship/RuleOfAuthorship";
import MaintainabilityCalculator from "./calculators/maintainability-calculator/MaintainabilityCalculator";
import MinimalismCalculator from "./calculators/minimalism-calculator/MinimalismCalculator";
import DndSales from "./tabletop/dnd-sales/DndSales";
import TinyMightyBestiary from "./tabletop/tiny-mighty-bestiary/TinyMightyBestiary";
import AllIntelligence from "./science/all-intelligence/AllIntelligence";
import AstronomyTargets from "./science/astronomy-targets/AstronomyTargets";
import WeightJourney from "./science/weight-journey/WeightJourney";
import TopRankings from "./tech/top-rankings/TopRankings";
import BoardGames from "./tech/board-games/BoardGames";
import ProjectPriority from "./tech/project-priority/ProjectPriority";
import RalphLoops from "./tech/ralph-loops/RalphLoops";

/** Home page sections, in display order. */
const SCIENCE_CATEGORY = "Science";
const CALCULATORS_CATEGORY = "Calculators";
const TABLETOP_CATEGORY = "Tabletop RPGs";
const TECH_CATEGORY = "Tech & economics";
export const categories = [CALCULATORS_CATEGORY, TABLETOP_CATEGORY, TECH_CATEGORY, SCIENCE_CATEGORY] as const;
export type Category = (typeof categories)[number];

export interface ChartEntry {
  /** URL slug, e.g. /language-outlook */
  id: string;
  title: string;
  category: Category;
  description: string;
  component: ComponentType;

  /** Not listed on the home page; only reachable by typing the URL. */
  unlisted?: boolean;
}

/**
 * Every chart in the project is listed here.
 * To add a chart: create a component under src/charts/<category>/<name>/, import it, and add one entry below.
 */
export const charts: ChartEntry[] = [
  {
    id: "language-outlook",
    title: "Language Outlook",
    category: TECH_CATEGORY,
    description:
      "Programming language popularity weighted by developer opinion, 2019-2026, with 4-year trend lines and a 10-year projection.",
    component: LanguageOutlook,
  },
  {
    id: "maintainability-calculator",
    title: "Maintainability Calculator",
    category: CALCULATORS_CATEGORY,
    description:
      "How hard a codebase is to maintain, by line count, team size, code quality, AI involvement and developer skill level.",
    component: MaintainabilityCalculator,
  },
  {
    id: "minimalism-calculator",
    title: "The Minimalism Calculator",
    category: CALCULATORS_CATEGORY,
    description:
      "How many of a thing you should own (board games, books, tools and more), based on how often you use it, how much you share, and what it costs to keep buying. Includes sharing and goal charts, a 10-year savings table and a link you can share.",
    component: MinimalismCalculator,
  },
  {
    id: "rule-of-authorship",
    title: "True Authors of DND",
    category: TABLETOP_CATEGORY,
    description:
      "Who wrote which rules and products of original Dungeons & Dragons (pre-1e): Gygax, Arneson, Kuntz, Kask, Ernie Gygax and others, based on the Arneson v. Gygax case file and TSR credits.",
    component: RuleOfAuthorship,
  },
  {
    id: "neuron-intelligence",
    title: "Neuron Intelligence Explorer",
    category: SCIENCE_CATEGORY,
    description:
      "Ranks animals by neuron count against body weight, with adjustable exponents: Neurons^x / Weight^w, then Score^k.",
    component: NeuronIntelligence,
  },
  {
    id: "economic-systems-map",
    title: "Economic Systems Map",
    category: TECH_CATEGORY,
    description:
      "A two-axis map of economic systems (orientation vs. size of power) with a band of historical stability, the U.S. 1865-present, and where well-known figures sit.",
    component: EconomicSystemsMap,
  },
  {
    id: "dnd-sales",
    title: "DND Sales over Time",
    category: TABLETOP_CATEGORY,
    description:
      "Estimated lifetime Player's Handbook sales for each edition of D&D, from OD&D to the 2024 (5.5e) rules, with confidence ranges and sources.",
    component: DndSales,
  },
  {
    id: "tiny-mighty-bestiary",
    title: "Unofficial Bestiary for Tiny Mighty",
    category: TABLETOP_CATEGORY,
    description:
      "A bestiary created by Nathan Hoffman with AI, this is not an official Tiny Mighty project or endorsed in any way by my contributors. Classic fantasy creatures statted with the Tiny Mighty RPG combat table: health, defense, bonus, turns and powers.",
    component: TinyMightyBestiary,
  },
  {
    id: "all-intelligence",
    title: "All Intelligence",
    category: SCIENCE_CATEGORY,
    description:
      "A universal intelligence table for AI models and humans: 15 columns in 7 groups (thinking, knowledge, perception, action, learning, people, efficiency), combined with a geometric mean. Starts from BenchLM data, with adjustable handling of zero and unmeasured scores.",
    component: AllIntelligence,
  },
  {
    id: "astronomy-targets",
    title: "Amateur Astronomy Targets",
    category: SCIENCE_CATEGORY,
    description:
      "Popular northern hemisphere deep-sky targets ranked for a season, adjusted for your telescope's focal length and mirror or lens size.",
    component: AstronomyTargets,
  },
  {
    id: "weight-journey",
    title: "Weight Journey",
    category: SCIENCE_CATEGORY,
    description: "Personal daily weight table, gap-filled, with a trend curve and projection.",
    component: WeightJourney,
    unlisted: true,
  },
  {
    id: "top-rankings",
    title: "Top Rankings",
    category: TECH_CATEGORY,
    description:
      "Personal ranking lists (programming languages, board games, video games, favorite TV and movies, RPGs) scored on syntax, scaffolding, readability and more. Switch between lists with the buttons at the top.",
    component: TopRankings,
  },
  {
    id: "project-priority",
    title: "Project Priority",
    category: TECH_CATEGORY,
    description:
      "My projects ranked by fun, usefulness, job value, difficulty, size, quality and status, with a code maintenance index (n-Factor) for the whole codebase.",
    component: ProjectPriority,
  },
  {
    id: "board-games",
    title: "Board Games by Weight",
    category: TECH_CATEGORY,
    description:
      "Thousands of BoardGameGeek games re-ranked for the weight (complexity) you like to play, so a light-game fan and a heavy-game fan each get their own list. Paged and searchable.",
    component: BoardGames,
  },
  {
    id: "ralph-loops",
    title: "RalphLoops",
    category: TECH_CATEGORY,
    description: "Live status of my RalphLoops (login required).",
    component: RalphLoops,
    unlisted: true,
  },
];

/** Returns undefined instead of throwing for an unknown id, because a mistyped address is normal and the page can show a not-found message. */
export function findChart(identifier: string | undefined): ChartEntry | undefined {
  return charts.find((chart) => chart.id === identifier);
}
