import { type FormEvent, useState } from "react";
import { api } from "../../../api";
import { EditButtons } from "../../../auth/EditButtons";
import { useEditor } from "../../../auth/useEditor";
import { infoValue } from "./InlineCell";
import type { Ranking } from "./score";

/** Rated columns take numbers; information columns take any text. */
const INPUT_TYPES = { rated: "number", info: "text" };

/** Pick an item by name (or type a new one) and add, change or remove it. */
export function RankingEditor({ ranking, onSaved }: { ranking: Ranking; onSaved: () => Promise<void> }) {
  const [name, setName] = useState("");

  // Fields are keyed by column number.
  const existing = ranking.items.find((item) => item.name === name);
  const editor = useEditor(existing && Object.fromEntries(existing.values.map((value, index) => [index, String(value ?? "")])), onSaved);
  const url = `/api/rankings/${ranking.id}/items/${encodeURIComponent(name)}`;

  const values = ranking.columns.map((column, index) => (column.weight === undefined ? infoValue(editor.field(String(index))) : Number(editor.field(String(index)))));
  const complete = name.trim() !== "" && ranking.columns.every((column, index) => column.weight === undefined || editor.field(String(index)) !== "");

  const save = (event: FormEvent) => {
    event.preventDefault();
    editor.save(api(url, "PUT", { values }));
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input list="ranking-names" value={name} placeholder="Name (pick one or type a new one)" onChange={(e) => { setName(e.target.value); editor.reset(); }} />
      <datalist id="ranking-names">
        {ranking.items.map((item) => (
          <option key={item.name} value={item.name} />
        ))}
      </datalist>
      <div className="edit-grid">
        {ranking.columns.map((column, index) => (
          <label key={column.label}>
            {column.label}
            <input
              type={column.weight === undefined ? INPUT_TYPES.info : INPUT_TYPES.rated}
              step={column.curve === undefined ? "0.5" : "any"}
              min={column.curve === undefined ? "0" : undefined}
              max={column.curve === undefined ? "5" : undefined}
              value={editor.field(String(index))}
              onChange={(e) => editor.set(String(index), e.target.value)}
            />
          </label>
        ))}
      </div>
      <EditButtons exists={editor.exists} canSave={complete} onRemove={() => editor.remove(api(url, "DELETE"))} message={editor.message} />
    </form>
  );
}
