import data from "../../../../data/astronomy-targets/constellations.json";

export interface ConstellationFigure {
  name: string;
  lines: { ra: number; dec: number }[][];
}

/** Stars used only to draw constellation outlines: right ascension in hours, declination in degrees (J2000). */
const STARS: Record<string, number[]> = data.stars;

/** Each constellation is a set of stick-figure lines, each a chain of star names from STARS. */
const FIGURES: { name: string; lines: string[][] }[] = data.figures;

export const CONSTELLATIONS: ConstellationFigure[] = FIGURES.map((figure) => ({
  name: figure.name,
  lines: figure.lines.map((chain) => chain.map((key) => ({ ra: STARS[key][0], dec: STARS[key][1] }))),
}));
