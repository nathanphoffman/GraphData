import { BOLD, DOT_RADIUS, FIGURE_DOT_STROKE, FIGURE_LABEL, FONT_SIZE, GROUP_COLORS, LEADER_MIN_LENGTH, LEADER_OPACITY } from "../model/style";
import type { PlacedLabel } from "../model/types";

/** Layer 4: a dot per figure with a label box and a thin leader line. */
export default function FigureLabels({ labels }: { labels: PlacedLabel[] }) {
  return (
    <>
      {/* Draw each figure's dot, line and label. */}
      {labels.map(({ figure, dotX, dotY, box }) => {
        const color = GROUP_COLORS[figure.group];

        // Thin leader line from the dot to the nearest edge of its label box.
        const lx = Math.min(Math.max(dotX, box.cx - box.w / 2), box.cx + box.w / 2);
        const ly = Math.min(Math.max(dotY, box.cy - box.h / 2), box.cy + box.h / 2);
        const showLine = Math.hypot(lx - dotX, ly - dotY) > LEADER_MIN_LENGTH;

        return (
          <g key={figure.name}>
            {showLine && <line x1={dotX} y1={dotY} x2={lx} y2={ly} stroke={color} strokeWidth={1} strokeOpacity={LEADER_OPACITY} />}
            <circle cx={dotX} cy={dotY} r={DOT_RADIUS} fill={color} stroke="#fff" strokeWidth={FIGURE_DOT_STROKE} />
            <rect x={box.cx - box.w / 2} y={box.cy - box.h / 2} width={box.w} height={box.h} rx={FIGURE_LABEL.radius} fill="#fff" fillOpacity={FIGURE_LABEL.opacity} />
            <text x={box.cx} y={box.cy + FIGURE_LABEL.textBaseline} textAnchor="middle" fontSize={FONT_SIZE.figure} fontWeight={BOLD} fill={color}>
              {figure.name}
            </text>
          </g>
        );
      })}
    </>
  );
}
