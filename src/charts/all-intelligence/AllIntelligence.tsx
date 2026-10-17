import { Fragment, useMemo, useState } from "react";
import "./styles.css";
import data from "../../../data/all-intelligence.json";
import type { AllIntelligenceData, ScoredSubject, Settings } from "./types";
import { DEFAULT_SETTINGS, estimateScore, knownScore, scoreSubjects } from "./calculate";

const model = data as AllIntelligenceData;
const totalColumns = Object.keys(model.columns).length;

type SortKey = "name" | "overall" | "measured" | string;

function fmt(value: number | null | undefined): string {
  return value === null || value === undefined ? "—" : value.toFixed(1);
}

function sortValue(row: ScoredSubject, key: SortKey): number | string {
  if (key === "name") return row.subject.name;
  if (key === "overall") return row.overall ?? -1;
  if (key === "measured") return row.measured;
  return row.groups[key] ?? -1;
}

export default function AllIntelligence() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [ascending, setAscending] = useState(false);
  const [open, setOpen] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    const scored = scoreSubjects(model, settings);
    return scored.sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return ascending ? cmp : -cmp;
    });
  }, [settings, sortKey, ascending]);

  const sortBy = (key: SortKey) => {
    if (key === sortKey) setAscending(!ascending);
    else {
      setSortKey(key);
      setAscending(key === "name");
    }
  };

  const toggleOpen = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  const set = (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch }));
  const arrow = (key: SortKey) => (key === sortKey ? (ascending ? " ▲" : " ▼") : "");
  const colSpan = 4 + model.groups.length;

  return (
    <div className="allint">
      <div className="panel">
        <label className="allint-slider">
          <span>Real zero counts as worst score ÷</span>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={settings.zeroDivisor}
            onChange={(e) => set({ zeroDivisor: Number(e.target.value) })}
          />
          <strong>{settings.zeroDivisor.toFixed(1)}×</strong>
        </label>
        <div className="allint-slider">
          <span>Not measured:</span>
          <select value={settings.missingMode} onChange={(e) => set({ missingMode: e.target.value as Settings["missingMode"] })}>
            <option value="skip">Skip it (score only what was tested)</option>
            <option value="floor">Count as a low score</option>
            <option value="estimate">Guess from its other scores</option>
          </select>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            disabled={settings.missingMode !== "floor"}
            value={settings.missingDivisor}
            onChange={(e) => set({ missingDivisor: Number(e.target.value) })}
          />
          <strong>{settings.missingMode === "floor" ? `${settings.missingDivisor.toFixed(1)}×` : settings.missingMode}</strong>
        </div>
        <p className="allint-formula">
          Score = geometric mean of the {model.groups.length} group scores. Each group score is the geometric mean of its
          columns. Click a row to see its columns.
        </p>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="sortable" onClick={() => sortBy("name")}>Name{arrow("name")}</th>
              <th className="sortable" onClick={() => sortBy("overall")}>Score{arrow("overall")}</th>
              {model.groups.map((g) => (
                <th key={g.id} className="sortable allint-group-th" onClick={() => sortBy(g.id)}>{g.name.replace("& ", "&\n")}{arrow(g.id)}</th>
              ))}
              <th className="sortable" onClick={() => sortBy("measured")}>Measured{arrow("measured")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const name = row.subject.name;
              const isOpen = open.has(name);
              return (
                <Fragment key={name}>
                  <tr className={`allint-row allint-${row.subject.kind}`} onClick={() => toggleOpen(name)}>
                    <td>{i + 1}</td>
                    <td className="allint-name">
                      {name} <span className="allint-maker">{row.subject.maker}</span>
                    </td>
                    <td className="allint-score">{fmt(row.overall)}</td>
                    {model.groups.map((g) => (
                      <td key={g.id}>{fmt(row.groups[g.id])}</td>
                    ))}
                    <td>{row.measured}/{totalColumns}</td>
                  </tr>
                  {isOpen && (
                    <tr className="allint-detail">
                      <td colSpan={colSpan}>
                        <div className="allint-detail-grid">
                          {model.groups.map((g) => (
                            <div key={g.id} className="allint-detail-group">
                              <h4>{g.name}</h4>
                              {g.columns.map((key) => {
                                const real = knownScore(row.subject, key);
                                const isProxy = row.subject.scores[key] === undefined && real !== undefined;
                                const guess = settings.missingMode === "estimate" ? estimateScore(model, row.subject, key) : null;
                                return (
                                  <span key={key}>
                                    {model.columns[key]}:{" "}
                                    <strong>
                                      {real !== undefined ? `${real.toFixed(0)}${isProxy ? " (from price)" : ""}` : (guess !== null ? `~${guess.toFixed(0)} (guess)` : "not measured")}
                                    </strong>
                                  </span>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="muted allint-source">{model.source}</p>
    </div>
  );
}
