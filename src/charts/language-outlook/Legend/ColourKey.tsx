import type { CSSProperties } from "react";
import { LINE_COLORS, LINE_DASHES, PROJECTION_PREFIX, seriesColor, seriesLabel } from "../model/style";
import type { LanguageOutlookData } from "../model/types";
import ProjectionSwatch from "./ProjectionSwatch";

/** A line's key bar: solid colour, or for dotted lines dots spaced like the chart's dash pattern (dot + gap). */
function lineBarStyle(seriesKey: string): CSSProperties {
  const dash = LINE_DASHES[seriesKey];
  const color = LINE_COLORS[seriesKey];

  if (!dash) return { background: color };

  // Total length of one dash cycle (dash + gap lengths added up), used to size the swatch.
  const period = dash.split(" ").reduce((total, dashPart) => total + Number(dashPart), 0);

  return {
    backgroundImage: `radial-gradient(circle, ${color} 2px, transparent 2.5px)`,
    backgroundSize: `${period + 2}px 100%`,
  };
}

/** One entry of the key: an arrow swatch for projections, a coloured dot for other series, a bar for lines. */
function keyEntry(model: LanguageOutlookData, seriesKey: string) {
  const index = model.series.indexOf(seriesKey);

  if (seriesKey.startsWith(PROJECTION_PREFIX))
    return <ProjectionSwatch key={seriesKey} seriesKey={seriesKey} color={seriesColor(seriesKey, index)} />;

  if (index >= 0)
    return <span key={seriesKey} className="key-dot" style={{ background: seriesColor(seriesKey, index) }} title={seriesKey} />;

  return <span key={seriesKey} className="key-bar" style={lineBarStyle(seriesKey)} title={seriesLabel(seriesKey)} />;
}

/** One-row colour key for a group: overlapping circles for dot series, thick bars for lines. */
export default function ColourKey({ model, keys }: { model: LanguageOutlookData; keys: string[] }) {
  return (
    <div className="legend-key" aria-hidden="true">
      {keys.map((seriesKey) => keyEntry(model, seriesKey))}
    </div>
  );
}
