import { useState } from "react";
import { recommendedCount } from "../logic/calculate";
import CurveChart from "./CurveChart";
import { cap, type ItemType } from "../logic/items";
import { PER_YEAR_STOPS } from "../logic/stops";

interface Props {
  /** Your own uses per year (weekly uses x 52 x your share). */
  yearlyUses: number;
  /** Uses per year you want from each item. */
  goal: number;
  item: ItemType;
  /** Called while you drag the ring, with the nearest slider value. */
  onGoal: (goal: number) => void;
}

const X_MAX = 365;
const MARKS = [0.1, 0.25, 0.5, 1, 2, 5, 10, 25, 52, 100, 365];
const SAMPLES = 120;

/** Curve of how many you should own for each uses-per-year expectation, with your setting marked. */
export default function GoalCurve({ yearlyUses, goal, item, onGoal }: Props) {
  // The left edge of the axis is held still while dragging so the chart doesn't rescale under the pointer.
  const [frozenMin, setFrozenMin] = useState<number | null>(null);
  const xMin = frozenMin ?? Math.min(1, goal);
  const at = (n: number) => yearlyUses / n;
  const double = goal * 2;

  const nearestStop = (n: number) =>
    PER_YEAR_STOPS.reduce((best, v) => (Math.abs(Math.log(v / n)) < Math.abs(Math.log(best / n)) ? v : best));

  return (
    <div className="panel mini-chart">
      <h3>What your {item.uses}-per-year goal does</h3>
      <p className="muted">
        Wanting {goal} {item.uses} a year from each {item.one} means {recommendedCount(at(goal))} {item.many}.
        {double <= X_MAX && ` Double that to ${double} and you need ${recommendedCount(at(double))}.`}
      </p>
      <CurveChart
        ariaLabel={`${item.many} to own by ${item.uses} per year wanted`}
        xLabel={`${cap(item.uses)} per year wanted from each ${item.one}`}
        color="#9333ea"
        at={at}
        yMax={Math.max(yearlyUses / xMin, 1)}
        toFrac={(n) => Math.log(n / xMin) / Math.log(X_MAX / xMin)}
        samples={Array.from({ length: SAMPLES + 1 }, (_, i) => xMin * (X_MAX / xMin) ** (i / SAMPLES))}
        marks={MARKS.filter((m) => m >= xMin)}
        current={goal}
        onDragStart={() => setFrozenMin(xMin)}
        onDrag={(frac) => onGoal(nearestStop(xMin * (X_MAX / xMin) ** frac))}
        onDragEnd={() => setFrozenMin(null)}
      />
    </div>
  );
}
