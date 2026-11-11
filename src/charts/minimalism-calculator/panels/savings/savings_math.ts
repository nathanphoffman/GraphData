export const YEARS = 10;

/** Dollar amounts rounded to whole dollars, since the estimates are too rough for cents. */
export const money = (value: number) => `$${Math.round(value).toLocaleString()}`;

export interface SavingsRow {
  label: string;
  bought: number;
  cost: number;
  saved: number;
}

/** One row per year of the plan, with the last row standing for every later year. */
export function savingsRows(plan: number[], price: number, todayCost: number): SavingsRow[] {
  return plan.map((bought, index) => ({
    label: index === YEARS - 1 ? `Year ${YEARS} and beyond` : `Year ${index + 1}`,
    bought,
    cost: bought * price,
    saved: todayCost - bought * price,
  }));
}

/** What every year saves and costs, added up. */
export function totalsOf(rows: SavingsRow[]) {
  // Add up every year's savings and every year's spending.
  return {
    saved: rows.reduce((total, yearRow) => total + yearRow.saved, 0),
    spent: rows.reduce((total, yearRow) => total + yearRow.cost, 0),
  };
}
