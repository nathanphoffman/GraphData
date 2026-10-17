import { useState } from "react";
import "../maintainability-calculator/styles.css";
import { recommended, verdict } from "./calculate";

interface SliderProps {
  id: string;
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  low: string;
  high: string;
  onChange: (v: number) => void;
}

function Slider({ id, label, description, value, min, max, step = 1, display, low, high, onChange }: SliderProps) {
  return (
    <div className="panel">
      <div className="calc-row">
        <label htmlFor={id}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && <p className="muted" style={{ margin: "12px 0 14px" }}>{description}</p>}
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="calc-ticks">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

/** Slider stops for uses per year: 0.1 steps below 5, 1 steps to 100, then 5 steps to 365. */
const PER_YEAR_STOPS: number[] = [];
for (let i = 1; i < 50; i++) PER_YEAR_STOPS.push(i / 10);
for (let v = 5; v <= 100; v++) PER_YEAR_STOPS.push(v);
for (let v = 105; v <= 365; v += 5) PER_YEAR_STOPS.push(v);

/** Slider stops for things owned: 1 steps to 30, 5 steps to 300, then 10 steps to 1000. */
const OWNED_STOPS: number[] = [];
for (let v = 1; v <= 30; v++) OWNED_STOPS.push(v);
for (let v = 35; v <= 300; v += 5) OWNED_STOPS.push(v);
for (let v = 310; v <= 1000; v += 10) OWNED_STOPS.push(v);

const LEVELS = [
  { name: "Minimal", factor: 0.5, note: "½ the recommended", background: "#facc15" },
  { name: "Recommended", factor: 1, note: "1× the recommended", background: "#22c55e" },
  { name: "Maximal", factor: 2, note: "2× the recommended", background: "#ef4444" },
];

export default function MinimalismCalculator() {
  const [perWeek, setPerWeek] = useState(3);
  const [owned, setOwned] = useState(10);
  const [perYear, setPerYear] = useState(52);
  const [sharePct, setSharePct] = useState(100);

  const needed = recommended(perWeek, perYear, sharePct);
  const result = verdict(owned, needed);
  const people = 100 / sharePct;
  // Box centers sit at 1/6, 1/2 and 5/6 of the row, so each doubling moves the arrow a third of the width.
  const recommendedCount = Math.max(0, Math.ceil(needed - 1e-9));
  const onTarget = owned === recommendedCount || Math.abs(owned - needed) <= needed * 0.1;
  const diffColor = onTarget ? "#16a34a" : owned > needed ? "#dc2626" : "#eab308";
  const arrowPct = owned <= 0 ? 0 : Math.min(100, Math.max(0, 50 + (100 / 3) * Math.log2(owned / needed)));

  return (
    <div className="calc">
      <p className="muted">
        Should own = (uses per week × 52 ÷ uses per year you want from each one) × your share of the contributing.
      </p>

      <Slider
        id="per-week"
        label="Times you use any thing in this category per week (No matter whose thing it is)"
        description="For example: reading 2 books a week, or playing 3 board games a week."
        value={perWeek}
        min={0.25}
        max={50}
        step={0.25}
        display={`${perWeek} / week`}
        low="0.25 (once a month)"
        high="50"
        onChange={setPerWeek}
      />
      <Slider
        id="owned"
        label="How many of that thing you own"
        value={OWNED_STOPS.indexOf(owned)}
        min={0}
        max={OWNED_STOPS.length - 1}
        display={`${owned}`}
        low="1"
        high="1000"
        onChange={(i) => setOwned(OWNED_STOPS[i])}
      />
      <Slider
        id="per-year"
        label="Times per year you want to use each individual item in this category"
        description="Think of one specific item, not the whole category. For example: reading each individual book 2 times a year, or playing each individual board game 10 times a year."
        value={PER_YEAR_STOPS.indexOf(perYear)}
        min={0}
        max={PER_YEAR_STOPS.length - 1}
        display={`${perYear} / year`}
        low="0.1 (decadely)"
        high="365 (daily)"
        onChange={(i) => setPerYear(PER_YEAR_STOPS[i])}
      />
      <Slider
        id="share"
        label="% of the time you are the one contributing the thing"
        description="For example, if you always play board games with 3 people and all equally contribute, you only contribute 33% of the pie."
        value={sharePct}
        min={1}
        max={100}
        display={`${sharePct}% (about 1 in ${people.toFixed(people % 1 ? 1 : 0)} people)`}
        low="1% (borrow almost always)"
        high="100% (always bring my own)"
        onChange={setSharePct}
      />

      <div className="panel">
        <h3>Recommendation</h3>
        <div style={{ position: "relative", paddingTop: 20, marginBottom: 10 }}>
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
              ...(arrowPct <= 60 ? { left: `calc(${arrowPct}% + 14px)` } : { right: `calc(${100 - arrowPct}% + 14px)` }),
              fontSize: 13,
              lineHeight: "12px",
              whiteSpace: "nowrap",
            }}
          >
            <strong>You own {owned}</strong>{" "}
            <strong style={{ color: diffColor }}>
              ({owned === recommendedCount ? "±0" : owned > recommendedCount ? "+" : "−"}
              {owned === recommendedCount ? "" : Math.abs(owned - recommendedCount)})
            </strong>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: "linear-gradient(to right, #facc15 0%, #facc15 16.7%, #22c55e 50%, #ef4444 83.3%, #ef4444 100%)",
            }}
          />
        </div>
        <div className="calc-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {LEVELS.map((level) => (
            <div key={level.name} style={{ background: level.background, color: "#111", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontWeight: 600 }}>{level.name}</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{Math.max(0, Math.ceil(needed * level.factor - 1e-9))}</div>
              <div style={{ fontSize: 13 }}>{level.note}</div>
            </div>
          ))}
        </div>
        <p className="muted">Exactly {needed.toFixed(1)} recommended.</p>
        <p>
          You own {owned}: <strong>{result}</strong>
        </p>
        <p className="muted">
          Sharing {sharePct}% of the time means other people's stuff covers the other {100 - sharePct}%.
        </p>
      </div>
    </div>
  );
}
