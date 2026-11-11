/** The n-Factor taken off for the Manual Eq lines: how much AI help is assumed to add. */
export const MANUAL_AI_N = 0.5;

/** How many times nFactor halves its range, which is plenty to settle on the answer. */
const HALVINGS = 60;

/** How much of the combined n-Factor comes from the future one. */
export const FUTURE_WEIGHT = 0.75;

/** One n-factor with the lines behind it; the lines of decommissioned projects are counted at DECOMMISSIONED_SHARE. */
export interface NFactorResult {
  /** The n-Factor with the quality adjustment taken off. */
  graded: number;

  /** The lines the graded n-Factor stands for (n^n), and the same with MANUAL_AI_N taken off first. */
  equivalentLines: number;
  manualLines: number;

  /** The decommissioned projects' lines at their full size (before DECOMMISSIONED_SHARE). */
  decommissionedLines: number;
}

/** The lines a hand-written codebase would be equivalent to at this n-Factor: MANUAL_AI_N off it, raised to itself. */
function manualLinesAt(n: number): number {
  return (n - MANUAL_AI_N) ** (n - MANUAL_AI_N);
}

/** The n that makes n^n equal the total, found by halving a range until it is close enough. 1 for a total of 1 or less. */
export function nFactor(total: number): number {
  if (total <= 1) return 1;
  const target = Math.log(total);
  let [low, high] = [1, 2];

  while (high * Math.log(high) < target) high *= 2;

  for (let step = 0; step < HALVINGS; step++) {
    const middle = (low + high) / 2;

    if (middle * Math.log(middle) < target) low = middle;
    else high = middle;
  }

  return (low + high) / 2;
}

/** An n-Factor result for these (decommissioned-weighted) lines and the already adjusted n. */
export function resultFor(graded: number, decommissionedLines: number): NFactorResult {
  return { graded, equivalentLines: graded ** graded, manualLines: manualLinesAt(graded), decommissionedLines };
}
