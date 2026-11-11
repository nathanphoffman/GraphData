import type { DayWeight } from "../../calculate";
import type { General, Point } from "../curves";
import { dailyRows, type FatProjection, fittedCurve, future, projectedAdjusted } from "../rows";
import type { PointMapper, Tapered } from "./chart_types";

/** SVG path for a list of points. */
export function line(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join("");
}

/** The Health score of each shown day that has one, as a point on the weight axis. */
export const healthPoints = (firstShown: string): Point[] =>
  dailyRows
    .filter((dailyRow) => dailyRow.date >= firstShown)
    .flatMap((dailyRow) => (dailyRow.health === null ? [] : [{ date: dailyRow.date, weight: dailyRow.health }]));

/** Paths for the lines that follow the weight data itself (not the projections). */
export function actualLines(shown: DayWeight[], point: PointMapper) {
  const shownAvg = dailyRows.filter((dailyRow) => dailyRow.date >= shown[0].date);
  const firstShown = shown[0].date;

  return {
    actual: line(shown.map(point)),
    health: line(healthPoints(firstShown).map(point)),
    avg3: line(shownAvg.map((averageRow) => point({ date: averageRow.date, weight: averageRow.avg3 }))),
    avg3Adjusted: line(shownAvg.map((averageRow) => point({ date: averageRow.date, weight: averageRow.adj.avg3 }))),
    fitAdjusted: line(projectedAdjusted.fit.filter((projection) => projection.date >= firstShown).map(point)),
    fit: line(fittedCurve.filter((projection) => projection.date >= firstShown).map(point)),
    measured: shown.filter((dayRecord) => !dayRecord.estimated).map(point),
  };
}

/** Paths for the quadratic projections and the "general" blend of them. */
export function projectionLines(point: PointMapper, general: General | null) {
  return {
    futureAdjusted: line([
      point(projectedAdjusted.fit[projectedAdjusted.fit.length - 1]),
      ...projectedAdjusted.future.map(point),
    ]),
    future: line([point(fittedCurve[fittedCurve.length - 1]), ...future.map(point)]),
    general: general ? line(general.map(point)) : "",
  };
}

/** Paths for the muscle-and-fat-adjusted series: 3-day average, quadratic fit and projection, and the tapering projection. */
export function fatLines(
  shown: DayWeight[],
  point: PointMapper,
  fatProjection: FatProjection | null,
  tapered: Tapered | null,
) {
  if (!fatProjection) return { avg3Fat: "", fitFat: "", futureFat: "", taperFat: "" };
  const firstShown = shown[0].date;
  const shownAvg = fatProjection.rows.filter((fatRow) => fatRow.date >= firstShown);
  const lastFit = fatProjection.fit[fatProjection.fit.length - 1];
  const lastAvg = fatProjection.rows[fatProjection.rows.length - 1];

  return {
    avg3Fat: line(shownAvg.map((fatRow) => point({ date: fatRow.date, weight: fatRow.avg3 }))),
    fitFat: line(fatProjection.fit.filter((projection) => projection.date >= firstShown).map(point)),
    futureFat: line([point(lastFit), ...fatProjection.future.map(point)]),
    taperFat: tapered
      ? line([
          point({ date: lastAvg.date, weight: lastAvg.avg3 }),
          ...tapered.map((targetPoint) =>
            point({
              date: targetPoint.date,
              weight: targetPoint.weight - targetPoint.muscle * (1 + fatProjection.ratio),
            }),
          ),
        ])

      : "",
  };
}

/** Paths for the tapering projection from the user's monthly loss. */
export function taperLines(point: PointMapper, tapered: Tapered | null) {
  if (!tapered) return { taper: "", taperAdjusted: "" };
  const lastRow = dailyRows[dailyRows.length - 1];
  const anchor = point({ date: lastRow.date, weight: lastRow.avg3 });
  const anchorAdjusted = point({ date: lastRow.date, weight: lastRow.adj.avg3 });

  return {
    taper: line([anchor, ...tapered.map(point)]),
    taperAdjusted: line([
      anchorAdjusted,
      ...tapered.map((targetPoint) => point({ date: targetPoint.date, weight: targetPoint.adjusted })),
    ]),
  };
}
