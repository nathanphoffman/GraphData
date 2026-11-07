import { type TextCodec, useStoredState } from "../../../hooks/useStoredState";

/** A value from a shared link's query (the part after "?"), if the link has one. */
function sharedParam(storageKey: string): string | null {
  return new URLSearchParams(window.location.search).get(storageKey);
}

/**
 * useStoredState that also starts from a shared link first, with values saved as plain text under this chart's own
 * "minimalism-calculator:" names. `parse` turns saved text back into a value, or null if it is not valid.
 */
export function useStoredValue<T>(settingKey: string, fallback: T, parse: (rawValue: string) => T | null) {
  const codec: TextCodec<T> = { parse, serialize: String };

  const fromLink = () => {
    const shared = sharedParam(settingKey);

    return shared === null ? null : parse(shared);
  };

  return useStoredState(`minimalism-calculator:${settingKey}`, fallback, codec, fromLink);
}

/** Like useStoredValue but for numbers. Saved and shared values arrive as text, so anything that is not a valid number is dropped instead of showing NaN. */
export function useStoredNumber(settingKey: string, fallback: number, isValid: (value: number) => boolean) {
  // Read the saved or shared text as a number, treating empty text as missing.
  return useStoredValue(settingKey, fallback, (rawValue) => {
    const parsed = rawValue.trim() === "" ? NaN : Number(rawValue);

    return isValid(parsed) ? parsed : null;
  });
}
