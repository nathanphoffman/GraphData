import { useEffect, useState } from "react";

/** A value from a shared link's query (the part after "?"), if the link has one. */
function sharedParam(storageKey: string): string | null {
  return new URLSearchParams(window.location.search).get(storageKey);
}

/**
 * useState that starts from a shared link, else localStorage, else the fallback, and remembers
 * changes in localStorage. `parse` turns saved text back into a value, or null if it is not valid.
 */
export function useStoredValue<T>(settingKey: string, fallback: T, parse: (rawValue: string) => T | null) {
  const storageKey = `minimalism-calculator:${settingKey}`;

  // Start from a value in the shared link, else the saved one, else the default.
  const [value, setValue] = useState<T>(() => {
    const shared = sharedParam(settingKey);
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

  // Remember the value so it is still there after a reload.
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

/** Like useStoredValue but for numbers; text that is not a valid number is ignored. */
export function useStoredNumber(settingKey: string, fallback: number, isValid: (value: number) => boolean) {
  // Read the saved or shared text as a number, treating empty text as missing.
  return useStoredValue(settingKey, fallback, (rawValue) => {
    const parsed = rawValue.trim() === "" ? NaN : Number(rawValue);

    return isValid(parsed) ? parsed : null;
  });
}
