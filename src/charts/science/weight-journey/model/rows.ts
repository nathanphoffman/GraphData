import { type Averages, type Day, type Muscle, type Projection, addAverages, addMuscle, fillDays, project } from "../calculate";
import { allAverage, completeAverage, last3, projectAll, recentRate, weightedAverage, yearly } from "./averages";

// Everything below is filled in by setWeights once the weights have been fetched from the API.
export let days: Day[] = [];
export let withMuscle: (Day & Muscle)[] = [];
export let projectedAdjusted: { fit: Projection[]; future: Projection[] } = { fit: [], future: [] };
export let fit: Projection[] = [];
export let future: Projection[] = [];
export let dailyRows: Row[] = [];

/** Build the days, muscle, projections and daily rows from the weigh-ins; returns the parts the hooks depend on. */
export function setWeights(weights: [string, number][]) {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  // Placeholder rows (weight 0) and future dates are skipped.
  days = fillDays(weights.filter(([date, weight]) => weight > 0 && date <= today));
  withMuscle = addMuscle(days);
  projectedAdjusted = project(
    withMuscle.map((d) => ({ ...d, weight: d.weight - d.muscleTotal })),
    90,
    90,
  );
  ({ fit, future } = project(days, 90, 90));
  dailyRows = buildRows(withMuscle, DAILY_WINDOWS, 1);

  return { dailyRows, fit, future, withMuscle };
}

export type Model = ReturnType<typeof setWeights>;

const DAILY_WINDOWS = { short: 3, medium: 30, long: 365 };

/** Add the averages, rates and projections to every day. */
const weightColumns = (averages: Averages, all: number, proj: number | null, proj3: number | null) =>
  [averages.avg3, averages.avg30, averages.avg365, averages.blended, yearly(averages.blended, averages.monthly), all, proj, proj3];

/** Weight now plus 12 times the monthly change, i.e. where it lands in a year. */
const project12 = (weight: number | null, monthly: number | null) => (weight === null || monthly === null ? null : weight + 12 * monthly);

/** Sum of two values, or null when either is missing. */
const add = (a: number | null, b: number | null) => (a === null || b === null ? null : a + b);

/** Half of a value, or null when it is missing. */
const half = (value: number | null) => (value === null ? null : value / 2);

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
  const recent = avg3.map((_unused, index) => recentRate(avg3, index, step));
  const recentAdj = avg3Adj.map((_unused, index) => recentRate(avg3Adj, index, step));
  const weightWma = baseRows.map((_unused, index) => weightedAverage(baseRows.map((r) => r.weight), index, Math.round(14 / step)));
  const weightWmaAdj = baseRows.map((_unused, index) => weightedAverage(baseRows.map((r) => r.weight - r.muscleTotal), index, Math.round(14 / step)));
  const recent3s = recent.map((_unused, index) => last3(recent, index));
  const recent3sAdj = recentAdj.map((_unused, index) => last3(recentAdj, index));

  const recentWma = recent3s.map((_unused, index) => weightedAverage(recent3s, index, Math.round(14 / step)));
  const recentWmaAdj = recent3sAdj.map((_unused, index) => weightedAverage(recent3sAdj, index, Math.round(14 / step)));

  const wmaProj = weightWma.map((w, index) => project12(w, recentWma[index]));
  const wmaProjAdj = weightWmaAdj.map((w, index) => project12(w, recentWmaAdj[index]));
  const wmaLoss = wmaProj.map((_unused, index) => recentRate(wmaProj, index, step));
  const wmaLossAdj = wmaProjAdj.map((_unused, index) => recentRate(wmaProjAdj, index, step));
  const wmaProj2 = wmaProj.map((w, index) => add(w, wmaLoss[index]));
  const wmaProj2Adj = wmaProjAdj.map((w, index) => add(w, wmaLossAdj[index]));

  // Attach the rates and averages to each day.
  const withRates = baseRows.map((baseRow, index) => ({
    ...baseRow,
    recent: recent[index],
    recentAdj: recentAdj[index],
    recent3: recent3s[index],
    recent3Adj: recent3sAdj[index],
    recentWma: recentWma[index],
    recentWmaAdj: recentWmaAdj[index],
    weightWma: weightWma[index],
    weightWmaAdj: weightWmaAdj[index],
    wmaProj: wmaProj[index],
    wmaProjAdj: wmaProjAdj[index],
    wmaLoss: wmaLoss[index],
    wmaLossAdj: wmaLossAdj[index],
    wmaProj2: wmaProj2[index],
    wmaProj2Adj: wmaProj2Adj[index],
    wmaAvg: half(add(wmaProj[index], wmaProj2[index])),
    wmaAvgAdj: half(add(wmaProjAdj[index], wmaProj2Adj[index])),
    allAvg: allActual[index],
    allAvgAdj: allAdjusted[index],
    allProj: projActual[index],
    allProjAdj: projAdjusted[index],
    allProj3: last3(projActual, index),
    allProj3Adj: last3(projAdjusted, index),
    complete: completeAverage([baseRow.weight, ...weightColumns(baseRow, allActual[index], projActual[index], last3(projActual, index))]),
    completeAdj: completeAverage([baseRow.weight - baseRow.muscleTotal, ...weightColumns(baseRow.adj, allAdjusted[index], projAdjusted[index], last3(projAdjusted, index))]),
  }));

  // Last column: the complete average and the WMA Projection Projected, averaged together.
  return withRates.map((r) => ({
    ...r,
    finalAvg: half(add(r.complete, r.wmaAvg)),
    finalAvgAdj: half(add(r.completeAdj, r.wmaAvgAdj)),
  }));
}

export type Row = ReturnType<typeof buildRows>[number];

/**
 * Weight minus the muscle gained and the extra fat that muscle allows (`ratio` lb of fat per lb of muscle),
 * with the same averages, quadratic projection and 3 day projected all average as the other series.
 */
export function buildFat(ratio: number, rows: typeof withMuscle) {
  const series = rows.map((d) => ({ ...d, weight: d.weight - d.muscleTotal * (1 + ratio) }));
  const averages = addAverages(series, DAILY_WINDOWS, 1);
  const allAvg = averages.map((a) => allAverage(a));
  const projAll = allAvg.map((_unused, index) => projectAll(allAvg, index, DAILY_WINDOWS.medium, 1));

  return {
    ratio,
    rows: averages.map((a, index) => ({ date: a.date, avg3: a.avg3, allProj3: last3(projAll, index) })),
    ...project(series, 90, 90),
  };
}

export type Fat = ReturnType<typeof buildFat>;
