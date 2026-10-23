import { activePreset, APERTURES, effectiveQuality, FOCAL_LENGTHS, PRESETS } from "../model/calculate";
import type { Aperture, FocalLength } from "../model/types";
import { NumberField, opticalQualityLabel, SliderField } from "./fields";
import type { SectionProps } from "./SkySection";

function PresetSelect({ settings, set }: SectionProps) {
  const preset = activePreset(settings);

  return (
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
      {preset && (
        <small>
          Using {preset.mm} mm aperture, {preset.focalMm} mm focal length, optical quality {opticalQualityLabel(preset.quality).toLowerCase()} ({preset.quality}).
        </small>
      )}
    </label>
  );
}

function OptionSelect({ label, value, options, onChange }: { label: string; value: string; options: Record<string, { label: string }>; onChange: (v: string) => void }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(options).map(([key, o]) => (
          <option key={key} value={key}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

/** Scope size fields: typed in when Manual, otherwise picked from rough sizes. */
function ScopeFields({ settings, set }: SectionProps) {
  if (settings.manual) {
    return (
      <>
        <NumberField label="Telescope focal length (mm)" value={settings.scopeFocalMm} min={50} max={10000} onChange={(v) => set({ scopeFocalMm: v })} />
        <NumberField label="Mirror / lens size (inches)" value={settings.apertureIn} min={1} max={40} onChange={(v) => set({ apertureIn: v })} />
      </>
    );
  }

  return (
    <>
      <OptionSelect label="Focal length" value={settings.focalLength} options={FOCAL_LENGTHS} onChange={(v) => set({ focalLength: v as FocalLength })} />
      <OptionSelect label="Mirror / lens size" value={settings.aperture} options={APERTURES} onChange={(v) => set({ aperture: v as Aperture })} />
    </>
  );
}

export function TelescopeSection({ settings, set }: SectionProps) {
  const quality = effectiveQuality(settings);

  return (
    <section className="astro-group">
      <h3>Your telescope</h3>
      <div className="astro-fields">
        <PresetSelect settings={settings} set={set} />
        {!settings.preset && <ScopeFields settings={settings} set={set} />}
        <SliderField
          label={`Optical quality (${opticalQualityLabel(quality)}${activePreset(settings) ? ", set by preset" : ""})`}
          value={quality}
          min={0}
          max={100}
          step={5}
          disabled={!!settings.preset}
          onChange={(v) => set({ opticalQuality: v })}
          note="Only changes the hover preview: good optics add contrast and colour, poor optics flatten them and soften the image."
        />
      </div>
    </section>
  );
}
