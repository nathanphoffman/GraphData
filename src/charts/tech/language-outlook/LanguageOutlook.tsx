import { useMemo, useState } from "react";
import "./styles.css";
import data from "../../../../data/language-outlook/language-outlook.json";
import type { LanguageOutlookData, LanguageRecord, Tooltip } from "./model/types";
import { HIDDEN_BY_DEFAULT_PREFIXES, NEWEST_YEAR_SERIES } from "./model/style";
import { buildYScale } from "./model/layout";
import Legend from "./Legend";
import OutlookSvg from "./OutlookSvg";
import QuickKey from "./QuickKey";
import TopTens from "./TopTens";

const model = data as LanguageOutlookData;

/** The tooltip sits this far right of and below the pointer. */
const TOOLTIP_OFFSET = 12;

/** Language outlook page: the chart, the legend and the sort. */
export default function LanguageOutlook() {
  // Start with every line visible except those hidden by default.
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    // One entry per series and line: visible, unless its name starts with a prefix that is hidden by default.
    Object.fromEntries([...model.series, ...model.lines].map((seriesKey) => [seriesKey, !HIDDEN_BY_DEFAULT_PREFIXES.some((prefix) => seriesKey.startsWith(prefix))])),
  );

  const [sortKey, setSortKey] = useState(NEWEST_YEAR_SERIES);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  // The sort and the key boxes stay out of the way until asked for.
  const [showSettings, setShowSettings] = useState(false);

  // Sort by the chosen column, highest first, with languages that have no value last.
  const sorted = useMemo(() => {
    const value = (lang: LanguageRecord) => lang.values[sortKey] ?? null;

    // Highest value first; languages with no value always go to the end.
    const byValue = (languageRecord: LanguageRecord, second: LanguageRecord) => {
      const [x, y] = [value(languageRecord), value(second)];

      if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1; // no value goes last

      return y - x;
    };

    return { ...model, languages: [...model.languages].sort(byValue) };
  }, [sortKey]);

  const yScale = useMemo(() => buildYScale(model, visible), [visible]);

  return (
    <div>
      <TopTens model={model} />
      <div className="settings-bar">
        <button type="button" className="settings-toggle" aria-expanded={showSettings} onClick={() => setShowSettings(!showSettings)}>
          <span aria-hidden="true">⚙</span> Settings and key
          <span className={showSettings ? "chevron open" : "chevron"}>▸</span>
        </button>
        <QuickKey />
      </div>
      <div className={showSettings ? "legend-panel open" : "legend-panel"}>
        <div className="legend-panel-inner">
          <Legend
            model={model}
            visible={visible}
            onToggle={(seriesKey, shown) => setVisible({ ...visible, [seriesKey]: shown })}
            sortKey={sortKey}
            onSort={setSortKey}
          />
        </div>
      </div>
      <OutlookSvg
        model={sorted}
        visible={visible}
        yScale={yScale}
        onTip={(event, text) => setTooltip({ x: event.clientX + TOOLTIP_OFFSET, y: event.clientY + TOOLTIP_OFFSET, text })}
        onTipHide={() => setTooltip(null)}
      />
      {tooltip && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}

    </div>
  );
}
