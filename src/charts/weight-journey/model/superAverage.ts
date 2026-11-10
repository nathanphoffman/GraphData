import { completeAverage, yearly } from "./averages";
import type { WeightRow } from "./rows";

/**
 * Mean of every weight-style column in the table plus Health.
 * Left out: the monthly weight loss changes, blood pressure and muscle gain.
 * Columns with no value yet are skipped.
 */
export function superAverageOf(row: WeightRow): number {
  return completeAverage([
    row.weight,
    row.weightWma,
    row.avg3,
    row.avg30,
    row.avg365,
    row.blended,
    yearly(row.blended, row.monthly),
    row.allAvg,
    row.allProj,
    row.allProj3,
    row.complete,
    row.wmaProj,
    row.wmaAvg,
    row.finalAvg,
    row.finalAvg3,
    row.health,
  ]);
}

/** Same as superAverageOf, but on the muscle-adjusted columns. Health already has the muscle taken off, so it is used as is. */
export function superAverageAdjustedOf(row: WeightRow): number {
  return completeAverage([
    row.weight - row.muscleTotal,
    row.weightWmaAdj,
    row.adj.avg3,
    row.adj.avg30,
    row.adj.avg365,
    row.adj.blended,
    yearly(row.adj.blended, row.adj.monthly),
    row.allAvgAdj,
    row.allProjAdj,
    row.allProj3Adj,
    row.completeAdj,
    row.wmaProjAdj,
    row.wmaAvgAdj,
    row.finalAvgAdj,
    row.finalAvg3Adj,
    row.health,
  ]);
}
