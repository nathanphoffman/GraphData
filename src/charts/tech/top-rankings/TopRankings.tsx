import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callApi } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { ACTIVE_CLASS } from "../../classNames";
import { useAuth } from "../../../auth/useAuth";
import { RankingEditor } from "./RankingEditor";
import { EPISODIC_LABEL, RankingTable, type Sort, firstSort } from "./RankingTable";
import "./styles.css";
import { type Ranking, isText } from "./score";

/** The ranking that has its own page, so it is left out of the tabs here. */
export const PROJECT_PRIORITY_ID = "project-priority";

/** Top rankings page: buttons along the top swap which ranking table is shown. */
export default function TopRankings() {
  const [rankings, setRankings] = useState<Ranking[] | null>(null);
  const [error, setError] = useState(false);

  // The picked ranking lives in the URL hash (#video-games) so a link or a reload lands on the same table.
  const { hash } = useLocation();
  const navigate = useNavigate();
  const pickedId = hash.slice(1);
  const [showScore, setShowScore] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>(firstSort("rank"));

  // Logged in means the table cells can be clicked and edited in place.
  const auth = useAuth();

  const load = useCallback(async () => {
    const data = await callApi<{ rankings: Ranking[] }>("/api/rankings");
    // Project priority has its own page.
    setRankings(data.rankings.filter((loaded) => loaded.id !== PROJECT_PRIORITY_ID));
  }, []);

  // Load the rankings once when the page opens, and show an error if that fails.
  useEffect(() => {
    load().catch(() => setError(true));
  }, [load]);

  if (error) return <p>Could not load the rankings.</p>;

  if (!rankings) return <p>Loading rankings…</p>;

  const ranking = rankings.find((rankingOption) => rankingOption.id === pickedId) ?? rankings[0];

  return (
    <div className="rankings">
      <EditGear label="Edit rankings" auth={auth}>
        <RankingEditor ranking={ranking} onSaved={load} />
      </EditGear>
      <div className="rankings-tabs">
        {rankings.map((rankingOption) => ( // One tab button per ranking.
          <button type="button" key={rankingOption.id} className={rankingOption.id === ranking.id ? ACTIVE_CLASS : ""} onClick={() => navigate({ hash: rankingOption.id })}>
            {rankingOption.title}
          </button>
        ))}

      </div>
      <p className="muted">
        Score is each rating squared times its column's weight, added up. The weight is shown under each column name. Grade is the score out of 100 on a curve that eases off near the top and drops faster further down.
      </p>
      {ranking.columns.some((column) => column.label === EPISODIC_LABEL) && (
        <p className="muted">* Episodic shows count half their seasons, because you don't need to watch every season to appreciate the show.</p>
      )}

      <label>
        <input type="checkbox" checked={showScore} onChange={(changeEvent) => setShowScore(changeEvent.target.checked)} /> Show score
      </label>
      <input type="search" className="rankings-search" placeholder="Search by name…" value={search} onChange={(changeEvent) => setSearch(changeEvent.target.value)} />
      <RankingTable key={`${ranking.id}|${search}`} ranking={ranking} source={ranking} showScore={showScore} search={search}
        sort={sort} canEdit={isText(auth.user)} onSaved={load}
        onSort={(sortColumn) => setSort((prev) => (prev.key === sortColumn ? { key: sortColumn, descending: !prev.descending } : firstSort(sortColumn)))} /* Clicking the sorted column flips its direction; a new column starts in its first direction. */
      />
    </div>
  );
}
