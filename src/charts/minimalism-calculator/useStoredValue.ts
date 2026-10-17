import { useEffect, useState } from "react";

/** A value from a shared link's query (the part after "?" in the hash), if the link has one. */
function sharedParam(key: string): string | null {
  const query = window.location.hash.split("?")[1];
  return query ? new URLSearchParams(query).get(key) : null;
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
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {
      // storage unavailable (private mode, blocked): it still works, it just won't be remembered
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
