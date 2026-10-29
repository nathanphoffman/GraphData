import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callApi } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { ACTIVE_CLASS } from "../../classNames";
import { useAuth } from "../../../auth/useAuth";
import { RankingEditor } from "./RankingEditor";
import { heat } from "./RankingCells";
import { EPISODIC_LABEL, RankingTable, type Sort, firstSort } from "./RankingTable";
import { DEFAULT_AI_USE, LINES_LABEL, PERCENT, SCAFFOLDING_LINES, maintenance, maintenancePercent, withQuality, withScaffolding, withStatus } from "./maintenance";
import "./styles.css";
import { type Ranking, fractionBetween, isText } from "./score";

/** The n-Factor is shown to this many decimals. */
const N_FACTOR_DIGITS = 3;

/** The Average Quality card is red at this quality. */
const LOWEST_QUALITY_HEAT = 50;

/** The Extent of AI Use slider runs from none (0, all manual) to this much added n-Factor. */
const MAX_AI_USE = 1;
const AI_USE_STEP = 0.05;

/** The Average Quality slider moves in tenths of a percent. */
const QUALITY_STEP = 0.1;

/** The code maintenance summary for rankings that have lines and quality columns. */
function MaintenanceIndex({ ranking, aiUse, onAiUse }: { ranking: Ranking; aiUse: number; onAiUse: (aiUse: number) => void }) {
  const [qualityOverride, setQualityOverride] = useState<number | null>(null);
  const actual = maintenance(ranking, aiUse);
  const result = maintenance(ranking, aiUse, qualityOverride ?? undefined);

  if (!result || !actual) return null;

  return (
    <section className="rankings-index">
      <h3>Code Maintenance Index</h3>
      <label title="How much AI adds to the n-Factor a developer can hold together. 0 is fully manual; it moves the maintenance percent and the manual lines.">
        Extent of AI Use: {Math.round(aiUse * PERCENT)}%{" "}
        <input type="range" min={0} max={MAX_AI_USE} step={AI_USE_STEP} value={aiUse} onChange={(changeEvent) => onAiUse(Number(changeEvent.target.value))} />
      </label>
      <label title="Average quality used in the numbers below. It starts at the real average; move it to see what the maintenance numbers would be at a different quality.">
        Average Quality: {result.averageQuality.toFixed(1)}%{" "}
        <input type="range" min={0} max={PERCENT} step={QUALITY_STEP} value={result.averageQuality} onChange={(changeEvent) => setQualityOverride(Number(changeEvent.target.value))} />
        {qualityOverride !== null && <button type="button" onClick={() => setQualityOverride(null)}>Reset to {actual.averageQuality.toFixed(1)}%</button>}
      </label>
      <dl>
        <div style={heat(fractionBetween(result.averageQuality, LOWEST_QUALITY_HEAT, PERCENT))} title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines">
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <div style={heat(maintenancePercent(result.gradedNFactor, aiUse) / PERCENT)} title="Total n-Factor minus (average quality - 75) / 100">
          <dt>Graded n-Factor</dt>
          <dd>{result.gradedNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{result.totalLines.toLocaleString()} lines</small>
          <small>{Math.round(result.gradedManualLines).toLocaleString()} lines manual</small>
        </div>
        <div style={heat(maintenancePercent(result.gradedFutureNFactor, aiUse) / PERCENT)} title="The n-Factor if every project grows by its xLines, minus (average quality - 75) / 100">
          <dt>Graded Future n-Factor</dt>
          <dd>{result.gradedFutureNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{Math.round(result.futureLines).toLocaleString()} lines</small>
          <small>{Math.round(result.gradedFutureManualLines).toLocaleString()} lines manual</small>
        </div>
        <div style={heat(result.maintenancePercent / PERCENT)} title="Graded n-Factor (25%) and Graded Future n-Factor (75%) averaged, then turned into a percent: 100% when the manual n-Factor (n-Factor minus the Extent of AI Use) is 5 or less, falling in a straight line to 0% at 10. The lines are the same average without the quality adjustment (as if quality were 75) turned back into lines (n^n). Manual takes the Extent of AI Use off the n-Factor first">
          <dt>Code Maintenance</dt>
          <dd>{result.maintenancePercent.toFixed(1)}%</dd>
          <small>{result.combinedNFactor.toFixed(N_FACTOR_DIGITS)} n-Factor</small>
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
  const [aiUse, setAiUse] = useState(DEFAULT_AI_USE);

  // Logged in means the table cells can be clicked and edited in place.
  const auth = useAuth();

  const load = useCallback(async () => {
    const data = await callApi<{ rankings: Ranking[] }>("/api/rankings");
    setRankings(data.rankings.map((loaded) => withStatus(withQuality(loaded))));
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
      <MaintenanceIndex ranking={shown} aiUse={aiUse} onAiUse={setAiUse} />
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
