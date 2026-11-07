import { type FormEvent, useState } from "react";
import { callApi } from "../../api";
import { EditButtons } from "../../auth/EditButtons";
import { useEditor } from "../../auth/useEditor";
import { infoValue } from "./InlineCell";
import type { Ranking } from "./score";

/** Rated columns use a number box so letters cannot be typed, while information columns need free text for values like "2027?". */
const INPUT_TYPES = { rated: "number", info: "text" };

/** Pick an item by name (or type a new one) and add, change, rename or remove it. */
export function RankingEditor({ ranking, onSaved }: { ranking: Ranking; onSaved: () => Promise<void> }) {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

  // Fields are keyed by column number.
  const existing = ranking.items.find((item) => item.name === name);
  const editor = useEditor(
    existing && Object.fromEntries(existing.values.map((value, index) => [index, String(value ?? "")])),
    onSaved,
  );

  // The API address of this item; the name is escaped so any characters are safe.
  const itemUrl = `/api/rankings/${ranking.id}/items/${encodeURIComponent(name)}`;

  const values = ranking.columns.map((column, index) =>
    column.weight === undefined ? infoValue(editor.field(String(index))) : Number(editor.field(String(index))),
  );

  const complete =
    name.trim() !== "" &&
    ranking.columns.every((column, index) => column.weight === undefined || editor.field(String(index)) !== "");

  const save = (event: FormEvent) => {
    event.preventDefault();
    editor.save(callApi(itemUrl, "PUT", { values }));
  };

  // A rename needs a different name that no other item already has.
  const renamed = newName.trim();
  const canRename =
    editor.exists && renamed !== "" && renamed !== name && !ranking.items.some((item) => item.name === renamed);

  // After the rename is saved, the picker follows the item to its new name.
  const rename = () =>
    editor.save(callApi(`${itemUrl}/name`, "PUT", { name: renamed }).then(() => setName(renamed))).then(() => setNewName(""));

  return (
    <form className="edit-form" onSubmit={save}>
      <input
        list="ranking-names"
        value={name}
        placeholder="Name (pick one or type a new one)"
        onChange={(changeEvent) => {
          setName(changeEvent.target.value);
          setNewName("");
          editor.reset();
        }}

      />
      {editor.exists && (
        <>
          <input
            value={newName}
            placeholder="Rename to"
            title="Type a new name for the picked item, then press Rename. The next sync renames it on the other side too."
            onChange={(changeEvent) => setNewName(changeEvent.target.value)}
          />
          <button type="button" disabled={!canRename} onClick={rename}>
            Rename
          </button>
        </>
      )}

      <datalist id="ranking-names">
        {ranking.items.map((item) => (
          <option key={item.name} value={item.name} />
        ))}

      </datalist>
      <div className="edit-grid">
        {ranking.columns.map(
          (
            column,
            index, // One input per column.
          ) => (
            <label key={column.label}>
              {column.label}
              <input
                type={column.weight === undefined ? INPUT_TYPES.info : INPUT_TYPES.rated}
                step={column.curve === undefined ? "0.5" : "any"}
                min={column.curve === undefined ? "0" : undefined}
                max={column.curve === undefined ? "5" : undefined}
                value={editor.field(String(index))}
                onChange={(changeEvent) => editor.set(String(index), changeEvent.target.value)}
              />
            </label>
          ),
        )}

      </div>
      <EditButtons
        exists={editor.exists}
        canSave={complete}
        onRemove={() => editor.remove(callApi(itemUrl, "DELETE"))}
        message={editor.message}
      />
    </form>
  );
}
