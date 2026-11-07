import { useEffect, useState } from "react";
import type { Target } from "../../../model/types";
import type { TargetImage } from "../../images";
import { loadImage, measurePhoto } from "../render/photo";

export interface LoadedPhoto {
  img: HTMLImageElement;
  mean: number;
  bg: number;
}

/** The target's photo once it has loaded, with its measured brightness so it can be scaled to the eyepiece view. */
export function useLoadedPhoto(info: TargetImage, target: Target) {
  const [loaded, setLoaded] = useState<LoadedPhoto | null>(null);

  // Ignore the result if the preview was closed before the photo finished loading.
  useEffect(() => {
    let cancelled = false;

    loadImage(info.src)
      .then((img) => {
        if (!cancelled) setLoaded({ img, ...measurePhoto(img, info, target) });
      })
      .catch((error) => console.warn(`Could not load image ${info.src}`, error));

    return () => {
      cancelled = true;
    };
  }, [info, target]);

  return loaded;
}
