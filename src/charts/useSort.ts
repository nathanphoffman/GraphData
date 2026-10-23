import { useState } from "react";

/** Column sorting for tables: clicking the active column flips direction, a new column starts descending (name starts ascending). */
export function useSort<Key extends string>(initialKey: Key) {
  const [sortKey, setSortKey] = useState<Key>(initialKey);
  const [ascending, setAscending] = useState(false);

  // Clicking the sorted column flips direction; a new column starts descending (names ascending).
  const sortBy = (key: Key) => {
    if (key === sortKey) setAscending(!ascending);
    else {
      setSortKey(key);
      setAscending(key === "name");
    }
  };

  return { sortKey, ascending, sortBy };
}
