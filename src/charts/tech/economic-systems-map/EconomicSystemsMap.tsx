import { useState } from "react";
import "./styles.css";
import data from "../../../../data/economic-systems/economic-systems-map.json";
import views from "../../../../data/economic-systems/economic-systems-views.json";
import combosData from "../../../../data/economic-systems/economic-systems-combos.json";
import type { Combo, EconomicSystemsCombosData, EconomicSystemsData, EconomicSystemsViewsData } from "./model/types";
import MapSvg from "./map/MapSvg";
import ViewsPanel from "./panels/ViewsPanel";

const model = data as EconomicSystemsData;
const viewsModel = views as EconomicSystemsViewsData;
const combos = (combosData as unknown as EconomicSystemsCombosData).combos;

/** The economic systems grid: click a system, a line between two, or a corner shared by four to see the views of that system or blend. */
export default function EconomicSystemsMap() {
  const [showExamples, setShowExamples] = useState(false);

  /** Names of the chosen cells: one for a system, two for a 2-way blend, four for a 4-way blend. */
  const [selection, setSelection] = useState<string[]>([]);

  const selectedCells = model.cells.filter((cell) => selection.includes(cell.name));
  const single = selectedCells.length === 1 ? selectedCells[0] : undefined;
  const neighbors = single
    ? model.cells.filter((cell) => Math.abs(cell.col - single.col) + Math.abs(cell.row - single.row) === 1)
    : [];

  // The 2x2 blocks of cells that contain the selected system, each with a four-way blend.
  const quadCombos = single ? combos.filter((combo) => combo.cells.length === 4 && combo.cells.includes(single.name)) : [];
  const activeCombo: Combo | undefined =
    selectedCells.length > 1
      ? combos.find((combo) => combo.cells.length === selectedCells.length && selectedCells.every((cell) => combo.cells.includes(cell.name)))
      : undefined;

  // The outline is centered on the middle of the chosen cells: on the cell, the shared line, or the shared corner.
  const highlight = selectedCells.length
    ? {
        col: selectedCells.reduce((sum, cell) => sum + cell.col, 0) / selectedCells.length,
        row: selectedCells.reduce((sum, cell) => sum + cell.row, 0) / selectedCells.length,
      }
    : undefined;

  return (
    <div>
      <section className="theory">
        <h2>{model.theory.heading}</h2>
        {/* One paragraph per theory note. */}
        {model.theory.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <p className="views-note">{model.theory.caveat}</p>
      </section>

      <label className="map-toggle">
        <input type="checkbox" checked={showExamples} onChange={(event) => setShowExamples(event.target.checked)} />
        Show historical examples instead of figures
      </label>

      <MapSvg model={model} showExamples={showExamples} highlight={highlight} onSelect={setSelection} />

      {selectedCells.length ? (
        <ViewsPanel
          model={model}
          viewsModel={viewsModel}
          selectedCells={selectedCells}
          neighbors={neighbors}
          combos={combos}
          quadCombos={quadCombos}
          activeCombo={activeCombo}
          onPick={setSelection}
        />
      ) : (
        <p className="muted">Click a cell to see the common views of that system by topic.</p>
      )}

    </div>
  );
}
