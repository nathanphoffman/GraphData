import { COLORS, CELL_H } from "../model/style";
import { GRID_Y0, cellNameWidth, toX } from "../model/layout";
import type { Cell } from "../model/types";

/** Layer 3: cell names, plus the historical examples when toggled on. */
export default function CellNames({ cells, showExamples }: { cells: Cell[]; showExamples: boolean }) {
  // Draw each cell's name; with examples on, also its authoritarian and democratic examples, each with any bracketed note on its own line.
  return (
    <>
      {/* Draw each cell's name; with examples on, also its authoritarian and democratic examples. */}
      {cells.map((cell) => {
        const centerX = toX(cell.col + 0.5);
        const topEdge = GRID_Y0 + cell.row * CELL_H;
        const w = cellNameWidth(cell.name);

        // Split a name from its bracketed note so the note can go on its own line.
        const split = (text: string): [string, string | undefined] => {
          // Split a name into the main text and a trailing parenthesised note, e.g. "Name (note)".
          const m = text.match(/^(.*?)\s*(\(.*\))$/);

          return m ? [m[1], m[2]] : [text, undefined];
        };

        const [authName, authNote] = split(cell.auth);
        const [demName, demNote] = split(cell.dem);
        const demY = authNote ? topEdge + 88 : topEdge + 70;

        return (
          <g key={cell.name}>
            <rect x={centerX - w / 2} y={topEdge + 5} width={w} height={24} rx={5} fill="#fff" fillOpacity={0.75} />
            <text x={centerX} y={topEdge + 23} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.cellName}>
              {cell.name}
            </text>
            {showExamples && (
              <>
                <text x={centerX} y={topEdge + 50} textAnchor="middle" fontSize={13}>
                  <tspan fontWeight={700} fill={COLORS.auth}>Auth: </tspan>
                  <tspan fill="#333">{authName}</tspan>
                </text>
                {authNote && (
                  <text x={centerX} y={topEdge + 68} textAnchor="middle" fontSize={12} fill="#555">
                    {authNote}
                  </text>
                )}
                <text x={centerX} y={demY} textAnchor="middle" fontSize={13}>
                  <tspan fontWeight={700} fill={COLORS.dem}>Dem: </tspan>
                  <tspan fill="#333">{demName}</tspan>
                </text>
                {demNote && (
                  <text x={centerX} y={demY + 18} textAnchor="middle" fontSize={12} fill="#555">
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
