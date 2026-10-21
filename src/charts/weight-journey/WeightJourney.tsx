import { useState } from "react";
import "./styles.css";
import { Controls, RANGES } from "./parts/Controls";
import { Legend } from "./parts/Legend";
import { StatsBar } from "./parts/StatsBar";
import { WeightChart } from "./parts/WeightChart";
import { WeightTable } from "./parts/WeightTable";
import { type Lines, type ProjectionTool, useProjections } from "./useProjections";
import { makeFormat, type Unit } from "./model/units";

const ALL_LINES: Lines = { quadratic: true, general: true, allTrend: true, spread: true };

export default function WeightJourney() {
  const [range, setRange] = useState(RANGES[0]);
  const [unit, setUnit] = useState<Unit>("lb");
  const [tool, setTool] = useState<ProjectionTool>({ lossInput: "", months: "12" });
  const [lines, setLines] = useState(ALL_LINES);
  const f = makeFormat(unit);
  const proj = useProjections(tool, f.k, lines);
  return (
    <div className="weight">
      <StatsBar unit={unit} f={f} />
      <Controls unit={unit} f={f} onUnit={setUnit} range={range} onRange={setRange} tool={tool} onTool={setTool} tapered={proj.tapered} lines={lines} onLines={setLines} />
      <WeightChart input={{ rangeDays: range.days, k: f.k, ...proj }} lines={lines} />
      <Legend lines={lines} tapered={proj.tapered !== null} />
      <WeightTable unit={unit} f={f} />
    </div>
  );
}
