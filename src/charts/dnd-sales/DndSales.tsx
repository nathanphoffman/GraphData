import data from "../../../data/misc/dnd-sales.json";
import type { Confidence, DndSalesData } from "./types";

const model = data as DndSalesData;

const WIDTH = 900;
const HEIGHT = 420;
const MARGIN = { top: 20, right: 24, bottom: 70, left: 56 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

const CONFIDENCE_OPACITY: Record<Confidence, number> = { guess: 0.35, low: 0.55, medium: 0.9 };
const CONFIDENCE_LABEL: Record<Confidence, string> = {
  guess: "Mostly a guess",
  low: "Low: community estimates",
  medium: "Medium: some hard data",
};

const maxValue = Math.ceil(Math.max(...model.editions.map((e) => e.high)));

/** Editions are spaced evenly (oldest first) so close release years don't overlap. */
const SLOT = PLOT_W / model.editions.length;
const x = (index: number) => MARGIN.left + SLOT * (index + 0.5);
const y = (value: number) => MARGIN.top + PLOT_H - (value / maxValue) * PLOT_H;

export default function DndSales() {
  const ticks = Array.from({ length: maxValue + 1 }, (_, i) => i);
  const barWidth = 44;

  return (
    <div>
      <p className="muted">
        {model.unit}. As of {model.asOf}. Bars are the best guess, whiskers are the low-high range, and fainter bars
        mean less reliable data.
      </p>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="D&D sales by edition" style={{ width: "100%", maxWidth: WIDTH }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={y(t)} y2={y(t)} stroke="currentColor" opacity={0.12} />
            <text x={MARGIN.left - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="currentColor">
              {t}M
            </text>
          </g>
        ))}
        {model.editions.map((e, i) => (
          <g key={e.id}>
            <rect
              x={x(i) - barWidth / 2}
              y={y(e.best)}
              width={barWidth}
              height={y(0) - y(e.best)}
              fill="#b45cff"
              opacity={CONFIDENCE_OPACITY[e.confidence]}
            />
            <line x1={x(i)} x2={x(i)} y1={y(e.low)} y2={y(e.high)} stroke="currentColor" strokeWidth={2} />
            <line x1={x(i) - 6} x2={x(i) + 6} y1={y(e.low)} y2={y(e.low)} stroke="currentColor" strokeWidth={2} />
            <line x1={x(i) - 6} x2={x(i) + 6} y1={y(e.high)} y2={y(e.high)} stroke="currentColor" strokeWidth={2} />
            <text x={x(i)} y={y(e.high) - 6} textAnchor="middle" fontSize={12} fill="currentColor">
              {e.best}M
            </text>
            <text x={x(i)} y={y(0) + 18} textAnchor="middle" fontSize={12} fontWeight={600} fill="currentColor">
              {e.name}
            </text>
            <text x={x(i)} y={y(0) + 33} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.7}>
              {e.year}
            </text>
          </g>
        ))}
      </svg>

      <h2>How each number was reached</h2>
      {model.editions.map((e) => (
        <div key={e.id} style={{ marginBottom: "1rem" }}>
          <strong>{e.name}</strong> ({e.year}): {e.best}M best guess, range {e.low}-{e.high}M.{" "}
          <span className="muted">{CONFIDENCE_LABEL[e.confidence]}.</span>
          <div>{e.note}</div>
          {e.sources.length > 0 && (
            <div className="muted">
              Sources:{" "}
              {e.sources.map((key, i) => (
                <span key={key}>
                  {i > 0 && ", "}
                  <a href={model.sources[key].url} target="_blank" rel="noreferrer">
                    {model.sources[key].label}
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
