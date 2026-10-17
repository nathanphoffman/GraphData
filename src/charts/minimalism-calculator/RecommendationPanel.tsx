import { arrowPosition } from "./calculate";

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

/** Gradient scale with an arrow at how many you own, then the minimal / recommended / maximal boxes. */
export default function RecommendationPanel({ owned, needed }: Props) {
  const recommendedCount = Math.max(0, Math.ceil(needed - 1e-9));
  const onTarget = owned === recommendedCount || Math.abs(owned - needed) <= needed * 0.1;
  const diffColor = onTarget ? "#16a34a" : owned > needed ? "#dc2626" : "#eab308";
  const arrowPct = arrowPosition(owned, needed);

  return (
    <div className="panel">
      <h3>Recommendation</h3>
          <div
            style={{ position: "relative", paddingTop: 20, marginBottom: 10 }}
          >
            <div
              title={`You own ${owned}`}
              style={{
                position: "absolute",
                top: 0,
                left: `${arrowPct}%`,
                transform: "translateX(-50%)",
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "12px solid var(--fg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                ...(arrowPct <= 60
                  ? { left: `calc(${arrowPct}% + 14px)` }
                  : { right: `calc(${100 - arrowPct}% + 14px)` }),
                fontSize: 13,
                lineHeight: "12px",
                whiteSpace: "nowrap",
              }}
            >
              <strong>You own {owned}</strong>{" "}
              <strong style={{ color: diffColor }}>
                (
                {owned === recommendedCount
                  ? "±0"
                  : owned > recommendedCount
                    ? "+"
                    : "−"}
                {owned === recommendedCount
                  ? ""
                  : Math.abs(owned - recommendedCount)}
                )
              </strong>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background:
                  "linear-gradient(to right, #facc15 0%, #facc15 16.7%, #22c55e 50%, #ef4444 83.3%, #ef4444 100%)",
              }}
            />
          </div>
          <div
            className="calc-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}
          >
            {LEVELS.map((level) => (
              <div
                key={level.name}
                style={{
                  background: level.background,
                  color: "#111",
                  borderRadius: 8,
                  padding: "10px 12px",
                }}
              >
                <div style={{ fontWeight: 600 }}>{level.name}</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>
                  {Math.max(0, Math.ceil(needed * level.factor - 1e-9))}
                </div>
                <div style={{ fontSize: 13 }}>{level.factor === 1 ? `exactly ${needed.toFixed(1)}` : level.note}</div>
              </div>
            ))}
          </div>
    </div>
  );
}
