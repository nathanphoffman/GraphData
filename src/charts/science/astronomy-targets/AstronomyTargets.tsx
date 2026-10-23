import { useMemo, useState } from "react";
import "./styles.css";
import data from "../../../../data/astronomy/astronomy-targets.json";
import { ControlsPanel } from "./controls/ControlsPanel";
import { buildSchedule, DEFAULT_SETTINGS, scoreTargets } from "./model/calculate";
import type { Schedule } from "./model/calculate";
import { parseHidden, parseSeasonFilter, parseSettings, type SeasonFilter } from "./model/storage";
import type { AstronomyTargetsData, ScoredTarget, Settings } from "./model/types";
import { useStoredState } from "./model/useStoredState";
import { ScheduleModal } from "./preview/Schedule";
import { TargetPreview } from "./preview/TargetPreview";
import { COLUMNS, defaultHidden } from "./table/columns";
import { Footnotes } from "./table/Footnotes";
import { type Hover, TargetTable } from "./table/TargetTable";
import { Toolbar } from "./table/Toolbar";

const model = data as AstronomyTargetsData;

/** Targets matching the season filter and the search box (id, nickname, constellation or type). */
function filterRows(scored: ScoredTarget[], season: SeasonFilter | null, query: string) {
  const needle = query.trim().toLowerCase();

  // Keep rows that match the chosen season and whose id, nickname, constellation or type contains the search text.
  return scored.filter(
    // Match the season, and the search text against id, nickname, constellation and type.
    (scoredTarget) =>
      (!season || scoredTarget.target.bestSeason === season) &&
      (!needle || [scoredTarget.target.id, scoredTarget.target.nickname, scoredTarget.target.constellation, scoredTarget.target.type].some((value) => value.toLowerCase().includes(needle))),
  );
}

/** Which optional columns are shown, in display order (the ones that go right after the Score column come first). */
function useColumns() {
  const [hiddenList, setHiddenList] = useStoredState<string[]>("hidden-columns", defaultHidden, parseHidden);
  const hidden = useMemo(() => new Set(hiddenList), [hiddenList]);
  const toggle = (identifier: string) => setHiddenList((prev) => (prev.includes(identifier) ? prev.filter((height) => height !== identifier) : [...prev, identifier]));
  const visible = COLUMNS.filter((column) => !hidden.has(column.id));

  return { hidden, toggle, columns: [...visible.filter((column) => column.afterScore), ...visible.filter((column) => !column.afterScore)] };
}

/** The astronomy targets page: holds the settings, filters and hover state, and wires them to the table and previews. */
export default function AstronomyTargets() {
  const [settings, setSettings] = useStoredState<Settings>("settings", DEFAULT_SETTINGS, parseSettings);
  const set = (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch }));
  const { hidden, toggle, columns } = useColumns();
  const [seasonFilter, setSeasonFilter] = useStoredState<SeasonFilter | null>("season-filter", null, parseSeasonFilter);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [hover, setHover] = useState<Hover | null>(null);
  const [query, setQuery] = useState("");
  const scored = useMemo(() => scoreTargets(model.targets, settings), [settings]);
  const rows = filterRows(scored, seasonFilter, query);
  const hovered = hover && rows.find((scoredTarget) => scoredTarget.target.id === hover.id);

  return (
    <div className="astro">
      <ControlsPanel settings={settings} set={set} />
      <Toolbar
        query={query}
        onQuery={setQuery}
        value={seasonFilter}
        onToggle={(season) => setSeasonFilter((prev) => (prev === season ? null : season))}
        onSchedule={(season) => setSchedule(buildSchedule(scored, season, settings))}
        hidden={hidden}
        onToggleColumn={toggle}
        count={`${rows.length} of ${model.targets.length} targets`}
      />
      <TargetTable rows={rows} settings={settings} columns={columns} onHover={setHover} />
      {schedule && <ScheduleModal schedule={schedule} onClose={() => { setSchedule(null); setHover(null); }} onHover={setHover} />}
      {hover && hovered && <TargetPreview row={hovered} settings={settings} x={hover.x} y={hover.y} />}
      <Footnotes source={model.source} />
    </div>
  );
}
