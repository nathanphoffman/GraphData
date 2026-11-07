import { KG_PER_LB } from "./units";

/** A colour as red, green and blue, each 0 to 255. */
export type Rgb = [number, number, number];

/** The colours the bands blend between, matching the chart's palette. */
export const PALETTE = {
  deepViolet: [0x5a, 0x2d, 0x8f] as Rgb,
  violet: [0xb4, 0x8b, 0xe0] as Rgb,
  blue: [0x7f, 0xb2, 0xf0] as Rgb,
  green: [0x7b, 0xc9, 0x7b] as Rgb,
  yellow: [0xf2, 0xd9, 0x5c] as Rgb,
  orange: [0xf4, 0xa2, 0x59] as Rgb,
  red: [0xe5, 0x67, 0x5f] as Rgb,
  deepRed: [0x8b, 0x1a, 0x14] as Rgb,
};

/** One colour on a gradient and the value it sits at; a value between two stops blends them. */
type Stop = { at: number; color: Rgb };

/** Muscle-adjusted weights add this back, since the targets sit this much lower. */
const MUSCLE_ADJUSTMENT_KG = 5;

/** Weight in kg: blue at the 92.5 goal, green either side, then yellow, orange and red going up, violet going down. Stops stay sorted. */
const WEIGHT_STOPS_KG: Stop[] = [
  { at: 75, color: PALETTE.deepViolet },
  { at: 84, color: PALETTE.violet },
  { at: 87.5, color: PALETTE.green },
  { at: 92.5, color: PALETTE.blue },
  { at: 97.5, color: PALETTE.green },
  { at: 105, color: PALETTE.yellow },
  { at: 110, color: PALETTE.orange },
  { at: 120, color: PALETTE.red },
  { at: 135, color: PALETTE.deepRed },
];

/** Monthly change in kg (negative is loss): blue at the ideal 1 kg loss, red for a fast loss or any gain. */
const DELTA_STOPS_KG: Stop[] = [
  { at: -6, color: PALETTE.red },
  { at: -3.5, color: PALETTE.orange },
  { at: -2.25, color: PALETTE.green },
  { at: -1, color: PALETTE.blue },
  { at: -0.25, color: PALETTE.green },
  { at: 0.5, color: PALETTE.yellow },
  { at: 1, color: PALETTE.orange },
  { at: 2, color: PALETTE.red },
  { at: 4, color: PALETTE.deepRed },
];

/** Health score: blue under 200, green around 210, yellow around 230, orange at 240, red beyond; violet when very low. */
const HEALTH_STOPS: Stop[] = [
  { at: 160, color: PALETTE.deepViolet },
  { at: 180, color: PALETTE.violet },
  { at: 195, color: PALETTE.blue },
  { at: 210, color: PALETTE.green },
  { at: 230, color: PALETTE.yellow },
  { at: 240, color: PALETTE.orange },
  { at: 250, color: PALETTE.red },
  { at: 275, color: PALETTE.deepRed },
];

const DEFAULT_TINT_ALPHA = 0.25;

/** The two stops a value falls between (the first or last pair when it is past the ends). */
function stopsAround(stops: Stop[], value: number): [Stop, Stop] {
  const nextIndex = Math.max(1, stops.findIndex((stop) => stop.at >= value));
  const index = nextIndex === 0 ? 1 : Math.min(nextIndex, stops.length - 1);

  return [stops[index - 1], stops[index]];
}

/** The colour on a gradient at a value: blended between the two stops around it, and the end colour past either end. */
function colorAt(stops: Stop[], value: number): Rgb {
  const clamped = Math.min(Math.max(value, stops[0].at), stops[stops.length - 1].at);
  const [from, to] = stopsAround(stops, clamped);
  const fraction = (clamped - from.at) / (to.at - from.at);

  return from.color.map((channel, index) => Math.round(channel + (to.color[index] - channel) * fraction)) as Rgb;
}

/** Colour for a weight, using the kg targets. Muscle-adjusted values add back 5 kg (the targets sit 5 kg lower). */
export function band(pounds: number | null, adjusted: boolean): Rgb | null {
  if (pounds === null) return null;

  return colorAt(WEIGHT_STOPS_KG, pounds * KG_PER_LB + (adjusted ? MUSCLE_ADJUSTMENT_KG : 0));
}

/** Colour for a monthly change (lb, negative = loss) using kg thresholds. */
export function deltaBand(pounds: number | null): Rgb | null {
  return pounds === null ? null : colorAt(DELTA_STOPS_KG, pounds * KG_PER_LB);
}

/** Colour for a Health score. */
export function healthBand(health: number | null): Rgb | null {
  return health === null ? null : colorAt(HEALTH_STOPS, health);
}

/** A colour as CSS. */
export const rgbCss = ([red, green, blue]: Rgb) => `rgb(${red}, ${green}, ${blue})`;

/** Average of the given colours (missing ones are ignored) at the given opacity, or undefined when there are none. */
export function averageTint(colors: (Rgb | null)[], alpha = DEFAULT_TINT_ALPHA): string | undefined {
  const present = colors.filter((color): color is Rgb => color !== null);

  if (!present.length) return undefined;

  // Average each of red, green and blue across the colours.
  const [red, green, blue] = [0, 1, 2].map((channel) =>
    Math.round(present.reduce((total, color) => total + color[channel], 0) / present.length),
  );

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
