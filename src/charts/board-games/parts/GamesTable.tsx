import type { CSSProperties } from "react";
import { heat } from "../../top-rankings/RankingCells";
import type { Game, OwnedGame } from "../model/types";
import { gameKey } from "../state/useOwnedGames";

/** The score that fills the colour scale from red to green. */
const TOP_SCORE = 3.5;

const MAX_WEIGHT_SHOWN = 5;
const PERCENT = 100;

interface Props {
  games: Game[];
  isOwned: (game: OwnedGame) => boolean;
  onToggleOwned: (game: OwnedGame) => void;
}

/** One page of ranked games, each with a button to add it to or remove it from the games you own. */
export default function GamesTable({ games, isOwned, onToggleOwned }: Props) {
  return (
    <div className="board-games-table">
      <table>
        <thead>
          <tr>
            <th title="Add to my games">+</th>
            <th>#</th>
            <th>Title</th>
            <th>Year</th>
            <th title="BGG's own rank">BGG</th>
            <th>Rating</th>
            <th>Weight</th>
            <th>Ratings</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={gameKey(game)} className={isOwned(game) ? "board-games-owned-row" : undefined}>
              <td>
                <button
                  type="button"
                  className="board-games-add"
                  title={isOwned(game) ? "Remove from my games" : "Add to my games"}
                  aria-pressed={isOwned(game)}
                  onClick={() => onToggleOwned(game)}
                >
                  {isOwned(game) ? "✓" : "+"}
                </button>
              </td>
              <td className="board-games-position">{game.position}</td>
              <td className="board-games-title">{game.title}</td>
              <td className="board-games-dim">{game.releaseDate}</td>
              <td className="board-games-dim">{game.rank ?? ""}</td>
              <td>{game.average.toFixed(2)}</td>
              <td
                className="board-games-weight"
                style={{ "--weight": `${(game.weight / MAX_WEIGHT_SHOWN) * PERCENT}%` } as CSSProperties}
              >
                {game.weight.toFixed(2)}
              </td>
              <td className="board-games-dim">{game.num.toLocaleString()}</td>
              <td>
                <span className="board-games-score" style={heat(Math.min(game.score / TOP_SCORE, 1))}>
                  {game.score.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
