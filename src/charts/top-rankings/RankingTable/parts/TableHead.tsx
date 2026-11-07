import { useState } from "react";
import SortHeader from "../../../../components/SortHeader";
import type { TableColumns } from "../model/columns";
import type { Sort, SortKey } from "../model/sorting";

interface HeadProps {
  columns: TableColumns;
  showScore: boolean;
  showFeatures: boolean;
  sort: Sort;
  onSort: (sortColumn: SortKey) => void;

  /** When set (logged in), the rated headers can be dragged to reorder; gets the new label order, heaviest first. */
  onReorder?: (order: string[]) => void;
}

/** The header row: rank, name, information columns, score, grade, then the rated columns with their weights. */
export function TableHead({ columns, showScore, showFeatures, sort, onSort, onReorder }: HeadProps) {
  const [dragged, setDragged] = useState<string | null>(null);

  // Dropping a header onto another puts it in that spot, and the ones in between shift over.
  const drop = (target: string) => {
    const order = columns.rated.map(({ column }) => column.label);

    if (dragged === null || dragged === target) return;
    order.splice(order.indexOf(dragged), 1);
    order.splice(order.indexOf(target), 0, dragged);
    onReorder?.(order);
  };

  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        {columns.info.map(({ column }) => (
          <th key={column.label} title={column.label}>
            {column.short ?? column.label}
          </th>
        ))}

        {showScore && <th title="Each rating squared times its weight, added up">Score</th>}
        <SortHeader
          columnKey="grade"
          sortKey={sort.key}
          ascending={!sort.descending}
          onSort={onSort}
          title="The score as a grade out of 100 on a curve: it eases off near the top and drops faster further down"
        >
          Grade
        </SortHeader>
        {columns.rated.map(({ column }) => (
          <th
            key={column.label}
            draggable={onReorder !== undefined}
            onDragStart={() => setDragged(column.label)}
            onDragOver={(dragEvent) => onReorder && dragEvent.preventDefault()}
            onDrop={() => drop(column.label)}
            onDragEnd={() => setDragged(null)}
            className={onReorder ? "rankings-draggable" : undefined}
            title={`${column.label} (weight ×${column.weight})${column.best === undefined ? "" : `, best rating ${column.best}`}${column.curve === undefined ? "" : `, shown with its 1 to 5 rating`}${onReorder ? ". Drag to reorder the weights" : ""}`}
          >
            {column.short ?? column.label}
            <small>×{column.weight}</small>
          </th>
        ))}

        {showFeatures && <th title="Planned features">Features</th>}
      </tr>
    </thead>
  );
}
