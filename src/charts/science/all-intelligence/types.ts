export interface Group {
  id: string;
  name: string;
  columns: string[];
}

export interface Subject {
  name: string;
  maker: string;
  kind: "ai" | "human" | "machine";
  /** Only columns that were measured (or estimated) are present. */
  scores: Record<string, number>;
  /** AI only: output price in dollars per 1M tokens, used as a proxy for energy per task. */
  outputPrice?: number;
}

export interface AllIntelligenceData {
  title: string;
  source: string;
  groups: Group[];
  columns: Record<string, string>;
  /** Rough guess of how a model scores in a column, as a fraction of its average on measured columns. */
  estimateFactors: Record<string, number>;
  subjects: Subject[];
}

export interface Settings {
  /** A real 0 counts as (worst real score in that column) / zeroDivisor. */
  zeroDivisor: number;
  /** "skip" ignores unmeasured columns; "floor" counts them as worst / missingDivisor; "estimate" guesses from the subject's other scores. */
  missingMode: "skip" | "floor" | "estimate";
  missingDivisor: number;
}

export interface ScoredSubject {
  subject: Subject;
  overall: number | null;
  groups: Record<string, number | null>;
  measured: number;
}
