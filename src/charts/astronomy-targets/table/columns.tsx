import type { CSSProperties, ReactNode } from "react";
import { formatHour, formatSize, qualityAdjust, SEASONS, surfaceBrightness } from "../model/calculate";
import type { ScoredTarget, Settings } from "../model/types";
import { heat, Percent } from "./heat";

export interface Column {
  id: string;
  label: string;
  title?: string;
  /** Shown by default. */
  show: boolean;
  /** Placed right after the Score column, ahead of the other columns. */
  afterScore?: boolean;
  cell: (row: ScoredTarget, settings: Settings) => ReactNode;
}

function SeasonCell({ row }: { row: ScoredTarget }) {
  const season = row.target.bestSeason;
  return (
    <>
      <span className={`astro-tag astro-tag-${season}`}>{season === "any" ? "Any" : SEASONS[season].label.split(" ")[0]}</span>
      <div className="astro-hour">{row.bestHour === null ? "Varies" : formatHour(row.bestHour)}</div>
    </>
  );
}

function Stack({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <div className="astro-stack">
      <span>{top}</span>
      <span className="astro-sub">{bottom}</span>
    </div>
  );
}

const fmtAdjust = (v: number) => (v >= 0 ? `+${v}` : `−${-v}`);

function Chip({ value, scale, title, suffix = "" }: { value: number; scale: number; title: string; suffix?: string }) {
  return <span className="astro-tag" style={{ "--tag": heat(0.5 + value / scale, 1) } as CSSProperties} title={title}>{fmtAdjust(value)}{suffix}</span>;
}

function AdjustCell({ row, settings }: { row: ScoredTarget; settings: Settings }) {
  const quality = Math.round(qualityAdjust(row.target, settings) * 10) / 10;
  const { simAdjust: sim, authorAdjust: author } = row.target;
  return (
    <div className="astro-chips">
      {sim === undefined ? "—" : <Chip value={sim} scale={60} title="Simulator adjustment" suffix="%" />}
      {author === undefined ? "--" : <Chip value={author} scale={30} title="Author adjustment" />}
      <Chip value={quality} scale={50} title="Quality adjustment" />
    </div>
  );
}

const SEASON_TITLE = "The season when it is best placed, and below it the ideal hour to look: the average over that season of when it is highest in the dark (local solar time). Planets have no fixed best hour.";
const ADJUST_TITLE = "First chip: how much better (+) or worse (-), in percentage points, the eyepiece preview looks than the score suggests (judged at small-medium focal length and mirror/lens). Second chip: the author's own adjustment in score points, from field experience. -- = not rated yet (counts as 0). Third chip: score points for the telescope's optical quality, which helps planets, stars and clusters most and barely affects nebulae and galaxies (always added in full). Part of the first two is added to the score, set by the sliders above the table, and scaled by the Bortle setting (judged at Bortle 5). Positive ones grow to 1.5x at Bortle 1 and fade to 0 at Bortle 9; negative ones shrink to 0.5x at Bortle 1 and grow to 1.5x at Bortle 9.";

/** Optional columns, in display order. The rank, target name and score are always shown. */
export const COLUMNS: Column[] = [
  { id: "constellation", label: "Constellation", show: false, cell: (r) => r.target.constellation },
  { id: "season", label: "Best time", title: SEASON_TITLE, show: true, cell: (r) => <SeasonCell row={r} /> },
  {
    id: "magsize",
    label: "Mag / Size",
    title: "Top: total magnitude (smaller is brighter). Bottom: apparent size.",
    show: true,
    cell: (r) => <Stack top={r.target.magnitude.toFixed(1)} bottom={formatSize(r.target.major, r.target.minor)} />,
  },
  {
    id: "sbalt",
    label: "Surf. br. / Peak alt",
    title: "Top: magnitude per square arcminute, the light spread over the target (higher = dimmer). Bottom: highest altitude it reaches while it is dark.",
    show: true,
    cell: (r) => (
      <Stack
        top={r.target.type === "Star" || r.target.planet ? "—" : surfaceBrightness(r.target).toFixed(1)}
        bottom={r.peakAltitude > 0 ? `${r.peakAltitude.toFixed(0)}°` : "below horizon"}
      />
    ),
  },
  { id: "sky", label: "Sky", show: true, cell: (r) => <Percent value={r.sky} /> },
  { id: "fit", label: "Size fit", show: true, cell: (r) => <Percent value={r.fit} /> },
  { id: "light", label: "Light", show: true, cell: (r) => <Percent value={r.light} /> },
  { id: "core", label: "Core", show: true, cell: (r) => <Percent value={r.core} /> },
  { id: "adjust", label: "Sim / Author / Quality", title: ADJUST_TITLE, show: true, afterScore: true, cell: (r, s) => <AdjustCell row={r} settings={s} /> },
];

export const defaultHidden = COLUMNS.filter((c) => !c.show).map((c) => c.id);
