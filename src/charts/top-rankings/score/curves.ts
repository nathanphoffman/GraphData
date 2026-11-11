import { type Curve, HIGHEST_RATING, LOWEST_RATING } from "./ranking_types";

/** Halving: every +1 closes this share of the distance to the other end. */
const HALVING_SHARE = 0.5;

const clamp = (rating: number) => Math.min(HIGHEST_RATING, Math.max(LOWEST_RATING, rating));

type CurveOf<Type extends Curve["type"]> = Extract<Curve, { type: Type }>;

/** The rating on a peak curve: rising to 5 at `at`, then falling gently to the knee (when there is one) and on to 1 at `to`. */
export function peakRating(curve: CurveOf<"peak">, value: number): number {
  if (value <= curve.at) {
    const distance = (value - curve.from) / (curve.at - curve.from);

    return clamp(curve.fromRating + (HIGHEST_RATING - curve.fromRating) * distance);
  }

  if (curve.kneeAt === undefined || curve.kneeRating === undefined) {
    return clamp(HIGHEST_RATING - ((HIGHEST_RATING - LOWEST_RATING) * (value - curve.at)) / (curve.to - curve.at));
  }

  if (value <= curve.kneeAt)
    return clamp(HIGHEST_RATING - ((HIGHEST_RATING - curve.kneeRating) * (value - curve.at)) / (curve.kneeAt - curve.at));

  return clamp(curve.kneeRating - ((curve.kneeRating - LOWEST_RATING) * (value - curve.kneeAt)) / (curve.to - curve.kneeAt));
}

export function logRating(curve: CurveOf<"log">, value: number): number {
  const share = (Math.log(value) - Math.log(curve.from)) / (Math.log(curve.to) - Math.log(curve.from));

  return clamp(HIGHEST_RATING - (HIGHEST_RATING - LOWEST_RATING) * share);
}

export function linearRating(curve: CurveOf<"linear">, value: number): number {
  return clamp(LOWEST_RATING + ((HIGHEST_RATING - LOWEST_RATING) * (value - curve.from)) / (curve.to - curve.from));
}

export function log1pRating(curve: CurveOf<"log1p">, value: number): number {
  return clamp(HIGHEST_RATING - ((HIGHEST_RATING - LOWEST_RATING) * Math.log1p(value)) / Math.log1p(curve.to));
}

export function halvingRating(curve: CurveOf<"halving">, value: number): number {
  const other = HIGHEST_RATING + LOWEST_RATING - curve.start;

  return other + (curve.start - other) * HALVING_SHARE ** value;
}

export function ageRating(curve: CurveOf<"age">, value: number): number {
  const falloff = (yearsOld: number) => (1 + yearsOld / curve.offset) ** -curve.steepness;
  const currentYear = new Date().getFullYear();
  const share = (1 - falloff(Math.max(0, currentYear - value))) / (1 - falloff(currentYear - curve.oldest));

  return clamp(LOWEST_RATING + (HIGHEST_RATING - LOWEST_RATING) * share);
}
