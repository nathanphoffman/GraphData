/** Shape of data/misc/dnd-sales.json. */
export type Confidence = "guess" | "low" | "medium";

export interface Edition {
  id: string;
  name: string;
  /** Release year; sets the position on the time axis. */
  year: number;
  /** Millions of Player's Handbook copies (lifetime, all channels). */
  low: number;
  best: number;
  high: number;
  confidence: Confidence;
  note: string;
  /** Keys into `sources`. */
  sources: string[];
}

export interface DndSalesData {
  title: string;
  unit: string;
  asOf: string;
  editions: Edition[];
  sources: Record<string, { label: string; url: string }>;
}
