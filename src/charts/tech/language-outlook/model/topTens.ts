import { NEWEST_YEAR_SERIES } from "./style";
import type { LanguageOutlookData } from "./types";

/** The white dots: the newest year. */
const NEWEST = NEWEST_YEAR_SERIES;

/** The white dotted line: Stack Overflow usage and TIOBE, no opinion. */
const USAGE = "Popularity avg 2024-2026";

/** The purple dots: the 10-year projection with the Historical Fix. */
const PURPLE = "Projection with Historical Fix (next 10 yrs)";

export const TOP_COUNT = 10;

/** A language only gets a +/- mark when its position differs from its average position in the other lists by at least this many places. */
const MIN_SHIFT = 1;

export interface TopTen {
  title: string;
  description: string;
  /** Accent colour of the tiles. */
  color: string;
  names: string[];

  /** Places a language ranks higher (positive) or lower (negative) here than in the other lists, for those that differ enough. */
  shifts: Record<string, number>;
}

/** Every language by the average of `keys`, best first; a language missing any of them is left out. */
function rankBy(model: LanguageOutlookData, keys: string[]): string[] {
  return model.languages
    .flatMap((language) => {
      const values = keys.map((key) => language.values[key]);

      return values.every((value): value is number => typeof value === "number") ? [{ name: language.name, score: values.reduce((sum, value) => sum + value, 0) / values.length }] : [];
    })
    .sort((first, second) => second.score - first.score)
    .map(({ name }) => name);
}

const LISTS = [
  { title: "Currently Being Used Top 10", description: "Stack Overflow usage and TIOBE, half each, averaged over 2024-2026, with no developer opinion mixed in.", color: "#4cc9f0", keys: [USAGE] },
  { title: "Loved and Used (Outlook) Top 10", description: "The newest year's outlook: Stack Overflow usage, weighted by how much developers like each language.", color: "#ffffff", keys: [NEWEST] },
  { title: "Top 10 To Learn", description: "Where each language is projected to stand in 10 years, adjusted by the Historical Fix.", color: "#b45cff", keys: [PURPLE] },
];

/** Used, loved-and-used and to-learn top tens, best first, each with how its languages sit compared to the other lists. */
export function buildTopTens(model: LanguageOutlookData): TopTen[] {
  const orders = LISTS.map((list) => rankBy(model, list.keys));

  return LISTS.map((list, listIndex) => {
    const own = orders[listIndex] ?? [];
    const names = own.slice(0, TOP_COUNT);
    const shifts: Record<string, number> = {};

    for (const name of names) {
      // Positions (1 is best) in the other lists, wherever the language ranks there, even below the top 10.
      const others = orders.flatMap((order, otherIndex) => (otherIndex === listIndex || !order.includes(name) ? [] : [order.indexOf(name) + 1]));
      if (!others.length) continue;

      const shift = others.reduce((sum, position) => sum + position, 0) / others.length - (own.indexOf(name) + 1);
      if (Math.abs(shift) >= MIN_SHIFT) shifts[name] = Math.round(shift * 2) / 2;
    }

    return { title: list.title, description: list.description, color: list.color, names, shifts };
  });
}
