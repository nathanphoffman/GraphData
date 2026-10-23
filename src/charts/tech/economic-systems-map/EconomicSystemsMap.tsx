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

/** The economic systems grid: pick a system, optionally pick a neighbouring cell to see how the two combine. */
export default function EconomicSystemsMap() {
  const [showExamples, setShowExamples] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  /** The adjacent cell chosen under "Combo with", if any. */
  const [partner, setPartner] = useState<string | null>(null);

  // Picking a system clears the partner, since combos only make sense for the new system.
  const select = (name: string) => {
    setSelected(name);
    setPartner(null);
  };

  const selectedCell = model.cells.find((cell) => cell.name === selected);
  const neighbors = selectedCell
    ? model.cells.filter(
        (cell) => Math.abs(cell.col - selectedCell.col) + Math.abs(cell.row - selectedCell.row) === 1,
      )
    : [];
  const activeCombo: Combo | undefined =
    selected && partner ? combos.find((combo) => combo.cells.includes(selected) && combo.cells.includes(partner)) : undefined;

  // The outline sits on the selected cell, or centered between both cells while a combo is shown.
  const partnerCell = activeCombo ? model.cells.find((cell) => cell.name === partner) : undefined;
  const highlight =
    selectedCell && partnerCell
      ? { col: (selectedCell.col + partnerCell.col) / 2, row: (selectedCell.row + partnerCell.row) / 2 }
      : selectedCell;

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

      <MapSvg model={model} showExamples={showExamples} highlight={highlight} onSelect={select} />

      {selectedCell ? (
        <ViewsPanel
          model={model}
          viewsModel={viewsModel}
          selectedCell={selectedCell}
          neighbors={neighbors}
          activeCombo={activeCombo}
          onPickPartner={setPartner}
        />
      ) : (
        <p className="muted">Click a cell to see the common views of that system by topic.</p>
      )}
    </div>
  );
}
