import { useStoredJson } from "../../../hooks/useStoredState";

/** useStoredJson with this chart's saved values kept under their own "astronomy-targets:" names. */
export function useStoredState<T>(key: string, fallback: T, parse: (saved: unknown) => T | null) {
  return useStoredJson(`astronomy-targets:${key}`, fallback, parse);
}
