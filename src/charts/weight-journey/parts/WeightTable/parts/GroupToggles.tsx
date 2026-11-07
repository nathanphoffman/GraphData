import { GROUPS, type Show } from "../model/showGroups";

interface Props {
  show: Show;
  onChange: (show: Show) => void;
}

/** One checkbox per column group. */
export default function GroupToggles({ show, onChange }: Props) {
  return (
    <div className="toggles">
      {GROUPS.map(({ key: groupKey, label }) => (
        <label key={groupKey} className="toggle">
          <input
            type="checkbox"
            checked={show[groupKey]}
            onChange={(event) => onChange({ ...show, [groupKey]: event.target.checked })}
          />{" "}
          {label}
        </label>
      ))}
    </div>
  );
}
