import { COLORS, CELL_H } from "./style";
import { GRID_Y0, cellNameWidth, toX } from "./layout";
import type { Cell } from "./types";

/** Layer 3: cell names, plus the historical examples when toggled on. */
export default function CellNames({ cells, showExamples }: { cells: Cell[]; showExamples: boolean }) {
  return (
    <>
      {cells.map((cell) => {
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
    </>
  );
}
