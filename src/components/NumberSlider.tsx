export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

interface Props {
  range: SliderRange;
  value: number;
  onChange: (value: number) => void;

  /** Lets a separate `<label htmlFor>` point at the slider. */
  id?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/** A plain range slider that hands back a number instead of the input's text. */
export default function NumberSlider({ range, value, onChange, id, ariaLabel, disabled }: Props) {
  return (
    <input
      id={id}
      type="range"
      min={range.min}
      max={range.max}
      step={range.step}
      value={value}
      aria-label={ariaLabel}
      disabled={disabled}
      onChange={(changeEvent) => onChange(Number(changeEvent.target.value))}
    />
  );
}
