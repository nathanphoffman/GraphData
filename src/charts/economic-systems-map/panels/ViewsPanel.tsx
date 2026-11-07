import type { Cell, Combo, EconomicSystemsData, EconomicSystemsViewsData } from "../model/types";
import Attitudes from "./ViewsPanel/Attitudes";
import ComboDetails from "./ViewsPanel/ComboDetails";
import SystemCombos from "./ViewsPanel/SystemCombos";
import SystemDetails from "./ViewsPanel/SystemDetails";

interface Props {
  model: EconomicSystemsData;
  viewsModel: EconomicSystemsViewsData;

  /** One cell for a system, two for a 2-way blend, four for a 4-way blend. */
  selectedCells: Cell[];
  neighbors: Cell[];

  /** Every 2-way and 4-way blend. */
  combos: Combo[];

  /** Four-way blends of the 2x2 blocks that include the selected system. */
  quadCombos: Combo[];
  activeCombo?: Combo;
  onPick: (names: string[]) => void;
}

/** The panel under the map: a system's common views, or a blend of two or four neighbors. */
export default function ViewsPanel({
  model,
  viewsModel,
  selectedCells,
  neighbors,
  combos,
  quadCombos,
  activeCombo,
  onPick,
}: Props) {
  const selectedCell = selectedCells.length === 1 ? selectedCells[0] : undefined;
  const selectedViews = selectedCell && viewsModel.cells[selectedCell.name];
  const attitudes = <Attitudes model={model} combos={combos} selectedCells={selectedCells} onPick={onPick} />;

  return (
    <section className="panel views" aria-live="polite">
      {activeCombo ? (
        <ComboDetails combo={activeCombo} viewsModel={viewsModel} attitudes={attitudes} />
      ) : (
        selectedCell &&
        selectedViews && (
          <SystemDetails
            cell={selectedCell}
            model={model}
            views={selectedViews}
            categories={viewsModel.categories}
            attitudes={attitudes}
            combos={<SystemCombos cell={selectedCell} neighbors={neighbors} quadCombos={quadCombos} onPick={onPick} />}
          />
        )
      )}
    </section>
  );
}
