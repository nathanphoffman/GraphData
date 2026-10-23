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
        model.groups.map((group, i) => {
          const x = GRID_X0 + 10 + i * 168;
          const y = GRID_Y0 + GRID_H + 28;

          return (
            <g key={group.id}>
              <circle cx={x} cy={y} r={6} fill={GROUP_COLORS[group.id]} />
              <text x={x + 12} y={y + 4} fontSize={13} fill="#333">
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
