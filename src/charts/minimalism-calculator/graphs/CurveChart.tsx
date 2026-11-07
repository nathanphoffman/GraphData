import { type PointerEvent, useRef } from "react";
import CurveHandle from "./CurveChart/CurveHandle";
import CurveMarks from "./CurveChart/CurveMarks";
import {
  axisFraction,
  CHART_HEIGHT,
  CHART_WIDTH,
  curvePath,
  LABEL_OPACITY,
  LABEL_SIZE,
  LEFT,
  makeScales,
  RIGHT,
  TEXT_BASELINE,
} from "./CurveChart/curveGeometry";

const AXIS_OPACITY = 0.3;
const ZERO_LABEL_GAP = 6;
const CURVE_WIDTH = 2.5;

interface Props {
  ariaLabel: string;
  xLabel: string;
  color: string;

  /** Count at x (how many to own); the top of the chart is yMax. */
  at: (xValue: number) => number;
  yMax: number;

  /** Where x sits along the axis, 0 (left) to 1 (right). */
  toFrac: (xValue: number) => number;

  /** X values the curve is drawn through. */
  samples: number[];

  /** X values that get a dot, a count and an axis label. */
  marks: number[];

  /** Your setting, marked with a draggable ring. */
  current: number;
  onDragStart: () => void;

  /** Called while dragging, with the pointer's position along the axis (0 to 1). */
  onDrag: (frac: number) => void;
  onDragEnd: () => void;
}

/** A curve of "how many to own" with dots at chosen points and a ring you can drag to change your setting. */
export default function CurveChart({
  ariaLabel,
  xLabel,
  color,
  at: countAt,
  yMax,
  toFrac,
  samples,
  marks,
  current,
  onDragStart,
  onDrag,
  onDragEnd,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const scales = makeScales(toFrac, yMax);

  // Only follow the pointer while it is captured by this chart, so a stray hover does not move the curve.
  const dragMove = (pointerEvent: PointerEvent) => {
    if (!pointerEvent.currentTarget.hasPointerCapture(pointerEvent.pointerId) || !svgRef.current) return;
    onDrag(axisFraction(pointerEvent.clientX, svgRef.current.getBoundingClientRect()));
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="mini-curve"
      role="img"
      aria-label={ariaLabel}
    >
      <line
        x1={LEFT}
        x2={CHART_WIDTH - RIGHT}
        y1={scales.y(0)}
        y2={scales.y(0)}
        stroke="currentColor"
        opacity={AXIS_OPACITY}
      />
      <line x1={LEFT} x2={LEFT} y1={scales.y(0)} y2={scales.y(yMax)} stroke="currentColor" opacity={AXIS_OPACITY} />
      <text
        x={LEFT - ZERO_LABEL_GAP}
        y={scales.y(0) + TEXT_BASELINE}
        fontSize={LABEL_SIZE}
        textAnchor="end"
        fill="currentColor"
      >
        0
      </text>
      <path d={curvePath(samples, countAt, scales)} fill="none" stroke={color} strokeWidth={CURVE_WIDTH} />
      <CurveMarks marks={marks} color={color} countAt={countAt} scales={scales} />
      <CurveHandle
        x={scales.x(current)}
        y={scales.y(countAt(current))}
        axisY={scales.y(0)}
        onDragStart={onDragStart}
        onDragMove={dragMove}
        onDragEnd={onDragEnd}
      />
      <text
        x={CHART_WIDTH / 2}
        y={CHART_HEIGHT - TEXT_BASELINE}
        fontSize={LABEL_SIZE}
        textAnchor="middle"
        fill="currentColor"
        opacity={LABEL_OPACITY}
      >
        {xLabel}
      </text>
    </svg>
  );
}
