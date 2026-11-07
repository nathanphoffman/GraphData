import type { SummaryRow } from "../types";
import { Inline } from "./TextPieces";

/** One row of the verdict table. */
function SummaryTableRow({ row }: { row: SummaryRow }) {
  return (
    <tr>
      <td>{row.element}</td>
      <td>
        <Inline parts={row.leans} />
      </td>
      <td>{row.confidence}</td>
    </tr>
  );
}

/** The "verdict at a glance" table: which side each rule element leans toward. */
export default function SummaryTable({ rows }: { rows: SummaryRow[] }) {
  return (
    <div className="auth-table-wrap">
      <table className="auth-summary">
        <thead>
          <tr>
            <th>Rule / element</th>
            <th>Leans toward</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {/* One summary row per rule element. */}
          {rows.map((row) => (
            <SummaryTableRow key={row.element} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
