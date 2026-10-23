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
  onChange: (value: number) => void;
}

/** Position (0 to 1) along the slider for a value, and back again. */
function scale({ min, max, log }: Pick<ZoneSliderProps, "min" | "max" | "log">) {
  const toPos = (value: number) => (log ? Math.log(value / min) / Math.log(max / min) : (value - min) / (max - min));

  // Slider position back to a value; log sliders round to half steps below 10 so small values stay selectable.
  const fromPos = (p: number) => {
    const value = log ? min * (max / min) ** p : min + p * (max - min);

    return log && value < 10 ? Math.round(value * 2) / 2 : Math.round(value);
  };

  return { toPos, fromPos };
}

/** Start and end (as percentages) of each coloured stretch under the slider. */
function zoneStops(zones: Zone[], toPos: (value: number) => number) {
  let from = 0;

  // Convert each zone into the start and end of its stretch under the slider.
  return zones.map((zone) => {
    const start = from;
    from = Math.min(1, toPos(zone.to));

    return { ...zone, start: start * 100, end: from * 100 };
  });
}

/** A range slider with coloured stretches under it marking what is typical, e.g. narrow, normal and wide eyepieces. */
export function ZoneSlider({ label, value, min, max, zones, log, unit, onChange }: ZoneSliderProps) {
  const { toPos, fromPos } = scale({ min, max, log });
  const stops = zoneStops(zones, toPos);
  const bar = stops.map((stop) => `hsl(${stop.hue} 65% 50% / 0.7) ${stop.start}% ${stop.end}%`).join(", ");

  return (
    <label>
      <span>{label} ({value} {unit})</span>
      <input type="range" min={0} max={1000} step={1} value={Math.round(toPos(value) * 1000)} onChange={(event) => onChange(fromPos(Number(event.target.value) / 1000))} />
      <div className="astro-zones" style={{ background: `linear-gradient(to right, ${bar})` }} aria-hidden="true" />
      <div className="astro-zone-labels">
        {/* Put each zone label in the middle of its stretch. */}
        {stops.map((stop) => (
          <span key={stop.label} style={{ left: `${(stop.start + stop.end) / 2}%`, color: `hsl(${stop.hue} 65% 45%)` }}>{stop.label}</span>
        ))}
      </div>
    </label>
  );
}
