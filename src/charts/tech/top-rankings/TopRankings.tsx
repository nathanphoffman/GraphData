import { useCallback, useEffect, useState } from "react";
import { api } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { RankingEditor } from "./RankingEditor";
import "./styles.css";
import { HIGHEST_RATING, LOWEST_RATING, type Ranking, effectiveRating, fractionBetween, letterGrade, rankItems } from "./score";

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * 120)} 65% 45% / 0.35)` });

/** An arrow for how many places an item moved (positive is up): bigger and greener for a bigger climb, bigger and redder for a bigger fall. */
function MoveArrow({ moved }: { moved: number }) {
  if (moved === 0) return null;

  const strength = Math.min(1, Math.abs(moved) / 20);

  return (
    <span
      title={`${moved > 0 ? "Up" : "Down"} ${Math.abs(moved)} with the weight on`}
      style={{ color: `hsl(${moved > 0 ? 130 : 0} 70% 45%)`, fontSize: `${0.7 + strength * 1.1}em`, marginLeft: "0.4em" }}
    >
      {moved > 0 ? "▲" : "▼"}
    </span>
  );
}

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. */
function RankingTable({ ranking, showScore, toggled }: { ranking: Ranking; showScore: boolean; toggled: Set<string> }) {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const info = indexed.filter(({ column }) => column.weight === undefined);
  const rated = indexed.filter(({ column }) => column.weight !== undefined).sort((a, b) => (b.column.weight ?? 0) - (a.column.weight ?? 0));
  // A column with a toggle that is not ticked still shows its rating but adds nothing to the score.
  const withToggles = (on: (toggle: string) => boolean) => ({
    ...ranking,
    columns: ranking.columns.map((column) => (column.toggle === undefined || on(column.toggle) ? column : { ...column, weight: 0 })),
  });
  const rows = rankItems(withToggles((toggle) => toggled.has(toggle)));

  // How far each item moved compared to every toggle being off; only worked out while one is on.
  const baseRanks = new Map(toggled.size ? rankItems(withToggles(() => false)).map((row) => [row.item.name, row.rank]) : []);
  const scores = rows.map((row) => row.score);
  const [lowScore, highScore] = [Math.min(...scores), Math.max(...scores)];

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          {info.map(({ column }) => (
            <th key={column.label} title={column.label}>{column.short ?? column.label}</th>
          ))}
          {showScore && <th title="Each rating squared times its weight, added up">Score</th>}
          <th title="The score as a grade out of 100 on a curve: it eases off near the top and drops faster further down">Grade</th>
          {rated.map(({ column }) => (
            <th key={column.label} title={`${column.label} (weight ×${column.weight})${column.best === undefined ? "" : `, best rating ${column.best}`}${column.curve === undefined ? "" : `, shown with its 1 to 5 rating`}`}>
              {column.short ?? column.label}
              <small>×{column.weight}</small>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ item, score, grade, rank }) => (
          <tr key={item.name}>
            <td>{rank}</td>
            <td>
              {item.name}
              <MoveArrow moved={baseRanks.has(item.name) ? (baseRanks.get(item.name) ?? rank) - rank : 0} />
            </td>
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
  );
}

/** Top rankings page: buttons along the top swap which ranking table is shown. */
export default function TopRankings() {
  const [rankings, setRankings] = useState<Ranking[] | null>(null);
  const [error, setError] = useState(false);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [toggled, setToggled] = useState<Set<string>>(new Set());

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
          <button type="button" key={r.id} className={r.id === ranking.id ? "active" : ""} onClick={() => setPickedId(r.id)}>
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
      {[...new Set(ranking.columns.flatMap((column) => (column.toggle === undefined ? [] : [column.toggle])))].map((label) => (
        <label key={label}>
          {" "}
          <input
            type="checkbox"
            checked={toggled.has(label)}
            onChange={(e) => setToggled((prev) => new Set(e.target.checked ? [...prev, label] : [...prev].filter((other) => other !== label)))}
          />{" "}
          {label}
        </label>
      ))}
      <RankingTable ranking={ranking} showScore={showScore} toggled={toggled} />
    </div>
  );
}
