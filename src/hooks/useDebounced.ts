import { useEffect, useState } from "react";

/** Search boxes and sliders wait this long after the last change before the list is asked for again. */
const DEBOUNCE_MS = 300;

/**
 * A copy of `value` that only catches up once it has stopped changing, so what you see follows at once
 * but the list reloads after a pause. The setter lets a caller skip the wait.
 */
export function useDebounced<T>(value: T) {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  return [settled, setSettled] as const;
}
