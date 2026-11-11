import NumberSlider from "../../../components/NumberSlider";

const SLIDER_STEP = 0.05;

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

/** Labelled slider for one of the exponents. */
export default function ExponentSlider({ label, value, min: minValue, max: maxValue, onChange }: Props) {
  return (
    <label className="neuron-slider">
      <span>{label}</span>
      <NumberSlider range={{ min: minValue, max: maxValue, step: SLIDER_STEP }} value={value} onChange={onChange} />
      <strong>{value.toFixed(2)}</strong>
    </label>
  );
}
