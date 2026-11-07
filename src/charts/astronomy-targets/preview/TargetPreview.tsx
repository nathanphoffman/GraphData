import { useRef } from "react";
import { effectiveQuality, previewOptics, viewConditions } from "../model/calculate";
import { guideStarsFor } from "../model/guideStars";
import type { ScoredTarget, Settings } from "../model/types";
import { FindingChart } from "./FindingChart";
import { TARGET_IMAGES } from "./images";
import AboutText from "./TargetPreview/parts/AboutText";
import PhotoFigure from "./TargetPreview/parts/PhotoFigure";
import { PreviewHead } from "./TargetPreview/parts/PreviewHead";
import { previewStats } from "./TargetPreview/parts/previewStats";
import ViewFigure from "./TargetPreview/parts/ViewFigure";
import { SCALE, VIEW_SIZE } from "./TargetPreview/render/constants";
import { useEyepieceView } from "./TargetPreview/state/useEyepieceView";
import { useLoadedPhoto } from "./TargetPreview/state/useLoadedPhoto";
import { useOnScreenPosition } from "./TargetPreview/state/useOnScreenPosition";

/** True when the target has a photo, so only those targets get a hover preview. */
export function hasPreview(identifier: string): boolean {
  return identifier in TARGET_IMAGES;
}

/** The shortest the target can be (in pixels of the view) and still be drawn from its photo instead of as a point of light. */
const MIN_RESOLVED_PIXELS = 6;

/** Floating preview of what the target looks like through the chosen eyepiece, placed next to the mouse. */
export function TargetPreview({
  row,
  settings,
  x,
  y,
}: {
  row: ScoredTarget;
  settings: Settings;
  x: number;
  y: number;
}) {
  const info = TARGET_IMAGES[row.target.id];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const loaded = useLoadedPhoto(info, row.target);
  const altitude = row.peakAltitude > 0 ? Math.max(20, row.peakAltitude) : 45;
  const view = viewConditions(row.target, settings, altitude);

  // The preview eyepiece: more magnification shows a smaller patch of sky, bigger and dimmer.
  const eyepiece = previewOptics(settings);

  useEyepieceView(canvasRef, thumbRef, {
    loaded,
    info,
    fov: eyepiece.fov,
    margin: view.margin - eyepiece.dimming,
    pointMargin: view.pointMargin,
    quality: (effectiveQuality(settings) - 50) / 50,
    skyGlow: view.skyGlow,
    point: row.target.major * ((VIEW_SIZE * SCALE) / eyepiece.fov) < MIN_RESOLVED_PIXELS,
  });

  const { boxRef, left, top } = useOnScreenPosition(x, y);
  const { tiles, notes, extra } = previewStats(row);
  const guideStars = guideStarsFor(row.target);

  return (
    <div ref={boxRef} className="astro-preview" style={{ left, top }}>
      <PreviewHead row={row} settings={settings} />
      <dl className="astro-stats">
        {/* One row per fact about the target. */}
        {tiles.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <PhotoFigure target={row.target} info={info} loaded={loaded} />
      <ViewFigure canvasRef={canvasRef} thumbRef={thumbRef} magnification={eyepiece.magnification} />
      <div className="astro-text">{extra && <AboutText extra={extra} notes={notes} guideStars={guideStars} />}</div>
      {guideStars.length > 0 && (
        <div className="astro-text">
          <FindingChart stars={guideStars} target={row.target} />
        </div>
      )}
      <small>{info.credit}</small>
    </div>
  );
}
