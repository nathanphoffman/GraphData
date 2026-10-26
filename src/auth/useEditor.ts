import { useState } from "react";

/**
 * State shared by the edit forms: the fields show the saved record until you type, saving or removing reloads the data,
 * and a message says what happened. `saved` holds the existing record's fields as text, or is undefined for a new record.
 * Call `reset` when switching to another record.
 */
export function useEditor(saved: Record<string, string> | undefined, onSaved: () => Promise<void>) {
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const exists = saved !== undefined;

  // Run the save or remove call, then reload the data and show a message (or the problem if it failed).
  const runAction = (action: Promise<unknown>, done: string) =>
    action
      // Each .then runs when the step before it worked; the .catch below handles a failure in any of them.
      .then(onSaved)
      .then(() => {
        setTyped({});
        setMessage(done);
      })
      .catch((problem: Error) => setMessage(problem.message));

  return {
    exists,
    message,
    /** Text of one field: what was typed, otherwise the saved value. */
    field: (fieldName: string) => typed[fieldName] ?? saved?.[fieldName] ?? "",
    set: (fieldName: string, value: string) => setTyped({ ...typed, [fieldName]: value }),
    reset: () => {
      setTyped({});
      setMessage("");
    },
    /** Run the call that adds or changes the record. */
    save: (action: Promise<unknown>) => runAction(action, exists ? "Changed" : "Added"),
    /** Run the call that removes the record. */
    remove: (action: Promise<unknown>) => runAction(action, "Removed"),
  };
}
