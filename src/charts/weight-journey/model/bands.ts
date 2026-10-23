import { KG_PER_LB } from "./units";

/** Colour band for a weight, using the kg targets. Muscle-adjusted values add back 5 kg (the targets sit 5 kg lower). */
export function band(lb: number | null, adjusted: boolean): string {
  if (lb === null) return "";
  const kg = lb * KG_PER_LB + (adjusted ? 5 : 0);

  if (kg < 85) return "band-violet";

  if (kg < 90) return "band-green";

  if (kg < 95) return "band-blue";

  if (kg < 100) return "band-green";

  if (kg < 110) return "band-yellow";

  return "band-red";
}

/** Colour for a monthly change (lb, negative = loss) using kg thresholds. */
export function deltaBand(lb: number | null): string {
  if (lb === null) return "";
  const kg = lb * KG_PER_LB;

  if (kg < -3) return "band-orange";

  if (kg >= -1.5 && kg <= -0.5) return "band-blue";

  if (kg < 0) return "band-green";

  if (kg < 1) return "band-yellow";

  return "band-red";
}
