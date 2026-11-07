import { attitudes, type Candidate } from "../../model/attitudes";
import type { Cell, Combo, EconomicSystemsData } from "../../model/types";

interface LinkListProps {
  items: Candidate[];
  onPick: (names: string[]) => void;
}

/** Comma-separated names: base models in bold, blends in plain text, each linking to its views except the current selection. */
function LinkList({ items, onPick }: LinkListProps) {
  if (!items.length) return <>None</>;

  return (
    <>
      {/* One entry per system or blend. */}
      {items.map((item, index) => (
        <span key={item.names.join("|")} style={{ fontWeight: item.combo ? undefined : 700 }}>
          {index > 0 && <span style={{ fontWeight: 400 }}>, </span>}
          {item.self ? (
            item.name
          ) : (
            <button
              type="button"
              className="link-button"
              style={{ fontWeight: "inherit" }}
              onClick={() => onPick(item.names)}
            >
              {item.name}
            </button>
          )}
        </span>
      ))}
    </>
  );
}

interface Props {
  model: EconomicSystemsData;
  combos: Combo[];
  selectedCells: Cell[];
  onPick: (names: string[]) => void;
}

/** Likely loves / indifferent / dislikes lines for the chosen cells. */
export default function Attitudes({ model, combos, selectedCells, onPick }: Props) {
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
