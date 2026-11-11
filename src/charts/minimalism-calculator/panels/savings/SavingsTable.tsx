import { TENTH } from "../../logic/constants";
import { money, type SavingsRow } from "./savings_math";

/** Each year's spending today against the recommended plan, and what the plan saves. */
export default function SavingsTable({ rows, todayCost }: { rows: SavingsRow[]; todayCost: number }) {
  return (
    <table className="mini-savings-table">
      <thead>
        <tr>
          <th></th>
          <th>Today</th>
          <th>Recommended</th>
          <th>You save</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((yearRow) => (
          <tr key={yearRow.label}>
            <td>{yearRow.label}</td>
            <td>{money(todayCost)}</td>
            <td>
              {money(yearRow.cost)} <span className="muted">({Math.round(yearRow.bought * TENTH) / TENTH} bought)</span>
            </td>
            <td style={{ color: yearRow.saved >= 0 ? "#16a34a" : "#dc2626" }}>
              <strong>
                {yearRow.saved >= 0 ? "" : "−"}
                {money(Math.abs(yearRow.saved))}
              </strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
