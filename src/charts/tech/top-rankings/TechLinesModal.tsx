import { useEffect, useRef } from "react";

const PERCENT = 100;

/** A pop-up listing a project's lines per language with each one's share. */
export function TechLinesModal({ itemName, shares, onClose }: { itemName: string; shares: { language: string; lines: number; share: number }[]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Open as a modal when it appears; the browser then handles Escape and keeps focus inside.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    // Clicks inside must not reach the cell underneath, which would start editing it.
    <dialog ref={dialog} className="rankings-modal" onClose={onClose} onClick={(clickEvent) => { clickEvent.stopPropagation(); if (clickEvent.target === dialog.current) onClose(); }}>
      <h3>{itemName} · lines by language</h3>
      <table>
        <tbody>
          {shares.map(({ language, lines, share }) => (
            <tr key={language}>
              <td>{language}</td>
              <td>{lines.toLocaleString("en-US")}</td>
              <td>{(share * PERCENT).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">Counts only the languages rated for the n-Factor, so this can be less than the total.</p>
      <button type="button" onClick={onClose}>Close</button>
    </dialog>
  );
}
