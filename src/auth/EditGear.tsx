import { type ReactNode, useEffect, useRef, useState } from "react";
import { AuthGate } from "./AuthGate";
import type { useAuth } from "./useAuth";

/** Gear in the top right corner of the page (pass `auth` to share the login with the rest of the page); opens the login (if needed) and then shows `children`, the edit form. */
export function EditGear({ label, auth, children }: { label: string; auth?: ReturnType<typeof useAuth>; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere outside the gear and the popup, or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button ref={buttonRef} type="button" className="edit-gear" onClick={() => setOpen(!open)} aria-label={label} title={label}>⚙</button>
      {open && (
        <div className="edit-popup" ref={popupRef}>
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
