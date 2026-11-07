import NumberSlider from "../../../components/NumberSlider";
import { MAX_WEIGHT, MIN_WEIGHT, WEIGHT_STEP } from "../model/constants";
import type { Settings } from "../model/types";
import { YEAR_STEPS } from "../model/yearSteps";

const WEIGHT_RANGE = { min: MIN_WEIGHT, max: MAX_WEIGHT, step: WEIGHT_STEP };
const YEAR_RANGE = { min: 0, max: YEAR_STEPS.length - 1, step: 1 };

interface Props {
  settings: Settings;
  onChange: (changes: Partial<Settings>) => void;
}

/** The weight preference, release year and "just my games" controls above the list. */
export default function WeightControls({ settings, onChange }: Props) {
  return (
    <div className="board-games-controls">
      <label>
        <input
          type="checkbox"
          checked={settings.preferWeight}
          onChange={(changeEvent) => onChange({ preferWeight: changeEvent.target.checked })}
        />{" "}
        Prefer a Specific Weight
      </label>
      {settings.preferWeight && (
        <label>
          Weight preference: {settings.weight.toFixed(2)}{" "}
          <NumberSlider range={WEIGHT_RANGE} value={settings.weight} onChange={(weight) => onChange({ weight })} />
        </label>
      )}

      <label>
        Released: {YEAR_STEPS[settings.yearStep].label}{" "}
        <NumberSlider range={YEAR_RANGE} value={settings.yearStep} onChange={(yearStep) => onChange({ yearStep })} />
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.onlyMine}
          onChange={(changeEvent) => onChange({ onlyMine: changeEvent.target.checked })}
        />{" "}
        Just show my games
      </label>
    </div>
  );
}
