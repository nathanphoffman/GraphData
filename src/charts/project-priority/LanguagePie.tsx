import type { Ranking } from "../top-rankings/score";
import { type LanguageSlice, languageSlices, sliceColor } from "./languageTotals";

const PERCENT = 100;
const SIZE = 160;
const RADIUS = SIZE / 2;
const FULL_TURN = Math.PI * 2;

/** The point on the circle at this fraction of a full turn, starting at 12 o'clock. */
function pointAt(fraction: number): [number, number] {
  const angle = fraction * FULL_TURN - Math.PI / 2;

  return [RADIUS + RADIUS * Math.cos(angle), RADIUS + RADIUS * Math.sin(angle)];
}

/** The SVG path of one wedge, from the centre out to the edge and round to where the slice ends. */
function wedgePath(start: number, end: number): string {
  const [startX, startY] = pointAt(start);
  const [endX, endY] = pointAt(end);
  const longWay = end - start > 0.5 ? 1 : 0; // SVG arcs need to be told when the slice is over half the circle

  return `M ${RADIUS} ${RADIUS} L ${startX} ${startY} A ${RADIUS} ${RADIUS} 0 ${longWay} 1 ${endX} ${endY} Z`;
}

/** A pie of each language's share of all lines, with a legend beside it. */
function Pie({ slices }: { slices: LanguageSlice[] }) {
  let start = 0;

  return (
    <svg width={SIZE} height={SIZE} role="img" aria-label="Share of lines by language">
      {slices.map((slice) => {
        const end = start + slice.share;
        const wedge = (
          <path key={slice.language} d={wedgePath(start, end)} fill={sliceColor(slice.language)}>
            <title>{slice.language}</title>
          </path>
        );

        start = end;

        // A single language fills the whole circle, which a wedge path cannot draw.
        return slice.share >= 1 ? (
          <circle key={slice.language} cx={RADIUS} cy={RADIUS} r={RADIUS} fill={sliceColor(slice.language)} />
        ) : (
          wedge
        );
      })}
    </svg>
  );
}

/** The language pie for the whole ranking, or nothing when no project has language lines. */
export function LanguagePie({ ranking }: { ranking: Ranking }) {
  const slices = languageSlices(ranking);

  if (slices.length === 0) return null;

  return (
    <section className="language-pie">
      <div className="language-pie-body">
        <Pie slices={slices} />
        <ul>
          {slices.map((slice) => (
            <li key={slice.language}>
              <span className="language-pie-swatch" style={{ backgroundColor: sliceColor(slice.language) }} />
              {slice.language} {(slice.share * PERCENT).toFixed(1)}% ({slice.lines.toLocaleString("en-US")})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
