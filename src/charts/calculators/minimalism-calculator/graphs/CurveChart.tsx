import { useRef, type PointerEvent } from "react";
import { recommendedCount } from "../logic/calculate";

const CHART_WIDTH = 400;
const CHART_HEIGHT = 190;
const LEFT = 40;
const RIGHT = 14;
const TOP_MARGIN = 22;
const BOTTOM = 34;

/** Sizes and spacing for what is drawn on the chart. */
const AXIS_OPACITY = 0.3;
const LABEL_SIZE = 11;
const LABEL_OPACITY = 0.7;
const ZERO_LABEL_GAP = 6;
const TEXT_BASELINE = 4;
const CURVE_WIDTH = 2.5;
const MARK_RADIUS = 3;
const MARK_LABEL_GAP = 8;
const AXIS_LABEL_DROP = 15;
const CURRENT_RING_RADIUS = 6;
const DRAG_RADIUS = 16;

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

  const xScale = (xValue: number) => LEFT + toFrac(xValue) * (CHART_WIDTH - LEFT - RIGHT);

  const yScale = (value: number) => TOP_MARGIN + (1 - value / yMax) * (CHART_HEIGHT - TOP_MARGIN - BOTTOM);

  const path = samples.map((sample, index) => `${index === 0 ? "M" : "L"}${xScale(sample).toFixed(1)},${yScale(countAt(sample)).toFixed(1)}`).join(" ");

  // Only follow the pointer while it is captured by this chart, so a stray hover does not move the curve.
  const drag = (pointerEvent: PointerEvent) => {
    if (!pointerEvent.currentTarget.hasPointerCapture(pointerEvent.pointerId) || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const frac = (((pointerEvent.clientX - rect.left) / rect.width) * CHART_WIDTH - LEFT) / (CHART_WIDTH - LEFT - RIGHT);
    onDrag(Math.min(1, Math.max(0, frac)));
  };

  return (
    <svg ref={svgRef} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="mini-curve" role="img" aria-label={ariaLabel}>
      <line x1={LEFT} x2={CHART_WIDTH - RIGHT} y1={yScale(0)} y2={yScale(0)} stroke="currentColor" opacity={AXIS_OPACITY} />
      <line x1={LEFT} x2={LEFT} y1={yScale(0)} y2={yScale(yMax)} stroke="currentColor" opacity={AXIS_OPACITY} />
      <text x={LEFT - ZERO_LABEL_GAP} y={yScale(0) + TEXT_BASELINE} fontSize={LABEL_SIZE} textAnchor="end" fill="currentColor">
        0
      </text>
      <path d={path} fill="none" stroke={color} strokeWidth={CURVE_WIDTH} />
      {/* One dot and label per marked point on the curve. */}
      {marks.map((mark) => (
        <g key={mark}>
          <circle cx={xScale(mark)} cy={yScale(countAt(mark))} r={MARK_RADIUS} fill={color} />
          <text x={xScale(mark)} y={yScale(countAt(mark)) - MARK_LABEL_GAP} fontSize={LABEL_SIZE} textAnchor="middle" fill="currentColor">
            {recommendedCount(countAt(mark))}
          </text>
          <text x={xScale(mark)} y={CHART_HEIGHT - BOTTOM + AXIS_LABEL_DROP} fontSize={LABEL_SIZE} textAnchor="middle" fill="currentColor" opacity={LABEL_OPACITY}>
            {mark}
          </text>
        </g>
      ))}

      <line x1={xScale(current)} x2={xScale(current)} y1={yScale(countAt(current))} y2={yScale(0)} stroke="var(--fg)" strokeDasharray="4 3" />
      <circle cx={xScale(current)} cy={yScale(countAt(current))} r={CURRENT_RING_RADIUS} fill="none" stroke="var(--fg)" strokeWidth={2} />
      <circle
        cx={xScale(current)}
        cy={yScale(countAt(current))}
        r={DRAG_RADIUS}
        fill="transparent"
        style={{ cursor: "grab", touchAction: "none" }}

        // Capture the pointer so the drag keeps working when the mouse leaves the chart.
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          onDragStart();
        }}

        onPointerMove={drag}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      />
      <text x={CHART_WIDTH / 2} y={CHART_HEIGHT - TEXT_BASELINE} fontSize={LABEL_SIZE} textAnchor="middle" fill="currentColor" opacity={LABEL_OPACITY}>
        {xLabel}
      </text>
    </svg>
  );
}
