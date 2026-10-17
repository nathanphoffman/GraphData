import { useMemo, useState, type ReactNode } from "react";
import "./styles.css";
import data from "../../../data/astronomy-targets.json";
import type { Aperture, AstronomyTargetsData, FocalLength, ScoredTarget, Season, Settings } from "./types";
import { APERTURES, DEFAULT_SETTINGS, FOCAL_LENGTHS, SEASONS, darkFraction, scoreTargets, surfaceBrightness } from "./calculate";

const model = data as AstronomyTargetsData;

function formatSize(major: number, minor: number): string {
  const fmt = (v: number) => (v >= 10 ? v.toFixed(0) : v.toFixed(1));
  return major === minor ? `${fmt(major)}′` : `${fmt(major)}′ × ${fmt(minor)}′`;
}

const BORTLE_NOTES = [
  "Pristine dark sky",
  "Truly dark sky",
  "Rural sky",
  "Rural/suburban edge",
  "Suburban sky",
  "Bright suburban",
  "Suburban/city edge",
  "City sky",
  "Inner city",
];

const pct = (v: number) => `${Math.round(v * 100)}%`;

/** Red (0) through yellow to green (1), see-through so it works on light and dark backgrounds. */
const heat = (v: number, alpha = 0.35) => `hsl(${Math.round(Math.min(1, Math.max(0, v)) * 120)} 70% 45% / ${alpha})`;

function Percent({ value }: { value: number }) {
  return <span className="astro-heat" style={{ background: heat(value) }}>{pct(value)}</span>;
}

const TYPE_SYMBOLS: Record<string, string> = {
  Galaxy: "🌀",
  "Open cluster": "✨",
  "Globular cluster": "🔮",
  Nebula: "☁️",
  "Planetary nebula": "💍",
  "Supernova remnant": "💥",
  "Double star": "🌟",
};

interface Column {
  id: string;
  label: string;
  title?: string;
  /** Shown by default. */
  show: boolean;
  cell: (row: ScoredTarget) => ReactNode;
}

/** Optional columns, in display order. The rank, target name and score are always shown. */
const COLUMNS: Column[] = [
  { id: "constellation", label: "Constellation", show: false, cell: (r) => r.target.constellation },
  { id: "season", label: "Best season", show: true, cell: (r) => (
      <span className={`astro-tag astro-tag-${r.target.bestSeason}`}>{SEASONS[r.target.bestSeason].label.split(" ")[0]}</span>
    ),
  },
  { id: "mag", label: "Mag", show: true, cell: (r) => r.target.magnitude.toFixed(1) },
  { id: "size", label: "Size", show: true, cell: (r) => formatSize(r.target.major, r.target.minor) },
  {
    id: "sb",
    label: "Surface br.",
    title: "Magnitude per square arcminute: light spread over the target. Higher = dimmer.",
    show: true,
    cell: (r) => surfaceBrightness(r.target).toFixed(1),
  },
  { id: "alt", label: "Peak alt", show: true, cell: (r) => (r.peakAltitude > 0 ? `${r.peakAltitude.toFixed(0)}°` : "below horizon") },
  { id: "sky", label: "Sky", show: true, cell: (r) => <Percent value={r.sky} /> },
  { id: "fit", label: "Size fit", show: true, cell: (r) => <Percent value={r.fit} /> },
  { id: "light", label: "Light", show: true, cell: (r) => <Percent value={r.light} /> },
  { id: "core", label: "Core", show: true, cell: (r) => <Percent value={r.core} /> },
];

export default function AstronomyTargets() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const set = (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch }));

  const [hidden, setHidden] = useState<Set<string>>(() => new Set(COLUMNS.filter((c) => !c.show).map((c) => c.id)));
  const toggleColumn = (id: string) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const visible = COLUMNS.filter((c) => !hidden.has(c.id));

  const rows = useMemo(() => scoreTargets(model.targets, settings), [settings]);
  const notDark = useMemo(
    () => (Object.keys(SEASONS) as Season[]).filter((season) => darkFraction(settings, season) < 1),
    [settings],
  );

  return (
    <div className="astro">
      <div className="panel astro-controls">
        <label>
          <span>Observing from</span>
          <input type="time" value={settings.from} onChange={(e) => e.target.value && set({ from: e.target.value })} />
        </label>
        <label>
          <span>Until</span>
          <input type="time" value={settings.to} onChange={(e) => e.target.value && set({ to: e.target.value })} />
        </label>
        <label>
          <span>Latitude (°N)</span>
          <input
            type="number"
            min={0}
            max={80}
            value={settings.latitude}
            onChange={(e) => set({ latitude: Math.min(80, Math.max(0, Number(e.target.value))) })}
          />
        </label>
        <label>
          <span>Focal length</span>
          <select value={settings.focalLength} onChange={(e) => set({ focalLength: e.target.value as FocalLength })}>
            {Object.entries(FOCAL_LENGTHS).map(([key, f]) => (
              <option key={key} value={key}>{f.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Mirror / lens size</span>
          <select value={settings.aperture} onChange={(e) => set({ aperture: e.target.value as Aperture })}>
            {Object.entries(APERTURES).map(([key, a]) => (
              <option key={key} value={key}>{a.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Light pollution (Bortle {settings.bortle})</span>
          <input
            type="range"
            min={1}
            max={9}
            step={1}
            value={settings.bortle}
            onChange={(e) => set({ bortle: Number(e.target.value) })}
          />
          <small>{BORTLE_NOTES[settings.bortle - 1]}</small>
        </label>
        <div className="astro-columns">
          <span>Columns:</span>
          {COLUMNS.map((c) => (
            <label key={c.id}>
              <input type="checkbox" checked={!hidden.has(c.id)} onChange={() => toggleColumn(c.id)} />
              {c.label}
            </label>
          ))}
        </div>
        <p className="astro-note">
          Times are local solar time (ignore daylight saving). Each target is scored in its best season, checking every
          half hour on the 15th of each month in that season; moonlight is not counted.
          {notDark.length > 0 && ` Part of this window is not fully dark in: ${notDark.map((s) => SEASONS[s].label.split(" ")[0]).join(", ")}.`}
        </p>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Target</th>
              {visible.map((c) => (
                <th key={c.id} title={c.title}>{c.label}</th>
              ))}
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const t = row.target;
              return (
                <tr key={t.id} className={row.score < 1 ? "astro-hidden" : undefined}>
                  <td>{i + 1}</td>
                  <td>
                    <span title={t.type}>{TYPE_SYMBOLS[t.type] ?? "•"}</span> <strong>{t.id}</strong> {t.nickname && <span className="astro-nick">{t.nickname}</span>}
                  </td>
                  {visible.map((c) => (
                    <td key={c.id}>{c.cell(row)}</td>
                  ))}
                  <td className="astro-score">
                    <span className="astro-bar" style={{ width: `${row.score}%`, background: heat(row.score / 100, 0.45) }} />
                    <span className="astro-score-text">{row.score.toFixed(0)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="muted astro-source">
        Types: {Object.entries(TYPE_SYMBOLS).map(([type, symbol]) => `${symbol} ${type}`).join(" · ")}.
      </p>

      <p className="muted astro-source">
        Score = Sky × Size fit × Light × Core, scaled to 100, with Core counting double (40% against 20% each for the rest). Sky: how high it is during your window. Size fit: how
        well it fills your field of view (big targets need a short focal length). Light: the total light the whole target sends you (its magnitude) against what your mirror or lens can gather, after light pollution (which hurts more near the horizon). Core: the same test on the bright centre, since a compact core is easy to spot even when the whole object is faint. {model.source}
      </p>
    </div>
  );
}
