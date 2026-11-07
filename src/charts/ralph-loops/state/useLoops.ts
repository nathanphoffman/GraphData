import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import type { Loop } from "../model/types";

const POLL_MS = 15_000;
const STOP_POLLING_MS = 60 * 60 * 1000;

/**
 * Every loop that has reported in. Loads when the page opens, then every 15 seconds while the tab is visible,
 * until an hour has passed (a refresh starts over).
 */
export function useLoops() {
  const [loops, setLoops] = useState<Loop[] | null>(null);
  const [error, setError] = useState("");
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const started = Date.now();

    const load = () =>
      callApi<{ projects: Loop[] }>("/api/ralph")
        .then((data) => {
          setLoops(data.projects);
          setError("");
        })
        .catch((problem: Error) => setError(problem.message));

    // Visible, not focused: a page open on a second screen keeps updating while you type somewhere else.
    const active = () => !document.hidden;

    const expired = () => Date.now() - started > STOP_POLLING_MS;

    load();
    const timer = setInterval(() => {
      if (expired()) {
        clearInterval(timer);
        setStopped(true);
      } else if (active()) load();
    }, POLL_MS);

    // Catch up right away when coming back to the window (the server shares its answer, so this is cheap).
    const onFocus = () => {
      if (!expired()) load();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  return { loops, error, stopped };
}
