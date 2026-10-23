import type { ScoredTarget, Season, Settings } from "../types";
import { NIGHT_START, upWindow } from "./sky";

export type ScheduleLevel = "easy" | "moderate" | "hard";

export interface ScheduleItem {
  row: ScoredTarget;
  /** First and last hour it is up and dark. */
  up: [number, number];
}

export interface ScheduleSlot {
  /** First hour of the window (a multiple of the window length: 22 means 10 PM to 12 AM). */
  hour: number;
  items: Record<ScheduleLevel, ScheduleItem[]>;
  /** Items left off because the slot was full. */
  more: number;
}

export interface Schedule {
  season: Season;
  slots: ScheduleSlot[];
  /** One random Very hard object that is up in this season, for fun. */
  reach: ScheduleItem | null;
  /** Stars well placed this season, best score first. */
  stars: ScoredTarget[];
}

/** Length of each block of the night in the schedule, in hours. Blocks line up with midnight (10 PM to 12 AM, 12 AM to 2 AM). */
export const WINDOW_HOURS = 2;

/** Most objects listed per window for each level. */
export const SLOT_LIMITS: Record<ScheduleLevel, number> = { easy: 6, moderate: 4, hard: 3 };

/**
 * A plan for one night: every object goes in the window containing the hour it is best placed, grouped as Easy (Easy and above), Moderate and Hard,
 * best score first. Very hard objects are not listed except for one random Reach. Stars (and planets) get their own list.
 */
export function buildSchedule(rows: ScoredTarget[], season: Season, settings: Settings): Schedule {
  const inSeason = rows.filter((r) => r.target.bestSeason === season);
  const stars = inSeason.filter((r) => r.target.type === "Star" && r.score > 0);
  const byHour = new Map<number, ScheduleSlot>();
  const veryHard: ScheduleItem[] = [];

  for (const row of inSeason) {
    if (row.target.type === "Star" || row.bestHour === null || row.score <= 0) continue;
    const up = upWindow(row.target, season, settings.latitude);

    if (!up) continue;

    if (row.score < 10) {
      veryHard.push({ row, up });
      continue;
    }

    // Score cutoffs for how easy the target is to schedule.
    const level: ScheduleLevel = row.score >= 35 ? "easy" : row.score >= 20 ? "moderate" : "hard";
    const start = row.bestHour - (row.bestHour % WINDOW_HOURS);
    const slot = byHour.get(start) ?? { hour: start, items: { easy: [], moderate: [], hard: [] }, more: 0 };
    byHour.set(start, slot);

    if (slot.items[level].length < SLOT_LIMITS[level]) slot.items[level].push({ row, up });
    else slot.more++;
  }

  const evening = (h: number) => (h < NIGHT_START - 12 ? h + 24 : h);

  return {
    season,
    slots: [...byHour.values()].sort((a, b) => evening(a.hour) - evening(b.hour)),
    reach: veryHard.length ? veryHard[Math.floor(Math.random() * veryHard.length)] : null,
    stars,
  };
}
