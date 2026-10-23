import { type Averages, addAverages, addMuscle, fillDays, project } from "../calculate";
import data from "../../../../../data/weight-journey/weight-journey.json";
import { allAverage, completeAverage, last3, projectAll, recentRate, yearly } from "./averages";

const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

// Placeholder rows (weight 0) and future dates are skipped.
const weighIns = (data.weights as [string, number][]).filter(([date, weight]) => weight > 0 && date <= today);

export const days = fillDays(weighIns);
export const withMuscle = addMuscle(days);
export const projectedAdjusted = project(
  withMuscle.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })),
  90,
  90,
);

export const { fit, future } = project(days, 90, 90);

const DAILY_WINDOWS = { short: 3, medium: 30, long: 365 };

/** Add the averages, rates and projections to every day. */
const weightColumns = (averages: Averages, all: number, proj: number | null, proj3: number | null) =>
  [averages.avg3, averages.avg30, averages.avg365, averages.blended, yearly(averages.blended, averages.monthly), all, proj, proj3];

/** The weight columns that are averaged into the complete average. */
function buildRows(rows: typeof withMuscle, windows: typeof DAILY_WINDOWS, step: number) {
  const actual = addAverages(rows, windows, step);

  // Same averages again on weight minus the muscle gained so far.
  const adjusted = addAverages(rows.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })), windows, step);
  const baseRows = actual.map((d, index) => ({ ...d, adj: adjusted[index] }));
  const allActual = baseRows.map((baseRow) => allAverage(baseRow));
  const allAdjusted = baseRows.map((baseRow) => allAverage(baseRow.adj));
  const projActual = allActual.map((_unused, index) => projectAll(allActual, index, windows.medium, step));
  const projAdjusted = allAdjusted.map((_unused, index) => projectAll(allAdjusted, index, windows.medium, step));
  const avg3 = baseRows.map((baseRow) => baseRow.avg3);
  const avg3Adj = baseRows.map((baseRow) => baseRow.adj.avg3);

  // Attach the rates and averages to each day.
  return baseRows.map((baseRow, index) => ({
    ...baseRow,
    recent: recentRate(avg3, index, step),
    recentAdj: recentRate(avg3Adj, index, step),
    allAvg: allActual[index],
    allAvgAdj: allAdjusted[index],
    allProj: projActual[index],
    allProjAdj: projAdjusted[index],
    allProj3: last3(projActual, index),
    allProj3Adj: last3(projAdjusted, index),
    complete: completeAverage([baseRow.weight, ...weightColumns(baseRow, allActual[index], projActual[index], last3(projActual, index))]),
    completeAdj: completeAverage([baseRow.weight - baseRow.muscleTotal, ...weightColumns(baseRow.adj, allAdjusted[index], projAdjusted[index], last3(projAdjusted, index))]),
  }));
}

export const dailyRows = buildRows(withMuscle, DAILY_WINDOWS, 1);
export type Row = (typeof dailyRows)[number];
