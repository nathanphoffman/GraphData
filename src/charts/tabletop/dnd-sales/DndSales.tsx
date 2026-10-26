import data from "../../../../data/dnd-sales/dnd-sales.json";
import type { Confidence, DndSalesData } from "./types";

const model = data as DndSalesData;

const WIDTH = 900;
const HEIGHT = 420;
const MARGIN = { top: 20, right: 24, bottom: 70, left: 56 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

const BAR_WIDTH = 44;

/** The middle of an edition's slot, as a share of the slot. */
const SLOT_MIDDLE = 0.5;

/** The little caps on each end of a range whisker reach this far to each side. */
const WHISKER_CAP = 6;

/** Text sizes and how far each label sits from the thing it names. */
const FONT_SIZE = 12;
const YEAR_FONT_SIZE = 11;
const NAME_FONT_WEIGHT = 600;
const TICK_LABEL_GAP = 8;
const TICK_LABEL_BASELINE = 4;
const HIGH_LABEL_GAP = 6;
const NAME_Y = 18;
const YEAR_Y = 33;

const GRID_OPACITY = 0.12;
const YEAR_OPACITY = 0.7;

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
const xScale = (index: number) => MARGIN.left + SLOT * (index + SLOT_MIDDLE);

/** Vertical position for a sales number. */
const yScale = (value: number) => MARGIN.top + PLOT_H - (value / maxValue) * PLOT_H;

/** D&D sales page: a bar for each edition with the range of estimates. */
export default function DndSales() {
  const ticks = Array.from({ length: maxValue + 1 }, (_unused, index) => index);

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
            <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={yScale(tick)} y2={yScale(tick)} stroke="currentColor" opacity={GRID_OPACITY} />
            <text x={MARGIN.left - TICK_LABEL_GAP} y={yScale(tick) + TICK_LABEL_BASELINE} textAnchor="end" fontSize={FONT_SIZE} fill="currentColor">
              {tick}M
            </text>
          </g>
        ))}

        {/* One bar with its low-to-high range for each edition. */}
        {model.editions.map((edition, index) => (
          <g key={edition.id}>
            <rect
              x={xScale(index) - BAR_WIDTH / 2}
              y={yScale(edition.best)}
              width={BAR_WIDTH}
              height={yScale(0) - yScale(edition.best)}
              fill="#b45cff"
              opacity={CONFIDENCE_OPACITY[edition.confidence]}
            />
            <line x1={xScale(index)} x2={xScale(index)} y1={yScale(edition.low)} y2={yScale(edition.high)} stroke="currentColor" strokeWidth={2} />
            <line x1={xScale(index) - WHISKER_CAP} x2={xScale(index) + WHISKER_CAP} y1={yScale(edition.low)} y2={yScale(edition.low)} stroke="currentColor" strokeWidth={2} />
            <line x1={xScale(index) - WHISKER_CAP} x2={xScale(index) + WHISKER_CAP} y1={yScale(edition.high)} y2={yScale(edition.high)} stroke="currentColor" strokeWidth={2} />
            <text x={xScale(index)} y={yScale(edition.high) - HIGH_LABEL_GAP} textAnchor="middle" fontSize={FONT_SIZE} fill="currentColor">
              {edition.best}M
            </text>
            <text x={xScale(index)} y={yScale(0) + NAME_Y} textAnchor="middle" fontSize={FONT_SIZE} fontWeight={NAME_FONT_WEIGHT} fill="currentColor">
              {edition.name}
            </text>
            <text x={xScale(index)} y={yScale(0) + YEAR_Y} textAnchor="middle" fontSize={YEAR_FONT_SIZE} fill="currentColor" opacity={YEAR_OPACITY}>
              {edition.year}
            </text>
          </g>
        ))}
      </svg>

      <h2>How each number was reached</h2>
      {model.editions.map((edition) => ( // One line of explanation per edition.
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
