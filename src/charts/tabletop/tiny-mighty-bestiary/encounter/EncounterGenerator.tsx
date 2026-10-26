import { useState } from "react";
import CreatureCard from "../ui/cards/CreatureCard";
import SliderRow from "../ui/filters/SliderRow";
import { LEVEL_STOPS, PLAYER_STOPS, difficultyOf } from "../model/data";
import { buildEncounter, groupPicks } from "./encounter";
import type { Creature } from "../model/types";

interface Result {
  low: number;
  high: number;
  picks: Creature[];
}

/** A range as text, e.g. "2 to 4", or a single number when both ends match. */
function formatRange(lowEnd: number, high: number) {
  return lowEnd === high ? `${lowEnd}` : `${lowEnd} to ${high}`;
}

/** Result of the encounter generator: the creatures picked and their total difficulty. */
function EncounterResult({ result }: { result: Result }) {
  // Total difficulty of the picked creatures.
  const total = result.picks.reduce((total, creature) => total + difficultyOf(creature), 0);
  const groups = groupPicks(result.picks);

  return (
    <div className="bestiary-encounter-result">
      <p>
        <strong>
          Difficulty {total} (target {formatRange(result.low, result.high)})
        </strong>
        {total < result.low && " (closest the current filters allow)"}
      </p>
      {groups.length === 0 && <p className="muted">Nothing in the filtered list fits under that difficulty.</p>}
      <div className="bestiary-grid">
        {/* One line per kind of creature in the encounter, with how many there are. */}
        {groups.map(({ creature, count }) => (
          <div key={creature.id} className="bestiary-encounter-item">
            <span className="bestiary-encounter-count">x{count}</span>
            <CreatureCard creature={creature} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A party starts at this many players, for both ends of the range. */
const DEFAULT_PLAYERS: [number, number] = [3, 3];

/** Collapsible box that rolls a random encounter from the creatures passed in. */
export default function EncounterGenerator({ pool }: { pool: Creature[] }) {
  const [open, setOpen] = useState(true);
  const [players, setPlayers] = useState<[number, number]>(DEFAULT_PLAYERS);
  const [levels, setLevels] = useState<[number, number]>([0, 0]);
  const [result, setResult] = useState<Result | null>(null);

  // Target difficulty range = players + levels gained, at the low and high ends.
  const lowEnd = players[0] + 1 + levels[0] / 2;
  const high = players[1] + 1 + levels[1] / 2;

  return (
    <div className="bestiary-encounter">
      <button
        type="button"
        className="bestiary-encounter-toggle"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? "▾" : "▸"}</span> Encounter generator
      </button>
      {open && (
        <>
          <div className="bestiary-encounter-sliders">
            <SliderRow label="Players" stops={PLAYER_STOPS} value={players} onChange={setPlayers} />
            <SliderRow label="Levels gained" stops={LEVEL_STOPS} value={levels} onChange={setLevels} />
            <p className="muted">Target difficulty: {formatRange(lowEnd, high)}</p>
          </div>
          <button
            type="button"
            className="bestiary-generate"
            disabled={pool.length === 0}
            onClick={() => setResult({ low: lowEnd, high, picks: buildEncounter(pool, lowEnd, high) })}
          >
            Generate Encounter
          </button>
          {result && <EncounterResult result={result} />}
        </>
      )}
    </div>
  );
}
