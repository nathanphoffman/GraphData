import type { Target } from "./types";

const RAD = Math.PI / 180;

/** Bright stars (magnitude 3 or brighter) that show up even from a suburban sky. Right ascension in hours, declination in degrees (J2000). */
const GUIDE_STARS: { name: string; ra: number; dec: number; mag: number }[] = [
  { name: "Sirius", ra: 6.752, dec: -16.716, mag: -1.46 },
  { name: "Arcturus", ra: 14.261, dec: 19.182, mag: -0.05 },
  { name: "Vega", ra: 18.616, dec: 38.784, mag: 0.03 },
  { name: "Capella", ra: 5.278, dec: 45.998, mag: 0.08 },
  { name: "Rigel", ra: 5.242, dec: -8.202, mag: 0.13 },
  { name: "Procyon", ra: 7.655, dec: 5.225, mag: 0.34 },
  { name: "Betelgeuse", ra: 5.919, dec: 7.407, mag: 0.5 },
  { name: "Altair", ra: 19.846, dec: 8.868, mag: 0.76 },
  { name: "Aldebaran", ra: 4.599, dec: 16.509, mag: 0.85 },
  { name: "Antares", ra: 16.49, dec: -26.432, mag: 1.06 },
  { name: "Spica", ra: 13.42, dec: -11.161, mag: 1.04 },
  { name: "Pollux", ra: 7.755, dec: 28.026, mag: 1.14 },
  { name: "Fomalhaut", ra: 22.961, dec: -29.622, mag: 1.16 },
  { name: "Deneb", ra: 20.69, dec: 45.28, mag: 1.25 },
  { name: "Regulus", ra: 10.14, dec: 11.967, mag: 1.35 },
  { name: "Adhara", ra: 6.977, dec: -28.972, mag: 1.5 },
  { name: "Castor", ra: 7.577, dec: 31.888, mag: 1.58 },
  { name: "Shaula", ra: 17.56, dec: -37.104, mag: 1.62 },
  { name: "Bellatrix", ra: 5.419, dec: 6.35, mag: 1.64 },
  { name: "Elnath", ra: 5.438, dec: 28.608, mag: 1.65 },
  { name: "Alnilam", ra: 5.604, dec: -1.202, mag: 1.69 },
  { name: "Alnitak", ra: 5.679, dec: -1.943, mag: 1.77 },
  { name: "Alioth", ra: 12.9, dec: 55.96, mag: 1.77 },
  { name: "Dubhe", ra: 11.062, dec: 61.751, mag: 1.79 },
  { name: "Mirfak", ra: 3.405, dec: 49.861, mag: 1.79 },
  { name: "Wezen", ra: 7.14, dec: -26.393, mag: 1.83 },
  { name: "Kaus Australis", ra: 18.403, dec: -34.385, mag: 1.85 },
  { name: "Alkaid", ra: 13.792, dec: 49.313, mag: 1.86 },
  { name: "Menkalinan", ra: 5.992, dec: 44.947, mag: 1.9 },
  { name: "Alhena", ra: 6.629, dec: 16.399, mag: 1.93 },
  { name: "Polaris", ra: 2.53, dec: 89.264, mag: 1.98 },
  { name: "Mirzam", ra: 6.378, dec: -17.956, mag: 1.98 },
  { name: "Alphard", ra: 9.46, dec: -8.659, mag: 2.0 },
  { name: "Hamal", ra: 2.119, dec: 23.462, mag: 2.0 },
  { name: "Diphda", ra: 0.726, dec: -17.987, mag: 2.04 },
  { name: "Mizar", ra: 13.399, dec: 54.925, mag: 2.04 },
  { name: "Nunki", ra: 18.921, dec: -26.297, mag: 2.05 },
  { name: "Mirach", ra: 1.163, dec: 35.621, mag: 2.05 },
  { name: "Alpheratz", ra: 0.139, dec: 29.091, mag: 2.06 },
  { name: "Saiph", ra: 5.796, dec: -9.67, mag: 2.06 },
  { name: "Kochab", ra: 14.845, dec: 74.156, mag: 2.08 },
  { name: "Rasalhague", ra: 17.582, dec: 12.56, mag: 2.08 },
  { name: "Algol", ra: 3.136, dec: 40.956, mag: 2.1 },
  { name: "Almach", ra: 2.065, dec: 42.33, mag: 2.1 },
  { name: "Denebola", ra: 11.818, dec: 14.572, mag: 2.14 },
  { name: "Schedar", ra: 0.675, dec: 56.537, mag: 2.23 },
  { name: "Eltanin", ra: 17.943, dec: 51.489, mag: 2.23 },
  { name: "Sadr", ra: 20.37, dec: 40.257, mag: 2.23 },
  { name: "Alphecca", ra: 15.578, dec: 26.715, mag: 2.23 },
  { name: "Mintaka", ra: 5.533, dec: -0.299, mag: 2.23 },
  { name: "Caph", ra: 0.153, dec: 59.15, mag: 2.27 },
  { name: "Algieba", ra: 10.333, dec: 19.842, mag: 2.28 },
  { name: "Dschubba", ra: 16.005, dec: -22.622, mag: 2.3 },
  { name: "Epsilon Scorpii", ra: 16.836, dec: -34.293, mag: 2.29 },
  { name: "Merak", ra: 11.031, dec: 56.382, mag: 2.37 },
  { name: "Izar", ra: 14.75, dec: 27.074, mag: 2.37 },
  { name: "Enif", ra: 21.736, dec: 9.875, mag: 2.39 },
  { name: "Scheat", ra: 23.063, dec: 28.083, mag: 2.42 },
  { name: "Sabik", ra: 17.173, dec: -15.725, mag: 2.43 },
  { name: "Phecda", ra: 11.897, dec: 53.695, mag: 2.44 },
  { name: "Gamma Cassiopeiae", ra: 0.945, dec: 60.717, mag: 2.47 },
  { name: "Epsilon Cygni", ra: 20.77, dec: 33.97, mag: 2.48 },
  { name: "Markab", ra: 23.079, dec: 15.205, mag: 2.49 },
  { name: "Alderamin", ra: 21.31, dec: 62.586, mag: 2.51 },
  { name: "Menkar", ra: 3.038, dec: 4.09, mag: 2.53 },
  { name: "Zosma", ra: 11.235, dec: 20.524, mag: 2.56 },
  { name: "Arneb", ra: 5.545, dec: -17.822, mag: 2.58 },
  { name: "Gienah Corvi", ra: 12.263, dec: -17.542, mag: 2.59 },
  { name: "Ascella", ra: 19.043, dec: -29.88, mag: 2.6 },
  { name: "Zubeneschamali", ra: 15.283, dec: -9.383, mag: 2.61 },
  { name: "Sheratan", ra: 1.911, dec: 20.808, mag: 2.64 },
  { name: "Ruchbah", ra: 1.43, dec: 60.235, mag: 2.68 },
  { name: "Iota Aurigae", ra: 4.95, dec: 33.166, mag: 2.69 },
  { name: "Kaus Media", ra: 18.35, dec: -29.828, mag: 2.7 },
  { name: "Tarazed", ra: 19.771, dec: 10.613, mag: 2.72 },
  { name: "Porrima", ra: 12.694, dec: -1.449, mag: 2.74 },
  { name: "Zubenelgenubi", ra: 14.848, dec: -16.042, mag: 2.75 },
  { name: "Kornephoros", ra: 16.503, dec: 21.49, mag: 2.77 },
  { name: "Rastaban", ra: 17.507, dec: 52.301, mag: 2.79 },
  { name: "Kaus Borealis", ra: 18.466, dec: -25.422, mag: 2.82 },
  { name: "Algenib", ra: 0.22, dec: 15.184, mag: 2.83 },
  { name: "Vindemiatrix", ra: 13.036, dec: 10.959, mag: 2.83 },
  { name: "Alcyone", ra: 3.79, dec: 24.105, mag: 2.87 },
  { name: "Delta Cygni", ra: 19.75, dec: 45.131, mag: 2.87 },
  { name: "Deneb Algedi", ra: 21.784, dec: -16.127, mag: 2.87 },
  { name: "Cor Caroli", ra: 12.934, dec: 38.318, mag: 2.9 },
  { name: "Gomeisa", ra: 7.452, dec: 8.289, mag: 2.89 },
  { name: "Sadalsuud", ra: 21.526, dec: -5.571, mag: 2.91 },
  { name: "Sadalmelik", ra: 22.096, dec: -0.32, mag: 2.96 },
  { name: "Zeta Tauri", ra: 5.627, dec: 21.143, mag: 3.0 },
  { name: "Pherkad", ra: 15.345, dec: 71.834, mag: 3.0 },
];

/** Closest approach, in degrees, at which a star counts as the target itself and is left out. */
const SAME_OBJECT = 0.5;
/** Two guide stars in nearly the same direction from the target add little, so they are skipped while others remain. */
const MIN_BEARING_GAP = 35;

export interface GuideStar {
  name: string;
  mag: number;
  /** Degrees from the target. */
  separation: number;
  /** Degrees east of north, as seen from the target, 0-360. */
  bearing: number;
}

/** Angular distance and compass direction (east of north) from a to b. */
export function measure(a: { ra: number; dec: number }, b: { ra: number; dec: number }): { separation: number; bearing: number } {
  const d1 = a.dec * RAD;
  const d2 = b.dec * RAD;
  const dRa = (b.ra - a.ra) * 15 * RAD;
  const cosSep = Math.sin(d1) * Math.sin(d2) + Math.cos(d1) * Math.cos(d2) * Math.cos(dRa);
  const separation = Math.acos(Math.min(1, Math.max(-1, cosSep))) / RAD;
  const bearing = Math.atan2(Math.sin(dRa) * Math.cos(d2), Math.cos(d1) * Math.sin(d2) - Math.sin(d1) * Math.cos(d2) * Math.cos(dRa)) / RAD;

  return { separation, bearing: (bearing + 360) % 360 };
}

function bearingGap(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;

  return d > 180 ? 360 - d : d;
}

/** Three bright stars close to the target and spread around it in different directions. Empty for planets and the Moon, which move. */
export function guideStarsFor(target: Target): GuideStar[] {
  if (target.planet || target.type === "Moon") return [];
  const candidates = GUIDE_STARS.map((s) => ({ name: s.name, mag: s.mag, ...measure(target, s) }))
    .filter((s) => s.separation > SAME_OBJECT)
    .sort((a, b) => a.separation - b.separation);
  const picked: GuideStar[] = [];

  for (const c of candidates) {
    if (picked.every((p) => bearingGap(p.bearing, c.bearing) >= MIN_BEARING_GAP)) picked.push(c);

    if (picked.length === 3) break;
  }

  for (const c of candidates) {
    if (picked.length === 3) break;

    if (!picked.includes(c)) picked.push(c);
  }

  return picked;
}

const POINTS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];

/** Compass direction in words for a bearing east of north. */
export function compassWord(bearing: number): string {
  return POINTS[Math.round(bearing / 45) % 8];
}
