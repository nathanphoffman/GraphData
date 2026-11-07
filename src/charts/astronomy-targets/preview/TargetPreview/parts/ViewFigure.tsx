import type { RefObject } from "react";
import { VIEW_SIZE } from "../render/constants";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  thumbRef: RefObject<HTMLSpanElement>;
  magnification: number;
}

/** The simulated eyepiece view, with a slider showing how far the animation is between looking straight at it and looking beside it. */
export default function ViewFigure({ canvasRef, thumbRef, magnification }: Props) {
  return (
    <figure>
      <canvas ref={canvasRef} style={{ width: VIEW_SIZE, height: VIEW_SIZE }} />
      <div className="astro-gaze" aria-hidden="true">
        <span>Direct</span>
        <div className="astro-gaze-track">
          <span ref={thumbRef} className="astro-gaze-thumb" />
        </div>
        <span>Averted</span>
      </div>
      <figcaption>Your view (approximate), {magnification.toFixed(0)}×</figcaption>
    </figure>
  );
}
