import type { Season, Target } from "../types";
import { SEASONS } from "./settings";

export const DEGREES_TO_RADIANS = Math.PI / 180;

export const STEP_HOURS = 0.5;

/** Keep a value inside a range. */
export const clamp = (value: number, lowest: number, highest: number) => Math.min(highest, Math.max(lowest, value));

/** Day number in the year (1-365), used to find where the sun is. */
export function dayOfYear(month: number, day: number): number {
  return Math.round((Date.UTC(2025, month - 1, day) - Date.UTC(2025, 0, 0)) / 86400000);
}

/** Altitude in degrees of a point (ra hours, dec deg) at the given local sidereal time. */
export function altitude(rightAscension: number, declination: number, localSiderealTime: number, latitude: number): number {
  const hourAngle = (localSiderealTime - rightAscension) * 15 * DEGREES_TO_RADIANS;
  const sinAlt =
    Math.sin(latitude * DEGREES_TO_RADIANS) * Math.sin(declination * DEGREES_TO_RADIANS) + Math.cos(latitude * DEGREES_TO_RADIANS) * Math.cos(declination * DEGREES_TO_RADIANS) * Math.cos(hourAngle);

  return Math.asin(clamp(sinAlt, -1, 1)) / DEGREES_TO_RADIANS;
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

  // Sun position for each of the season's sample dates, used to decide when it is dark.
  SEASONS[season].dates.forEach(([month, day], date) => {
    const doy = dayOfYear(month, day);
    const sunRa = (((doy - 79) * 24) / 365.2422 + 24) % 24;
    const sunDec = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));

    for (let t = start; t < end; t += STEP_HOURS) {
      const localSiderealTime = (sunRa + (t - 12) + 48) % 24;
      const sunAlt = altitude(sunRa, sunDec, localSiderealTime, latitude);
      samples.push({ lst: localSiderealTime, hour: t, date, sunLon: (((doy - 79) * 360) / 365.2422 + 360) % 360, dark: sunAlt < -12 });
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
  if (maxElongation >= 180) return Array.from({ length: 12 }, (_unused, index) => index * 30);

  return Array.from({ length: 7 }, (_unused, index) => -maxElongation + (index * 2 * maxElongation) / 6);
}

/** A planet is always on the ecliptic, so averaging over offsets from the sun averages over its orbit. */
export function positionsAt(target: Target, sample: Sample): Position[] {
  if (!target.planet) return [{ ra: target.ra, dec: target.dec }];

  // A planet's sky position for each angle away from the sun it could be at.
  return planetOffsets(target.planet.maxElongation).map((offset) => {
    const lon = (sample.sunLon + offset) * DEGREES_TO_RADIANS;
    const declination = Math.asin(Math.sin(OBLIQUITY * DEGREES_TO_RADIANS) * Math.sin(lon)) / DEGREES_TO_RADIANS;
    const rightAscension = (Math.atan2(Math.cos(OBLIQUITY * DEGREES_TO_RADIANS) * Math.sin(lon), Math.cos(lon)) / DEGREES_TO_RADIANS / 15 + 24) % 24;

    return { ra: rightAscension, dec: declination };
  });
}

/**
 * The ideal hour to view a target in a season: on each sample date, the dark half hour when it is highest, averaged over the dates
 * (so 9 pm, 10 pm and 11 pm give 10 pm). Null for planets, which have no fixed best hour (they are scored around midnight).
 */
export function bestHour(target: Target, season: Season, latitude: number): number | null {
  if (target.planet) return null;
  const best: { alt: number; hour: number }[] = [];

  for (const sample of sampleWindow(latitude, season, NIGHT_START, NIGHT_END)) {
    if (!sample.dark) continue;
    const alt = altitude(target.ra, target.dec, sample.lst, latitude);

    if (!best[sample.date] || alt > best[sample.date].alt) best[sample.date] = { alt, hour: sample.hour };
  }

  const found = best.filter(Boolean);

  if (!found.length) return null;

  // Mean hour of the visible spots, wrapped back into 0-23.
  return Math.round(found.reduce((total, b) => total + b.hour, 0) / found.length) % 24;
}

/** Lowest altitude (degrees) that counts as "up" when planning a night. */
export const UP_ALTITUDE = 25;

/** Hours (0-23, local solar time) during the middle date of a season's dark night when a target is above 25 degrees, as first and last hour; null if it never is. */
export function upWindow(target: Target, season: Season, latitude: number): [number, number] | null {
  const hours = sampleWindow(latitude, season, NIGHT_START, NIGHT_END)
    .filter((sample) => sample.date === 1 && sample.dark && altitude(target.ra, target.dec, sample.lst, latitude) >= UP_ALTITUDE)
    .map((sample) => sample.hour);

  return hours.length ? [Math.round(Math.min(...hours)) % 24, Math.round(Math.max(...hours)) % 24] : null;
}
