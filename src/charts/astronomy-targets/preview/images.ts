import { MESSIER_IMAGES } from "./image_tables/messier";
import { NGC_IMAGES } from "./image_tables/ngc";
import { OTHER_IMAGES } from "./image_tables/other";
import { PLANETS_IMAGES } from "./image_tables/planets";
import { STARS_IMAGES } from "./image_tables/stars";
import type { TargetImage } from "./image_tables/target_image";

export type { TargetImage };

/** Photos by target id. Public-domain images from Wikimedia Commons. */
export const TARGET_IMAGES: Record<string, TargetImage> = {
  ...MESSIER_IMAGES,
  ...NGC_IMAGES,
  ...OTHER_IMAGES,
  ...PLANETS_IMAGES,
  ...STARS_IMAGES,
};
