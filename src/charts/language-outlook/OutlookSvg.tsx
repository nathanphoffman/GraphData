import type { MouseEvent } from "react";
import type { ScaleLinear } from "d3-scale";
import { LINE_COLORS, PROJECTION_CHANGE_KEY, PROJECTION_PREFIX, seriesColor } from "./style";
import { H, MARGIN, W, arrowPoints, lineSegments, makeXAt } from "./layout";
import type { LanguageOutlookData } from "./types";

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  yScale: ScaleLinear<number, number>;
  onTip: (event: MouseEvent, text: string) => void;
  onTipHide: () => void;
}

/** The plot: grid, connecting lines, then one column of dots/arrows per language. */
export default function OutlookSvg({ model, visible, yScale, onTip, onTipHide }: Props) {
  const { languages, series, lines } = model;
  const xAt = makeXAt(languages.length);
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / 10));

  return (
    <svg className="chart-surface" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={model.title}>
      {gridValues.map((v) => (
        <g key={v}>
          <line x1={MARGIN.left} x2={W - MARGIN.right} y1={yScale(v)} y2={yScale(v)} stroke="#ffffff40" />
          <text x={MARGIN.left - 6} y={yScale(v) + 4} textAnchor="end" fontSize={12} fill="#fff">
            {v}
          </text>
        </g>
      ))}

      {lines.map((key) =>
        visible[key]
          ? lineSegments(languages, key, xAt, yScale).map((points, n) => (
              <polyline
                key={`${key}-${n}`}
                points={points}
                fill="none"
                stroke={LINE_COLORS[key]}
                strokeWidth={1.5}
                strokeOpacity={0.45}
                strokeLinejoin="round"
              />
            ))
          : null,
      )}

      {languages.map((lang, i) => (
        <g key={lang.name}>
          <text
            x={xAt(i)}
            y={H - MARGIN.bottom + 16}
            textAnchor="end"
            fontSize={13}
            fill="#fff"
            transform={`rotate(-45 ${xAt(i)} ${H - MARGIN.bottom + 16})`}
          >
            {lang.name}
          </text>
          {series.map((key, s) => {
            const v = lang.values[key];
            if (!visible[key] || v == null) return null;
            const cx = xAt(i);
            const cy = yScale(v);
            if (key.startsWith(PROJECTION_PREFIX)) {
              const change = lang.values[PROJECTION_CHANGE_KEY] ?? 0;
              const sign = change >= 0 ? "+" : "";
              return (
                <polygon
                  key={key}
                  points={arrowPoints(cx, cy, change)}
                  fill={seriesColor(key, s)}
                  fillOpacity={0.85}
                  stroke="#4c4c4c"
                  strokeWidth={0.8}
                  onMouseMove={(e) =>
                    onTip(e, `${lang.name} - ${key}: ${v.toFixed(2)} (trend change ${sign}${change.toFixed(2)})`)
                  }
                  onMouseLeave={onTipHide}
                />
              );
            }
            return (
              <circle
                key={key}
                cx={cx}
                cy={cy}
                r={key === "Year 2026" ? 7 : 5}
                fill={seriesColor(key, s)}
                stroke="#4c4c4c"
                strokeWidth={1}
                onMouseMove={(e) => onTip(e, `${lang.name} - ${key}: ${v.toFixed(2)}`)}
                onMouseLeave={onTipHide}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
