import { useEffect, useState } from "react";

/** How a value is turned into the text localStorage keeps, and back. */
export interface TextCodec<T> {
  /** Returns the value, or null when the text is not valid. */
  parse: (text: string) => T | null;
  serialize: (value: T) => string;
}

/** The saved value, or null when nothing is saved or it is not valid. A browser that blocks storage counts as nothing saved. */
function readSaved<T>(storageKey: string, codec: TextCodec<T>): T | null {
  try {
    const text = localStorage.getItem(storageKey);

    return text === null ? null : codec.parse(text);
  } catch (error) {
    console.warn(`Could not read saved ${storageKey}, using default`, error);

    return null;
  }
}

function writeSaved(storageKey: string, text: string) {
  try {
    localStorage.setItem(storageKey, text);
  } catch (error) {
    // storage unavailable (private mode, blocked): it still works, it just won't be remembered
    console.warn(`Could not save ${storageKey}`, error);
  }
}

/**
 * useState that starts from `fromLink` (if it gives a value), else localStorage, else the fallback,
 * and remembers changes in localStorage.
 */
export function useStoredState<T>(
  storageKey: string,
  fallback: T,
  codec: TextCodec<T>,
  fromLink?: () => T | null,
) {
  const [value, setValue] = useState<T>(() => fromLink?.() ?? readSaved(storageKey, codec) ?? fallback);
  const text = codec.serialize(value);

  // Remember the value so it is still there after a reload. Watching the text, not the codec, keeps this from running on every render.
  useEffect(() => {
    writeSaved(storageKey, text);
  }, [storageKey, text]);

  return [value, setValue] as const;
}

/**
 * useStoredState for values kept as JSON.
 * `parse` takes whatever JSON was saved and returns a valid value, or null to use the fallback.
 */
export function useStoredJson<T>(storageKey: string, fallback: T, parse: (saved: unknown) => T | null) {
  const codec: TextCodec<T> = { parse: (text) => parse(JSON.parse(text)), serialize: JSON.stringify };

  return useStoredState(storageKey, fallback, codec);
}
