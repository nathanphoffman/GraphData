/** What buying costs year by year when you only buy once your stuff has paid off. */

/**
 * One year of buying. Items wear out after about `maxPlays` uses (yearlyUses / maxPlays a year), and you
 * may only buy once your stuff has paid off: every `minPlays` uses earns one purchase. So you buy what is
 * missing from the target (replacements plus growth), but never more than the earned amount.
 */
function step(stock: number, target: number, yearlyUses: number, minPlays: number, maxPlays: number) {
  const earned = yearlyUses / Math.max(1, minPlays);
  const worn = yearlyUses / Math.max(Math.max(1, minPlays), maxPlays);
  const remaining = Math.max(0, stock - worn);
  const buy = Math.min(Math.max(0, target - remaining), earned);

  return { buy, stock: remaining + buy };
}

/** Items bought in each of the next `years` years. */
export function purchasePlan(
  owned: number,
  target: number,
  yearlyUses: number,
  minPlays: number,
  maxPlays: number,
  years: number,
): number[] {
  const bought: number[] = [];
  let stock = owned;

  for (let yPos = 0; yPos < years; yPos++) {
    const next = step(stock, target, yearlyUses, minPlays, maxPlays);
    bought.push(next.buy);
    stock = next.stock;
  }

  return bought;
}

/** Years until you hold the target number, or null if buying can never keep up (or takes over 100 years). */
export function yearsToReach(
  owned: number,
  target: number,
  yearlyUses: number,
  minPlays: number,
  maxPlays: number,
): number | null {
  let stock = owned;

  for (let yPos = 1; yPos <= 100; yPos++) {
    stock = step(stock, target, yearlyUses, minPlays, maxPlays).stock;

    if (stock >= target - 1e-9) return yPos;
  }

  return null;
}
