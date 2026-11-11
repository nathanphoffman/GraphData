import type { ReactNode } from "react";

/** A toggle button with a panel that slides open under it. */
export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button type="button" className="legend-toggle" aria-expanded={isOpen} onClick={onToggle}>
        <span className={isOpen ? "chevron open" : "chevron"}>▸</span>
        {title}
      </button>
      <div className={isOpen ? "legend-panel open" : "legend-panel"}>
        <div className="legend-panel-inner">{children}</div>
      </div>
    </>
  );
}
