import type { Lines } from "../useProjections";

export function Legend({ lines, tapered }: { lines: Lines; tapered: boolean }) {
  return (
    <p className="muted weight-legend">
      <span className="key actual" /> weight (gaps filled in a straight line) <span className="key avg3" /> 3-day average
      <span className="key avg3-adjusted" /> 3-day average minus muscle gained <span className="key fit" /> trend curve <span className="key future-adjusted" /> muscle-adjusted trend and projection
      {lines.spread && (
        <>
          <span className="key spread-key" /> last week of projections: shaded range (darker where they bunch up), solid = best (lowest) and worst (highest), dotted = average. Purple is actual, cyan is muscle-adjusted
        </>
      )}
      {lines.allTrend && (
        <>
          <span className="key all-trend" /> all average trend (3 day projected all average = total loss, tapering; fainter lines start from yesterday and the day before) <span className="key all-trend-adjusted" /> same, muscle-adjusted
        </>
      )}
      {tapered && (
        <>
          <span className="key taper" /> projection from your monthly loss <span className="key taper-adjusted" /> same, minus muscle gained (muscle gain continues and slows at the same rate; total loss tends to 12x the first month)
        </>
      )}
      {lines.quadratic && (
        <>
          <span className="key future" /> Quadratic Projection (quadratic curve through the last 90 days, 90 days ahead)
        </>
      )}
      {lines.general && (
        <>
          <span className="key general" /> General Projection (average of the Quadratic Projection and the mean of the last week's 3 day projected all average trend lines)
        </>
      )}
    </p>
  );
}
