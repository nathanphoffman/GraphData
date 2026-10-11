import { useState } from "react";
import data from "../../../data/tiny-mighty-bestiary.json";
import RangeSlider from "./RangeSlider";
import type { BestiaryData, Creature } from "./types";
import "./styles.css";

const model = data as BestiaryData;

function tierFor(creature: Creature) {
  const tier = model.tiers.find((t) => t.difficulty === creature.tier);
  if (!tier) throw new Error(`No combat tier ${creature.tier} for ${creature.name}`);
  return tier;
}

/** Final difficulty: base tier + 0.5 per 1-use power. */
function difficultyOf(creature: Creature) {
  return creature.tier + creature.powers.reduce((sum, p) => sum + 0.5 * p.uses, 0);
}

/** Every difficulty that exists in the data, lowest first. The slider steps through these. */
const difficulties = [...new Set(model.creatures.map(difficultyOf))].sort((a, b) => a - b);
const LAST_STEP = difficulties.length - 1;
const TONE_LAST = model.toneScale.length - 1;

function sign(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

function matches(creature: Creature, query: string) {
  const text = [
    creature.name,
    ...creature.aliases,
    ...creature.themes,
    model.toneScale[creature.tone - 1],
    creature.description,
    creature.attack,
    ...creature.skills.map((s) => `${s.skill} ${s.mod === "+" ? "advantage" : "disadvantage"} ${s.note ?? ""}`),
    creature.skillNote ?? "",
    creature.tactics,
    creature.flying ? "flying" : "",
    ...creature.powers.flatMap((p) => [p.name, p.text, model.powerTypes[p.type].label]),
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

function CreatureCard({ creature }: { creature: Creature }) {
  const tier = tierFor(creature);
  const difficulty = difficultyOf(creature);

  return (
    <article className={`bestiary-card bestiary-type-${creature.type}`}>
      <header className="bestiary-head">
        <h2>{creature.name}</h2>
        <span className="bestiary-difficulty">Difficulty {difficulty}</span>
      </header>
      <p className="bestiary-desc">{creature.description}</p>
      <p className="bestiary-tone">
        Tone: <strong>{model.toneScale[creature.tone - 1]}</strong>
      </p>

      <dl className="bestiary-stats">
        <div>
          <dt>Health</dt>
          <dd>{tier.health}</dd>
        </div>
        <div>
          <dt>Defense</dt>
          <dd>{tier.defense}</dd>
        </div>
        <div>
          <dt>Bonus</dt>
          <dd>{sign(tier.bonus)}</dd>
        </div>
        <div>
          <dt>Turns</dt>
          <dd>{tier.turns}</dd>
        </div>
      </dl>

      <p>
        <strong>Attack:</strong> {creature.attack}, 2d6 {sign(tier.bonus)} minus the target's defense.
      </p>
      <p>
        <strong>Skills:</strong>{" "}
        {creature.skills.map((s, i) => (
          <span key={s.skill}>
            {i > 0 && ", "}
            {s.skill}
            <span className={s.mod === "+" ? "bestiary-adv" : "bestiary-dis"}>{s.mod === "+" ? "+" : "\u2212"}</span>
            {s.note && ` (${s.note})`}
          </span>
        ))}
        . Others {sign(tier.bonus)}. {creature.skillNote}
      </p>
      {creature.flying && (
        <p>
          <strong>Flying.</strong> Costs 1 extra use if a player summons or becomes this creature.
        </p>
      )}
      {creature.powers.map((power) => (
        <p key={power.name} className="bestiary-power">
          <strong>{power.name}</strong> ({model.powerTypes[power.type].label}, {power.uses} use
          {power.uses === 1 ? "" : "s"}): {power.text}
        </p>
      ))}
      {tier.extended && (
        <p className="bestiary-extended">Stats extended past the printed combat table.</p>
      )}
      <p className="bestiary-tactics">
        <strong>Tactics:</strong> {creature.tactics}
      </p>
    </article>
  );
}

export default function TinyMightyBestiary() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [range, setRange] = useState<[number, number]>([0, LAST_STEP]);
  const [toneRange, setToneRange] = useState<[number, number]>([0, TONE_LAST]);
  const rangeChanged = range[0] !== 0 || range[1] !== LAST_STEP || toneRange[0] !== 0 || toneRange[1] !== TONE_LAST;
  const creatures = [...model.creatures]
    .sort((a, b) => difficultyOf(a) - difficultyOf(b))
    .filter((c) => activeTheme === null || c.themes.includes(activeTheme))
    .filter((c) => activeType === null || c.type === activeType)
    .filter((c) => difficultyOf(c) >= difficulties[range[0]] && difficultyOf(c) <= difficulties[range[1]])
    .filter((c) => c.tone - 1 >= toneRange[0] && c.tone - 1 <= toneRange[1])
    .filter((c) => matches(c, query));

  /** Only one chip per row can be on; clicking the active one turns it off. */
  function pick(current: string | null, id: string) {
    return current === id ? null : id;
  }

  return (
    <div className="bestiary">
      <p className="muted">
        Built with the combat table from {model.rulesVersion}. Net difficulty of an encounter should equal the number
        of players plus the levels they have gained. Each 1-use power adds 0.5 difficulty. Enemies die at 0 health and
        power damage ignores defense.
      </p>
      <div className="bestiary-key" role="group" aria-label="Filter by theme">
        <span className="bestiary-key-label">Theme</span>
        {model.themes.map((t) => {
          const active = activeTheme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              className={`bestiary-chip bestiary-theme-chip${active ? " is-active" : ""}`}
              onClick={() => setActiveTheme((current) => pick(current, t.id))}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="bestiary-key" role="group" aria-label="Filter by creature type">
        <span className="bestiary-key-label">Type</span>
        {model.creatureTypes.map((t) => {
          const active = activeType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              className={`bestiary-chip bestiary-type-${t.id}${active ? " is-active" : ""}`}
              onClick={() => setActiveType((current) => pick(current, t.id))}
            >
              <span className="bestiary-swatch" />
              {t.label}
            </button>
          );
        })}
        {(activeType !== null || activeTheme !== null || rangeChanged) && (
          <button
            type="button"
            className="bestiary-clear"
            onClick={() => {
              setActiveType(null);
              setActiveTheme(null);
              setRange([0, LAST_STEP]);
              setToneRange([0, TONE_LAST]);
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="bestiary-key">
        <span className="bestiary-key-label">Difficulty</span>
        <RangeSlider
          stops={difficulties.map(String)}
          value={range}
          onChange={setRange}
          labelPrefix="difficulty"
        />
      </div>
      <div className="bestiary-key">
        <span className="bestiary-key-label">Tone</span>
        <RangeSlider stops={model.toneScale} value={toneRange} onChange={setToneRange} labelPrefix="tone" />
      </div>
      <input
        type="search"
        className="bestiary-search"
        placeholder="Search creatures, powers, skills, classic names..."
        aria-label="Search creatures"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {creatures.length === 0 && <p className="muted">No creatures match these filters.</p>}
      <div className="bestiary-grid">
        {creatures.map((creature) => (
          <CreatureCard key={creature.id} creature={creature} />
        ))}
      </div>
    </div>
  );
}
