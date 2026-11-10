import { CENTRED, DSS_CREDIT, photo, type TargetImage } from "./target_image";

export const OTHER_IMAGES: Record<string, TargetImage> = {
  "Mel 20": {
    src: photo("other", "mel20"),
    // From the photographer's gear (250 mm focal length, Canon 4000D with 4.3 µm pixels = 3.55 arcsec per pixel) over the
    // 3762 px original width. The photo's orientation is unknown, so the footprint is just a round patch near the middle.
    widthArcmin: 223,
    credit: "Giuseppe Donatiello, CC0 (Wikimedia Commons)",
    footprint: { cx: 0.47, cy: 0.57, angleDeg: 0 },
  },
  "NGC 869/884": {
    src: photo("other", "dc"),
    // Estimated from the gap between the two clusters (about 28 arcminutes) measured as about 500 pixels at 1920 px wide.
    widthArcmin: 108,
    credit: "Stephen Rahn, CC0 (Wikimedia Commons)",
    footprint: { cx: 0.526, cy: 0.469, angleDeg: 0 },
  },
  // Digitized Sky Survey cutouts centred on the target, so their width is exact.
  "Cr 399": {
    src: photo("other", "cr_399"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Stock 2": {
    src: photo("other", "stock_2"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 4665": {
    src: photo("other", "ic_4665"),
    widthArcmin: 210,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mel 111": {
    src: photo("other", "mel_111"),
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 4756": {
    src: photo("other", "ic_4756"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "Mel 25": {
    src: photo("other", "mel_25"),
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 405": {
    src: photo("other", "ic_405"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 1396": {
    src: photo("other", "ic_1396"),
    widthArcmin: 480,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 1805": {
    src: photo("other", "ic_1805"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 5146": {
    src: photo("other", "ic_5146"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 1848": {
    src: photo("other", "ic_1848"),
    widthArcmin: 300,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
  "IC 434": {
    src: photo("other", "ic_434"),
    widthArcmin: 180,
    credit: DSS_CREDIT,
    footprint: CENTRED,
  },
};
