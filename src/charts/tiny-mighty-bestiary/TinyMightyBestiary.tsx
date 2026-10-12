import { useState } from "react";
import CreatureCard from "./CreatureCard";
import EncounterGenerator from "./EncounterGenerator";
import FilterBar, { type Filters } from "./FilterBar";
import { LAST_STEP, TONE_LAST, difficulties, difficultyOf, model } from "./data";
import { matches } from "./search";
import "./styles.css";

const DEFAULT_FILTERS: Filters = {
  query: "",
  theme: null,
  type: null,
  difficulty: [0, LAST_STEP],
  tone: [0, TONE_LAST],
};

export default function TinyMightyBestiary() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { query, theme, type, difficulty, tone } = filters;

  const sliderChanged =
    difficulty[0] !== 0 || difficulty[1] !== LAST_STEP || tone[0] !== 0 || tone[1] !== TONE_LAST;
  const canClear = theme !== null || type !== null || sliderChanged;

  const creatures = [...model.creatures]
    .sort((a, b) => difficultyOf(a) - difficultyOf(b))
    .filter((c) => theme === null || c.themes.includes(theme))
    .filter((c) => type === null || c.type === type)
    .filter((c) => difficultyOf(c) >= difficulties[difficulty[0]] && difficultyOf(c) <= difficulties[difficulty[1]])
    .filter((c) => c.tone - 1 >= tone[0] && c.tone - 1 <= tone[1])
    .filter((c) => matches(c, query));

  return (
    <div className="bestiary">
      <p className="muted">
        Built with the combat table from {model.rulesVersion}. Net difficulty of an encounter should equal the number
        of players plus the levels they have gained. Each 1-use power adds 0.5 difficulty. Enemies die at 0 health and
        power damage ignores defense.
      </p>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        canClear={canClear}
        onClear={() => setFilters({ ...DEFAULT_FILTERS, query })}
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
