import type { Settings } from "./types";

interface Props {
  settings: Settings;
  set: (patch: Partial<Settings>) => void;
  groupCount: number;
}

function DivisorSlider({ value, disabled, onChange }: { value: number; disabled?: boolean; onChange: (v: number) => void }) {
  return <input type="range" min={1} max={20} step={0.5} disabled={disabled} value={value} onChange={(e) => onChange(Number(e.target.value))} />;
}

function MissingControl({ settings, set }: Pick<Props, "settings" | "set">) {
  const floor = settings.missingMode === "floor";
  return (
    <div className="allint-slider">
      <span>Not measured:</span>
      <select value={settings.missingMode} onChange={(e) => set({ missingMode: e.target.value as Settings["missingMode"] })}>
        <option value="skip">Skip it (score only what was tested)</option>
        <option value="floor">Count as a low score</option>
        <option value="estimate">Guess from its other scores</option>
      </select>
      <DivisorSlider value={settings.missingDivisor} disabled={!floor} onChange={(v) => set({ missingDivisor: v })} />
      <strong>{floor ? `${settings.missingDivisor.toFixed(1)}×` : settings.missingMode}</strong>
    </div>
  );
}

export function SettingsPanel({ settings, set, groupCount }: Props) {
  return (
    <div className="panel">
      <label className="allint-slider">
        <span>Real zero counts as worst score ÷</span>
        <DivisorSlider value={settings.zeroDivisor} onChange={(v) => set({ zeroDivisor: v })} />
        <strong>{settings.zeroDivisor.toFixed(1)}×</strong>
      </label>
      <MissingControl settings={settings} set={set} />
      <p className="allint-formula">
        Score = geometric mean of the {groupCount} group scores. Each group score is the geometric mean of its
        columns. Click a row to see its columns.
      </p>
    </div>
  );
}
