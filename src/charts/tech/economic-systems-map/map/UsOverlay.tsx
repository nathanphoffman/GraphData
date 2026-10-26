import { COLORS, OVERLAY_OPACITY, OVERLAY_STROKE } from "../model/style";
import { toX, toY } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";

/** Layer 2: the U.S. history region. */
export default function UsOverlay({ overlay }: { overlay: EconomicSystemsData["overlay"] }) {
  return (
    <polygon
      points={overlay.polygon.map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ")}
      fill={COLORS.overlay}
      fillOpacity={OVERLAY_OPACITY}
      stroke={COLORS.overlay}
      strokeWidth={OVERLAY_STROKE}
      strokeDasharray="8 5"
    />
  );
}
