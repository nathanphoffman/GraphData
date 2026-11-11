import { maxValue, MARGIN, WIDTH, yScale } from "../chart_scale";

const GRID_OPACITY = 0.12;
const FONT_SIZE = 12;
const TICK_LABEL_GAP = 8;
const TICK_LABEL_BASELINE = 4;

/** One horizontal grid line per sales tick, labelled in millions. */
export default function GridLines() {
  const ticks = Array.from({ length: maxValue + 1 }, (_unused, index) => index);

  return ticks.map((tick) => (
    <g key={tick}>
      <line
        x1={MARGIN.left}
        x2={WIDTH - MARGIN.right}
        y1={yScale(tick)}
        y2={yScale(tick)}
        stroke="currentColor"
        opacity={GRID_OPACITY}
      />
      <text
        x={MARGIN.left - TICK_LABEL_GAP}
        y={yScale(tick) + TICK_LABEL_BASELINE}
        textAnchor="end"
        fontSize={FONT_SIZE}
        fill="currentColor"
      >
        {tick}M
      </text>
    </g>
  ));
}
