import { useState } from "react";
import { ARROW_STYLE, PROJECTION_DOT_RADIUS, arrowPoints } from "./model/layout";
import { LEGEND_GROUPS, LINE_COLORS, LINE_DASHES, LINE_LABELS, PROJECTION_PREFIX, seriesColor } from "./model/style";
import type { LanguageOutlookData } from "./model/types";

/** The small arrow-and-dot picture in the key: its size and where the arrow and dot sit in it. */
const KEY_ARROW = { width: 16, height: 30, centerX: 8, centerY: 22 };

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  onToggle: (key: string, on: boolean) => void;
  sortKey: string;
  onSort: (key: string) => void;
}

/** One-row colour key for a group: overlapping circles for dot series, thick bars for lines. */
function ColourKey({ model, keys }: { model: LanguageOutlookData; keys: string[] }) {
  // One legend entry per series: projections get an arrow swatch, the rest a plain colour swatch.
  return (
    <div className="legend-key" aria-hidden="true">
      {/* One legend entry per series. */}
      {keys.map((key) => {
        if (key.startsWith(PROJECTION_PREFIX)) {
          // projection dots come with a faint arrow, as on the chart
          const color = seriesColor(key, model.series.indexOf(key));

          return (
            <svg key={key} className="key-arrow" width={KEY_ARROW.width} height={KEY_ARROW.height} viewBox={`0 0 ${KEY_ARROW.width} ${KEY_ARROW.height}`}>
              <title>{key}</title>
              <polygon
                points={arrowPoints(KEY_ARROW.centerX, KEY_ARROW.centerY, 1)}
                fill={color}
                fillOpacity={ARROW_STYLE.fillOpacity}
                stroke={ARROW_STYLE.stroke}
                strokeOpacity={ARROW_STYLE.strokeOpacity}
                strokeWidth={ARROW_STYLE.strokeWidth}
              />
              <circle cx={KEY_ARROW.centerX} cy={KEY_ARROW.centerY} r={PROJECTION_DOT_RADIUS} fill={color} stroke="#4c4c4c" strokeWidth={1} />
            </svg>
          );
        }

        if (model.series.includes(key)) {
          return (
            <span
              key={key}
              className="key-dot"
              style={{ background: seriesColor(key, model.series.indexOf(key)) }}
              title={key}
            />
          );
        }

        const dash = LINE_DASHES[key];
        const color = LINE_COLORS[key];

        // dotted lines: draw dots spaced like the chart's dash pattern (dot + gap)

        // Total length of one dash cycle (dash + gap lengths added up), used to size the swatch.
        const period = dash ? dash.split(" ").reduce((total, n) => total + Number(n), 0) : 0;

        return (
          <span
            key={key}
            className="key-bar"
            style={
              dash
                ? { backgroundImage: `radial-gradient(circle, ${color} 2px, transparent 2.5px)`, backgroundSize: `${period + 2}px 100%` }
                : { background: color }
            }
            title={LINE_LABELS[key] ?? key}
          />
        );
      })}
    </div>
  );
}

/** Checkbox legend: boxes in a grid, one per group; the checkboxes slide open under the description. */
export default function Legend({ model, visible, onToggle, sortKey, onSort }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const allKeys = [...model.series, ...model.lines];

  // Collect the keys that belong to each legend group.
  const sections = LEGEND_GROUPS.map((group) => ({
    title: group.title,
    description: group.description,
    keys: allKeys.filter((allKey) => LEGEND_GROUPS.find((g) => g.test(allKey)) === group),
  })).filter((section) => section.keys.length > 0);

  const labelOf = (key: string) => LINE_LABELS[key] ?? key;

  return (
    <div className="legend">
      <fieldset className="legend-group">
        <legend>Sort order</legend>
        <p className="legend-description">
          Orders the languages from left to right, highest first, by any one metric. Languages with no value for it go last.
        </p>
        <select className="sort-select" value={sortKey} onChange={(event) => onSort(event.target.value)}>
          {/* One dropdown group per legend group. */}
          {sections.map(({ title, keys }) => (
            <optgroup key={title} label={title}>
              {/* One dropdown entry per series. */}
              {keys.map((key) => (
                <option key={key} value={key}>
                  {labelOf(key)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </fieldset>
      {/* One box of checkboxes per legend group. */}
      {sections.map(({ title, description, keys }) => (
        <fieldset key={title} className="legend-group">
          <legend>{title}</legend>
          <ColourKey model={model} keys={keys} />
          <p className="legend-description">{description}</p>
          <button
            type="button"
            className="legend-toggle"
            aria-expanded={!!open[title]}
            onClick={() => setOpen({ ...open, [title]: !open[title] })}
          >
            <span className={open[title] ? "chevron open" : "chevron"}>▸</span>
            Filters ({keys.filter((key) => visible[key]).length}/{keys.length} shown)
          </button>
          <div className={open[title] ? "legend-panel open" : "legend-panel"}>
            <div className="legend-panel-inner">
              {/* One checkbox per series. */}
              {keys.map((key) => (
                <label key={key}>
                  <input type="checkbox" checked={visible[key]} onChange={(event) => onToggle(key, event.target.checked)} />
                  {model.series.includes(key) ? (
                    <>
                      <span className="swatch dot" style={{ background: seriesColor(key, model.series.indexOf(key)) }} />
                      {key}
                    </>
                  ) : (
                    <>
                      <span
                        className="swatch line"
                        style={{ borderTopColor: LINE_COLORS[key], borderTopStyle: LINE_DASHES[key] ? "dotted" : "solid" }}
                      />
                      {labelOf(key)}
                    </>
                  )}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}
