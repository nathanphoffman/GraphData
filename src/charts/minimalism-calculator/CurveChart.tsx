import { useRef, type PointerEvent } from "react";
import { recommendedCount } from "./calculate";

const W = 400;
const H = 190;
const LEFT = 40;
const RIGHT = 14;
const TOP = 22;
const BOTTOM = 34;

interface Props {
  ariaLabel: string;
  xLabel: string;
  color: string;
  /** Count at x (how many to own); the top of the chart is yMax. */
  at: (n: number) => number;
  yMax: number;
  /** Where x sits along the axis, 0 (left) to 1 (right). */
  toFrac: (n: number) => number;
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
  at,
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
  const x = (n: number) => LEFT + toFrac(n) * (W - LEFT - RIGHT);
  const y = (v: number) => TOP + (1 - v / yMax) * (H - TOP - BOTTOM);

  const path = samples.map((n, i) => `${i === 0 ? "M" : "L"}${x(n).toFixed(1)},${y(at(n)).toFixed(1)}`).join(" ");

  const drag = (e: PointerEvent) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const frac = (((e.clientX - rect.left) / rect.width) * W - LEFT) / (W - LEFT - RIGHT);
    onDrag(Math.min(1, Math.max(0, frac)));
  };

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="mini-curve" role="img" aria-label={ariaLabel}>
      <line x1={LEFT} x2={W - RIGHT} y1={y(0)} y2={y(0)} stroke="currentColor" opacity={0.3} />
      <line x1={LEFT} x2={LEFT} y1={y(0)} y2={y(yMax)} stroke="currentColor" opacity={0.3} />
      <text x={LEFT - 6} y={y(0) + 4} fontSize={11} textAnchor="end" fill="currentColor">
        0
      </text>
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} />
      {marks.map((n) => (
        <g key={n}>
          <circle cx={x(n)} cy={y(at(n))} r={3} fill={color} />
          <text x={x(n)} y={y(at(n)) - 8} fontSize={11} textAnchor="middle" fill="currentColor">
            {recommendedCount(at(n))}
          </text>
          <text x={x(n)} y={H - BOTTOM + 15} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
            {n}
          </text>
        </g>
      ))}
      <line x1={x(current)} x2={x(current)} y1={y(at(current))} y2={y(0)} stroke="var(--fg)" strokeDasharray="4 3" />
      <circle cx={x(current)} cy={y(at(current))} r={6} fill="none" stroke="var(--fg)" strokeWidth={2} />
      <circle
        cx={x(current)}
        cy={y(at(current))}
        r={16}
        fill="transparent"
        style={{ cursor: "grab", touchAction: "none" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          onDragStart();
        }}
        onPointerMove={drag}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      />
      <text x={W / 2} y={H - 4} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
        {xLabel}
      </text>
    </svg>
  );
}
