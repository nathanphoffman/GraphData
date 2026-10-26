import { useState } from "react";
import { recommendedCount } from "../logic/calculate";
import { MARK_ALL_UP_TO, MARK_EVERY, SHARING_MAX_PEOPLE, SHARING_MIN_PEOPLE } from "../logic/constants";
import CurveChart from "./CurveChart";
import type { ItemType } from "../logic/items";

interface Props {
  /** Exact recommendation if you supplied everything yourself (100% share). */
  soloNeeded: number;
  /** How many people share, counting you (100 / your share %). */
  people: number;
  item: ItemType;
  /** Called while you drag the ring, with a whole number of people. */
  onPeople: (people: number) => void;
}

/** The curve is drawn through this many points per person on the axis. */
const SAMPLES_PER_PERSON = 4;

/** Curve of how many you should own as more people share the load. */
export default function SharingCurve({ soloNeeded, people, item, onPeople }: Props) {
  // The right edge of the axis is held still while dragging so the chart doesn't rescale under the pointer.
  const [frozenMax, setFrozenMax] = useState<number | null>(null);
  const xMax = frozenMax ?? Math.min(SHARING_MAX_PEOPLE, Math.max(SHARING_MIN_PEOPLE, Math.ceil(people)));
  const at = (n: number) => soloNeeded / n;

  // Past 10 people only every fifth dot is labeled, to keep the numbers readable.
  const marks = Array.from({ length: xMax }, (_unused, index) => index + 1).filter((n) => xMax <= MARK_ALL_UP_TO || n === 1 || n % MARK_EVERY === 0);

  return (
    <div className="panel mini-chart">
      <h3>What sharing does</h3>
      <p className="muted">
        {people > 1
          ? `Sharing with ${people.toFixed(people % 1 ? 1 : 0)} people, you'd own ${recommendedCount(at(people))} ${item.many} instead of ${recommendedCount(soloNeeded)}.`
          : `On your own you should own ${recommendedCount(soloNeeded)} ${item.many}. Lower your share to see the drop.`}
      </p>
      <CurveChart
        ariaLabel={`${item.many} to own by number of people sharing`}
        xLabel="People sharing (including you)"
        color="var(--link)"
        at={at}
        yMax={Math.max(soloNeeded, 1)}
        toFrac={(n) => (n - 1) / (xMax - 1)}
        samples={Array.from({ length: (xMax - 1) * SAMPLES_PER_PERSON + 1 }, (_unused, index) => 1 + index / SAMPLES_PER_PERSON)}
        marks={marks}
        current={Math.min(people, xMax)}
        onDragStart={() => setFrozenMax(xMax)}
        onDrag={(frac) => onPeople(Math.round(1 + frac * (xMax - 1)))}
        onDragEnd={() => setFrozenMax(null)}
      />
    </div>
  );
}
