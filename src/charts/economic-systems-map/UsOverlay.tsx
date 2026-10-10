import { COLORS } from "./style";
import { toX, toY } from "./layout";
import type { EconomicSystemsData } from "./types";

/** Layer 2: the U.S. history region. */
export default function UsOverlay({ overlay }: { overlay: EconomicSystemsData["overlay"] }) {
  return (
    <>
      <polygon
        points={overlay.polygon.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
        fill={COLORS.overlay}
        fillOpacity={0.1}
        stroke={COLORS.overlay}
        strokeWidth={2.2}
        strokeDasharray="8 5"
      />
      <text x={toX(overlay.labelAt[0])} y={toY(overlay.labelAt[1]) - 2} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.overlay}>
        {overlay.label}
      </text>
      <text x={toX(overlay.labelAt[0])} y={toY(overlay.labelAt[1]) + 14} textAnchor="middle" fontSize={11} fill={COLORS.overlay}>
        {overlay.sublabel}
      </text>
    </>
  );
}
