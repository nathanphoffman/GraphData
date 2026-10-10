import { useMemo, useState } from "react";
import "./styles.css";
import data from "../../../data/language-outlook.json";
import type { LanguageOutlookData, Tooltip } from "./types";
import { buildYScale } from "./layout";
import Legend from "./Legend";
import OutlookSvg from "./OutlookSvg";

const model = data as LanguageOutlookData;

export default function LanguageOutlook() {
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries([...model.series, ...model.lines].map((key) => [key, true])),
  );
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const yScale = useMemo(() => buildYScale(model, visible), [visible]);

  return (
    <div>
      <Legend model={model} visible={visible} onToggle={(key, on) => setVisible({ ...visible, [key]: on })} />
      <OutlookSvg
        model={model}
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
