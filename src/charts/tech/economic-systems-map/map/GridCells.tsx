import { COLORS, CELL_H, CELL_W, GRID_LEFT, GRID_TOP, HEADER_COL_W, HEADER_ROW_H } from "../model/style";
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
          className="map-cell"
          role="button"
          tabIndex={0}
          aria-label={`${cell.name}: show common views`}
          onClick={() => onSelect(cell.name)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(cell.name);
            }
          }}
        />
      ))}
    </>
  );
}
