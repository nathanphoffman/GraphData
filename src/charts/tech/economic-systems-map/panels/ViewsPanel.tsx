import { COLORS } from "../model/style";
import type { Cell, Combo, EconomicSystemsData, EconomicSystemsViewsData } from "../model/types";

interface Props {
  model: EconomicSystemsData;
  viewsModel: EconomicSystemsViewsData;
  selectedCell: Cell;
  neighbors: Cell[];
  activeCombo?: Combo;
  onPickPartner: (name: string | null) => void;
}

/** List of the views with the label for each. */
function ViewsList({ views, categories }: { views: Record<string, string>; categories: string[] }) {
  return (
    <dl className="views-list">
      {/* One heading per category of views. */}
      {categories.map((category) => (
        <div key={category}>
          <dt>{category}</dt>
          <dd>{views[category]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The panel under the map: a cell's common views, or a combo of two neighbors. */
export default function ViewsPanel({ model, viewsModel, selectedCell, neighbors, activeCombo, onPickPartner }: Props) {
  const selectedViews = viewsModel.cells[selectedCell.name];

  if (!selectedViews) return null;

  return (
    <section className="panel views" aria-live="polite">
      {activeCombo ? (
        <>
          <p className="views-crumb">
            <button type="button" className="link-button" onClick={() => onPickPartner(null)}>
              &larr; Back to {selectedCell.name}
            </button>
          </p>
          <h2>{activeCombo.name}</h2>
          <p className="muted">
            {activeCombo.cells[0]} + {activeCombo.cells[1]}. {activeCombo.summary}
          </p>
          <ViewsList views={activeCombo.views} categories={viewsModel.categories} />
          <p className="views-note">
            A blend of the two systems, not a position anyone necessarily holds. Go back to pick a different
            neighbor.
          </p>
        </>
      ) : (
        <>
          <h2>{selectedCell.name}</h2>
          <p className="muted">
            {model.rows[selectedCell.row]} · {model.columns[selectedCell.col]}. {selectedViews.summary}
          </p>
          <ViewsList views={selectedViews.views} categories={viewsModel.categories} />
          <p className="views-examples">
            <strong>Historical examples:</strong> <span style={{ color: COLORS.auth }}>Auth:</span>{" "}
            {selectedCell.auth} · <span style={{ color: COLORS.dem }}>Dem:</span> {selectedCell.dem}
          </p>
          <p className="views-note">
            Views commonly held by supporters of this system, as a summary and not a position.
          </p>
          <div className="views-combo">
            <strong>Combo with:</strong>
            {/* One button per neighbouring cell you can combine with. */}
            {neighbors.map((cell) => (
              <button key={cell.name} type="button" className="combo-button" onClick={() => onPickPartner(cell.name)}>
                {cell.name}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
