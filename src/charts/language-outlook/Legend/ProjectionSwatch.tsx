import { ARROW_STYLE, arrowPoints, PROJECTION_DOT_RADIUS } from "../model/layout";

/** The small arrow-and-dot picture in the key: its size and where the arrow and dot sit in it. */
const KEY_ARROW = { width: 16, height: 30, centerX: 8, centerY: 22 };

/** A projection's key swatch: its dot with the faint arrow that comes with it on the chart. */
export default function ProjectionSwatch({ seriesKey, color }: { seriesKey: string; color: string }) {
  return (
    <svg
      className="key-arrow"
      width={KEY_ARROW.width}
      height={KEY_ARROW.height}
      viewBox={`0 0 ${KEY_ARROW.width} ${KEY_ARROW.height}`}
    >
      <title>{seriesKey}</title>
      <polygon
        points={arrowPoints(KEY_ARROW.centerX, KEY_ARROW.centerY, 1)}
        fill={color}
        fillOpacity={ARROW_STYLE.fillOpacity}
        stroke={ARROW_STYLE.stroke}
        strokeOpacity={ARROW_STYLE.strokeOpacity}
        strokeWidth={ARROW_STYLE.strokeWidth}
      />
      <circle
        cx={KEY_ARROW.centerX}
        cy={KEY_ARROW.centerY}
        r={PROJECTION_DOT_RADIUS}
        fill={color}
        stroke="#4c4c4c"
        strokeWidth={1}
      />
    </svg>
  );
}
