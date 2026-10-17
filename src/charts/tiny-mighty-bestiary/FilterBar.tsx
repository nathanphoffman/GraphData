import FilterChips from "./FilterChips";
import { DIFFICULTY_BANDS, TONE_BANDS, model } from "./data";

export interface Filters {
  query: string;
  theme: string | null;
  type: string | null;
  difficulty: string | null;
  tone: string | null;
}

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  /** True when any filter other than the search box differs from its default. */
  canClear: boolean;
  onClear: () => void;
}

export default function FilterBar({ filters, onChange, canClear, onClear }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <>
      <FilterChips
        label="Theme"
        options={model.themes}
        active={filters.theme}
        onChange={(theme) => set({ theme })}
        chipClass={() => "bestiary-theme-chip"}
      />
      <FilterChips
        label="Type"
        options={model.creatureTypes}
        active={filters.type}
        onChange={(type) => set({ type })}
        chipClass={(id) => `bestiary-type-${id}`}
        swatch
      >
        {canClear && (
          <button type="button" className="bestiary-clear" onClick={onClear}>
            Clear filters
          </button>
        )}
      </FilterChips>
      <FilterChips
        label="Difficulty"
        options={DIFFICULTY_BANDS}
        active={filters.difficulty}
        onChange={(difficulty) => set({ difficulty })}
        chipClass={() => "bestiary-theme-chip"}
      />
      <FilterChips
        label="Tone"
        options={TONE_BANDS}
        active={filters.tone}
        onChange={(tone) => set({ tone })}
        chipClass={() => "bestiary-theme-chip"}
      />
      <input
        type="search"
        className="bestiary-search"
        placeholder="Search creatures, powers, skills, classic names..."
        aria-label="Search creatures"
        value={filters.query}
        onChange={(e) => set({ query: e.target.value })}
      />
    </>
  );
}
