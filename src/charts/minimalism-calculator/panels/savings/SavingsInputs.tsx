import type { ItemType } from "../../logic/items";
import type { Calculator } from "../../state/state";
import NumberField from "./NumberField";

/** The four numbers the savings estimate starts from. */
export default function SavingsInputs({ calculator, item }: { calculator: Calculator; item: ItemType }) {
  return (
    <div className="mini-savings-inputs">
      <NumberField
        id="buy-per-year"
        label={`How many ${item.many} were you buying per year?`}
        value={calculator.buyPerYear}
        onChange={calculator.setBuyPerYear}
      />
      <NumberField
        id="price"
        label={`Average cost of one ${item.one} ($)`}
        value={calculator.price}
        onChange={calculator.setPrice}
      />
      <NumberField
        id="min-plays"
        label={`Minimum ${item.uses} to make it worth it`}
        value={calculator.minPlays}
        onChange={calculator.setMinPlays}
      />
      <NumberField
        id="max-plays"
        label={`Maximum ${item.uses} you can typically get`}
        value={calculator.maxPlays}
        onChange={calculator.setMaxPlays}
      />
    </div>
  );
}
