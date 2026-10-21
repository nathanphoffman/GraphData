import type { CSSProperties } from "react";
import { difficulty, isNakedEye } from "../model/calculate";
import type { ScoredTarget, Settings } from "../model/types";
import { hasPreview } from "../preview/TargetPreview";
import { type Column } from "./columns";
import { heat, TYPE_SYMBOLS } from "./heat";

export interface Hover {
  id: string;
  x: number;
  y: number;
}

const DIFFICULTY_TITLE = "How hard it is to see, from the score: Excellent 75+, Very easy 50+, Easy 35+, Moderate 20+, Hard 10+, Very hard above 0, Extreme at 0 or below.";

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

function TargetCell({ row, onHover }: { row: ScoredTarget; onHover: (h: Hover | null) => void }) {
  const t = row.target;
  const preview = hasPreview(t.id);
  return (
    <td
      className="astro-target"
      title={t.nickname ? `${t.id} ${t.nickname}` : t.id}
      onMouseMove={preview ? (e) => onHover({ id: t.id, x: e.clientX, y: e.clientY }) : undefined}
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
  onHover: (h: Hover | null) => void;
}

export function TargetTable({ rows, settings, columns, onHover }: TableProps) {
  return (
    <div className="panel calc-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Target</th>
            <th title={DIFFICULTY_TITLE}>Difficulty / Score</th>
            {columns.map((c) => <th key={c.id} title={c.title}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.target.id} className={row.score <= 0 ? "astro-hidden" : undefined}>
              <td>{i + 1}</td>
              <TargetCell row={row} onHover={onHover} />
              <ScoreCell row={row} settings={settings} />
              {columns.map((c) => <td key={c.id}>{c.cell(row, settings)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
