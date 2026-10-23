import { useMemo, useState } from "react";
import "./styles.css";
import { useSort } from "../../useSort";
import data from "../../../../data/intelligence/neuron-intelligence.json";
import type { Exponents, NeuronIntelligenceData, SortKey } from "./types";
import { DEFAULT_EXPONENTS, PLAUSIBLE_X, formatNeurons, scoreAnimals, sortAnimals } from "./calculate";

const model = data as NeuronIntelligenceData;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

/** Labelled slider for one of the two exponents. */
function Slider({ label, value, min, max, onChange }: SliderProps) {
  return (
    <label className="neuron-slider">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={0.05} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <strong>{value.toFixed(2)}</strong>
    </label>
  );
}

/** Neuron intelligence page: the exponent sliders and a ranked table of animals. */
export default function NeuronIntelligence() {
  const [exponents, setExponents] = useState<Exponents>(DEFAULT_EXPONENTS);
  const { sortKey, ascending, sortBy } = useSort<SortKey>("score");

  const rows = useMemo(
    () => sortAnimals(scoreAnimals(model.animals, exponents), sortKey, ascending),
    [exponents, sortKey, ascending],
  );

  const maxScore = Math.max(...rows.map((scoredAnimal) => scoredAnimal.score));

  const set = (key: keyof Exponents) => (value: number) => setExponents((prev) => ({ ...prev, [key]: value }));

  const outOfRange = exponents.x < PLAUSIBLE_X[0] || exponents.x > PLAUSIBLE_X[1];

  return (
    <div className="neuron">
      <div className="panel">
        <Slider label="Neuron Exponent (x):" value={exponents.x} min={0.5} max={3} onChange={set("x")} />
        <p className="neuron-formula">
          Stage 1: Score = Neurons<sup>{exponents.x.toFixed(2)}</sup> / Weight<sup>{exponents.w.toFixed(2)}</sup>
        </p>
        <Slider label="Weight Exponent (w):" value={exponents.w} min={0.25} max={1.5} onChange={set("w")} />
        {outOfRange && (
          <p className="neuron-warning">
            ⚠ Exponent outside plausible range ({PLAUSIBLE_X[0].toFixed(1)}–{PLAUSIBLE_X[1].toFixed(1)}) — ranking likely
            degrades
          </p>
        )}
        <Slider label="Functional Exponent (k):" value={exponents.k} min={0.5} max={3} onChange={set("k")} />
        <p className="neuron-formula">
          Stage 2: Intelligence ∝ Score<sup>{exponents.k.toFixed(2)}</sup>
        </p>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={() => sortBy("score")}>#</th>
              <th className="sortable" onClick={() => sortBy("name")}>Animal</th>
              <th className="sortable" onClick={() => sortBy("neuronsBillions")}>Neurons (B)</th>
              <th className="sortable" onClick={() => sortBy("weightKg")}>Weight (kg)</th>
              <th>Relative Score</th>
              <th className="sortable" onClick={() => sortBy("score")}>Score</th>
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
                    <div className="neuron-bar-fill" style={{ width: `${(scoredAnimal.score / maxScore) * 100}%` }} />
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
