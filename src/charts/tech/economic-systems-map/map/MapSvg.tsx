import { useMemo } from "react";
import { BOLD, CELL_H, CELL_W, COLORS, FONT_SIZE, HIGHLIGHT_INSET, HIGHLIGHT_STROKE, TITLE_BASELINE } from "../model/style";
import { GRID_H, GRID_W, GRID_X0, GRID_Y0, placeLabels } from "../model/layout";
import type { EconomicSystemsData } from "../model/types";
import GridCells from "./GridCells";
import StabilityBand from "./StabilityBand";
import UsOverlay from "./UsOverlay";
import CellNames from "./CellNames";
import FigureLabels from "./FigureLabels";
import Legend from "../panels/Legend";

const CHART_WIDTH = GRID_X0 + GRID_W + 8;
const CHART_HEIGHT = GRID_Y0 + GRID_H + 94;
const FONT = "system-ui, -apple-system, Segoe UI, sans-serif";

interface Props {
  model: EconomicSystemsData;
  showExamples: boolean;

  /** Grid position of the outline; fractional while a combo is shown. */
  highlight?: { col: number; row: number };
  onSelect: (names: string[]) => void;
}

/** The map itself: stacks the layers from grid (bottom) to figures (top). */
export default function MapSvg({ model, showExamples, highlight, onSelect }: Props) {
  const labels = useMemo(() => placeLabels(model, model.figures), [model]);

  return (
    <svg className="map-surface" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} role="img" aria-label={model.title} fontFamily={FONT}>
      <text x={GRID_X0} y={TITLE_BASELINE} fontSize={FONT_SIZE.title} fontWeight={BOLD} fill="#222">
        {model.title}
      </text>

      <GridCells model={model} onSelect={onSelect} />

      {/* Everything above the cells ignores clicks so they reach the cell underneath. */}
      <g pointerEvents="none">
        {highlight && (
          <rect
            x={GRID_X0 + highlight.col * CELL_W + HIGHLIGHT_INSET}
            y={GRID_Y0 + highlight.row * CELL_H + HIGHLIGHT_INSET}
            width={CELL_W - 2 * HIGHLIGHT_INSET}
            height={CELL_H - 2 * HIGHLIGHT_INSET}
            fill="none"
            stroke={COLORS.header}
            strokeWidth={HIGHLIGHT_STROKE}
          />
        )}

        <StabilityBand stability={model.stability} />
        <UsOverlay overlay={model.overlay} />
        <CellNames cells={model.cells} showExamples={showExamples} />
        {!showExamples && <FigureLabels labels={labels} />}
      </g>

      <Legend model={model} showExamples={showExamples} />
    </svg>
  );
}
