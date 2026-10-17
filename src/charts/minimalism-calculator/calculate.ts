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
