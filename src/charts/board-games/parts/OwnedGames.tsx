import type { OwnedGame } from "../model/types";
import type { useBestWeight } from "../state/useBestWeight";
import { gameKey } from "../state/useOwnedGames";
import FoundWeight from "./FoundWeight";

interface Props {
  games: OwnedGame[];
  best: ReturnType<typeof useBestWeight>;
  onRemove: (game: OwnedGame) => void;
  onUseWeight: (weight: number) => void;
}

/** The games you own, with a button that finds the weight preference ranking them highest. */
export default function OwnedGames({ games, best, onRemove, onUseWeight }: Props) {
  return (
    <section className="board-games-owned">
      <h3>My games ({games.length})</h3>
      {games.length === 0 && (
        <p className="muted">
          Click + on the games you own or love to collect them here, then find the weight preference that ranks them
          highest.
        </p>
      )}

      <ul>
        {games.map((game) => (
          <li key={gameKey(game)}>
            {game.title} <small>({game.releaseDate})</small>
            <button type="button" aria-label={`Remove ${game.title}`} onClick={() => onRemove(game)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      <button type="button" disabled={games.length === 0 || best.finding} onClick={() => void best.find()}>
        {best.finding ? "Finding…" : "Find My Weight Preference"}
      </button>
      {best.error && <p role="alert">{best.error}</p>}
      {best.found && <FoundWeight found={best.found} onUse={onUseWeight} />}
    </section>
  );
}
