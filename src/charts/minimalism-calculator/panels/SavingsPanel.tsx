import type { ItemType } from "../logic/items";
import { purchasePlan, yearsToReach } from "../logic/spending";
import type { Calculator } from "../state/state";
import SavingsInputs from "./savings/SavingsInputs";
import SavingsNotes from "./savings/SavingsNotes";
import SavingsTable from "./savings/SavingsTable";
import SavingsTotals from "./savings/SavingsTotals";
import { savingsRows, totalsOf, YEARS } from "./savings/savings_math";

interface Props {
  calculator: Calculator;
  target: number;
  yearlyUses: number;
  item: ItemType;
}

/** Optional menu: yearly spending today vs. holding your stock at the recommended number. */
export default function SavingsPanel({ calculator, target, yearlyUses, item }: Props) {
  const { owned, buyPerYear, price, minPlays, maxPlays } = calculator;
  const todayCost = buyPerYear * price;
  const plan = purchasePlan(owned, target, yearlyUses, minPlays, maxPlays, YEARS);
  const rows = savingsRows(plan, price, todayCost);
  const totals = totalsOf(rows);
  const yearsToTarget = owned < target ? yearsToReach(owned, target, yearlyUses, minPlays, maxPlays) : 0;

  return (
    <details className="panel mini-savings">
      <summary>Savings (optional)</summary>
      <SavingsInputs calculator={calculator} item={item} />
      <SavingsTable rows={rows} todayCost={todayCost} />
      <SavingsTotals saved={totals.saved} spent={totals.spent} spentToday={todayCost * YEARS} />
      <SavingsNotes item={item} target={target} yearsToTarget={yearsToTarget} minPlays={minPlays} maxPlays={maxPlays} />
    </details>
  );
}
