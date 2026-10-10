import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import data from "../../../data/language-outlook.json";
import type { LanguageOutlookData } from "./types";
import { LINE_COLORS, LINE_LABELS, PROJECTION_CHANGE_KEY, PROJECTION_PREFIX, seriesColor } from "./style";

const model = data as LanguageOutlookData;

const W = 1100;
const H = 560;
const MARGIN = { left: 50, right: 10, top: 10, bottom: 90 };

interface Tooltip {
  x: number;
  y: number;
  text: string;
}

/** Arrow outline centred on (cx, cy); points up for growth and down for decline. */
function arrowPoints(cx: number, cy: number, change: number): string {
  const h = 10 + Math.min(40, Math.abs(change) * 6);
  const w = h * 0.55;
  const head = h * 0.5;
  const dir = change >= 0 ? -1 : 1;
  const pts: Array<[number, number]> = [
    [cx, cy + (dir * h) / 2],
    [cx - w / 2, cy + dir * (h / 2 - head)],
    [cx - w / 6, cy + dir * (h / 2 - head)],
    [cx - w / 6, cy - (dir * h) / 2],
    [cx + w / 6, cy - (dir * h) / 2],
    [cx + w / 6, cy + dir * (h / 2 - head)],
    [cx + w / 2, cy + dir * (h / 2 - head)],
  ];
  return pts.map((p) => p.join(",")).join(" ");
}

export default function LanguageOutlook() {
  const toggles = [...model.series, ...model.lines];
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggles.map((key) => [key, true])),
  );
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const { languages, series, lines } = model;
  const count = languages.length;

  const yScale = useMemo(() => {
    const shown: number[] = [];
    for (const lang of languages) {
      for (const key of toggles) {
        const v = lang.values[key];
        if (visible[key] && v != null) shown.push(v);
      }
    }
    const max = Math.max(10, Math.ceil(Math.max(...shown) / 10) * 10);
    return scaleLinear().domain([0, max]).range([H - MARGIN.bottom, MARGIN.top]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const xAt = (i: number) => MARGIN.left + ((i + 0.5) * (W - MARGIN.left - MARGIN.right)) / count;
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / 10));

  const showTip = (event: React.MouseEvent, text: string) =>
    setTooltip({ x: event.clientX + 12, y: event.clientY + 12, text });

  const linePaths = lines.map((key) => {
    const segments: string[] = [];
    let current: string[] = [];
    languages.forEach((lang, i) => {
      const v = lang.values[key];
      if (v == null) {
        if (current.length > 1) segments.push(current.join(" "));
        current = [];
      } else {
        current.push(`${xAt(i)},${yScale(v)}`);
      }
    });
    if (current.length > 1) segments.push(current.join(" "));
    return { key, segments };
  });

  return (
    <div>
      <div className="legend">
        {series.map((key, i) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={visible[key]}
              onChange={(e) => setVisible({ ...visible, [key]: e.target.checked })}
            />
            <span className="swatch dot" style={{ background: seriesColor(key, i) }} />
            {key}
          </label>
        ))}
        {lines.map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={visible[key]}
              onChange={(e) => setVisible({ ...visible, [key]: e.target.checked })}
            />
            <span className="swatch line" style={{ borderTopColor: LINE_COLORS[key] }} />
            {LINE_LABELS[key] ?? key}
          </label>
        ))}
      </div>

      <svg className="chart-surface" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={model.title}>
        {gridValues.map((v) => (
          <g key={v}>
            <line x1={MARGIN.left} x2={W - MARGIN.right} y1={yScale(v)} y2={yScale(v)} stroke="#ffffff40" />
            <text x={MARGIN.left - 6} y={yScale(v) + 4} textAnchor="end" fontSize={12} fill="#fff">
              {v}
            </text>
          </g>
        ))}

        {linePaths.map(({ key, segments }) =>
          visible[key]
            ? segments.map((points, n) => (
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
                      showTip(e, `${lang.name} - ${key}: ${v.toFixed(2)} (trend change ${sign}${change.toFixed(2)})`)
                    }
                    onMouseLeave={() => setTooltip(null)}
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
                  onMouseMove={(e) => showTip(e, `${lang.name} - ${key}: ${v.toFixed(2)}`)}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </g>
        ))}
      </svg>

      {tooltip && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
