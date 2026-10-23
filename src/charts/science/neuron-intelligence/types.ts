/** Shape of data/intelligence/neuron-intelligence.json. */
export interface Animal {
  name: string;
  /** Neuron count in billions. */
  neuronsBillions: number;
  weightKg: number;
}

export interface NeuronIntelligenceData {
  title: string;
  animals: Animal[];
}

export interface ScoredAnimal extends Animal {
  /** Stage 1: neurons^x / weight^w. */
  score: number;
  /** Stage 2: (score / human score)^k, as a percentage. */
  humanPercent: number;
}

export type SortKey = "name" | "neuronsBillions" | "weightKg" | "score" | "humanPercent";

export interface Exponents {
  /** Neuron exponent. */
  x: number;
  /** Weight exponent. */
  w: number;
  /** Functional exponent applied to the score. */
  k: number;
}
