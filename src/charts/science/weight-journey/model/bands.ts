import { KG_PER_LB } from "./units";

/** Colour band for a weight, using the kg targets. Muscle-adjusted values add back 5 kg (the targets sit 5 kg lower). */
export function band(pounds: number | null, adjusted: boolean): string {
  if (pounds === null) return "";
  const kilograms = pounds * KG_PER_LB + (adjusted ? 5 : 0);

  if (kilograms < 85) return "band-violet";

  if (kilograms < 90) return "band-green";

  if (kilograms < 95) return "band-blue";

  if (kilograms < 100) return "band-green";

  if (kilograms < 110) return "band-yellow";

  return "band-red";
}

/** Colour for a monthly change (lb, negative = loss) using kg thresholds. */
export function deltaBand(pounds: number | null): string {
  if (pounds === null) return "";
  const kilograms = pounds * KG_PER_LB;

  if (kilograms < -3) return "band-orange";

  if (kilograms >= -1.5 && kilograms <= -0.5) return "band-blue";

  if (kilograms < 0) return "band-green";

  if (kilograms < 1) return "band-yellow";

  return "band-red";
}
