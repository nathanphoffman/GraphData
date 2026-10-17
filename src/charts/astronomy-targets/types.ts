export interface Target {
  /** Catalogue name, e.g. "M31". */
  id: string;
  nickname: string;
  type: string;
  constellation: string;
  /** Right ascension in hours (J2000, rounded). */
  ra: number;
  /** Declination in degrees. */
  dec: number;
  /** Total visual magnitude (smaller is brighter). */
  magnitude: number;
  /** Apparent size in arcminutes. */
  major: number;
  minor: number;
  /** Magnitudes per square arcminute that the bright core is brighter than the whole-object average (0 = even). */
  coreBoost?: number;
  /** Star clusters and double stars: magnitude of the brightest member stars. Used instead of coreBoost. */
  brightStar?: number;
  /** Season when it is highest around midnight. */
  bestSeason: Season;
}

export interface AstronomyTargetsData {
  title: string;
  source: string;
  targets: Target[];
}

export type Season = "spring" | "summer" | "autumn" | "winter";
export type FocalLength = "small" | "small-medium" | "medium" | "medium-long" | "long";
export type Aperture = "small" | "small-medium" | "medium" | "medium-large" | "large";

export interface Settings {
  /** Local solar time, "HH:MM". */
  from: string;
  to: string;
  latitude: number;
  focalLength: FocalLength;
  aperture: Aperture;
  /** Bortle scale: 1 = pristine dark sky, 9 = inner city. */
  bortle: number;
}

export interface ScoredTarget {
  target: Target;
  /** 0-100, higher is better. */
  score: number;
  /** 0-1 parts of the score. */
  sky: number;
  fit: number;
  light: number;
  core: number;
  /** Highest altitude (degrees) reached while it is dark inside the window. */
  peakAltitude: number;
}
