import type { Settings } from "../model/types";
import { SliderField } from "./fields";

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

const bortleNote = (b: number) =>
  b % 1 === 0 ? BORTLE_NOTES[b - 1] : `Between ${BORTLE_NOTES[Math.floor(b) - 1].toLowerCase()} and ${BORTLE_NOTES[Math.ceil(b) - 1].toLowerCase()}`;

export interface SectionProps {
  settings: Settings;
  set: (patch: Partial<Settings>) => void;
}

export function SkySection({ settings, set }: SectionProps) {
  return (
    <section className="astro-group">
      <h3>Your sky</h3>
      <div className="astro-fields">
        <label>
          <span>Latitude (°N)</span>
          <input type="number" min={0} max={80} value={settings.latitude} onChange={(e) => set({ latitude: Math.min(80, Math.max(0, Number(e.target.value))) })} />
        </label>
        <SliderField label={`Light pollution (Bortle ${settings.bortle})`} value={settings.bortle} min={1} max={9} step={0.5} onChange={(v) => set({ bortle: v })} note={bortleNote(settings.bortle)} />
      </div>
    </section>
  );
}
