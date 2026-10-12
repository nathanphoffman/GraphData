import FilterChips from "./FilterChips";
import SliderRow from "./SliderRow";
import { difficulties, model } from "./data";

export interface Filters {
  query: string;
  theme: string | null;
  type: string | null;
  difficulty: [number, number];
  tone: [number, number];
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
      <SliderRow
        label="Difficulty"
        stops={difficulties.map(String)}
        value={filters.difficulty}
        onChange={(difficulty) => set({ difficulty })}
      />
      <SliderRow label="Tone" stops={model.toneScale} value={filters.tone} onChange={(tone) => set({ tone })} />
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
