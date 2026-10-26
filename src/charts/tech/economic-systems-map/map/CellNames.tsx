import { BOLD, CELL_CENTER, CELL_H, CELL_NAME_BOX, COLORS, EXAMPLE_Y, FONT_SIZE } from "../model/style";
import { GRID_Y0, cellNameWidth, xToPixels } from "../model/layout";
import type { Cell } from "../model/types";

/** Layer 3: cell names, plus the historical examples when toggled on. */
export default function CellNames({ cells, showExamples }: { cells: Cell[]; showExamples: boolean }) {
  // Draw each cell's name; with examples on, also its authoritarian and democratic examples, each with any bracketed note on its own line.
  return (
    <>
      {cells.map((cell) => { // Draw each cell's name; with examples on, also its authoritarian and democratic examples.
        const centerX = xToPixels(cell.col + CELL_CENTER);
        const topEdge = GRID_Y0 + cell.row * CELL_H;
        const nameWidth = cellNameWidth(cell.name);

        // Split a name from its bracketed note so the note can go on its own line.
        const split = (text: string): [string, string | undefined] => {
          // Split a name into the main text and a trailing parenthesised note, e.g. "Name (note)".
          const noteMatch = text.match(/^(.*?)\s*(\(.*\))$/);

          return noteMatch ? [noteMatch[1], noteMatch[2]] : [text, undefined];
        };

        const [authName, authNote] = split(cell.auth);
        const [demName, demNote] = split(cell.dem);
        const demY = topEdge + (authNote ? EXAMPLE_Y.demAfterNote : EXAMPLE_Y.dem);

        return (
          <g key={cell.name}>
            <rect x={centerX - nameWidth / 2} y={topEdge + CELL_NAME_BOX.top} width={nameWidth} height={CELL_NAME_BOX.height} rx={CELL_NAME_BOX.radius} fill="#fff" fillOpacity={CELL_NAME_BOX.opacity} />
            <text x={centerX} y={topEdge + CELL_NAME_BOX.top + CELL_NAME_BOX.textBaseline} textAnchor="middle" fontSize={FONT_SIZE.cellName} fontWeight={BOLD} fill={COLORS.cellName}>
              {cell.name}
            </text>
            {showExamples && (
              <>
                <text x={centerX} y={topEdge + EXAMPLE_Y.auth} textAnchor="middle" fontSize={FONT_SIZE.example}>
                  <tspan fontWeight={BOLD} fill={COLORS.auth}>Auth: </tspan>
                  <tspan fill="#333">{authName}</tspan>
                </text>
                {authNote && (
                  <text x={centerX} y={topEdge + EXAMPLE_Y.authNote} textAnchor="middle" fontSize={FONT_SIZE.note} fill="#555">
                    {authNote}
                  </text>
                )}
                <text x={centerX} y={demY} textAnchor="middle" fontSize={FONT_SIZE.example}>
                  <tspan fontWeight={BOLD} fill={COLORS.dem}>Dem: </tspan>
                  <tspan fill="#333">{demName}</tspan>
                </text>
                {demNote && (
                  <text x={centerX} y={demY + EXAMPLE_Y.noteGap} textAnchor="middle" fontSize={FONT_SIZE.note} fill="#555">
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
