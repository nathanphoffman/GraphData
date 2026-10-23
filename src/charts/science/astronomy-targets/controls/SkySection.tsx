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

/** Short description of what a Bortle sky class looks like, shown under the slider. */
const bortleNote = (b: number) =>
  b % 1 === 0 ? BORTLE_NOTES[b - 1] : `Between ${BORTLE_NOTES[Math.floor(b) - 1].toLowerCase()} and ${BORTLE_NOTES[Math.ceil(b) - 1].toLowerCase()}`;

export interface SectionProps {
  settings: Settings;
  set: (patch: Partial<Settings>) => void;
}

/** Settings for the sky: your latitude and light pollution. */
export function SkySection({ settings, set }: SectionProps) {
  return (
    <section className="astro-group">
      <h3>Your sky</h3>
      <div className="astro-fields">
        <label>
          <span>Latitude (°N)</span>
          <input type="number" min={0} max={80} value={settings.latitude} onChange={(event) => set({ latitude: Math.min(80, Math.max(0, Number(event.target.value))) })} />
        </label>
        <SliderField label={`Light pollution (Bortle ${settings.bortle})`} value={settings.bortle} min={1} max={9} step={0.5} onChange={(value) => set({ bortle: value })} note={bortleNote(settings.bortle)} />
      </div>
    </section>
  );
}
