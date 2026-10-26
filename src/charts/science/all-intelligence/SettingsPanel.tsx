import type { Settings } from "./types";

/** The divisor slider goes up to this, in steps of this. */
const DIVISOR_MAX = 20;
const DIVISOR_STEP = 0.5;

interface Props {
  settings: Settings;
  set: (patch: Partial<Settings>) => void;
  groupCount: number;
}

/** Slider for the divisor, disabled when the chosen mode does not use it. */
function DivisorSlider({ value, disabled, onChange }: { value: number; disabled?: boolean; onChange: (value: number) => void }) {
  return <input type="range" min={1} max={DIVISOR_MAX} step={DIVISOR_STEP} disabled={disabled} value={value} onChange={(event) => onChange(Number(event.target.value))} />;
}

/** Choose how missing scores are treated: ignored, estimated or set to a floor. */
function MissingControl({ settings, set: updateSettings }: Pick<Props, "settings" | "set">) {
  const floor = settings.missingMode === "floor";

  return (
    <div className="allint-slider">
      <span>Not measured:</span>
      <select value={settings.missingMode} onChange={(event) => updateSettings({ missingMode: event.target.value as Settings["missingMode"] })}>
        <option value="skip">Skip it (score only what was tested)</option>
        <option value="floor">Count as a low score</option>
        <option value="estimate">Guess from its other scores</option>
      </select>
      <DivisorSlider value={settings.missingDivisor} disabled={!floor} onChange={(value) => updateSettings({ missingDivisor: value })} />
      <strong>{floor ? `${settings.missingDivisor.toFixed(1)}×` : settings.missingMode}</strong>
    </div>
  );
}

/** Settings that control how zero and unmeasured scores are handled. */
export function SettingsPanel({ settings, set: updateSettings, groupCount }: Props) {
  return (
    <div className="panel">
      <label className="allint-slider">
        <span>Real zero counts as worst score ÷</span>
        <DivisorSlider value={settings.zeroDivisor} onChange={(value) => updateSettings({ zeroDivisor: value })} />
        <strong>{settings.zeroDivisor.toFixed(1)}×</strong>
      </label>
      <MissingControl settings={settings} set={updateSettings} />
      <p className="allint-formula">
        Score = geometric mean of the {groupCount} group scores. Each group score is the geometric mean of its
        columns. Click a row to see its columns.
      </p>
    </div>
  );
}
