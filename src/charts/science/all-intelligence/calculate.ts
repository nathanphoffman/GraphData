import type { AllIntelligenceData, ScoredSubject, Settings, Subject } from "./types";

export const DEFAULT_SETTINGS: Settings = { zeroDivisor: 4, missingMode: "estimate", missingDivisor: 2 };

function geometricMean(values: number[]): number | null {
  if (values.length === 0) return null;

  // Geometric mean is done in log space (sum of logs) to avoid overflow from multiplying many scores.
  const logSum = values.reduce((sum, v) => sum + Math.log(v), 0);

  return Math.exp(logSum / values.length);
}

/** Lowest positive score in each column, used as the base for floor values. */
function worstScores(subjects: Subject[], columns: string[]): Record<string, number> {
  const worst: Record<string, number> = {};

  for (const col of columns) {
    const positives = subjects.map((s) => s.scores[col]).filter((v): v is number => v !== undefined && v > 0);
    worst[col] = positives.length ? Math.min(...positives) : 1;
  }

  return worst;
}

/** Price-based stand-in for energy per task: $0.50 scores about 67, $20 about 27, $180 about 3. */
function priceEfficiency(subject: Subject): number | undefined {
  if (subject.outputPrice === undefined) return undefined;

  return Math.max(1, Math.min(100, 60 - 25 * Math.log10(subject.outputPrice)));
}

/** A real score, or the price proxy for efficiency when there is no real score. */
export function knownScore(subject: Subject, col: string): number | undefined {
  return subject.scores[col] ?? (col === "efficiency" ? priceEfficiency(subject) : undefined);
}

/** Guess for an unmeasured column: the subject's own average times the column's factor. */
export function estimateScore(data: AllIntelligenceData, subject: Subject, col: string): number | null {
  if (col === "efficiency") return null;
  const measured = Object.values(subject.scores).filter((v) => v > 0);
  const base = geometricMean(measured);

  if (base === null) return null;

  return Math.min(100, base * (data.estimateFactors[col] ?? 1));
}

export function scoreSubjects(data: AllIntelligenceData, settings: Settings): ScoredSubject[] {
  const worst = worstScores(data.subjects, Object.keys(data.columns));

  // Score each subject: per group, use real scores and fill in missing ones (floor or estimate), then combine the groups.
  return data.subjects.map((subject) => {
    const groups: Record<string, number | null> = {};
    let measured = 0;

    for (const group of data.groups) {
      const values: number[] = [];

      for (const col of group.columns) {
        const raw = knownScore(subject, col);

        if (raw === undefined) {
          if (settings.missingMode === "floor") values.push(worst[col] / settings.missingDivisor);
          else if (settings.missingMode === "estimate") {
            const guess = estimateScore(data, subject, col);

            if (guess !== null) values.push(guess);
          }

          continue;
        }

        if (subject.scores[col] !== undefined) measured += 1;
        values.push(raw > 0 ? raw : worst[col] / settings.zeroDivisor);
      }

      groups[group.id] = geometricMean(values);
    }

    const present = Object.values(groups).filter((v): v is number => v !== null);

    return { subject, overall: geometricMean(present), groups, measured };
  });
}
