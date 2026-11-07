import { ARROW_STYLE, arrowPoints, PROJECTION_DOT_RADIUS } from "../model/layout";
import { NEWEST_YEAR_SERIES, seriesColor } from "../model/style";
import type { TipProps } from "./tips";

/** Dots are this big, and the newest year's dots are a little bigger. */
const DOT_RADIUS = 5;
const FEATURED_DOT_RADIUS = 7;

/** One value of one series for one language, and where it sits on the chart. */
export interface Mark {
  languageName: string;
  seriesName: string;
  seriesIndex: number;
  value: number;
  centerX: number;
  centerY: number;
}

interface ProjectionProps extends TipProps {
  mark: Mark;

  /** How much the trend changes, which sets the arrow's direction and size. */
  change: number;
}

/** A projection: a faint arrow for the trend change with a dot on the value. */
export function ProjectionMark({ mark, change, onTip, onTipHide }: ProjectionProps) {
  const { languageName, seriesName, seriesIndex, value, centerX, centerY } = mark;
  const sign = change >= 0 ? "+" : "";

  return (
    <g>
      <polygon
        points={arrowPoints(centerX, centerY, change)}
        fill={seriesColor(seriesName, seriesIndex)}
        fillOpacity={ARROW_STYLE.fillOpacity}
        stroke={ARROW_STYLE.stroke}
        strokeOpacity={ARROW_STYLE.strokeOpacity}
        strokeWidth={ARROW_STYLE.strokeWidth}
        pointerEvents="none"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={PROJECTION_DOT_RADIUS}
        fill={seriesColor(seriesName, seriesIndex)}
        stroke="#4c4c4c"
        strokeWidth={1}
        // Show the value and its trend change in the tooltip.
        onMouseMove={(event) =>
          onTip(
            event,
            `${languageName} - ${seriesName}: ${value.toFixed(2)} (trend change ${sign}${change.toFixed(2)})`,
          )
        }
        onMouseLeave={onTipHide}
      />
    </g>
  );
}

/** The newest year's dot is drawn bigger so it stands out from the older years on the same line. */
export function ValueDot({ mark, onTip, onTipHide }: TipProps & { mark: Mark }) {
  const { languageName, seriesName, seriesIndex, value, centerX, centerY } = mark;

  return (
    <circle
      cx={centerX}
      cy={centerY}
      r={seriesName === NEWEST_YEAR_SERIES ? FEATURED_DOT_RADIUS : DOT_RADIUS}
      fill={seriesColor(seriesName, seriesIndex)}
      stroke="#4c4c4c"
      strokeWidth={1}
      onMouseMove={(event) => onTip(event, `${languageName} - ${seriesName}: ${value.toFixed(2)}`)}
      onMouseLeave={onTipHide}
    />
  );
}
