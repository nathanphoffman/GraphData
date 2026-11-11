import { days, future } from "../rows";
import { toDate } from "../units";
import type { ChartInput, PointMapper } from "./chart_types";
import { actualLines, fatLines, line, projectionLines, taperLines } from "./lines";
import { buildScales } from "./scales";
import { shade } from "./shading";

/** Work out everything the chart draws (scales, paths, dots) for the chosen range and options. */
export function buildChart(input: ChartInput) {
  const { rangeDays, k, tapered, allTrend, spread, general, fat } = input;
  const shown = days.slice(-Math.min(rangeDays, days.length));
  const shownFuture = tapered ? [...future, ...tapered] : future;
  const { x, y } = buildScales(shown, shownFuture, input);

  const mapPoint: PointMapper = (point) => ({ x: x(toDate(point.date)), y: y(point.weight * k) });

  return {
    x,
    y,
    ...actualLines(shown, mapPoint),
    ...projectionLines(mapPoint, general),
    ...taperLines(mapPoint, tapered),
    ...fatLines(shown, mapPoint, fat, tapered),
    spread: spread ? { actual: shade(spread.actual, mapPoint), adjusted: shade(spread.adjusted, mapPoint) } : null,
    allTrends: (allTrend?.trends ?? []).map((trend) => ({
      back: trend.back,
      actual: line(trend.actual.map(mapPoint)),
      adjusted: line(trend.adjusted.map(mapPoint)),
      fat: trend.fat ? line(trend.fat.map(mapPoint)) : "",
    })),
  };
}
