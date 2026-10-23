import { COLUMNS } from "../table/columns";
import { APERTURES, DEFAULT_SETTINGS, FOCAL_LENGTHS, PRESETS } from "./calculate";
import type { Season, Settings } from "./types";

export type SeasonFilter = Season | "any";
export const SEASON_FILTERS: SeasonFilter[] = ["spring", "summer", "autumn", "winter", "any"];

const pick = <K extends string>(v: unknown, options: Record<K, unknown>, fallback: K): K =>
  typeof v === "string" && v in options ? (v as K) : fallback;

const number = (v: unknown, lo: number, hi: number, fallback: number) =>
  typeof v === "number" && v >= lo && v <= hi ? v : fallback;

/** Older saved settings used "medium-long" and "long" for what are now Medium-Large and Large. */

// Old saved settings used longer names; map them to the current ones so saved choices still load.
const renamedFocal = (v: unknown) => (v === "medium-long" ? "medium-large" : v === "long" ? "large" : v);

/** Keeps only valid saved fields, so an old or edited save can never break the page. */
export function parseSettings(saved: unknown): Settings | null {
  if (typeof saved !== "object" || saved === null) return null;
  const s = saved as Record<string, unknown>;
  const d = DEFAULT_SETTINGS;

  return {
    latitude: number(s.latitude, 0, 80, d.latitude),
    focalLength: pick(renamedFocal(s.focalLength), FOCAL_LENGTHS, d.focalLength),
    aperture: pick(s.aperture, APERTURES, d.aperture),
    manual: s.manual === true,
    preset: typeof s.preset === "string" && s.preset in PRESETS ? s.preset : "",
    scopeFocalMm: number(s.scopeFocalMm, 50, 10000, d.scopeFocalMm),
    apertureIn: number(s.apertureIn, 1, 40, d.apertureIn),
    eyepieceMm: number(s.eyepieceMm, 2, 100, d.eyepieceMm),
    eyepieceAfov: number(s.eyepieceAfov, 20, 120, d.eyepieceAfov),
    bortle: Math.round(number(s.bortle, 1, 9, d.bortle) * 2) / 2,
    simWeight: Math.round(number(s.simWeight, 0, 100, d.simWeight)),
    authorWeight: Math.round(number(s.authorWeight, 0, 100, d.authorWeight)),
    opticalQuality: Math.round(number(s.opticalQuality, 0, 100, d.opticalQuality)),
  };
}

export function parseHidden(saved: unknown): string[] | null {
  if (!Array.isArray(saved)) return null;

  return saved.filter((id): id is string => COLUMNS.some((c) => c.id === id));
}

export function parseSeasonFilter(saved: unknown): SeasonFilter | null {
  return SEASON_FILTERS.find((season) => season === saved) ?? null;
}
