import { type RefObject, useEffect } from "react";
import type { TargetImage } from "../../images";
import { CYCLE_SECONDS } from "../render/constants";
import { prepareView } from "../render/prepareView";
import type { LoadedPhoto } from "./useLoadedPhoto";

/** Redraw about 20 times a second: plenty for a slow fade, and it keeps the per-pixel work light. */
const FRAME_GAP_MS = 50;

const MS_PER_SECOND = 1000;

/** What the eyepiece is looking at and how well the scope can see it. */
interface Scene {
  loaded: LoadedPhoto | null;
  info: TargetImage;
  fov: number;
  margin: number;
  pointMargin: number;
  quality: number;
  skyGlow: number;

  /** Too small to resolve, so it is drawn as a point of light. */
  point: boolean;
}

/** Calls `show` with a slow direct, averted, direct cycle (0 to 1 and back), and returns a function that stops it. */
function animateAverted(show: (averted: number) => void) {
  let frame = 0;
  let last = 0;

  const tick = (now: number) => {
    if (now - last > FRAME_GAP_MS) {
      last = now;
      show((1 - Math.cos((now / MS_PER_SECOND) * ((2 * Math.PI) / CYCLE_SECONDS))) / 2);
    }

    frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frame);
}

/** Draws the eyepiece view and animates the averted-vision effect; people who prefer reduced motion get a fixed middle setting. */
export function useEyepieceView(
  canvasRef: RefObject<HTMLCanvasElement>,
  thumbRef: RefObject<HTMLSpanElement>,
  scene: Scene,
) {
  const { loaded, info, fov, margin, pointMargin, quality, skyGlow, point } = scene;

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const render = prepareView({
      canvas: canvasRef.current,
      img: loaded.img,
      photo: { widthArcmin: info.widthArcmin, mean: loaded.mean, bg: loaded.bg, center: info.footprint },
      optics: { fov, margin, pointMargin, quality },
      skyGlow,
      point,
    });

    if (!render) return;

    // Draw one frame and move the slider thumb to match the averted-vision level.
    const show = (averted: number) => {
      render(averted);

      if (thumbRef.current) thumbRef.current.style.left = `${averted * 100}%`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return show(0.5);

    return animateAverted(show);
  }, [canvasRef, thumbRef, loaded, info.widthArcmin, info.footprint, fov, margin, pointMargin, quality, skyGlow, point]);
}
