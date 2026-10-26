import { useCallback, useEffect, useState } from "react";
import { callApi } from "../../../api";
import "./styles.css";
import { Controls, RANGES } from "./parts/Controls";
import { Legend } from "./parts/Legend";
import { StatsBar } from "./parts/StatsBar";
import { EditPanel } from "./parts/EditPanel";
import { WeightChart } from "./parts/WeightChart";
import { WeightTable } from "./parts/WeightTable";
import { type Lines, type ProjectionTool, useProjections } from "./useProjections";
import { type Model, setWeights } from "./model/rows";
import { makeFormat, type Unit } from "./model/units";

const ALL_LINES: Lines = { quadratic: true, general: true, allTrend: true, spread: true };

/** Weight journey page: units, chart, table and projections. */
function Journey({ model }: { model: Model }) {
  const [range, setRange] = useState(RANGES[0]);
  const [unit, setUnit] = useState<Unit>("lb");
  const [tool, setTool] = useState<ProjectionTool>({ lossInput: "", months: "12" });
  const [lines, setLines] = useState(ALL_LINES);
  const [fatRatio, setFatRatio] = useState({ enabled: false, value: "0.3" });
  const unitFormat = makeFormat(unit);
  const ratio = fatRatio.enabled && fatRatio.value !== "" && Number(fatRatio.value) >= 0 ? Number(fatRatio.value) : null;
  const proj = useProjections(tool, unitFormat.k, lines, ratio, model);

  return (
    <div className="weight">
      <StatsBar unit={unit} f={unitFormat} />
      <Controls unit={unit} f={unitFormat} onUnit={setUnit} range={range} onRange={setRange} tool={tool} onTool={setTool} tapered={proj.tapered} lines={lines} onLines={setLines} fatRatio={fatRatio} onFatRatio={setFatRatio} />
      <WeightChart input={{ rangeDays: range.days, k: unitFormat.k, ...proj }} lines={lines} />
      <Legend lines={lines} tapered={proj.tapered !== null} fatRatio={ratio} />
      <WeightTable unit={unit} f={unitFormat} dailyRows={model.dailyRows} />
    </div>
  );
}

/** Fetches the weigh-ins from the API, then shows the journey and the editor. */
export default function WeightJourney() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  // Replaced on every reload so the chart and table recalculate from the new weigh-ins.
  const [model, setModel] = useState<Model | null>(null);

  const load = useCallback(async () => {
    const data = await callApi<{ weights: [string, number][] }>("/api/weights");
    setModel(setWeights(data.weights));
  }, []);

  // Load the weigh-ins once; show the page when it works and an error message when it does not.
  useEffect(() => {
    load()
      .then(() => setStatus("ready"))
      .catch(() => setStatus("error"));
  }, [load]);

  if (status === "error") return <p>Could not load the weights.</p>;
  if (status === "loading" || !model) return <p>Loading weights…</p>;

  return (
    <>
      <Journey model={model} />
      <EditPanel onSaved={load} />
    </>
  );
}
