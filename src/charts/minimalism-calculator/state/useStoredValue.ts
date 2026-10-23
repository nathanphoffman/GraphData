import { useEffect, useState } from "react";

/** A value from a shared link's query (the part after "?"), if the link has one. */
function sharedParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

/**
 * useState that starts from a shared link, else localStorage, else the fallback, and remembers
 * changes in localStorage. `parse` turns saved text back into a value, or null if it is not valid.
 */
export function useStoredValue<T>(key: string, fallback: T, parse: (raw: string) => T | null) {
  const storageKey = `minimalism-calculator:${key}`;
  const [value, setValue] = useState<T>(() => {
    const shared = sharedParam(key);
    const fromLink = shared === null ? null : parse(shared);
    if (fromLink !== null) return fromLink;
    try {
      const stored = localStorage.getItem(storageKey);
      const fromStorage = stored === null ? null : parse(stored);
      return fromStorage ?? fallback;
    } catch (error) {
      console.warn(`Could not read saved ${storageKey}, using default`, error);
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch (error) {
      // storage unavailable (private mode, blocked): it still works, it just won't be remembered
      console.warn(`Could not save ${storageKey}`, error);
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}

export function useStoredNumber(key: string, fallback: number, isValid: (v: number) => boolean) {
  return useStoredValue(key, fallback, (raw) => {
    const n = raw.trim() === "" ? NaN : Number(raw);
    return isValid(n) ? n : null;
  });
}
