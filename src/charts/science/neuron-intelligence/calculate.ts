/** Pure scoring math for the neuron intelligence explorer. */
import { NAME_KEY } from "../../useSort";
import type { Animal, Exponents, ScoredAnimal, SortKey } from "./types";

const NEURONS_PER_BILLION = 1e9;
const PERCENT = 100;

/** Neuron counts below this many billions are written in exponent form. */
const EXPONENT_FORM_BELOW = 0.001;

export const DEFAULT_EXPONENTS: Exponents = { x: 1.5, w: 1.0, k: 2.0 };

/** Neuron exponents outside this range are flagged as implausible. */
export const PLAUSIBLE_X: [number, number] = [1.0, 2.0];

/** Stage 1 and 2 scores for every animal, relative to the human score. */
export function scoreAnimals(animals: Animal[], { x: neuronExponent, w: weightExponent, k: functionalExponent }: Exponents): ScoredAnimal[] {
  // Stage 1 score for each animal: neurons raised to x, divided by weight raised to w.
  const scored = animals.map((animal) => ({
    ...animal,
    score: (animal.neuronsBillions * NEURONS_PER_BILLION) ** neuronExponent / animal.weightKg ** weightExponent,
  }));

  const human = scored.find((candidate) => candidate.name === "Human");
  const humanFinal = human ? human.score ** functionalExponent : NaN;

  return scored.map((animal) => ({ ...animal, humanPercent: (animal.score ** functionalExponent / humanFinal) * PERCENT }));
}

/** Sort animals by the chosen column in the chosen direction, without changing the original list. */
export function sortAnimals(rows: ScoredAnimal[], sortKey: SortKey, ascending: boolean): ScoredAnimal[] {
  // Names sort alphabetically; everything else sorts by number.
  return [...rows].sort((scoredAnimal, second) => {
    if (sortKey === NAME_KEY) return ascending ? scoredAnimal.name.localeCompare(second.name) : second.name.localeCompare(scoredAnimal.name);

    return ascending ? scoredAnimal[sortKey] - second[sortKey] : second[sortKey] - scoredAnimal[sortKey];
  });
}

/** Neuron count as plain text, using exponent form for very small counts. */
export function formatNeurons(billions: number): string {
  return billions < EXPONENT_FORM_BELOW ? billions.toExponential(1) : String(billions);
}
