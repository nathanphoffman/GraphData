import { useEffect, useState } from "react";

/** useState that remembers its value in localStorage; stored values that fail `isValid` are ignored. */
export function useStoredNumber(
  key: string,
  fallback: number,
  isValid: (v: number) => boolean,
) {
  const storageKey = `minimalism-calculator:${key}`;
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const n = stored === null ? NaN : Number(stored);
      return isValid(n) ? n : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {
      // storage unavailable (private mode, blocked): the slider still works, it just won't be remembered
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}
