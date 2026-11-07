import type { CSSProperties } from "react";
import { difficulty, isNakedEye } from "../../../model/calculate";
import type { ScoredTarget, Settings } from "../../../model/types";

/** The header: name, kind of object and the score. */
export function PreviewHead({ row, settings }: { row: ScoredTarget; settings: Settings }) {
  const t = row.target;
  const level = isNakedEye(t, settings.bortle) ? { label: "Naked Eye", level: 1 } : difficulty(row.score);

  return (
    <div className="astro-preview-head">
      <div>
        <h4>
          {t.id}
          {t.nickname && <span> {t.nickname}</span>}
        </h4>
        <div className="astro-preview-sub">
          {t.type} · {t.constellation}
        </div>
      </div>
      <div
        className="astro-score-pill"
        style={{ "--tag": `hsl(${Math.round(level.level * 120)} 70% 45%)` } as CSSProperties}
      >
        {row.score.toFixed(0).replace("-", "−")} · {level.label}
      </div>
    </div>
  );
}
