import { GROUP_COLORS } from "./style";
import type { PlacedLabel } from "./types";

/** Layer 4: a dot per figure with a label box and a thin leader line. */
export default function FigureLabels({ labels }: { labels: PlacedLabel[] }) {
  return (
    <>
      {labels.map(({ figure, dotX, dotY, box }) => {
        const color = GROUP_COLORS[figure.group];
        // Thin leader line from the dot to the nearest edge of its label box.
        const lx = Math.min(Math.max(dotX, box.cx - box.w / 2), box.cx + box.w / 2);
        const ly = Math.min(Math.max(dotY, box.cy - box.h / 2), box.cy + box.h / 2);
        const showLine = Math.hypot(lx - dotX, ly - dotY) > 8;
        return (
          <g key={figure.name}>
            {showLine && <line x1={dotX} y1={dotY} x2={lx} y2={ly} stroke={color} strokeWidth={1} strokeOpacity={0.7} />}
            <circle cx={dotX} cy={dotY} r={6} fill={color} stroke="#fff" strokeWidth={1.5} />
            <rect x={box.cx - box.w / 2} y={box.cy - box.h / 2} width={box.w} height={box.h} rx={3} fill="#fff" fillOpacity={0.8} />
            <text x={box.cx} y={box.cy + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={color}>
              {figure.name}
            </text>
          </g>
        );
      })}
    </>
  );
}
