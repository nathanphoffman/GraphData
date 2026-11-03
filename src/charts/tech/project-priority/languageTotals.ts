import { parseTechLines } from "../top-rankings/languageBurden";
import { TECH_LINES_LABEL } from "../top-rankings/maintenance";
import type { Ranking } from "../top-rankings/score";

/** One pie slice: a language (or "Other") with its lines and its share of all lines. */
export type LanguageSlice = { language: string; lines: number; share: number };

/** Only this many languages get their own slice; the rest are added together as "Other". */
const NAMED_SLICE_COUNT = 5;
const OTHER_LABEL = "Other";

/** Lines per language added up over every project, biggest first. */
function totalLinesByLanguage(ranking: Ranking): [string, number][] {
  const tech = ranking.columns.findIndex((column) => column.label === TECH_LINES_LABEL);
  const totals: Record<string, number> = {};

  if (tech < 0) return [];

  for (const item of ranking.items)
    for (const [language, count] of Object.entries(parseTechLines(item.values[tech])))
      totals[language] = (totals[language] ?? 0) + count;

  return Object.entries(totals).sort((first, second) => second[1] - first[1]);
}

/** Each language's share of all lines in all projects, with the smallest ones grouped as "Other". Empty when there are no lines. */
export function languageSlices(ranking: Ranking): LanguageSlice[] {
  const entries = totalLinesByLanguage(ranking);
  const total = entries.reduce((runningTotal, [, count]) => runningTotal + count, 0);

  if (total === 0) return [];

  const named = entries.slice(0, NAMED_SLICE_COUNT);
  const otherLines = entries.slice(NAMED_SLICE_COUNT).reduce((runningTotal, [, count]) => runningTotal + count, 0);
  const slices = otherLines > 0 ? [...named, [OTHER_LABEL, otherLines] as [string, number]] : named;

  return slices.map(([language, lines]) => ({ language, lines, share: lines / total }));
}
