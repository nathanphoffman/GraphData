import { useCallback, useEffect, useState } from "react";
import { api } from "../api";

/** Who is logged in: undefined while checking, null when nobody is, otherwise the username. */
export function useAuth() {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    api<{ username: string | null }>("/api/me")
      .then((me) => setUser(me.username))
      .catch(() => setUser(null));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const me = await api<{ username: string }>("/api/login", "POST", { username, password });
    setUser(me.username);
  }, []);

  const logout = useCallback(async () => {
    await api("/api/logout", "POST");
    setUser(null);
  }, []);

  return { user, login, logout };
}
