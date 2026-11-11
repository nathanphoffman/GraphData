import { seriesLabel } from "../model/style";

/** Dropdown that orders the languages by any one metric, one group of entries per legend group. */
export default function SortSelect({
  sections,
  sortKey,
  onSort,
}: {
  sections: { title: string; keys: string[] }[];
  sortKey: string;
  onSort: (seriesKey: string) => void;
}) {
  return (
    <fieldset className="legend-group">
      <legend>Sort order</legend>
      <p className="legend-description">
        Orders the languages from left to right, highest first, by any one metric. Languages with no value for it go
        last.
      </p>
      <select className="sort-select" value={sortKey} onChange={(event) => onSort(event.target.value)}>
        {sections.map(({ title, keys }) => (
          <optgroup key={title} label={title}>
            {keys.map((seriesKey) => (
              <option key={seriesKey} value={seriesKey}>
                {seriesLabel(seriesKey)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </fieldset>
  );
}
