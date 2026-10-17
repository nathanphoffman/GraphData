interface SliderProps {
  id: string;
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  low: string;
  high: string;
  onChange: (v: number) => void;
}

export default function Slider({
  id,
  label,
  description,
  value,
  min,
  max,
  step = 1,
  display,
  low,
  high,
  onChange,
}: SliderProps) {
  return (
    <div className="panel">
      <div className="mini-row">
        <label htmlFor={id}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && (
        <p className="muted mini-description">
          {description}
        </p>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mini-ticks">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}
