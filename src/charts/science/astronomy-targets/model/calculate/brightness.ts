import type { Settings, Target } from "../types";
import { RAD, clamp } from "./sky";
import { optics, scopeFocalLength } from "./settings";

/** 0 at 10° or lower, 1 at 55° or higher: low objects fight haze and thick air. */
export function altitudeQuality(alt: number): number {
  return clamp((alt - 10) / 45, 0, 1);
}

/** Dimmest average surface brightness (mag per square arcminute) a telescope shows comfortably. */
export function limitingSurfaceBrightness(mm: number): number {
  return 12 + 5 * Math.log10(mm / 70);
}

/** Average brightness per square arcminute: total light spread over the target's area (higher number = dimmer). */
export function surfaceBrightness(t: Target): number {
  const area = Math.max(0.01, (Math.PI / 4) * t.major * t.minor);

  return t.magnitude + 2.5 * Math.log10(area);
}

/** Best when the target fills about a third of the field; too small is punished harder than too big. */
export function sizeFit(t: Target, fov: number): number {
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
export function skyGlowPenalty(bortle: number, alt: number): number {
  const airmass = Math.min(10, 1 / Math.sin(clamp(alt, 1, 90) * RAD));
  const base = (bortle - 3) * 0.5;
  const glow = base > 0 ? base * (1 + 2 * (airmass - 1)) : base;

  return glow + 0.25 * (airmass - 1);
}

/** Added to a bright star's magnitude to put it on the surface brightness scale (a magnitude 3 star lands at 4.5). */
export const STAR_CORE_OFFSET = 1.5;

/** Surface brightness of the bright centre, which is what you spot first at the eyepiece. */
export function coreSurfaceBrightness(t: Target): number {
  // A cluster's bright stars stand out as points, so rate the core by its brightest members instead of by area.
  if (t.brightStar !== undefined) return t.brightStar + STAR_CORE_OFFSET;

  return surfaceBrightness(t) - (t.coreBoost ?? 0);
}

/** How many magnitudes brighter than the scope's limit (after sky glow) a surface brightness is. */
export function margin(sb: number, mm: number, glow: number): number {
  return limitingSurfaceBrightness(mm) - glow - sb;
}

/**
 * Straight-line scale with no early cap: 1 at 10 magnitudes above the limit (a star-like point), falling to 0 at 4 below it.
 * Experienced observers see things somewhat past the nominal limit, so the limit itself is not a cliff.
 */
export function coreScore(sb: number, mm: number, glow: number): number {
  return clamp((margin(sb, mm, glow) + SEE_PAST_LIMIT) / (10 + SEE_PAST_LIMIT), 0, 1);
}

/** Magnitudes past the nominal limit that a patient observer can still pick something out. */
export const SEE_PAST_LIMIT = 4;

/** Faintest star (total magnitude) a telescope of this size shows, before sky costs. */
export function limitingMagnitude(mm: number): number {
  return 2.7 + 5 * Math.log10(mm);
}

/**
 * Light: the target's average surface brightness against the sky, so big spread-out targets wash out in bright skies (Core covers the bright centre).
 * Same straight-line scale as Core.
 */
export function lightScore(sb: number, mm: number, glow: number): number {
  return coreScore(sb, mm, glow);
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

/** Brightness an extended object loses once the exit pupil (aperture / magnification) is smaller than the eye's pupil, in magnitudes. */
export function pupilDimming(exitPupilMm: number): number {
  return 5 * Math.log10(Math.max(1, 7 / exitPupilMm));
}

/** A 25 mm eyepiece is the reference: the preview looks the same as before at that size and dims or brightens from there. */
export const REFERENCE_EYEPIECE_MM = 25;

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
