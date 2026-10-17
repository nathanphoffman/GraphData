import { useState } from "react";
import CreatureCard from "./CreatureCard";
import Credits from "./Credits";
import EncounterGenerator from "./EncounterGenerator";
import FilterBar, { type Filters } from "./FilterBar";
import { DIFFICULTY_BANDS, TONE_BANDS, difficultyOf, model } from "./data";
import { matches } from "./search";
import type { Creature } from "./types";
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

  const passesFilters = (c: Creature) =>
    (type === null || c.type === type) &&
    (!band || (difficultyOf(c) >= band.min && difficultyOf(c) <= band.max)) &&
    (!toneBand || toneBand.tones.includes(c.tone)) &&
    matches(c, query);

  const sorted = [...model.creatures].sort((a, b) => difficultyOf(a) - difficultyOf(b));
  const creatures = sorted.filter((c) => c.themes.includes(theme) && passesFilters(c));
  // With nothing found in the selected theme, a search falls back to every other theme.
  const otherThemes =
    creatures.length === 0 && query.trim() !== ""
      ? sorted.filter((c) => !c.themes.includes(theme) && passesFilters(c))
      : [];

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
      {creatures.length === 0 && otherThemes.length === 0 && <p className="muted">No creatures match these filters.</p>}
      <div className="bestiary-grid">
        {creatures.map((creature) => (
          <CreatureCard key={creature.id} creature={creature} />
        ))}
      </div>
      {otherThemes.length > 0 && (
        <>
          <div className="bestiary-divider" role="separator">
            <span>In Other Themes: ({otherThemes.length})</span>
          </div>
          <div className="bestiary-grid">
            {otherThemes.map((creature) => (
              <CreatureCard key={creature.id} creature={creature} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
