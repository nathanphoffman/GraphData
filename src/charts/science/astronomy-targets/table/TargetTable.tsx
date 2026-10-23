import type { CSSProperties } from "react";
import { difficulty, isNakedEye } from "../model/calculate";
import type { ScoredTarget, Settings } from "../model/types";
import { hasPreview } from "../preview/TargetPreview";
import type { Column } from "./columns";
import { heat, TYPE_SYMBOLS } from "./heat";

export interface Hover {
  id: string;
  x: number;
  y: number;
}

const DIFFICULTY_TITLE = "How hard it is to see, from the score: Excellent 75+, Very easy 50+, Easy 35+, Moderate 20+, Hard 10+, Very hard above 0, Extreme at 0 or below.";

/** Score cell with a bar sized to the score and a difficulty label. */
function ScoreCell({ row, settings }: { row: ScoredTarget; settings: Settings }) {
  const naked = isNakedEye(row.target, settings.bortle);
  const { label, level } = naked ? { label: "Naked Eye", level: 1 } : difficulty(row.score);

  return (
    <td className="astro-score">
      <div className="astro-difficulty">
        <span className="astro-tag" style={{ "--tag": heat(level, 1) } as CSSProperties}>{label}</span>
      </div>
      <div className="astro-scorebar">
        <span className="astro-bar" style={{ width: `${Math.max(0, row.score)}%`, background: heat(row.score / 100, 0.45) }} />
        <span className="astro-score-text">{row.score.toFixed(0).replace("-", "−")}</span>
      </div>
    </td>
  );
}

/** Only targets with a photo react to hover, because there is nothing to preview for the others. */
function TargetCell({ row, onHover }: { row: ScoredTarget; onHover: (height: Hover | null) => void }) {
  const t = row.target;
  const preview = hasPreview(t.id);

  return (
    <td
      className="astro-target"
      title={t.nickname ? `${t.id} ${t.nickname}` : t.id}
      onMouseMove={preview ? (event) => onHover({ id: t.id, x: event.clientX, y: event.clientY }) : undefined}
      onMouseLeave={preview ? () => onHover(null) : undefined}
    >
      <span title={t.type}>{TYPE_SYMBOLS[t.type] ?? "•"}</span> <strong>{t.id}</strong>{t.nickname && <div className="astro-nick">{t.nickname}</div>}
    </td>
  );
}

interface TableProps {
  rows: ScoredTarget[];
  settings: Settings;
  /** Visible columns, already in display order. */
  columns: Column[];
  onHover: (height: Hover | null) => void;
}

/** The table of targets, ranked by score. */
export function TargetTable({ rows, settings, columns, onHover }: TableProps) {
  return (
    <div className="panel calc-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Target</th>
            <th title={DIFFICULTY_TITLE}>Difficulty / Score</th>
            {columns.map((column) => <th key={column.id} title={column.title}>{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* One table row per target, numbered by rank; targets with no score are hidden. */}
          {rows.map((scoredTarget, index) => (
            <tr key={scoredTarget.target.id} className={scoredTarget.score <= 0 ? "astro-hidden" : undefined}>
              <td>{index + 1}</td>
              <TargetCell row={scoredTarget} onHover={onHover} />
              <ScoreCell row={scoredTarget} settings={settings} />
              {columns.map((column) => <td key={column.id}>{column.cell(scoredTarget, settings)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
