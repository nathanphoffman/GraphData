import { useMemo, useState } from "react";
import "./styles.css";
import { useSort } from "../useSort";
import data from "../../../data/intelligence/all-intelligence.json";
import type { AllIntelligenceData, ScoredSubject, Settings } from "./types";
import { DEFAULT_SETTINGS, scoreSubjects } from "./calculate";
import { ResultsTable, type SortKey } from "./ResultsTable";
import { SettingsPanel } from "./SettingsPanel";

const model = data as AllIntelligenceData;

function sortValue(row: ScoredSubject, key: SortKey): number | string {
  if (key === "name") return row.subject.name;

  if (key === "overall") return row.overall ?? -1;

  if (key === "measured") return row.measured;

  return row.groups[key] ?? -1;
}

function compareRows(a: ScoredSubject, b: ScoredSubject, key: SortKey, ascending: boolean) {
  const av = sortValue(a, key);
  const bv = sortValue(b, key);
  const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);

  return ascending ? cmp : -cmp;
}

export default function AllIntelligence() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const { sortKey, ascending, sortBy } = useSort<SortKey>("overall");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const rows = useMemo(() => scoreSubjects(model, settings).sort((a, b) => compareRows(a, b, sortKey, ascending)), [settings, sortKey, ascending]);

  const toggleOpen = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <div className="allint">
      <SettingsPanel settings={settings} set={(patch) => setSettings((prev) => ({ ...prev, ...patch }))} groupCount={model.groups.length} />
      <ResultsTable model={model} rows={rows} settings={settings} open={open} onToggle={toggleOpen} sortKey={sortKey} ascending={ascending} onSort={sortBy} />
      <p className="muted allint-source">{model.source}</p>
    </div>
  );
}
