/** Pure minimalism math, kept free of React. */

/** How many of a thing you need: total yearly uses / target uses per item, scaled by your share. */
export function recommended(perWeek: number, perYear: number, sharePct: number): number {
  return ((perWeek * 52) / Math.max(0.1, perYear)) * (sharePct / 100);
}

export function verdict(owned: number, needed: number): string {
  const target = Math.max(0, Math.ceil(needed - 1e-9));
  const diff = owned - target;
  if (diff === 0) return "right on target";
  return diff > 0 ? `${diff} more than you need` : `${-diff} short`;
}

export interface Bucket {
  label: string;
  /** Midpoint of the uses-per-year range (the start of the open-ended last bucket). */
  mid: number;
  /** Overrides the wait label (used for the long-wait buckets). */
  gap?: string;
  /** Share of items (0-1) that land in this bucket. */
  p: number;
}

/**
 * Poisson odds of an item being used k times in a year when uses land on items at random and the
 * average is `lambda`. Small averages get one bar per count; large ones are grouped into ranges.
 */
export function poissonBuckets(lambda: number): Bucket[] {
  const width = lambda <= 8 ? 1 : Math.ceil(lambda / 6);
  const bins = lambda <= 8 ? 11 : 12;
  const buckets: Bucket[] = [];
  let lnFactorial = 0; // ln(k!)
  let k = 0;
  let used = 0;
  for (let i = 0; i < bins - 1; i++) {
    let p = 0;
    for (let j = 0; j < width; j++, k++) {
      if (k > 0) lnFactorial += Math.log(k);
      p += Math.exp(-lambda + k * Math.log(lambda) - lnFactorial);
    }
    used += p;
    const lo = i * width;
    buckets.push({ label: width === 1 ? `${i}` : `${lo}–${lo + width - 1}`, mid: lo + (width - 1) / 2, p });
  }
  buckets.push({ label: `${k}+`, mid: k, p: Math.max(0, 1 - used) });
  return buckets;
}

/** At or above the goal: green fading to yellow-green. Below it: yellow through orange to red at zero. */
export function goalColor(mid: number, goal: number): string {
  const g = Math.max(goal, 0.1);
  const hue = mid >= g ? 120 - Math.min(1, (mid - g) / g) * 50 : 50 * (mid / g);
  return `hsl(${Math.round(hue)}, 70%, 45%)`;
}

/** Roughly how long you wait between plays of an item used this often (open-ended last bucket gets a "≤"). */
export function gapLabel(b: Bucket): string {
  if (b.gap) return b.gap;
  if (b.mid <= 0) return "Over a year";
  const days = 365 / b.mid;
  if (days >= 548) return "Over a year";
  if (days >= 330) return "Yearly";
  const bound = b.label.endsWith("+") ? "≤ " : "~";
  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
  if (days >= 45) return `Every ${bound}${plural(Math.round(days / 30.4), "month")}`;
  if (days >= 10) return `Every ${bound}${plural(Math.round(days / 7), "week")}`;
  return `Every ${bound}${plural(Math.max(1, Math.round(days)), "day")}`;
}

/** Whole years of waiting, grouped: [from, to) with the last group open-ended. */
const YEAR_GROUPS: [number, number, string][] = [
  [1, 3, "1–2 years"],
  [3, 5, "3–4 years"],
  [5, 7, "5–6 years"],
  [7, 9, "7–8 years"],
  [9, 11, "9–10 years"],
  [11, Infinity, "10+ years"],
];

/**
 * Same buckets as poissonBuckets, but the "never played this year" bucket is broken into how many years
 * the wait might run. Waits are memoryless, so P(wait > t years) = e^(-lambda * t).
 */
export function waitBuckets(lambda: number): Bucket[] {
  const [first, ...rest] = poissonBuckets(lambda);
  if (first.label !== "0") return [first, ...rest];
  const longWaits = YEAR_GROUPS.map(([from, to, gap]) => {
    const p = Math.exp(-lambda * from) - (to === Infinity ? 0 : Math.exp(-lambda * to));
    // mid is in uses per year, so a wait of ~N years counts as 1/N uses a year (comparable with the goal)
    const years = to === Infinity ? from : (from + to) / 2;
    return { label: `wait-${from}`, mid: 1 / years, p, gap };
  });
  return [...longWaits.reverse(), ...rest];
}
