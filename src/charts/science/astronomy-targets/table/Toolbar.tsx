import { SEASONS } from "../model/calculate";
import { SEASON_FILTERS, type SeasonFilter } from "../model/storage";
import { COLUMNS } from "./columns";

interface SeasonProps {
  value: SeasonFilter | null;
  onToggle: (seasonFilter: SeasonFilter) => void;
  onSchedule: (exclude: Exclude<SeasonFilter, "any">) => void;
}

/** Buttons for narrowing the table to one season or opening the night schedule. */
function SeasonButtons({ value, onToggle, onSchedule }: SeasonProps) {
  return (
    <div className="astro-seasons">
      <span>Best season</span>
      {/* One button per season filter. */}
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

/** Menu of checkboxes for showing and hiding table columns. */
function ColumnsMenu({ hidden, onToggle }: { hidden: Set<string>; onToggle: (identifier: string) => void }) {
  return (
    <details className="astro-columns-menu">
      <summary>Columns</summary>
      <div>
        {/* One checkbox per column for showing or hiding it. */}
        {COLUMNS.map((column) => (
          <label key={column.id}>
            <input type="checkbox" checked={!hidden.has(column.id)} onChange={() => onToggle(column.id)} />
            {column.label}
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
  onToggleColumn: (identifier: string) => void;
  count: string;
}

/** Search box, season filter and column menu above the table. */
export function Toolbar({ query, onQuery, hidden, onToggleColumn, count, ...season }: ToolbarProps) {
  return (
    <div className="astro-toolbar">
      <input type="search" placeholder="Search name, nickname, constellation or type" value={query} onChange={(event) => onQuery(event.target.value)} aria-label="Search targets" />
      <SeasonButtons {...season} />
      <ColumnsMenu hidden={hidden} onToggle={onToggleColumn} />
      <small>{count}</small>
    </div>
  );
}
