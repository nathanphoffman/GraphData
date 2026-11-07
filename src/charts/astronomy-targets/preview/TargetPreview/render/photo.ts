import type { Target } from "../../../model/types";
import type { TargetImage } from "../../images";

/** Load an image as a promise so the preview can wait for it. */
export function loadImage(src: string): Promise<HTMLImageElement> {
  // Wrap the browser's image loading in a promise so it can be awaited.
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Average linear brightness of the photo (or of the target's own oval within it), used as "the target's typical surface brightness". */
export function measurePhoto(img: HTMLImageElement, info: TargetImage, target: Target): { mean: number; bg: number } {
  const w = 256;
  const h = Math.round(w * (img.naturalHeight / img.naturalWidth));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");

  if (!g) return { mean: 0.05, bg: 0 };
  g.drawImage(img, 0, 0, w, h);
  const pixels = g.getImageData(0, 0, w, h).data;
  const f = info.footprint;
  const pxPerArcmin = w / info.widthArcmin;
  const a = (target.major / 2) * pxPerArcmin;
  const b = (target.minor / 2) * pxPerArcmin;
  const angle = ((f?.angleDeg ?? 0) * Math.PI) / 180;
  let total = 0;
  let n = 0;
  const all: number[] = [];

  for (let yPos = 0; yPos < h; yPos++) {
    for (let xPos = 0; xPos < w; xPos++) {
      const index = (yPos * w + xPos) * 4;
      const lum = ((0.3 * pixels[index] + 0.59 * pixels[index + 1] + 0.11 * pixels[index + 2]) / 255) ** 2.2;
      all.push(lum);

      if (f) {
        const deltaX = xPos - f.cx * w;
        const deltaY = yPos - f.cy * h;
        const u = deltaX * Math.cos(angle) + deltaY * Math.sin(angle);
        const value = -deltaX * Math.sin(angle) + deltaY * Math.cos(angle);

        if ((u / a) ** 2 + (value / b) ** 2 > 1) continue;
      }

      total += lum;
      n++;
    }
  }

  // The photo's own sky level (its dim 10th percentile) is not part of the target, so it is taken off before brightening.
  all.sort((p, index) => p - index);
  const background = all[Math.floor(all.length * 0.1)] ?? 0;

  return { mean: Math.max(0.005, (n ? total / n : 0.05) - background), bg: background };
}
