import meta from "../../../../../data/tiny-mighty-bestiary/meta.json";
import beasts from "../../../../../data/tiny-mighty-bestiary/beast.json";
import humanoids from "../../../../../data/tiny-mighty-bestiary/humanoid.json";
import animated from "../../../../../data/tiny-mighty-bestiary/animated.json";
import otherworldly from "../../../../../data/tiny-mighty-bestiary/otherworldly.json";
import monsters from "../../../../../data/tiny-mighty-bestiary/monster.json";
import type { BestiaryData, Creature } from "./types";

export const model = {
  ...meta,
  creatures: [...beasts, ...humanoids, ...animated, ...otherworldly, ...monsters],
} as BestiaryData;

/** The combat tier for a creature; throws if the data names a tier that does not exist. */
export function tierFor(creature: Creature) {
  const tier = model.tiers.find((t) => t.difficulty === creature.tier);

  if (!tier) throw new Error(`No combat tier ${creature.tier} for ${creature.name}`);

  return tier;
}

/** Final difficulty: base tier + 0.5 per 1-use power. */
export function difficultyOf(creature: Creature) {
  // Each power use adds half a tier of difficulty.
  return creature.tier + creature.powers.reduce((total, power) => total + 0.5 * power.uses, 0);
}

/** Difficulty filter buttons, grouped by the combat table tiers (0.25-0.5, 1-2, 3-4, 5). Powers can add half steps. */
export const DIFFICULTY_BANDS = [
  { id: "easy", label: "Easy (0.25-0.5)", min: 0, max: 0.99 },
  { id: "medium", label: "Medium (1-2.5)", min: 1, max: 2.99 },
  { id: "hard", label: "Hard (3-4.5)", min: 3, max: 4.99 },
  { id: "deadly", label: "Deadly (5+)", min: 5, max: Infinity },
];

/** Tone filter buttons. `tones` are the 1-5 values in `toneScale` (1 = Whimsy, 5 = Dark). */
export const TONE_BANDS = [
  { id: "dark", label: "Dark (Dark to Lean-Dark)", tones: [4, 5] },
  { id: "neutral", label: "Neutral (Lean-Dark to Lean-Whimsy)", tones: [2, 3, 4] },
  { id: "whimsy", label: "Whimsy (Lean-Whimsy to Whimsy)", tones: [1, 2] },
];

/** Slider stops for the encounter builder: 1-12 players, 0-10 levels gained in half steps. */
export const PLAYER_STOPS = Array.from({ length: 12 }, (_unused, index) => String(index + 1));
export const LEVEL_STOPS = Array.from({ length: 21 }, (_unused, index) => String(index / 2));

/** Sort buttons. Ties always fall back to difficulty, then name. */
export const SORTS = [
  { id: "az", label: "Name A-Z" },
  { id: "za", label: "Name Z-A" },
  { id: "difficulty", label: "Difficulty" },
  { id: "type", label: "Type" },
  { id: "tone", label: "Tone" },
];

/** Order by difficulty first and then name, which is the tie-break for every sort. */
const byDifficultyThenName = (creature: Creature, second: Creature) =>
  difficultyOf(creature) - difficultyOf(second) || creature.name.localeCompare(second.name);

/** Sort function for the chosen sort name; ties fall back to difficulty and then name. */
export function compareBy(sort: string): (creature: Creature, second: Creature) => number {
  const typeOrder = (creature: Creature) => model.creatureTypes.findIndex((creatureType) => creatureType.id === creature.type);

  switch (sort) {
    case "az":
      return (creature, second) => creature.name.localeCompare(second.name);
    case "za":
      return (creature, second) => second.name.localeCompare(creature.name);
    case "type":
      return (creature, second) => typeOrder(creature) - typeOrder(second) || byDifficultyThenName(creature, second);
    case "tone":
      return (creature, second) => creature.tone - second.tone || byDifficultyThenName(creature, second);
    default:
      return byDifficultyThenName;
  }
}
