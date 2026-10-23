import { previewOptics } from "../model/calculate";
import { SliderField } from "./fields";
import type { SectionProps } from "./SkySection";
import { type Zone, ZoneSlider } from "./ZoneSlider";

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

export function PreviewSection({ settings, set }: SectionProps) {
  const optics = previewOptics(settings);

  return (
    <section className="astro-group">
      <h3>Hover preview</h3>
      <div className="astro-fields">
        <ZoneSlider label="Eyepiece focal length" value={settings.eyepieceMm} min={2} max={100} log unit="mm" zones={EYEPIECE_MM_ZONES} onChange={(v) => set({ eyepieceMm: v })} />
        <ZoneSlider label="Eyepiece apparent field" value={settings.eyepieceAfov} min={20} max={120} unit="°" zones={EYEPIECE_AFOV_ZONES} onChange={(v) => set({ eyepieceAfov: v })} />
        <p className="astro-note">
          {optics.magnification.toFixed(0)}× magnification, true field {(optics.fov / 60).toFixed(2)}°. Shorter eyepiece = more zoom, bigger and dimmer. Only changes the hover preview, unless a preset or Manual telescope is on (then it also sets the field used in the table).
        </p>
      </div>
    </section>
  );
}

const WEIGHT_NOTE = "0% ignores it, 100% adds the full amount to the score.";

export function ScoringSection({ settings, set }: SectionProps) {
  return (
    <section className="astro-group">
      <h3>Scoring and filters</h3>
      <div className="astro-fields">
        <SliderField label={`Simulator adjustment applied (${settings.simWeight}%)`} value={settings.simWeight} min={0} max={100} step={5} onChange={(v) => set({ simWeight: v })} note={WEIGHT_NOTE} />
        <SliderField label={`Author adjustment applied (${settings.authorWeight}%)`} value={settings.authorWeight} min={0} max={100} step={5} onChange={(v) => set({ authorWeight: v })} note={WEIGHT_NOTE} />
      </div>
    </section>
  );
}
