import { NEWEST_YEAR_SERIES } from "./style";
import type { LanguageOutlookData } from "./types";

/** The white dots: the newest year. */
const NEWEST = NEWEST_YEAR_SERIES;
/** The purple dots: the 10-year projection with the Historical Fix. */
const PURPLE = "Projection with Historical Fix (next 10 yrs)";

export const TOP_COUNT = 10;

export interface TopTen {
  title: string;
  description: string;
  /** Accent colour of the tiles. */
  color: string;
  names: string[];
}

/** The best `TOP_COUNT` languages by the average of `keys`; a language missing any of them is left out. */
function topBy(model: LanguageOutlookData, keys: string[]): string[] {
  return model.languages
    .flatMap((language) => {
      const values = keys.map((key) => language.values[key]);

      return values.every((value): value is number => typeof value === "number") ? [{ name: language.name, score: values.reduce((sum, value) => sum + value, 0) / values.length }] : [];
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, TOP_COUNT)
    .map(({ name }) => name);
}

/** Loved-and-used and to-learn top tens, best first. */
export function buildTopTens(model: LanguageOutlookData): TopTen[] {
  return [
    {
      title: "Currently Most Used and Loved Top 10",
      description: "The newest year's outlook: Stack Overflow usage, weighted by how much developers like each language.",
      color: "#ffffff",
      names: topBy(model, [NEWEST]),
    },
    { title: "Top 10 To Learn", description: "Where each language is projected to stand in 10 years, adjusted by the Historical Fix.", color: "#b45cff", names: topBy(model, [PURPLE]) },
  ];
}
