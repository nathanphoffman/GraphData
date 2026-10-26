import { type ReactNode, useState } from "react";
import { AuthGate } from "./AuthGate";

/** Gear in the top right corner of the page; opens the login (if needed) and then shows `children`, the edit form. */
export function EditGear({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="edit-gear" onClick={() => setOpen(!open)} aria-label={label} title={label}>⚙</button>
      {open && (
        <div className="edit-popup">
          <AuthGate>
            {(user, logout) => (
              <>
                {children}
                <span className="edit-user">Logged in as {user} <button type="button" onClick={logout}>Log out</button></span>
              </>
            )}
          </AuthGate>
        </div>
      )}
    </>
  );
}
