import m45 from "./images/m45.jpg";
import dc from "./images/dc.jpg";
import m31 from "./images/m31.jpg";
import m81 from "./images/m81.jpg";
import mel20 from "./images/mel20.jpg";
import img_cr_399 from "./images/cr_399.jpg";
import img_stock_2 from "./images/stock_2.jpg";
import img_ic_4665 from "./images/ic_4665.jpg";
import img_ngc_2232 from "./images/ngc_2232.jpg";
import img_m39 from "./images/m39.jpg";
import img_mel_111 from "./images/mel_111.jpg";
import img_ngc_2264 from "./images/ngc_2264.jpg";
import img_m34 from "./images/m34.jpg";
import img_ic_4756 from "./images/ic_4756.jpg";
import img_ngc_457 from "./images/ngc_457.jpg";
import img_ngc_752 from "./images/ngc_752.jpg";
import img_m35 from "./images/m35.jpg";
import img_mel_25 from "./images/mel_25.jpg";
import img_ngc_6633 from "./images/ngc_6633.jpg";
import img_ngc_1647 from "./images/ngc_1647.jpg";
import img_ic_405 from "./images/ic_405.jpg";
import moon from "./images/moon.jpg";
import img_m47 from "./images/m47.jpg";
import img_m38 from "./images/m38.jpg";
import img_m44 from "./images/m44.jpg";
import img_m37 from "./images/m37.jpg";
import img_m48 from "./images/m48.jpg";
import img_m42 from "./images/m42.jpg";
import img_m13 from "./images/m13.jpg";
import img_m3 from "./images/m3.jpg";
import img_m24 from "./images/m24.jpg";
import img_m25 from "./images/m25.jpg";
import img_m41 from "./images/m41.jpg";
import img_ngc_7789 from "./images/ngc_7789.jpg";
import img_ngc_7023 from "./images/ngc_7023.jpg";
import img_ngc_129 from "./images/ngc_129.jpg";
import img_ngc_663 from "./images/ngc_663.jpg";
import img_ngc_225 from "./images/ngc_225.jpg";
import img_m15 from "./images/m15.jpg";
import img_m5 from "./images/m5.jpg";
import img_m33 from "./images/m33.jpg";
import img_ngc_6888 from "./images/ngc_6888.jpg";
import img_m92 from "./images/m92.jpg";
import img_ngc_2301 from "./images/ngc_2301.jpg";
import img_m46 from "./images/m46.jpg";
import img_ngc_2175 from "./images/ngc_2175.jpg";
import img_ngc_7000 from "./images/ngc_7000.jpg";
import img_m106 from "./images/m106.jpg";
import img_ngc_281 from "./images/ngc_281.jpg";
import img_m67 from "./images/m67.jpg";
import img_ngc_7380 from "./images/ngc_7380.jpg";
import img_m36 from "./images/m36.jpg";
import img_m50 from "./images/m50.jpg";
import img_vega from "./images/vega.jpg";
import img_capella from "./images/capella.jpg";
import img_m53 from "./images/m53.jpg";
import img_ic_1396 from "./images/ic_1396.jpg";
import img_m11 from "./images/m11.jpg";
import img_arcturus from "./images/arcturus.jpg";
import img_pollux from "./images/pollux.jpg";
import img_deneb from "./images/deneb.jpg";
import img_castor from "./images/castor.jpg";
import img_alioth from "./images/alioth.jpg";
import img_alkaid from "./images/alkaid.jpg";
import img_procyon from "./images/procyon.jpg";
import img_menkalinan from "./images/menkalinan.jpg";
import img_altair from "./images/altair.jpg";
import img_mizar from "./images/mizar.jpg";
import img_mirach from "./images/mirach.jpg";
import img_dubhe from "./images/dubhe.jpg";
import img_betelgeuse from "./images/betelgeuse.jpg";
import img_m52 from "./images/m52.jpg";
import img_elnath from "./images/elnath.jpg";
import img_alpheratz from "./images/alpheratz.jpg";
import img_m23 from "./images/m23.jpg";
import img_mirfak from "./images/mirfak.jpg";
import img_alhena from "./images/alhena.jpg";
import img_m110 from "./images/m110.jpg";
import img_hamal from "./images/hamal.jpg";
import img_m12 from "./images/m12.jpg";
import img_ngc_4565 from "./images/ngc_4565.jpg";
import img_m16 from "./images/m16.jpg";
import img_m10 from "./images/m10.jpg";
import img_m94 from "./images/m94.jpg";
import img_rasalhague from "./images/rasalhague.jpg";
import img_albireo from "./images/albireo.jpg";
import img_ic_1805 from "./images/ic_1805.jpg";
import img_bellatrix from "./images/bellatrix.jpg";
import img_m2 from "./images/m2.jpg";
import img_m22 from "./images/m22.jpg";
import img_ngc_6791 from "./images/ngc_6791.jpg";
import img_polaris from "./images/polaris.jpg";
import img_m63 from "./images/m63.jpg";
import img_ngc_4631 from "./images/ngc_4631.jpg";
import mars from "./images/mars.jpg";
import jupiter from "./images/jupiter.jpg";
import saturn from "./images/saturn.jpg";
import uranus from "./images/uranus.jpg";
import neptune from "./images/neptune.jpg";

export interface TargetImage {
  src: string;
  /** Width of the photo's sky coverage in arcminutes (the photo's height follows its shape). */
  widthArcmin: number;
  credit: string;
  /**
   * Where the target sits in the photo, as fractions of its width and height, and how far its long axis is tilted
   * (degrees clockwise from horizontal). When set, the "typical brightness" is measured over the target's own oval
   * instead of the whole photo, which matters when the photo is mostly empty sky and stars.
   */
  footprint?: { cx: number; cy: number; angleDeg: number };
}

const DSS_CREDIT = "Digitized Sky Survey 2 (STScI/NASA, Palomar/ESO/UK Schmidt), via CDS hips2fits";
const CENTRED = { cx: 0.5, cy: 0.5, angleDeg: 0 };

/** Photos by target id. Public-domain images from Wikimedia Commons. */
export const TARGET_IMAGES: Record<string, TargetImage> = {
  M45: {
    src: m45,
    // Estimated from the spacing of known stars (about 23 pixels per arcminute at 1920 px wide).
    widthArcmin: 83,
    credit: "NASA, ESA, AURA/Caltech, Palomar Observatory (public domain)",
  },
  M31: {
    src: m31,
    // Estimated from the distances to M32 and M110 (about 7.1 pixels per arcminute at 1920 px wide). The photo is south-up.
    widthArcmin: 270,
    credit: "Adam Evans, CC BY 2.0 (Wikimedia Commons)",
    footprint: { cx: 0.508, cy: 0.512, angleDeg: 32 },
  },
  "Mel 20": {
    src: mel20,
    // From the photographer's gear (250 mm focal length, Canon 4000D with 4.3 µm pixels = 3.55 arcsec per pixel) over the
    // 3762 px original width. The photo's orientation is unknown, so the footprint is just a round patch near the middle.
    widthArcmin: 223,
    credit: "Giuseppe Donatiello, CC0 (Wikimedia Commons)",
    footprint: { cx: 0.47, cy: 0.57, angleDeg: 0 },
  },
  "NGC 869/884": {
    src: dc,
    // Estimated from the gap between the two clusters (about 28 arcminutes) measured as about 500 pixels at 1920 px wide.
    widthArcmin: 108,
    credit: "Stephen Rahn, CC0 (Wikimedia Commons)",
    footprint: { cx: 0.526, cy: 0.469, angleDeg: 0 },
  },
  // M81 and M82 share one photo, each with its own spot to measure brightness from.
  // Scale: the two galaxies are about 37 arcminutes apart and sit about 1120 px apart at 1920 px wide.
  M81: {
    src: m81,
    widthArcmin: 62.5,
    credit: "Robert Gendler, NASA, ESA (public domain)",
    footprint: { cx: 0.753, cy: 0.511, angleDeg: -14 },
  },
  M82: {
    src: m81,
    widthArcmin: 62.5,
    credit: "Robert Gendler, NASA, ESA (public domain)",
    footprint: { cx: 0.169, cy: 0.578, angleDeg: -63 },
  },
  // Moon: the disc is about 1580 px across at 1920 px wide, and the Moon averages 31 arcminutes.
  Moon: {
    src: moon,
    widthArcmin: 37.7,
    credit: "Gregory H. Revera, CC BY-SA 3.0 (Wikimedia Commons)",
    footprint: { cx: 0.5, cy: 0.5, angleDeg: 0 },
  },
  // The rest are Digitized Sky Survey cutouts centred on the target, so their width is exact.
  "Cr 399": {
    src: img_cr_399,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Stock 2": {
    src: img_stock_2,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 4665": {
    src: img_ic_4665,
    widthArcmin: 210,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 2232": {
    src: img_ngc_2232,
    widthArcmin: 300,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M39": {
    src: img_m39,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mel 111": {
    src: img_mel_111,
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 2264": {
    src: img_ngc_2264,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M34": {
    src: img_m34,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 4756": {
    src: img_ic_4756,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 457": {
    src: img_ngc_457,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 752": {
    src: img_ngc_752,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M35": {
    src: img_m35,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mel 25": {
    src: img_mel_25,
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 6633": {
    src: img_ngc_6633,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 1647": {
    src: img_ngc_1647,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 405": {
    src: img_ic_405,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M47": {
    src: img_m47,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M38": {
    src: img_m38,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M44": {
    src: img_m44,
    widthArcmin: 285,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M37": {
    src: img_m37,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M48": {
    src: img_m48,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M42": {
    src: img_m42,
    widthArcmin: 255,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M13": {
    src: img_m13,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M3": {
    src: img_m3,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M24": {
    src: img_m24,
    widthArcmin: 270,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M25": {
    src: img_m25,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M41": {
    src: img_m41,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 7789": {
    src: img_ngc_7789,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 7023": {
    src: img_ngc_7023,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 129": {
    src: img_ngc_129,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 663": {
    src: img_ngc_663,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 225": {
    src: img_ngc_225,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M15": {
    src: img_m15,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M5": {
    src: img_m5,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M33": {
    src: img_m33,
    widthArcmin: 210,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 6888": {
    src: img_ngc_6888,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M92": {
    src: img_m92,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 2301": {
    src: img_ngc_2301,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M46": {
    src: img_m46,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 2175": {
    src: img_ngc_2175,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 7000": {
    src: img_ngc_7000,
    widthArcmin: 360,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M106": {
    src: img_m106,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 281": {
    src: img_ngc_281,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M67": {
    src: img_m67,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 7380": {
    src: img_ngc_7380,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M36": {
    src: img_m36,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M50": {
    src: img_m50,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Vega": {
    src: img_vega,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Capella": {
    src: img_capella,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M53": {
    src: img_m53,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 1396": {
    src: img_ic_1396,
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M11": {
    src: img_m11,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Arcturus": {
    src: img_arcturus,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Pollux": {
    src: img_pollux,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Deneb": {
    src: img_deneb,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Castor": {
    src: img_castor,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Alioth": {
    src: img_alioth,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Alkaid": {
    src: img_alkaid,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Procyon": {
    src: img_procyon,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Menkalinan": {
    src: img_menkalinan,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Altair": {
    src: img_altair,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mizar": {
    src: img_mizar,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mirach": {
    src: img_mirach,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Dubhe": {
    src: img_dubhe,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Betelgeuse": {
    src: img_betelgeuse,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M52": {
    src: img_m52,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Elnath": {
    src: img_elnath,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Alpheratz": {
    src: img_alpheratz,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M23": {
    src: img_m23,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mirfak": {
    src: img_mirfak,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Alhena": {
    src: img_alhena,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M110": {
    src: img_m110,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Hamal": {
    src: img_hamal,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M12": {
    src: img_m12,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 4565": {
    src: img_ngc_4565,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M16": {
    src: img_m16,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M10": {
    src: img_m10,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M94": {
    src: img_m94,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Rasalhague": {
    src: img_rasalhague,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Albireo": {
    src: img_albireo,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 1805": {
    src: img_ic_1805,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Bellatrix": {
    src: img_bellatrix,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M2": {
    src: img_m2,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M22": {
    src: img_m22,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 6791": {
    src: img_ngc_6791,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Polaris": {
    src: img_polaris,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "M63": {
    src: img_m63,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "NGC 4631": {
    src: img_ngc_4631,
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  // Planets: widthArcmin is set so the planet's disc matches its size in the data (Saturn includes the rings).
  Mars: {
    src: mars,
    widthArcmin: 0.19,
    credit: "NASA, ESA, STScI / Hubble (public domain)",
    footprint: { cx: 0.5, cy: 0.5, angleDeg: 0 },
  },
  Jupiter: {
    src: jupiter,
    widthArcmin: 0.716,
    credit: "NASA/JPL/University of Arizona, Cassini (public domain)",
    footprint: { cx: 0.515, cy: 0.5, angleDeg: 0 },
  },
  Saturn: {
    src: saturn,
    widthArcmin: 0.737,
    credit: "NASA, ESA, A. Simon (GSFC), M. H. Wong (UC Berkeley), OPAL team (public domain)",
    footprint: { cx: 0.5, cy: 0.495, angleDeg: 0 },
  },
  Uranus: {
    src: uranus,
    widthArcmin: 0.0743,
    credit: "NASA/JPL, Voyager 2 (public domain)",
    footprint: { cx: 0.496, cy: 0.5, angleDeg: 0 },
  },
  Neptune: {
    src: neptune,
    widthArcmin: 0.0466,
    credit: "NASA/JPL, Voyager 2 (public domain)",
    footprint: { cx: 0.49, cy: 0.5, angleDeg: 0 },
  },
};
