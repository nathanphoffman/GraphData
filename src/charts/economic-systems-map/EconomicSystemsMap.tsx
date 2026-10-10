import { useMemo, useState } from "react";
import data from "../../../data/economic-systems-map.json";
import type { EconomicSystemsData } from "./types";
import { COLORS, GROUP_COLORS } from "./style";
import { CELL_H, CELL_W, GRID_LEFT, GRID_TOP, HEADER_COL_W, HEADER_ROW_H } from "./style";
import { GRID_H, GRID_W, GRID_X0, GRID_Y0, cellNameWidth, placeLabels, toX, toY } from "./layout";

const model = data as EconomicSystemsData;

const W = GRID_X0 + GRID_W + 8;
const H = GRID_Y0 + GRID_H + 70;
const FONT = "system-ui, -apple-system, Segoe UI, sans-serif";

export default function EconomicSystemsMap() {
  const [showExamples, setShowExamples] = useState(false);
  const labels = useMemo(() => placeLabels(model, model.figures), []);

  const { stability, overlay } = model;
  const [x1, y1] = stability.from;
  const [x2, y2] = stability.to;
  const hw = stability.halfWidth;
  const band = [
    [x1, y1 - hw],
    [x2, y2 - hw],
    [x2, y2 + hw],
    [x1, y1 + hw],
  ]
    .map(([x, y]) => `${toX(x)},${toY(y)}`)
    .join(" ");
  const angle = (Math.atan2(toY(y2) - toY(y1), toX(x2) - toX(x1)) * 180) / Math.PI;
  const labelX = 1.0;
  const labelY = y1 + ((y2 - y1) * (labelX - x1)) / (x2 - x1);

  return (
    <div>
      <label className="map-toggle">
        <input type="checkbox" checked={showExamples} onChange={(e) => setShowExamples(e.target.checked)} />
        Show historical examples instead of figures
      </label>

      <svg className="map-surface" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={model.title} fontFamily={FONT}>
        <text x={GRID_X0} y={34} fontSize={22} fontWeight={700} fill="#222">
          {model.title}
        </text>

        {/* Layer 0: headers and cells */}
        <rect x={GRID_LEFT} y={GRID_TOP} width={HEADER_COL_W} height={HEADER_ROW_H} fill={COLORS.header} stroke={COLORS.border} />
        <text x={GRID_LEFT + HEADER_COL_W / 2} y={GRID_TOP + 26} textAnchor="middle" fontSize={14} fontWeight={700} fill={COLORS.headerText}>
          Size
        </text>
        {model.columns.map((name, c) => (
          <g key={name}>
            <rect x={GRID_X0 + c * CELL_W} y={GRID_TOP} width={CELL_W} height={HEADER_ROW_H} fill={COLORS.header} stroke={COLORS.border} />
            <text x={GRID_X0 + (c + 0.5) * CELL_W} y={GRID_TOP + 26} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.headerText}>
              {name}
            </text>
          </g>
        ))}
        {model.rows.map((name, r) => (
          <g key={name}>
            <rect x={GRID_LEFT} y={GRID_Y0 + r * CELL_H} width={HEADER_COL_W} height={CELL_H} fill={COLORS.header} stroke={COLORS.border} />
            <text x={GRID_LEFT + HEADER_COL_W / 2} y={GRID_Y0 + (r + 0.5) * CELL_H + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.headerText}>
              {name}
            </text>
          </g>
        ))}
        {model.cells.map((cell) => (
          <rect
            key={cell.name}
            x={GRID_X0 + cell.col * CELL_W}
            y={GRID_Y0 + cell.row * CELL_H}
            width={CELL_W}
            height={CELL_H}
            fill={(cell.col + cell.row) % 2 === 0 ? COLORS.cellLight : COLORS.cellDark}
            stroke={COLORS.border}
            strokeWidth={2}
          />
        ))}

        {/* Layer 1: line of stability */}
        <polygon points={band} fill={COLORS.stability} fillOpacity={0.13} />
        <line x1={toX(x1)} y1={toY(y1 - hw)} x2={toX(x2)} y2={toY(y2 - hw)} stroke={COLORS.stability} strokeWidth={2.2} strokeOpacity={0.8} strokeDasharray="8 6" />
        <line x1={toX(x1)} y1={toY(y1 + hw)} x2={toX(x2)} y2={toY(y2 + hw)} stroke={COLORS.stability} strokeWidth={2.2} strokeOpacity={0.8} strokeDasharray="8 6" />
        <line x1={toX(x1)} y1={toY(y1)} x2={toX(x2)} y2={toY(y2)} stroke={COLORS.stability} strokeWidth={1} strokeOpacity={0.35} />
        <g transform={`translate(${toX(labelX)} ${toY(labelY)}) rotate(${angle})`}>
          <rect x={-50} y={-11} width={100} height={22} rx={6} fill="#fff" fillOpacity={0.9} />
          <text textAnchor="middle" y={5} fontSize={13} fontWeight={700} fill={COLORS.stability}>
            {stability.label}
          </text>
        </g>

        {/* Layer 2: U.S. overlay */}
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

        {/* Layer 3: cell names (and examples) */}
        {model.cells.map((cell) => {
          const cx = toX(cell.col + 0.5);
          const top = GRID_Y0 + cell.row * CELL_H;
          const w = cellNameWidth(cell.name);
          return (
            <g key={cell.name}>
              <rect x={cx - w / 2} y={top + 5} width={w} height={24} rx={5} fill="#fff" fillOpacity={0.75} />
              <text x={cx} y={top + 23} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.cellName}>
                {cell.name}
              </text>
              {showExamples && (
                <>
                  <text x={cx} y={top + 50} textAnchor="middle" fontSize={13}>
                    <tspan fontWeight={700} fill={COLORS.auth}>Auth: </tspan>
                    <tspan fill="#333">{cell.auth}</tspan>
                  </text>
                  <text x={cx} y={top + 70} textAnchor="middle" fontSize={13}>
                    <tspan fontWeight={700} fill={COLORS.dem}>Dem: </tspan>
                    <tspan fill="#333">{cell.dem}</tspan>
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Layer 4: figures */}
        {!showExamples &&
          labels.map(({ figure, dotX, dotY, box }) => {
            const color = GROUP_COLORS[figure.group];
            return (
              <g key={figure.name}>
                <circle cx={dotX} cy={dotY} r={6} fill={color} stroke="#fff" strokeWidth={1.5} />
                <rect x={box.cx - box.w / 2} y={box.cy - box.h / 2} width={box.w} height={box.h} rx={3} fill="#fff" fillOpacity={0.8} />
                <text x={box.cx} y={box.cy + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={color}>
                  {figure.name}
                </text>
              </g>
            );
          })}

        {/* Legend and footnote */}
        {!showExamples &&
          model.groups.map((group, i) => {
            const x = GRID_X0 + 30 + i * 195;
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
        <text x={GRID_X0} y={GRID_Y0 + GRID_H + 58} fontSize={11} fontStyle="italic" fill={COLORS.muted}>
          {model.footnote}
          {showExamples ? ` ${model.examplesFootnote}` : ""}
        </text>
      </svg>
    </div>
  );
}
