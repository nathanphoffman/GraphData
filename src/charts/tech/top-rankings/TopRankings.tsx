import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { RankingEditor } from "./RankingEditor";
import "./styles.css";
import { HIGHEST_RATING, LOWEST_RATING, type Ranking, effectiveRating, fractionBetween, letterGrade, rankItems } from "./score";

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * 120)} 65% 45% / 0.35)` });

const PAGE_SIZE = 100;

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

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. */
function RankingTable({ ranking, showScore, search, sort, onSort }: { ranking: Ranking; showScore: boolean; search: string; sort: Sort; onSort: (key: SortKey) => void }) {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const info = indexed.filter(({ column }) => column.weight === undefined);
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
              <td>{item.name}</td>
              {info.map(({ column, index }) => (
                <td key={column.label}>{show(item.values[index])}</td>
              ))}
              {showScore && <td style={heat(fractionBetween(score, lowScore, highScore))}>{Number(score.toFixed(2))}</td>}
              <td style={heat(grade / 100)}>
                {Math.round(grade)}
                <small> ({letterGrade(grade)})</small>
              </td>
              {rated.map(({ column, index }) => {
                const rating = item.values[index];
                const used = typeof rating === "number" ? effectiveRating(column, rating) : null;

                return (
                  <td key={column.label} style={used === null ? undefined : heat(fractionBetween(used, LOWEST_RATING, HIGHEST_RATING))}>
                    {show(rating)}
                    {(column.best !== undefined || column.curve !== undefined) && used !== null && <small> ({Number(used.toFixed(1))})</small>}
                  </td>
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

  const load = useCallback(async () => {
    const data = await api<{ rankings: Ranking[] }>("/api/rankings");
    setRankings(data.rankings);
  }, []);

  useEffect(() => {
    load().catch(() => setError(true));
  }, [load]);

  if (error) return <p>Could not load the rankings.</p>;
  if (!rankings) return <p>Loading rankings…</p>;

  const ranking = rankings.find((r) => r.id === pickedId) ?? rankings[0];

  return (
    <div className="rankings">
      <EditGear label="Edit rankings">
        <RankingEditor ranking={ranking} onSaved={load} />
      </EditGear>
      <div className="rankings-tabs">
        {rankings.map((r) => (
          <button type="button" key={r.id} className={r.id === ranking.id ? "active" : ""} onClick={() => navigate({ hash: r.id })}>
            {r.title}
          </button>
        ))}
      </div>
      <p className="muted">
        Score is each rating squared times its column's weight, added up. The weight is shown under each column name. Grade is the score out of 100 on a curve that eases off near the top and drops faster further down.
      </p>
      <label>
        <input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} /> Show score
      </label>
      <input type="search" className="rankings-search" placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <RankingTable key={`${ranking.id}|${search}`} ranking={ranking} showScore={showScore} search={search}
        sort={sort}
        onSort={(key) => setSort((prev) => (prev.key === key ? { key, descending: !prev.descending } : firstSort(key)))}
      />
    </div>
  );
}
