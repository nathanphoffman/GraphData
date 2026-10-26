import { useCallback, useEffect, useState } from "react";
import { callApi } from "../api";

/** Who is logged in: undefined while checking, null when nobody is, otherwise the username. */
export function useAuth() {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  // Ask the server who is logged in once, when the page first loads.
  useEffect(() => {
    callApi<{ username: string | null }>("/api/me")
      .then((current) => setUser(current.username))
      .catch(() => setUser(null));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const loggedIn = await callApi<{ username: string }>("/api/login", "POST", { username, password });
    setUser(loggedIn.username);
  }, []);

  const logout = useCallback(async () => {
    await callApi("/api/logout", "POST");
    setUser(null);
  }, []);

  return { user, login, logout };
}
