import { useEffect, useState } from "react";

/**
 * useState that starts from localStorage (if it holds something `parse` accepts) and remembers changes there.
 * `parse` takes whatever JSON was saved and returns a valid value, or null to use the fallback.
 */
export function useStoredState<T>(key: string, fallback: T, parse: (saved: unknown) => T | null) {
  const storageKey = `astronomy-targets:${key}`;

  // Start from the saved value when it loads and passes `parse`; any problem falls back to the default.
  const [value, setValue] = useState<T>(() => {
    try {
      const rawValue = localStorage.getItem(storageKey);

      return rawValue === null ? fallback : (parse(JSON.parse(rawValue)) ?? fallback);
    } catch (error) {
      console.warn(`Could not read saved ${storageKey}, using default`, error);

      return fallback;
    }
  });

  // Remember the value so it is still there after a reload.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      // storage unavailable (private mode, blocked): it still works, it just won't be remembered
      console.warn(`Could not save ${storageKey}`, error);
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
