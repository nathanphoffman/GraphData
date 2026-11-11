import { xScale, yScale } from "../chart_scale";
import type { Confidence, Edition } from "../types";
import EditionLabels from "./EditionLabels";
import RangeWhisker from "./RangeWhisker";

const BAR_WIDTH = 44;
const CONFIDENCE_OPACITY: Record<Confidence, number> = { guess: 0.35, low: 0.55, medium: 0.9 };

/** One bar with its low-to-high range and labels for an edition; fainter bars mean less reliable data. */
export default function EditionBar({ edition, index }: { edition: Edition; index: number }) {
  return (
    <g>
      <rect
        x={xScale(index) - BAR_WIDTH / 2}
        y={yScale(edition.best)}
        width={BAR_WIDTH}
        height={yScale(0) - yScale(edition.best)}
        fill="#b45cff"
        opacity={CONFIDENCE_OPACITY[edition.confidence]}
      />
      <RangeWhisker index={index} low={edition.low} high={edition.high} />
      <EditionLabels edition={edition} index={index} />
    </g>
  );
}
