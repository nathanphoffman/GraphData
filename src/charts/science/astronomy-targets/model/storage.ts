import { COLUMNS } from "../table/columns";
import { APERTURES, DEFAULT_SETTINGS, FOCAL_LENGTHS, PRESETS } from "./calculate";
import type { Season, Settings } from "./types";

export type SeasonFilter = Season | "any";
export const SEASON_FILTERS: SeasonFilter[] = ["spring", "summer", "autumn", "winter", "any"];

/** A saved choice if it is one of the known options, otherwise the fallback. */
const pick = <K extends string>(value: unknown, options: Record<K, unknown>, fallback: K): K =>
  typeof value === "string" && value in options ? (value as K) : fallback;

/** A saved number if it is a number inside the allowed range, otherwise the fallback. */
const number = (value: unknown, lowest: number, highest: number, fallback: number) =>
  typeof value === "number" && value >= lowest && value <= highest ? value : fallback;

/** Older saved settings used "medium-long" and "long" for what are now Medium-Large and Large. */
const renamedFocal = (value: unknown) => (value === "medium-long" ? "medium-large" : value === "long" ? "large" : value);

/** Keeps only valid saved fields, so an old or edited save can never break the page. */
export function parseSettings(saved: unknown): Settings | null {
  if (typeof saved !== "object" || saved === null) return null;
  const s = saved as Record<string, unknown>;
  const settings = DEFAULT_SETTINGS;

  return {
    latitude: number(s.latitude, 0, 80, settings.latitude),
    focalLength: pick(renamedFocal(s.focalLength), FOCAL_LENGTHS, settings.focalLength),
    aperture: pick(s.aperture, APERTURES, settings.aperture),
    manual: s.manual === true,
    preset: typeof s.preset === "string" && s.preset in PRESETS ? s.preset : "",
    scopeFocalMm: number(s.scopeFocalMm, 50, 10000, settings.scopeFocalMm),
    apertureIn: number(s.apertureIn, 1, 40, settings.apertureIn),
    eyepieceMm: number(s.eyepieceMm, 2, 100, settings.eyepieceMm),
    eyepieceAfov: number(s.eyepieceAfov, 20, 120, settings.eyepieceAfov),
    bortle: Math.round(number(s.bortle, 1, 9, settings.bortle) * 2) / 2,
    simWeight: Math.round(number(s.simWeight, 0, 100, settings.simWeight)),
    authorWeight: Math.round(number(s.authorWeight, 0, 100, settings.authorWeight)),
    opticalQuality: Math.round(number(s.opticalQuality, 0, 100, settings.opticalQuality)),
  };
}

/** Keep only column ids that still exist, so old saved choices cannot hide a removed column. */
export function parseHidden(saved: unknown): string[] | null {
  if (!Array.isArray(saved)) return null;

  return saved.filter((identifier): identifier is string => COLUMNS.some((column) => column.id === identifier));
}

/** A saved season filter if it is valid, otherwise none. */
export function parseSeasonFilter(saved: unknown): SeasonFilter | null {
  return SEASON_FILTERS.find((season) => season === saved) ?? null;
}
