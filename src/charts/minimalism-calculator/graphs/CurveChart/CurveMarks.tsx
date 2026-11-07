import { recommendedCount } from "../../logic/calculate";
import { BOTTOM, CHART_HEIGHT, LABEL_OPACITY, LABEL_SIZE, type Scales } from "./curveGeometry";

const MARK_RADIUS = 3;
const MARK_LABEL_GAP = 8;
const AXIS_LABEL_DROP = 15;

interface Props {
  marks: number[];
  color: string;
  countAt: (xValue: number) => number;
  scales: Scales;
}

/** One dot, count and axis label for each marked point on the curve. */
export default function CurveMarks({ marks, color, countAt, scales }: Props) {
  return marks.map((mark) => (
    <g key={mark}>
      <circle cx={scales.x(mark)} cy={scales.y(countAt(mark))} r={MARK_RADIUS} fill={color} />
      <text
        x={scales.x(mark)}
        y={scales.y(countAt(mark)) - MARK_LABEL_GAP}
        fontSize={LABEL_SIZE}
        textAnchor="middle"
        fill="currentColor"
      >
        {recommendedCount(countAt(mark))}
      </text>
      <text
        x={scales.x(mark)}
        y={CHART_HEIGHT - BOTTOM + AXIS_LABEL_DROP}
        fontSize={LABEL_SIZE}
        textAnchor="middle"
        fill="currentColor"
        opacity={LABEL_OPACITY}
      >
        {mark}
      </text>
    </g>
  ));
}
