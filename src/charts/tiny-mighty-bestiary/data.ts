import meta from "../../../data/tiny-mighty-bestiary/meta.json";
import beasts from "../../../data/tiny-mighty-bestiary/beast.json";
import humanoids from "../../../data/tiny-mighty-bestiary/humanoid.json";
import animated from "../../../data/tiny-mighty-bestiary/animated.json";
import otherworldly from "../../../data/tiny-mighty-bestiary/otherworldly.json";
import monsters from "../../../data/tiny-mighty-bestiary/monster.json";
import type { BestiaryData, Creature } from "./types";

export const model = {
  ...meta,
  creatures: [...beasts, ...humanoids, ...animated, ...otherworldly, ...monsters],
} as BestiaryData;

export function tierFor(creature: Creature) {
  const tier = model.tiers.find((t) => t.difficulty === creature.tier);
  if (!tier) throw new Error(`No combat tier ${creature.tier} for ${creature.name}`);
  return tier;
}

/** Final difficulty: base tier + 0.5 per 1-use power. */
export function difficultyOf(creature: Creature) {
  return creature.tier + creature.powers.reduce((sum, p) => sum + 0.5 * p.uses, 0);
}

/** Every difficulty that exists in the data, lowest first. The slider steps through these. */
export const difficulties = [...new Set(model.creatures.map(difficultyOf))].sort((a, b) => a - b);
export const LAST_STEP = difficulties.length - 1;
export const TONE_LAST = model.toneScale.length - 1;

/** Slider stops for the encounter builder: 1-12 players, 0-10 levels gained in half steps. */
export const PLAYER_STOPS = Array.from({ length: 12 }, (_, i) => String(i + 1));
export const LEVEL_STOPS = Array.from({ length: 21 }, (_, i) => String(i / 2));
