import { type FormEvent, useState } from "react";
import { callApi } from "../../../../api";
import { EditButtons } from "../../../../auth/EditButtons";
import { EditGear } from "../../../../auth/EditGear";
import { useEditor } from "../../../../auth/useEditor";
import { days } from "../model/rows";

/** The name the weight is kept under while it is edited. */
const WEIGHT_FIELD = "weight";

const todayDate = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

/** Pick a date and add, change or remove its weigh-in. */
function EditForm({ onSaved }: { onSaved: () => Promise<void> }) {
  const [date, setDate] = useState(todayDate);

  // Estimated days have no real weigh-in, so only real ones count as existing.
  const existing = days.find((dayRecord) => dayRecord.date === date && !dayRecord.estimated)?.weight;
  const editor = useEditor(existing === undefined ? undefined : { weight: String(existing) }, onSaved);
  const weight = editor.field(WEIGHT_FIELD);
  const weightUrl = `/api/weights/${date}`;

  const save = (event: FormEvent) => {
    event.preventDefault();
    editor.save(callApi(weightUrl, "PUT", { weight: Number(weight) }));
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input type="date" value={date} max={todayDate()} onChange={(changeEvent) => { setDate(changeEvent.target.value); editor.reset(); }} />
      <input type="number" step="0.1" min="0" value={weight} onChange={(changeEvent) => editor.set(WEIGHT_FIELD, changeEvent.target.value)} placeholder="Weight (lb)" />
      <EditButtons exists={editor.exists} canSave={!!date && Number(weight) > 0} onRemove={() => editor.remove(callApi(weightUrl, "DELETE"))} message={editor.message} />
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
