import { useState } from "react";

/** The sort key for names, which start A to Z (everything else starts with the biggest). */
export const NAME_KEY = "name";

/** Column sorting for tables: clicking the active column flips direction, a new column starts descending (name starts ascending). */
export function useSort<Key extends string>(initialKey: Key) {
  const [sortKey, setSortKey] = useState<Key>(initialKey);
  const [ascending, setAscending] = useState(false);

  // Clicking the sorted column flips direction; a new column starts descending (names ascending).
  const sortBy = (key: Key) => {
    if (key === sortKey) setAscending(!ascending);
    else {
      setSortKey(key);
      setAscending(key === NAME_KEY);
    }
  };

  return { sortKey, ascending, sortBy };
}
