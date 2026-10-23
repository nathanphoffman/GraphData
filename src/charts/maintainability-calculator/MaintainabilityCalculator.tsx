import { useState } from "react";
import "./styles.css";
import data from "../../../data/misc/maintainability-calculator.json";
import type { MaintainabilityData } from "./types";
import { aiName, letterGrade } from "./calculate";
import { RoleTable, SliderPanel, TierLegend } from "./Sections";

const model = data as MaintainabilityData;

/** Maintainability calculator page: turns lines of code, team size, quality and AI use into a stability tier. */
export default function MaintainabilityCalculator() {
  const [loc, setLoc] = useState("10000");
  const [team, setTeam] = useState("1");
  const [qualityPct, setQualityPct] = useState(75);
  const [ai, setAi] = useState(0);

  const lines = Math.max(0, Number(loc) || 0);
  const people = Math.max(1, Math.floor(Number(team) || 1));
  const q = Math.min(100, Math.max(0, qualityPct)) / 100;
  const qMod = q - 0.75;
  const pct = Math.round(q * 100);

  return (
    <div className="calc">
      <p className="muted">
        Limit = n<sup>n</sup> × √team, where n = role base + AI level + (quality − 0.75).
      </p>

      <div className="panel calc-grid">
        <label>
          Application line count
          <input type="number" min={0} step={1} value={loc} onChange={(e) => setLoc(e.target.value)} />
        </label>
        <label>
          Team members
          <input type="number" min={1} step={1} value={team} onChange={(e) => setTeam(e.target.value)} />
        </label>
      </div>

      <SliderPanel
        id="quality"
        label="Code Quality Letter Grade"
        value={`${letterGrade(pct)} · ${pct}% (${qMod >= 0 ? "+" : "−"}${Math.abs(qMod).toFixed(2)})`}
        min={0}
        max={100}
        step={1}
        current={qualityPct}
        onChange={setQualityPct}
        ticks={["F− 0% (−0.75)", "C 75% (±0)", "A+ 100% (+0.25)"]}
      />
      <SliderPanel
        id="ai"
        label="AI involvement"
        value={`${ai.toFixed(1)} (${aiName(ai)})`}
        min={0}
        max={1}
        step={0.1}
        current={ai}
        onChange={(v) => setAi(Math.round(v * 10) / 10)}
        ticks={["0 No AI", "0.5 AI‑Written", "1 Full Vibe AI"]}
      />

      <RoleTable roles={model.roles} lines={lines} mult={Math.sqrt(people)} shift={ai + qMod} />
      <TierLegend />
    </div>
  );
}
