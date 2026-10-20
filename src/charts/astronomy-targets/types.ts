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
  /** My judgment, in percentage points, of how much better (+) or worse (-) the target looks in the eyepiece preview than its score suggests. */
  simAdjust?: number;
  /** Season when it is highest around midnight. "any" for planets, which are scored over the whole year. */
  bestSeason: Season | "any";
  /** Planets only: ra and dec are ignored, and its position is averaged over where it can be in the sky. */
  planet?: {
    /** Furthest it ever gets from the sun in the sky, in degrees. 180 = anywhere (outer planets). */
    maxElongation: number;
  };
}

export interface AstronomyTargetsData {
  title: string;
  source: string;
  targets: Target[];
}

export type Season = "spring" | "summer" | "autumn" | "winter";
export type FocalLength = "tiny" | "tiny-small" | "small" | "small-medium" | "medium" | "medium-large" | "large" | "large-huge" | "huge";
export type Aperture = "tiny" | "tiny-small" | "small" | "small-medium" | "medium" | "medium-large" | "large" | "large-huge" | "huge";

export interface Settings {
  /** Local solar time, "HH:MM". */
  from: string;
  to: string;
  latitude: number;
  focalLength: FocalLength;
  aperture: Aperture;
  /** When true, the four values below replace the focal length and aperture size classes. */
  manual: boolean;
  /** Telescope focal length in mm. */
  scopeFocalMm: number;
  /** Mirror or lens diameter in inches. */
  apertureIn: number;
  /** Eyepiece focal length in mm. */
  eyepieceMm: number;
  /** Eyepiece apparent field of view in degrees. */
  eyepieceAfov: number;
  /** Bortle scale: 1 = pristine dark sky, 9 = inner city. */
  bortle: number;
  /** How much of each target's simulator adjustment is added to its score, 0-100 (percent). */
  simWeight: number;
  /** Preview only: optical quality, 0 (poor) to 100 (excellent). 50 is an average telescope. */
  opticalQuality: number;
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
