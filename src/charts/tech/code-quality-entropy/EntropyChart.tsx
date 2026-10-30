interface Props {
  runs: number[][];
  average: number[];
  low: number[];
  high: number[];
}

const WIDTH = 860;
const HEIGHT = 440;
const PAD = { top: 16, right: 16, bottom: 40, left: 52 };
const PLOT_WIDTH = WIDTH - PAD.left - PAD.right;
const PLOT_HEIGHT = HEIGHT - PAD.top - PAD.bottom;

/** The grid has a line every tenth, and a label every other one. */
const TENTHS = 10;
const LABEL_EVERY = 2;
const PERCENT = 100;

/** How many of the runs are drawn as thin lines behind the average. */
const SHOWN_RUNS = 30;

/** The path through a series, one point per commit. */
function line(values: number[], x: (index: number) => number, y: (value: number) => number): string {
  return values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)},${y(value).toFixed(1)}`).join("");
}

/** Quality over commits: some runs faintly, the lowest-to-highest band, and the average on top. */
export function EntropyChart({ runs, average, low, high }: Props) {
  const steps = average.length;
  const x = (index: number) => PAD.left + (index / Math.max(steps - 1, 1)) * PLOT_WIDTH;
  const y = (value: number) => PAD.top + (1 - value) * PLOT_HEIGHT;
  const ticks = Array.from({ length: TENTHS + 1 }, (_, tick) => tick);
  const commitAt = (tick: number) => Math.round((tick / TENTHS) * (steps - 1));
  const backwards = high.map((_, index) => `L${x(steps - 1 - index).toFixed(1)},${y(high[steps - 1 - index]).toFixed(1)}`).join("");
  const band = `${line(low, x, y)}${backwards}Z`;

  return (
    <svg className="entropy-svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Quality over commits">
      {ticks.map((tick) => (
        <g key={tick}>
          <line className="entropy-grid" x1={PAD.left} x2={PAD.left + PLOT_WIDTH} y1={y(tick / TENTHS)} y2={y(tick / TENTHS)} />
          <line className="entropy-grid" x1={x(commitAt(tick))} x2={x(commitAt(tick))} y1={PAD.top} y2={PAD.top + PLOT_HEIGHT} />
          {tick % LABEL_EVERY === 0 && (
            <>
              <text className="entropy-label" x={PAD.left - 8} y={y(tick / TENTHS) + 4} textAnchor="end">
                {(tick * PERCENT) / TENTHS}%
              </text>
              <text className="entropy-label" x={x(commitAt(tick))} y={PAD.top + PLOT_HEIGHT + 20} textAnchor="middle">
                {commitAt(tick)}
              </text>
            </>
          )}
        </g>
      ))}

      {runs.slice(0, SHOWN_RUNS).map((run, position) => (
        // The runs are replaced as a whole, so a run's position is a stable key.
        <path key={position} className="entropy-run" d={line(run, x, y)} />
      ))}
      <path className="entropy-band" d={band} />
      <line className="entropy-half" x1={PAD.left} x2={PAD.left + PLOT_WIDTH} y1={y(0.5)} y2={y(0.5)} />
      <path className="entropy-average" d={line(average, x, y)} />

      <text className="entropy-label" x={PAD.left + PLOT_WIDTH / 2} y={HEIGHT - 4} textAnchor="middle">
        commits (n)
      </text>
      <text className="entropy-label" transform={`translate(12 ${PAD.top + PLOT_HEIGHT / 2}) rotate(-90)`} textAnchor="middle">
        quality Qn
      </text>
    </svg>
  );
}
