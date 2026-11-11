import { xScale, yScale } from "../chart_scale";
import type { Edition } from "../types";

const FONT_SIZE = 12;
const YEAR_FONT_SIZE = 11;
const NAME_FONT_WEIGHT = 600;
const HIGH_LABEL_GAP = 6;
const NAME_Y = 18;
const YEAR_Y = 33;
const YEAR_OPACITY = 0.7;

/** The best guess above an edition's whisker, and its name and year under the axis. */
export default function EditionLabels({ edition, index }: { edition: Edition; index: number }) {
  const centre = xScale(index);

  return (
    <>
      <text x={centre} y={yScale(edition.high) - HIGH_LABEL_GAP} textAnchor="middle" fontSize={FONT_SIZE} fill="currentColor">
        {edition.best}M
      </text>
      <text
        x={centre}
        y={yScale(0) + NAME_Y}
        textAnchor="middle"
        fontSize={FONT_SIZE}
        fontWeight={NAME_FONT_WEIGHT}
        fill="currentColor"
      >
        {edition.name}
      </text>
      <text
        x={centre}
        y={yScale(0) + YEAR_Y}
        textAnchor="middle"
        fontSize={YEAR_FONT_SIZE}
        fill="currentColor"
        opacity={YEAR_OPACITY}
      >
        {edition.year}
      </text>
    </>
  );
}
