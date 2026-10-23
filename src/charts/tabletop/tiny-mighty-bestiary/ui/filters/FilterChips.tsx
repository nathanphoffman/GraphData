interface Props {
  label: string;
  /** Accessible name suffix when the visible label is blank (a continuation row). */
  groupName?: string;
  options: { id: string; label: string }[];
  active: string | null;
  /** Called with the new selection: the clicked id, or null when the active chip is clicked again. */
  onChange: (identifier: string | null) => void;
  /** Extra class for each chip, given the option id. */
  chipClass?: (identifier: string) => string;
  /** Show a color swatch inside each chip. */
  swatch?: boolean;
  children?: React.ReactNode;
}

/** One row of single-select filter chips. Clicking the active chip turns it off. */
export default function FilterChips({ label, groupName = label, options, active, onChange, chipClass, swatch, children }: Props) {
  // One toggle button per option; the active one is marked pressed.
  return (
    <div className="bestiary-key" role="group" aria-label={`Filter by ${groupName.toLowerCase()}`}>
      <span className="bestiary-key-label">{label}</span>
      {/* One toggle button per option; the active one is marked pressed. */}
      {options.map((option) => {
        const isActive = active === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            className={`bestiary-chip ${chipClass?.(option.id) ?? ""}${isActive ? " is-active" : ""}`}
            onClick={() => onChange(isActive ? null : option.id)}
          >
            {swatch && <span className="bestiary-swatch" />}
            {option.label}
          </button>
        );
      })}
      {children}
    </div>
  );
}
