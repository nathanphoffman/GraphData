import type { Lines, ProjectionTool } from "../useProjections";
import type { Tapered } from "../model/chart";
import type { Format, Unit } from "../model/units";

export const RANGES = [
  { label: "All", days: Infinity },
  { label: "3 years", days: 1095 },
  { label: "1 year", days: 365 },
  { label: "90 days", days: 90 },
];

type Range = (typeof RANGES)[number];

/** Segmented buttons for picking one of a few options. */
function Segmented<T>({ label, options, value, name, onPick }: { label: string; options: T[]; value: T; name: (o: T) => string; onPick: (o: T) => void }) {
  return (
    <div className="control-group">
      <span className="control-label">{label}</span>
      <div className="segmented">
        {/* One button per choice; the current one is marked active. */}
        {options.map((option) => (
          <button type="button" key={name(option)} className={option === value ? "active" : ""} onClick={() => onPick(option)}>
            {name(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ToolProps {
  unit: Unit;
  f: Format;
  tool: ProjectionTool;
  onTool: (projectionTool: ProjectionTool) => void;
  tapered: Tapered | null;
}

/** Inputs for a projection from a monthly loss figure. */
function ProjectionToolBox({ unit, f, tool, onTool, tapered }: ToolProps) {
  const last = tapered?.[tapered.length - 1];

  return (
    <div className="control-group">
      <span className="control-label">Projection tool</span>
      <div className="field-row">
        <label className="field">
          Loss per month ({unit})
          <input type="number" min="0" step="0.5" value={tool.lossInput} placeholder="e.g. 4" onChange={(event) => onTool({ ...tool, lossInput: event.target.value })} />
        </label>
        <label className="field">
          Show for (months)
          <input type="number" min="1" step="1" value={tool.months} onChange={(event) => onTool({ ...tool, months: event.target.value })} />
        </label>
      </div>
      {last && (
        <span className="muted">
          In {tool.months} months: {f.w(last.weight)} {unit} ({f.w(last.adjusted)} {unit} muscle-adjusted)
        </span>
      )}
    </div>
  );
}

const LINE_LABELS: [keyof Lines, string][] = [
  ["quadratic", "Quadratic Projection"],
  ["general", "General Projection"],
  ["allTrend", "Future trend lines (all average projection)"],
  ["spread", "Best / worst range (last week)"],
];

/** Checkboxes for switching optional chart lines on and off. */
function LineToggles({ lines, onLines }: { lines: Lines; onLines: (lines: Lines) => void }) {
  return (
    <div className="control-group control-wide">
      <span className="control-label">Lines</span>
      <div className="toggles">
        {/* One checkbox per optional chart line. */}
        {LINE_LABELS.map(([key, label]) => (
          <label key={key} className="toggle">
            <input type="checkbox" checked={lines[key]} onChange={(event) => onLines({ ...lines, [key]: event.target.checked })} /> {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export interface FatRatio {
  enabled: boolean;
  value: string;
}

/** Switch and input for the fat:muscle growth ratio (lb of fat tolerated per lb of muscle gained). */
function FatRatioBox({ fatRatio, onFatRatio }: { fatRatio: FatRatio; onFatRatio: (fatRatio: FatRatio) => void }) {
  return (
    <div className="control-group">
      <span className="control-label">Fat:Muscle Growth Ratio</span>
      <div className="field-row">
        <label className="toggle">
          <input type="checkbox" checked={fatRatio.enabled} onChange={(event) => onFatRatio({ ...fatRatio, enabled: event.target.checked })} /> Enable
        </label>
        <label className="field">
          Ratio: {Number(fatRatio.value).toFixed(1)}x
          <input type="range" min="0" max="2" step="0.1" value={fatRatio.value} disabled={!fatRatio.enabled} onChange={(event) => onFatRatio({ ...fatRatio, value: event.target.value })} />
        </label>
      </div>
    </div>
  );
}

export interface ControlsProps extends ToolProps {
  fatRatio: FatRatio;
  onFatRatio: (fatRatio: FatRatio) => void;
  onUnit: (unit: Unit) => void;
  range: Range;
  onRange: (range: Range) => void;
  lines: Lines;
  onLines: (lines: Lines) => void;
}

/** All the controls above the chart. */
export function Controls(controlsProps: ControlsProps) {
  return (
    <div className="weight-controls">
      <Segmented label="Units" options={["lb", "kg"] as Unit[]} value={controlsProps.unit} name={(unit) => unit} onPick={controlsProps.onUnit} />
      <Segmented label="Chart range" options={RANGES} value={controlsProps.range} name={(r) => r.label} onPick={controlsProps.onRange} />
      <ProjectionToolBox unit={controlsProps.unit} f={controlsProps.f} tool={controlsProps.tool} onTool={controlsProps.onTool} tapered={controlsProps.tapered} />
      <FatRatioBox fatRatio={controlsProps.fatRatio} onFatRatio={controlsProps.onFatRatio} />
      <LineToggles lines={controlsProps.lines} onLines={controlsProps.onLines} />
    </div>
  );
}
