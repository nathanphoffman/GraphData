import { LINE_COLORS, LINE_DASHES, seriesColor, seriesLabel } from "../model/style";
import type { LanguageOutlookData } from "../model/types";

/** The small swatch before a checkbox label: a colour dot for a series, a solid or dotted bar for a line. */
function swatchFor(model: LanguageOutlookData, seriesKey: string) {
  if (model.series.includes(seriesKey)) {
    return (
      <>
        <span className="swatch dot" style={{ background: seriesColor(seriesKey, model.series.indexOf(seriesKey)) }} />
        {seriesKey}
      </>
    );
  }

  return (
    <>
      <span
        className="swatch line"
        style={{
          borderTopColor: LINE_COLORS[seriesKey],
          borderTopStyle: LINE_DASHES[seriesKey] ? "dotted" : "solid",
        }}
      />
      {seriesLabel(seriesKey)}
    </>
  );
}

/** One checkbox that shows or hides a series or line on the chart. */
export default function SeriesCheckbox({
  model,
  seriesKey,
  checked,
  onToggle,
}: {
  model: LanguageOutlookData;
  seriesKey: string;
  checked: boolean;
  onToggle: (seriesKey: string, shown: boolean) => void;
}) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={(event) => onToggle(seriesKey, event.target.checked)} />
      {swatchFor(model, seriesKey)}
    </label>
  );
}
