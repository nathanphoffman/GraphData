export const CHART_WIDTH = 400;
export const CHART_HEIGHT = 190;
export const LEFT = 40;
export const RIGHT = 14;
export const TOP_MARGIN = 22;
export const BOTTOM = 34;

/** Sizes shared by everything drawn on the chart. */
export const LABEL_SIZE = 11;
export const LABEL_OPACITY = 0.7;
export const TEXT_BASELINE = 4;

const PLOT_WIDTH = CHART_WIDTH - LEFT - RIGHT;
const PLOT_HEIGHT = CHART_HEIGHT - TOP_MARGIN - BOTTOM;

export interface Scales {
  x: (xValue: number) => number;
  y: (value: number) => number;
}

/** Turns data values into positions inside the chart's viewBox. */
export function makeScales(toFrac: (xValue: number) => number, yMax: number): Scales {
  return {
    x: (xValue) => LEFT + toFrac(xValue) * PLOT_WIDTH,
    y: (value) => TOP_MARGIN + (1 - value / yMax) * PLOT_HEIGHT,
  };
}

/** SVG path that runs through each sample point. */
export function curvePath(samples: number[], countAt: (xValue: number) => number, scales: Scales): string {
  return samples
    .map((sample, index) => `${index === 0 ? "M" : "L"}${scales.x(sample).toFixed(1)},${scales.y(countAt(sample)).toFixed(1)}`)
    .join(" ");
}

/** Where a pointer sits along the axis, 0 (left) to 1 (right), kept inside the plot. */
export function axisFraction(clientX: number, svgBounds: DOMRect): number {
  const viewBoxX = ((clientX - svgBounds.left) / svgBounds.width) * CHART_WIDTH;

  return Math.min(1, Math.max(0, (viewBoxX - LEFT) / PLOT_WIDTH));
}
