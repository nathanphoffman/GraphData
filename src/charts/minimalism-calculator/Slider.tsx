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
      <div className="calc-row">
        <label htmlFor={id}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && (
        <p className="muted" style={{ margin: "8px 0 12px", fontSize: 13 }}>
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
      <div className="calc-ticks">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}
