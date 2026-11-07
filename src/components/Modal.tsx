import { type ReactNode, useEffect, useRef } from "react";

interface Props {
  /** Styles the pop-up box itself (width, colors); the dimmed backdrop is styled with `.<className>::backdrop`. */
  className: string;
  ariaLabel?: string;
  onClose: () => void;
  children: ReactNode;
}

/** A pop-up that opens as soon as it is rendered, so render it only while it should be showing. Escape or a click on the dimmed area closes it. */
export default function Modal({ className, ariaLabel, onClose, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Open as a modal when it appears; the browser then handles Escape and keeps focus inside.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    // Clicks inside must not reach whatever is underneath, such as a table cell that would start editing.
    // biome-ignore lint/a11y/useKeyWithClickEvents: clicking the backdrop is a mouse shortcut; Escape already closes it
    <dialog
      ref={dialog}
      className={className}
      aria-label={ariaLabel}
      onClose={onClose}
      onClick={(clickEvent) => {
        clickEvent.stopPropagation();

        if (clickEvent.target === dialog.current) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
