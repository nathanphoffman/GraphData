import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import "./styles.css";
import { useStoredState } from "./useStoredState";
import data from "../../../data/astronomy-targets.json";
import type { Schedule } from "./calculate";
import type { Aperture, AstronomyTargetsData, FocalLength, ScoredTarget, Season, Settings } from "./types";
import { hasPreview, TargetPreview } from "./TargetPreview";
import { ScheduleModal } from "./Schedule";
import { buildSchedule, formatHour, formatSize, activePreset, APERTURES, effectiveQuality, PRESETS, difficulty, isNakedEye, qualityAdjust, DEFAULT_SETTINGS, FOCAL_LENGTHS, SEASONS, previewOptics, scoreTargets, surfaceBrightness } from "./calculate";

const model = data as AstronomyTargetsData;

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
  /** Placed right after the Score column, ahead of the other columns. */
  afterScore?: boolean;
  cell: (row: ScoredTarget, settings: Settings) => ReactNode;
}

/** Optional columns, in display order. The rank, target name and score are always shown. */
const COLUMNS: Column[] = [
  { id: "constellation", label: "Constellation", show: false, cell: (r) => r.target.constellation },
  { id: "season", label: "Best time", title: "The season when it is best placed, and below it the ideal hour to look: the average over that season of when it is highest in the dark (local solar time). Planets have no fixed best hour.", show: true, cell: (r) => (
      <>
        <span className={`astro-tag astro-tag-${r.target.bestSeason}`}>
          {r.target.bestSeason === "any" ? "Any" : SEASONS[r.target.bestSeason].label.split(" ")[0]}
        </span>
        <div className="astro-hour">{r.bestHour === null ? "Varies" : formatHour(r.bestHour)}</div>
      </>
    ),
  },
  {
    id: "magsize",
    label: "Mag / Size",
    title: "Top: total magnitude (smaller is brighter). Bottom: apparent size.",
    show: true,
    cell: (r) => (
      <div className="astro-stack">
        <span>{r.target.magnitude.toFixed(1)}</span>
        <span className="astro-sub">{formatSize(r.target.major, r.target.minor)}</span>
      </div>
    ),
  },
  {
    id: "sbalt",
    label: "Surf. br. / Peak alt",
    title: "Top: magnitude per square arcminute, the light spread over the target (higher = dimmer). Bottom: highest altitude it reaches while it is dark.",
    show: true,
    cell: (r) => (
      <div className="astro-stack">
        <span>{r.target.type === "Star" || r.target.planet ? "—" : surfaceBrightness(r.target).toFixed(1)}</span>
        <span className="astro-sub">{r.peakAltitude > 0 ? `${r.peakAltitude.toFixed(0)}°` : "below horizon"}</span>
      </div>
    ),
  },
  { id: "sky", label: "Sky", show: true, cell: (r) => <Percent value={r.sky} /> },
  { id: "fit", label: "Size fit", show: true, cell: (r) => <Percent value={r.fit} /> },
  { id: "light", label: "Light", show: true, cell: (r) => <Percent value={r.light} /> },
  { id: "core", label: "Core", show: true, cell: (r) => <Percent value={r.core} /> },
  {
    id: "adjust",
    label: "Sim / Author / Quality",
    title: "First chip: how much better (+) or worse (-), in percentage points, the eyepiece preview looks than the score suggests (judged at small-medium focal length and mirror/lens). Second chip: the author's own adjustment in score points, from field experience. -- = not rated yet (counts as 0). Third chip: score points for the telescope's optical quality, which helps planets, stars and clusters most and barely affects nebulae and galaxies (always added in full). Part of the first two is added to the score, set by the sliders above the table, and scaled by the Bortle setting (judged at Bortle 5). Positive ones grow to 1.5x at Bortle 1 and fade to 0 at Bortle 9; negative ones shrink to 0.5x at Bortle 1 and grow to 1.5x at Bortle 9.",
    show: true,
    afterScore: true,
    cell: (r, settings) => {
      const quality = Math.round(qualityAdjust(r.target, settings) * 10) / 10;
      const sim = r.target.simAdjust;
      const author = r.target.authorAdjust;
      const fmt = (v: number) => (v >= 0 ? `+${v}` : `−${-v}`);
      return (
        <div className="astro-chips">
          {sim === undefined ? "—" : <span className="astro-tag" style={{ "--tag": heat(0.5 + sim / 60, 1) } as CSSProperties} title="Simulator adjustment">{fmt(sim)}%</span>}
          {author === undefined ? "--" : <span className="astro-tag" style={{ "--tag": heat(0.5 + author / 30, 1) } as CSSProperties} title="Author adjustment">{fmt(author)}</span>}
          <span className="astro-tag" style={{ "--tag": heat(0.5 + quality / 50, 1) } as CSSProperties} title="Quality adjustment">{fmt(quality)}</span>
        </div>
      );
    },
  },
];

const defaultHidden = COLUMNS.filter((c) => !c.show).map((c) => c.id);

/** Keeps only valid saved fields, so an old or edited save can never break the page. */
function parseSettings(saved: unknown): Settings | null {
  if (typeof saved !== "object" || saved === null) return null;
  const s = saved as Record<string, unknown>;
  const pick = <K extends string>(v: unknown, options: Record<K, unknown>, fallback: K): K =>
    typeof v === "string" && v in options ? (v as K) : fallback;
  const number = (v: unknown, lo: number, hi: number, fallback: number) =>
    typeof v === "number" && v >= lo && v <= hi ? v : fallback;
  return {
    latitude: number(s.latitude, 0, 80, DEFAULT_SETTINGS.latitude),
    // Older saved settings used "medium-long" and "long" for what are now Medium-Large and Large.
    focalLength: pick(s.focalLength === "medium-long" ? "medium-large" : s.focalLength === "long" ? "large" : s.focalLength, FOCAL_LENGTHS, DEFAULT_SETTINGS.focalLength),
    aperture: pick(s.aperture, APERTURES, DEFAULT_SETTINGS.aperture),
    manual: s.manual === true,
    preset: typeof s.preset === "string" && s.preset in PRESETS ? s.preset : "",
    scopeFocalMm: number(s.scopeFocalMm, 50, 10000, DEFAULT_SETTINGS.scopeFocalMm),
    apertureIn: number(s.apertureIn, 1, 40, DEFAULT_SETTINGS.apertureIn),
    eyepieceMm: number(s.eyepieceMm, 2, 100, DEFAULT_SETTINGS.eyepieceMm),
    eyepieceAfov: number(s.eyepieceAfov, 20, 120, DEFAULT_SETTINGS.eyepieceAfov),
    bortle: Math.round(number(s.bortle, 1, 9, DEFAULT_SETTINGS.bortle) * 2) / 2,
    simWeight: Math.round(number(s.simWeight, 0, 100, DEFAULT_SETTINGS.simWeight)),
    authorWeight: Math.round(number(s.authorWeight, 0, 100, DEFAULT_SETTINGS.authorWeight)),
    opticalQuality: Math.round(number(s.opticalQuality, 0, 100, DEFAULT_SETTINGS.opticalQuality)),
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
function opticalQualityLabel(v: number): string {
  return v < 20 ? "Poor" : v < 40 ? "Below average" : v < 60 ? "Average" : v < 80 ? "Good" : "Excellent";
}

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

interface Zone {
  /** Upper end of the zone, in the slider's own units. */
  to: number;
  label: string;
  hue: number;
}

/** A range slider with coloured stretches under it marking what is typical, e.g. narrow, normal and wide eyepieces. `log` spaces the slider by ratio, for values that span a wide range. */
function ZoneSlider({ label, value, min, max, zones, log, unit, onChange }: { label: string; value: number; min: number; max: number; zones: Zone[]; log?: boolean; unit: string; onChange: (v: number) => void }) {
  const toPos = (v: number) => (log ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min));
  const fromPos = (p: number) => {
    const v = log ? min * Math.pow(max / min, p) : min + p * (max - min);
    return log && v < 10 ? Math.round(v * 2) / 2 : Math.round(v);
  };
  let from = 0;
  const stops = zones.map((z) => {
    const start = from;
    const end = Math.min(1, toPos(z.to));
    from = end;
    return { ...z, start: start * 100, end: end * 100 };
  });
  const bar = stops.map((z) => `hsl(${z.hue} 65% 50% / 0.7) ${z.start}% ${z.end}%`).join(", ");
  return (
    <label>
      <span>{label} ({value} {unit})</span>
      <input type="range" min={0} max={1000} step={1} value={Math.round(toPos(value) * 1000)} onChange={(e) => onChange(fromPos(Number(e.target.value) / 1000))} />
      <div className="astro-zones" style={{ background: `linear-gradient(to right, ${bar})` }} aria-hidden="true" />
      <div className="astro-zone-labels">
        {stops.map((z) => (
          <span key={z.label} style={{ left: `${(z.start + z.end) / 2}%`, color: `hsl(${z.hue} 65% 45%)` }}>{z.label}</span>
        ))}
      </div>
    </label>
  );
}

const EYEPIECE_MM_ZONES: Zone[] = [
  { to: 10, label: "High power", hue: 0 },
  { to: 25, label: "Medium", hue: 50 },
  { to: 100, label: "Low power", hue: 140 },
];

const EYEPIECE_AFOV_ZONES: Zone[] = [
  { to: 50, label: "Narrow", hue: 0 },
  { to: 70, label: "Normal", hue: 50 },
  { to: 120, label: "Wide", hue: 140 },
];

export default function AstronomyTargets() {
  const [settings, setSettings] = useStoredState<Settings>("settings", DEFAULT_SETTINGS, parseSettings);
  const set = (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch }));

  const [hiddenList, setHiddenList] = useStoredState<string[]>("hidden-columns", defaultHidden, parseHidden);
  const hidden = useMemo(() => new Set(hiddenList), [hiddenList]);
  const toggleColumn = (id: string) =>
    setHiddenList((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  const visible = COLUMNS.filter((c) => !hidden.has(c.id));
  const afterScore = visible.filter((c) => c.afterScore);
  const beforeScore = visible.filter((c) => !c.afterScore);

  const [seasonFilter, setSeasonFilter] = useStoredState<SeasonFilter | null>("season-filter", null, parseSeasonFilter);
  const toggleSeason = (season: SeasonFilter) => setSeasonFilter((prev) => (prev === season ? null : season));

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null);

  const scored = useMemo(() => scoreTargets(model.targets, settings), [settings]);
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const rows = scored.filter(
    (row) =>
      (!seasonFilter || row.target.bestSeason === seasonFilter) &&
      (!needle || [row.target.id, row.target.nickname, row.target.constellation, row.target.type].some((v) => v.toLowerCase().includes(needle))),
  );

  return (
    <div className="astro">
      <div className="panel astro-controls">
        <section className="astro-group">
          <h3>Your sky</h3>
          <div className="astro-fields">
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
              <span>Light pollution (Bortle {settings.bortle})</span>
              <input
                type="range"
                min={1}
                max={9}
                step={0.5}
                value={settings.bortle}
                onChange={(e) => set({ bortle: Number(e.target.value) })}
              />
              <small>{settings.bortle % 1 === 0 ? BORTLE_NOTES[settings.bortle - 1] : `Between ${BORTLE_NOTES[Math.floor(settings.bortle) - 1].toLowerCase()} and ${BORTLE_NOTES[Math.ceil(settings.bortle) - 1].toLowerCase()}`}</small>
            </label>
          </div>
        </section>
        <section className="astro-group">
          <h3>Your telescope</h3>
          <div className="astro-fields">
            <label>
              <span>Select a preset</span>
              <select
                value={settings.preset || (settings.manual ? "manual" : "generic")}
                onChange={(e) => {
                  const v = e.target.value;
                  set(v === "manual" ? { preset: "", manual: true } : v === "generic" ? { preset: "", manual: false } : { preset: v });
                }}
              >
                <option value="manual">Manual</option>
                <option value="generic">Select Generic</option>
                {Object.entries(PRESETS).map(([key, p]) => (
                  <option key={key} value={key}>{p.label}</option>
                ))}
              </select>
              {activePreset(settings) && (
                <small>
                  Using {activePreset(settings)!.mm} mm aperture, {activePreset(settings)!.focalMm} mm focal length, optical quality {opticalQualityLabel(activePreset(settings)!.quality).toLowerCase()} ({activePreset(settings)!.quality}).
                </small>
              )}
            </label>
            {!settings.preset && (
              <>
            {settings.manual ? (
              <>
                <NumberField label="Telescope focal length (mm)" value={settings.scopeFocalMm} min={50} max={10000} onChange={(v) => set({ scopeFocalMm: v })} />
                <NumberField label="Mirror / lens size (inches)" value={settings.apertureIn} min={1} max={40} onChange={(v) => set({ apertureIn: v })} />
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
              </>
            )}
            <label>
              <span>Optical quality ({opticalQualityLabel(effectiveQuality(settings))}{activePreset(settings) ? ", set by preset" : ""})</span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={effectiveQuality(settings)}
                disabled={!!settings.preset}
                onChange={(e) => set({ opticalQuality: Number(e.target.value) })}
              />
              <small>Only changes the hover preview: good optics add contrast and colour, poor optics flatten them and soften the image.</small>
            </label>
          </div>
        </section>
        <section className="astro-group">
          <h3>Hover preview</h3>
          <div className="astro-fields">
            <ZoneSlider label="Eyepiece focal length" value={settings.eyepieceMm} min={2} max={100} log unit="mm" zones={EYEPIECE_MM_ZONES} onChange={(v) => set({ eyepieceMm: v })} />
            <ZoneSlider label="Eyepiece apparent field" value={settings.eyepieceAfov} min={20} max={120} unit="°" zones={EYEPIECE_AFOV_ZONES} onChange={(v) => set({ eyepieceAfov: v })} />
            <p className="astro-note">
              {previewOptics(settings).magnification.toFixed(0)}× magnification, true field {(previewOptics(settings).fov / 60).toFixed(2)}°. Shorter eyepiece = more zoom, bigger and dimmer. Only changes the hover preview, unless a preset or Manual telescope is on (then it also sets the field used in the table).
            </p>
          </div>
        </section>
        <section className="astro-group">
          <h3>Scoring and filters</h3>
          <div className="astro-fields">
            <label>
              <span>Simulator adjustment applied ({settings.simWeight}%)</span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={settings.simWeight}
                onChange={(e) => set({ simWeight: Number(e.target.value) })}
              />
              <small>0% ignores it, 100% adds the full amount to the score.</small>
            </label>
            <label>
              <span>Author adjustment applied ({settings.authorWeight}%)</span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={settings.authorWeight}
                onChange={(e) => set({ authorWeight: Number(e.target.value) })}
              />
              <small>0% ignores it, 100% adds the full amount to the score.</small>
            </label>
          </div>
        </section>
        <p className="astro-note">
          Times are local solar time (ignore daylight saving). Each target is scored in its best season, checking every
          half hour on the 15th of each month in that season, for the three hours around its best time (when it is
          highest in the dark); moonlight is not counted.
        </p>
      </div>

      <div className="astro-toolbar">
        <input
          type="search"
          placeholder="Search name, nickname, constellation or type"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search targets"
        />
        <div className="astro-seasons">
          <span>Best season</span>
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
          {seasonFilter && seasonFilter !== "any" && (
            <button type="button" className="astro-button" onClick={() => setSchedule(buildSchedule(scored, seasonFilter, settings))}>Generate Schedule</button>
          )}
        </div>
        <details className="astro-columns-menu">
          <summary>Columns</summary>
          <div>
            {COLUMNS.map((c) => (
              <label key={c.id}>
                <input type="checkbox" checked={!hidden.has(c.id)} onChange={() => toggleColumn(c.id)} />
                {c.label}
              </label>
            ))}
          </div>
        </details>
        <small>{rows.length} of {model.targets.length} targets</small>
      </div>

      <div className="panel calc-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Target</th>
              <th title="How hard it is to see, from the score: Excellent 75+, Very easy 50+, Easy 35+, Moderate 20+, Hard 10+, Very hard above 0, Extreme at 0 or below.">Difficulty / Score</th>
              {[...afterScore, ...beforeScore].map((c) => (
                <th key={c.id} title={c.title}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const t = row.target;
              return (
                <tr key={t.id} className={row.score <= 0 ? "astro-hidden" : undefined}>
                  <td>{i + 1}</td>
                  <td
                    className="astro-target"
                    title={t.nickname ? `${t.id} ${t.nickname}` : t.id}
                    onMouseMove={hasPreview(t.id) ? (e) => setHover({ id: t.id, x: e.clientX, y: e.clientY }) : undefined}
                    onMouseLeave={hasPreview(t.id) ? () => setHover(null) : undefined}
                  >
                    <span title={t.type}>{TYPE_SYMBOLS[t.type] ?? "•"}</span> <strong>{t.id}</strong>{t.nickname && <div className="astro-nick">{t.nickname}</div>}
                  </td>
                  <td className="astro-score">
                    <div className="astro-difficulty">
                      {isNakedEye(t, settings.bortle)
                        ? <span className="astro-tag" style={{ "--tag": heat(1, 1) } as CSSProperties}>Naked Eye</span>
                        : <span className="astro-tag" style={{ "--tag": heat(difficulty(row.score).level, 1) } as CSSProperties}>{difficulty(row.score).label}</span>}
                    </div>
                    <div className="astro-scorebar">
                      <span className="astro-bar" style={{ width: `${Math.max(0, row.score)}%`, background: heat(row.score / 100, 0.45) }} />
                      <span className="astro-score-text">{row.score.toFixed(0).replace("-", "−")}</span>
                    </div>
                  </td>
                  {[...afterScore, ...beforeScore].map((c) => (
                    <td key={c.id}>{c.cell(row, settings)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {schedule && <ScheduleModal schedule={schedule} onClose={() => { setSchedule(null); setHover(null); }} onHover={setHover} />}
      {hover && (() => {
        const row = rows.find((r) => r.target.id === hover.id);
        return row ? <TargetPreview row={row} settings={settings} x={hover.x} y={hover.y} /> : null;
      })()}

      <p className="muted astro-source">
        Types: {Object.entries(TYPE_SYMBOLS).map(([type, symbol]) => `${symbol} ${type}`).join(" · ")}.
      </p>

      <p className="muted astro-source">
        Score = Sky × Size fit × Light × Core, scaled to 100, with Core counting double (40% against 20% each for the rest). Sky: how high it is during your window. Size fit: how
        well it fills your field of view (big targets need a short focal length). Light: the target's average surface brightness (its light spread over its area) against what your mirror or lens can show, after light pollution (which hurts more near the horizon). Core: the same test on the bright centre, since a compact core is easy to spot even when the whole object is faint. {model.source}
      </p>
    </div>
  );
}
