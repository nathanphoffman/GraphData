import { useCallback, useEffect, useState } from "react";
import { api } from "../../../api";
import { EditGear } from "../../../auth/EditGear";
import { RankingEditor } from "./RankingEditor";
import "./styles.css";
import { HIGHEST_RATING, LOWEST_RATING, type Ranking, fractionBetween, rankItems } from "./score";

/** Show a value, or nothing when it is missing. */
const show = (value: number | string | null | undefined) => (value === null || value === undefined ? "" : String(value));

/** Background from red (0) through yellow to green (1); see-through so it works on light and dark pages. */
const heat = (fraction: number) => ({ backgroundColor: `hsl(${Math.round(fraction * 120)} 65% 45% / 0.35)` });

/** One ranking as a table: rank, name, information columns, score, then the rated columns heaviest first. */
function RankingTable({ ranking }: { ranking: Ranking }) {
  const indexed = ranking.columns.map((column, index) => ({ column, index }));
  const info = indexed.filter(({ column }) => column.weight === undefined);
  const rated = indexed.filter(({ column }) => column.weight !== undefined).sort((a, b) => (b.column.weight ?? 0) - (a.column.weight ?? 0));
  const rows = rankItems(ranking);
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
          <th title="Each rating squared times its weight, added up">Score</th>
          <th title="The score as a grade out of 100 on a curve: it eases off near the top and drops faster further down">Grade</th>
          {rated.map(({ column }) => (
            <th key={column.label} title={`${column.label} (weight ×${column.weight})`}>
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
            <td>{item.name}</td>
            {info.map(({ column, index }) => (
              <td key={column.label}>{show(item.values[index])}</td>
            ))}
            <td style={heat(fractionBetween(score, lowScore, highScore))}>{Number(score.toFixed(2))}</td>
            <td style={heat(grade / 100)}>{Math.round(grade)}</td>
            {rated.map(({ column, index }) => {
              const rating = item.values[index];

              return (
                <td key={column.label} style={typeof rating === "number" ? heat(fractionBetween(rating, LOWEST_RATING, HIGHEST_RATING)) : undefined}>
                  {show(rating)}
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
      <RankingTable ranking={ranking} />
    </div>
  );
}
