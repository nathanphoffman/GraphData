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
export const FOCAL_LENGTHS: Record<FocalLength, { label: string; fov: number; mm: number }> = {
  tiny: { label: "Tiny (about 150 mm, ultra-wide field)", fov: 480, mm: 150 },
  "tiny-small": { label: "Tiny-Small (about 200 mm)", fov: 340, mm: 200 },
  small: { label: "Small (about 300 mm, wide field)", fov: 240, mm: 300 },
  "small-medium": { label: "Small-Medium (about 500 mm)", fov: 147, mm: 500 },
  medium: { label: "Medium (about 800 mm)", fov: 90, mm: 800 },
  "medium-large": { label: "Medium-Large (about 1200 mm)", fov: 56, mm: 1200 },
  large: { label: "Large (about 2000 mm, tight field)", fov: 35, mm: 2000 },
  "large-huge": { label: "Large-Huge (about 2800 mm)", fov: 25, mm: 2800 },
  huge: { label: "Huge (about 4000 mm, very tight field)", fov: 18, mm: 4000 },
};

/** Representative mirror/lens diameter in mm for each size class. */
export const APERTURES: Record<Aperture, { label: string; mm: number }> = {
  tiny: { label: "Tiny (about 40 mm / 1.5 in)", mm: 40 },
  "tiny-small": { label: "Tiny-Small (about 55 mm / 2 in)", mm: 55 },
  small: { label: "Small (about 70 mm / 3 in)", mm: 70 },
  "small-medium": { label: "Small-Medium (about 100 mm / 4 in)", mm: 95 },
  medium: { label: "Medium (about 130 mm / 5 in)", mm: 130 },
  "medium-large": { label: "Medium-Large (about 180 mm / 7 in)", mm: 180 },
  large: { label: "Large (about 250 mm / 10 in)", mm: 250 },
  "large-huge": { label: "Large-Huge (about 350 mm / 14 in)", mm: 350 },
  huge: { label: "Huge (about 500 mm / 20 in)", mm: 500 },
};

export const DEFAULT_SETTINGS: Settings = {
  from: "22:00",
  to: "01:00",
  latitude: 40,
  focalLength: "medium",
  aperture: "medium",
  manual: false,
  preset: "ed80cf",
  scopeFocalMm: 900,
  apertureIn: 5,
  eyepieceMm: 25,
  eyepieceAfov: 52,
  bortle: 4,
  simWeight: 50,
  authorWeight: 50,
  opticalQuality: 50,
};

export interface Preset {
  label: string;
  /** Mirror or lens diameter in mm. */
  mm: number;
  focalMm: number;
  /** Optical quality, 0 (poor) to 100 (excellent), same scale as the slider. */
  quality: number;
}

/** Telescopes that can be picked by name. They replace the size classes, the manual entry and the optical quality slider. */
export const PRESETS: Record<string, Preset> = {
  astroscan: { label: "Astroscan (114 mm f/4 reflector)", mm: 114, focalMm: 450, quality: 25 },
  ed80cf: { label: "Explore Scientific ED80CF (80 mm f/6 triplet apo)", mm: 80, focalMm: 480, quality: 95 },
};

export function activePreset(settings: Settings): Preset | undefined {
  return PRESETS[settings.preset];
}

/** Optical quality in use: the preset's, or the slider. */
export function effectiveQuality(settings: Settings): number {
  return activePreset(settings)?.quality ?? settings.opticalQuality;
}

/** Magnification and true field of view (arcminutes) of a manually entered telescope and eyepiece. */
export function manualOptics(settings: Settings) {
  const magnification = scopeFocalLength(settings) / settings.eyepieceMm;
  return { magnification, fov: (settings.eyepieceAfov * 60) / magnification };
}

/** Field of view (arcminutes) and aperture (mm) in use, from the size classes or the manual telescope. */
export function optics(settings: Settings): { fov: number; mm: number } {
  const preset = activePreset(settings);
  if (preset) return { fov: manualOptics(settings).fov, mm: preset.mm };
  if (settings.manual) return { fov: manualOptics(settings).fov, mm: settings.apertureIn * 25.4 };
  return { fov: FOCAL_LENGTHS[settings.focalLength].fov, mm: APERTURES[settings.aperture].mm };
}

const STEP_HOURS = 0.5;
/** Points taken off every score (it never goes below 0). */
const SCORE_OFFSET = 10;
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

const OBLIQUITY = 23.44;

interface Sample {
  lst: number;
  /** Ecliptic longitude of the sun in degrees, which is where the planets line up from. */
  sunLon: number;
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
      samples.push({ lst, sunLon: (((doy - 79) * 360) / 365.2422 + 360) % 360, dark: sunAlt < -12 });
    }
  }
  return samples;
}

interface Position {
  ra: number;
  dec: number;
}

/** Angles from the sun to try for a planet: all the way round for outer planets, back and forth for inner ones. */
function planetOffsets(maxElongation: number): number[] {
  if (maxElongation >= 180) return Array.from({ length: 12 }, (_, i) => i * 30);
  return Array.from({ length: 7 }, (_, i) => -maxElongation + (i * 2 * maxElongation) / 6);
}

/** A planet is always on the ecliptic, so averaging over offsets from the sun averages over its orbit. */
function positionsAt(target: Target, sample: Sample): Position[] {
  if (!target.planet) return [{ ra: target.ra, dec: target.dec }];
  return planetOffsets(target.planet.maxElongation).map((offset) => {
    const lon = (sample.sunLon + offset) * RAD;
    const dec = Math.asin(Math.sin(OBLIQUITY * RAD) * Math.sin(lon)) / RAD;
    const ra = (Math.atan2(Math.cos(OBLIQUITY * RAD) * Math.sin(lon), Math.cos(lon)) / RAD / 15 + 24) % 24;
    return { ra, dec };
  });
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

/** Best when the target fills about a third of the field; too small is punished harder than too big. */
function sizeFit(t: Target, fov: number): number {
  const ratio = t.major / fov;
  const sigma = ratio > 0.33 ? 1.2 : 0.65;
  const x = Math.log(ratio / 0.33);
  return Math.max(0.01, Math.exp(-(x * x) / (2 * sigma * sigma)));
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

/**
 * Straight-line scale with no early cap: 1 at 10 magnitudes above the limit (a star-like point), falling to 0 at 4 below it.
 * Experienced observers see things somewhat past the nominal limit, so the limit itself is not a cliff.
 */
function coreScore(sb: number, mm: number, glow: number): number {
  return clamp((margin(sb, mm, glow) + SEE_PAST_LIMIT) / (10 + SEE_PAST_LIMIT), 0, 1);
}

/** Magnitudes past the nominal limit that a patient observer can still pick something out. */
const SEE_PAST_LIMIT = 4;

/** Faintest star (total magnitude) a telescope of this size shows, before sky costs. */
function limitingMagnitude(mm: number): number {
  return 2.7 + 5 * Math.log10(mm);
}

/**
 * Total light: how much light the whole target sends you, ignoring how spread out it is (Core covers that).
 * Same straight-line scale as Core.
 */
function totalLightScore(magnitude: number, mm: number, cost: number): number {
  return clamp((limitingMagnitude(mm) - cost - magnitude + SEE_PAST_LIMIT) / (10 + SEE_PAST_LIMIT), 0, 1);
}

/**
 * What the eyepiece view should look like: how many magnitudes of surface brightness the target sits above the
 * faintest thing this scope shows (negative = below it), and how bright the sky glow is (0 dark, 1 inner city).
 */
export function viewConditions(t: Target, settings: Settings, alt: number) {
  const { fov, mm } = optics(settings);
  const glow = skyGlowPenalty(settings.bortle, alt);
  return {
    fov,
    // Point-like things (stars, planets) saturate their photo and bloom into a huge blob, so cap how much brighter than the limit they can look.
    margin: Math.min(margin(surfaceBrightness(t), mm, glow), t.major === 0 ? 1.5 : 6),
    // For dot-like targets: how many magnitudes brighter than the faintest star the scope shows under this sky.
    pointMargin: limitingMagnitude(mm) - glow - t.magnitude,
    skyGlow: clamp((settings.bortle - 1) / 8, 0, 1),
  };
}

/** Telescope focal length in mm: the preset's, the manual entry, or the typical value for the size class. */
export function scopeFocalLength(settings: Settings): number {
  const preset = activePreset(settings);
  if (preset) return preset.focalMm;
  return settings.manual ? settings.scopeFocalMm : FOCAL_LENGTHS[settings.focalLength].mm;
}

/** Brightness an extended object loses once the exit pupil (aperture / magnification) is smaller than the eye's pupil, in magnitudes. */
function pupilDimming(exitPupilMm: number): number {
  return 5 * Math.log10(Math.max(1, 7 / exitPupilMm));
}

/** A 25 mm eyepiece is the reference: the preview looks the same as before at that size and dims or brightens from there. */
const REFERENCE_EYEPIECE_MM = 25;

/** What the hover preview shows through the chosen eyepiece: magnification, true field (arcminutes) and dimming (magnitudes). */
export function previewOptics(settings: Settings) {
  const focal = scopeFocalLength(settings);
  const { mm } = optics(settings);
  const magnification = focal / settings.eyepieceMm;
  const referenceDimming = pupilDimming(mm / (focal / REFERENCE_EYEPIECE_MM));
  return {
    magnification,
    fov: (settings.eyepieceAfov * 60) / magnification,
    dimming: pupilDimming(mm / magnification) - referenceDimming,
  };
}

export function scoreTargets(targets: Target[], settings: Settings): ScoredTarget[] {
  const seasonSamples = Object.fromEntries(
    (Object.keys(SEASONS) as Season[]).map((season) => [season, sampleWindow(settings, season)]),
  ) as Record<Season, Sample[]>;
  const { fov, mm } = optics(settings);

  const evaluate = (target: Target, samples: Sample[]) => {
    let skyTotal = 0;
    let lightTotal = 0;
    let coreTotal = 0;
    let peakAltitude = -90;
    let aboveHorizon = 0;
    let count = 0;
    for (const s of samples) {
      let positions = positionsAt(target, s).map((pos) => altitude(pos.ra, pos.dec, s.lst, settings.latitude));
      // A planet can be anywhere along the ecliptic, so use the spot where it is highest at this moment.
      if (target.planet) positions = [Math.max(...positions)];
      for (const alt of positions) {
        count++;
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
    }
    const sky = count ? skyTotal / count : 0;
    const fit = sizeFit(target, fov);
    const light = aboveHorizon > 0 ? lightTotal / aboveHorizon : 0;
    const core = aboveHorizon > 0 ? coreTotal / aboveHorizon : 0;
    const raw = 100 * Math.pow(sky, 0.2) * Math.pow(fit, 0.2) * Math.pow(light, 0.2) * Math.pow(core, 0.4);
    const score = clamp(raw - SCORE_OFFSET + ((target.simAdjust ?? 0) * settings.simWeight) / 100 + ((target.authorAdjust ?? 0) * settings.authorWeight) / 100, 0, 100);
    return { target, score, sky, fit, light, core, peakAltitude };
  };

  return targets
    .map((target) => {
      if (target.bestSeason !== "any") return evaluate(target, seasonSamples[target.bestSeason]);
      // Planets: score every season and keep the one where it is best placed.
      return (Object.keys(seasonSamples) as Season[])
        .map((season) => evaluate(target, seasonSamples[season]))
        .reduce((best, r) => (r.score > best.score ? r : best));
    })
    .sort((a, b) => b.score - a.score);
}

/** Share of the window (0-1) that is dark enough on every sampled date of a season. */
export function darkFraction(settings: Settings, season: Season): number {
  const samples = sampleWindow(settings, season);
  return samples.length ? samples.filter((s) => s.dark).length / samples.length : 0;
}

export interface Difficulty {
  label: string;
  /** 0 (hardest) to 1 (easiest), for colouring. */
  level: number;
}

/** Faintest star seen with the naked eye under each Bortle class (1-9), roughly. */
const NAKED_EYE_LIMIT = [7.6, 7.1, 6.6, 6.2, 5.6, 5.1, 4.6, 4.1, 4.0];

/** A star counts as "Naked Eye" when it is at least 1.5 magnitudes brighter than the faintest star you can see at this Bortle. */
export function isNakedEye(t: Target, bortle: number): boolean {
  const pos = clamp(bortle, 1, 9) - 1;
  const lo = Math.floor(pos);
  const limit = NAKED_EYE_LIMIT[lo] + (NAKED_EYE_LIMIT[Math.min(8, lo + 1)] - NAKED_EYE_LIMIT[lo]) * (pos - lo);
  return t.type === "Star" && t.magnitude <= limit - 1.5;
}

/** Plain-words difficulty to see a target, from its score. */
export function difficulty(score: number): Difficulty {
  if (score >= 75) return { label: "Very easy", level: 1 };
  if (score >= 50) return { label: "Easy", level: 0.85 };
  if (score >= 35) return { label: "Moderate", level: 0.65 };
  if (score >= 20) return { label: "Hard", level: 0.45 };
  if (score >= 10) return { label: "Very hard", level: 0.25 };
  if (score > 0) return { label: "Extreme", level: 0.1 };
  return { label: "Not visible", level: 0 };
}
