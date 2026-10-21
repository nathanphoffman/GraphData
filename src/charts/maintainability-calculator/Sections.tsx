import type { ReactNode } from "react";
import { formatCount, position, spans, tierFor } from "./calculate";
import { TIERS } from "./style";
import type { MaintainabilityData, Tier } from "./types";

function Badge({ tier }: { tier: Tier }) {
  return (
    <span className="badge" style={{ background: tier.background, color: tier.color }}>
      {tier.name}
    </span>
  );
}

interface SliderPanelProps {
  id: string;
  label: string;
  value: ReactNode;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
  ticks: string[];
}

/** A titled range slider with a headline value on top and tick labels underneath. */
export function SliderPanel({ id, label, value, min, max, step, current, onChange, ticks }: SliderPanelProps) {
  return (
    <div className="panel">
      <div className="calc-row">
        <label htmlFor={id}>{label}</label>
        <strong>{value}</strong>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={current} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="calc-ticks">
        {ticks.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

interface TableProps {
  roles: MaintainabilityData["roles"];
  lines: number;
  /** Square root of the team size. */
  mult: number;
  /** AI level plus the quality modifier, added to each role's base. */
  shift: number;
}

function RoleRow({ role, lines, mult, shift }: { role: TableProps["roles"][number] } & Omit<TableProps, "roles">) {
  const n = role.base + shift;
  const s = spans(n);
  return (
    <tr>
      <td className="role">
        {role.name}
        {role.note && <span className="role-note"> ({role.note})</span>}
      </td>
      <td>{n.toFixed(2)}</td>
      <td className="edge">{formatCount(s.lo * mult)}</td>
      <td className="normal">{formatCount(s.mid * mult)}</td>
      <td className="edge">{formatCount(s.hi * mult)}</td>
      <td className="normal"><Badge tier={tierFor(position(lines / mult, n))} /></td>
    </tr>
  );
}

export function RoleTable({ roles, ...rest }: TableProps) {
  return (
    <div className="panel calc-table">
      <h3>Line Count Recommendation</h3>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>n</th>
            <th className="edge">Very Stable</th>
            <th className="normal">Normal</th>
            <th className="edge">Unstable</th>
            <th className="normal">Difficulty at {formatCount(rest.lines)} lines</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => <RoleRow key={role.name} role={role} {...rest} />)}
        </tbody>
      </table>
    </div>
  );
}

export function TierLegend() {
  return (
    <div className="panel">
      <div className="calc-scale">
        {TIERS.map((tier) => <Badge key={tier.name} tier={tier} />)}
      </div>
      <p className="muted">
        Each line count is placed on a logarithmic position between Very Stable (−1), Stable (0, n<sup>n</sup>) and
        Unstable (+1). Normal spans −0.1 to +0.1. Below −1 is Trivial; above +1 is Impossible. All line counts are
        multiplied by √(team members), reflecting diminishing returns from added people.
      </p>
    </div>
  );
}
