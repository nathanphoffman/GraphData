import { useMemo, useState } from "react";
import "./styles.css";
import { NAME_KEY, useSort } from "../../useSort";
import data from "../../../../data/intelligence/neuron-intelligence.json";
import type { Exponents, NeuronIntelligenceData, SortKey } from "./types";
import { DEFAULT_EXPONENTS, PLAUSIBLE_X, formatNeurons, scoreAnimals, sortAnimals } from "./calculate";

const model = data as NeuronIntelligenceData;

const PERCENT = 100;
const SCORE_KEY = "score";
const SLIDER_STEP = 0.05;

/** How far each exponent slider can go. */
const NEURON_RANGE = { min: 0.5, max: 3 };
const WEIGHT_RANGE = { min: 0.25, max: 1.5 };
const FUNCTIONAL_RANGE = { min: 0.5, max: 3 };

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

/** Labelled slider for one of the two exponents. */
function Slider({ label, value, min: minValue, max: maxValue, onChange }: SliderProps) {
  return (
    <label className="neuron-slider">
      <span>{label}</span>
      <input type="range" min={minValue} max={maxValue} step={SLIDER_STEP} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <strong>{value.toFixed(2)}</strong>
    </label>
  );
}

/** Neuron intelligence page: the exponent sliders and a ranked table of animals. */
export default function NeuronIntelligence() {
  const [exponents, setExponents] = useState<Exponents>(DEFAULT_EXPONENTS);
  const { sortKey, ascending, sortBy } = useSort<SortKey>(SCORE_KEY);

  const rows = useMemo(
    () => sortAnimals(scoreAnimals(model.animals, exponents), sortKey, ascending),
    [exponents, sortKey, ascending],
  );

  const maxScore = Math.max(...rows.map((scoredAnimal) => scoredAnimal.score));

  // Returns a function that changes one exponent: the first call picks which exponent, the second call sets its value.
  const updateExponent = (exponentKey: keyof Exponents) => (value: number) => setExponents((prev) => ({ ...prev, [exponentKey]: value }));

  const outOfRange = exponents.x < PLAUSIBLE_X[0] || exponents.x > PLAUSIBLE_X[1];

  return (
    <div className="neuron">
      <div className="panel">
        <Slider label="Neuron Exponent (x):" value={exponents.x} min={NEURON_RANGE.min} max={NEURON_RANGE.max} onChange={updateExponent("x")} />
        <p className="neuron-formula">
          Stage 1: Score = Neurons<sup>{exponents.x.toFixed(2)}</sup> / Weight<sup>{exponents.w.toFixed(2)}</sup>
        </p>
        <Slider label="Weight Exponent (w):" value={exponents.w} min={WEIGHT_RANGE.min} max={WEIGHT_RANGE.max} onChange={updateExponent("w")} />
        {outOfRange && (
          <p className="neuron-warning">
            ⚠ Exponent outside plausible range ({PLAUSIBLE_X[0].toFixed(1)}–{PLAUSIBLE_X[1].toFixed(1)}) — ranking likely
            degrades
          </p>
        )}
        <Slider label="Functional Exponent (k):" value={exponents.k} min={FUNCTIONAL_RANGE.min} max={FUNCTIONAL_RANGE.max} onChange={updateExponent("k")} />
        <p className="neuron-formula">
          Stage 2: Intelligence ∝ Score<sup>{exponents.k.toFixed(2)}</sup>
        </p>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={() => sortBy(SCORE_KEY)}>#</th>
              <th className="sortable" onClick={() => sortBy(NAME_KEY)}>Animal</th>
              <th className="sortable" onClick={() => sortBy("neuronsBillions")}>Neurons (B)</th>
              <th className="sortable" onClick={() => sortBy("weightKg")}>Weight (kg)</th>
              <th>Relative Score</th>
              <th className="sortable" onClick={() => sortBy(SCORE_KEY)}>Score</th>
              <th className="sortable" onClick={() => sortBy("humanPercent")}>% of Human</th>
            </tr>
          </thead>
          <tbody>
            {/* One table row per animal, numbered by rank. */}
            {rows.map((scoredAnimal, index) => (
              <tr key={scoredAnimal.name}>
                <td className="neuron-rank">{index + 1}</td>
                <td className="neuron-name">{scoredAnimal.name}</td>
                <td>{formatNeurons(scoredAnimal.neuronsBillions)}</td>
                <td>{scoredAnimal.weightKg}</td>
                <td className="neuron-bar-cell">
                  <div className="neuron-bar-bg">
                    <div className="neuron-bar-fill" style={{ width: `${(scoredAnimal.score / maxScore) * PERCENT}%` }} />
                  </div>
                </td>
                <td className="neuron-score">{scoredAnimal.score.toExponential(2)}</td>
                <td className="neuron-score">{scoredAnimal.humanPercent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
