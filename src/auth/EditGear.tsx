import { type ReactNode, useState } from "react";
import { AuthGate } from "./AuthGate";
import type { useAuth } from "./useAuth";

/** Gear in the top right corner of the page (pass `auth` to share the login with the rest of the page); opens the login (if needed) and then shows `children`, the edit form. */
export function EditGear({ label, auth, children }: { label: string; auth?: ReturnType<typeof useAuth>; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="edit-gear" onClick={() => setOpen(!open)} aria-label={label} title={label}>⚙</button>
      {open && (
        <div className="edit-popup">
          <AuthGate auth={auth}>
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
