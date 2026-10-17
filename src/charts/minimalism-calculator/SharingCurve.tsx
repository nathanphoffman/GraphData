import { useRef, useState, type PointerEvent } from "react";
import { recommendedCount } from "./calculate";
import type { ItemType } from "./items";

interface Props {
  /** Exact recommendation if you supplied everything yourself (100% share). */
  soloNeeded: number;
  /** How many people share, counting you (100 / your share %). */
  people: number;
  item: ItemType;
  /** Called while you drag the ring, with a whole number of people. */
  onPeople: (people: number) => void;
}

const W = 400;
const H = 190;
const LEFT = 40;
const RIGHT = 14;
const TOP = 22;
const BOTTOM = 34;

/** Curve of how many you should own as more people share the load. */
export default function SharingCurve({ soloNeeded, people, item, onPeople }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  // The right edge of the axis is held still while dragging so the chart doesn't rescale under the pointer.
  const [frozenMax, setFrozenMax] = useState<number | null>(null);
  const xMax = frozenMax ?? Math.min(20, Math.max(10, Math.ceil(people)));
  const yMax = Math.max(soloNeeded, 1);
  const x = (n: number) => LEFT + ((n - 1) / (xMax - 1)) * (W - LEFT - RIGHT);
  const y = (v: number) => TOP + (1 - v / yMax) * (H - TOP - BOTTOM);
  const at = (n: number) => soloNeeded / n;

  const path = Array.from({ length: (xMax - 1) * 4 + 1 }, (_, i) => {
    const n = 1 + i / 4;
    return `${i === 0 ? "M" : "L"}${x(n).toFixed(1)},${y(at(n)).toFixed(1)}`;
  }).join(" ");

  const marks = Array.from({ length: xMax }, (_, i) => i + 1);
  const labelled = (n: number) => xMax <= 10 || n === 1 || n % 5 === 0;
  const you = Math.min(people, xMax);
  const drag = (e: PointerEvent) => {
    if (frozenMax === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (((e.clientX - rect.left) / rect.width) * W - LEFT) / (W - LEFT - RIGHT)));
    onPeople(Math.round(1 + frac * (xMax - 1)));
  };
  const yourCount = recommendedCount(at(people));

  return (
    <div className="panel mini-chart">
      <h3>What sharing does</h3>
      <p className="muted">
        {people > 1
          ? `Sharing with ${people.toFixed(people % 1 ? 1 : 0)} people, you'd own ${yourCount} ${item.many} instead of ${recommendedCount(soloNeeded)}.`
          : `On your own you should own ${recommendedCount(soloNeeded)} ${item.many}. Lower your share to see the drop.`}
      </p>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="mini-curve" role="img" aria-label={`${item.many} to own by number of people sharing`}>
        <line x1={LEFT} x2={W - RIGHT} y1={y(0)} y2={y(0)} stroke="currentColor" opacity={0.3} />
        <line x1={LEFT} x2={LEFT} y1={y(0)} y2={y(yMax)} stroke="currentColor" opacity={0.3} />
        <text x={LEFT - 6} y={y(0) + 4} fontSize={11} textAnchor="end" fill="currentColor">
          0
        </text>
        <path d={path} fill="none" stroke="var(--link)" strokeWidth={2.5} />
        {marks.map((n) => (
          <g key={n}>
            <circle cx={x(n)} cy={y(at(n))} r={3} fill="var(--link)" />
            {labelled(n) && (
              <>
                <text x={x(n)} y={y(at(n)) - 8} fontSize={11} textAnchor="middle" fill="currentColor">
                  {recommendedCount(at(n))}
                </text>
                <text x={x(n)} y={H - BOTTOM + 15} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
                  {n}
                </text>
              </>
            )}
          </g>
        ))}
        <line x1={x(you)} x2={x(you)} y1={y(at(you))} y2={y(0)} stroke="var(--fg)" strokeDasharray="4 3" />
        <circle cx={x(you)} cy={y(at(you))} r={6} fill="none" stroke="var(--fg)" strokeWidth={2} />
        <circle
          cx={x(you)}
          cy={y(at(you))}
          r={16}
          fill="transparent"
          style={{ cursor: "grab", touchAction: "none" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setFrozenMax(xMax);
          }}
          onPointerMove={drag}
          onPointerUp={() => setFrozenMax(null)}
          onPointerCancel={() => setFrozenMax(null)}
        />
        <text x={W / 2} y={H - 4} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.7}>
          People sharing (including you)
        </text>
      </svg>
    </div>
  );
}
