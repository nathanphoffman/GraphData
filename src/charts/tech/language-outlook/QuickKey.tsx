import { FIX_PREFIX, HEALTH_PREDICTION_PREFIX, LINE_COLORS, NEWEST_YEAR_SERIES, seriesColor } from "./model/style";

/** The few things you need to read the chart at a glance; the full key is in the settings. */
const ITEMS: Array<{ label: string; color: string; shape: "dot" | "bar" }> = [
  { label: "Newest year", color: seriesColor(NEWEST_YEAR_SERIES, 7), shape: "dot" },
  { label: "Older years", color: seriesColor("Year 2022", 3), shape: "dot" },
  { label: "Avg 2024-26", color: LINE_COLORS["Combined avg 2024-2026"] ?? "", shape: "bar" },
  { label: "Avg 2021-23", color: LINE_COLORS["Combined avg 2021-2023"] ?? "", shape: "bar" },
  { label: "Healthiness", color: LINE_COLORS["Healthiness (average all metrics)"] ?? "", shape: "bar" },
  { label: "10-yr projection", color: seriesColor(FIX_PREFIX, 0), shape: "dot" },
  { label: "Healthiness projection", color: seriesColor(HEALTH_PREDICTION_PREFIX, 0), shape: "dot" },
];

/** One short line: a colour swatch and a word or two for each thing on the chart. */
export default function QuickKey() {
  return (
    <ul className="quick-key" aria-label="Quick key">
      {ITEMS.map((item) => (
        <li key={item.label}>
          <span className={`quick-key-${item.shape}`} style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
