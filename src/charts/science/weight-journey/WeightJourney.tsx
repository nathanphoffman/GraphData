import { useEffect, useState } from "react";
import "./styles.css";
import { Controls, RANGES } from "./parts/Controls";
import { Legend } from "./parts/Legend";
import { StatsBar } from "./parts/StatsBar";
import { WeightChart } from "./parts/WeightChart";
import { WeightTable } from "./parts/WeightTable";
import { type Lines, type ProjectionTool, useProjections } from "./useProjections";
import { setWeights } from "./model/rows";
import { makeFormat, type Unit } from "./model/units";

const ALL_LINES: Lines = { quadratic: true, general: true, allTrend: true, spread: true };

/** Weight journey page: units, chart, table and projections. */
function Journey() {
  const [range, setRange] = useState(RANGES[0]);
  const [unit, setUnit] = useState<Unit>("lb");
  const [tool, setTool] = useState<ProjectionTool>({ lossInput: "", months: "12" });
  const [lines, setLines] = useState(ALL_LINES);
  const [fatRatio, setFatRatio] = useState({ enabled: false, value: "0.3" });
  const f = makeFormat(unit);
  const ratio = fatRatio.enabled && fatRatio.value !== "" && Number(fatRatio.value) >= 0 ? Number(fatRatio.value) : null;
  const proj = useProjections(tool, f.k, lines, ratio);

  return (
    <div className="weight">
      <StatsBar unit={unit} f={f} />
      <Controls unit={unit} f={f} onUnit={setUnit} range={range} onRange={setRange} tool={tool} onTool={setTool} tapered={proj.tapered} lines={lines} onLines={setLines} fatRatio={fatRatio} onFatRatio={setFatRatio} />
      <WeightChart input={{ rangeDays: range.days, k: f.k, ...proj }} lines={lines} />
      <Legend lines={lines} tapered={proj.tapered !== null} fatRatio={ratio} />
      <WeightTable unit={unit} f={f} />
    </div>
  );
}

/** Fetches the weigh-ins from the API, then shows the journey. */
export default function WeightJourney() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/weights")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((data: { weights: [string, number][] }) => {
        setWeights(data.weights);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Loading weights…</p>;
  if (status === "error") return <p>Could not load the weights.</p>;

  return <Journey />;
}
