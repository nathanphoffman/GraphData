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
  /** The author's own field-experience adjustment, in score points. Missing = not rated yet (counts as 0). */
  authorAdjust?: number;
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
  latitude: number;
  focalLength: FocalLength;
  aperture: Aperture;
  /** When true, the four values below replace the focal length and aperture size classes. */
  manual: boolean;
  /** Id of a preset telescope (see PRESETS), or "" for none. A preset replaces the size classes, the manual entry and the optical quality slider. */
  preset: string;
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
  /** How much of each target's author adjustment is added to its score, 0-100 (percent). */
  authorWeight: number;
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
  /** Ideal hour to look (0-23, local solar time), the average over its best season of when it is highest in the dark. Null for planets, which have no fixed best hour. */
  bestHour: number | null;
  /** Highest altitude (degrees) reached while it is dark inside the window. */
  peakAltitude: number;
}

/** Extra facts about a target, shown in the hover tooltip. */
export interface TargetDetails {
  distance: string;
  facts: { label: string; value: string }[];
  about: string;
  /** Plain-language steps for finding it in the sky. */
  howToFind: string;
}
