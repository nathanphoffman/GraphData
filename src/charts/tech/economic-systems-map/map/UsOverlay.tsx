import { COLORS } from "../model/style";
import { toX, toY } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";

/** Layer 2: the U.S. history region. */
export default function UsOverlay({ overlay }: { overlay: EconomicSystemsData["overlay"] }) {
  return (
    <polygon
      points={overlay.polygon.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
      fill={COLORS.overlay}
      fillOpacity={0.1}
      stroke={COLORS.overlay}
      strokeWidth={2.2}
      strokeDasharray="8 5"
    />
  );
}
