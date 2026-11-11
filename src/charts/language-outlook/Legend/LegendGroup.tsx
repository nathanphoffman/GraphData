import { useState } from "react";
import type { LanguageOutlookData } from "../model/types";
import CollapsibleSection from "./CollapsibleSection";
import ColourKey from "./ColourKey";
import SeriesCheckbox from "./SeriesCheckbox";

interface Props {
  model: LanguageOutlookData;
  section: { title: string; description: string; keys: string[] };
  visible: Record<string, boolean>;
  onToggle: (seriesKey: string, shown: boolean) => void;
}

/** One box of the legend: the group's colour key, an About panel and a Filters panel of checkboxes. */
export default function LegendGroup({ model, section, visible, onToggle }: Props) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { title, description, keys } = section;
  const shownCount = keys.filter((seriesKey) => visible[seriesKey]).length;

  return (
    <fieldset className="legend-group">
      <legend>{title}</legend>
      <ColourKey model={model} keys={keys} />
      <CollapsibleSection title="About" isOpen={aboutOpen} onToggle={() => setAboutOpen(!aboutOpen)}>
        <p className="legend-description">{description}</p>
      </CollapsibleSection>
      <CollapsibleSection
        title={`Filters (${shownCount}/${keys.length} shown)`}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      >
        {keys.map((seriesKey) => (
          <SeriesCheckbox
            key={seriesKey}
            model={model}
            seriesKey={seriesKey}
            checked={visible[seriesKey]}
            onToggle={onToggle}
          />
        ))}
      </CollapsibleSection>
    </fieldset>
  );
}
