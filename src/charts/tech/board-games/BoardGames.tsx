import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import "./styles.css";

/** The weight slider runs over BGG's weights; the server reads a preference of 0 as no preference. */
const MIN_WEIGHT = 1;
const MAX_WEIGHT = 5;
const WEIGHT_STEP = 0.05;
const DEFAULT_WEIGHT = 2;
const NO_PREFERENCE = 0;

const PAGE_SIZE = 50;

/** The search box and the weight slider wait this long after the last change before asking the server. */
const DEBOUNCE_MS = 300;

/** The score thresholds from the scraper's notes, as the words they mean. */
const SCORE_BANDS: [number, string][] = [[3, "phenomenal"], [2.5, "good"], [2, "decent"], [1, "meh"], [0, "probably bad"]];

interface Game {
  position: number;
  title: string;
  releaseDate: string;
  rank: number | null;
  average: number;
  weight: number;
  num: number;
  score: number;
}

interface Page {
  total: number;
  games: Game[];
}

/** The games you own are kept in this browser only. */
const OWNED_STORAGE_KEY = "board-games-owned";

interface OwnedGame {
  title: string;
  releaseDate: string;
}

interface BestWeight {
  best: { preference: number; total: number; games: (OwnedGame & { position: number })[] };
  tied: [number, number];
  noPreferenceTotal: number;
  missing: string[];
}

const gameKey = (game: OwnedGame) => `${game.title}|${game.releaseDate}`;

function loadOwned(): OwnedGame[] {
  try {
    const saved = JSON.parse(localStorage.getItem(OWNED_STORAGE_KEY) ?? "[]");

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const scoreWords = (score: number) => SCORE_BANDS.find(([minimum]) => score >= minimum)?.[1] ?? "";

/** Board games from BoardGameGeek ranked for a weight preference, one page at a time so the thousands of rows are never loaded together. */
export default function BoardGames() {
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const [preference, setPreference] = useState(DEFAULT_WEIGHT);
  const [anyWeight, setAnyWeight] = useState(false);
  const [search, setSearch] = useState("");
  const [typed, setTyped] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState(false);
  const [owned, setOwned] = useState<OwnedGame[]>(loadOwned);
  const [found, setFound] = useState<BestWeight | null>(null);
  const [finding, setFinding] = useState(false);
  const [findError, setFindError] = useState("");

  // Wait for a pause in typing before searching, and go back to the first page for the new search.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(typed);
      setPage(1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [typed]);

  // The same for the slider: the number shown follows it at once, but the list only changes once it stops moving.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreference(anyWeight ? NO_PREFERENCE : weight);
      setPage(1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [weight, anyWeight]);

  // Ask the server for the page whenever the preference, search or page changes; an older answer arriving late is ignored.
  useEffect(() => {
    let current = true;
    const query = new URLSearchParams({ preference: String(preference), page: String(page), pageSize: String(PAGE_SIZE), search });

    callApi<Page>(`/api/board-games?${query}`)
      .then((result) => current && (setData(result), setError(false)))
      .catch(() => current && setError(true));

    return () => {
      current = false;
    };
  }, [preference, search, page]);

  // Keep the owned list in the browser; a browser that blocks storage just forgets it.
  useEffect(() => {
    try {
      localStorage.setItem(OWNED_STORAGE_KEY, JSON.stringify(owned));
    } catch {
      // Storage can be blocked; the list still works until the page closes.
    }
  }, [owned]);

  const ownedKeys = new Set(owned.map(gameKey));

  const toggleOwned = (game: OwnedGame) => {
    const { title, releaseDate } = game;
    setFound(null);
    setOwned(ownedKeys.has(gameKey(game)) ? owned.filter((own) => gameKey(own) !== gameKey(game)) : [...owned, { title, releaseDate }]);
  };

  // Ask the server which weight puts the owned games highest, and show it.
  const findWeight = async () => {
    setFinding(true);
    setFindError("");

    try {
      setFound(await callApi<BestWeight>("/api/board-games/best-weight", "POST", { games: owned }));
    } catch (problem) {
      setFindError((problem as Error).message);
    } finally {
      setFinding(false);
    }
  };

  const useWeight = (preference: number) => {
    setAnyWeight(false);
    setWeight(preference);
  };

  const lastPage = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <div className="board-games">
      <p className="muted">
        Pick the weight that best matches what you like to play. It is not a filter: it only pushes games of that weight up the list, so a highly rated game of another weight can still show up, just lower. No preference (0) is not a copy of BGG; it punishes lower rated games more and rewards popular games more.
      </p>
      <div className="board-games-controls">
        <label>
          Weight preference: {anyWeight ? "none" : weight.toFixed(2)}{" "}
          <input type="range" min={MIN_WEIGHT} max={MAX_WEIGHT} step={WEIGHT_STEP} value={weight} disabled={anyWeight} onChange={(changeEvent) => setWeight(Number(changeEvent.target.value))} />
        </label>
        <label>
          <input type="checkbox" checked={anyWeight} onChange={(changeEvent) => setAnyWeight(changeEvent.target.checked)} /> Don't Prefer A Specific Weight
        </label>
        <input type="search" placeholder="Search by title…" value={typed} onChange={(changeEvent) => setTyped(changeEvent.target.value)} />
      </div>

      <section className="board-games-owned">
        <h3>My games ({owned.length})</h3>
        {owned.length === 0 && <p className="muted">Click + on the games you own or love to collect them here, then find the weight preference that ranks them highest.</p>}
        <ul>
          {owned.map((game) => (
            <li key={gameKey(game)}>
              {game.title} <small>({game.releaseDate})</small>
              <button type="button" aria-label={`Remove ${game.title}`} onClick={() => toggleOwned(game)}>✕</button>
            </li>
          ))}
        </ul>
        <button type="button" disabled={owned.length === 0 || finding} onClick={() => void findWeight()}>{finding ? "Finding…" : "Find My Weight Preference"}</button>
        {findError && <p role="alert">{findError}</p>}
        {found && (
          <div className="board-games-found">
            <p>
              <strong>Best weight: {found.best.preference.toFixed(2)}</strong>
              {found.tied[0] !== found.tied[1] && ` (${found.tied[0].toFixed(2)} to ${found.tied[1].toFixed(2)} tie)`}
              {" "}— your games add up to {found.best.total.toLocaleString()} (lower is better).{" "}
              <button type="button" onClick={() => useWeight(found.best.preference)}>Use this weight</button>
            </p>
            <p className="muted">
              Their places at that weight: {found.best.games.map((game) => `${game.title} #${game.position}`).join(", ")}.
              With no weight preference they add up to {found.noPreferenceTotal.toLocaleString()}.
              {found.missing.length > 0 && ` Not in the list (left out): ${found.missing.join(", ")}.`}
            </p>
          </div>
        )}
      </section>

      {error && <p>Could not load the games.</p>}
      {!data && !error && <p>Loading games…</p>}
      {data && (
        <>
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
                <th title="Under 1: probably bad. 1 to 2: meh. 2 to 2.5: decent. 2.5 to 3: good. 3 and up: phenomenal">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.games.map((game) => (
                <tr key={`${game.title}|${game.releaseDate}`} className={ownedKeys.has(gameKey(game)) ? "board-games-owned-row" : undefined}>
                  <td>
                    <button type="button" className="board-games-add" title={ownedKeys.has(gameKey(game)) ? "Remove from my games" : "Add to my games"} aria-pressed={ownedKeys.has(gameKey(game))} onClick={() => toggleOwned(game)}>
                      {ownedKeys.has(gameKey(game)) ? "✓" : "+"}
                    </button>
                  </td>
                  <td>{game.position}</td>
                  <td>{game.title}</td>
                  <td>{game.releaseDate}</td>
                  <td>{game.rank ?? ""}</td>
                  <td>{game.average.toFixed(2)}</td>
                  <td>{game.weight.toFixed(2)}</td>
                  <td>{game.num.toLocaleString()}</td>
                  <td>{game.score.toFixed(2)} <small>({scoreWords(game.score)})</small></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="board-games-pages">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {lastPage.toLocaleString()} ({data.total.toLocaleString()} games)</span>
            <button type="button" disabled={page >= lastPage} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
