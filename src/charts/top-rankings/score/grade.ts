import { type Column, DEFAULT_GRADE_CURVE, type GradeCurve, MAX_GRADE, type Ranking } from "./ranking_types";
import { maxScore, minScore, score } from "./score";

/** Where a value sits when the low and high are the same. */
const MIDDLE_FRACTION = 0.5;

/** The points added to the grade at this share: a bump centred on the middle. */
const middleLift = (share: number, curve: GradeCurve) =>
  curve.middleLift * Math.exp(-(((share - curve.middleAt) / curve.middleWidth) ** 2) / 2);

/** Grade out of 100 for a score, on an exponential curve: 0 for the lowest possible score and 100 for the best. */
export function grade(scoreValue: number, columns: Column[], shape: Partial<GradeCurve> = {}): number {
  const [low, high] = [minScore(columns), maxScore(columns)];

  if (high === low) return 0;

  const curveShape = { ...DEFAULT_GRADE_CURVE, ...shape };
  const share = Math.max(0, (scoreValue - low) / (high - low));

  const curve =
    (MAX_GRADE * (1 - Math.exp(-curveShape.steepness * share ** curveShape.bottomBend))) /
    (1 - Math.exp(-curveShape.steepness));
  const lift =
    middleLift(share, curveShape) - (1 - share) * middleLift(0, curveShape) - share * middleLift(1, curveShape);

  return Math.min(MAX_GRADE, curve + lift);
}

/** Items best score first, each with its grade and rank; items with the same score share a rank. */
export function rankItems(ranking: Ranking) {
  const scored = ranking.items
    .map((item) => ({ item, score: score(ranking.columns, item) }))
    .map((entry) => ({ ...entry, grade: grade(entry.score, ranking.columns, ranking.gradeCurve) }))
    .sort((first, second) => second.score - first.score);

  // An item's rank is one more than the first item with the same score, so ties share a rank.
  return scored.map((entry) => ({ ...entry, rank: scored.findIndex((other) => other.score === entry.score) + 1 }));
}

/** Where a value sits between a low and a high, from 0 to 1; 0.5 when they are the same. */
export function fractionBetween(value: number, lowest: number, high: number): number {
  if (high === lowest) return MIDDLE_FRACTION;

  return Math.min(1, Math.max(0, (value - lowest) / (high - lowest)));
}

const LETTER_GRADES: [number, string][] = [
  [97, "A+"],
  [93, "A"],
  [90, "A-"],
  [87, "B+"],
  [83, "B"],
  [80, "B-"],
  [77, "C+"],
  [73, "C"],
  [70, "C-"],
  [67, "D+"],
  [63, "D"],
  [60, "D-"],
];

/** The usual school letter for a grade out of 100: A at 93, B at 83, and so on down to F under 60. */
export const letterGrade = (gradeValue: number): string =>
  LETTER_GRADES.find(([minimum]) => Math.round(gradeValue) >= minimum)?.[1] ?? "F";
