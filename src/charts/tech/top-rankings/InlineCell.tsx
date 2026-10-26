import { type CSSProperties, type KeyboardEvent, type ReactNode, useState } from "react";
import { type Column, HIGHEST_RATING } from "./score";

/** The key that saves an edit or starts one. */
const ENTER_KEY = "Enter";

/** A typed information value: empty is nothing, plain numbers (years) stay numbers, anything else (like "2027?") stays text. */
export const infoValue = (text: string) => (text.trim() === "" ? null : /^-?\d+(\.\d+)?$/.test(text.trim()) ? Number(text) : text.trim());

/** The value to save for text typed into a column, or an Error saying what is wrong with it. */
export function parseCell(column: Column, text: string): number | string | null {
  if (column.weight === undefined) return infoValue(text);

  const number = Number(text);

  if (text.trim() === "" || !Number.isFinite(number)) throw new Error(`${column.label} must be a number`);

  if (column.curve === undefined && (number < 0 || number > HIGHEST_RATING)) throw new Error(`${column.label} must be from 0 to ${HIGHEST_RATING}`);

  return number;
}

/** A table cell that turns into a text box when clicked (if `canEdit`). Enter or clicking away saves, Escape cancels. */
export function InlineCell({ column, itemName, value, canEdit, onSave, style, children }: {
  column: Column;
  itemName: string;
  value: number | string | null | undefined;
  canEdit: boolean;
  onSave: (value: number | string | null) => Promise<void>;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Save only when the text changed, so clicking in and out of a cell does not send a request; a bad value keeps its red outline instead of being lost.
  const finish = async () => {
    if (text === null) return;
    const typed = text;
    setText(null);

    if (typed === String(value ?? "")) return;

    try {
      await onSave(parseCell(column, typed));
      setError("");
    } catch (problem) {
      setError((problem as Error).message);
    }
  };

  const start = () => text === null && setText(String(value ?? ""));

  const keys = (event: KeyboardEvent) => {
    if (event.key === ENTER_KEY) void finish();

    if (event.key === "Escape") setText(null);
  };

  if (!canEdit) return <td style={style}>{children}</td>;

  return (
    <td style={style} className={`rankings-editable${error ? " rankings-cell-error" : ""}`} title={error || undefined} tabIndex={text === null ? 0 : undefined} onClick={start} onKeyDown={(keyEvent) => keyEvent.target === keyEvent.currentTarget && keyEvent.key === ENTER_KEY && start()}>
      {text === null ? children : (
        <>
          {/* far below the header the column is out of sight, so name it next to the box */}
          <small className="rankings-cell-label">{itemName} · {column.label}</small>
          {/* Escape sets text to null, which removes the box, and blur then does nothing. */}
          <input className="rankings-cell-input" ref={(input) => input?.focus()} value={text} onChange={(changeEvent) => setText(changeEvent.target.value)} onKeyDown={keys} onBlur={() => void finish()} />
        </>
      )}

    </td>
  );
}
