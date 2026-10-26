import { COLORS, DOT_RADIUS, FONT_SIZE, GROUP_COLORS, LEGEND } from "../model/style";
import { GRID_H, GRID_X0, GRID_Y0 } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";

interface Props {
  model: EconomicSystemsData;
  showExamples: boolean;
}

/** Group legend (figures view only) and the footnote under the grid. */
export default function Legend({ model, showExamples }: Props) {
  return (
    <>
      {!showExamples &&
        // One colour key per group of figures.
        model.groups.map((group, index) => {
          const xPos = GRID_X0 + LEGEND.keyStartX + index * LEGEND.keySpacing;
          const yPos = GRID_Y0 + GRID_H + LEGEND.keyY;

          return (
            <g key={group.id}>
              <circle cx={xPos} cy={yPos} r={DOT_RADIUS} fill={GROUP_COLORS[group.id]} />
              <text x={xPos + LEGEND.keyLabelX} y={yPos + LEGEND.keyLabelBaseline} fontSize={FONT_SIZE.legend} fill="#333">
                {group.label}
              </text>
            </g>
          );
        })}
      <g>
        <rect x={GRID_X0 + LEGEND.swatchX} y={GRID_Y0 + GRID_H + LEGEND.swatchY} width={LEGEND.swatchWidth} height={LEGEND.swatchHeight} fill={COLORS.overlay} fillOpacity={LEGEND.swatchOpacity} stroke={COLORS.overlay} strokeWidth={LEGEND.swatchStroke} strokeDasharray="5 3" />
        <text x={GRID_X0 + LEGEND.overlayLabelX} y={GRID_Y0 + GRID_H + LEGEND.overlayLabelY} fontSize={FONT_SIZE.legend} fill="#333">
          {model.overlay.label} {model.overlay.sublabel}
        </text>
      </g>
      <text x={GRID_X0} y={GRID_Y0 + GRID_H + LEGEND.footnoteY} fontSize={FONT_SIZE.footnote} fontStyle="italic" fill={COLORS.muted}>
        {model.footnote}
      </text>
    </>
  );
}
