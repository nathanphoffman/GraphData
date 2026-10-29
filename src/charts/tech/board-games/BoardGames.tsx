import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import "./styles.css";

/** The weight preferences to pick from; 0 is no preference. */
const WEIGHT_PREFERENCES = [0, 1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.25, 2.3, 2.4, 2.5, 2.6, 2.8, 3, 3.4, 3.5, 3.6, 3.8, 4, 4.5, 5];

const PAGE_SIZE = 50;

/** Typing in the search box waits this long before asking the server. */
const SEARCH_DELAY_MS = 300;

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

const scoreWords = (score: number) => SCORE_BANDS.find(([minimum]) => score >= minimum)?.[1] ?? "";

/** Board games from BoardGameGeek ranked for a weight preference, one page at a time so the thousands of rows are never loaded together. */
export default function BoardGames() {
  const [preference, setPreference] = useState(2);
  const [search, setSearch] = useState("");
  const [typed, setTyped] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState(false);

  // Wait for a pause in typing before searching, and go back to the first page for the new search.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(typed);
      setPage(1);
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [typed]);

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

  const lastPage = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <div className="board-games">
      <p className="muted">
        Pick the weight that best matches what you like to play. It is not a filter: it only pushes games of that weight up the list, so a highly rated game of another weight can still show up, just lower. No preference (0) is not a copy of BGG; it punishes lower rated games more and rewards popular games more.
      </p>
      <div className="board-games-controls">
        <label>
          Weight preference{" "}
          <select value={preference} onChange={(changeEvent) => { setPreference(Number(changeEvent.target.value)); setPage(1); }}>
            {WEIGHT_PREFERENCES.map((weight) => <option key={weight} value={weight}>{weight === 0 ? "None" : weight}</option>)}
          </select>
        </label>
        <input type="search" placeholder="Search by title…" value={typed} onChange={(changeEvent) => setTyped(changeEvent.target.value)} />
      </div>

      {error && <p>Could not load the games.</p>}
      {!data && !error && <p>Loading games…</p>}
      {data && (
        <>
          <table>
            <thead>
              <tr>
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
                <tr key={`${game.title}|${game.releaseDate}`}>
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
