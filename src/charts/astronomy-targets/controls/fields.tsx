import { useState } from "react";

export function opticalQualityLabel(v: number): string {
  return v < 20 ? "Poor" : v < 40 ? "Below average" : v < 60 ? "Average" : v < 80 ? "Good" : "Excellent";
}

/** Keeps what you type as text so you can pass through out-of-range values (typing "900" starts with "9"); only valid numbers are applied. */
export function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
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

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  note?: string;
  disabled?: boolean;
}

export function SliderField({ label, value, min, max, step, onChange, note, disabled }: SliderFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} />
      {note && <small>{note}</small>}
    </label>
  );
}
