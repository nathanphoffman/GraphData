import type { ScaleLinear } from "d3-scale";
import { CHART_HEIGHT, CHART_WIDTH, makeXAt, Y_ROUND_STEP } from "./model/layout";
import type { LanguageOutlookData } from "./model/types";
import GridLines from "./OutlookSvg/GridLines";
import LanguageName from "./OutlookSvg/LanguageName";
import SeriesLine from "./OutlookSvg/SeriesLine";
import SeriesMarks from "./OutlookSvg/SeriesMarks";
import type { TipHandler } from "./OutlookSvg/tips";

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  yScale: ScaleLinear<number, number>;
  onTip: TipHandler;
  onTipHide: () => void;
}

/** The plot: grid, connecting lines, then one column of dots per language. */
export default function OutlookSvg({ model, visible, yScale, onTip, onTipHide }: Props) {
  const { languages, series, lines } = model;
  const xOfIndex = makeXAt(languages.length);
  const gridValues = yScale.ticks(Math.round(yScale.domain()[1] / Y_ROUND_STEP));

  return (
    <svg className="chart-surface" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} role="img" aria-label={model.title}>
      <GridLines gridValues={gridValues} yScale={yScale} />
      {/* Only the visible lines are drawn. */}
      {lines
        .filter((line) => visible[line])
        .map((line) => (
          <SeriesLine key={line} line={line} languages={languages} xOfIndex={xOfIndex} yScale={yScale} />
        ))}
      {/* Each language gets its name and its dots and arrows. */}
      {languages.map((language, index) => (
        <g key={language.name}>
          <LanguageName name={language.name} centerX={xOfIndex(index)} />
          <SeriesMarks
            language={language}
            series={series}
            visible={visible}
            centerX={xOfIndex(index)}
            yScale={yScale}
            onTip={onTip}
            onTipHide={onTipHide}
          />
        </g>
      ))}
    </svg>
  );
}
