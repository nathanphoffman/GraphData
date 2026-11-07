import { useStoredJson } from "../../../hooks/useStoredState";
import type { OwnedGame } from "../model/types";

/** The games you own are kept in this browser only. */
const OWNED_STORAGE_KEY = "board-games-owned";

export const gameKey = (game: OwnedGame) => `${game.title}|${game.releaseDate}`;

/** Anything saved that is not a list is dropped, so a damaged save starts the list empty. */
const parseOwned = (saved: unknown) => (Array.isArray(saved) ? (saved as OwnedGame[]) : null);

/** The games you own, remembered in this browser. Toggling adds a game that is not on the list and removes one that is. */
export function useOwnedGames() {
  const [games, setGames] = useStoredJson<OwnedGame[]>(OWNED_STORAGE_KEY, [], parseOwned);
  const keys = new Set(games.map(gameKey));

  const toggle = ({ title, releaseDate }: OwnedGame) => {
    const key = gameKey({ title, releaseDate });

    setGames(keys.has(key) ? games.filter((own) => gameKey(own) !== key) : [...games, { title, releaseDate }]);
  };

  return { games, has: (game: OwnedGame) => keys.has(gameKey(game)), toggle };
}
