import { useMemo, useState } from "react";
import "./styles.css";
import { useSort } from "../../useSort";
import data from "../../../../data/intelligence/all-intelligence.json";
import type { AllIntelligenceData, ScoredSubject, Settings } from "./types";
import { DEFAULT_SETTINGS, scoreSubjects } from "./calculate";
import { ResultsTable, type SortKey } from "./ResultsTable";
import { SettingsPanel } from "./SettingsPanel";

const model = data as AllIntelligenceData;

/** Missing scores count as -1 so they always land at the bottom when sorting highest first. */
function sortValue(scoredSubject: ScoredSubject, sortKey: SortKey): number | string {
  if (sortKey === "name") return scoredSubject.subject.name;

  if (sortKey === "overall") return scoredSubject.overall ?? -1;

  if (sortKey === "measured") return scoredSubject.measured;

  return scoredSubject.groups[sortKey] ?? -1;
}

/** Row ordering for the table: names alphabetical, scores numeric, with the direction applied last. */
function compareRows(scoredSubject: ScoredSubject, second: ScoredSubject, sortKey: SortKey, ascending: boolean) {
  const av = sortValue(scoredSubject, sortKey);
  const bv = sortValue(second, sortKey);
  const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);

  return ascending ? cmp : -cmp;
}

/** All intelligence page: holds the settings, sort and open rows and passes them to the table. */
export default function AllIntelligence() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const { sortKey, ascending, sortBy } = useSort<SortKey>("overall");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const rows = useMemo(() => scoreSubjects(model, settings).sort((scoredSubject, second) => compareRows(scoredSubject, second, sortKey, ascending)), [settings, sortKey, ascending]);

  // Flip one name in the set of open rows.
  const toggleOpen = (name: string) =>
    // Copy the set first, because React state must not be changed in place.
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
