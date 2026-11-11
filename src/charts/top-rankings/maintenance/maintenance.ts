import { averageNetN, parseTechLines } from "../languageBurden";
import { GROWTH_LABEL, isNumber, LINES_LABEL, type Ranking } from "../score/ranking_types";
import {
  COMPUTED_LABEL,
  DECOMMISSIONED_SHARE,
  FAMILIARITY_LABEL,
  isDecommissioned,
  TECH_LINES_LABEL,
} from "./maintenance_labels";
import { FUTURE_WEIGHT, type NFactorResult, nFactor, resultFor } from "./n_factor";
import { PERCENT, qualityOf } from "./quality";

/** The quality that leaves the n-factor as it is; better lifts it down, worse pushes it up. */
const NEUTRAL_QUALITY = 75;

interface Maintenance {
  averageQuality: number;

  /** What was taken off the n-Factor: the languages' net n averaged by lines, or (quality - 75) / 100 when no project has language lines. */
  adjustment: number;

  /** Whether the adjustment came from the languages. */
  fromLanguages: boolean;

  /** The lines the current n-Factor is worked out from (decommissioned projects at their share). */
  totalLines: number;
  current: NFactorResult;
  future: NFactorResult;
  projected: NFactorResult;
}

/** Where each column the n-factors need sits in the ranking, or -1 when it is missing. */
function columnPositions(ranking: Ranking) {
  const position = (label: string) => ranking.columns.findIndex((column) => column.label === label);

  return {
    lines: position(LINES_LABEL),
    familiarity: position(FAMILIARITY_LABEL),
    computed: position(COMPUTED_LABEL),
    growth: position(GROWTH_LABEL),
    tech: position(TECH_LINES_LABEL),
  };
}

type Positions = ReturnType<typeof columnPositions>;

/** Add a project's lines to each of its languages, scaled by the language's share of the project's Tech Lines. */
function addLanguageLines(languageLines: Record<string, number>, projectTech: Record<string, number>, count: number) {
  const techTotal = Object.values(projectTech).reduce((runningTotal, value) => runningTotal + value, 0);

  for (const [language, languageCount] of Object.entries(projectTech))
    languageLines[language] = (languageLines[language] ?? 0) + (languageCount / techTotal) * count;
}

/** Add up every project's lines now and as expected to grow (decommissioned ones counted at a share), the quality-weighted lines and the lines per language. */
function tallyProjects(ranking: Ranking, position: Positions) {
  const tally = {
    totalLines: 0,
    futureLines: 0,
    decomLines: 0,
    futureDecomLines: 0,
    qualityLines: 0,
    weighted: 0,
    languageLines: {} as Record<string, number>,
  };

  for (const item of ranking.items) {
    const { values } = item;
    const rawCount = values[position.lines];

    if (!isNumber(rawCount)) continue;
    const decommissioned = isDecommissioned(ranking, item);
    const count = decommissioned ? rawCount * DECOMMISSIONED_SHARE : rawCount;
    tally.totalLines += count;

    // A project with no growth number is expected to stay the size it is.
    const times = position.growth < 0 ? undefined : values[position.growth];
    const grown = isNumber(times) ? times : 1;
    tally.futureLines += count * grown;

    if (decommissioned) {
      tally.decomLines += rawCount;
      tally.futureDecomLines += rawCount * grown;
    }

    addLanguageLines(tally.languageLines, position.tech < 0 ? {} : parseTechLines(values[position.tech]), count);
    const rating = qualityOf(values, position.familiarity, position.computed);

    if (rating === null) continue;
    tally.qualityLines += count;
    tally.weighted += count * rating;
  }

  return tally;
}

/** The current, future and projected n-factors for a ranking with lines and quality columns, or null when it has neither or no lines. A qualityOverride replaces the average quality worked out from the projects. */
export function maintenance(ranking: Ranking, qualityOverride?: number): Maintenance | null {
  const position = columnPositions(ranking);

  if (position.lines < 0 || (position.familiarity < 0 && position.computed < 0)) return null;

  const tally = tallyProjects(ranking, position);

  if (tally.totalLines === 0 || tally.qualityLines === 0) return null;

  const averageQuality = qualityOverride ?? tally.weighted / tally.qualityLines;
  const languageAdjustment = averageNetN(tally.languageLines, averageQuality / PERCENT);
  const adjustment = languageAdjustment ?? (averageQuality - NEUTRAL_QUALITY) / PERCENT;
  const [graded, gradedFuture] = [nFactor(tally.totalLines) - adjustment, nFactor(tally.futureLines) - adjustment];
  const projected = graded * (1 - FUTURE_WEIGHT) + gradedFuture * FUTURE_WEIGHT;

  return {
    averageQuality,
    adjustment,
    fromLanguages: languageAdjustment !== null,
    totalLines: tally.totalLines,
    current: resultFor(graded, tally.decomLines),
    future: resultFor(gradedFuture, tally.futureDecomLines),
    projected: resultFor(
      projected,
      tally.decomLines * (1 - FUTURE_WEIGHT) + tally.futureDecomLines * FUTURE_WEIGHT,
    ),
  };
}
