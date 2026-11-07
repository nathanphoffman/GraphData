import { yearly } from "../../../model/averages";
import type { WeightRow } from "../../../model/rows";
import type { Unit } from "../../../model/units";
import type { Show } from "./showGroups";

/** How a column's numbers are written and coloured: weights by target band, changes by delta band, muscle with 2 or 3 decimals, pressure in mmHg, Health by its own band. */
export type Kind = "weight" | "change" | "muscle2" | "muscle3" | "pressure" | "health";

export type Column = {
  /** Group that switches the column on; always shown when missing. */
  group?: keyof Show;
  title: (unit: Unit) => string;
  note?: string;
  kind: Kind;
  actual: (tableRow: WeightRow) => number | null;

  /** Muscle-adjusted value shown under the actual one. */
  adjusted?: (tableRow: WeightRow) => number | null;
};

/** Hover text shared by the four blood pressure reading columns. */
const PRESSURE_NOTE = "mmHg; days without a reading are estimated in a straight line between readings";

export const COLUMNS: Column[] = [
  { title: (unit) => `Weight (${unit})`, kind: "weight", actual: (tableRow) => tableRow.weight },
  {
    group: "wma",
    title: () => "Weight WMA",
    note: "14-day weighted moving average",
    kind: "weight",
    actual: (tableRow) => tableRow.weightWma,
    adjusted: (tableRow) => tableRow.weightWmaAdj,
  },
  {
    group: "bloodPressure",
    title: () => "BP 1st top",
    note: PRESSURE_NOTE,
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.firstTop ?? null,
  },
  {
    group: "bloodPressure",
    title: () => "BP 1st bottom",
    note: PRESSURE_NOTE,
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.firstBottom ?? null,
  },
  {
    group: "bloodPressure",
    title: () => "BP 2nd top",
    note: PRESSURE_NOTE,
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.secondTop ?? null,
  },
  {
    group: "bloodPressure",
    title: () => "BP 2nd bottom",
    note: PRESSURE_NOTE,
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.secondBottom ?? null,
  },
  {
    group: "bloodPressureAverage",
    title: () => "Avg BP top",
    note: "average of the two top readings",
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.avgTop ?? null,
  },
  {
    group: "bloodPressureAverage",
    title: () => "Avg BP bottom",
    note: "average of the two bottom readings",
    kind: "pressure",
    actual: (tableRow) => tableRow.pressure?.avgBottom ?? null,
  },
  {
    title: () => "Health",
    note: "((avg top − avg bottom) × 0.5 + avg top + avg bottom + weight WMA in lb) / 2 − muscle gained so far",
    kind: "health",
    actual: (tableRow) => tableRow.health,
  },
  {
    group: "muscleDaily",
    title: (unit) => `Muscle gain (${unit})`,
    kind: "muscle3",
    actual: (tableRow) => tableRow.muscleDaily,
  },
  {
    group: "muscleTotal",
    title: (unit) => `Muscle gained so far (${unit})`,
    kind: "muscle2",
    actual: (tableRow) => tableRow.muscleTotal,
  },
  {
    group: "dayAverages",
    title: () => "3-day avg",
    note: "actual / muscle-adjusted",
    kind: "weight",
    actual: (tableRow) => tableRow.avg3,
    adjusted: (tableRow) => tableRow.adj.avg3,
  },
  {
    group: "weightLoss",
    title: () => "Recent weight loss / month",
    note: "from 15 and 30 day change",
    kind: "change",
    actual: (tableRow) => tableRow.recent,
    adjusted: (tableRow) => tableRow.recentAdj,
  },
  {
    group: "weightLoss",
    title: () => "Weight loss 3-day / month",
    note: "3-day avg of the column before",
    kind: "change",
    actual: (tableRow) => tableRow.recent3,
    adjusted: (tableRow) => tableRow.recent3Adj,
  },
  {
    group: "dayAverages",
    title: () => "30-day avg",
    kind: "weight",
    actual: (tableRow) => tableRow.avg30,
    adjusted: (tableRow) => tableRow.adj.avg30,
  },
  {
    group: "dayAverages",
    title: () => "365-day avg",
    kind: "weight",
    actual: (tableRow) => tableRow.avg365,
    adjusted: (tableRow) => tableRow.adj.avg365,
  },
  {
    group: "dayAverages",
    title: () => "Blended avg",
    kind: "weight",
    actual: (tableRow) => tableRow.blended,
    adjusted: (tableRow) => tableRow.adj.blended,
  },
  {
    group: "dayAverages",
    title: () => "Projected / month",
    kind: "change",
    actual: (tableRow) => tableRow.monthly,
    adjusted: (tableRow) => tableRow.adj.monthly,
  },
  {
    group: "dayAverages",
    title: () => "Projected in 1 year",
    kind: "weight",
    actual: (tableRow) => yearly(tableRow.blended, tableRow.monthly),
    adjusted: (tableRow) => yearly(tableRow.adj.blended, tableRow.adj.monthly),
  },
  {
    group: "allAverages",
    title: () => "All average",
    kind: "weight",
    actual: (tableRow) => tableRow.allAvg,
    adjusted: (tableRow) => tableRow.allAvgAdj,
  },
  {
    group: "allAverages",
    title: () => "Projected all average",
    kind: "weight",
    actual: (tableRow) => tableRow.allProj,
    adjusted: (tableRow) => tableRow.allProjAdj,
  },
  {
    group: "allAverages",
    title: () => "3 day projected all average",
    kind: "weight",
    actual: (tableRow) => tableRow.allProj3,
    adjusted: (tableRow) => tableRow.allProj3Adj,
  },
  {
    group: "allAverages",
    title: () => "Complete average",
    note: "every weight column",
    kind: "weight",
    actual: (tableRow) => tableRow.complete,
    adjusted: (tableRow) => tableRow.completeAdj,
  },
  {
    group: "wma",
    title: () => "Weight loss WMA / month",
    note: "14-day weighted moving average, newest counts most",
    kind: "change",
    actual: (tableRow) => tableRow.recentWma,
    adjusted: (tableRow) => tableRow.recentWmaAdj,
  },
  {
    group: "wma",
    title: () => "WMA Projection",
    note: "weight WMA + 12 × loss WMA / month",
    kind: "weight",
    actual: (tableRow) => tableRow.wmaProj,
    adjusted: (tableRow) => tableRow.wmaProjAdj,
  },
  {
    group: "wma",
    title: () => "WMA Projection Projected",
    note: "average of WMA Projection and WMA Projection + its monthly change",
    kind: "weight",
    actual: (tableRow) => tableRow.wmaAvg,
    adjusted: (tableRow) => tableRow.wmaAvgAdj,
  },
  {
    title: () => "Average of Complete & WMA",
    note: "Complete average and WMA Projection Projected",
    kind: "weight",
    actual: (tableRow) => tableRow.finalAvg,
    adjusted: (tableRow) => tableRow.finalAvgAdj,
  },
  {
    title: () => "3-day avg of Complete & WMA",
    note: "3-day average of the column before",
    kind: "weight",
    actual: (tableRow) => tableRow.finalAvg3,
    adjusted: (tableRow) => tableRow.finalAvg3Adj,
  },
];
