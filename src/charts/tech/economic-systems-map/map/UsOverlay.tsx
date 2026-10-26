import { COLORS, OVERLAY_OPACITY, OVERLAY_STROKE } from "../model/style";
import { xToPixels, yToPixels } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";

/** Layer 2: the U.S. history region. */
export default function UsOverlay({ overlay }: { overlay: EconomicSystemsData["overlay"] }) {
  return (
    <polygon
      points={overlay.polygon.map(([gridX, gridY]) => `${xToPixels(gridX)},${yToPixels(gridY)}`).join(" ")}
      fill={COLORS.overlay}
      fillOpacity={OVERLAY_OPACITY}
      stroke={COLORS.overlay}
      strokeWidth={OVERLAY_STROKE}
      strokeDasharray="8 5"
    />
  );
}
