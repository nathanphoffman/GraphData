import { SEASONS } from "../model/calculate";
import { SEASON_FILTERS, type SeasonFilter } from "../model/storage";
import { COLUMNS } from "./columns";

interface SeasonProps {
  value: SeasonFilter | null;
  onToggle: (s: SeasonFilter) => void;
  onSchedule: (s: Exclude<SeasonFilter, "any">) => void;
}

function SeasonButtons({ value, onToggle, onSchedule }: SeasonProps) {
  return (
    <div className="astro-seasons">
      <span>Best season</span>
      {SEASON_FILTERS.map((season) => (
        <button
          key={season}
          type="button"
          aria-pressed={value === season}
          className={`astro-tag astro-tag-${season} astro-filter${value === season ? " astro-filter-on" : ""}`}
          onClick={() => onToggle(season)}
        >
          {season === "any" ? "Any" : SEASONS[season].label.split(" ")[0]}
        </button>
      ))}
      {value && value !== "any" && (
        <button type="button" className="astro-button" onClick={() => onSchedule(value)}>Generate Schedule</button>
      )}
    </div>
  );
}

function ColumnsMenu({ hidden, onToggle }: { hidden: Set<string>; onToggle: (id: string) => void }) {
  return (
    <details className="astro-columns-menu">
      <summary>Columns</summary>
      <div>
        {COLUMNS.map((c) => (
          <label key={c.id}>
            <input type="checkbox" checked={!hidden.has(c.id)} onChange={() => onToggle(c.id)} />
            {c.label}
          </label>
        ))}
      </div>
    </details>
  );
}

interface ToolbarProps extends SeasonProps {
  query: string;
  onQuery: (q: string) => void;
  hidden: Set<string>;
  onToggleColumn: (id: string) => void;
  count: string;
}

export function Toolbar({ query, onQuery, hidden, onToggleColumn, count, ...season }: ToolbarProps) {
  return (
    <div className="astro-toolbar">
      <input type="search" placeholder="Search name, nickname, constellation or type" value={query} onChange={(e) => onQuery(e.target.value)} aria-label="Search targets" />
      <SeasonButtons {...season} />
      <ColumnsMenu hidden={hidden} onToggle={onToggleColumn} />
      <small>{count}</small>
    </div>
  );
}
