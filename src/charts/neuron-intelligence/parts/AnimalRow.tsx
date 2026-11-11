import { formatNeurons } from "../calculate";
import { PERCENT } from "../constants";
import type { ScoredAnimal } from "../types";

/** One animal's row: its rank, name, neurons, weight, a bar for its score relative to the best, and its numbers. */
export default function AnimalRow({ animal, rank, maxScore }: { animal: ScoredAnimal; rank: number; maxScore: number }) {
  return (
    <tr>
      <td className="neuron-rank">{rank}</td>
      <td className="neuron-name">{animal.name}</td>
      <td>{formatNeurons(animal.neuronsBillions)}</td>
      <td>{animal.weightKg}</td>
      <td className="neuron-bar-cell">
        <div className="neuron-bar-bg">
          <div className="neuron-bar-fill" style={{ width: `${(animal.score / maxScore) * PERCENT}%` }} />
        </div>
      </td>
      <td className="neuron-score">{animal.score.toExponential(2)}</td>
      <td className="neuron-score">{animal.humanPercent.toFixed(2)}%</td>
    </tr>
  );
}
