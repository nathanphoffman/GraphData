/** Pure maintainability math, kept free of React so it is easy to test. */
import { TIERS } from "./style";
import type { Spans, Tier } from "./types";

/** Below this the lower span is too small to use (n near 1), so it borrows the upper span. */
const MIN_DOWN_SPAN = 0.05;

/** Line counts are shortened with these suffixes. */
const COUNT_SUFFIXES = [[1e9, "B"], [1e6, "M"], [1e3, "K"]] as const;

/** A shortened count shows no decimals from the hundreds, one from the tens, and two below that. */
const HUNDREDS = 100;
const TENS = 10;

/** Below this share of AI-written code it is "Pair AI". */
const PAIR_AI_BELOW = 0.5;

/** Letter grades: 50 and below is F−, under 60 is F, then A, B and C start here and anything else is D. */
const F_MINUS_AT = 50;
const F_BELOW = 60;
const LETTER_STARTS: [number, string][] = [[90, "A"], [80, "B"], [70, "C"]];
const PERFECT = 100;

/** The last digit decides the plus or minus: 7 and up is +, 2 and down is −. */
const PLUS_FROM = 7;

/** n^n, with 0^0 (and anything below) treated as 1. */
const nToTheN = (xPos: number): number => (xPos <= 0 ? 1 : xPos ** xPos);

/** Log-scale distances below and above Stable. */
export function spans(nFactor: number): Spans {
  const middle = nToTheN(nFactor);
  const highest = nToTheN(nFactor + 1);
  const upSpan = Math.log(highest / middle);
  let down = Math.log(middle / nToTheN(nFactor - 1));

  if (!(down > MIN_DOWN_SPAN)) down = upSpan; // guard for n near 1, where (n-1)^(n-1) ~ n^n

  return { mid: middle, hi: highest, lo: middle / Math.exp(down), up: upSpan, down };
}

/** Where a line count sits: -1 = Very Stable, 0 = Stable, +1 = Unstable. */
export function position(lines: number, nFactor: number): number {
  if (lines <= 0) return -Infinity;
  const stabilitySpans = spans(nFactor);
  const logDistance = Math.log(lines / stabilitySpans.mid);

  return logDistance <= 0 ? logDistance / stabilitySpans.down : logDistance / stabilitySpans.up;
}

/** The difficulty tier a position falls in. */
export function tierFor(placement: number): Tier {
  for (const tier of TIERS) {
    // Normal is inclusive at its upper edge; negative tiers are exclusive so a boundary value moves to the harder tier.
    if (tier.name === "Normal" ? placement <= tier.upTo : tier.upTo < 0 ? placement < tier.upTo : placement <= tier.upTo) return tier;
  }

  return TIERS[TIERS.length - 1];
}

/** Compact line count: 1.23K, 45.6M, ... */
export function formatCount(value: number): string {
  if (value < 1) return "<1";

  for (const [divisor, suffix] of COUNT_SUFFIXES) {
    if (value >= divisor) {
      const scaled = value / divisor;

      // Fewer decimals as the number grows, so every count shows about three significant digits.
      return (scaled >= HUNDREDS ? scaled.toFixed(0) : scaled >= TENS ? scaled.toFixed(1) : scaled.toFixed(2)) + suffix;
    }
  }

  return Math.round(value).toString();
}

/** Label for how much of the code was written by AI (0 = none, 1 = all of it). */
export function aiName(aiShare: number): string {
  if (aiShare === 0) return "No AI";

  if (aiShare < PAIR_AI_BELOW) return "Pair AI";

  if (aiShare < 1) return "AI‑Written";

  return "Full Vibe AI";
}

/** Standard school grading in tens; 50 and below is F−. */
export function letterGrade(percent: number): string {
  if (percent <= F_MINUS_AT) return "F−";

  if (percent < F_BELOW) return "F";

  // Pick the letter from the tens digit.
  const letter = LETTER_STARTS.find(([start]) => percent >= start)?.[1] ?? "D";
  const lastDigit = percent % TENS;

  if (percent === PERFECT || lastDigit >= PLUS_FROM) return letter + "+";

  if (lastDigit <= 2) return letter + "−";

  return letter;
}
