/** Number input that only accepts non-negative amounts. */
export default function NumberField({
  id: fieldId,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        type="number"
        min={0}
        step="any"
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
      />
    </div>
  );
}
