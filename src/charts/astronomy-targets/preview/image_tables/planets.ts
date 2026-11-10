import { photo, type TargetImage } from "./target_image";

const VOYAGER_2_CREDIT = "NASA/JPL, Voyager 2 (public domain)";

export const PLANETS_IMAGES: Record<string, TargetImage> = {
  // Moon: the disc is about 1580 px across at 1920 px wide, and the Moon averages 31 arcminutes.
  Moon: {
    src: photo("planets", "moon"),
    widthArcmin: 37.7,
    credit: "Gregory H. Revera, CC BY-SA 3.0 (Wikimedia Commons)",
    footprint: { cx: 0.5, cy: 0.5, angleDeg: 0 },
  },
  // Planets: widthArcmin is set so the planet's disc matches its size in the data (Saturn includes the rings).
  Mars: {
    src: photo("planets", "mars"),
    widthArcmin: 0.19,
    credit: "NASA, ESA, STScI / Hubble (public domain)",
    footprint: { cx: 0.5, cy: 0.5, angleDeg: 0 },
  },
  Jupiter: {
    src: photo("planets", "jupiter"),
    widthArcmin: 0.716,
    credit: "NASA/JPL/University of Arizona, Cassini (public domain)",
    footprint: { cx: 0.515, cy: 0.5, angleDeg: 0 },
  },
  Saturn: {
    src: photo("planets", "saturn"),
    widthArcmin: 0.737,
    credit: "NASA, ESA, A. Simon (GSFC), M. H. Wong (UC Berkeley), OPAL team (public domain)",
    footprint: { cx: 0.5, cy: 0.495, angleDeg: 0 },
  },
  Uranus: {
    src: photo("planets", "uranus"),
    widthArcmin: 0.0743,
    credit: VOYAGER_2_CREDIT,
    footprint: { cx: 0.496, cy: 0.5, angleDeg: 0 },
  },
  Neptune: {
    src: photo("planets", "neptune"),
    widthArcmin: 0.0466,
    credit: VOYAGER_2_CREDIT,
    footprint: { cx: 0.49, cy: 0.5, angleDeg: 0 },
  },
  Mercury: {
    src: photo("planets", "mercury"),
    widthArcmin: 0.148,
    credit: "NASA/JPL, MESSENGER (public domain)",
    footprint: { cx: 0.548, cy: 0.5, angleDeg: 0 },
  },
  Venus: {
    src: photo("planets", "venus"),
    widthArcmin: 0.483,
    credit: "NASA/JPL, Mariner 10 (public domain)",
    footprint: { cx: 0.48, cy: 0.5, angleDeg: 0 },
  },
};
