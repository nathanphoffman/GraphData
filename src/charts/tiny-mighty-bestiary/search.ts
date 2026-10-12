import { model } from "./data";
import type { Creature } from "./types";

/** True when every word of the query appears somewhere in the creature's searchable text. */
export function matches(creature: Creature, query: string) {
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
