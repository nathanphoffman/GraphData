interface Props {
  /** One label per stop, lowest first. The handles snap to these. */
  stops: string[];
  value: [number, number];
  onChange: (value: [number, number]) => void;
  labelPrefix: string;
}

/** Two-handle range slider built from two stacked range inputs. `value` holds stop indexes. */
export default function RangeSlider({ stops, value, onChange, labelPrefix }: Props) {
  const last = stops.length - 1;
  const [lo, hi] = value;

  return (
    <div className="bestiary-range-wrap">
      <div className="bestiary-range">
        <div className="bestiary-range-track">
          <div
            className="bestiary-range-fill"
            style={{ left: `${(lo / last) * 100}%`, right: `${100 - (hi / last) * 100}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={lo}
          aria-label={`Minimum ${labelPrefix}`}
          // When both handles sit at the top end, the min handle must be on top or it can't be dragged back.
          style={{ zIndex: lo > last / 2 ? 3 : 1 }}
          onChange={(event) => onChange([Math.min(Number(event.target.value), hi), hi])}
        />
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={hi}
          aria-label={`Maximum ${labelPrefix}`}
          style={{ zIndex: 2 }}
          onChange={(event) => onChange([lo, Math.max(Number(event.target.value), lo)])}
        />
      </div>
      <span className="bestiary-range-label">{lo === hi ? stops[lo] : `${stops[lo]} to ${stops[hi]}`}</span>
    </div>
  );
}
