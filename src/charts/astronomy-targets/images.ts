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
};
