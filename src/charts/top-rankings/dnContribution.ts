import { maintenance } from "./maintenance/maintenance";
import type { Ranking } from "./score/ranking_types";

/** An n-Factor is shown in deci-ns (dn): n x 10. */
const DECI = 10;

/**
 * How much this one item adds to the n-Factor, in dn: the n-Factor of everything minus the n-Factor without the item.
 * Its lines, its quality and its languages all count, so code in an easy language adds less than the same lines in a hard one,
 * and can even come out below zero when it lowers the n-Factor. Null when nothing would be left to compare.
 */
function addedBy(ranking: Ranking, item: Ranking["items"][number], wholeGraded: number): number | null {
  const without = maintenance({ ...ranking, items: ranking.items.filter((other) => other !== item) });

  return without ? (wholeGraded - without.current.graded) * DECI : null;
}

/**
 * Each item's share of the current n-Factor in dn. The n-Factor does not grow in a straight line with lines, so the single-item
 * amounts do not add up to it; they are scaled so that the shares always total the current dn shown on the card.
 */
export function dnContributions(ranking: Ranking): Map<string, number> {
  const whole = maintenance(ranking);
  const drops = new Map<string, number>();

  if (!whole) return drops;

  for (const item of ranking.items) {
    const drop = addedBy(ranking, item, whole.current.graded);

    if (drop !== null) drops.set(item.name, drop);
  }

  const dropTotal = [...drops.values()].reduce((runningTotal, drop) => runningTotal + drop, 0);

  // Scaling by a total of zero or less would blow up or flip every sign, so those are left as they are.
  if (dropTotal <= 0) return drops;

  // Multiply every drop by the same number so that they add up to the whole.
  return new Map([...drops].map(([name, drop]) => [name, (drop * whole.current.graded * DECI) / dropTotal]));
}

/** A contribution as text like "+0.5dn", or "-0.5dn" when it lowers the n-Factor. */
export function formatContribution(dn: number): string {
  return `${dn >= 0 ? "+" : "-"}${Math.abs(dn).toFixed(1)}dn`;
}
