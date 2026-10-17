import type { Aperture, FocalLength, ScoredTarget, Season, Settings, Target } from "./types";

const RAD = Math.PI / 180;

/** Mid-month sample dates (month, day) for each season. Meteorological seasons. */
export const SEASONS: Record<Season, { label: string; dates: [number, number][] }> = {
  spring: { label: "Spring (Mar–May)", dates: [[3, 15], [4, 15], [5, 15]] },
  summer: { label: "Summer (Jun–Aug)", dates: [[6, 15], [7, 15], [8, 15]] },
  autumn: { label: "Autumn (Sep–Nov)", dates: [[9, 15], [10, 15], [11, 15]] },
  winter: { label: "Winter (Dec–Feb)", dates: [[12, 15], [1, 15], [2, 15]] },
};

/** Typical true field of view in arcminutes for each focal length class. */
export const FOCAL_LENGTHS: Record<FocalLength, { label: string; fov: number }> = {
  small: { label: "Small (under 500 mm, wide field)", fov: 240 },
  "small-medium": { label: "Small-Medium (about 500 mm)", fov: 147 },
  medium: { label: "Medium (500–1200 mm)", fov: 90 },
  "medium-long": { label: "Medium-Long (about 1200 mm)", fov: 56 },
  long: { label: "Long (over 1200 mm, tight field)", fov: 35 },
};

/** Representative mirror/lens diameter in mm for each size class. */
export const APERTURES: Record<Aperture, { label: string; mm: number }> = {
  small: { label: "Small (under 100 mm / 4 in)", mm: 70 },
  "small-medium": { label: "Small-Medium (about 100 mm / 4 in)", mm: 95 },
  medium: { label: "Medium (100–200 mm / 4–8 in)", mm: 130 },
  "medium-large": { label: "Medium-Large (about 200 mm / 8 in)", mm: 180 },
  large: { label: "Large (over 200 mm / 8 in)", mm: 250 },
};

export const DEFAULT_SETTINGS: Settings = {
  from: "22:00",
  to: "01:00",
  latitude: 40,
  focalLength: "medium",
  aperture: "medium",
  bortle: 4,
};

const STEP_HOURS = 0.5;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function dayOfYear(month: number, day: number): number {
  return Math.round((Date.UTC(2025, month - 1, day) - Date.UTC(2025, 0, 0)) / 86400000);
}

function parseHours(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) + (m || 0) / 60;
}

/** Altitude in degrees of a point (ra hours, dec deg) at the given local sidereal time. */
function altitude(ra: number, dec: number, lst: number, lat: number): number {
  const hourAngle = (lst - ra) * 15 * RAD;
  const sinAlt =
    Math.sin(lat * RAD) * Math.sin(dec * RAD) + Math.cos(lat * RAD) * Math.cos(dec * RAD) * Math.cos(hourAngle);
  return Math.asin(clamp(sinAlt, -1, 1)) / RAD;
}

interface Sample {
  lst: number;
  /** True when the sun is far enough below the horizon to see faint things. */
  dark: boolean;
}

/** Sample every half hour of the window on three dates in a season. Time is local solar time (no daylight saving). */
function sampleWindow(settings: Settings, season: Season): Sample[] {
  const start = parseHours(settings.from);
  let end = parseHours(settings.to);
  if (end <= start) end += 24;
  const samples: Sample[] = [];
  for (const [month, day] of SEASONS[season].dates) {
    const doy = dayOfYear(month, day);
    const sunRa = (((doy - 79) * 24) / 365.2422 + 24) % 24;
    const sunDec = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));
    for (let t = start; t < end; t += STEP_HOURS) {
      const lst = (sunRa + (t - 12) + 48) % 24;
      const sunAlt = altitude(sunRa, sunDec, lst, settings.latitude);
      samples.push({ lst, dark: sunAlt < -12 });
    }
  }
  return samples;
}

/** 0 at 10° or lower, 1 at 55° or higher: low objects fight haze and thick air. */
function altitudeQuality(alt: number): number {
  return clamp((alt - 10) / 45, 0, 1);
}

/** Dimmest average surface brightness (mag per square arcminute) a telescope shows comfortably. */
function limitingSurfaceBrightness(mm: number): number {
  return 12 + 5 * Math.log10(mm / 70);
}

/** Average brightness per square arcminute: total light spread over the target's area (higher number = dimmer). */
export function surfaceBrightness(t: Target): number {
  const area = Math.max(0.01, (Math.PI / 4) * t.major * t.minor);
  return t.magnitude + 2.5 * Math.log10(area);
}

/** Best when the target fills about half the field; too big is punished harder than too small. */
function sizeFit(t: Target, fov: number): number {
  const ratio = t.major / fov;
  const sigma = ratio > 0.5 ? 1.3 : 0.7;
  const x = Math.log(ratio / 0.5);
  return Math.max(0.1, Math.exp(-(x * x) / (2 * sigma * sigma)));
}

/**
 * How many magnitudes of surface brightness the sky costs you at this altitude (negative = darker than a normal rural sky).
 * Looking low means looking through more air (airmass = 1 / sin(alt), 1 overhead, about 2 at 30 degrees, capped at 10):
 * light pollution glow triples for each extra airmass, and the air also dims the target by 0.25 mag per extra airmass.
 */
function skyGlowPenalty(bortle: number, alt: number): number {
  const airmass = Math.min(10, 1 / Math.sin(clamp(alt, 1, 90) * RAD));
  const base = (bortle - 3) * 0.5;
  const glow = base > 0 ? base * (1 + 2 * (airmass - 1)) : base;
  return glow + 0.25 * (airmass - 1);
}

/** Added to a bright star's magnitude to put it on the surface brightness scale (a magnitude 3 star lands at 4.5). */
const STAR_CORE_OFFSET = 1.5;

/** Surface brightness of the bright centre, which is what you spot first at the eyepiece. */
export function coreSurfaceBrightness(t: Target): number {
  // A cluster's bright stars stand out as points, so rate the core by its brightest members instead of by area.
  if (t.brightStar !== undefined) return t.brightStar + STAR_CORE_OFFSET;
  return surfaceBrightness(t) - (t.coreBoost ?? 0);
}

/** How many magnitudes brighter than the scope's limit (after sky glow) a surface brightness is. */
function margin(sb: number, mm: number, glow: number): number {
  return limitingSurfaceBrightness(mm) - glow - sb;
}

/** Straight-line scale with no early cap: 0 at the limit, 1 at 10 magnitudes above it (a star-like point). */
function coreScore(sb: number, mm: number, glow: number): number {
  return clamp(margin(sb, mm, glow) / 10, 0, 1);
}

/** Faintest star (total magnitude) a telescope of this size shows, before sky costs. */
function limitingMagnitude(mm: number): number {
  return 2.7 + 5 * Math.log10(mm);
}

/**
 * Total light: how much light the whole target sends you, ignoring how spread out it is (Core covers that).
 * Straight line from 0 at the scope's limit to 1 at 10 magnitudes brighter than it.
 */
function totalLightScore(magnitude: number, mm: number, cost: number): number {
  return clamp((limitingMagnitude(mm) - cost - magnitude) / 10, 0, 1);
}

export function scoreTargets(targets: Target[], settings: Settings): ScoredTarget[] {
  const seasonSamples = Object.fromEntries(
    (Object.keys(SEASONS) as Season[]).map((season) => [season, sampleWindow(settings, season)]),
  ) as Record<Season, Sample[]>;
  const { fov } = FOCAL_LENGTHS[settings.focalLength];
  const { mm } = APERTURES[settings.aperture];

  return targets
    .map((target) => {
      const samples = seasonSamples[target.bestSeason];
      let skyTotal = 0;
      let lightTotal = 0;
      let coreTotal = 0;
      let peakAltitude = -90;
      let aboveHorizon = 0;
      for (const s of samples) {
        const alt = altitude(target.ra, target.dec, s.lst, settings.latitude);
        if (!s.dark) continue;
        skyTotal += altitudeQuality(alt);
        peakAltitude = Math.max(peakAltitude, alt);
        if (alt <= 0) continue;
        // Every moment it is up counts equally here, so time spent low in the glow drags Light and Core down.
        aboveHorizon++;
        const glow = skyGlowPenalty(settings.bortle, alt);
        lightTotal += totalLightScore(target.magnitude, mm, glow);
        coreTotal += coreScore(coreSurfaceBrightness(target), mm, glow);
      }
      const sky = samples.length ? skyTotal / samples.length : 0;
      const fit = sizeFit(target, fov);
      const light = aboveHorizon > 0 ? lightTotal / aboveHorizon : 0;
      const core = aboveHorizon > 0 ? coreTotal / aboveHorizon : 0;
      const score =
        100 * Math.pow(sky, 0.2) * Math.pow(fit, 0.2) * Math.pow(light, 0.2) * Math.pow(core, 0.4);
      return { target, score, sky, fit, light, core, peakAltitude };
    })
    .sort((a, b) => b.score - a.score);
}

/** Share of the window (0-1) that is dark enough on every sampled date of a season. */
export function darkFraction(settings: Settings, season: Season): number {
  const samples = sampleWindow(settings, season);
  return samples.length ? samples.filter((s) => s.dark).length / samples.length : 0;
}
