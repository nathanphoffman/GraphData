import { useMemo, useState } from "react";
import "./styles.css";
import { EntropyChart } from "./EntropyChart";
import { type Params, entropyChance, simulate, summarize } from "./simulate";

const PERCENT = 100;

type Values = Params & { samples: number };

/** A slider's range and how its value is shown. */
interface Control {
  key: keyof Values;
  label: string;
  math: string;
  min: number;
  max: number;
  step: number;
  digits: number;
}

const COMMIT_CONTROLS: Control[] = [
  { key: "commits", label: "Commits (Cₙ)", math: "n = 0 … Cₙ − 1", min: 10, max: 2000, step: 10, digits: 0 },
  { key: "commitImpact", label: "Commit Impact (Cᵢ)", math: "scales the quality change of each commit", min: 0.001, max: 0.5, step: 0.001, digits: 3 },
  { key: "baseCommits", label: "Base Commits (C_b)", math: "ln(C_b + n + e)", min: 1, max: 500, step: 1, digits: 0 },
];

const ENTROPY_CONTROLS: Control[] = [
  { key: "baseEntropy", label: "Base Entropy (E_b)", math: "Eₚ(n) = E_c · F · E_b", min: 0.001, max: 0.5, step: 0.001, digits: 3 },
  { key: "intuition", label: "Intuition (I)", math: "U = 1 + (1 − I)(e − 1)", min: 0, max: 1, step: 0.01, digits: 2 },
];

const SAMPLES_CONTROL: Control = { key: "samples", label: "Samples", math: "Monte Carlo runs", min: 10, max: 500, step: 10, digits: 0 };

const START: Values = { commits: 1350, commitImpact: 0.05, baseCommits: 300, baseEntropy: 0.061, startingQuality: 1, intuition: 0.75, samples: 250 };

/** Code quality entropy model page: a Monte Carlo simulation of how code quality drifts over many commits. */
export default function CodeQualityEntropy() {
  const [values, setValues] = useState<Values>(START);

  const { runs, summary, firstEntropy } = useMemo(() => {
    const { samples, ...params } = values;
    const runs = simulate(params, samples);
    return { runs, summary: summarize(runs), firstEntropy: entropyChance(params, 0, params.startingQuality) };
  }, [values]);

  const last = summary.average.length - 1;
  const stats = [
    { label: "Final Avg Q", value: `${(summary.average[last] * PERCENT).toFixed(1)}%`, className: "entropy-average-stat" },
    { label: "Min Q", value: `${(summary.low[last] * PERCENT).toFixed(1)}%`, className: "entropy-low-stat" },
    { label: "Max Q", value: `${(summary.high[last] * PERCENT).toFixed(1)}%`, className: "entropy-high-stat" },
    { label: "Avg Eₚ(0)", value: `${(firstEntropy * PERCENT).toFixed(2)}%`, className: "" },
  ];

  const slider = (control: Control) => (
    <label key={control.key} className="entropy-control">
      <span className="entropy-control-head">
        <span>{control.label}</span>
        <strong>{values[control.key].toFixed(control.digits)}</strong>
      </span>
      <span className="muted entropy-math">{control.math}</span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={values[control.key]}
        onChange={(event) => setValues({ ...values, [control.key]: Number(event.target.value) })}
      />
    </label>
  );

  return (
    <div className="entropy">
      <div className="entropy-controls">
        <div className="panel">
          <h3>Commit Parameters</h3>
          {COMMIT_CONTROLS.map(slider)}
        </div>
        <div className="panel">
          <h3>Entropy Parameters</h3>
          {ENTROPY_CONTROLS.map(slider)}
        </div>
        <div className="panel">
          <h3>Simulation</h3>
          {slider(SAMPLES_CONTROL)}
        </div>
      </div>

      <div className="panel">
        <div className="entropy-legend">
          <span>
            <i className="entropy-key entropy-key-average" /> Average Q
          </span>
          <span>
            <i className="entropy-key entropy-key-band" /> Min / Max band
          </span>
          <span>
            <i className="entropy-key entropy-key-run" /> Sample runs
          </span>
        </div>
        <EntropyChart runs={runs} {...summary} />
        <div className="entropy-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="entropy-stat">
              <div className={`entropy-stat-value ${stat.className}`}>{stat.value}</div>
              <div className="muted">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="muted entropy-footnote">{values.samples} samples completed</p>
      </div>
    </div>
  );
}
