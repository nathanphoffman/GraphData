import m45 from "./images/m45.jpg";
import m31 from "./images/m31.jpg";

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
};
