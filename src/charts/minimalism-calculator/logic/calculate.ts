/** Pure minimalism math, kept free of React. */

/** How many of a thing you need: total yearly uses / target uses per item, scaled by your share. */
export function recommended(perWeek: number, perYear: number, sharePct: number): number {
  return ((perWeek * 52) / Math.max(0.1, perYear)) * (sharePct / 100);
}

/** Whole number of items to own: the exact recommendation rounded up. */
export function recommendedCount(needed: number): number {
  return Math.max(0, Math.ceil(needed - 1e-9));
}

/** Where the "you own" arrow sits on the scale (0-100%): each doubling moves it a third of the width, 1x at the middle. */
export function arrowPosition(owned: number, needed: number): number {
  if (owned <= 0) return 0;

  return Math.min(100, Math.max(0, 50 + (100 / 3) * Math.log2(owned / needed)));
}

/** Average uses per year for each item you own, from your own share of the use. */
export function averageUses(perWeek: number, sharePct: number, owned: number): number {
  return (perWeek * 52 * (sharePct / 100)) / Math.max(1, owned);
}
