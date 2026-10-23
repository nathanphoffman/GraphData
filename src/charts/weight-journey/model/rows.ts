import { type Averages, addAverages, addMuscle, fillDays, project } from "../calculate";
import data from "../../../../data/misc/weight-journey.json";
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

const weightColumns = (a: Averages, all: number, proj: number | null, proj3: number | null) =>
  [a.avg3, a.avg30, a.avg365, a.blended, yearly(a.blended, a.monthly), all, proj, proj3];

function buildRows(rows: typeof withMuscle, windows: typeof DAILY_WINDOWS, step: number) {
  const actual = addAverages(rows, windows, step);
  // Same averages again on weight minus the muscle gained so far.
  const adjusted = addAverages(rows.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })), windows, step);
  const baseRows = actual.map((d, i) => ({ ...d, adj: adjusted[i] }));
  const allActual = baseRows.map((d) => allAverage(d));
  const allAdjusted = baseRows.map((d) => allAverage(d.adj));
  const projActual = allActual.map((_, i) => projectAll(allActual, i, windows.medium, step));
  const projAdjusted = allAdjusted.map((_, i) => projectAll(allAdjusted, i, windows.medium, step));
  const avg3 = baseRows.map((d) => d.avg3);
  const avg3Adj = baseRows.map((d) => d.adj.avg3);
  return baseRows.map((d, i) => ({
    ...d,
    recent: recentRate(avg3, i, step),
    recentAdj: recentRate(avg3Adj, i, step),
    allAvg: allActual[i],
    allAvgAdj: allAdjusted[i],
    allProj: projActual[i],
    allProjAdj: projAdjusted[i],
    allProj3: last3(projActual, i),
    allProj3Adj: last3(projAdjusted, i),
    complete: completeAverage([d.weight, ...weightColumns(d, allActual[i], projActual[i], last3(projActual, i))]),
    completeAdj: completeAverage([d.weight - d.muscleTotal, ...weightColumns(d.adj, allAdjusted[i], projAdjusted[i], last3(projAdjusted, i))]),
  }));
}

export const dailyRows = buildRows(withMuscle, DAILY_WINDOWS, 1);
export type Row = (typeof dailyRows)[number];
