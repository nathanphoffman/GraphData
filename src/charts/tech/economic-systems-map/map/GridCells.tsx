import { BOLD, CELL_CENTER, CELL_H, CELL_W, COLORS, FONT_SIZE, GRID_LEFT, GRID_TOP, HEADER_COL_W, HEADER_ROW_H, HEADER_TEXT_BASELINE, ROW_HEADER_NUDGE } from "../model/style";
import { GRID_X0, GRID_Y0 } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";

interface Props {
  model: EconomicSystemsData;
  onSelect: (name: string) => void;
}

/** Layer 0: column/row headers and the clickable cells. */
export default function GridCells({ model, onSelect }: Props) {
  return (
    <>
      <rect x={GRID_LEFT} y={GRID_TOP} width={HEADER_COL_W} height={HEADER_ROW_H} fill={COLORS.header} stroke={COLORS.border} />
      <text x={GRID_LEFT + HEADER_COL_W / 2} y={GRID_TOP + HEADER_TEXT_BASELINE} textAnchor="middle" fontSize={FONT_SIZE.sizeHeader} fontWeight={BOLD} fill={COLORS.headerText}>
        Size
      </text>
      {/* One header cell per column. */}
      {model.columns.map((name, index) => (
        <g key={name}>
          <rect x={GRID_X0 + index * CELL_W} y={GRID_TOP} width={CELL_W} height={HEADER_ROW_H} fill={COLORS.header} stroke={COLORS.border} />
          <text x={GRID_X0 + (index + CELL_CENTER) * CELL_W} y={GRID_TOP + HEADER_TEXT_BASELINE} textAnchor="middle" fontSize={FONT_SIZE.header} fontWeight={BOLD} fill={COLORS.headerText}>
            {name}
          </text>
        </g>
      ))}

      {/* One header cell per row. */}
      {model.rows.map((name, index) => (
        <g key={name}>
          <rect x={GRID_LEFT} y={GRID_Y0 + index * CELL_H} width={HEADER_COL_W} height={CELL_H} fill={COLORS.header} stroke={COLORS.border} />
          <text x={GRID_LEFT + HEADER_COL_W / 2} y={GRID_Y0 + (index + CELL_CENTER) * CELL_H + ROW_HEADER_NUDGE} textAnchor="middle" fontSize={FONT_SIZE.header} fontWeight={BOLD} fill={COLORS.headerText}>
            {name}
          </text>
        </g>
      ))}

      {/* One clickable cell per system. */}
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
          className="map-cell"
          role="button"
          tabIndex={0}
          aria-label={`${cell.name}: show common views`}
          onClick={() => onSelect(cell.name)}

          // Let keyboard users pick a cell with Enter or Space.
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(cell.name);
            }
          }}
        />
      ))}
    </>
  );
}
