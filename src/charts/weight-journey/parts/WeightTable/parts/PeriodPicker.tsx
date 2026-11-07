import { useState } from "react";
import { ACTIVE_CLASS } from "../../../../classNames";

/** Dropdown of periods, each with a square in the average colour of the values currently shown over that period. */
export function PeriodPicker({
  period,
  onChange,
  options,
}: {
  period: string;
  onChange: (period: string) => void;
  options: { value: string; label: string; color?: string }[];
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === period) ?? options[0];

  return (
    <fieldset
      className="period-picker"
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}
    >
      <button type="button" className="period-button" onClick={() => setOpen(!open)}>
        <span className="period-square" style={{ background: current.color }} /> {current.label}
      </button>
      {open && (
        <ul className="period-list">
          {options.map(
            (
              option, // One button per period choice.
            ) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={option.value === period ? ACTIVE_CLASS : ""}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}

                >
                  <span className="period-square" style={{ background: option.color }} /> {option.label}
                </button>
              </li>
            ),
          )}

        </ul>
      )}

    </fieldset>
  );
}
