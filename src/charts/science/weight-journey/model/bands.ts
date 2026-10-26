import { KG_PER_LB } from "./units";

const BAND_GREEN = "band-green";

/** Muscle-adjusted weights add this back, since the targets sit this much lower. */
const MUSCLE_ADJUSTMENT_KG = 5;

/** Each band ends below its limit, in kg. */
const VIOLET_BELOW_KG = 85;
const FIRST_GREEN_BELOW_KG = 90;
const BLUE_BELOW_KG = 95;
const SECOND_GREEN_BELOW_KG = 100;
const YELLOW_BELOW_KG = 110;

/** A monthly loss of more than this is orange, and one between these two is blue. */
const ORANGE_LOSS_KG = 3;
const BLUE_LOSS_MAX_KG = 1.5;
const BLUE_LOSS_MIN_KG = 0.5;

const DEFAULT_TINT_ALPHA = 0.25;

/** Colour band for a weight, using the kg targets. Muscle-adjusted values add back 5 kg (the targets sit 5 kg lower). */
export function band(pounds: number | null, adjusted: boolean): string {
  if (pounds === null) return "";
  const kilograms = pounds * KG_PER_LB + (adjusted ? MUSCLE_ADJUSTMENT_KG : 0);

  if (kilograms < VIOLET_BELOW_KG) return "band-violet";

  if (kilograms < FIRST_GREEN_BELOW_KG) return BAND_GREEN;

  if (kilograms < BLUE_BELOW_KG) return "band-blue";

  if (kilograms < SECOND_GREEN_BELOW_KG) return BAND_GREEN;

  if (kilograms < YELLOW_BELOW_KG) return "band-yellow";

  return "band-red";
}

/** Colour for a monthly change (lb, negative = loss) using kg thresholds. */
export function deltaBand(pounds: number | null): string {
  if (pounds === null) return "";
  const kilograms = pounds * KG_PER_LB;

  if (kilograms < -ORANGE_LOSS_KG) return "band-orange";

  if (kilograms >= -BLUE_LOSS_MAX_KG && kilograms <= -BLUE_LOSS_MIN_KG) return "band-blue";

  if (kilograms < 0) return BAND_GREEN;

  if (kilograms < 1) return "band-yellow";

  return "band-red";
}

/** RGB of each band class, matching the colours in styles.css. */
const BAND_RGB: Record<string, [number, number, number]> = {
  "band-orange": [0xf4, 0xa2, 0x59],
  "band-yellow": [0xf2, 0xd9, 0x5c],
  [BAND_GREEN]: [0x7b, 0xc9, 0x7b],
  "band-violet": [0xb4, 0x8b, 0xe0],
  "band-blue": [0x7f, 0xb2, 0xf0],
  "band-red": [0xe5, 0x67, 0x5f],
};

/** Average colour of the given band classes (empty classes are ignored) at the given opacity, or undefined when there are none. */
export function averageTint(classes: string[], alpha = DEFAULT_TINT_ALPHA): string | undefined {
  const colors = classes.map((name) => BAND_RGB[name]).filter((rgbColor) => rgbColor !== undefined);

  if (!colors.length) return undefined;

  // Average each of red, green and blue across the colours.
  const [red, green, blue] = [0, 1, 2].map((channel) => Math.round(colors.reduce((total, rgbColor) => total + rgbColor[channel], 0) / colors.length));

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
