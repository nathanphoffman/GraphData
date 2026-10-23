import type { Season, Target } from "../types";
import { SEASONS } from "./settings";

export const RAD = Math.PI / 180;

export const STEP_HOURS = 0.5;

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function dayOfYear(month: number, day: number): number {
  return Math.round((Date.UTC(2025, month - 1, day) - Date.UTC(2025, 0, 0)) / 86400000);
}

/** Altitude in degrees of a point (ra hours, dec deg) at the given local sidereal time. */
export function altitude(ra: number, dec: number, lst: number, lat: number): number {
  const hourAngle = (lst - ra) * 15 * RAD;
  const sinAlt =
    Math.sin(lat * RAD) * Math.sin(dec * RAD) + Math.cos(lat * RAD) * Math.cos(dec * RAD) * Math.cos(hourAngle);

  return Math.asin(clamp(sinAlt, -1, 1)) / RAD;
}

export const OBLIQUITY = 23.44;

export interface Sample {
  lst: number;
  /** Ecliptic longitude of the sun in degrees, which is where the planets line up from. */
  sunLon: number;
  /** Local solar time in hours; past 24 means after midnight. */
  hour: number;
  /** Which of the season's sample dates this is. */
  date: number;
  /** True when the sun is far enough below the horizon to see faint things. */
  dark: boolean;
}

/** Sample every half hour from start to end (hours, past 24 means after midnight) on three dates in a season. Time is local solar time (no daylight saving). */
export function sampleWindow(latitude: number, season: Season, start: number, end: number): Sample[] {
  const samples: Sample[] = [];
  SEASONS[season].dates.forEach(([month, day], date) => {
    const doy = dayOfYear(month, day);
    const sunRa = (((doy - 79) * 24) / 365.2422 + 24) % 24;
    const sunDec = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));

    for (let t = start; t < end; t += STEP_HOURS) {
      const lst = (sunRa + (t - 12) + 48) % 24;
      const sunAlt = altitude(sunRa, sunDec, lst, latitude);
      samples.push({ lst, hour: t, date, sunLon: (((doy - 79) * 360) / 365.2422 + 360) % 360, dark: sunAlt < -12 });
    }
  });

  return samples;
}

/** Hours around the ideal hour that are scored. */
export const VIEW_HALF_WINDOW = 1.5;

/** The night searched for each target's ideal hour: 5 pm to 7 am. */
export const NIGHT_START = 17;

export const NIGHT_END = 31;

export interface Position {
  ra: number;
  dec: number;
}

/** Angles from the sun to try for a planet: all the way round for outer planets, back and forth for inner ones. */
export function planetOffsets(maxElongation: number): number[] {
  if (maxElongation >= 180) return Array.from({ length: 12 }, (_, i) => i * 30);

  return Array.from({ length: 7 }, (_, i) => -maxElongation + (i * 2 * maxElongation) / 6);
}

/** A planet is always on the ecliptic, so averaging over offsets from the sun averages over its orbit. */
export function positionsAt(target: Target, sample: Sample): Position[] {
  if (!target.planet) return [{ ra: target.ra, dec: target.dec }];

  return planetOffsets(target.planet.maxElongation).map((offset) => {
    const lon = (sample.sunLon + offset) * RAD;
    const dec = Math.asin(Math.sin(OBLIQUITY * RAD) * Math.sin(lon)) / RAD;
    const ra = (Math.atan2(Math.cos(OBLIQUITY * RAD) * Math.sin(lon), Math.cos(lon)) / RAD / 15 + 24) % 24;

    return { ra, dec };
  });
}

/**
 * The ideal hour to view a target in a season: on each sample date, the dark half hour when it is highest, averaged over the dates
 * (so 9 pm, 10 pm and 11 pm give 10 pm). Null for planets, which have no fixed best hour (they are scored around midnight).
 */
export function bestHour(target: Target, season: Season, latitude: number): number | null {
  if (target.planet) return null;
  const best: { alt: number; hour: number }[] = [];

  for (const s of sampleWindow(latitude, season, NIGHT_START, NIGHT_END)) {
    if (!s.dark) continue;
    const alt = altitude(target.ra, target.dec, s.lst, latitude);

    if (!best[s.date] || alt > best[s.date].alt) best[s.date] = { alt, hour: s.hour };
  }

  const found = best.filter(Boolean);

  if (!found.length) return null;

  // Mean hour of the visible spots, wrapped back into 0-23.
  return Math.round(found.reduce((sum, b) => sum + b.hour, 0) / found.length) % 24;
}

/** Lowest altitude (degrees) that counts as "up" when planning a night. */
export const UP_ALTITUDE = 25;

/** Hours (0-23, local solar time) during the middle date of a season's dark night when a target is above 25 degrees, as first and last hour; null if it never is. */
export function upWindow(target: Target, season: Season, latitude: number): [number, number] | null {
  const hours = sampleWindow(latitude, season, NIGHT_START, NIGHT_END)
    .filter((s) => s.date === 1 && s.dark && altitude(target.ra, target.dec, s.lst, latitude) >= UP_ALTITUDE)
    .map((s) => s.hour);

  return hours.length ? [Math.round(Math.min(...hours)) % 24, Math.round(Math.max(...hours)) % 24] : null;
}
