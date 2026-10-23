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

function Segmented<T>({ label, options, value, name, onPick }: { label: string; options: T[]; value: T; name: (o: T) => string; onPick: (o: T) => void }) {
  return (
    <div className="control-group">
      <span className="control-label">{label}</span>
      <div className="segmented">
        {options.map((o) => (
          <button type="button" key={name(o)} className={o === value ? "active" : ""} onClick={() => onPick(o)}>
            {name(o)}
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
  onTool: (t: ProjectionTool) => void;
  tapered: Tapered | null;
}

function ProjectionToolBox({ unit, f, tool, onTool, tapered }: ToolProps) {
  const last = tapered?.[tapered.length - 1];
  return (
    <div className="control-group">
      <span className="control-label">Projection tool</span>
      <div className="field-row">
        <label className="field">
          Loss per month ({unit})
          <input type="number" min="0" step="0.5" value={tool.lossInput} placeholder="e.g. 4" onChange={(e) => onTool({ ...tool, lossInput: e.target.value })} />
        </label>
        <label className="field">
          Show for (months)
          <input type="number" min="1" step="1" value={tool.months} onChange={(e) => onTool({ ...tool, months: e.target.value })} />
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

function LineToggles({ lines, onLines }: { lines: Lines; onLines: (l: Lines) => void }) {
  return (
    <div className="control-group control-wide">
      <span className="control-label">Lines</span>
      <div className="toggles">
        {LINE_LABELS.map(([key, label]) => (
          <label key={key} className="toggle">
            <input type="checkbox" checked={lines[key]} onChange={(e) => onLines({ ...lines, [key]: e.target.checked })} /> {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export interface ControlsProps extends ToolProps {
  onUnit: (u: Unit) => void;
  range: Range;
  onRange: (r: Range) => void;
  lines: Lines;
  onLines: (l: Lines) => void;
}

export function Controls(p: ControlsProps) {
  return (
    <div className="weight-controls">
      <Segmented label="Units" options={["lb", "kg"] as Unit[]} value={p.unit} name={(u) => u} onPick={p.onUnit} />
      <Segmented label="Chart range" options={RANGES} value={p.range} name={(r) => r.label} onPick={p.onRange} />
      <ProjectionToolBox unit={p.unit} f={p.f} tool={p.tool} onTool={p.onTool} tapered={p.tapered} />
      <LineToggles lines={p.lines} onLines={p.onLines} />
    </div>
  );
}
