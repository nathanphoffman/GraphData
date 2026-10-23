import { PreviewSection, ScoringSection } from "./ScoringSections";
import { type SectionProps, SkySection } from "./SkySection";
import { TelescopeSection } from "./TelescopeSection";

/** All the settings sections stacked in one panel. */
export function ControlsPanel(props: SectionProps) {
  return (
    <div className="panel astro-controls">
      <SkySection {...props} />
      <TelescopeSection {...props} />
      <PreviewSection {...props} />
      <ScoringSection {...props} />
      <p className="astro-note">
        Times are local solar time (ignore daylight saving). Each target is scored in its best season, checking every
        half hour on the 15th of each month in that season, for the three hours around its best time (when it is
        highest in the dark); moonlight is not counted.
      </p>
    </div>
  );
}
