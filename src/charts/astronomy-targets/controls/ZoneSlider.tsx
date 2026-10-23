export interface Zone {
  /** Upper end of the zone, in the slider's own units. */
  to: number;
  label: string;
  hue: number;
}

interface ZoneSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  zones: Zone[];
  /** Spaces the slider by ratio, for values that span a wide range. */
  log?: boolean;
  unit: string;
  onChange: (v: number) => void;
}

/** Position (0 to 1) along the slider for a value, and back again. */
function scale({ min, max, log }: Pick<ZoneSliderProps, "min" | "max" | "log">) {
  const toPos = (v: number) => (log ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min));

  // Slider position back to a value; log sliders round to half steps below 10 so small values stay selectable.
  const fromPos = (p: number) => {
    const v = log ? min * (max / min) ** p : min + p * (max - min);

    return log && v < 10 ? Math.round(v * 2) / 2 : Math.round(v);
  };

  return { toPos, fromPos };
}

/** Start and end (as percentages) of each coloured stretch under the slider. */
function zoneStops(zones: Zone[], toPos: (v: number) => number) {
  let from = 0;

  return zones.map((z) => {
    const start = from;
    from = Math.min(1, toPos(z.to));
    return { ...z, start: start * 100, end: from * 100 };
  });
}

/** A range slider with coloured stretches under it marking what is typical, e.g. narrow, normal and wide eyepieces. */
export function ZoneSlider({ label, value, min, max, zones, log, unit, onChange }: ZoneSliderProps) {
  const { toPos, fromPos } = scale({ min, max, log });
  const stops = zoneStops(zones, toPos);
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
