import type { MouseEvent } from "react";
import type { ScaleLinear } from "d3-scale";
import { LINE_COLORS, LINE_DASHES, NEWEST_YEAR_SERIES, PROJECTION_PREFIX, changeKey, seriesColor } from "./model/style";
import { ARROW_STYLE, CHART_HEIGHT, MARGIN, CHART_WIDTH, PROJECTION_DOT_RADIUS, Y_ROUND_STEP, arrowPoints, lineSegments, makeXAt } from "./model/layout";
import type { LanguageOutlookData, LanguageRecord } from "./model/types";

/** Grid labels sit this far left of the axis and this far below their line, at this size. */
const GRID_LABEL_GAP = 6;
const GRID_LABEL_BASELINE = 4;
const GRID_FONT_SIZE = 12;

/** The lines between a language's dots. */
const LINE_WIDTH = 1.5;
const LINE_OPACITY = 0.45;

/** Language names run at an angle below the axis. */
const NAME_DROP = 16;
const NAME_FONT_SIZE = 13;
const NAME_ANGLE = -45;

/** Dots are this big, and the newest year's dots are a little bigger. */
const DOT_RADIUS = 5;
const FEATURED_DOT_RADIUS = 7;

type TipHandler = (event: MouseEvent, text: string) => void;

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  yScale: ScaleLinear<number, number>;
  onTip: TipHandler;
  onTipHide: () => void;
}

/** What the tooltip handlers need, shared by every dot. */
interface TipProps {
  onTip: TipHandler;
  onTipHide: () => void;
}

/** One horizontal grid line with its label, for each tick. */
function GridLines({ gridValues, yScale }: { gridValues: number[]; yScale: ScaleLinear<number, number> }) {
  return (
    <>
      {gridValues.map((gridValue) => (
        <g key={gridValue}>
          <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={yScale(gridValue)} y2={yScale(gridValue)} stroke="#ffffff30" strokeDasharray="2 5" />
          <text x={MARGIN.left - GRID_LABEL_GAP} y={yScale(gridValue) + GRID_LABEL_BASELINE} textAnchor="end" fontSize={GRID_FONT_SIZE} fill="#fff" fillOpacity={0.8}>
            {gridValue}
          </text>
        </g>
      ))}

    </>
  );
}

interface LineProps {
  line: string;
  languages: LanguageRecord[];
  xOfIndex: (index: number) => number;
  yScale: ScaleLinear<number, number>;
}

/** One visible line, drawn as a polyline for each unbroken stretch (gaps in the data break it). */
function SeriesLine({ line, languages, xOfIndex, yScale }: LineProps) {
  return (
    <>
      {lineSegments(languages, line, xOfIndex, yScale).map((points, index) => (
        <polyline
          key={`${line}-${index}`}
          points={points}
          fill="none"
          stroke={LINE_COLORS[line]}
          strokeWidth={LINE_WIDTH}
          strokeOpacity={LINE_OPACITY}
          strokeDasharray={LINE_DASHES[line]}
          strokeLinecap={LINE_DASHES[line] ? "round" : undefined}
          strokeLinejoin="round"
        />
      ))}

    </>
  );
}

interface MarkProps extends TipProps {
  languageName: string;
  seriesName: string;
  seriesIndex: number;
  value: number;
  centerX: number;
  centerY: number;
}

/** A projection: a faint arrow for the trend change with a dot on the value. */
function ProjectionMark({ languageName, seriesName, seriesIndex, value, centerX, centerY, change, onTip, onTipHide }: MarkProps & { change: number }) {
  const sign = change >= 0 ? "+" : "";

  return (
    <g>
      <polygon
        points={arrowPoints(centerX, centerY, change)}
        fill={seriesColor(seriesName, seriesIndex)}
        fillOpacity={ARROW_STYLE.fillOpacity}
        stroke={ARROW_STYLE.stroke}
        strokeOpacity={ARROW_STYLE.strokeOpacity}
        strokeWidth={ARROW_STYLE.strokeWidth}
        pointerEvents="none"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={PROJECTION_DOT_RADIUS}
        fill={seriesColor(seriesName, seriesIndex)}
        stroke="#4c4c4c"
        strokeWidth={1}

        // Show the value and its trend change in the tooltip.
        onMouseMove={(event) => onTip(event, `${languageName} - ${seriesName}: ${value.toFixed(2)} (trend change ${sign}${change.toFixed(2)})`)}
        onMouseLeave={onTipHide}
      />
    </g>
  );
}

/** The newest year's dot is drawn bigger so it stands out from the older years on the same line. */
function ValueDot({ languageName, seriesName, seriesIndex, value, centerX, centerY, onTip, onTipHide }: MarkProps) {
  return (
    <circle
      cx={centerX}
      cy={centerY}
      r={seriesName === NEWEST_YEAR_SERIES ? FEATURED_DOT_RADIUS : DOT_RADIUS}
      fill={seriesColor(seriesName, seriesIndex)}
      stroke="#4c4c4c"
      strokeWidth={1}
      onMouseMove={(event) => onTip(event, `${languageName} - ${seriesName}: ${value.toFixed(2)}`)}
      onMouseLeave={onTipHide}
    />
  );
}

interface ColumnProps extends TipProps {
  language: LanguageRecord;
  series: string[];
  visible: Record<string, boolean>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
}

/** The marks for one language: a dot (or an arrow for projections) per series, skipping hidden or missing values. */
function SeriesMarks({ language, series, visible, centerX, yScale, onTip, onTipHide }: ColumnProps) {
  return (
    <>
      {/* Each series that is shown gets a dot or an arrow, and the mark kind depends on its name. */}
      {series.map((seriesName, seriesIndex) => {
        const value = language.values[seriesName];

        if (!visible[seriesName] || value == null) return null;
        const mark = { languageName: language.name, seriesName, seriesIndex, value, centerX, centerY: yScale(value), onTip, onTipHide };

        if (!seriesName.startsWith(PROJECTION_PREFIX)) return <ValueDot key={seriesName} {...mark} />;

        return <ProjectionMark key={seriesName} {...mark} change={language.values[changeKey(seriesName)] ?? 0} />;
      })}

    </>
  );
}

/** A language's name, tilted so long names fit under the axis. */
function LanguageName({ name, centerX }: { name: string; centerX: number }) {
  const baseline = CHART_HEIGHT - MARGIN.bottom + NAME_DROP;

  return (
    <text x={centerX} y={baseline} textAnchor="end" fontSize={NAME_FONT_SIZE} fontWeight={500} fill="#fff" transform={`rotate(${NAME_ANGLE} ${centerX} ${baseline})`}>
      {name}
    </text>
  );
}

/** The plot: grid, connecting lines, then one column of dots per language. */
export default function OutlookSvg({ model, visible, yScale, onTip, onTipHide }: Props) {
  const { languages, series, lines } = model;
  const xOfIndex = makeXAt(languages.length);
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / Y_ROUND_STEP));

  return (
    <svg className="chart-surface" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} role="img" aria-label={model.title}>
      <GridLines gridValues={gridValues} yScale={yScale} />
      {lines.filter((line) => visible[line]).map((line) => <SeriesLine key={line} line={line} languages={languages} xOfIndex={xOfIndex} yScale={yScale} />)} {/* Only the visible lines are drawn. */}

      {languages.map((language, index) => ( // Each language gets its name and its dots and arrows.
        <g key={language.name}>
          <LanguageName name={language.name} centerX={xOfIndex(index)} />
          <SeriesMarks language={language} series={series} visible={visible} centerX={xOfIndex(index)} yScale={yScale} onTip={onTip} onTipHide={onTipHide} />
        </g>
      ))}

    </svg>
  );
}
