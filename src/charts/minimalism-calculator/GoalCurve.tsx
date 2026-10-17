import { useRef, useState, type PointerEvent } from "react";
import { recommendedCount } from "./calculate";
import { cap, type ItemType } from "./items";
import { PER_YEAR_STOPS } from "./stops";

interface Props {
  /** Your own uses per year (weekly uses x 52 x your share). */
  yearlyUses: number;
  /** Uses per year you want from each item. */
  goal: number;
  item: ItemType;
  /** Called while you drag the ring, with the nearest slider value. */
  onGoal: (goal: number) => void;
}

const W = 400;
const H = 190;
const LEFT = 40;
const RIGHT = 14;
const TOP = 22;
const BOTTOM = 34;
const X_MAX = 365;
const MARKS = [0.1, 0.25, 0.5, 1, 2, 5, 10, 25, 52, 100, 365];

/** Curve of how many you should own for each uses-per-year expectation, with your setting marked. */
export default function GoalCurve({ yearlyUses, goal, item, onGoal }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  // The left edge of the axis is held still while dragging so the chart doesn't rescale under the pointer.
  const [frozenMin, setFrozenMin] = useState<number | null>(null);
  const xMin = frozenMin ?? Math.min(1, goal);
  const yMax = Math.max(yearlyUses / xMin, 1);
  const x = (n: number) => LEFT + (Math.log(n / xMin) / Math.log(X_MAX / xMin)) * (W - LEFT - RIGHT);
  const y = (v: number) => TOP + (1 - v / yMax) * (H - TOP - BOTTOM);
  const at = (n: number) => yearlyUses / n;

  const path = Array.from({ length: 121 }, (_, i) => {
    const n = xMin * Math.pow(X_MAX / xMin, i / 120);
    return `${i === 0 ? "M" : "L"}${x(n).toFixed(1)},${y(at(n)).toFixed(1)}`;
  }).join(" ");

  const marks = MARKS.filter((m) => m >= xMin);
  const double = goal * 2;

  const drag = (e: PointerEvent) => {
    if (frozenMin === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (((e.clientX - rect.left) / rect.width) * W - LEFT) / (W - LEFT - RIGHT)));
    const n = xMin * Math.pow(X_MAX / xMin, frac);
    const nearest = PER_YEAR_STOPS.reduce((best, v) => (Math.abs(Math.log(v / n)) < Math.abs(Math.log(best / n)) ? v : best));
    onGoal(nearest);
  };

  return (
    <div className="panel mini-chart">
      <h3>What your {item.uses}-per-year goal does</h3>
      <p className="muted">
        {double <= X_MAX
          ? `Wanting ${goal} ${item.uses} a year from each ${item.one} means ${recommendedCount(at(goal))} ${item.many}. Double that to ${double} and you need ${recommendedCount(at(double))}.`
          : `Wanting ${goal} ${item.uses} a year from each ${item.one} means ${recommendedCount(at(goal))} ${item.many}.`}
      </p>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="mini-curve" role="img" aria-label={`${item.many} to own by ${item.uses} per year wanted`}>
        <line x1={LEFT} x2={W - RIGHT} y1={y(0)} y2={y(0)} stroke="currentColor" opacity={0.3} />
        <line x1={LEFT} x2={LEFT} y1={y(0)} y2={y(yMax)} stroke="currentColor" opacity={0.3} />
        <text x={LEFT - 6} y={y(0) + 4} fontSize={11} textAnchor="end" fill="currentColor">
          0
        </text>
        <path d={path} fill="none" stroke="#9333ea" strokeWidth={2.5} />
        {marks.map((n) => (
          <g key={n}>
            <circle cx={x(n)} cy={y(at(n))} r={3} fill="#9333ea" />
            <text x={x(n)} y={y(at(n)) - 8} fontSize={11} textAnchor="middle" fill="currentColor">
              {recommendedCount(at(n))}
            </text>
            <text x={x(n)} y={H - BOTTOM + 15} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
              {n}
            </text>
          </g>
        ))}
        <line x1={x(goal)} x2={x(goal)} y1={y(at(goal))} y2={y(0)} stroke="var(--fg)" strokeDasharray="4 3" />
        <circle cx={x(goal)} cy={y(at(goal))} r={6} fill="none" stroke="var(--fg)" strokeWidth={2} />
        <circle
          cx={x(goal)}
          cy={y(at(goal))}
          r={16}
          fill="transparent"
          style={{ cursor: "grab", touchAction: "none" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setFrozenMin(xMin);
          }}
          onPointerMove={drag}
          onPointerUp={() => setFrozenMin(null)}
          onPointerCancel={() => setFrozenMin(null)}
        />
        <text x={W / 2} y={H - 4} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
          {cap(item.uses)} per year wanted from each {item.one}
        </text>
      </svg>
    </div>
  );
}
