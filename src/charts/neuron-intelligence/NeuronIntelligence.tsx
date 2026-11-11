import { useMemo, useState } from "react";
import "./styles.css";
import data from "../../../data/neuron-intelligence/neuron-intelligence.json";
import { useSort } from "../useSort";
import { DEFAULT_EXPONENTS, scoreAnimals, sortAnimals } from "./calculate";
import { SCORE_KEY } from "./constants";
import AnimalTable from "./parts/AnimalTable";
import ExponentPanel from "./parts/ExponentPanel";
import type { Exponents, NeuronIntelligenceData, SortKey } from "./types";

const model = data as NeuronIntelligenceData;

/** Neuron intelligence page: the exponent sliders and a ranked table of animals. */
export default function NeuronIntelligence() {
  const [exponents, setExponents] = useState<Exponents>(DEFAULT_EXPONENTS);
  const { sortKey, ascending, sortBy } = useSort<SortKey>(SCORE_KEY);

  const rows = useMemo(
    () => sortAnimals(scoreAnimals(model.animals, exponents), sortKey, ascending),
    [exponents, sortKey, ascending],
  );

  // Returns a function that changes one exponent: the first call picks which exponent, the second call sets its value.
  const updateExponent = (exponentKey: keyof Exponents) => (value: number) =>
    setExponents((prev) => ({ ...prev, [exponentKey]: value }));

  return (
    <div className="neuron">
      <ExponentPanel exponents={exponents} updateExponent={updateExponent} />
      <AnimalTable rows={rows} sorted={{ sortKey, ascending, onSort: sortBy }} />
    </div>
  );
}
