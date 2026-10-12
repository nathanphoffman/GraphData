import RangeSlider from "./RangeSlider";

interface Props {
  label: string;
  stops: string[];
  value: [number, number];
  onChange: (value: [number, number]) => void;
  /** Accessible name for the handles; defaults to the lowercase label. */
  labelPrefix?: string;
}

/** A key-label plus a two-handle range slider. */
export default function SliderRow({ label, stops, value, onChange, labelPrefix }: Props) {
  return (
    <div className="bestiary-key">
      <span className="bestiary-key-label">{label}</span>
      <RangeSlider stops={stops} value={value} onChange={onChange} labelPrefix={labelPrefix ?? label.toLowerCase()} />
    </div>
  );
}
