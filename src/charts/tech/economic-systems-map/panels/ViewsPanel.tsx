import { COLORS } from "../model/style";
import type { Cell, Combo, EconomicSystemsData, EconomicSystemsViewsData } from "../model/types";

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

/** The part of each story that names its situation, shown in bold. */
const STORY_SUBJECTS = [
  "A homeless person", "a horrible cut", "an idea for a new business", "lose your job", "buy or build a home",
  "Gas prices are high", "Rent goes up 20%", "cut your hours", "buy out your small shop", "can't afford college",
  "polluting your town's river", "your savings are thin", "tech startup is booming", "storm wipes out your neighborhood", "can't pay your medical bill",
  "The government needs money",
];
const SUBJECT_PATTERN = new RegExp(`(${STORY_SUBJECTS.map((subject) => subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);

/** One story with its situation in bold. */
function Story({ text }: { text: string }) {
  return (
    <li>
      {/* Split keeps the matched subject as every other piece, so those pieces are the ones to bold. */}
      {text.split(SUBJECT_PATTERN).map((piece, index) => (STORY_SUBJECTS.includes(piece) ? <strong key={index}>{piece}</strong> : piece))}
    </li>
  );
}

/** The "Stories" section at the top of a panel: short scenarios showing the system in daily life. */
function Examples({ examples }: { examples: string[] }) {
  return (
    <div className="examples">
      <h3>Stories</h3>
      <ul>
        {/* One short story per scenario. */}
        {examples.map((story) => (
          <Story key={story} text={story} />
        ))}
      </ul>

    </div>
  );
}

/** Views are grouped under their category so a long list stays scannable. */
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

/** Average grid position of some cells: the cell itself, the middle of a line, or the middle of a corner. */
function center(cells: Cell[]) {
  return {
    col: cells.reduce((sum, cell) => sum + cell.col, 0) / cells.length,
    row: cells.reduce((sum, cell) => sum + cell.row, 0) / cells.length,
  };
}

/** Systems and blends grouped by orthogonal distance from the center of the selection: under 1 is loved, 1 to 1.5 is indifferent, 2 is disliked, over 2 is hated. */
function attitudes(model: EconomicSystemsData, combos: Combo[], selectedCells: Cell[]) {
  const from = center(selectedCells);
  const sameCells = (names: string[]) => names.length === selectedCells.length && selectedCells.every((cell) => names.includes(cell.name));

  // Every system and every blend is a candidate; the selection itself is kept (it is at distance 0) and marked so it is not linked.
  const candidates = [
    ...model.cells.map((cell) => ({ combo: false, name: cell.name, names: [cell.name], cells: [cell] })),
    ...combos.map((combo) => ({ combo: true, name: combo.name, names: combo.cells, cells: model.cells.filter((cell) => combo.cells.includes(cell.name)) })),
  ].map((candidate) => {
    const spot = center(candidate.cells);

    return {
      combo: candidate.combo,
      name: candidate.name,
      names: candidate.names,
      self: sameCells(candidate.names),
      distance: Math.abs(spot.col - from.col) + Math.abs(spot.row - from.row),
    };
  });

  return [
    { label: "Likely Loves", color: "#2e7d32", items: candidates.filter((item) => item.distance < 1).sort((a, b) => a.distance - b.distance) },
    { label: "Likely Indifferent or Likes", color: "#73811e", items: candidates.filter((item) => item.distance >= 1 && item.distance <= 1.5).sort((a, b) => a.distance - b.distance) },
    { label: "Likely Indifferent or Dislikes", color: "#e65100", items: candidates.filter((item) => item.distance > 1.5 && item.distance <= 2) },
    { label: "Likely Hates", color: "#c62828", items: candidates.filter((item) => item.distance > 2).sort((a, b) => b.distance - a.distance) },
  ];
}

/** Comma-separated names: base models in bold, blends in plain text, each linking to its views except the current selection. */
function LinkList({ items, onPick }: { items: Array<{ name: string; names: string[]; combo: boolean; self: boolean }>; onPick: (names: string[]) => void }) {
  if (!items.length) return <>None</>;

  return (
    <>
      {items.map((item, index) => ( // One entry per system or blend.
        <span key={item.names.join("|")} style={{ fontWeight: item.combo ? undefined : 700 }}>
          {index > 0 && <span style={{ fontWeight: 400 }}>, </span>}
          {item.self ? (
            item.name
          ) : (
            <button type="button" className="link-button" style={{ fontWeight: "inherit" }} onClick={() => onPick(item.names)}>
              {item.name}
            </button>
          )}
        </span>
      ))}

    </>
  );
}

/** Likely loves / indifferent / dislikes lines for the chosen cells. */
function Attitudes({ model, combos, selectedCells, onPick }: { model: EconomicSystemsData; combos: Combo[]; selectedCells: Cell[]; onPick: (names: string[]) => void }) {
  return (
    <dl className="views-list attitudes">
      {/* One line per attitude, listing the systems that fall in it. */}
      {attitudes(model, combos, selectedCells).map(({ label, color, items }) => (
        <div key={label}>
          <dt style={{ color }}>{label}:</dt>
          <dd>
            <LinkList items={items} onPick={onPick} />
          </dd>
        </div>
      ))}

    </dl>
  );
}

/** The panel under the map: a system's common views, or a blend of two or four neighbors. */
export default function ViewsPanel({ model, viewsModel, selectedCells, neighbors, combos, quadCombos, activeCombo, onPick }: Props) {
  const selectedCell = selectedCells.length === 1 ? selectedCells[0] : undefined;
  const selectedViews = selectedCell && viewsModel.cells[selectedCell.name];

  return (
    <section className="panel views" aria-live="polite">
      {activeCombo ? (
        <>
          <h2>{activeCombo.name}</h2>
          <p className="muted">
            {activeCombo.cells.join(" + ")}. {activeCombo.summary}
          </p>
          <Examples examples={activeCombo.examples} />
          <ViewsList views={activeCombo.views} categories={viewsModel.categories} />
          <Attitudes model={model} combos={combos} selectedCells={selectedCells} onPick={onPick} />
          <p className="views-note">
            A blend of {activeCombo.cells.length === 2 ? "the two" : "all four"} systems, not a position anyone
            necessarily holds. Click the map elsewhere to pick a different one.
          </p>
        </>
      ) : selectedCell && selectedViews ? (
        <>
          <h2>{selectedCell.name}</h2>
          <p className="muted">
            {model.rows[selectedCell.row]} · {model.columns[selectedCell.col]}. {selectedViews.summary}
          </p>
          <Examples examples={selectedViews.examples} />
          <ViewsList views={selectedViews.views} categories={viewsModel.categories} />
          <Attitudes model={model} combos={combos} selectedCells={selectedCells} onPick={onPick} />
          <p className="views-examples">
            <strong>Historical examples:</strong> <span style={{ color: COLORS.auth }}>Auth:</span>{" "}
            {selectedCell.auth} · <span style={{ color: COLORS.dem }}>Dem:</span> {selectedCell.dem}
          </p>
          <p className="views-note">
            Views commonly held by supporters of this system, as a summary and not a position.
          </p>
          <div className="views-combo">
            <strong>Combo with:</strong>
            {neighbors.map((cell) => ( // One button per neighbouring cell you can combine with.
              <button key={cell.name} type="button" className="combo-button" onClick={() => onPick([selectedCell.name, cell.name])}>
                {cell.name}
              </button>
            ))}

          </div>
          {quadCombos.length > 0 && (
            <div className="views-combo">
              <strong>Four-way blend:</strong>
              {quadCombos.map((combo) => ( // One button per 2x2 block that includes this cell.
                <button key={combo.name} type="button" className="combo-button" onClick={() => onPick(combo.cells)}>
                  {combo.name}
                </button>
              ))}

            </div>
          )}
        </>
      ) : null}

    </section>
  );
}
