/** How long items wait between plays when uses land on them at random. */
import { DAYS_PER_YEAR } from "./constants";

/** Up to this average, each count of uses gets its own bar; above it, counts are grouped into ranges. */
const SINGLE_COUNT_LAMBDA = 8;
const SINGLE_COUNT_BARS = 11;
const GROUPED_BARS = 12;
const GROUPS_ACROSS = 6;

/** Average days in a month. */
const DAYS_PER_AVERAGE_MONTH = 30.4;

/** A wait of this many days or more is shown as "Over a year", "Yearly", and so on down. */
const OVER_A_YEAR_DAYS = 548;
const YEARLY_DAYS = 330;
const MONTHLY_DAYS = 45;
const FORTNIGHTLY_DAYS = 17.5;
const WEEKLY_DAYS = 7;

/** Bar colour: hue 120 is green, down to 70 (yellow-green) past the goal, and from 50 (yellow) down to 0 (red) below it. */
const GOOD_HUE = 120;
const HUE_SPAN = 50;

/** Goals below this are treated as this, so the colour math never divides by zero. */
const MIN_GOAL = 0.1;

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
function poissonBuckets(lambda: number): Bucket[] {
  const width = lambda <= SINGLE_COUNT_LAMBDA ? 1 : Math.ceil(lambda / GROUPS_ACROSS);
  const bins = lambda <= SINGLE_COUNT_LAMBDA ? SINGLE_COUNT_BARS : GROUPED_BARS;
  const buckets: Bucket[] = [];

  // Kept as a running log so large counts do not overflow the factorial.
  let lnFactorial = 0;
  let useCount = 0;
  let used = 0;

  for (let index = 0; index < bins - 1; index++) {
    let probability = 0;

    for (let innerIndex = 0; innerIndex < width; innerIndex++, useCount++) {
      if (useCount > 0) lnFactorial += Math.log(useCount);
      probability += Math.exp(-lambda + useCount * Math.log(lambda) - lnFactorial);
    }

    used += probability;
    const lowest = index * width;
    buckets.push({ label: width === 1 ? `${index}` : `${lowest}–${lowest + width - 1}`, mid: lowest + (width - 1) / 2, p: probability });
  }

  buckets.push({ label: `${useCount}+`, mid: useCount, p: Math.max(0, 1 - used) });

  return buckets;
}

/** At or above the goal: green fading to yellow-green. Below it: yellow through orange to red at zero. */
export function goalColor(middle: number, goal: number): string {
  const safeGoal = Math.max(goal, MIN_GOAL);
  const hueAngle = middle >= safeGoal ? GOOD_HUE - Math.min(1, (middle - safeGoal) / safeGoal) * HUE_SPAN : HUE_SPAN * (middle / safeGoal);

  return `hsl(${Math.round(hueAngle)}, 70%, 45%)`;
}

/** Roughly how long you wait between plays of an item used this often (open-ended last bucket gets a "≤"). */
export function gapLabel(bucket: Bucket): string {
  if (bucket.gap) return bucket.gap;

  if (bucket.mid <= 0) return "Over a year";
  const days = DAYS_PER_YEAR / bucket.mid;

  if (days >= OVER_A_YEAR_DAYS) return "Over a year";

  if (days >= YEARLY_DAYS) return "Yearly";
  const bound = bucket.label.endsWith("+") ? "≤ " : "~";
  const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? "" : "s"}`;

  // Shorter waits are grouped into a few week buckets rather than counted day by day.
  if (days < WEEKLY_DAYS) return "Every < 1 week";

  if (days < FORTNIGHTLY_DAYS) return "Every 1–2 weeks";

  if (days < MONTHLY_DAYS) return "Every 2–4 weeks";
  const months = Math.round(days / DAYS_PER_AVERAGE_MONTH);

  return `Every ${bound}${plural(months, "month")}`;
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

  // Turn each year range into a bucket with its chance of waiting that long.
  const longWaits = YEAR_GROUPS.map(([from, upTo, waitLabel]) => {
    const probability = Math.exp(-lambda * from) - (upTo === Infinity ? 0 : Math.exp(-lambda * upTo));

    // mid is in uses per year, so a wait of ~N years counts as 1/N uses a year (comparable with the goal)
    const years = upTo === Infinity ? from : (from + upTo) / 2;

    return { label: `wait-${from}`, mid: 1 / years, p: probability, gap: waitLabel };
  });

  return [...longWaits.reverse(), ...rest];
}
