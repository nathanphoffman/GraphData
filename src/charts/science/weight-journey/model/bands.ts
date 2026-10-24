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

/** RGB of each band class, matching the colours in styles.css. */
const BAND_RGB: Record<string, [number, number, number]> = {
  "band-orange": [0xf4, 0xa2, 0x59],
  "band-yellow": [0xf2, 0xd9, 0x5c],
  "band-green": [0x7b, 0xc9, 0x7b],
  "band-violet": [0xb4, 0x8b, 0xe0],
  "band-blue": [0x7f, 0xb2, 0xf0],
  "band-red": [0xe5, 0x67, 0x5f],
};

/** Average colour of the given band classes (empty classes are ignored) at the given opacity, or undefined when there are none. */
export function averageTint(classes: string[], alpha = 0.25): string | undefined {
  const colors = classes.map((name) => BAND_RGB[name]).filter((rgb) => rgb !== undefined);

  if (!colors.length) return undefined;

  // Average each of red, green and blue across the colours.
  const [red, green, blue] = [0, 1, 2].map((channel) => Math.round(colors.reduce((total, rgb) => total + rgb[channel], 0) / colors.length));

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
