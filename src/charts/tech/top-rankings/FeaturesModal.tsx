import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { callApi } from "../../../api";
import type { Item } from "./score";

/** The key that adds the next feature row. */
const ENTER_KEY = "Enter";

/** A pop-up listing an item's planned features as editable rows; Save replaces the saved list, and rows left empty are dropped. */
export function FeaturesModal({ rankingId, item, onClose, onSaved }: { rankingId: string; item: Item; onClose: () => void; onSaved: () => Promise<void> }) {
  const [rows, setRows] = useState<string[]>(item.features?.length ? item.features : [""]);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const focusLast = useRef(false);

  // Open as a modal when it appears; the browser then handles Escape and keeps focus inside.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const change = (index: number, text: string) => setRows(rows.map((row, rowIndex) => (rowIndex === index ? text : row)));

  const addRow = () => {
    focusLast.current = true;
    setRows([...rows, ""]);
  };

  const keys = (event: KeyboardEvent, index: number) => {
    if (event.key !== ENTER_KEY) return;
    event.preventDefault();

    if (index === rows.length - 1) addRow();
  };

  const save = async () => {
    const features = rows.map((row) => row.trim()).filter((row) => row !== "");

    try {
      await callApi(`/api/rankings/${rankingId}/items/${encodeURIComponent(item.name)}/features`, "PUT", { features });
      await onSaved();
      onClose();
    } catch (problem) {
      setMessage((problem as Error).message);
    }
  };

  return (
    <dialog ref={dialog} className="rankings-modal" onClose={onClose} onClick={(clickEvent) => clickEvent.target === dialog.current && onClose()}>
      <h3>{item.name} · planned features</h3>
      <ul>
        {rows.map((row, index) => (
          // Rows have no id of their own and are only added at the end or removed, so the position is the key.
          // biome-ignore lint/suspicious/noArrayIndexKey: see above
          <li key={index}>
            <input
              value={row}
              placeholder="Feature…"
              aria-label={`Feature ${index + 1}`}
              onChange={(changeEvent) => change(index, changeEvent.target.value)}
              onKeyDown={(keyEvent) => keys(keyEvent, index)}
              ref={(input) => {
                if (input && focusLast.current && index === rows.length - 1) {
                  focusLast.current = false;
                  input.focus();
                }
              }}
            />
            <button type="button" aria-label={`Remove feature ${index + 1}`} onClick={() => setRows(rows.filter((_row, rowIndex) => rowIndex !== index))}>✕</button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addRow}>+ Add feature</button>
      <div className="rankings-modal-actions">
        <button type="button" onClick={() => void save()}>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
        {message && <span role="alert">{message}</span>}
      </div>
    </dialog>
  );
}
