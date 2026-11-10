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

  /** Skip the red circle on the photo, for targets that are obvious in the picture. */
  noCircle?: boolean;
}

export const DSS_CREDIT = "Digitized Sky Survey 2 (STScI/NASA, Palomar/ESO/UK Schmidt), via CDS hips2fits";
export const CENTRED = { cx: 0.5, cy: 0.5, angleDeg: 0 };

// Vite swaps this for a table of every photo's URL, loaded up front like the old one-import-per-photo lines.
const PHOTO_URLS = import.meta.glob<string>("../images/*/*.jpg", { eager: true, import: "default" });

/** The URL of one photo in the images folder, like photo("messier", "m31"). Throws when the file is missing. */
export function photo(folder: string, name: string): string {
  const url = PHOTO_URLS[`../images/${folder}/${name}.jpg`];

  if (url === undefined) throw new Error(`No photo at images/${folder}/${name}.jpg`);

  return url;
}
