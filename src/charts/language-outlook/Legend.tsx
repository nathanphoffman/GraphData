import { LINE_COLORS, LINE_LABELS, seriesColor } from "./style";
import type { LanguageOutlookData } from "./types";

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  onToggle: (key: string, on: boolean) => void;
}

/** Checkbox legend: one entry per dot series, then one per connecting line. */
export default function Legend({ model, visible, onToggle }: Props) {
  return (
    <div className="legend">
      {model.series.map((key, i) => (
        <label key={key}>
          <input type="checkbox" checked={visible[key]} onChange={(e) => onToggle(key, e.target.checked)} />
          <span className="swatch dot" style={{ background: seriesColor(key, i) }} />
          {key}
        </label>
      ))}
      {model.lines.map((key) => (
        <label key={key}>
          <input type="checkbox" checked={visible[key]} onChange={(e) => onToggle(key, e.target.checked)} />
          <span className="swatch line" style={{ borderTopColor: LINE_COLORS[key] }} />
          {LINE_LABELS[key] ?? key}
        </label>
      ))}
    </div>
  );
}
