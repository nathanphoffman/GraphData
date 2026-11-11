import { scaleLinear, scaleTime } from "d3-scale";
import type { Point } from "../curves";
import { dailyRows, projectedAdjusted } from "../rows";
import { toDate } from "../units";
import { CHART_HEIGHT, CHART_MARGIN, CHART_WIDTH, type ChartInput } from "./chart_types";
import { healthPoints } from "./lines";

/** Every weight the chart has to fit (in lb), so the y axis can be sized to it. */
function allWeights(
  shown: Point[],
  shownFuture: Point[],
  { tapered, allTrend, spread, fat: fatProjection, showHealth }: ChartInput,
) {
  const spreadEnds = spread
    ? [spread.actual, spread.adjusted].flatMap((spreadSide) => [
        ...spreadSide.curves[0].points,
        ...spreadSide.curves[spreadSide.curves.length - 1].points,
      ])

    : [];
  const shownAvg = dailyRows
    .filter((dailyRow) => dailyRow.date >= shown[0].date)
    .map((dailyRow) => ({ weight: dailyRow.adj.avg3 }));

  return [
    ...shown,
    ...shownFuture,
    ...projectedAdjusted.future,
    ...(tapered ?? []).flatMap((targetPoint) => [{ weight: targetPoint.weight }, { weight: targetPoint.adjusted }]),
    ...(allTrend ? allTrend.trends.flatMap((trend) => [...trend.actual, ...trend.adjusted]) : []),
    ...spreadEnds,
    // When the fat curves are on, include their future points and the 3-day averages in view, so the chart fits them.
    ...(fatProjection
      ? [
          ...fatProjection.future,
          ...fatProjection.rows
            .filter((fatRow) => fatRow.date >= shown[0].date)
            .map((fatRow) => ({ weight: fatRow.avg3 })),
        ]

      : []),
    ...(tapered && fatProjection
      ? tapered.map((targetPoint) => ({ weight: targetPoint.weight - targetPoint.muscle * (1 + fatProjection.ratio) }))
      : []),
    ...(allTrend ? allTrend.trends.flatMap((trend) => trend.fat ?? []) : []),
    ...shownAvg,
    ...(showHealth ? healthPoints(shown[0].date) : []),
  ].map((point) => point.weight);
}

/** Pick the date and weight scales so the chart fits the data being shown. */
export function buildScales(shown: Point[], shownFuture: Point[], input: ChartInput) {
  const { allTrend, spread, k } = input;
  const lastDates = [
    shownFuture[shownFuture.length - 1].date,
    allTrend?.date ?? "",
    spread ? spread.actual.mean[spread.actual.mean.length - 1].date : "",
  ];

  const xScale = scaleTime()
    .domain([toDate(shown[0].date), toDate(lastDates.sort().pop()!)])
    .range([CHART_MARGIN.left, CHART_WIDTH - CHART_MARGIN.right]);
  const weights = allWeights(shown, shownFuture, input).map((width) => width * k);
  const yScale = scaleLinear()
    .domain([Math.floor(Math.min(...weights) - 2), Math.ceil(Math.max(...weights) + 2)])
    .range([CHART_HEIGHT - CHART_MARGIN.bottom, CHART_MARGIN.top]);

  return { x: xScale, y: yScale };
}
