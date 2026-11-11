import { xScale, yScale } from "../chart_scale";

/** The little caps on each end of a range whisker reach this far to each side. */
const WHISKER_CAP = 6;
const WHISKER_WIDTH = 2;

/** A vertical line from an edition's low to its high estimate, with a small cap on each end. */
export default function RangeWhisker({ index, low, high }: { index: number; low: number; high: number }) {
  const centre = xScale(index);

  return (
    <>
      <line x1={centre} x2={centre} y1={yScale(low)} y2={yScale(high)} stroke="currentColor" strokeWidth={WHISKER_WIDTH} />
      {[low, high].map((end) => (
        <line
          key={end}
          x1={centre - WHISKER_CAP}
          x2={centre + WHISKER_CAP}
          y1={yScale(end)}
          y2={yScale(end)}
          stroke="currentColor"
          strokeWidth={WHISKER_WIDTH}
        />
      ))}
    </>
  );
}
