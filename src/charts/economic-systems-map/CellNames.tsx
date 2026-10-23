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
        const split = (text: string): [string, string | undefined] => {
          // Split a name into the main text and a trailing parenthesised note, e.g. "Name (note)".
          const m = text.match(/^(.*?)\s*(\(.*\))$/);
          return m ? [m[1], m[2]] : [text, undefined];
        };
        const [authName, authNote] = split(cell.auth);
        const [demName, demNote] = split(cell.dem);
        const demY = authNote ? top + 88 : top + 70;
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
                  <tspan fill="#333">{authName}</tspan>
                </text>
                {authNote && (
                  <text x={cx} y={top + 68} textAnchor="middle" fontSize={12} fill="#555">
                    {authNote}
                  </text>
                )}
                <text x={cx} y={demY} textAnchor="middle" fontSize={13}>
                  <tspan fontWeight={700} fill={COLORS.dem}>Dem: </tspan>
                  <tspan fill="#333">{demName}</tspan>
                </text>
                {demNote && (
                  <text x={cx} y={demY + 18} textAnchor="middle" fontSize={12} fill="#555">
                    {demNote}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}
    </>
  );
}
