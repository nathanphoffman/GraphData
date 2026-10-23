import type { ScoredTarget, Season, Settings, Target } from "../types";
import { SEASONS, effectiveQuality, optics } from "./settings";
import { NIGHT_START, VIEW_HALF_WINDOW, altitude, bestHour, clamp, positionsAt, sampleWindow } from "./sky";
import { altitudeQuality, coreScore, coreSurfaceBrightness, lightScore, sizeFit, skyGlowPenalty, surfaceBrightness } from "./brightness";

/** Points taken off every score (it never goes below 0). */
export const SCORE_OFFSET = 9;

/** How much optical quality matters for each kind of target: sharp, contrasty optics help point-like and detailed things most, and barely matter for faint diffuse glows. */
export const QUALITY_SENSITIVITY: Record<string, number> = {
  Planet: 1,
  "Double star": 1,
  "Globular cluster": 0.8,
  Moon: 0.6,
  "Open cluster": 0.6,
  "Planetary nebula": 0.5,
  Star: 0.4,
  Galaxy: 0.15,
  Nebula: 0.15,
  "Supernova remnant": 0.15,
};

/** Score points for good or poor optics: up to +25 for the best, down to -25 for the worst, scaled by how much the target type cares. */
export function qualityAdjust(target: Target, settings: Settings): number {
  const q = (effectiveQuality(settings) - 50) / 50;

  return (QUALITY_SENSITIVITY[target.type] ?? 0.3) * 25 * q;
}

/**
 * The simulator and author adjustments are judged at Bortle 5, and grow or shrink with the sky.
 * Positive ones (looks better than the score says): 1.5x at Bortle 1, 1x at 5, fading to nothing at 9 where everything is washed out.
 * Negative ones (looks worse): the reverse of the dark side, 0.5x at Bortle 1, 1x at 5, 1.5x at 9. Straight lines between.
 */
export function bortleScale(adjust: number, bortle: number): number {
  const b = clamp(bortle, 1, 9);

  if (adjust >= 0) return b <= 5 ? 1 + (5 - b) * 0.125 : 1 - (b - 5) * 0.25;

  return 1 + (b - 5) * 0.125;
}

/** Score points from one adjustment: its value, times the slider share, times the Bortle scaling. */
export function adjustPoints(value: number, weight: number, bortle: number): number {
  return ((value * weight) / 100) * bortleScale(value, bortle);
}

/** Score every target for the chosen settings and sort best first. */
export function scoreTargets(targets: Target[], settings: Settings): ScoredTarget[] {
  const { fov, mm } = optics(settings);

  // Score one target in one season by averaging conditions across the hours around its best time.
  const evaluate = (target: Target, season: Season) => {
    const hour = bestHour(target, season, settings.latitude);

    // Score the few hours around the ideal one (around midnight for planets, and for anything that is never up in the dark).
    // Hours before the night window start belong to after-midnight, so push them past 24 to keep the night continuous.
    const centre = hour === null ? 24 : hour < NIGHT_START - 12 ? hour + 24 : hour;
    const samples = sampleWindow(settings.latitude, season, centre - VIEW_HALF_WINDOW, centre + VIEW_HALF_WINDOW);
    let skyTotal = 0;
    let lightTotal = 0;
    let coreTotal = 0;
    let peakAltitude = -90;
    let aboveHorizon = 0;
    let count = 0;

    for (const sample of samples) {
      let positions = positionsAt(target, sample).map((position) => altitude(position.ra, position.dec, sample.lst, settings.latitude));

      // A planet can be anywhere along the ecliptic, so use the spot where it is highest at this moment.
      if (target.planet) positions = [Math.max(...positions)];

      for (const altitude of positions) {
        count++;

        if (!sample.dark) continue;
        skyTotal += altitudeQuality(altitude);
        peakAltitude = Math.max(peakAltitude, altitude);

        if (altitude <= 0) continue;

        // Every moment it is up counts equally here, so time spent low in the glow drags Light and Core down.
        aboveHorizon++;
        const glow = skyGlowPenalty(settings.bortle, altitude);
        lightTotal += lightScore(surfaceBrightness(target), mm, glow);
        coreTotal += coreScore(coreSurfaceBrightness(target), mm, glow);
      }
    }

    const sky = count ? skyTotal / count : 0;
    const fit = sizeFit(target, fov);
    const light = aboveHorizon > 0 ? lightTotal / aboveHorizon : 0;
    const core = aboveHorizon > 0 ? coreTotal / aboveHorizon : 0;
    const rawValue = 100 * sky ** 0.1 * fit ** 0.4 * light ** 0.2 * core ** 0.3;
    const score = Math.min(100, rawValue - SCORE_OFFSET + adjustPoints(target.simAdjust ?? 0, settings.simWeight, settings.bortle) + adjustPoints(target.authorAdjust ?? 0, settings.authorWeight, settings.bortle) + qualityAdjust(target, settings));

    return { target, score, sky, fit, light, core, peakAltitude, bestHour: hour };
  };

  return targets

    // Planets have no fixed best season, so they are scored in every season and the best one is kept.
    .map((target) => {
      if (target.bestSeason !== "any") return evaluate(target, target.bestSeason);

      // Planets: score every season and keep the one where it is best placed.
      return (Object.keys(SEASONS) as Season[])
        .map((season) => evaluate(target, season))

        // Keep the highest scoring row.
        .reduce((best, r) => (r.score > best.score ? r : best));
    })
    .sort((target, second) => second.score - target.score);
}
