/** One colour stop on the heat ramp: the deci-n value it sits at, and its hue, saturation, lightness and opacity. */
type Heat_Stop = { dn: number; hue: number; saturation: number; lightness: number; alpha: number };

/**
 * The heat ramp by deci-n value (the target is 65, the middle of the blue). Blue is best (62.5 to 67.5), green sits either
 * side of it (60 to 62.5 and 67.5 to 70), fading to green-yellow at 70, yellow, orange at 75 and deep red at 80.
 * Below 60 it goes blue-purple, and solid purple from 57.5 down. Stops must stay sorted by dn.
 */
const HEAT_STOPS: Heat_Stop[] = [
  { dn: 57.5, hue: 280, saturation: 70, lightness: 38, alpha: 0.75 },
  { dn: 60, hue: 250, saturation: 70, lightness: 45, alpha: 0.65 },
  { dn: 61, hue: 135, saturation: 65, lightness: 42, alpha: 0.55 },
  { dn: 62, hue: 135, saturation: 65, lightness: 42, alpha: 0.55 },
  { dn: 62.5, hue: 215, saturation: 80, lightness: 45, alpha: 0.65 },
  { dn: 67.5, hue: 215, saturation: 80, lightness: 45, alpha: 0.65 },
  { dn: 68, hue: 135, saturation: 65, lightness: 42, alpha: 0.55 },
  { dn: 69, hue: 135, saturation: 65, lightness: 42, alpha: 0.55 },
  { dn: 70, hue: 85, saturation: 80, lightness: 48, alpha: 0.5 },
  { dn: 72.5, hue: 55, saturation: 85, lightness: 50, alpha: 0.5 },
  { dn: 75, hue: 30, saturation: 90, lightness: 48, alpha: 0.55 },
  { dn: 80, hue: 0, saturation: 90, lightness: 28, alpha: 0.85 },
];

/** The ends of the ramp, beyond which the colour no longer changes. */
const FURTHEST_BELOW = HEAT_STOPS[0].dn;
const FURTHEST_ABOVE = HEAT_STOPS[HEAT_STOPS.length - 1].dn;

/** A straight-line blend of one channel between two stops, with fraction 0 at the first and 1 at the second. */
const blend = (from: number, to: number, fraction: number) => from + (to - from) * fraction;

/** The stop a deci-n value lies between: the first stop at or past it, and the one before it. */
function stopsAround(dn: number): [Heat_Stop, Heat_Stop] {
  const nextIndex = Math.max(1, HEAT_STOPS.findIndex((stop) => stop.dn >= dn));

  return [HEAT_STOPS[nextIndex - 1], HEAT_STOPS[nextIndex]];
}

/** The heat colour of a deci-n value blended between the two ramp stops it falls between. */
export function deciNHeat(dn: number): { backgroundColor: string } {
  const clamped = Math.min(Math.max(dn, FURTHEST_BELOW), FURTHEST_ABOVE);
  const [from, to] = stopsAround(clamped);
  const fraction = (clamped - from.dn) / (to.dn - from.dn);

  const hue = blend(from.hue, to.hue, fraction);
  const saturation = blend(from.saturation, to.saturation, fraction);
  const lightness = blend(from.lightness, to.lightness, fraction);
  const alpha = blend(from.alpha, to.alpha, fraction);

  return { backgroundColor: `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}% / ${alpha.toFixed(2)})` };
}
