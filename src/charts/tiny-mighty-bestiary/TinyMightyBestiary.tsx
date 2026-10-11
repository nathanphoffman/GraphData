import { useState } from "react";
import meta from "../../../data/tiny-mighty-bestiary/meta.json";
import beasts from "../../../data/tiny-mighty-bestiary/beast.json";
import humanoids from "../../../data/tiny-mighty-bestiary/humanoid.json";
import animated from "../../../data/tiny-mighty-bestiary/animated.json";
import otherworldly from "../../../data/tiny-mighty-bestiary/otherworldly.json";
import monsters from "../../../data/tiny-mighty-bestiary/monster.json";
import RangeSlider from "./RangeSlider";
import type { BestiaryData, Creature } from "./types";
import "./styles.css";

const data = {
  ...meta,
  creatures: [...beasts, ...humanoids, ...animated, ...otherworldly, ...monsters],
};
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

/** Slider stops for the encounter builder: 1-12 players, 0-10 levels gained in half steps. */
const PLAYER_STOPS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const LEVEL_STOPS = Array.from({ length: 21 }, (_, i) => String(i / 2));

function sign(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

/**
 * Random fill: pick a random target inside [low, high], then keep adding random creatures that
 * still fit under it. Retries many times; an attempt that lands inside the range wins right away,
 * otherwise the attempt closest to the low end is kept.
 */
function buildEncounter(pool: Creature[], low: number, high: number): Creature[] {
  const targets: number[] = [];
  for (let t = low; t <= high; t += 0.25) targets.push(t);
  let best: Creature[] = [];
  let bestGap = Infinity;
  for (let attempt = 0; attempt < 300; attempt++) {
    const target = targets[Math.floor(Math.random() * targets.length)];
    const picks: Creature[] = [];
    let left = target;
    for (;;) {
      const fits = pool.filter((c) => difficultyOf(c) <= left);
      if (fits.length === 0) break;
      const next = fits[Math.floor(Math.random() * fits.length)];
      picks.push(next);
      left -= difficultyOf(next);
    }
    const total = target - left;
    if (total >= low) return picks;
    if (low - total < bestGap) {
      best = picks;
      bestGap = low - total;
    }
  }
  return best;
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
        <strong>Attack:</strong> {creature.attack}
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
        {creature.skillNote && `. ${creature.skillNote}`}
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
  const [players, setPlayers] = useState<[number, number]>([3, 3]);
  const [levels, setLevels] = useState<[number, number]>([0, 0]);
  const [encounter, setEncounter] = useState<{ low: number; high: number; picks: Creature[] } | null>(null);
  // Target difficulty range = players + levels gained, at the low and high ends.
  const targetLow = players[0] + 1 + levels[0] / 2;
  const targetHigh = players[1] + 1 + levels[1] / 2;
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
      <div className="bestiary-encounter">
        <div className="bestiary-encounter-sliders">
          <div className="bestiary-key">
            <span className="bestiary-key-label">Players</span>
            <RangeSlider stops={PLAYER_STOPS} value={players} onChange={setPlayers} labelPrefix="players" />
          </div>
          <div className="bestiary-key">
            <span className="bestiary-key-label">Levels gained</span>
            <RangeSlider stops={LEVEL_STOPS} value={levels} onChange={setLevels} labelPrefix="levels gained" />
          </div>
          <p className="muted">
            Target difficulty: {targetLow === targetHigh ? targetLow : `${targetLow} to ${targetHigh}`}
          </p>
        </div>
        <button
          type="button"
          className="bestiary-generate"
          disabled={creatures.length === 0}
          onClick={() =>
            setEncounter({
              low: targetLow,
              high: targetHigh,
              picks: buildEncounter(creatures, targetLow, targetHigh),
            })
          }
        >
          Generate Encounter
        </button>
        {encounter && (() => {
          const total = encounter.picks.reduce((sum, c) => sum + difficultyOf(c), 0);
          const groups = [...new Map(encounter.picks.map((c) => [c.id, c])).values()]
            .map((c) => ({ c, n: encounter.picks.filter((p) => p.id === c.id).length }))
            .sort((a, b) => difficultyOf(b.c) - difficultyOf(a.c));
          return (
            <div className="bestiary-encounter-result">
              <p>
                <strong>
                  Difficulty {total} (target {encounter.low === encounter.high ? encounter.low : `${encounter.low} to ${encounter.high}`})
                </strong>
                {total < encounter.low && " (closest the current filters allow)"}
              </p>
              {groups.length === 0 && <p className="muted">Nothing in the filtered list fits under that difficulty.</p>}
              <div className="bestiary-grid">
                {groups.map(({ c, n }) => (
                  <div key={c.id} className="bestiary-encounter-item">
                    <span className="bestiary-encounter-count">x{n}</span>
                    <CreatureCard creature={c} />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
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
