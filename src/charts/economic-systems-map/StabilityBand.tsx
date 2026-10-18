import { COLORS } from "./style";
import { GRID_H, GRID_W, GRID_X0, GRID_Y0, toX, toY } from "./layout";
import type { EconomicSystemsData } from "./types";

/** Layer 1: line of stability, clipped to the grid because the band can run past it. */
export default function StabilityBand({ stability }: { stability: EconomicSystemsData["stability"] }) {
  const { upper, lower } = stability;
  const [x1, y1] = [upper.from[0], (upper.from[1] + lower.from[1]) / 2];
  const [x2, y2] = [upper.to[0], (upper.to[1] + lower.to[1]) / 2];
  const band = [upper.from, upper.to, lower.to, lower.from].map(([x, y]) => `${toX(x)},${toY(y)}`).join(" ");
  const angle = (Math.atan2(toY(y2) - toY(y1), toX(x2) - toX(x1)) * 180) / Math.PI;
  const labelBoxW = stability.label.length * 7.6 + 16;
  const labelX = 1.0;
  const labelY = y1 + ((y2 - y1) * (labelX - x1)) / (x2 - x1);

  return (
    <>
      <clipPath id="grid-clip">
        <rect x={GRID_X0} y={GRID_Y0} width={GRID_W} height={GRID_H} />
      </clipPath>
      <g clipPath="url(#grid-clip)">
        <polygon points={band} fill={COLORS.stability} fillOpacity={0.13} />
        <line x1={toX(upper.from[0])} y1={toY(upper.from[1])} x2={toX(upper.to[0])} y2={toY(upper.to[1])} stroke={COLORS.stability} strokeWidth={2.2} strokeOpacity={0.8} strokeDasharray="8 6" />
        <line x1={toX(lower.from[0])} y1={toY(lower.from[1])} x2={toX(lower.to[0])} y2={toY(lower.to[1])} stroke={COLORS.stability} strokeWidth={2.2} strokeOpacity={0.8} strokeDasharray="8 6" />
        <line x1={toX(x1)} y1={toY(y1)} x2={toX(x2)} y2={toY(y2)} stroke={COLORS.stability} strokeWidth={1} strokeOpacity={0.35} />
      </g>
      <g transform={`translate(${toX(labelX)} ${toY(labelY)}) rotate(${angle})`}>
        <rect x={-labelBoxW / 2} y={-11} width={labelBoxW} height={22} rx={6} fill="#fff" fillOpacity={0.9} />
        <text textAnchor="middle" y={5} fontSize={13} fontWeight={700} fill={COLORS.stability}>
          {stability.label}
        </text>
      </g>
    </>
  );
}
