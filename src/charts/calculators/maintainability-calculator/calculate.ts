/** Pure maintainability math, kept free of React so it is easy to test. */
import { TIERS } from "./style";
import type { Spans, Tier } from "./types";

/** n^n, with 0^0 (and anything below) treated as 1. */
const f = (x: number): number => (x <= 0 ? 1 : x ** x);

/** Log-scale distances below and above Stable. */
export function spans(n: number): Spans {
  const mid = f(n);
  const hi = f(n + 1);
  const up = Math.log(hi / mid);
  let down = Math.log(mid / f(n - 1));

  if (!(down > 0.05)) down = up; // guard for n near 1, where (n-1)^(n-1) ~ n^n

  return { mid, hi, lo: mid / Math.exp(down), up, down };
}

/** Where a line count sits: -1 = Very Stable, 0 = Stable, +1 = Unstable. */
export function position(lines: number, n: number): number {
  if (lines <= 0) return -Infinity;
  const s = spans(n);
  const d = Math.log(lines / s.mid);

  return d <= 0 ? d / s.down : d / s.up;
}

/** The difficulty tier a position falls in. */
export function tierFor(p: number): Tier {
  for (const tier of TIERS) {
    // Normal is inclusive at its upper edge; negative tiers are exclusive so a boundary value moves to the harder tier.
    if (tier.name === "Normal" ? p <= tier.upTo : tier.upTo < 0 ? p < tier.upTo : p <= tier.upTo) return tier;
  }

  return TIERS[TIERS.length - 1];
}

/** Compact line count: 1.23K, 45.6M, ... */
export function formatCount(v: number): string {
  if (v < 1) return "<1";

  for (const [divisor, suffix] of [[1e9, "B"], [1e6, "M"], [1e3, "K"]] as const) {
    if (v >= divisor) {
      const q = v / divisor;

      // Fewer decimals as the number grows, so every count shows about three significant digits.
      return (q >= 100 ? q.toFixed(0) : q >= 10 ? q.toFixed(1) : q.toFixed(2)) + suffix;
    }
  }

  return Math.round(v).toString();
}

/** Label for how much of the code was written by AI (0 = none, 1 = all of it). */
export function aiName(a: number): string {
  if (a === 0) return "No AI";

  if (a < 0.5) return "Pair AI";

  if (a < 1) return "AI‑Written";

  return "Full Vibe AI";
}

/** Standard school grading in tens; 50 and below is F−. */
export function letterGrade(pct: number): string {
  if (pct <= 50) return "F−";

  if (pct < 60) return "F";

  // Pick the letter from the tens digit.
  const letter = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : "D";
  const r = pct % 10;

  if (pct === 100 || r >= 7) return letter + "+";

  if (r <= 2) return letter + "−";

  return letter;
}
