import type { MouseEvent } from "react";
import type { ScaleLinear } from "d3-scale";
import { LINE_COLORS, LINE_DASHES, NEWEST_YEAR_SERIES, PROJECTION_PREFIX, changeKey, seriesColor } from "./model/style";
import { ARROW_STYLE, CHART_HEIGHT, MARGIN, CHART_WIDTH, PROJECTION_DOT_RADIUS, Y_ROUND_STEP, arrowPoints, lineSegments, makeXAt } from "./model/layout";
import type { LanguageOutlookData } from "./model/types";

/** Grid labels sit this far left of the axis and this far below their line, at this size. */
const GRID_LABEL_GAP = 6;
const GRID_LABEL_BASELINE = 4;
const GRID_FONT_SIZE = 12;

/** The lines between a language's dots. */
const LINE_WIDTH = 1.5;
const LINE_OPACITY = 0.45;

/** Language names run at an angle below the axis. */
const NAME_DROP = 16;
const NAME_FONT_SIZE = 13;
const NAME_ANGLE = -45;

/** Dots are this big, and the newest year's dots are a little bigger. */
const DOT_RADIUS = 5;
const FEATURED_DOT_RADIUS = 7;

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  yScale: ScaleLinear<number, number>;
  onTip: (event: MouseEvent, text: string) => void;
  onTipHide: () => void;
}

/** The plot: grid, connecting lines, then one column of dots per language. */
export default function OutlookSvg({ model, visible, yScale, onTip, onTipHide }: Props) {
  const { languages, series, lines } = model;
  const xOfIndex = makeXAt(languages.length);
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / Y_ROUND_STEP));

  // Draw the gridlines, then each language's lines, projection arrows and labels.
  return (
    <svg className="chart-surface" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} role="img" aria-label={model.title}>
      {/* One horizontal grid line and label per tick. */}
      {gridValues.map((gridValue) => (
        <g key={gridValue}>
          <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={yScale(gridValue)} y2={yScale(gridValue)} stroke="#ffffff40" />
          <text x={MARGIN.left - GRID_LABEL_GAP} y={yScale(gridValue) + GRID_LABEL_BASELINE} textAnchor="end" fontSize={GRID_FONT_SIZE} fill="#fff">
            {gridValue}
          </text>
        </g>
      ))}

      {lines.map((line) => // Draw each visible line as one or more segments, since gaps in the data break the line.
        visible[line]
          // One polyline per unbroken stretch.
          ? lineSegments(languages, line, xOfIndex, yScale).map((points, index) => (
              <polyline
                key={`${line}-${index}`}
                points={points}
                fill="none"
                stroke={LINE_COLORS[line]}
                strokeWidth={LINE_WIDTH}
                strokeOpacity={LINE_OPACITY}
                strokeDasharray={LINE_DASHES[line]}
                strokeLinecap={LINE_DASHES[line] ? "round" : undefined}
                strokeLinejoin="round"
              />
            ))
          : null,
      )}

      {languages.map((lang, index) => ( // Draw each language's name, dots and arrows.
        <g key={lang.name}>
          <text
            x={xOfIndex(index)}
            y={CHART_HEIGHT - MARGIN.bottom + NAME_DROP}
            textAnchor="end"
            fontSize={NAME_FONT_SIZE}
            fill="#fff"
            transform={`rotate(${NAME_ANGLE} ${xOfIndex(index)} ${CHART_HEIGHT - MARGIN.bottom + NAME_DROP})`}
          >
            {lang.name}
          </text>
          {series.map((seriesName, seriesIndex) => { // One dot (or arrow for projections) per series; hidden or missing values are skipped.
            const value = lang.values[seriesName];

            if (!visible[seriesName] || value == null) return null;
            const centerX = xOfIndex(index);
            const centerY = yScale(value);

            if (seriesName.startsWith(PROJECTION_PREFIX)) {
              const change = lang.values[changeKey(seriesName)] ?? 0;
              const sign = change >= 0 ? "+" : "";

              return (
                <g key={seriesName}>
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
                      onTip(event, `${lang.name} - ${seriesName}: ${value.toFixed(2)} (trend change ${sign}${change.toFixed(2)})`)
                    }
                    onMouseLeave={onTipHide}
                  />
                </g>
              );
            }

            return (
              <circle
                key={seriesName}
                cx={centerX}
                cy={centerY}
                r={seriesName === NEWEST_YEAR_SERIES ? FEATURED_DOT_RADIUS : DOT_RADIUS}
                fill={seriesColor(seriesName, seriesIndex)}
                stroke="#4c4c4c"
                strokeWidth={1}
                onMouseMove={(event) => onTip(event, `${lang.name} - ${seriesName}: ${value.toFixed(2)}`)}
                onMouseLeave={onTipHide}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
