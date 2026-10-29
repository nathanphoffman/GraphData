import { useState } from "react";
import { ARROW_STYLE, PROJECTION_DOT_RADIUS, arrowPoints } from "./model/layout";
import { LEGEND_GROUPS, LINE_COLORS, LINE_DASHES, LINE_LABELS, PROJECTION_PREFIX, seriesColor } from "./model/style";
import type { LanguageOutlookData } from "./model/types";

/** The small arrow-and-dot picture in the key: its size and where the arrow and dot sit in it. */
const KEY_ARROW = { width: 16, height: 30, centerX: 8, centerY: 22 };

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  onToggle: (seriesKey: string, shown: boolean) => void;
  sortKey: string;
  onSort: (seriesKey: string) => void;
}

/** One-row colour key for a group: overlapping circles for dot series, thick bars for lines. */
function ColourKey({ model, keys }: { model: LanguageOutlookData; keys: string[] }) {
  // One legend entry per series: projections get an arrow swatch, the rest a plain colour swatch.
  return (
    <div className="legend-key" aria-hidden="true">
      {keys.map((seriesKey) => { // One legend entry per series.

        if (seriesKey.startsWith(PROJECTION_PREFIX)) {
          // projection dots come with a faint arrow, as on the chart
          const color = seriesColor(seriesKey, model.series.indexOf(seriesKey));

          return (
            <svg key={seriesKey} className="key-arrow" width={KEY_ARROW.width} height={KEY_ARROW.height} viewBox={`0 0 ${KEY_ARROW.width} ${KEY_ARROW.height}`}>
              <title>{seriesKey}</title>
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

        if (model.series.includes(seriesKey)) {
          return (
            <span
              key={seriesKey}
              className="key-dot"
              style={{ background: seriesColor(seriesKey, model.series.indexOf(seriesKey)) }}
              title={seriesKey}
            />
          );
        }

        const dash = LINE_DASHES[seriesKey];
        const color = LINE_COLORS[seriesKey];

        // dotted lines: draw dots spaced like the chart's dash pattern (dot + gap)

        // Total length of one dash cycle (dash + gap lengths added up), used to size the swatch.
        const period = dash ? dash.split(" ").reduce((total, dashPart) => total + Number(dashPart), 0) : 0;

        return (
          <span
            key={seriesKey}
            className="key-bar"
            style={
              dash
                ? { backgroundImage: `radial-gradient(circle, ${color} 2px, transparent 2.5px)`, backgroundSize: `${period + 2}px 100%` }
                : { background: color }
            }

            title={LINE_LABELS[seriesKey] ?? seriesKey}
          />
        );
      })}

    </div>
  );
}

/** Checkbox legend: boxes in a grid, one per group; the checkboxes slide open under the description. */
export default function Legend({ model, visible, onToggle, sortKey, onSort }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [aboutOpen, setAboutOpen] = useState<Record<string, boolean>>({});
  const allKeys = [...model.series, ...model.lines];

  // Collect the keys that belong to each legend group.
  const sections = LEGEND_GROUPS.map((group) => ({
    title: group.title,
    description: group.description,
    // Keep the keys whose first matching legend group is this one.
    keys: allKeys.filter((allKey) => LEGEND_GROUPS.find((legendGroup) => legendGroup.test(allKey)) === group),
  })).filter((section) => section.keys.length > 0);

  const labelOf = (seriesKey: string) => LINE_LABELS[seriesKey] ?? seriesKey;

  return (
    <div className="legend">
      <fieldset className="legend-group">
        <legend>Sort order</legend>
        <p className="legend-description">
          Orders the languages from left to right, highest first, by any one metric. Languages with no value for it go last.
        </p>
        <select className="sort-select" value={sortKey} onChange={(event) => onSort(event.target.value)}>
          {sections.map(({ title, keys }) => ( // One dropdown group per legend group.
            <optgroup key={title} label={title}>
              {/* One dropdown entry per series. */}
              {keys.map((seriesKey) => (
                <option key={seriesKey} value={seriesKey}>
                  {labelOf(seriesKey)}
                </option>
              ))}

            </optgroup>
          ))}

        </select>
      </fieldset>
      {sections.map(({ title, description, keys }) => ( // One box of checkboxes per legend group.
        <fieldset key={title} className="legend-group">
          <legend>{title}</legend>
          <ColourKey model={model} keys={keys} />
          <button
            type="button"
            className="legend-toggle"
            aria-expanded={!!aboutOpen[title]}
            onClick={() => setAboutOpen({ ...aboutOpen, [title]: !aboutOpen[title] })}
          >
            <span className={aboutOpen[title] ? "chevron open" : "chevron"}>▸</span>
            About
          </button>
          <div className={aboutOpen[title] ? "legend-panel open" : "legend-panel"}>
            <div className="legend-panel-inner">
              <p className="legend-description">{description}</p>
            </div>
          </div>
          <button
            type="button"
            className="legend-toggle"
            aria-expanded={!!open[title]}
            onClick={() => setOpen({ ...open, [title]: !open[title] })}
          >
            <span className={open[title] ? "chevron open" : "chevron"}>▸</span>
            Filters ({keys.filter((seriesKey) => visible[seriesKey]).length}/{keys.length} shown)
          </button>
          <div className={open[title] ? "legend-panel open" : "legend-panel"}>
            <div className="legend-panel-inner">
              {keys.map((seriesKey) => ( // One checkbox per series.
                <label key={seriesKey}>
                  <input type="checkbox" checked={visible[seriesKey]} onChange={(event) => onToggle(seriesKey, event.target.checked)} />
                  {model.series.includes(seriesKey) ? (
                    <>
                      <span className="swatch dot" style={{ background: seriesColor(seriesKey, model.series.indexOf(seriesKey)) }} />
                      {seriesKey}
                    </>
                  ) : (
                    <>
                      <span
                        className="swatch line"
                        style={{ borderTopColor: LINE_COLORS[seriesKey], borderTopStyle: LINE_DASHES[seriesKey] ? "dotted" : "solid" }}
                      />
                      {labelOf(seriesKey)}
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
