import { type CSSProperties, useEffect, useState } from "react";
import { callApi } from "../../../api";
import { heat } from "../top-rankings/RankingCells";
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

/** The release year slider's steps: how many years back it shows (this year counting as the first), or null for every year. */
const YEAR_STEPS: { label: string; years: number | null }[] = [
  { label: "Show all", years: null },
  { label: "Last 25 years", years: 25 },
  { label: "Last 10 years", years: 10 },
  { label: "Last 5 years", years: 5 },
  { label: "Last 3 years", years: 3 },
  { label: "Last 2 years", years: 2 },
  { label: "This year", years: 1 },
];

/** The first release year a step shows from, or 0 for every year. */
const minYearOf = (step: number) => {
  const years = YEAR_STEPS[step].years;

  return years === null ? 0 : new Date().getFullYear() - years + 1;
};

/** The score that fills the colour scale from red to green. */
const TOP_SCORE = 3.5;

const MAX_WEIGHT_SHOWN = 5;

/** The controls you picked are kept in this browser too, next to your games. */
const SETTINGS_STORAGE_KEY = "board-games-settings";

interface Settings {
  preferWeight: boolean;
  weight: number;
  yearStep: number;
  onlyMine: boolean;
  search: string;
}

const DEFAULT_SETTINGS: Settings = { preferWeight: false, weight: DEFAULT_WEIGHT, yearStep: 0, onlyMine: false, search: "" };

/** What a first-time visitor can answer when asked which weight they prefer; a weight of null means they do not care. */
const FIRST_VISIT_CHOICES: { label: string; weight: number | null }[] = [
  { label: "Don't Care", weight: null },
  { label: "Light Games (1)", weight: 1 },
  { label: "Medium-Light Games (2)", weight: 2 },
  { label: "Medium Games (2.5)", weight: 2.5 },
  { label: "Medium-Heavy Games (3)", weight: 3 },
  { label: "Heavy Games (4)", weight: 4 },
  { label: "Extremely Heavy Games (5)", weight: 5 },
];

/** Whether the controls were ever saved in this browser; if not, it is the visitor's first time. */
function hasSavedSettings(): boolean {
  try {
    return localStorage.getItem(SETTINGS_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/** The saved controls, with anything missing or not making sense replaced by its default. */
function loadSettings(): Settings {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? "{}");
    const validWeight = typeof saved.weight === "number" && saved.weight >= MIN_WEIGHT && saved.weight <= MAX_WEIGHT;
    const validStep = Number.isInteger(saved.yearStep) && saved.yearStep >= 0 && saved.yearStep < YEAR_STEPS.length;

    return {
      preferWeight: saved.preferWeight === true,
      weight: validWeight ? saved.weight : DEFAULT_SETTINGS.weight,
      yearStep: validStep ? saved.yearStep : DEFAULT_SETTINGS.yearStep,
      onlyMine: saved.onlyMine === true,
      search: typeof saved.search === "string" ? saved.search : "",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Board games from BoardGameGeek ranked for a weight preference, one page at a time so the thousands of rows are never loaded together. */
export default function BoardGames() {
  const [saved] = useState(loadSettings);
  const [asked, setAsked] = useState(hasSavedSettings);
  const [weight, setWeight] = useState(saved.weight);
  const [preference, setPreference] = useState(saved.preferWeight ? saved.weight : NO_PREFERENCE);
  const [preferWeight, setPreferWeight] = useState(saved.preferWeight);
  const [search, setSearch] = useState(saved.search);
  const [typed, setTyped] = useState(saved.search);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState(false);
  const [owned, setOwned] = useState<OwnedGame[]>(loadOwned);
  const [found, setFound] = useState<BestWeight | null>(null);
  const [finding, setFinding] = useState(false);
  const [findError, setFindError] = useState("");
  const [onlyMine, setOnlyMine] = useState(saved.onlyMine);
  const [yearStep, setYearStep] = useState(saved.yearStep);
  const [minYear, setMinYear] = useState(minYearOf(saved.yearStep));

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
      setPreference(preferWeight ? weight : NO_PREFERENCE);
      setPage(1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [weight, preferWeight]);

  // The release year slider is debounced like the weight one.
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinYear(minYearOf(yearStep));
      setPage(1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [yearStep]);

  // The owned list only matters to the page while just my games are shown, so adding games the rest of the time does not reload it.
  const mineToShow = onlyMine ? owned : null;

  // Ask the server for the page whenever the preference, search or page changes; an older answer arriving late is ignored.
  useEffect(() => {
    let current = true;
    const query = new URLSearchParams({ preference: String(preference), page: String(page), pageSize: String(PAGE_SIZE), search, minYear: String(minYear) });

    // My games are all shown on one page, so they come from their own call.
    const request = mineToShow
      ? mineToShow.length === 0 ? Promise.resolve<Page>({ total: 0, games: [] }) : callApi<Page>("/api/board-games/mine", "POST", { games: mineToShow, preference, search, minYear })
      : callApi<Page>(`/api/board-games?${query}`);

    request
      .then((result) => current && (setData(result), setError(false)))
      .catch(() => current && setError(true));

    return () => {
      current = false;
    };
  }, [preference, search, page, minYear, onlyMine, mineToShow]);

  // Keep the owned list in the browser; a browser that blocks storage just forgets it.
  useEffect(() => {
    try {
      localStorage.setItem(OWNED_STORAGE_KEY, JSON.stringify(owned));
    } catch {
      // Storage can be blocked; the list still works until the page closes.
    }
  }, [owned]);

  // Keep the controls in the browser the same way, once the visitor has answered the first question.
  useEffect(() => {
    if (!asked) return;

    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ preferWeight, weight, yearStep, onlyMine, search: typed } satisfies Settings));
    } catch {
      // Storage can be blocked; the controls still work until the page closes.
    }
  }, [asked, preferWeight, weight, yearStep, onlyMine, typed]);

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
    setPreferWeight(true);
    setWeight(preference);
  };

  // Their answer fills in the weight controls and opens the main page.
  const answer = (chosen: number | null) => {
    setPreferWeight(chosen !== null);
    if (chosen !== null) setWeight(chosen);
    setPreference(chosen ?? NO_PREFERENCE);
    setPage(1);
    setAsked(true);
  };

  const lastPage = data && !onlyMine ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  if (!asked) {
    return (
      <div className="board-games board-games-welcome">
        <h2>What weight do you prefer?</h2>
        <p className="muted">Weight is how complex a game is, from 1 (light) to 5 (heavy). It re-ranks the list so games near your weight come first. You can change it any time.</p>
        <div className="board-games-choices">
          {FIRST_VISIT_CHOICES.map((choice) => <button type="button" key={choice.label} onClick={() => answer(choice.weight)}>{choice.label}</button>)}
        </div>
      </div>
    );
  }

  return (
    <div className="board-games">
      <p className="muted">
        Pick the weight that best matches what you like to play. It is not a filter: it only pushes games of that weight up the list, so a highly rated game of another weight can still show up, just lower. No preference (0) is not a copy of BGG; it punishes lower rated games more and rewards popular games more.
      </p>
      <div className="board-games-controls">
        <label>
          <input type="checkbox" checked={preferWeight} onChange={(changeEvent) => setPreferWeight(changeEvent.target.checked)} /> Prefer a Specific Weight
        </label>
        {preferWeight && (
          <label>
            Weight preference: {weight.toFixed(2)}{" "}
            <input type="range" min={MIN_WEIGHT} max={MAX_WEIGHT} step={WEIGHT_STEP} value={weight} onChange={(changeEvent) => setWeight(Number(changeEvent.target.value))} />
          </label>
        )}
        <label>
          Released: {YEAR_STEPS[yearStep].label}{" "}
          <input type="range" min={0} max={YEAR_STEPS.length - 1} step={1} value={yearStep} onChange={(changeEvent) => setYearStep(Number(changeEvent.target.value))} />
        </label>
        <label>
          <input type="checkbox" checked={onlyMine} onChange={(changeEvent) => { setOnlyMine(changeEvent.target.checked); setPage(1); }} /> Just show my games
        </label>
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

      <input type="search" className="board-games-search" placeholder="Search by title…" value={typed} onChange={(changeEvent) => setTyped(changeEvent.target.value)} />

      {error && <p>Could not load the games.</p>}
      {!data && !error && <p>Loading games…</p>}
      {data && (
        <>
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
              {data.games.map((game) => (
                <tr key={`${game.title}|${game.releaseDate}`} className={ownedKeys.has(gameKey(game)) ? "board-games-owned-row" : undefined}>
                  <td>
                    <button type="button" className="board-games-add" title={ownedKeys.has(gameKey(game)) ? "Remove from my games" : "Add to my games"} aria-pressed={ownedKeys.has(gameKey(game))} onClick={() => toggleOwned(game)}>
                      {ownedKeys.has(gameKey(game)) ? "✓" : "+"}
                    </button>
                  </td>
                  <td className="board-games-position">{game.position}</td>
                  <td className="board-games-title">{game.title}</td>
                  <td className="board-games-dim">{game.releaseDate}</td>
                  <td className="board-games-dim">{game.rank ?? ""}</td>
                  <td>{game.average.toFixed(2)}</td>
                  <td className="board-games-weight" style={{ "--weight": `${(game.weight / MAX_WEIGHT_SHOWN) * 100}%` } as CSSProperties}>{game.weight.toFixed(2)}</td>
                  <td className="board-games-dim">{game.num.toLocaleString()}</td>
                  <td><span className="board-games-score" style={heat(Math.min(game.score / TOP_SCORE, 1))}>{game.score.toFixed(2)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
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
