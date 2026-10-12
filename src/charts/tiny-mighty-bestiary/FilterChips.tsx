interface Props {
  label: string;
  options: { id: string; label: string }[];
  active: string | null;
  /** Called with the new selection: the clicked id, or null when the active chip is clicked again. */
  onChange: (id: string | null) => void;
  /** Extra class for each chip, given the option id. */
  chipClass?: (id: string) => string;
  /** Show a color swatch inside each chip. */
  swatch?: boolean;
  children?: React.ReactNode;
}

/** One row of single-select filter chips. Clicking the active chip turns it off. */
export default function FilterChips({ label, options, active, onChange, chipClass, swatch, children }: Props) {
  return (
    <div className="bestiary-key" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <span className="bestiary-key-label">{label}</span>
      {options.map((o) => {
        const isActive = active === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={isActive}
            className={`bestiary-chip ${chipClass?.(o.id) ?? ""}${isActive ? " is-active" : ""}`}
            onClick={() => onChange(isActive ? null : o.id)}
          >
            {swatch && <span className="bestiary-swatch" />}
            {o.label}
          </button>
        );
      })}
      {children}
    </div>
  );
}
