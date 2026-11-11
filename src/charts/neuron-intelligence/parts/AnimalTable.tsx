import SortHeader from "../../../components/SortHeader";
import { NAME_KEY } from "../../useSort";
import { SCORE_KEY } from "../constants";
import type { ScoredAnimal, SortState } from "../types";
import AnimalRow from "./AnimalRow";

/** Ranked table of animals with sortable column headers. */
export default function AnimalTable({ rows, sorted }: { rows: ScoredAnimal[]; sorted: SortState }) {
  const maxScore = Math.max(...rows.map((scoredAnimal) => scoredAnimal.score));

  return (
    <div className="panel calc-table">
      <table>
        <thead>
          <tr>
            <SortHeader columnKey={SCORE_KEY} {...sorted}>
              #
            </SortHeader>
            <SortHeader columnKey={NAME_KEY} {...sorted}>
              Animal
            </SortHeader>
            <SortHeader columnKey="neuronsBillions" {...sorted}>
              Neurons (B)
            </SortHeader>
            <SortHeader columnKey="weightKg" {...sorted}>
              Weight (kg)
            </SortHeader>
            <th>Relative Score</th>
            <SortHeader columnKey={SCORE_KEY} {...sorted}>
              Score
            </SortHeader>
            <SortHeader columnKey="humanPercent" {...sorted}>
              % of Human
            </SortHeader>
          </tr>
        </thead>
        <tbody>
          {rows.map((scoredAnimal, index) => (
            <AnimalRow key={scoredAnimal.name} animal={scoredAnimal} rank={index + 1} maxScore={maxScore} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
