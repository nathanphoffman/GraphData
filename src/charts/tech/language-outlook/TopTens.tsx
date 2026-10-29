import { useMemo } from "react";
import { buildTopTens } from "./model/topTens";
import type { LanguageOutlookData } from "./model/types";

/** How see-through the last tile of a list is. */
const LAST_TILE_OPACITY = 0.5;

/** Higher keeps the first tiles solid for longer and drops the last ones faster (1 would fade evenly). */
const FADE_CURVE = 3;

/** A small ticker-style mark: green +N when the language ranks N places higher here than in the other lists, red -N when lower. Nothing for small differences. */
function Shift({ change }: { change: number | undefined }) {
  if (change === undefined) return null;

  const label = change > 0 ? `${change} places higher here than in the other lists` : `${-change} places lower here than in the other lists`;

  return (
    <span className={change > 0 ? "top-ten-shift up" : "top-ten-shift down"} title={label}>
      {change > 0 ? `+${change}` : `−${-change}`}
    </span>
  );
}

/** Rows of ten tiles, #1 on the left: the language name with its rank number laid over the tile. */
export default function TopTens({ model }: { model: LanguageOutlookData }) {
  const lists = useMemo(() => buildTopTens(model), [model]);

  return (
    <div className="top-tens">
      {lists.map((list) => (
        <section key={list.title} className="top-ten" style={{ "--tile-color": list.color } as React.CSSProperties}>
          <h3>
            {list.title}
            <span className="top-ten-sub">{list.description}</span>
          </h3>
          <ol className="top-ten-tiles">
            {list.names.map((name, index) => (
              <li key={name} className="top-ten-tile" style={{ opacity: 1 - (index / Math.max(1, list.names.length - 1)) ** FADE_CURVE * (1 - LAST_TILE_OPACITY) }}>
                <Shift change={list.shifts[name]} />
                <span className="top-ten-rank" aria-hidden="true">{index + 1}</span>
                <span className="top-ten-name">{name}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
