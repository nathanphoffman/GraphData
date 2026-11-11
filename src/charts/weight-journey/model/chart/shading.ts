import type { Spread } from "../curves";
import type { PointMapper } from "./chart_types";
import { line } from "./lines";

/** Curves closer than this count as this far apart, so the shading stays finite. */
const MIN_GAP = 0.1;

/** A band is at least this opaque, and up to this much more where the curves bunch together. */
const BAND_OPACITY_BASE = 0.06;
const BAND_OPACITY_RANGE = 0.5;

/** Shaded bands between neighbouring curves: the closer two curves sit at the end, the more opaque the band (that's where the projections concentrate). */
export function shade(spreadSide: Spread["actual"], point: PointMapper) {
  const gaps = spreadSide.curves
    .slice(1)
    .map((curve, index) => Math.max(Math.abs(curve.target - spreadSide.curves[index].target), MIN_GAP));
  const densest = Math.max(...gaps.map((curveGap) => 1 / curveGap));

  return {
    // Shade the gap between each pair of neighbouring curves.
    bands: gaps.map((curveGap, index) => {
      const firstEdge = spreadSide.curves[index].points.map(point);
      const secondEdge = spreadSide.curves[index + 1].points.map(point).reverse();

      return {
        d: `${line(firstEdge)}L${line(secondEdge).slice(1)}Z`,
        opacity: BAND_OPACITY_BASE + (BAND_OPACITY_RANGE * (1 / curveGap)) / densest,
      };
    }),
    best: line(spreadSide.curves[0].points.map(point)),
    worst: line(spreadSide.curves[spreadSide.curves.length - 1].points.map(point)),
    mean: line(spreadSide.mean.map(point)),
  };
}
