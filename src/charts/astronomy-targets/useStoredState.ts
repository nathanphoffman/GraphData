import { useEffect, useState } from "react";

/**
 * useState that starts from localStorage (if it holds something `parse` accepts) and remembers changes there.
 * `parse` takes whatever JSON was saved and returns a valid value, or null to use the fallback.
 */
export function useStoredState<T>(key: string, fallback: T, parse: (saved: unknown) => T | null) {
  const storageKey = `astronomy-targets:${key}`;
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw === null ? fallback : (parse(JSON.parse(raw)) ?? fallback);
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // storage unavailable (private mode, blocked): it still works, it just won't be remembered
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}
