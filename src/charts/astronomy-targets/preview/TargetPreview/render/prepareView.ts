import { AVERTED_BOOST, COOL_BALANCE, SCALE, VIEW_SIZE } from "./constants";
import { preparePoint } from "./preparePoint";

/** Everything prepareView needs, grouped so it isn't a dozen loose arguments. */
export interface ViewParams {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;

  /** Photo scale and measured brightness (mean of the target, bg of the sky). */
  photo: { widthArcmin: number; mean: number; bg: number; center?: { cx: number; cy: number } };

  /** Eyepiece field of view and how far the scope's reach is above the target (magnitudes). */
  optics: { fov: number; margin: number; pointMargin: number; quality: number };
  skyGlow: number;

  /** Too small to resolve, so draw it as a point of light. */
  point: boolean;
}

/** Where the photo sits inside the round field, and its pixels as drawn. */
interface PlacedPhoto {
  left: number;
  topEdge: number;
  width: number;
  height: number;
  sharp: Uint8ClampedArray;
}

/** The part of the eyepiece image that stays the same between frames. */
interface FieldMasks {
  /** 0 outside the photo's edge, rising to 1 inside it; 0 everywhere outside the round field. */
  weight: Float32Array;
  vignette: Float32Array;
}

/** Everything one frame needs: the pixels, the masks, and how bright and how good the view is. */
interface FrameInputs {
  context: CanvasRenderingContext2D;
  size: number;
  pixels: { sharp: Uint8ClampedArray; blur: Uint8ClampedArray };
  masks: FieldMasks;
  photoLevels: { mean: number; bg: number };
  view: { margin: number; quality: number; skyGlow: number };
}

/** Draw the photo at the right scale, with the target (when we know where it is in the photo) in the middle of the field. */
function placePhoto(context: CanvasRenderingContext2D, size: number, params: ViewParams): PlacedPhoto {
  const { img, photo, optics } = params;
  const width = photo.widthArcmin * (size / optics.fov);
  const height = width * (img.naturalHeight / img.naturalWidth);
  context.fillStyle = "#000";
  context.fillRect(0, 0, size, size);
  context.imageSmoothingQuality = "high";
  const left = size / 2 - (photo.center?.cx ?? 0.5) * width;
  const topEdge = size / 2 - (photo.center?.cy ?? 0.5) * height;
  context.drawImage(img, left, topEdge, width, height);

  return { left, topEdge, width, height, sharp: context.getImageData(0, 0, size, size).data };
}

/** A softened copy of what is on the canvas, blended in for averted vision (null where the browser can't blur a canvas). */
function blurredPixels(canvas: HTMLCanvasElement, size: number): Uint8ClampedArray | null {
  const soft = document.createElement("canvas");
  soft.width = soft.height = size;
  const softContext = soft.getContext("2d", { willReadFrequently: true });

  if (!softContext) return null;
  softContext.filter = "blur(3px)";
  softContext.drawImage(canvas, 0, 0);

  return softContext.getImageData(0, 0, size, size).data;
}

/**
 * Per-pixel factors that don't change between frames: inside the round field, soft photo edge, and vignette.
 * Photos smaller than the field (planets in a wide view) get a proportionally smaller soft edge so they don't fade away.
 */
function fieldMasks(size: number, placed: PlacedPhoto): FieldMasks {
  const { left, topEdge, width, height } = placed;
  const half = size / 2;
  const feather = Math.max(0.5, Math.min(12, Math.min(width, height) / 4));
  const weight = new Float32Array(size * size);
  const vignette = new Float32Array(size * size);

  for (let p = 0; p < size * size; p++) {
    const pixels = p % size;
    const py = Math.floor(p / size);
    const r = Math.hypot(pixels - half, py - half) / half;

    if (r > 1) continue;
    const ex = Math.min(1, Math.max(0, Math.min(pixels - left, left + width - pixels) / feather));
    const ey = Math.min(1, Math.max(0, Math.min(py - topEdge, topEdge + height - py) / feather));
    weight[p] = ex * ey;
    vignette[p] = 1 - 0.25 * r * r;
  }

  return { weight, vignette };
}

/**
 * Rough eyepiece simulation: the photo is placed at the right scale inside a round field, then each pixel is dimmed by how far
 * the scope's reach (after sky glow) is from the target's brightness. Faint nebulosity and faint stars drop out first,
 * leaving bright stars on a grey or orange sky. This is an approximation, not a calibrated render.
 * Returns a function that draws one frame for a given amount of averted vision (0 = looking straight at it, 1 = looking to the side):
 * averted vision is more sensitive but softer and colourless.
 */
function photoRenderer({ context, size, pixels, masks, photoLevels, view }: FrameInputs) {
  const { sharp, blur } = pixels;
  const { weight, vignette } = masks;
  const { mean, bg } = photoLevels;
  const { margin, quality, skyGlow } = view;
  const frame = context.createImageData(size, size);
  const d = frame.data;
  const lut = new Float32Array(256).map((_unused, index) => (index / 255) ** 2.2);

  // Optical quality: good optics add contrast and colour; poor optics flatten them, lift the sky with scattered light and soften the image.
  const poor = Math.max(0, -quality);
  const skyLevel = skyGlow ** 2.5 * 0.3 + 0.015 * poor;
  const skyTint = [1, 0.82, 0.62];

  // Returns a renderer for a given averted-vision level that turns the photo into what the eye would see through the eyepiece.
  return (averted: number) => {
    const gain = 10 ** (0.4 * (margin + AVERTED_BOOST * averted)) / mean;
    const soften = Math.min(1, 0.6 * averted + 0.6 * poor);

    // The eye sees almost no colour in the dark and none at all in averted vision; good optics keep more of the photo's colour.
    const colour = Math.max(0, (0.175 + 0.25 * quality) * (1 - averted));
    const contrast = 8 * (1 - 0.3 * quality);
    const tone = (xPos: number, width: number) => 1 - Math.exp(-Math.max(0, xPos * gain * width - 2.5) / contrast);
    const tint = [0.86 + 0.14 * colour, 0.93 + 0.07 * colour, 1.0];

    for (let p = 0; p < size * size; p++) {
      const index = p * 4;
      d[index + 3] = 255;

      if (vignette[p] === 0) {
        d[index] = d[index + 1] = d[index + 2] = 0;
        continue;
      }

      const lin0 = (lut[sharp[index]] + (lut[blur[index]] - lut[sharp[index]]) * soften) * COOL_BALANCE[0];
      const lin1 = (lut[sharp[index + 1]] + (lut[blur[index + 1]] - lut[sharp[index + 1]]) * soften) * COOL_BALANCE[1];
      const lin2 = (lut[sharp[index + 2]] + (lut[blur[index + 2]] - lut[sharp[index + 2]]) * soften) * COOL_BALANCE[2];
      const width = weight[p];
      const grey = tone(Math.max(0, 0.3 * lin0 + 0.59 * lin1 + 0.11 * lin2 - bg), width);

      for (let c = 0; c < 3; c++) {
        // Pick the red, green or blue channel by index, subtract the sky background, and never go below zero.
        const chan = tone(Math.max(0, (c === 0 ? lin0 : c === 1 ? lin1 : lin2) - bg), width);
        const level = grey + (chan - grey) * colour;
        const value = Math.min(1, skyLevel * skyTint[c] + level * tint[c]) * vignette[p];
        d[index + c] = Math.round(255 * value ** (1 / 2.2));
      }
    }

    context.putImageData(frame, 0, 0);
  };
}

/** Sets up the canvas and returns a render function for the target: a point of light if it is too small to resolve, otherwise the photo. */
export function prepareView(params: ViewParams) {
  const { canvas, photo, optics, skyGlow, point } = params;
  const size = VIEW_SIZE * SCALE;
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) return null;

  if (point) return preparePoint(context, size, optics.pointMargin, skyGlow, optics.quality);
  const placed = placePhoto(context, size, params);
  const blur = blurredPixels(canvas, size);

  if (!blur) return null;

  return photoRenderer({
    context,
    size,
    pixels: { sharp: placed.sharp, blur },
    masks: fieldMasks(size, placed),
    photoLevels: { mean: photo.mean, bg: photo.bg },
    view: { margin: optics.margin, quality: optics.quality, skyGlow },
  });
}
