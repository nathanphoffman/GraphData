/** One colour stop on the heat ramp: how far (in dn) from the target it sits, and its hue, saturation, lightness and opacity. */
type Heat_Stop = { away: number; hue: number; saturation: number; lightness: number; alpha: number };

/**
 * The heat ramp either side of the target, from the richest green at the target out to the deepest red.
 * Rich green to 1dn, a quick fade through lime to yellow by 1.5dn, orange by 2.5dn, red soon after and
 * deepening to 5dn, where it stops changing. Stops must stay sorted by distance.
 */
const HEAT_STOPS: Heat_Stop[] = [
  { away: 0, hue: 135, saturation: 75, lightness: 38, alpha: 0.65 },
  { away: 1, hue: 125, saturation: 65, lightness: 42, alpha: 0.55 },
  { away: 1.25, hue: 80, saturation: 80, lightness: 50, alpha: 0.5 },
  { away: 1.5, hue: 55, saturation: 85, lightness: 50, alpha: 0.5 },
  { away: 2.5, hue: 30, saturation: 90, lightness: 48, alpha: 0.55 },
  { away: 3, hue: 5, saturation: 85, lightness: 45, alpha: 0.6 },
  { away: 5, hue: 0, saturation: 90, lightness: 28, alpha: 0.85 },
];

/** The distance beyond which the colour no longer deepens. */
const FURTHEST_STOP = HEAT_STOPS[HEAT_STOPS.length - 1].away;

/** A straight-line blend of one channel between two stops, with fraction 0 at the first and 1 at the second. */
const blend = (from: number, to: number, fraction: number) => from + (to - from) * fraction;

/** The stop a distance lies between: the first stop at or past it, and the one before it. */
function stopsAround(away: number): [Heat_Stop, Heat_Stop] {
  const nextIndex = Math.max(1, HEAT_STOPS.findIndex((stop) => stop.away >= away));

  return [HEAT_STOPS[nextIndex - 1], HEAT_STOPS[nextIndex]];
}

/** The heat colour of a deci-n value around the target, blended between the two ramp stops its distance falls between. */
export function deciNHeat(dn: number, target: number): { backgroundColor: string } {
  const away = Math.min(Math.abs(dn - target), FURTHEST_STOP);
  const [from, to] = stopsAround(away);
  const fraction = to.away === from.away ? 0 : (away - from.away) / (to.away - from.away);

  const hue = blend(from.hue, to.hue, fraction);
  const saturation = blend(from.saturation, to.saturation, fraction);
  const lightness = blend(from.lightness, to.lightness, fraction);
  const alpha = blend(from.alpha, to.alpha, fraction);

  return { backgroundColor: `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}% / ${alpha.toFixed(2)})` };
}
