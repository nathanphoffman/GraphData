import type { Target } from "../../../model/types";
import type { TargetImage } from "../../images";

/** Targets smaller than this share of the photo's width get a red circle on the photo, so you can tell which thing in the picture is the target. */
export const CIRCLE_BELOW = 0.5;

/** The circle is never smaller than this share of the photo's width, so tiny targets can still be found. */
const CIRCLE_MIN = 0.03;

/** A red outline around the target on the photo, when the target is only a small part of what the photo shows. */
export function TargetCircle({ target, info, img }: { target: Target; info: TargetImage; img: HTMLImageElement }) {
  const f = info.footprint;

  if (!f || info.noCircle || target.major <= 0 || target.major / info.widthArcmin >= CIRCLE_BELOW) return null;
  const width = info.widthArcmin;
  const height = width * (img.naturalHeight / img.naturalWidth);
  const lowest = (width * CIRCLE_MIN) / 2;
  const centerX = f.cx * width;
  const centerY = f.cy * height;

  return (
    <svg className="astro-circle" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={Math.max(target.major / 2, lowest)}
        ry={Math.max(target.minor / 2, lowest)}
        transform={`rotate(${f.angleDeg} ${centerX} ${centerY})`}
      />
    </svg>
  );
}
