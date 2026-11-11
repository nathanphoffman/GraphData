import { maintenance } from "./maintenance/maintenance";
import { nFactor } from "./maintenance/n_factor";
import type { Ranking } from "./score/ranking_types";

/** An n-Factor is shown in deci-ns (dn): n x 10. */
const DECI = 10;

/**
 * How much the lines of this one item add to the n-Factor, in dn: the n-Factor of all the lines minus the n-Factor of the lines without it.
 * Only the lines count here, never the language mix, so code in an easy language still adds to the n-Factor instead of lowering it.
 * Null when nothing would be left to compare.
 */
function linesAddedBy(ranking: Ranking, item: Ranking["items"][number], wholeLines: number): number | null {
  const without = maintenance({ ...ranking, items: ranking.items.filter((other) => other !== item) });

  return without ? (nFactor(wholeLines) - nFactor(without.totalLines)) * DECI : null;
}

/**
 * Each item's share of the current n-Factor in dn. Every item's lines add to it, so no share is below zero. The n-Factor does not grow
 * in a straight line with lines, so the single-item amounts do not add up to it; they are scaled so that the shares always total the
 * current dn shown on the card.
 */
export function dnContributions(ranking: Ranking): Map<string, number> {
  const whole = maintenance(ranking);
  const drops = new Map<string, number>();

  if (!whole) return drops;

  for (const item of ranking.items) {
    const drop = linesAddedBy(ranking, item, whole.totalLines);

    if (drop !== null) drops.set(item.name, drop);
  }

  const dropTotal = [...drops.values()].reduce((runningTotal, drop) => runningTotal + drop, 0);

  if (dropTotal === 0) return drops;

  // Multiply every drop by the same number so that they add up to the whole.
  return new Map([...drops].map(([name, drop]) => [name, (drop * whole.current.graded * DECI) / dropTotal]));
}

/** A contribution as text like "+0.5dn", or "-0.5dn" when it lowers the n-Factor. */
export function formatContribution(dn: number): string {
  return `${dn >= 0 ? "+" : "-"}${Math.abs(dn).toFixed(1)}dn`;
}
