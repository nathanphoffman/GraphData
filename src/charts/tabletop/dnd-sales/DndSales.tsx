import data from "../../../../data/misc/dnd-sales.json";
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

const maxValue = Math.ceil(Math.max(...model.editions.map((edition) => edition.high)));

/** Editions are spaced evenly (oldest first) so close release years don't overlap. */
const SLOT = PLOT_W / model.editions.length;

/** Horizontal position for each edition, evenly spaced. */
const xScale = (index: number) => MARGIN.left + SLOT * (index + 0.5);

/** Vertical position for a sales number. */
const yScale = (value: number) => MARGIN.top + PLOT_H - (value / maxValue) * PLOT_H;

/** D&D sales page: a bar for each edition with the range of estimates. */
export default function DndSales() {
  const ticks = Array.from({ length: maxValue + 1 }, (_unused, index) => index);
  const barWidth = 44;

  return (
    <div>
      <p className="muted">
        {model.unit}. As of {model.asOf}. Bars are the best guess, whiskers are the low-high range, and fainter bars
        mean less reliable data.
      </p>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="D&D sales by edition" style={{ width: "100%", maxWidth: WIDTH }}>
        {/* One horizontal grid line per sales tick. */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={yScale(tick)} y2={yScale(tick)} stroke="currentColor" opacity={0.12} />
            <text x={MARGIN.left - 8} y={yScale(tick) + 4} textAnchor="end" fontSize={12} fill="currentColor">
              {tick}M
            </text>
          </g>
        ))}

        {/* One bar with its low-to-high range for each edition. */}
        {model.editions.map((edition, index) => (
          <g key={edition.id}>
            <rect
              x={xScale(index) - barWidth / 2}
              y={yScale(edition.best)}
              width={barWidth}
              height={yScale(0) - yScale(edition.best)}
              fill="#b45cff"
              opacity={CONFIDENCE_OPACITY[edition.confidence]}
            />
            <line x1={xScale(index)} x2={xScale(index)} y1={yScale(edition.low)} y2={yScale(edition.high)} stroke="currentColor" strokeWidth={2} />
            <line x1={xScale(index) - 6} x2={xScale(index) + 6} y1={yScale(edition.low)} y2={yScale(edition.low)} stroke="currentColor" strokeWidth={2} />
            <line x1={xScale(index) - 6} x2={xScale(index) + 6} y1={yScale(edition.high)} y2={yScale(edition.high)} stroke="currentColor" strokeWidth={2} />
            <text x={xScale(index)} y={yScale(edition.high) - 6} textAnchor="middle" fontSize={12} fill="currentColor">
              {edition.best}M
            </text>
            <text x={xScale(index)} y={yScale(0) + 18} textAnchor="middle" fontSize={12} fontWeight={600} fill="currentColor">
              {edition.name}
            </text>
            <text x={xScale(index)} y={yScale(0) + 33} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.7}>
              {edition.year}
            </text>
          </g>
        ))}
      </svg>

      <h2>How each number was reached</h2>
      {/* One line of explanation per edition. */}
      {model.editions.map((edition) => (
        <div key={edition.id} style={{ marginBottom: "1rem" }}>
          <strong>{edition.name}</strong> ({edition.year}): {edition.best}M best guess, range {edition.low}-{edition.high}M.{" "}
          <span className="muted">{CONFIDENCE_LABEL[edition.confidence]}.</span>
          <div>{edition.note}</div>
          {edition.sources.length > 0 && (
            <div className="muted">
              Sources:{" "}

              {/* List an edition's sources separated by commas. */}
              {edition.sources.map((source, index) => (
                <span key={source}>
                  {index > 0 && ", "}
                  <a href={model.sources[source].url} target="_blank" rel="noreferrer">
                    {model.sources[source].label}
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
