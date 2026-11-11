import { money, YEARS } from "./savings_math";

/** The total saved (or spent more) over the plan, and the total spent against what today's habit would cost. */
export default function SavingsTotals({ saved, spent, spentToday }: { saved: number; spent: number; spentToday: number }) {
  return (
    <div className={`mini-total ${saved >= 0 ? "mini-total-save" : "mini-total-spend"}`}>
      <div className="mini-total-label">Total over {YEARS} years</div>
      <div className="mini-total-amount">
        {saved >= 0 ? "Save" : "Spend"} {money(Math.abs(saved))}
        {saved < 0 && " more"}
      </div>
      <div className="mini-total-label">Total spent over {YEARS} years</div>
      <div className="mini-total-amount">
        {money(spent)} <span className="muted">(vs. {money(spentToday)})</span>
      </div>
    </div>
  );
}
