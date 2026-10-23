import { COLORS, GROUP_COLORS } from "../model/style";
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
          const xPos = GRID_X0 + 10 + index * 168;
          const yPos = GRID_Y0 + GRID_H + 28;

          return (
            <g key={group.id}>
              <circle cx={xPos} cy={yPos} r={6} fill={GROUP_COLORS[group.id]} />
              <text x={xPos + 12} y={yPos + 4} fontSize={13} fill="#333">
                {group.label}
              </text>
            </g>
          );
        })}
      <g>
        <rect x={GRID_X0 + 4} y={GRID_Y0 + GRID_H + 44} width={22} height={13} fill={COLORS.overlay} fillOpacity={0.1} stroke={COLORS.overlay} strokeWidth={2} strokeDasharray="5 3" />
        <text x={GRID_X0 + 36} y={GRID_Y0 + GRID_H + 55} fontSize={13} fill="#333">
          {model.overlay.label} {model.overlay.sublabel}
        </text>
      </g>
      <text x={GRID_X0} y={GRID_Y0 + GRID_H + 82} fontSize={11} fontStyle="italic" fill={COLORS.muted}>
        {model.footnote}
      </text>
    </>
  );
}
