export interface Game {
  position: number;
  title: string;
  releaseDate: string;
  rank: number | null;
  average: number;
  weight: number;
  num: number;
  score: number;
}

export interface Page {
  total: number;
  games: Game[];
}

export interface OwnedGame {
  title: string;
  releaseDate: string;
}

export interface BestWeight {
  best: { preference: number; points: number; games: (OwnedGame & { position: number })[] };
  tied: [number, number];
  noPreferencePoints: number;
  missing: string[];
}

/** The controls you picked, kept in this browser. */
export interface Settings {
  preferWeight: boolean;
  weight: number;
  yearStep: number;
  onlyMine: boolean;
  search: string;
}
