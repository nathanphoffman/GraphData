import FilterChips from "./FilterChips";
import { DIFFICULTY_BANDS, SORTS, TONE_BANDS, model } from "../../model/data";

export interface Filters {
  query: string;
  theme: string;
  type: string | null;
  difficulty: string | null;
  tone: string | null;
  sort: string;
}

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  /** True when any filter other than the search box differs from its default. */
  canClear: boolean;
  onClear: () => void;
}

/** Themes shown on the first row; the rest go on a second row. */
const SCIFI_THEMES = new Set(["scifi", "science-fantasy", "space-wars", "space-hammer", "space-jammer", "cyberpunk", "post-apocalypse"]);
const SCIFI_OPTIONS = model.themes.filter((theme) => SCIFI_THEMES.has(theme.id));
const OTHER_OPTIONS = model.themes.filter((theme) => !SCIFI_THEMES.has(theme.id));

const THEME_CHIP_CLASS = "bestiary-theme-chip";

/** Class used for the theme chips so they share one style. */
const themeChipClass = () => THEME_CHIP_CLASS;

/** Search, theme, type, difficulty and tone filters with a button to clear them. */
export default function FilterBar({ filters, onChange, canClear, onClear }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <>
      <FilterChips
        label="Theme"
        options={SCIFI_OPTIONS}
        active={filters.theme}
        onChange={(theme) => theme && set({ theme })}
        chipClass={themeChipClass}
      />
      <FilterChips
        label=""
        groupName="Theme"
        options={OTHER_OPTIONS}
        active={filters.theme}
        onChange={(theme) => theme && set({ theme })}
        chipClass={themeChipClass}
      />
      <FilterChips
        label="Type"
        options={model.creatureTypes}
        active={filters.type}
        onChange={(type) => set({ type })}
        chipClass={(identifier) => `bestiary-type-${identifier}`}
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
        chipClass={themeChipClass}
      />
      <FilterChips
        label="Tone"
        options={TONE_BANDS}
        active={filters.tone}
        onChange={(tone) => set({ tone })}
        chipClass={themeChipClass}
      />
      <FilterChips
        label="Sort"
        options={SORTS}
        active={filters.sort}
        onChange={(sort) => sort && set({ sort })}
        chipClass={themeChipClass}
      />
      <input
        type="search"
        className="bestiary-search"
        placeholder="Search creatures, powers, skills, classic names..."
        aria-label="Search creatures"
        value={filters.query}
        onChange={(event) => set({ query: event.target.value })}
      />
    </>
  );
}
