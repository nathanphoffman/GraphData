import { maintenance } from "./maintenance";
import type { Ranking } from "./score";

/** An n-Factor is shown in deci-ns (dn): n x 10. */
const DECI = 10;

/** How much the current n-Factor drops, in dn, when this one item is left out; null when nothing would be left to compare. */
function dropWithout(ranking: Ranking, item: Ranking["items"][number], whole: number): number | null {
  const without = maintenance({ ...ranking, items: ranking.items.filter((other) => other !== item) });

  return without ? (whole - without.current.graded) * DECI : null;
}

/**
 * Each item's share of the current n-Factor in dn. The n-Factor does not grow in a straight line with lines, so the single-item
 * drops do not add up to it; they are scaled so that the shares always total the current dn shown on the card.
 */
export function dnContributions(ranking: Ranking): Map<string, number> {
  const whole = maintenance(ranking)?.current.graded;
  const drops = new Map<string, number>();

  if (whole === undefined) return drops;

  for (const item of ranking.items) {
    const drop = dropWithout(ranking, item, whole);

    if (drop !== null) drops.set(item.name, drop);
  }

  const dropTotal = [...drops.values()].reduce((runningTotal, drop) => runningTotal + drop, 0);

  if (dropTotal === 0) return drops;

  // Multiply every drop by the same number so that they add up to the whole.
  return new Map([...drops].map(([name, drop]) => [name, (drop * whole * DECI) / dropTotal]));
}

/** A contribution as text like "+0.5dn", or "-0.5dn" when it lowers the n-Factor. */
export function formatContribution(dn: number): string {
  return `${dn >= 0 ? "+" : "-"}${Math.abs(dn).toFixed(1)}dn`;
}
