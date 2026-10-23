import { scaleLinear, scaleTime } from "d3-scale";
import type { Day, projectTapering } from "../calculate";
import type { AllTrend, General, Point, Spread } from "./curves";
import { dailyRows, days, fit, future, projectedAdjusted } from "./rows";
import { toDate } from "./units";

export const W = 1000;
export const H = 420;
export const M = { top: 16, right: 20, bottom: 32, left: 48 };

export type Tapered = ReturnType<typeof projectTapering>;

export interface ChartInput {
  rangeDays: number;
  k: number;
  tapered: Tapered | null;
  allTrend: AllTrend | null;
  spread: Spread | null;
  general: General | null;
}

export function line(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
}

/** Every weight the chart has to fit (in lb), so the y axis can be sized to it. */
function allWeights(shown: Point[], shownFuture: Point[], { tapered, allTrend, spread }: ChartInput) {
  const spreadEnds = spread ? [spread.actual, spread.adjusted].flatMap((g) => [...g.curves[0].points, ...g.curves[g.curves.length - 1].points]) : [];
  const shownAvg = dailyRows.filter((d) => d.date >= shown[0].date).map((d) => ({ weight: d.adj.avg3 }));
  return [
    ...shown,
    ...shownFuture,
    ...projectedAdjusted.future,
    ...(tapered ?? []).flatMap((d) => [{ weight: d.weight }, { weight: d.adjusted }]),
    ...(allTrend ? allTrend.trends.flatMap((t) => [...t.actual, ...t.adjusted]) : []),
    ...spreadEnds,
    ...shownAvg,
  ].map((d) => d.weight);
}

function buildScales(shown: Point[], shownFuture: Point[], input: ChartInput) {
  const { allTrend, spread, k } = input;
  const lastDates = [shownFuture[shownFuture.length - 1].date, allTrend?.date ?? "", spread ? spread.actual.mean[spread.actual.mean.length - 1].date : ""];
  const x = scaleTime().domain([toDate(shown[0].date), toDate(lastDates.sort().pop()!)]).range([M.left, W - M.right]);
  const weights = allWeights(shown, shownFuture, input).map((w) => w * k);
  const y = scaleLinear()
    .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
    .range([H - M.bottom, M.top]);
  return { x, y };
}

type Pt = (d: Point) => { x: number; y: number };

/** Shaded bands between neighbouring curves: the closer two curves sit at the end, the more opaque the band (that's where the projections concentrate). */
function shade(g: Spread["actual"], pt: Pt) {
  const gaps = g.curves.slice(1).map((c, i) => Math.max(Math.abs(c.target - g.curves[i].target), 0.1));
  const densest = Math.max(...gaps.map((gap) => 1 / gap));
  return {
    bands: gaps.map((gap, i) => {
      const a = g.curves[i].points.map(pt);
      const b = g.curves[i + 1].points.map(pt).reverse();
      return { d: `${line(a)}L${line(b).slice(1)}Z`, opacity: 0.06 + (0.5 * (1 / gap)) / densest };
    }),
    best: line(g.curves[0].points.map(pt)),
    worst: line(g.curves[g.curves.length - 1].points.map(pt)),
    mean: line(g.mean.map(pt)),
  };
}

/** Paths for the lines that follow the weight data itself (not the projections). */
function actualLines(shown: Day[], pt: Pt) {
  const shownAvg = dailyRows.filter((d) => d.date >= shown[0].date);
  const firstShown = shown[0].date;
  return {
    actual: line(shown.map(pt)),
    avg3: line(shownAvg.map((d) => pt({ date: d.date, weight: d.avg3 }))),
    avg3Adjusted: line(shownAvg.map((d) => pt({ date: d.date, weight: d.adj.avg3 }))),
    fitAdjusted: line(projectedAdjusted.fit.filter((d) => d.date >= firstShown).map(pt)),
    fit: line(fit.filter((d) => d.date >= firstShown).map(pt)),
    measured: shown.filter((d) => !d.estimated).map(pt),
  };
}

/** Paths for the quadratic projections and the "general" blend of them. */
function projectionLines(pt: Pt, general: General | null) {
  return {
    futureAdjusted: line([pt(projectedAdjusted.fit[projectedAdjusted.fit.length - 1]), ...projectedAdjusted.future.map(pt)]),
    future: line([pt(fit[fit.length - 1]), ...future.map(pt)]),
    general: general ? line(general.map(pt)) : "",
  };
}

/** Paths for the tapering projection from the user's monthly loss. */
function taperLines(pt: Pt, tapered: Tapered | null) {
  if (!tapered) return { taper: "", taperAdjusted: "" };
  const lastRow = dailyRows[dailyRows.length - 1];
  const anchor = pt({ date: lastRow.date, weight: lastRow.avg3 });
  const anchorAdjusted = pt({ date: lastRow.date, weight: lastRow.adj.avg3 });
  return {
    taper: line([anchor, ...tapered.map(pt)]),
    taperAdjusted: line([anchorAdjusted, ...tapered.map((d) => pt({ date: d.date, weight: d.adjusted }))]),
  };
}

export function buildChart(input: ChartInput) {
  const { rangeDays, k, tapered, allTrend, spread, general } = input;
  const shown = days.slice(-Math.min(rangeDays, days.length));
  const shownFuture = tapered ? [...future, ...tapered] : future;
  const { x, y } = buildScales(shown, shownFuture, input);
  const pt: Pt = (d) => ({ x: x(toDate(d.date)), y: y(d.weight * k) });
  return {
    x,
    y,
    ...actualLines(shown, pt),
    ...projectionLines(pt, general),
    ...taperLines(pt, tapered),
    spread: spread ? { actual: shade(spread.actual, pt), adjusted: shade(spread.adjusted, pt) } : null,
    allTrends: (allTrend?.trends ?? []).map((t) => ({ back: t.back, actual: line(t.actual.map(pt)), adjusted: line(t.adjusted.map(pt)) })),
  };
}
