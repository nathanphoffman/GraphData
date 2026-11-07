import { useState } from "react";
import { entriesFor, FILTERS } from "../model/timeline";
import type { Loop } from "../model/types";
import AreaBars from "./AreaBars";
import Files from "./Files";
import LinesChart from "./LinesChart";
import LoopTiles from "./LoopTiles";
import Timeline from "./Timeline";

/** One loop: its state, numbers, progress per area, size graph, and a filterable timeline (or its files). */
export default function LoopView({ loop }: { loop: Loop }) {
  const [filter, setFilter] = useState("all");

  return (
    <section className="ralph-card">
      <header className="ralph-head">
        <h2>{loop.name}</h2>
        <span className={`ralph-state ralph-state-${loop.state}`}>{loop.state}</span>
      </header>
      <LoopTiles loop={loop} />
      <AreaBars areas={loop.areas} />
      <LinesChart commits={loop.commits} />
      <div className="ralph-filters">
        {FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filter === option.id}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {filter === "files" ? <Files loop={loop} /> : <Timeline entries={entriesFor(loop, filter)} />}
    </section>
  );
}
