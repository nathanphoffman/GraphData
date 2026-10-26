import type { AllIntelligenceData, ScoredSubject, Settings, Subject } from "./types";

/** The best score any column can have. */
const MAX_SCORE = 100;

/** Efficiency stand-in from price: this score at $1, minus this much for each tenfold rise in price. */
const EFFICIENCY_AT_ONE_DOLLAR = 60;
const EFFICIENCY_LOST_PER_TENFOLD = 25;

export const DEFAULT_SETTINGS: Settings = { zeroDivisor: 4, missingMode: "estimate", missingDivisor: 2 };

/** Geometric mean, which rewards balance: one very low score pulls the result down more than an arithmetic mean would. */
function geometricMean(values: number[]): number | null {
  if (values.length === 0) return null;

  // Geometric mean is done in log space (sum of logs) to avoid overflow from multiplying many scores.
  const logSum = values.reduce((total, value) => total + Math.log(value), 0);

  return Math.exp(logSum / values.length);
}

/** Lowest positive score in each column, used as the base for floor values. */
function worstScores(subjects: Subject[], columns: string[]): Record<string, number> {
  const worst: Record<string, number> = {};

  for (const column of columns) {
    const positives = subjects.map((subject) => subject.scores[column]).filter((subject): subject is number => subject !== undefined && subject > 0);
    worst[column] = positives.length ? Math.min(...positives) : 1;
  }

  return worst;
}

/** Price-based stand-in for energy per task: $0.50 scores about 67, $20 about 27, $180 about 3. */
function priceEfficiency(subject: Subject): number | undefined {
  if (subject.outputPrice === undefined) return undefined;

  return Math.max(1, Math.min(MAX_SCORE, EFFICIENCY_AT_ONE_DOLLAR - EFFICIENCY_LOST_PER_TENFOLD * Math.log10(subject.outputPrice)));
}

/** A real score, or the price proxy for efficiency when there is no real score. */
export function knownScore(subject: Subject, column: string): number | undefined {
  return subject.scores[column] ?? (column === "efficiency" ? priceEfficiency(subject) : undefined);
}

/** Guess for an unmeasured column: the subject's own average times the column's factor. */
export function estimateScore(data: AllIntelligenceData, subject: Subject, column: string): number | null {
  if (column === "efficiency") return null;
  const measured = Object.values(subject.scores).filter((value) => value > 0);
  const base = geometricMean(measured);

  if (base === null) return null;

  return Math.min(MAX_SCORE, base * (data.estimateFactors[column] ?? 1));
}

/** Score every subject across the groups, combining real, estimated and floor values by the chosen settings. */
export function scoreSubjects(data: AllIntelligenceData, settings: Settings): ScoredSubject[] {
  const worst = worstScores(data.subjects, Object.keys(data.columns));

  // Score each subject: per group, use real scores and fill in missing ones (floor or estimate), then combine the groups.
  return data.subjects.map((subject) => {
    const groups: Record<string, number | null> = {};
    let measured = 0;

    for (const group of data.groups) {
      const values: number[] = [];

      for (const column of group.columns) {
        const rawValue = knownScore(subject, column);

        if (rawValue === undefined) {
          if (settings.missingMode === "floor") values.push(worst[column] / settings.missingDivisor);
          else if (settings.missingMode === "estimate") {
            const guess = estimateScore(data, subject, column);

            if (guess !== null) values.push(guess);
          }

          continue;
        }

        if (subject.scores[column] !== undefined) measured += 1;
        values.push(rawValue > 0 ? rawValue : worst[column] / settings.zeroDivisor);
      }

      groups[group.id] = geometricMean(values);
    }

    const present = Object.values(groups).filter((value): value is number => value !== null);

    return { subject, overall: geometricMean(present), groups, measured };
  });
}
