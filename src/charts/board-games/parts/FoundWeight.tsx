import type { BestWeight } from "../model/types";

interface Props {
  found: BestWeight;
  onUse: (weight: number) => void;
}

/** The weight that ranks your games highest, how they place at it, and a button to use it. */
export default function FoundWeight({ found, onUse }: Props) {
  return (
    <div className="board-games-found">
      <p>
        <strong>Best weight: {found.best.preference.toFixed(2)}</strong>
        {found.tied[0] !== found.tied[1] && ` (${found.tied[0].toFixed(2)} to ${found.tied[1].toFixed(2)} tie)`} — your
        games earn {Math.round(found.best.points).toLocaleString()} points (higher is better; places near the top are
        worth far more).{" "}
        <button type="button" onClick={() => onUse(found.best.preference)}>
          Use this weight
        </button>
      </p>
      <p className="muted">
        Their places at that weight: {found.best.games.map((game) => `${game.title} #${game.position}`).join(", ")}. With
        no weight preference they earn {Math.round(found.noPreferencePoints).toLocaleString()}.
        {found.missing.length > 0 && ` Not in the list (left out): ${found.missing.join(", ")}.`}
      </p>
    </div>
  );
}
