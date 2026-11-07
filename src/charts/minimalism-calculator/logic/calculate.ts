import { MIN_USES_PER_YEAR, PERCENT, WEEKS_PER_YEAR } from "./constants";

/** Pure minimalism math, kept free of React. */

/** Owning exactly the recommended amount puts the arrow in the middle, and each doubling moves it this share of the scale. */
const ARROW_MIDDLE = PERCENT / 2;
const ARROW_DOUBLING_SHARE = 1 / 3;

/** How many of a thing you need: total yearly uses / target uses per item, scaled by your share. */
export function recommended(perWeek: number, perYear: number, sharePct: number): number {
  return ((perWeek * WEEKS_PER_YEAR) / Math.max(MIN_USES_PER_YEAR, perYear)) * (sharePct / PERCENT);
}

/** Whole number of items to own: the exact recommendation rounded up. */
export function recommendedCount(needed: number): number {
  return Math.max(0, Math.ceil(needed - 1e-9));
}

/** Where the "you own" arrow sits on the scale (0-100%): each doubling moves it a third of the width, 1x at the middle. */
export function arrowPosition(owned: number, needed: number): number {
  if (owned <= 0) return 0;

  return Math.min(PERCENT, Math.max(0, ARROW_MIDDLE + PERCENT * ARROW_DOUBLING_SHARE * Math.log2(owned / needed)));
}

/** Average uses per year for each item you own, from your own share of the use. */
export function averageUses(perWeek: number, sharePct: number, owned: number): number {
  return (perWeek * WEEKS_PER_YEAR * (sharePct / PERCENT)) / Math.max(1, owned);
}
