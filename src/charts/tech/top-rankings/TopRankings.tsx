import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { useAuth } from "../../../auth/useAuth";
import { InlineCell } from "./InlineCell";
import { RankingEditor } from "./RankingEditor";
import { LINES_LABEL, QUALITY_LABEL, SCAFFOLDING_LINES, maintenance, maintenancePercent, withQuality, withScaffolding } from "./maintenance";
import "./styles.css";
import { HIGHEST_RATING, LOWEST_RATING, type Ranking, effectiveRating, fractionBetween, letterGrade, rankItems } from "./score";

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * 120)} 65% 45% / 0.35)` });

const PAGE_SIZE = 100;

/** A column with this label holds each item's web address: it is not shown, and the item's name links to it instead. */
const LINK_LABEL = "Link";

/** A column with this label marks the items whose Seasons count is halved: it is not shown, and those items get an asterisk after their seasons. */
const EPISODIC_LABEL = "Episodic";
const SEASONS_LABEL = "Seasons";

type SortKey = "rank" | "name" | "grade";
interface Sort {
  key: SortKey;
  descending: boolean;
}

/** Rank and name read best first and A to Z; the grade starts with the highest. */
const firstSort = (key: SortKey): Sort => ({ key, descending: key === "grade" });

/** A header cell that sorts the table by its column when clicked; a second click reverses it. */
function SortHeader({ label, sortKey, sort, onSort, title }: { label: string; sortKey: SortKey; sort: Sort; onSort: (key: SortKey) => void; title?: string }) {
  const active = sort.key === sortKey;

  return (
    <th title={title} aria-sort={active ? (sort.descending ? "descending" : "ascending") : "none"}>
      <button type="button" className="rankings-sort" onClick={() => onSort(sortKey)}>
        {label}
        {active && (sort.descending ? " ▼" : " ▲")}
      </button>
    </th>
  );
}

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. `ranking` is what is shown; `source` is the same data as saved, which edits start from. */
function RankingTable({ ranking, source, showScore, search, sort, onSort, canEdit, onSaved }: { ranking: Ranking; source: Ranking; showScore: boolean; search: string; sort: Sort; onSort: (key: SortKey) => void; canEdit: boolean; onSaved: () => Promise<void> }) {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const linkIndex = ranking.columns.findIndex((column) => column.label === LINK_LABEL);
  const episodicIndex = ranking.columns.findIndex((column) => column.label === EPISODIC_LABEL);
  const info = indexed.filter(({ column }) => column.weight === undefined && column.label !== LINK_LABEL && column.label !== EPISODIC_LABEL);
  const rated = indexed.filter(({ column }) => column.weight !== undefined).sort((a, b) => (b.column.weight ?? 0) - (a.column.weight ?? 0));
  const [shown, setShown] = useState(PAGE_SIZE);
  const rows = rankItems(ranking);
  const matching = rows.filter(({ item }) => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  const compare = {
    rank: (a: (typeof rows)[number], b: (typeof rows)[number]) => a.rank - b.rank,
    name: (a: (typeof rows)[number], b: (typeof rows)[number]) => a.item.name.localeCompare(b.item.name),
    grade: (a: (typeof rows)[number], b: (typeof rows)[number]) => a.grade - b.grade,
  }[sort.key];
  const sorted = [...matching].sort((a, b) => (sort.descending ? compare(b, a) : compare(a, b)));
  // Saves one changed value of an item, keeping the rest of its saved values. Completed Lines is shown with the scaffolding added, so that comes back off.
  const saveCell = (item: Ranking["items"][number], index: number) => async (value: number | string | null) => {
    const saved = source.items.find((candidate) => candidate.name === item.name) ?? item;
    const isLines = ranking.columns[index].label === LINES_LABEL && typeof value === "number";
    const changed = { ...saved, values: saved.values.map((old, i) => (i === index ? (isLines ? value - SCAFFOLDING_LINES : value) : old)) };
    // Quality is worked out from the other two, so save it fresh along with the change.
    const { values } = withQuality({ ...source, items: [changed] }).items[0];
    await api(`/api/rankings/${ranking.id}/items/${encodeURIComponent(item.name)}`, "PUT", { values });
    await onSaved();
  };
  const scores = rows.map((row) => row.score);
  const [lowScore, highScore] = [Math.min(...scores), Math.max(...scores)];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {info.map(({ column }) => (
              <th key={column.label} title={column.label}>{column.short ?? column.label}</th>
            ))}
            {showScore && <th title="Each rating squared times its weight, added up">Score</th>}
            <SortHeader label="Grade" sortKey="grade" sort={sort} onSort={onSort} title="The score as a grade out of 100 on a curve: it eases off near the top and drops faster further down" />
            {rated.map(({ column }) => (
              <th key={column.label} title={`${column.label} (weight ×${column.weight})${column.best === undefined ? "" : `, best rating ${column.best}`}${column.curve === undefined ? "" : `, shown with its 1 to 5 rating`}`}>
                {column.short ?? column.label}
                <small>×{column.weight}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.slice(0, shown).map(({ item, score, grade, rank }) => (
            <tr key={item.name}>
              <td>{rank}</td>
              <td>
                {typeof item.values[linkIndex] === "string" && item.values[linkIndex] !== "" ? (
                  <a href={String(item.values[linkIndex])} target="_blank" rel="noreferrer">{item.name}</a>
                ) : (
                  item.name
                )}
              </td>
              {info.map(({ column, index }) => (
                <InlineCell key={column.label} column={column} itemName={item.name} value={item.values[index]} canEdit={canEdit && column.label !== QUALITY_LABEL} onSave={saveCell(item, index)}>{show(item.values[index])}</InlineCell>
              ))}
              {showScore && <td style={heat(fractionBetween(score, lowScore, highScore))}>{Number(score.toFixed(2))}</td>}
              <td style={heat(grade / 100)}>
                {grade.toFixed(1)}
                <small> ({letterGrade(grade)})</small>
              </td>
              {rated.map(({ column, index }) => {
                const rating = item.values[index];
                const used = typeof rating === "number" ? effectiveRating(column, rating) : null;

                return (
                  <InlineCell key={column.label} column={column} itemName={item.name} value={rating} canEdit={canEdit && column.label !== QUALITY_LABEL} onSave={saveCell(item, index)} style={used === null ? undefined : heat(fractionBetween(used, LOWEST_RATING, HIGHEST_RATING))}>
                    {show(rating)}
                    {column.label === SEASONS_LABEL && item.values[episodicIndex] ? "*" : ""}
                    {(column.best !== undefined || column.curve !== undefined) && used !== null && <small> ({Number(used.toFixed(1))})</small>}
                  </InlineCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {matching.length > shown && (
        <button type="button" className="rankings-more" onClick={() => setShown(shown + PAGE_SIZE)}>
          Show next {Math.min(PAGE_SIZE, matching.length - shown)} ({shown} of {matching.length} shown)
        </button>
      )}
    </>
  );
}

/** The code maintenance summary for rankings that have lines and quality columns. */
function MaintenanceIndex({ ranking }: { ranking: Ranking }) {
  const result = maintenance(ranking);
  if (!result) return null;

  return (
    <section className="rankings-index">
      <h3>Code Maintenance Index</h3>
      <dl>
        <div style={heat(fractionBetween(result.averageQuality, 50, 100))} title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines">
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <div style={heat(maintenancePercent(result.gradedNFactor) / 100)} title="Total n-Factor minus (average quality - 75) / 100">
          <dt>Graded n-Factor</dt>
          <dd>{result.gradedNFactor.toFixed(3)}</dd>
          <small>{result.totalLines.toLocaleString()} lines</small>
        </div>
        <div style={heat(maintenancePercent(result.gradedFutureNFactor) / 100)} title="The n-Factor if every project grows by its xLines, minus (average quality - 75) / 100">
          <dt>Graded Future n-Factor</dt>
          <dd>{result.gradedFutureNFactor.toFixed(3)}</dd>
          <small>{Math.round(result.futureLines).toLocaleString()} lines</small>
        </div>
        <div style={heat(result.maintenancePercent / 100)} title="Graded n-Factor (25%) and Graded Future n-Factor (75%) averaged, then turned into a percent on a curve. The lines are the same average without the quality adjustment (as if quality were 75) turned back into lines (n^n). Manual takes 0.66 off the n-Factor first">
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
    const data = await api<{ rankings: Ranking[] }>("/api/rankings");
    setRankings(data.rankings.map(withQuality));
  }, []);

  useEffect(() => {
    load().catch(() => setError(true));
  }, [load]);

  if (error) return <p>Could not load the rankings.</p>;
  if (!rankings) return <p>Loading rankings…</p>;

  const ranking = rankings.find((r) => r.id === pickedId) ?? rankings[0];
  // What the page shows and scores has the scaffolding lines added; the editors work on the saved ranking.
  const shown = withScaffolding(ranking);

  return (
    <div className="rankings">
      <EditGear label="Edit rankings" auth={auth}>
        <RankingEditor ranking={ranking} onSaved={load} />
      </EditGear>
      <div className="rankings-tabs">
        {rankings.map((r) => (
          <button type="button" key={r.id} className={r.id === ranking.id ? "active" : ""} onClick={() => navigate({ hash: r.id })}>
            {r.title}
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
        <input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} /> Show score
      </label>
      <input type="search" className="rankings-search" placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <RankingTable key={`${ranking.id}|${search}`} ranking={shown} source={ranking} showScore={showScore} search={search}
        sort={sort} canEdit={typeof auth.user === "string"} onSaved={load}
        onSort={(key) => setSort((prev) => (prev.key === key ? { key, descending: !prev.descending } : firstSort(key)))}
      />
    </div>
  );
}
