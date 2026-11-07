import type { ScaleLinear } from "d3-scale";
import { lineSegments } from "../model/layout";
import { LINE_COLORS, LINE_DASHES } from "../model/style";
import type { LanguageRecord } from "../model/types";

/** The lines between a language's dots. */
const LINE_WIDTH = 1.5;
const LINE_OPACITY = 0.45;

interface Props {
  line: string;
  languages: LanguageRecord[];
  xOfIndex: (index: number) => number;
  yScale: ScaleLinear<number, number>;
}

/** One visible line, drawn as a polyline for each unbroken stretch (gaps in the data break it). */
export default function SeriesLine({ line, languages, xOfIndex, yScale }: Props) {
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
