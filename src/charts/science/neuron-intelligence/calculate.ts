/** Pure scoring math for the neuron intelligence explorer. */
import type { Animal, Exponents, ScoredAnimal, SortKey } from "./types";

export const DEFAULT_EXPONENTS: Exponents = { x: 1.5, w: 1.0, k: 2.0 };

/** Neuron exponents outside this range are flagged as implausible. */
export const PLAUSIBLE_X: [number, number] = [1.0, 2.0];

export function scoreAnimals(animals: Animal[], { x, w, k }: Exponents): ScoredAnimal[] {
  const scored = animals.map((a) => ({
    ...a,
    score: (a.neuronsBillions * 1e9) ** x / a.weightKg ** w,
  }));

  const human = scored.find((a) => a.name === "Human");
  const humanFinal = human ? human.score ** k : NaN;

  return scored.map((a) => ({ ...a, humanPercent: (a.score ** k / humanFinal) * 100 }));
}

export function sortAnimals(rows: ScoredAnimal[], key: SortKey, ascending: boolean): ScoredAnimal[] {
  // Names sort alphabetically; everything else sorts by number.
  return [...rows].sort((a, b) => {
    if (key === "name") return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);

    return ascending ? a[key] - b[key] : b[key] - a[key];
  });
}

export function formatNeurons(billions: number): string {
  return billions < 0.001 ? billions.toExponential(1) : String(billions);
}
