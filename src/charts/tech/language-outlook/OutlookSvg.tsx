import type { MouseEvent } from "react";
import type { ScaleLinear } from "d3-scale";
import { LINE_COLORS, LINE_DASHES, PROJECTION_PREFIX, changeKey, seriesColor } from "./model/style";
import { CHART_HEIGHT, MARGIN, CHART_WIDTH, arrowPoints, lineSegments, makeXAt } from "./model/layout";
import type { LanguageOutlookData } from "./model/types";

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
  const xAt = makeXAt(languages.length);
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / 10));

  // Draw the gridlines, then each language's lines, projection arrows and labels.
  return (
    <svg className="chart-surface" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} role="img" aria-label={model.title}>
      {/* One horizontal grid line and label per tick. */}
      {gridValues.map((gridValue) => (
        <g key={gridValue}>
          <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={yScale(gridValue)} y2={yScale(gridValue)} stroke="#ffffff40" />
          <text x={MARGIN.left - 6} y={yScale(gridValue) + 4} textAnchor="end" fontSize={12} fill="#fff">
            {gridValue}
          </text>
        </g>
      ))}

      {/* Draw each visible line as one or more segments, since gaps in the data break the line. */}
      {lines.map((line) =>
        visible[line]
          // One polyline per unbroken stretch.
          ? lineSegments(languages, line, xAt, yScale).map((points, index) => (
              <polyline
                key={`${line}-${index}`}
                points={points}
                fill="none"
                stroke={LINE_COLORS[line]}
                strokeWidth={1.5}
                strokeOpacity={0.45}
                strokeDasharray={LINE_DASHES[line]}
                strokeLinecap={LINE_DASHES[line] ? "round" : undefined}
                strokeLinejoin="round"
              />
            ))
          : null,
      )}

      {/* Draw each language's name, dots and arrows. */}
      {languages.map((lang, index) => (
        <g key={lang.name}>
          <text
            x={xAt(index)}
            y={CHART_HEIGHT - MARGIN.bottom + 16}
            textAnchor="end"
            fontSize={13}
            fill="#fff"
            transform={`rotate(-45 ${xAt(index)} ${CHART_HEIGHT - MARGIN.bottom + 16})`}
          >
            {lang.name}
          </text>
          {/* One dot (or arrow for projections) per series; hidden or missing values are skipped. */}
          {series.map((seriesName, s) => {
            const value = lang.values[seriesName];

            if (!visible[seriesName] || value == null) return null;
            const centerX = xAt(index);
            const centerY = yScale(value);

            if (seriesName.startsWith(PROJECTION_PREFIX)) {
              const change = lang.values[changeKey(seriesName)] ?? 0;
              const sign = change >= 0 ? "+" : "";

              return (
                <g key={seriesName}>
                  <polygon
                    points={arrowPoints(centerX, centerY, change)}
                    fill={seriesColor(seriesName, s)}
                    fillOpacity={0.5}
                    stroke="#4c4c4c"
                    strokeOpacity={0.5}
                    strokeWidth={0.8}
                    pointerEvents="none"
                  />
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={6}
                    fill={seriesColor(seriesName, s)}
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
                r={seriesName === "Year 2026" ? 7 : 5}
                fill={seriesColor(seriesName, s)}
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
