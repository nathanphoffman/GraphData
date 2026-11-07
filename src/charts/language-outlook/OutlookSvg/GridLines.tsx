import type { ScaleLinear } from "d3-scale";
import { CHART_WIDTH, MARGIN } from "../model/layout";

/** Grid labels sit this far left of the axis and this far below their line, at this size. */
const GRID_LABEL_GAP = 6;
const GRID_LABEL_BASELINE = 4;
const GRID_FONT_SIZE = 12;

interface Props {
  gridValues: number[];
  yScale: ScaleLinear<number, number>;
}

/** One horizontal grid line with its label, for each tick. */
export default function GridLines({ gridValues, yScale }: Props) {
  return (
    <>
      {gridValues.map((gridValue) => (
        <g key={gridValue}>
          <line
            x1={MARGIN.left}
            x2={CHART_WIDTH - MARGIN.right}
            y1={yScale(gridValue)}
            y2={yScale(gridValue)}
            stroke="#ffffff30"
            strokeDasharray="2 5"
          />
          <text
            x={MARGIN.left - GRID_LABEL_GAP}
            y={yScale(gridValue) + GRID_LABEL_BASELINE}
            textAnchor="end"
            fontSize={GRID_FONT_SIZE}
            fill="#fff"
            fillOpacity={0.8}
          >
            {gridValue}
          </text>
        </g>
      ))}
    </>
  );
}
