import { type FormEvent, useState } from "react";
import { api } from "../../../../api";
import { AuthGate } from "../../../../auth/AuthGate";
import { days } from "../model/rows";

const todayDate = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

/** Pick a date and add, change or remove its weigh-in. */
function EditForm({ onSaved }: { onSaved: () => Promise<void> }) {
  const [date, setDate] = useState(todayDate);
  const [typed, setTyped] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Estimated days have no real weigh-in, so only real ones count as existing.
  const existing = days.find((d) => d.date === date && !d.estimated)?.weight;
  const weight = typed ?? (existing === undefined ? "" : String(existing));

  const run = (action: Promise<unknown>, done: string) =>
    action
      .then(onSaved)
      .then(() => {
        setTyped(null);
        setMessage(done);
      })
      .catch((problem: Error) => setMessage(problem.message));

  const save = (event: FormEvent) => {
    event.preventDefault();
    run(api(`/api/weights/${date}`, "PUT", { weight: Number(weight) }), existing === undefined ? "Added" : "Changed");
  };

  return (
    <form className="edit-form" onSubmit={save}>
      <input type="date" value={date} max={todayDate()} onChange={(e) => { setDate(e.target.value); setTyped(null); setMessage(""); }} />
      <input type="number" step="0.1" min="0" value={weight} onChange={(e) => setTyped(e.target.value)} placeholder="Weight (lb)" />
      <button type="submit" disabled={!date || !(Number(weight) > 0)}>{existing === undefined ? "Add" : "Change"}</button>
      <button type="button" disabled={existing === undefined} onClick={() => run(api(`/api/weights/${date}`, "DELETE"), "Removed")}>Remove</button>
      {message && <span className="edit-message">{message}</span>}
    </form>
  );
}

/** Gear in the top right corner of the page that opens the login (if needed) and the weigh-in form. */
export function EditPanel({ onSaved }: { onSaved: () => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="edit-panel">
      <button type="button" className="edit-gear" onClick={() => setOpen(!open)} aria-label="Edit weights" title="Edit weights">⚙</button>
      {open && (
        <div className="edit-popup">
          <AuthGate>
            {(user, logout) => (
              <>
                <EditForm onSaved={onSaved} />
                <span className="edit-user">Logged in as {user} <button type="button" onClick={logout}>Log out</button></span>
              </>
            )}
          </AuthGate>
        </div>
      )}
    </div>
  );
}
