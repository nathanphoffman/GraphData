import { difficultyOf } from "../model/data";
import type { Creature } from "../model/types";

/**
 * Random fill: pick a random target inside [low, high], then keep adding random creatures that
 * still fit under it. Retries many times; an attempt that lands inside the range wins right away,
 * otherwise the attempt closest to the low end is kept.
 */
export function buildEncounter(pool: Creature[], low: number, high: number): Creature[] {
  const targets: number[] = [];

  for (let t = low; t <= high; t += 0.25) targets.push(t);
  let best: Creature[] = [];
  let bestGap = Infinity;

  for (let attempt = 0; attempt < 300; attempt++) {
    const target = targets[Math.floor(Math.random() * targets.length)];
    const picks: Creature[] = [];
    let left = target;

    for (;;) {
      const fits = pool.filter((creature) => difficultyOf(creature) <= left);

      if (fits.length === 0) break;
      const next = fits[Math.floor(Math.random() * fits.length)];
      picks.push(next);
      left -= difficultyOf(next);
    }

    const total = target - left;

    if (total >= low) return picks;

    if (low - total < bestGap) {
      best = picks;
      bestGap = low - total;
    }
  }

  return best;
}

/** Collapse repeated picks into one row per creature with a count, hardest first. */
export function groupPicks(picks: Creature[]) {
  const counts = new Map<string, { creature: Creature; count: number }>();

  for (const c of picks) {
    const entry = counts.get(c.id);

    if (entry) entry.count += 1;
    else counts.set(c.id, { creature: c, count: 1 });
  }

  return [...counts.values()].sort((first, second) => difficultyOf(second.creature) - difficultyOf(first.creature));
}
