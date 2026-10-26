import { PERCENT } from "../logic/constants";
import { arrowPosition, recommendedCount as countFor } from "../logic/calculate";

const LEVELS = [
  {
    name: "Minimal",
    factor: 0.5,
    note: "½× recommended",
    background: "#facc15",
  },
  {
    name: "Recommended",
    factor: 1,
    note: "1× recommended",
    background: "#22c55e",
  },
  {
    name: "Maximal",
    factor: 2,
    note: "2× recommended",
    background: "#ef4444",
  },
];

interface Props {
  owned: number;
  needed: number;
}

/** Owning within this share of the recommendation counts as on target. */
const ON_TARGET_TOLERANCE = 0.1;

/** Past this share of the scale the arrow's label moves to the other side of the arrow, so it stays on screen. */
const LABEL_FLIPS_AT = 60;

/** Gradient scale with an arrow at how many you own, then the minimal / recommended / maximal boxes. */
export default function RecommendationPanel({ owned, needed }: Props) {
  const recommendedCount = countFor(needed);
  const onTarget = owned === recommendedCount || Math.abs(owned - needed) <= needed * ON_TARGET_TOLERANCE;

  // Green when on target, red when you own too many, yellow when you own too few.
  const diffColor = onTarget ? "#16a34a" : owned > needed ? "#dc2626" : "#eab308";
  const arrowPct = arrowPosition(owned, needed);
  const diff = owned - recommendedCount;
  const diffText = diff === 0 ? "±0" : `${diff > 0 ? "+" : "−"}${Math.abs(diff)}`;

  return (
    <div className="panel">
      <h3>Recommendation</h3>
      <div className="mini-scale">
        <div className="mini-arrow" title={`You own ${owned}`} style={{ left: `${arrowPct}%` }} />
        <div
          className="mini-arrow-label"
          style={arrowPct <= LABEL_FLIPS_AT ? { left: `calc(${arrowPct}% + 14px)` } : { right: `calc(${PERCENT - arrowPct}% + 14px)` }}
        >
          <strong>You own {owned}</strong> <strong style={{ color: diffColor }}>({diffText})</strong>
        </div>
        <div className="mini-gradient" />
      </div>
      <div className="mini-levels">
        {/* One coloured band per level so the table reads as a scale. */}
        {LEVELS.map((level) => (
          <div key={level.name} className="mini-level" style={{ background: level.background }}>
            <div className="mini-level-name">{level.name}</div>
            <div className="mini-level-count">{Math.max(0, Math.ceil(needed * level.factor - 1e-9))}</div>
            <div className="mini-level-note">{level.factor === 1 ? `exactly ${needed.toFixed(1)}` : level.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
