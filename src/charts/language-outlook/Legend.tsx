import LegendGroup from "./Legend/LegendGroup";
import SortSelect from "./Legend/SortSelect";
import { LEGEND_GROUPS } from "./model/style";
import type { LanguageOutlookData } from "./model/types";

interface Props {
  model: LanguageOutlookData;
  visible: Record<string, boolean>;
  onToggle: (seriesKey: string, shown: boolean) => void;
  sortKey: string;
  onSort: (seriesKey: string) => void;
}

/** The keys that belong to each legend group, leaving out groups with none. */
function groupSeries(model: LanguageOutlookData) {
  const allKeys = [...model.series, ...model.lines];

  return LEGEND_GROUPS.map((group) => ({
    title: group.title,
    description: group.description,

    // Keep the keys whose first matching legend group is this one.
    keys: allKeys.filter((allKey) => LEGEND_GROUPS.find((legendGroup) => legendGroup.test(allKey)) === group),
  })).filter((section) => section.keys.length > 0);
}

/** Checkbox legend: boxes in a grid, one per group; the checkboxes slide open under the description. */
export default function Legend({ model, visible, onToggle, sortKey, onSort }: Props) {
  const sections = groupSeries(model);

  return (
    <div className="legend">
      <SortSelect sections={sections} sortKey={sortKey} onSort={onSort} />
      {sections.map((section) => (
        <LegendGroup key={section.title} model={model} section={section} visible={visible} onToggle={onToggle} />
      ))}
    </div>
  );
}
