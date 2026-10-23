import { useMemo, useState } from "react";
import "./styles.css";
import data from "../../../../data/language-outlook/language-outlook.json";
import type { LanguageOutlookData, LanguageRecord, Tooltip } from "./model/types";
import { HIDDEN_BY_DEFAULT_PREFIXES } from "./model/style";
import { buildYScale } from "./model/layout";
import Legend from "./Legend";
import OutlookSvg from "./OutlookSvg";

const model = data as LanguageOutlookData;

/** Language outlook page: the chart, the legend and the sort. */
export default function LanguageOutlook() {
  // Start with every line visible except those hidden by default.
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries([...model.series, ...model.lines].map((key) => [key, !HIDDEN_BY_DEFAULT_PREFIXES.some((prefix) => key.startsWith(prefix))])),
  );

  const [sortKey, setSortKey] = useState("Year 2026");
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

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
      <Legend
        model={model}
        visible={visible}
        onToggle={(key, on) => setVisible({ ...visible, [key]: on })}
        sortKey={sortKey}
        onSort={setSortKey}
      />
      <OutlookSvg
        model={sorted}
        visible={visible}
        yScale={yScale}
        onTip={(event, text) => setTooltip({ x: event.clientX + 12, y: event.clientY + 12, text })}
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
