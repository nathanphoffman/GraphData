import { useDebounced } from "../../hooks/useDebounced";
import "./styles.css";
import { NO_PREFERENCE, PAGE_SIZE } from "./model/constants";
import type { OwnedGame } from "./model/types";
import { minYearOf } from "./model/yearSteps";
import GamesTable from "./parts/GamesTable";
import OwnedGames from "./parts/OwnedGames";
import Pagination from "./parts/Pagination";
import WeightControls from "./parts/WeightControls";
import WelcomeQuestion from "./parts/WelcomeQuestion";
import { useBestWeight } from "./state/useBestWeight";
import { useGamePage } from "./state/useGamePage";
import { useOwnedGames } from "./state/useOwnedGames";
import { usePageNumber } from "./state/usePageNumber";
import { useSavedSettings } from "./state/useSavedSettings";

/** Board games from BoardGameGeek ranked for a weight preference, one page at a time so the thousands of rows are never loaded together. */
export default function BoardGames() {
  const { settings, update, asked, markAsked } = useSavedSettings();
  const [search] = useDebounced(settings.search);
  const [preference, setPreference] = useDebounced(settings.preferWeight ? settings.weight : NO_PREFERENCE);
  const [minYear] = useDebounced(minYearOf(settings.yearStep));
  const [page, setPage] = usePageNumber(`${search}|${preference}|${minYear}|${settings.onlyMine}`);
  const owned = useOwnedGames();
  const best = useBestWeight(owned.games);

  // The owned list only matters to the page while just my games are shown, so adding games the rest of the time does not reload it.
  const mineToShow = settings.onlyMine ? owned.games : null;
  const { data, error } = useGamePage({ preference, search, page, minYear, mineToShow });
  const lastPage = data && !settings.onlyMine ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  // Their answer fills in the weight controls and opens the main page, with no wait for the list to follow.
  const answer = (chosen: number | null) => {
    update(chosen === null ? { preferWeight: false } : { preferWeight: true, weight: chosen });
    setPreference(chosen ?? NO_PREFERENCE);
    markAsked();
  };

  // Changing the games you own makes an earlier "best weight" answer stale.
  const toggleOwned = (game: OwnedGame) => {
    best.clear();
    owned.toggle(game);
  };

  if (!asked) return <WelcomeQuestion onAnswer={answer} />;

  return (
    <div className="board-games">
      <p className="muted">
        Pick the weight that best matches what you like to play. It is not a filter: it only pushes games of that weight
        up the list, so a highly rated game of another weight can still show up, just lower. No preference (0) is not a
        copy of BGG; it punishes lower rated games more and rewards popular games more.
      </p>
      <WeightControls settings={settings} onChange={update} />
      <OwnedGames
        games={owned.games}
        best={best}
        onRemove={toggleOwned}
        onUseWeight={(weight) => update({ preferWeight: true, weight })}
      />
      <input
        type="search"
        className="board-games-search"
        placeholder="Search by title…"
        value={settings.search}
        onChange={(changeEvent) => update({ search: changeEvent.target.value })}
      />

      {error && <p>Could not load the games.</p>}
      {!data && !error && <p>Loading games…</p>}
      {data && (
        <>
          <GamesTable games={data.games} isOwned={owned.has} onToggleOwned={toggleOwned} />
          <Pagination page={page} lastPage={lastPage} total={data.total} onPage={setPage} />
        </>
      )}
    </div>
  );
}
