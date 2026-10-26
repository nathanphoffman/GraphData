import { type FormEvent, useState } from "react";
import { api } from "../../../../api";
import { EditButtons } from "../../../../auth/EditButtons";
import { EditGear } from "../../../../auth/EditGear";
import { useEditor } from "../../../../auth/useEditor";
import { days } from "../model/rows";

const todayDate = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

/** Pick a date and add, change or remove its weigh-in. */
function EditForm({ onSaved }: { onSaved: () => Promise<void> }) {
  const [date, setDate] = useState(todayDate);

  // Estimated days have no real weigh-in, so only real ones count as existing.
  const existing = days.find((d) => d.date === date && !d.estimated)?.weight;
  const editor = useEditor(existing === undefined ? undefined : { weight: String(existing) }, onSaved);
  const weight = editor.field("weight");
  const url = `/api/weights/${date}`;

  const save = (event: FormEvent) => {
    event.preventDefault();
    editor.save(api(url, "PUT", { weight: Number(weight) }));
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input type="date" value={date} max={todayDate()} onChange={(e) => { setDate(e.target.value); editor.reset(); }} />
      <input type="number" step="0.1" min="0" value={weight} onChange={(e) => editor.set("weight", e.target.value)} placeholder="Weight (lb)" />
      <EditButtons exists={editor.exists} canSave={!!date && Number(weight) > 0} onRemove={() => editor.remove(api(url, "DELETE"))} message={editor.message} />
    </form>
  );
}

/** Gear in the top right corner of the page for adding, changing and removing weigh-ins. */
export function EditPanel({ onSaved }: { onSaved: () => Promise<void> }) {
  return (
    <EditGear label="Edit weights">
      <EditForm onSaved={onSaved} />
    </EditGear>
  );
}
