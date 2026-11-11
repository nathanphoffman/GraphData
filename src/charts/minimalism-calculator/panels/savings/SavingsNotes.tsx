import { capitalize, type ItemType } from "../../logic/items";

interface Props {
  item: ItemType;
  target: number;
  yearsToTarget: number | null;
  minPlays: number;
  maxPlays: number;
}

/** How long it takes to reach the target, and how the number of purchases is worked out. */
export default function SavingsNotes({ item, target, yearsToTarget, minPlays, maxPlays }: Props) {
  return (
    <>
      <p className="muted">
        {yearsToTarget === null && ` You would take over 100 years to reach ${target} ${item.many}.`}
        {yearsToTarget !== null &&
          yearsToTarget > 0 &&
          ` You would reach ${target} ${item.many} in about ${yearsToTarget} ${yearsToTarget === 1 ? "year" : "years"}.`}
      </p>
      <p className="muted">
        Every {Math.max(1, minPlays)} {item.uses} earns you one purchase, so you only buy once what you own has paid
        off.
        {capitalize(item.many)} wear out after about {Math.max(minPlays, maxPlays)} {item.uses} and get replaced.
      </p>
    </>
  );
}
