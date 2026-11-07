import { yearly } from "../../../model/averages";
import { band, deltaBand, healthBand } from "../../../model/bands";
import type { WeightRow } from "../../../model/rows";
import type { Show } from "./showGroups";

/** Band colours of the values in the columns on screen (actual and muscle-adjusted); the weight is always shown. */
export function bandColors(tableRow: WeightRow, show: Show) {
  // The colour band of each weight in the actual list, then in the muscle-adjusted list.
  const weightClasses = (actual: (number | null)[], adjusted: (number | null)[]) => [
    ...actual.map((weight) => band(weight, false)),
    ...adjusted.map((weight) => band(weight, true)),
  ];

  const changeClasses = (...values: (number | null)[]) => values.map(deltaBand);

  return [
    band(tableRow.weight, false),
    healthBand(tableRow.health),
    band(tableRow.finalAvg, false),
    band(tableRow.finalAvgAdj, true),
    band(tableRow.finalAvg3, false),
    band(tableRow.finalAvg3Adj, true),
    ...(show.dayAverages
      ? [
          ...weightClasses(
            [
              tableRow.avg3,
              tableRow.avg30,
              tableRow.avg365,
              tableRow.blended,
              yearly(tableRow.blended, tableRow.monthly),
            ],
            [
              tableRow.adj.avg3,
              tableRow.adj.avg30,
              tableRow.adj.avg365,
              tableRow.adj.blended,
              yearly(tableRow.adj.blended, tableRow.adj.monthly),
            ],
          ),
          ...changeClasses(tableRow.monthly, tableRow.adj.monthly),
        ]

      : []),
    // Only colour the weight loss columns when they are shown.
    ...(show.weightLoss
      ? changeClasses(tableRow.recent, tableRow.recent3, tableRow.recentAdj, tableRow.recent3Adj)
      : []),
    ...(show.allAverages
      ? weightClasses(
          [tableRow.allAvg, tableRow.allProj, tableRow.allProj3, tableRow.complete],
          [tableRow.allAvgAdj, tableRow.allProjAdj, tableRow.allProj3Adj, tableRow.completeAdj],
        )

      : []),
    ...(show.wma
      ? [
          ...weightClasses(
            [tableRow.weightWma, tableRow.wmaProj, tableRow.wmaAvg],
            [tableRow.weightWmaAdj, tableRow.wmaProjAdj, tableRow.wmaAvgAdj],
          ),
          ...changeClasses(tableRow.recentWma, tableRow.recentWmaAdj),
        ]

      : []),
  ];
}
