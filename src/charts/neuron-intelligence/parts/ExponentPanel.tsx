import { PLAUSIBLE_X } from "../calculate";
import type { Exponents } from "../types";
import ExponentSlider from "./ExponentSlider";

/** How far each exponent slider can go. */
const NEURON_RANGE = { min: 0.5, max: 3 };
const WEIGHT_RANGE = { min: 0.25, max: 1.5 };
const FUNCTIONAL_RANGE = { min: 0.5, max: 3 };

interface Props {
  exponents: Exponents;

  /** Returns a function that changes one exponent: the first call picks which exponent, the second sets its value. */
  updateExponent: (exponentKey: keyof Exponents) => (value: number) => void;
}

/** The three exponent sliders with the formula each one feeds. */
export default function ExponentPanel({ exponents, updateExponent }: Props) {
  const outOfRange = exponents.x < PLAUSIBLE_X[0] || exponents.x > PLAUSIBLE_X[1];

  return (
    <div className="panel">
      <ExponentSlider
        label="Neuron Exponent (x):"
        value={exponents.x}
        min={NEURON_RANGE.min}
        max={NEURON_RANGE.max}
        onChange={updateExponent("x")}
      />
      <p className="neuron-formula">
        Stage 1: Score = Neurons<sup>{exponents.x.toFixed(2)}</sup> / Weight<sup>{exponents.w.toFixed(2)}</sup>
      </p>
      <ExponentSlider
        label="Weight Exponent (w):"
        value={exponents.w}
        min={WEIGHT_RANGE.min}
        max={WEIGHT_RANGE.max}
        onChange={updateExponent("w")}
      />
      {outOfRange && (
        <p className="neuron-warning">
          ⚠ Exponent outside plausible range ({PLAUSIBLE_X[0].toFixed(1)}–{PLAUSIBLE_X[1].toFixed(1)}) — ranking likely
          degrades
        </p>
      )}

      <ExponentSlider
        label="Functional Exponent (k):"
        value={exponents.k}
        min={FUNCTIONAL_RANGE.min}
        max={FUNCTIONAL_RANGE.max}
        onChange={updateExponent("k")}
      />
      <p className="neuron-formula">
        Stage 2: Intelligence ∝ Score<sup>{exponents.k.toFixed(2)}</sup>
      </p>
    </div>
  );
}
