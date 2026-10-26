import { scaleLinear, scaleTime } from "d3-scale";
import type { Day, projectTapering } from "../calculate";
import type { AllTrend, General, Point, Spread } from "./curves";
import { type Fat, dailyRows, days, fit, future, projectedAdjusted } from "./rows";
import { toDate } from "./units";

export const CHART_WIDTH = 1000;
export const CHART_HEIGHT = 420;
export const M = { top: 16, right: 20, bottom: 32, left: 48 };

export type Tapered = ReturnType<typeof projectTapering>;

export interface ChartInput {
  rangeDays: number;
  k: number;
  tapered: Tapered | null;
  allTrend: AllTrend | null;
  spread: Spread | null;
  general: General | null;
  fat: Fat | null;
}

/** SVG path for a list of points. */
export function line(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join("");
}

/** Every weight the chart has to fit (in lb), so the y axis can be sized to it. */
function allWeights(shown: Point[], shownFuture: Point[], { tapered, allTrend, spread, fat }: ChartInput) {
  const spreadEnds = spread ? [spread.actual, spread.adjusted].flatMap((g) => [...g.curves[0].points, ...g.curves[g.curves.length - 1].points]) : [];
  const shownAvg = dailyRows.filter((dailyRow) => dailyRow.date >= shown[0].date).map((dailyRow) => ({ weight: dailyRow.adj.avg3 }));

  return [
    ...shown,
    ...shownFuture,
    ...projectedAdjusted.future,
    ...(tapered ?? []).flatMap((targetPoint) => [{ weight: targetPoint.weight }, { weight: targetPoint.adjusted }]),
    ...(allTrend ? allTrend.trends.flatMap((trend) => [...trend.actual, ...trend.adjusted]) : []),
    ...spreadEnds,
    ...(fat ? [...fat.future, ...fat.rows.filter((r) => r.date >= shown[0].date).map((r) => ({ weight: r.avg3 }))] : []),
    ...(tapered && fat ? tapered.map((targetPoint) => ({ weight: targetPoint.weight - targetPoint.muscle * (1 + fat.ratio) })) : []),
    ...(allTrend ? allTrend.trends.flatMap((trend) => trend.fat ?? []) : []),
    ...shownAvg,
  ].map((d) => d.weight);
}

/** Pick the date and weight scales so the chart fits the data being shown. */
function buildScales(shown: Point[], shownFuture: Point[], input: ChartInput) {
  const { allTrend, spread, k } = input;
  const lastDates = [shownFuture[shownFuture.length - 1].date, allTrend?.date ?? "", spread ? spread.actual.mean[spread.actual.mean.length - 1].date : ""];
  const xScale = scaleTime().domain([toDate(shown[0].date), toDate(lastDates.sort().pop()!)]).range([M.left, CHART_WIDTH - M.right]);
  const weights = allWeights(shown, shownFuture, input).map((width) => width * k);
  const yScale = scaleLinear()
    .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
    .range([CHART_HEIGHT - M.bottom, M.top]);

  return { x: xScale, y: yScale };
}

/** Curves closer than this count as this far apart, so the shading stays finite. */
const MIN_GAP = 0.1;

/** A band is at least this opaque, and up to this much more where the curves bunch together. */
const BAND_OPACITY_BASE = 0.06;
const BAND_OPACITY_RANGE = 0.5;

type Pt = (point: Point) => { x: number; y: number };

/** Shaded bands between neighbouring curves: the closer two curves sit at the end, the more opaque the band (that's where the projections concentrate). */
function shade(g: Spread["actual"], point: Pt) {
  const gaps = g.curves.slice(1).map((curve, index) => Math.max(Math.abs(curve.target - g.curves[index].target), MIN_GAP));
  const densest = Math.max(...gaps.map((gap) => 1 / gap));

  return {
    // Shade the gap between each pair of neighbouring curves.
    bands: gaps.map((gap, index) => {
      const a = g.curves[index].points.map(point);
      const b = g.curves[index + 1].points.map(point).reverse();

      return { d: `${line(a)}L${line(b).slice(1)}Z`, opacity: BAND_OPACITY_BASE + (BAND_OPACITY_RANGE * (1 / gap)) / densest };
    }),
    best: line(g.curves[0].points.map(point)),
    worst: line(g.curves[g.curves.length - 1].points.map(point)),
    mean: line(g.mean.map(point)),
  };
}

/** Paths for the lines that follow the weight data itself (not the projections). */
function actualLines(shown: Day[], point: Pt) {
  const shownAvg = dailyRows.filter((dailyRow) => dailyRow.date >= shown[0].date);
  const firstShown = shown[0].date;

  return {
    actual: line(shown.map(point)),
    avg3: line(shownAvg.map((d) => point({ date: d.date, weight: d.avg3 }))),
    avg3Adjusted: line(shownAvg.map((d) => point({ date: d.date, weight: d.adj.avg3 }))),
    fitAdjusted: line(projectedAdjusted.fit.filter((projection) => projection.date >= firstShown).map(point)),
    fit: line(fit.filter((projection) => projection.date >= firstShown).map(point)),
    measured: shown.filter((d) => !d.estimated).map(point),
  };
}

/** Paths for the quadratic projections and the "general" blend of them. */
function projectionLines(point: Pt, general: General | null) {
  return {
    futureAdjusted: line([point(projectedAdjusted.fit[projectedAdjusted.fit.length - 1]), ...projectedAdjusted.future.map(point)]),
    future: line([point(fit[fit.length - 1]), ...future.map(point)]),
    general: general ? line(general.map(point)) : "",
  };
}

/** Paths for the muscle-and-fat-adjusted series: 3-day average, quadratic fit and projection, and the tapering projection. */
function fatLines(shown: Day[], point: Pt, fat: Fat | null, tapered: Tapered | null) {
  if (!fat) return { avg3Fat: "", fitFat: "", futureFat: "", taperFat: "" };
  const firstShown = shown[0].date;
  const shownAvg = fat.rows.filter((r) => r.date >= firstShown);
  const lastFit = fat.fit[fat.fit.length - 1];
  const lastAvg = fat.rows[fat.rows.length - 1];

  return {
    avg3Fat: line(shownAvg.map((r) => point({ date: r.date, weight: r.avg3 }))),
    fitFat: line(fat.fit.filter((projection) => projection.date >= firstShown).map(point)),
    futureFat: line([point(lastFit), ...fat.future.map(point)]),
    taperFat: tapered
      ? line([point({ date: lastAvg.date, weight: lastAvg.avg3 }), ...tapered.map((targetPoint) => point({ date: targetPoint.date, weight: targetPoint.weight - targetPoint.muscle * (1 + fat.ratio) }))])
      : "",
  };
}

/** Paths for the tapering projection from the user's monthly loss. */
function taperLines(point: Pt, tapered: Tapered | null) {
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
  const pt: Pt = (point) => ({ x: x(toDate(point.date)), y: y(point.weight * k) });

  return {
    x,
    y,
    ...actualLines(shown, pt),
    ...projectionLines(pt, general),
    ...taperLines(pt, tapered),
    ...fatLines(shown, pt, fat, tapered),
    spread: spread ? { actual: shade(spread.actual, pt), adjusted: shade(spread.adjusted, pt) } : null,
    allTrends: (allTrend?.trends ?? []).map((t) => ({ back: t.back, actual: line(t.actual.map(pt)), adjusted: line(t.adjusted.map(pt)), fat: t.fat ? line(t.fat.map(pt)) : "" })),
  };
}
