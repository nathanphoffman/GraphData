import { TENTH } from "../logic/constants";
import { purchasePlan, yearsToReach } from "../logic/spending";
import { capitalize, type ItemType } from "../logic/items";

interface Props {
  owned: number;
  target: number;
  yearlyUses: number;
  item: ItemType;
  buyPerYear: number;
  onBuyPerYear: (value: number) => void;
  price: number;
  onPrice: (value: number) => void;
  minPlays: number;
  onMinPlays: (value: number) => void;
  maxPlays: number;
  onMaxPlays: (value: number) => void;
}

const YEARS = 10;

/** Dollar amounts rounded to whole dollars, since the estimates are too rough for cents. */
const money = (value: number) => `$${Math.round(value).toLocaleString()}`;

/** Number input that only accepts non-negative amounts. */
function NumberField({ id: fieldId, label, value, onChange }: { id: string; label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div>
      <label htmlFor={fieldId}>{label}</label>
      <input id={fieldId} type="number" min={0} step="any" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} />
    </div>
  );
}

/** Optional menu: yearly spending today vs. holding your stock at the recommended number. */
export default function SavingsPanel({
  owned,
  target,
  yearlyUses,
  item,
  buyPerYear,
  onBuyPerYear,
  price,
  onPrice,
  minPlays,
  onMinPlays,
  maxPlays,
  onMaxPlays,
}: Props) {
  const todayCost = buyPerYear * price;
  const plan = purchasePlan(owned, target, yearlyUses, minPlays, maxPlays, YEARS);

  // One row per year of the plan, with the last row standing for every later year.
  const rows = plan.map((bought, index) => ({
    label: index === YEARS - 1 ? `Year ${YEARS} and beyond` : `Year ${index + 1}`,
    bought,
    cost: bought * price,
    saved: todayCost - bought * price,
  }));

  const yearsToTarget = owned < target ? yearsToReach(owned, target, yearlyUses, minPlays, maxPlays) : 0;

  // Add up every year's savings.
  const totalSaved = rows.reduce((total, yearRow) => total + yearRow.saved, 0);

  // Add up every year's spending.
  const totalSpent = rows.reduce((total, yearRow) => total + yearRow.cost, 0);
  const totalToday = todayCost * YEARS;

  return (
    <details className="panel mini-savings">
      <summary>Savings (optional)</summary>
      <div className="mini-savings-inputs">
        <NumberField id="buy-per-year" label={`How many ${item.many} were you buying per year?`} value={buyPerYear} onChange={onBuyPerYear} />
        <NumberField id="price" label={`Average cost of one ${item.one} ($)`} value={price} onChange={onPrice} />
        <NumberField id="min-plays" label={`Minimum ${item.uses} to make it worth it`} value={minPlays} onChange={onMinPlays} />
        <NumberField id="max-plays" label={`Maximum ${item.uses} you can typically get`} value={maxPlays} onChange={onMaxPlays} />
      </div>
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
          {/* One table row per year. */}
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
      <div className={`mini-total ${totalSaved >= 0 ? "mini-total-save" : "mini-total-spend"}`}>
        <div className="mini-total-label">Total over {YEARS} years</div>
        <div className="mini-total-amount">
          {totalSaved >= 0 ? "Save" : "Spend"} {money(Math.abs(totalSaved))}
          {totalSaved < 0 && " more"}
        </div>
        <div className="mini-total-label">Total spent over {YEARS} years</div>
        <div className="mini-total-amount">
          {money(totalSpent)} <span className="muted">(vs. {money(totalToday)})</span>
        </div>
      </div>
      <p className="muted">
        {yearsToTarget === null && ` You would take over 100 years to reach ${target} ${item.many}.`}
        {yearsToTarget !== null && yearsToTarget > 0 &&
          ` You would reach ${target} ${item.many} in about ${yearsToTarget} ${yearsToTarget === 1 ? "year" : "years"}.`}
      </p>
      <p className="muted">
        Every {Math.max(1, minPlays)} {item.uses} earns you one purchase, so you only buy once what you own has paid off.
        {capitalize(item.many)} wear out after about {Math.max(minPlays, maxPlays)} {item.uses} and get replaced.
      </p>
    </details>
  );
}
