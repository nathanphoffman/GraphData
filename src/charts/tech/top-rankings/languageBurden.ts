/** How burdensome each language is for me, and what that does to the n-Factor. */

/** A language's four burdens (1.0, 1.33, 1.66 or 2.0): object oriented, functional, machine, symbolic. */
type Burdens = readonly [oop: number, functional: number, machine: number, symbolic: number];

export const LANGUAGE_BURDENS: Readonly<Record<string, Burdens>> = {
  REXX: [1, 1, 1, 1],
  "Structured BASIC": [1, 1, 1.33, 1],
  Deor: [1, 1, 1.33, 1],
  "Classic BASIC": [1, 1, 1.33, 1.33],
  Lua: [1.33, 1.33, 1, 1.33],
  Python: [1.33, 1.33, 1, 1.33],
  PHP: [1.66, 1.33, 1, 1.33],
  JavaScript: [1.33, 1.66, 1, 1.33],
  Ruby: [2, 1.66, 1, 1.33],
  Go: [1.33, 1.33, 1.33, 1.33],
  Swift: [1.66, 1.33, 1.33, 1.33],
  Java: [2, 1.33, 1.33, 1.33],
  TypeScript: [1.33, 1.66, 1.33, 1.33],
  Kotlin: [1.66, 1.66, 1.33, 1.33],
  "C#": [2, 1.66, 1.33, 1.33],
  Haskell: [1, 2, 1.33, 1.66],
  Scala: [2, 2, 1.33, 1.66],
  APL: [1, 2, 1, 2],
  C: [1, 1, 1.66, 1.33],
  Assembly: [1, 1, 2, 1.33],
  "C++": [1.66, 1.33, 1.66, 1.66],
  Rust: [1.33, 1.66, 1.66, 1.66],
};

/** My general sensitivity to each burden, from 0.1 (expert) to 1.0 (novice): oop, functional, machine, symbolic. */
const SENSITIVITY: Burdens = [0.1, 0.4, 0.7, 0.6];

/** My unfamiliarity with each language, from 0.1 to 1.0. */
const UNFAMILIARITY: Readonly<Record<string, number>> = {
  Deor: 0.1,
  TypeScript: 0.2,
  JavaScript: 0.2,
  PHP: 0.9,
  Go: 0.9,
  REXX: 0.8,
  "Classic BASIC": 0.9,
  "C#": 0.4,
  Python: 0.75,
  Rust: 0.75,
  C: 0.75,
  "C++": 0.9,
  APL: 1,
};

/** Unfamiliarity for a rated language that is not listed above. */
const DEFAULT_UNFAMILIARITY = 1;

/** The fixed target taken off chunkability to get the net n. */
const TARGET = 0.25;

/** A language's burden score: each burden raised to (my sensitivity + my unfamiliarity with the language), multiplied together. Null when the language is not rated. */
export function burdenScore(language: string): number | null {
  const burdens = LANGUAGE_BURDENS[language];

  if (!burdens) return null;
  const unfamiliarity = UNFAMILIARITY[language] ?? DEFAULT_UNFAMILIARITY;

  return burdens.reduce((product, burden, index) => product * burden ** (SENSITIVITY[index] + unfamiliarity), 1);
}

/** A language's net n: chunkability (quality out of 1, divided by the burden score) minus the target. Null when the language is not rated. */
export function netN(language: string, quality: number): number | null {
  const score = burdenScore(language);

  return score === null ? null : quality / score - TARGET;
}

/** Lines per language, read from text like "Rust 1200, TypeScript 300". Anything that does not fit that shape is skipped. */
export function parseTechLines(text: unknown): Record<string, number> {
  const lines: Record<string, number> = {};

  if (typeof text !== "string") return lines;

  for (const part of text.split(",")) {
    const match = /^\s*(.+?)\s+(\d+)\s*$/.exec(part);

    if (match) lines[match[1]] = Number(match[2]);
  }

  return lines;
}

/** Lines per language as text, biggest first, the way parseTechLines reads it. */
export function formatTechLines(lines: Record<string, number>): string {
  return Object.entries(lines)
    .sort((first, second) => second[1] - first[1])
    .map(([language, count]) => `${language} ${count}`)
    .join(", ");
}

/** The average net n of the rated languages, each counted by its lines, or null when none of the lines are in a rated language. Quality is out of 1. */
export function averageNetN(linesByLanguage: Record<string, number>, quality: number): number | null {
  let [total, weighted] = [0, 0];

  for (const [language, count] of Object.entries(linesByLanguage)) {
    const net = netN(language, quality);

    if (net === null) continue;
    total += count;
    weighted += net * count;
  }

  return total === 0 ? null : weighted / total;
}

/** Each language's lines and share of the project's rated lines, biggest first, or null when there is nothing to show. */
export function techShares(text: unknown): { language: string; lines: number; share: number }[] | null {
  const entries = Object.entries(parseTechLines(text)).sort((first, second) => second[1] - first[1]);
  const total = entries.reduce((runningTotal, [, count]) => runningTotal + count, 0);

  if (entries.length === 0 || total === 0) return null;

  return entries.map(([language, lines]) => ({ language, lines, share: lines / total }));
}
