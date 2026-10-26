import { type Averages, type DayWeight, type Muscle, type Projection, addAverages, addMuscle, fillDays, project } from "../calculate";
import { FIT_AHEAD_DAYS, FIT_DAYS, MONTHS_PER_YEAR, SMOOTHING_DAYS } from "../constants";
import { allAverage, completeAverage, last3, projectAll, recentRate, weightedAverage, yearly } from "./averages";

// Everything below is filled in by setWeights once the weights have been fetched from the API.
export let days: DayWeight[] = [];
export let withMuscle: (DayWeight & Muscle)[] = [];
export let projectedAdjusted: { fit: Projection[]; future: Projection[] } = { fit: [], future: [] };
export let fittedCurve: Projection[] = [];
export let future: Projection[] = [];
export let dailyRows: WeightRow[] = [];

/** Build the days, muscle, projections and daily rows from the weigh-ins; returns the parts the hooks depend on. */
export function setWeights(weights: [string, number][]) {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  // Placeholder rows (weight 0) and future dates are skipped.
  days = fillDays(weights.filter(([date, weight]) => weight > 0 && date <= today));
  withMuscle = addMuscle(days);
  projectedAdjusted = project(
    withMuscle.map((dayRecord) => ({ ...dayRecord, weight: dayRecord.weight - dayRecord.muscleTotal })),
    FIT_DAYS,
    FIT_AHEAD_DAYS,
  );
  ({ fit: fittedCurve, future } = project(days, FIT_DAYS, FIT_AHEAD_DAYS));
  dailyRows = buildRows(withMuscle, DAILY_WINDOWS, 1);

  return { dailyRows, fit: fittedCurve, future, withMuscle };
}

export type Model = ReturnType<typeof setWeights>;

const DAILY_WINDOWS = { short: 3, medium: 30, long: 365 };

/** Add the averages, rates and projections to every day. */
const weightColumns = (averages: Averages, allAverageValue: number, proj: number | null, proj3: number | null) =>
  [averages.avg3, averages.avg30, averages.avg365, averages.blended, yearly(averages.blended, averages.monthly), allAverageValue, proj, proj3];

/** Weight now plus 12 times the monthly change, i.e. where it lands in a year. */
const project12 = (weight: number | null, monthly: number | null) => (weight === null || monthly === null ? null : weight + MONTHS_PER_YEAR * monthly);

/** Sum of two values, or null when either is missing. */
const addOrNull = (first: number | null, second: number | null) => (first === null || second === null ? null : first + second);

/** Half of a value, or null when it is missing. */
const half = (value: number | null) => (value === null ? null : value / 2);

/** The weight columns that are averaged into the complete average. */
function buildRows(rows: typeof withMuscle, windows: typeof DAILY_WINDOWS, step: number) {
  const actual = addAverages(rows, windows, step);
  const smoothingRows = Math.round(SMOOTHING_DAYS / step);

  // Same averages again on weight minus the muscle gained so far.
  const adjusted = addAverages(rows.map((dayRecord) => ({ ...dayRecord, weight: dayRecord.weight - dayRecord.muscleTotal })), windows, step);
  const baseRows = actual.map((dayRecord, index) => ({ ...dayRecord, adj: adjusted[index] }));
  const allActual = baseRows.map((baseRow) => allAverage(baseRow));
  const allAdjusted = baseRows.map((baseRow) => allAverage(baseRow.adj));
  const projActual = allActual.map((_unused, index) => projectAll(allActual, index, windows.medium, step));
  const projAdjusted = allAdjusted.map((_unused, index) => projectAll(allAdjusted, index, windows.medium, step));
  const avg3 = baseRows.map((baseRow) => baseRow.avg3);
  const avg3Adj = baseRows.map((baseRow) => baseRow.adj.avg3);
  const recent = avg3.map((_unused, index) => recentRate(avg3, index, step));
  const recentAdj = avg3Adj.map((_unused, index) => recentRate(avg3Adj, index, step));
  // Weighted moving average of the weight for each row, using the last few rows.
  const weightWma = baseRows.map((_unused, index) => weightedAverage(baseRows.map((tableRow) => tableRow.weight), index, smoothingRows));
  // The same with the muscle gained so far taken off the weight.
  const weightWmaAdj = baseRows.map((_unused, index) => weightedAverage(baseRows.map((tableRow) => tableRow.weight - tableRow.muscleTotal), index, smoothingRows));
  const recent3s = recent.map((_unused, index) => last3(recent, index));
  const recent3sAdj = recentAdj.map((_unused, index) => last3(recentAdj, index));

  const recentWma = recent3s.map((_unused, index) => weightedAverage(recent3s, index, smoothingRows));
  const recentWmaAdj = recent3sAdj.map((_unused, index) => weightedAverage(recent3sAdj, index, smoothingRows));

  const wmaProj = weightWma.map((weight, index) => project12(weight, recentWma[index]));
  const wmaProjAdj = weightWmaAdj.map((weight, index) => project12(weight, recentWmaAdj[index]));
  const wmaLoss = wmaProj.map((_unused, index) => recentRate(wmaProj, index, step));
  const wmaLossAdj = wmaProjAdj.map((_unused, index) => recentRate(wmaProjAdj, index, step));
  const wmaProj2 = wmaProj.map((weight, index) => addOrNull(weight, wmaLoss[index]));
  const wmaProj2Adj = wmaProjAdj.map((weight, index) => addOrNull(weight, wmaLossAdj[index]));

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
    wmaAvg: half(addOrNull(wmaProj[index], wmaProj2[index])),
    wmaAvgAdj: half(addOrNull(wmaProjAdj[index], wmaProj2Adj[index])),
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
  return withRates.map((tableRow) => ({
    ...tableRow,
    finalAvg: half(addOrNull(tableRow.complete, tableRow.wmaAvg)),
    finalAvgAdj: half(addOrNull(tableRow.completeAdj, tableRow.wmaAvgAdj)),
  }));
}

export type WeightRow = ReturnType<typeof buildRows>[number];

/**
 * Weight minus the muscle gained and the extra fat that muscle allows (`ratio` lb of fat per lb of muscle),
 * with the same averages, quadratic projection and 3 day projected all average as the other series.
 */
export function buildFat(ratio: number, rows: typeof withMuscle) {
  const series = rows.map((dayRecord) => ({ ...dayRecord, weight: dayRecord.weight - dayRecord.muscleTotal * (1 + ratio) }));
  const averages = addAverages(series, DAILY_WINDOWS, 1);
  const allAvg = averages.map((averageRow) => allAverage(averageRow));
  const projAll = allAvg.map((_unused, index) => projectAll(allAvg, index, DAILY_WINDOWS.medium, 1));

  return {
    ratio,
    rows: averages.map((averageRow, index) => ({ date: averageRow.date, avg3: averageRow.avg3, allProj3: last3(projAll, index) })),
    ...project(series, FIT_DAYS, FIT_AHEAD_DAYS),
  };
}

export type FatProjection = ReturnType<typeof buildFat>;
