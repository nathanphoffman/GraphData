import type { ReactNode } from "react";

interface Props<Key extends string> {
  /** The column this header sorts by. */
  columnKey: Key;

  /** The column the table is sorted by now, and which way. */
  sortKey: Key;
  ascending: boolean;
  onSort: (columnKey: Key) => void;
  title?: string;
  className?: string;
  children: ReactNode;
}

/** A table header cell that sorts the table by its column when clicked, showing an arrow while it is the sorted column. */
export default function SortHeader<Key extends string>({
  columnKey,
  sortKey,
  ascending,
  onSort,
  title,
  className,
  children,
}: Props<Key>) {
  const active = columnKey === sortKey;
  const direction = ascending ? "ascending" : "descending";

  return (
    // aria-sort tells screen readers the direction on the sorted column, and none on the rest.
    <th title={title} className={className} aria-sort={active ? direction : "none"}>
      <button type="button" className="sort-button" onClick={() => onSort(columnKey)}>
        {children}
        {active && (ascending ? " ▲" : " ▼")}
      </button>
    </th>
  );
}
