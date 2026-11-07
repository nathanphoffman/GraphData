import { difficultyOf } from "../model/data";
import type { Creature } from "../model/types";

/** The random target moves in quarter steps, and the fill is retried this many times. */
const TARGET_STEP = 0.25;
const ATTEMPTS = 300;

/**
 * Random fill: pick a random target inside [low, high], then keep adding random creatures that
 * still fit under it. Retries many times; an attempt that lands inside the range wins right away,
 * otherwise the attempt closest to the low end is kept.
 */
export function buildEncounter(pool: Creature[], lowest: number, high: number): Creature[] {
  const targets: number[] = [];

  for (let target = lowest; target <= high; target += TARGET_STEP) targets.push(target);
  let best: Creature[] = [];
  let bestGap = Infinity;

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
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

    if (total >= lowest) return picks;

    if (lowest - total < bestGap) {
      best = picks;
      bestGap = lowest - total;
    }
  }

  return best;
}

/** Collapse repeated picks into one row per creature with a count, hardest first. */
export function groupPicks(picks: Creature[]) {
  const counts = new Map<string, { creature: Creature; count: number }>();

  for (const pick of picks) {
    const entry = counts.get(pick.id);

    if (entry) entry.count += 1;
    else counts.set(pick.id, { creature: pick, count: 1 });
  }

  return [...counts.values()].sort((first, second) => difficultyOf(second.creature) - difficultyOf(first.creature));
}
