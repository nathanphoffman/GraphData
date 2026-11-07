/** Shape of data/language-outlook/language-outlook.json (written by scripts/build-language-data.py). */
export interface LanguageRecord {
  name: string;

  /** Keyed by series name, e.g. "Year 2026", "Combined avg 2024-2026". */
  values: Record<string, number | null>;

  /** TIOBE rating (%) keyed by year. */
  tiobe: Record<string, number | null>;

  /** Stack Overflow usage (%) keyed by year. */
  pop: Record<string, number | null>;
}

export interface LanguageOutlookData {
  title: string;

  /** Keys of `values` drawn as dots (oldest year first, projection last). */
  series: string[];

  /** Keys of `values` drawn as connecting lines. */
  lines: string[];
  languages: LanguageRecord[];
}

/** Hover tooltip position (screen px) and text. */
export interface Tooltip {
  x: number;
  y: number;
  text: string;
}
