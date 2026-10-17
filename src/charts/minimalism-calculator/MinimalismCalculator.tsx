import { useEffect, useState } from "react";
import "../maintainability-calculator/styles.css";
import "./styles.css";
import {
  gapLabel,
  goalColor,
  waitBuckets,
  recommended,
} from "./calculate";

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

function Slider({
  id,
  label,
  description,
  value,
  min,
  max,
  step = 1,
  display,
  low,
  high,
  onChange,
}: SliderProps) {
  return (
    <div className="panel">
      <div className="calc-row">
        <label htmlFor={id}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && (
        <p className="muted" style={{ margin: "8px 0 12px", fontSize: 13 }}>
          {description}
        </p>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
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

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

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

/** useState that remembers its value in localStorage; stored values that fail `isValid` are ignored. */
function useStoredNumber(
  key: string,
  fallback: number,
  isValid: (v: number) => boolean,
) {
  const storageKey = `minimalism-calculator:${key}`;
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const n = stored === null ? NaN : Number(stored);
      return isValid(n) ? n : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {
      // storage unavailable (private mode, blocked): the slider still works, it just won't be remembered
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}

export default function MinimalismCalculator() {
  const [perWeek, setPerWeek] = useStoredNumber(
    "per-week",
    3,
    (v) => v >= 0.25 && v <= 21 && v * 4 === Math.round(v * 4),
  );
  const [owned, setOwned] = useStoredNumber("owned", 10, (v) =>
    OWNED_STOPS.includes(v),
  );
  const [perYear, setPerYear] = useStoredNumber("per-year", 52, (v) =>
    PER_YEAR_STOPS.includes(v),
  );
  const [sharePct, setSharePct] = useStoredNumber(
    "share-pct",
    100,
    (v) => Number.isInteger(v) && v >= 1 && v <= 100,
  );

  const needed = recommended(perWeek, perYear, sharePct);
  const people = 100 / sharePct;
  // Box centers sit at 1/6, 1/2 and 5/6 of the row, so each doubling moves the arrow a third of the width.
  const recommendedCount = Math.max(0, Math.ceil(needed - 1e-9));
  // Average uses each item you own actually gets per year, from your own share of the use.
  const avgUses = (perWeek * 52 * (sharePct / 100)) / Math.max(1, owned);
  const buckets = waitBuckets(avgUses).filter(
    (b) => Math.round(b.p * owned) > 0,
  );
  const tallest = Math.max(...buckets.map((b) => b.p));
  const onTarget =
    owned === recommendedCount || Math.abs(owned - needed) <= needed * 0.1;
  const diffColor = onTarget
    ? "#16a34a"
    : owned > needed
      ? "#dc2626"
      : "#eab308";
  const arrowPct =
    owned <= 0
      ? 0
      : Math.min(100, Math.max(0, 50 + (100 / 3) * Math.log2(owned / needed)));

  return (
    <div className="calc">
      <div className="mini-layout">
        <div className="mini-inputs">
          <h2>Your numbers</h2>
          <Slider
            id="per-week"
            label="Uses per week (whoever owns it)"
            description="All items in the category combined, e.g. reading 2 books a week."
            value={perWeek}
            min={0.25}
            max={21}
            step={0.25}
            display={`${perWeek} / week`}
            low="0.25 (once a month)"
            high="21"
            onChange={setPerWeek}
          />
          <Slider
            id="owned"
            label="How many you own"
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
            label="Uses per year you want from each item"
            description="Per single item, e.g. each board game played 10 times a year."
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
            label="Your share of the contributing"
            description="Play with 3 people who all chip in equally? You supply 33%."
            value={sharePct}
            min={1}
            max={100}
            display={`${sharePct}% (1 in ${people.toFixed(people % 1 ? 1 : 0)})`}
            low="1% (mostly borrow)"
            high="100% (all mine)"
            onChange={setSharePct}
          />
        </div>

        <div className="mini-results">
          <h2>Results</h2>
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

          <div className="panel">
            <h3>How long items wait to be played</h3>
            <p className="muted">
              Picking at random, your {owned} items average{" "}
              {avgUses.toFixed(1)} uses a year each.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                height: 140,
              }}
            >
              {buckets.map((b) => (
                <div
                  key={b.label}
                  style={{ flex: 1, textAlign: "center", fontSize: 12 }}
                >
                  <div>{plural(Math.round(b.p * owned), "item")}</div>
                  <div
                    title={`${(b.p * 100).toFixed(1)}% of items`}
                    style={{
                      height: Math.max(2, (b.p / tallest) * 90),
                      background: goalColor(b.mid, perYear),
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {buckets.map((b) => (
                <div
                  key={b.label}
                  className="muted"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 12,
                    whiteSpace: "pre-line",
                  }}
                >
                  {gapLabel(b).replace(/^Every /, "Every\n")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
