import { model } from "./data";
import type { Creature } from "./types";

/** Lowercase with everything but letters and digits removed, so "AT-AT", "at at" and "ATAT" all look the same. */
const squash = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

/** True when every word of the query appears somewhere in the creature's searchable text. Names and aliases also match ignoring spacing and punctuation. */
export function matches(creature: Creature, query: string) {
  const names = [creature.name, ...creature.aliases].map(squash);

  // True when any name or alias contains the word.
  const inNames = (word: string) => word !== "" && names.some((name) => name.includes(word));

  if (inNames(squash(query))) return true;

  const text = [
    creature.name,
    ...creature.aliases,
    ...creature.themes,
    model.toneScale[creature.tone - 1],
    creature.description,
    creature.attack,
    ...creature.skills.map((skill) => `${skill.skill} ${skill.mod === "+" ? "advantage" : "disadvantage"} ${skill.note ?? ""}`),
    creature.skillNote ?? "",
    creature.tactics,
    creature.flying ? "flying" : "",
    ...creature.powers.flatMap((power) => [power.name, power.text, model.powerTypes[power.type].label]),
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()

    // Split the search text on any run of whitespace.
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word) || inNames(squash(word)));
}
