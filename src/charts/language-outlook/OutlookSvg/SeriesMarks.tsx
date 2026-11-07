import type { ScaleLinear } from "d3-scale";
import { changeKey, PROJECTION_PREFIX } from "../model/style";
import type { LanguageRecord } from "../model/types";
import { ProjectionMark, ValueDot } from "./PointMarks";
import type { TipProps } from "./tips";

interface Props extends TipProps {
  language: LanguageRecord;
  series: string[];
  visible: Record<string, boolean>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
}

/** The marks for one language: a dot (or an arrow for projections) per series, skipping hidden or missing values. */
export default function SeriesMarks({ language, series, visible, centerX, yScale, onTip, onTipHide }: Props) {
  return (
    <>
      {/* Each series that is shown gets a dot or an arrow, and the mark kind depends on its name. */}
      {series.map((seriesName, seriesIndex) => {
        const value = language.values[seriesName];

        if (!visible[seriesName] || value == null) return null;
        const mark = { languageName: language.name, seriesName, seriesIndex, value, centerX, centerY: yScale(value) };
        const tips = { onTip, onTipHide };

        if (!seriesName.startsWith(PROJECTION_PREFIX)) return <ValueDot key={seriesName} mark={mark} {...tips} />;

        return (
          <ProjectionMark key={seriesName} mark={mark} change={language.values[changeKey(seriesName)] ?? 0} {...tips} />
        );
      })}
    </>
  );
}
