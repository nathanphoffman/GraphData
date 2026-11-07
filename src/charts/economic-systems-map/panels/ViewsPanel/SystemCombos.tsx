import type { Cell, Combo } from "../../model/types";

interface Props {
  cell: Cell;
  neighbors: Cell[];
  quadCombos: Combo[];
  onPick: (names: string[]) => void;
}

/** Buttons to blend the selected system with a neighbour, or with the three around it in a 2x2 block. */
export default function SystemCombos({ cell, neighbors, quadCombos, onPick }: Props) {
  return (
    <>
      <div className="views-combo">
        <strong>Combo with:</strong>
        {/* One button per neighbouring cell you can combine with. */}
        {neighbors.map((neighbor) => (
          <button
            key={neighbor.name}
            type="button"
            className="combo-button"
            onClick={() => onPick([cell.name, neighbor.name])}
          >
            {neighbor.name}
          </button>
        ))}
      </div>
      {quadCombos.length > 0 && (
        <div className="views-combo">
          <strong>Four-way blend:</strong>
          {/* One button per 2x2 block that includes this cell. */}
          {quadCombos.map((combo) => (
            <button key={combo.name} type="button" className="combo-button" onClick={() => onPick(combo.cells)}>
              {combo.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
