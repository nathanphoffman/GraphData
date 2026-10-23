import type { Aperture, FocalLength, Season, Settings } from "../types";

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
  latitude: 40.2,
  focalLength: "medium",
  aperture: "medium",
  manual: false,
  preset: "ed80cf",
  scopeFocalMm: 900,
  apertureIn: 5,
  eyepieceMm: 32,
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

/** The preset picked in the settings, if any. */
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

/** Telescope focal length in mm: the preset's, the manual entry, or the typical value for the size class. */
export function scopeFocalLength(settings: Settings): number {
  const preset = activePreset(settings);

  if (preset) return preset.focalMm;

  return settings.manual ? settings.scopeFocalMm : FOCAL_LENGTHS[settings.focalLength].mm;
}
