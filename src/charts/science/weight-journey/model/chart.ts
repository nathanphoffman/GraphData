import { scaleLinear, scaleTime } from "d3-scale";
import type { DayWeight, projectTapering } from "../calculate";
import type { AllTrend, General, Point, Spread } from "./curves";
import { type FatProjection, dailyRows, days, fittedCurve, future, projectedAdjusted } from "./rows";
import { toDate } from "./units";

export const CHART_WIDTH = 1000;
export const CHART_HEIGHT = 420;
export const CHART_MARGIN = { top: 16, right: 20, bottom: 32, left: 48 };

export type Tapered = ReturnType<typeof projectTapering>;

export interface ChartInput {
  rangeDays: number;
  k: number;
  tapered: Tapered | null;
  allTrend: AllTrend | null;
  spread: Spread | null;
  general: General | null;
  fat: FatProjection | null;
}

/** SVG path for a list of points. */
export function line(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join("");
}

/** Every weight the chart has to fit (in lb), so the y axis can be sized to it. */
function allWeights(shown: Point[], shownFuture: Point[], { tapered, allTrend, spread, fat: fatProjection }: ChartInput) {
  const spreadEnds = spread ? [spread.actual, spread.adjusted].flatMap((spreadSide) => [...spreadSide.curves[0].points, ...spreadSide.curves[spreadSide.curves.length - 1].points]) : [];
  const shownAvg = dailyRows.filter((dailyRow) => dailyRow.date >= shown[0].date).map((dailyRow) => ({ weight: dailyRow.adj.avg3 }));

  return [
    ...shown,
    ...shownFuture,
    ...projectedAdjusted.future,
    ...(tapered ?? []).flatMap((targetPoint) => [{ weight: targetPoint.weight }, { weight: targetPoint.adjusted }]),
    ...(allTrend ? allTrend.trends.flatMap((trend) => [...trend.actual, ...trend.adjusted]) : []),
    ...spreadEnds,
    // When the fat curves are on, include their future points and the 3-day averages in view, so the chart fits them.
    ...(fatProjection ? [...fatProjection.future, ...fatProjection.rows.filter((fatRow) => fatRow.date >= shown[0].date).map((fatRow) => ({ weight: fatRow.avg3 }))] : []),
    ...(tapered && fatProjection ? tapered.map((targetPoint) => ({ weight: targetPoint.weight - targetPoint.muscle * (1 + fatProjection.ratio) })) : []),
    ...(allTrend ? allTrend.trends.flatMap((trend) => trend.fat ?? []) : []),
    ...shownAvg,
  ].map((point) => point.weight);
}

/** Pick the date and weight scales so the chart fits the data being shown. */
function buildScales(shown: Point[], shownFuture: Point[], input: ChartInput) {
  const { allTrend, spread, k } = input;
  const lastDates = [shownFuture[shownFuture.length - 1].date, allTrend?.date ?? "", spread ? spread.actual.mean[spread.actual.mean.length - 1].date : ""];
  const xScale = scaleTime().domain([toDate(shown[0].date), toDate(lastDates.sort().pop()!)]).range([CHART_MARGIN.left, CHART_WIDTH - CHART_MARGIN.right]);
  const weights = allWeights(shown, shownFuture, input).map((width) => width * k);
  const yScale = scaleLinear()
    .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
    .range([CHART_HEIGHT - CHART_MARGIN.bottom, CHART_MARGIN.top]);

  return { x: xScale, y: yScale };
}

/** Curves closer than this count as this far apart, so the shading stays finite. */
const MIN_GAP = 0.1;

/** A band is at least this opaque, and up to this much more where the curves bunch together. */
const BAND_OPACITY_BASE = 0.06;
const BAND_OPACITY_RANGE = 0.5;

type PointMapper = (point: Point) => { x: number; y: number };

/** Shaded bands between neighbouring curves: the closer two curves sit at the end, the more opaque the band (that's where the projections concentrate). */
function shade(spreadSide: Spread["actual"], point: PointMapper) {
  const gaps = spreadSide.curves.slice(1).map((curve, index) => Math.max(Math.abs(curve.target - spreadSide.curves[index].target), MIN_GAP));
  const densest = Math.max(...gaps.map((curveGap) => 1 / curveGap));

  return {
    // Shade the gap between each pair of neighbouring curves.
    bands: gaps.map((curveGap, index) => {
      const firstEdge = spreadSide.curves[index].points.map(point);
      const secondEdge = spreadSide.curves[index + 1].points.map(point).reverse();

      return { d: `${line(firstEdge)}L${line(secondEdge).slice(1)}Z`, opacity: BAND_OPACITY_BASE + (BAND_OPACITY_RANGE * (1 / curveGap)) / densest };
    }),
    best: line(spreadSide.curves[0].points.map(point)),
    worst: line(spreadSide.curves[spreadSide.curves.length - 1].points.map(point)),
    mean: line(spreadSide.mean.map(point)),
  };
}

/** Paths for the lines that follow the weight data itself (not the projections). */
function actualLines(shown: DayWeight[], point: PointMapper) {
  const shownAvg = dailyRows.filter((dailyRow) => dailyRow.date >= shown[0].date);
  const firstShown = shown[0].date;

  return {
    actual: line(shown.map(point)),
    avg3: line(shownAvg.map((averageRow) => point({ date: averageRow.date, weight: averageRow.avg3 }))),
    avg3Adjusted: line(shownAvg.map((averageRow) => point({ date: averageRow.date, weight: averageRow.adj.avg3 }))),
    fitAdjusted: line(projectedAdjusted.fit.filter((projection) => projection.date >= firstShown).map(point)),
    fit: line(fittedCurve.filter((projection) => projection.date >= firstShown).map(point)),
    measured: shown.filter((dayRecord) => !dayRecord.estimated).map(point),
  };
}

/** Paths for the quadratic projections and the "general" blend of them. */
function projectionLines(point: PointMapper, general: General | null) {
  return {
    futureAdjusted: line([point(projectedAdjusted.fit[projectedAdjusted.fit.length - 1]), ...projectedAdjusted.future.map(point)]),
    future: line([point(fittedCurve[fittedCurve.length - 1]), ...future.map(point)]),
    general: general ? line(general.map(point)) : "",
  };
}

/** Paths for the muscle-and-fat-adjusted series: 3-day average, quadratic fit and projection, and the tapering projection. */
function fatLines(shown: DayWeight[], point: PointMapper, fatProjection: FatProjection | null, tapered: Tapered | null) {
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
      ? line([point({ date: lastAvg.date, weight: lastAvg.avg3 }), ...tapered.map((targetPoint) => point({ date: targetPoint.date, weight: targetPoint.weight - targetPoint.muscle * (1 + fatProjection.ratio) }))])
      : "",
  };
}

/** Paths for the tapering projection from the user's monthly loss. */
function taperLines(point: PointMapper, tapered: Tapered | null) {
  if (!tapered) return { taper: "", taperAdjusted: "" };
  const lastRow = dailyRows[dailyRows.length - 1];
  const anchor = point({ date: lastRow.date, weight: lastRow.avg3 });
  const anchorAdjusted = point({ date: lastRow.date, weight: lastRow.adj.avg3 });

  return {
    taper: line([anchor, ...tapered.map(point)]),
    taperAdjusted: line([anchorAdjusted, ...tapered.map((targetPoint) => point({ date: targetPoint.date, weight: targetPoint.adjusted }))]),
  };
}

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
    allTrends: (allTrend?.trends ?? []).map((trend) => ({ back: trend.back, actual: line(trend.actual.map(mapPoint)), adjusted: line(trend.adjusted.map(mapPoint)), fat: trend.fat ? line(trend.fat.map(mapPoint)) : "" })),
  };
}
