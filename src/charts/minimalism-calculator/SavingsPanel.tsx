import { purchasePlan, yearsToReach } from "./spending";
import { cap, type ItemType } from "./items";

interface Props {
  owned: number;
  target: number;
  yearlyUses: number;
  item: ItemType;
  buyPerYear: number;
  onBuyPerYear: (v: number) => void;
  price: number;
  onPrice: (v: number) => void;
  minPlays: number;
  onMinPlays: (v: number) => void;
  maxPlays: number;
  onMaxPlays: (v: number) => void;
}

const YEARS = 10;
const money = (v: number) => `$${Math.round(v).toLocaleString()}`;

function NumberField({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" min={0} step="any" value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))} />
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
  const rows = plan.map((bought, i) => ({
    label: i === YEARS - 1 ? `Year ${YEARS} and beyond` : `Year ${i + 1}`,
    bought,
    cost: bought * price,
    saved: todayCost - bought * price,
  }));
  const yearsToTarget = owned < target ? yearsToReach(owned, target, yearlyUses, minPlays, maxPlays) : 0;
  const totalSaved = rows.reduce((sum, r) => sum + r.saved, 0);

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
          {rows.map((r) => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td>{money(todayCost)}</td>
              <td>
                {money(r.cost)} <span className="muted">({Math.round(r.bought * 10) / 10} bought)</span>
              </td>
              <td style={{ color: r.saved >= 0 ? "#16a34a" : "#dc2626" }}>
                <strong>
                  {r.saved >= 0 ? "" : "−"}
                  {money(Math.abs(r.saved))}
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
      </div>
      <p className="muted">
        {yearsToTarget === null && ` You would take over 100 years to reach ${target} ${item.many}.`}
        {yearsToTarget !== null && yearsToTarget > 0 &&
          ` You would reach ${target} ${item.many} in about ${yearsToTarget} ${yearsToTarget === 1 ? "year" : "years"}.`}
      </p>
      <p className="muted">
        Every {Math.max(1, minPlays)} {item.uses} earns you one purchase, so you only buy once what you own has paid off.
        {cap(item.many)} wear out after about {Math.max(minPlays, maxPlays)} {item.uses} and get replaced.
      </p>
    </details>
  );
}
