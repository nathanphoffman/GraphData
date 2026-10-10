import { useState } from "react";
import "./styles.css";
import data from "../../../data/maintainability-calculator.json";
import type { MaintainabilityData, Tier } from "./types";
import { TIERS } from "./style";
import { aiName, formatCount, letterGrade, position, spans, tierFor } from "./calculate";

const model = data as MaintainabilityData;

function Badge({ tier }: { tier: Tier }) {
  return (
    <span className="badge" style={{ background: tier.background, color: tier.color }}>
      {tier.name}
    </span>
  );
}

export default function MaintainabilityCalculator() {
  const [loc, setLoc] = useState("10000");
  const [team, setTeam] = useState("1");
  const [qualityPct, setQualityPct] = useState(75);
  const [ai, setAi] = useState(0);

  const lines = Math.max(0, Number(loc) || 0);
  const people = Math.max(1, Math.floor(Number(team) || 1));
  const mult = Math.sqrt(people);
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

      <div className="panel">
        <div className="calc-row">
          <label htmlFor="quality">Code Quality Letter Grade</label>
          <strong>
            {letterGrade(pct)} · {pct}% ({qMod >= 0 ? "+" : "−"}
            {Math.abs(qMod).toFixed(2)})
          </strong>
        </div>
        <input
          id="quality"
          type="range"
          min={0}
          max={100}
          step={1}
          value={qualityPct}
          onChange={(e) => setQualityPct(Number(e.target.value))}
        />
        <div className="calc-ticks">
          <span>F− 0% (−0.75)</span>
          <span>C 75% (±0)</span>
          <span>A+ 100% (+0.25)</span>
        </div>
      </div>

      <div className="panel">
        <div className="calc-row">
          <label htmlFor="ai">AI involvement</label>
          <strong>
            {ai.toFixed(1)} ({aiName(ai)})
          </strong>
        </div>
        <input
          id="ai"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={ai}
          onChange={(e) => setAi(Math.round(Number(e.target.value) * 10) / 10)}
        />
        <div className="calc-ticks">
          <span>0 No AI</span>
          <span>0.5 AI‑Written</span>
          <span>1 Full Vibe AI</span>
        </div>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>n</th>
              <th>Very Stable</th>
              <th>Normal</th>
              <th>Unstable</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {model.roles.map((role) => {
              const n = role.base + ai + qMod;
              const s = spans(n);
              return (
                <tr key={role.name}>
                  <td className="role">{role.name}</td>
                  <td>{n.toFixed(2)}</td>
                  <td>{formatCount(s.lo * mult)}</td>
                  <td>{formatCount(s.mid * mult)}</td>
                  <td>{formatCount(s.hi * mult)}</td>
                  <td>
                    <Badge tier={tierFor(position(lines / mult, n))} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="calc-scale">
          {TIERS.map((tier) => (
            <Badge key={tier.name} tier={tier} />
          ))}
        </div>
        <p className="muted">
          Each line count is placed on a logarithmic position between Very Stable (−1), Stable (0, n<sup>n</sup>) and
          Unstable (+1). Normal spans −0.1 to +0.1. Below −1 is Trivial; above +1 is Impossible. All line counts are
          multiplied by √(team members), reflecting diminishing returns from added people.
        </p>
      </div>
    </div>
  );
}
