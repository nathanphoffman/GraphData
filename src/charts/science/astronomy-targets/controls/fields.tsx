import { useState } from "react";

/** Plain-words rating for an optical quality percentage. */
export function opticalQualityLabel(value: number): string {
  // Chain of cutoffs: the first range the value falls under gives the label.
  return value < 20 ? "Poor" : value < 40 ? "Below average" : value < 60 ? "Average" : value < 80 ? "Good" : "Excellent";
}

/** Keeps what you type as text so you can pass through out-of-range values (typing "900" starts with "9"); only valid numbers are applied. */
export function NumberField({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);

  // Show the text being typed if there is any, otherwise the real value.
  return (
    <label>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step="any"
        value={draft ?? value}

        // Keep the text as typed, and only pass the number on when it is valid.
        onChange={(event) => {
          setDraft(event.target.value);
          const v = Number(event.target.value);

          if (event.target.value !== "" && v >= min && v <= max) onChange(v);
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
  onChange: (value: number) => void;
  note?: string;
  disabled?: boolean;
}

/** Slider with a number box and an optional note underneath. */
export function SliderField({ label, value, min, max, step, onChange, note, disabled }: SliderFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(event) => onChange(Number(event.target.value))} />
      {note && <small>{note}</small>}
    </label>
  );
}
