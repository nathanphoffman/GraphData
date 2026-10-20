import m45 from "./images/m45.jpg";

export interface TargetImage {
  src: string;
  /** Width of the photo's sky coverage in arcminutes (the photo's height follows its shape). */
  widthArcmin: number;
  credit: string;
}

/** Photos by target id. Public-domain images from Wikimedia Commons. */
export const TARGET_IMAGES: Record<string, TargetImage> = {
  M45: {
    src: m45,
    // Estimated from the spacing of known stars (about 23 pixels per arcminute at 1920 px wide).
    widthArcmin: 83,
    credit: "NASA, ESA, AURA/Caltech, Palomar Observatory (public domain)",
  },
};
