import { type FormEvent, useState } from "react";
import { callApi } from "../../../../api";
import { EditButtons } from "../../../../auth/EditButtons";
import { useEditor } from "../../../../auth/useEditor";
import { PRESSURE_KEYS, type Pressure_Values, valuesOf } from "../model/bloodPressure";
import { pressureReadings } from "../model/rows";
import { todayIso } from "../model/units";

const FIELD_LABELS: Record<keyof Pressure_Values, string> = {
  firstTop: "1st top",
  firstBottom: "1st bottom",
  secondTop: "2nd top",
  secondBottom: "2nd bottom",
};

/** Pick a date and add, change or remove its two blood pressure readings (top and bottom of each). */
export function BloodPressureForm({ onSaved }: { onSaved: () => Promise<void> }) {
  const [date, setDate] = useState(todayIso);
  const existing = pressureReadings.find((reading) => reading[0] === date);
  const saved = existing && Object.fromEntries(Object.entries(valuesOf(existing)).map(([key, value]) => [key, String(value)]));
  const editor = useEditor(saved, onSaved);
  const pressureUrl = `/api/blood-pressure/${date}`;

  // Every one of the four numbers has to be typed before the readings can be saved.
  const typed = Object.fromEntries(PRESSURE_KEYS.map((key) => [key, Number(editor.field(key))]));
  const canSave = !!date && PRESSURE_KEYS.every((key) => typed[key] > 0);

  const save = (event: FormEvent) => {
    event.preventDefault();
    editor.save(callApi(pressureUrl, "PUT", typed));
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input
        type="date"
        value={date}
        max={todayIso()}
        onChange={(changeEvent) => {
          setDate(changeEvent.target.value);
          editor.reset();
        }}

      />
      {PRESSURE_KEYS.map((key) => (
        <input
          key={key}
          type="number"
          step="1"
          min="0"
          value={editor.field(key)}
          onChange={(changeEvent) => editor.set(key, changeEvent.target.value)}
          placeholder={`BP ${FIELD_LABELS[key]}`}
        />
      ))}

      <EditButtons
        exists={editor.exists}
        canSave={canSave}
        onRemove={() => editor.remove(callApi(pressureUrl, "DELETE"))}
        message={editor.message}
      />
    </form>
  );
}
