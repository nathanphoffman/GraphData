/** The Add / Change and Remove buttons of an edit form, with the result message. Put it inside the form. */
export function EditButtons({ exists, canSave, onRemove, message }: { exists: boolean; canSave: boolean; onRemove: () => void; message: string }) {
  return (
    <>
      <button type="submit" disabled={!canSave}>{exists ? "Change" : "Add"}</button>
      <button type="button" disabled={!exists} onClick={onRemove}>Remove</button>
      {message && <span className="edit-message">{message}</span>}
    </>
  );
}
