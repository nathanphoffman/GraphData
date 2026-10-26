import { type FormEvent, useState } from "react";
import { api } from "../../../api";
import type { Ranking } from "./score";

/** A typed information value: empty is nothing, plain numbers (years) stay numbers, anything else (like "2027?") stays text. */
const infoValue = (text: string) => (text.trim() === "" ? null : /^-?\d+(\.\d+)?$/.test(text.trim()) ? Number(text) : text.trim());

/** Pick an item by name (or type a new one) and add, change or remove it. */
export function RankingEditor({ ranking, onSaved }: { ranking: Ranking; onSaved: () => Promise<void> }) {
  const [name, setName] = useState("");
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");

  const existing = ranking.items.find((item) => item.name === name);
  const textOf = (index: number) => typed[index] ?? String(existing?.values[index] ?? "");
  const url = `/api/rankings/${ranking.id}/items/${encodeURIComponent(name)}`;

  const values = ranking.columns.map((column, index) => (column.weight === undefined ? infoValue(textOf(index)) : Number(textOf(index))));
  const complete = name.trim() !== "" && ranking.columns.every((column, index) => column.weight === undefined || textOf(index) !== "");

  const run = (action: Promise<unknown>, done: string) =>
    action
      .then(onSaved)
      .then(() => {
        setTyped({});
        setMessage(done);
      })
      .catch((problem: Error) => setMessage(problem.message));

  const save = (event: FormEvent) => {
    event.preventDefault();
    run(api(url, "PUT", { values }), existing ? "Changed" : "Added");
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input list="ranking-names" value={name} placeholder="Name (pick one or type a new one)" onChange={(e) => { setName(e.target.value); setTyped({}); setMessage(""); }} />
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
              type={column.weight === undefined ? "text" : "number"}
              step="0.5"
              min="0"
              max="5"
              value={textOf(index)}
              onChange={(e) => setTyped({ ...typed, [index]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <button type="submit" disabled={!complete}>{existing ? "Change" : "Add"}</button>
      <button type="button" disabled={!existing} onClick={() => run(api(url, "DELETE"), "Removed")}>Remove</button>
      {message && <span className="edit-message">{message}</span>}
    </form>
  );
}
