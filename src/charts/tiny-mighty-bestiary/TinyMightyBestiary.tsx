import { useState } from "react";
import CreatureCard from "./CreatureCard";
import Credits from "./Credits";
import EncounterGenerator from "./EncounterGenerator";
import FilterBar, { type Filters } from "./FilterBar";
import { DIFFICULTY_BANDS, TONE_BANDS, difficultyOf, model } from "./data";
import { matches } from "./search";
import "./styles.css";

const DEFAULT_FILTERS: Filters = {
  query: "",
  theme: "fantasy",
  type: null,
  difficulty: null,
  tone: null,
};

export default function TinyMightyBestiary() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { query, theme, type, difficulty, tone } = filters;

  const canClear = type !== null || difficulty !== null || tone !== null;
  const band = DIFFICULTY_BANDS.find((b) => b.id === difficulty);
  const toneBand = TONE_BANDS.find((b) => b.id === tone);

  const creatures = [...model.creatures]
    .sort((a, b) => difficultyOf(a) - difficultyOf(b))
    .filter((c) => c.themes.includes(theme))
    .filter((c) => type === null || c.type === type)
    .filter((c) => !band || (difficultyOf(c) >= band.min && difficultyOf(c) <= band.max))
    .filter((c) => !toneBand || toneBand.tones.includes(c.tone))
    .filter((c) => matches(c, query));

  return (
    <div className="bestiary">
      <Credits />
      <p className="muted">
        Built with the combat table from {model.rulesVersion}. Net difficulty of an encounter should equal the number
        of players plus the levels they have gained. Each 1-use power adds 0.5 difficulty. Enemies die at 0 health and
        power damage ignores defense.
      </p>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        canClear={canClear}
        onClear={() => setFilters({ ...DEFAULT_FILTERS, query, theme })}
      />
      <EncounterGenerator pool={creatures} />
      <div className="bestiary-divider" role="separator">
        <span>All creatures ({creatures.length})</span>
      </div>
      {creatures.length === 0 && <p className="muted">No creatures match these filters.</p>}
      <div className="bestiary-grid">
        {creatures.map((creature) => (
          <CreatureCard key={creature.id} creature={creature} />
        ))}
      </div>
    </div>
  );
}
