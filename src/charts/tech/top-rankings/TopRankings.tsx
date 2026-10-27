import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callApi } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { ACTIVE_CLASS } from "../../classNames";
import { useAuth } from "../../../auth/useAuth";
import { RankingEditor } from "./RankingEditor";
import { heat } from "./RankingCells";
import { EPISODIC_LABEL, RankingTable, type Sort, firstSort } from "./RankingTable";
import { LINES_LABEL, PERCENT, SCAFFOLDING_LINES, maintenance, maintenancePercent, withQuality, withScaffolding } from "./maintenance";
import "./styles.css";
import { type Ranking, fractionBetween, isText } from "./score";

/** The n-Factor is shown to this many decimals. */
const N_FACTOR_DIGITS = 3;

/** The Average Quality card is red at this quality. */
const LOWEST_QUALITY_HEAT = 50;

/** The code maintenance summary for rankings that have lines and quality columns. */
function MaintenanceIndex({ ranking }: { ranking: Ranking }) {
  const result = maintenance(ranking);

  if (!result) return null;

  return (
    <section className="rankings-index">
      <h3>Code Maintenance Index</h3>
      <dl>
        <div style={heat(fractionBetween(result.averageQuality, LOWEST_QUALITY_HEAT, PERCENT))} title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines">
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <div style={heat(maintenancePercent(result.gradedNFactor) / PERCENT)} title="Total n-Factor minus (average quality - 75) / 100">
          <dt>Graded n-Factor</dt>
          <dd>{result.gradedNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{result.totalLines.toLocaleString()} lines</small>
        </div>
        <div style={heat(maintenancePercent(result.gradedFutureNFactor) / PERCENT)} title="The n-Factor if every project grows by its xLines, minus (average quality - 75) / 100">
          <dt>Graded Future n-Factor</dt>
          <dd>{result.gradedFutureNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{Math.round(result.futureLines).toLocaleString()} lines</small>
        </div>
        <div style={heat(result.maintenancePercent / PERCENT)} title="Graded n-Factor (25%) and Graded Future n-Factor (75%) averaged, then turned into a percent on a curve. The lines are the same average without the quality adjustment (as if quality were 75) turned back into lines (n^n). Manual takes 0.66 off the n-Factor first">
          <dt>Code Maintenance</dt>
          <dd>{result.maintenancePercent.toFixed(1)}%</dd>
          <small>{Math.round(result.equivalentLines).toLocaleString()} lines equivalent</small>
          <small>{Math.round(result.manualLines).toLocaleString()} lines manual</small>
        </div>
      </dl>
    </section>
  );
}

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
    setRankings(data.rankings.map(withQuality));
  }, []);

  // Load the rankings once when the page opens, and show an error if that fails.
  useEffect(() => {
    load().catch(() => setError(true));
  }, [load]);

  if (error) return <p>Could not load the rankings.</p>;

  if (!rankings) return <p>Loading rankings…</p>;

  const ranking = rankings.find((rankingOption) => rankingOption.id === pickedId) ?? rankings[0];

  // What the page shows and scores has the scaffolding lines added; the editors work on the saved ranking.
  const shown = withScaffolding(ranking);

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
      <MaintenanceIndex ranking={shown} />
      <p className="muted">
        Score is each rating squared times its column's weight, added up. The weight is shown under each column name. Grade is the score out of 100 on a curve that eases off near the top and drops faster further down.
      </p>
      {ranking.columns.some((column) => column.label === LINES_LABEL) && (
        <p className="muted">Completed Lines includes {SCAFFOLDING_LINES} extra lines per project, a minimum scaffolding score that every project needs. It is added here on the page, not saved in the data or counted by the line count script.</p>
      )}

      {ranking.columns.some((column) => column.label === EPISODIC_LABEL) && (
        <p className="muted">* Episodic shows count half their seasons, because you don't need to watch every season to appreciate the show.</p>
      )}

      <label>
        <input type="checkbox" checked={showScore} onChange={(changeEvent) => setShowScore(changeEvent.target.checked)} /> Show score
      </label>
      <input type="search" className="rankings-search" placeholder="Search by name…" value={search} onChange={(changeEvent) => setSearch(changeEvent.target.value)} />
      <RankingTable key={`${ranking.id}|${search}`} ranking={shown} source={ranking} showScore={showScore} search={search}
        sort={sort} canEdit={isText(auth.user)} onSaved={load}
        onSort={(sortColumn) => setSort((prev) => (prev.key === sortColumn ? { key: sortColumn, descending: !prev.descending } : firstSort(sortColumn)))} /* Clicking the sorted column flips its direction; a new column starts in its first direction. */
      />
    </div>
  );
}
