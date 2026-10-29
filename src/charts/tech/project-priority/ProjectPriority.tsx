import { useCallback, useEffect, useState } from "react";
import { callApi } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { useAuth } from "../../../auth/useAuth";
import { RankingEditor } from "../top-rankings/RankingEditor";
import { RankingTable, type Sort, firstSort } from "../top-rankings/RankingTable";
import { DEFAULT_AI_USE, SCAFFOLDING_LINES, withQuality, withScaffolding, withStatus } from "../top-rankings/maintenance";
import { PROJECT_PRIORITY_ID } from "../top-rankings/TopRankings";
import "../top-rankings/styles.css";
import { type Ranking, isText } from "../top-rankings/score";
import { MaintenanceIndex } from "./MaintenanceIndex";

/** Project priority page: the project ranking table with the code maintenance index above it. */
export default function ProjectPriority() {
  const [ranking, setRanking] = useState<Ranking | null>(null);
  const [error, setError] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>(firstSort("rank"));
  const [aiUse, setAiUse] = useState(DEFAULT_AI_USE);

  // Logged in means the table cells can be clicked and edited in place.
  const auth = useAuth();

  const load = useCallback(async () => {
    const data = await callApi<{ rankings: Ranking[] }>("/api/rankings");
    const found = data.rankings.find((candidate) => candidate.id === PROJECT_PRIORITY_ID);

    if (!found) throw new Error("Project priority ranking is missing");
    setRanking(withStatus(withQuality(found)));
  }, []);

  // Load the ranking once when the page opens, and show an error if that fails.
  useEffect(() => {
    load().catch(() => setError(true));
  }, [load]);

  if (error) return <p>Could not load the project priority ranking.</p>;

  if (!ranking) return <p>Loading ranking…</p>;

  // What the page shows and scores has the scaffolding lines added; the editor works on the saved ranking.
  const shown = withScaffolding(ranking);

  return (
    <div className="rankings">
      <EditGear label="Edit rankings" auth={auth}>
        <RankingEditor ranking={ranking} onSaved={load} />
      </EditGear>
      <MaintenanceIndex ranking={shown} aiUse={aiUse} onAiUse={setAiUse} />
      <p className="muted">
        Score is each rating squared times its column's weight, added up. The weight is shown under each column name. Grade is the score out of 100 on a curve that eases off near the top and drops faster further down.
      </p>
      <p className="muted">Completed Lines includes {SCAFFOLDING_LINES} extra lines per project, a minimum scaffolding score that every project needs. It is added here on the page, not saved in the data or counted by the line count script.</p>
      <label>
        <input type="checkbox" checked={showScore} onChange={(changeEvent) => setShowScore(changeEvent.target.checked)} /> Show score
      </label>
      <input type="search" className="rankings-search" placeholder="Search by name…" value={search} onChange={(changeEvent) => setSearch(changeEvent.target.value)} />
      <RankingTable key={search} ranking={shown} source={ranking} showScore={showScore} showFeatures search={search}
        sort={sort} canEdit={isText(auth.user)} onSaved={load}
        onSort={(sortColumn) => setSort((prev) => (prev.key === sortColumn ? { key: sortColumn, descending: !prev.descending } : firstSort(sortColumn)))} /* Clicking the sorted column flips its direction; a new column starts in its first direction. */
      />
    </div>
  );
}
