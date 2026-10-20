import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import "./styles.css";
import { useStoredState } from "./useStoredState";
import data from "../../../data/astronomy-targets.json";
import type { Aperture, AstronomyTargetsData, FocalLength, ScoredTarget, Season, Settings } from "./types";
import { hasPreview, TargetPreview } from "./TargetPreview";
import { APERTURES, difficulty, isNakedEye, DEFAULT_SETTINGS, FOCAL_LENGTHS, SEASONS, manualOptics, darkFraction, scoreTargets, surfaceBrightness } from "./calculate";

const model = data as AstronomyTargetsData;

function formatSize(major: number, minor: number): string {
  if (major === 0) return "point";
  if (major < 1) return `${Math.round(major * 60)}″`;
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

type SeasonFilter = Season | "any";
const SEASON_FILTERS: SeasonFilter[] = ["spring", "summer", "autumn", "winter", "any"];

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
  Star: "⭐",
  Planet: "🪐",
  Moon: "🌙",
};

interface Column {
  id: string;
  label: string;
  title?: string;
  /** Shown by default. */
  show: boolean;
  /** Placed after the Score column instead of before it. */
  afterScore?: boolean;
  cell: (row: ScoredTarget, settings: Settings) => ReactNode;
}

/** Optional columns, in display order. The rank, target name and score are always shown. */
const COLUMNS: Column[] = [
  { id: "constellation", label: "Constellation", show: false, cell: (r) => r.target.constellation },
  { id: "season", label: "Best season", show: true, cell: (r) => (
      <span className={`astro-tag astro-tag-${r.target.bestSeason}`}>
        {r.target.bestSeason === "any" ? "Any" : SEASONS[r.target.bestSeason].label.split(" ")[0]}
      </span>
    ),
  },
  { id: "mag", label: "Mag", show: true, cell: (r) => r.target.magnitude.toFixed(1) },
  { id: "size", label: "Size", show: true, cell: (r) => formatSize(r.target.major, r.target.minor) },
  {
    id: "sb",
    label: "Surface br.",
    title: "Magnitude per square arcminute: light spread over the target. Higher = dimmer.",
    show: true,
    cell: (r) => (r.target.type === "Star" || r.target.planet ? "—" : surfaceBrightness(r.target).toFixed(1)),
  },
  { id: "alt", label: "Peak alt", show: true, cell: (r) => (r.peakAltitude > 0 ? `${r.peakAltitude.toFixed(0)}°` : "below horizon") },
  { id: "sky", label: "Sky", show: true, cell: (r) => <Percent value={r.sky} /> },
  { id: "fit", label: "Size fit", show: true, cell: (r) => <Percent value={r.fit} /> },
  { id: "light", label: "Light", show: true, cell: (r) => <Percent value={r.light} /> },
  { id: "core", label: "Core", show: true, cell: (r) => <Percent value={r.core} /> },
  {
    id: "difficulty",
    label: "Difficulty",
    title: "How hard it is to see, from the score: Very easy 75+, Easy 50+, Moderate 35+, Hard 20+, Very hard 10+, Extreme above 0, Not visible at 0.",
    show: true,
    afterScore: true,
    cell: (r, settings) => {
      if (isNakedEye(r.target, settings.bortle)) return <span className="astro-tag" style={{ "--tag": heat(1, 1) } as CSSProperties}>Naked Eye</span>;
      const d = difficulty(r.score);
      return <span className="astro-tag" style={{ "--tag": heat(d.level, 1) } as CSSProperties}>{d.label}</span>;
    },
  },
];

const defaultHidden = COLUMNS.filter((c) => !c.show).map((c) => c.id);

/** Keeps only valid saved fields, so an old or edited save can never break the page. */
function parseSettings(saved: unknown): Settings | null {
  if (typeof saved !== "object" || saved === null) return null;
  const s = saved as Record<string, unknown>;
  const time = (v: unknown, fallback: string) => (typeof v === "string" && /^\d\d:\d\d$/.test(v) ? v : fallback);
  const pick = <K extends string>(v: unknown, options: Record<K, unknown>, fallback: K): K =>
    typeof v === "string" && v in options ? (v as K) : fallback;
  const number = (v: unknown, lo: number, hi: number, fallback: number) =>
    typeof v === "number" && v >= lo && v <= hi ? v : fallback;
  return {
    from: time(s.from, DEFAULT_SETTINGS.from),
    to: time(s.to, DEFAULT_SETTINGS.to),
    latitude: number(s.latitude, 0, 80, DEFAULT_SETTINGS.latitude),
    focalLength: pick(s.focalLength, FOCAL_LENGTHS, DEFAULT_SETTINGS.focalLength),
    aperture: pick(s.aperture, APERTURES, DEFAULT_SETTINGS.aperture),
    manual: s.manual === true,
    scopeFocalMm: number(s.scopeFocalMm, 50, 10000, DEFAULT_SETTINGS.scopeFocalMm),
    apertureIn: number(s.apertureIn, 1, 40, DEFAULT_SETTINGS.apertureIn),
    eyepieceMm: number(s.eyepieceMm, 2, 100, DEFAULT_SETTINGS.eyepieceMm),
    eyepieceAfov: number(s.eyepieceAfov, 20, 120, DEFAULT_SETTINGS.eyepieceAfov),
    bortle: Math.round(number(s.bortle, 1, 9, DEFAULT_SETTINGS.bortle)),
  };
}

function parseHidden(saved: unknown): string[] | null {
  if (!Array.isArray(saved)) return null;
  return saved.filter((id): id is string => COLUMNS.some((c) => c.id === id));
}

function parseSeasonFilter(saved: unknown): SeasonFilter | null {
  return SEASON_FILTERS.find((season) => season === saved) ?? null;
}

/** Keeps what you type as text so you can pass through out-of-range values (typing "900" starts with "9"); only valid numbers are applied. */
function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <label>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step="any"
        value={draft ?? value}
        onChange={(e) => {
          setDraft(e.target.value);
          const v = Number(e.target.value);
          if (e.target.value !== "" && v >= min && v <= max) onChange(v);
        }}
        onBlur={() => setDraft(null)}
      />
    </label>
  );
}

export default function AstronomyTargets() {
  const [settings, setSettings] = useStoredState<Settings>("settings", DEFAULT_SETTINGS, parseSettings);
  const set = (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch }));

  const [hiddenList, setHiddenList] = useStoredState<string[]>("hidden-columns", defaultHidden, parseHidden);
  const hidden = useMemo(() => new Set(hiddenList), [hiddenList]);
  const toggleColumn = (id: string) =>
    setHiddenList((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  const visible = COLUMNS.filter((c) => !hidden.has(c.id));
  const beforeScore = visible.filter((c) => !c.afterScore);
  const afterScore = visible.filter((c) => c.afterScore);

  const [seasonFilter, setSeasonFilter] = useStoredState<SeasonFilter | null>("season-filter", null, parseSeasonFilter);
  const toggleSeason = (season: SeasonFilter) => setSeasonFilter((prev) => (prev === season ? null : season));

  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);

  const scored = useMemo(() => scoreTargets(model.targets, settings), [settings]);
  const rows = seasonFilter ? scored.filter((row) => row.target.bestSeason === seasonFilter) : scored;
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
        <label className="astro-check">
          <input type="checkbox" checked={settings.manual} onChange={(e) => set({ manual: e.target.checked })} />
          <span>Manual telescope</span>
        </label>
        {settings.manual ? (
          <>
            <NumberField label="Telescope focal length (mm)" value={settings.scopeFocalMm} min={50} max={10000} onChange={(v) => set({ scopeFocalMm: v })} />
            <NumberField label="Mirror / lens size (inches)" value={settings.apertureIn} min={1} max={40} onChange={(v) => set({ apertureIn: v })} />
            <NumberField label="Eyepiece focal length (mm)" value={settings.eyepieceMm} min={2} max={100} onChange={(v) => set({ eyepieceMm: v })} />
            <NumberField label="Eyepiece apparent field (°)" value={settings.eyepieceAfov} min={20} max={120} onChange={(v) => set({ eyepieceAfov: v })} />
            <p className="astro-note">
              {manualOptics(settings).magnification.toFixed(0)}× magnification, true field {(manualOptics(settings).fov / 60).toFixed(2)}°.
            </p>
          </>
        ) : (
          <>
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
          </>
        )}
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
          <span>Best season:</span>
          {SEASON_FILTERS.map((season) => (
            <button
              key={season}
              type="button"
              aria-pressed={seasonFilter === season}
              className={`astro-tag astro-tag-${season} astro-filter${seasonFilter === season ? " astro-filter-on" : ""}`}
              onClick={() => toggleSeason(season)}
            >
              {season === "any" ? "Any" : SEASONS[season].label.split(" ")[0]}
            </button>
          ))}
        </div>
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
              {beforeScore.map((c) => (
                <th key={c.id} title={c.title}>{c.label}</th>
              ))}
              <th>Score</th>
              {afterScore.map((c) => (
                <th key={c.id} title={c.title}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const t = row.target;
              return (
                <tr key={t.id} className={row.score < 1 ? "astro-hidden" : undefined}>
                  <td>{i + 1}</td>
                  <td
                    onMouseMove={hasPreview(t.id) ? (e) => setHover({ id: t.id, x: e.clientX, y: e.clientY }) : undefined}
                    onMouseLeave={hasPreview(t.id) ? () => setHover(null) : undefined}
                  >
                    <span title={t.type}>{TYPE_SYMBOLS[t.type] ?? "•"}</span> <strong>{t.id}</strong>{t.nickname && <div className="astro-nick">{t.nickname}</div>}
                  </td>
                  {beforeScore.map((c) => (
                    <td key={c.id}>{c.cell(row, settings)}</td>
                  ))}
                  <td className="astro-score">
                    <span className="astro-bar" style={{ width: `${row.score}%`, background: heat(row.score / 100, 0.45) }} />
                    <span className="astro-score-text">{row.score.toFixed(0)}</span>
                  </td>
                  {afterScore.map((c) => (
                    <td key={c.id}>{c.cell(row, settings)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hover && (() => {
        const row = rows.find((r) => r.target.id === hover.id);
        return row ? <TargetPreview row={row} settings={settings} x={hover.x} y={hover.y} /> : null;
      })()}

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
