import { useEffect, useState } from "react";

interface SliderProps {
  id: string;
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  low: string;
  high: string;
  learnMore?: string;
  onChange: (v: number) => void;
}

const SIZE = 160;
const C = SIZE / 2;
const R = 62;
const START = 135; // degrees, clockwise from 3 o'clock; the gap sits at the bottom
const SWEEP = 270;

function point(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arc(fromDeg: number, toDeg: number) {
  const a = point(fromDeg);
  const b = point(toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y}`;
}

export default function Slider({
  id,
  label,
  description,
  value,
  min,
  max,
  step = 1,
  display,
  low,
  high,
  learnMore,
  onChange,
}: SliderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const frac = max > min ? (value - min) / (max - min) : 0;
  const knob = point(START + frac * SWEEP);

  const setFromFraction = (f: number) => {
    const raw = min + Math.min(1, Math.max(0, f)) * (max - min);
    const snapped = Math.round((raw - min) / step) * step + min;
    onChange(Math.min(max, Math.max(min, Number(snapped.toFixed(6)))));
  };

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    let deg = (Math.atan2(y, x) * 180) / Math.PI - START;
    deg = ((deg % 360) + 360) % 360;
    // Inside the bottom gap: snap to whichever end is closer.
    if (deg > SWEEP) deg = deg - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0;
    setFromFraction(deg / SWEEP);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    let next = value;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = value + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = value - step;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    else return;
    e.preventDefault();
    onChange(Math.min(max, Math.max(min, next)));
  };

  return (
    <div className="panel">
      <div className="mini-row">
        <label id={`${id}-label`}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && (
        <p className="muted mini-description">
          {description}
        </p>
      )}
      <svg
        id={id}
        className="mini-dial"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="slider"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={display}
        onKeyDown={handleKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) handlePointer(e);
        }}
      >
        <path className="mini-dial-track" d={arc(START, START + SWEEP)} />
        {frac > 0 && (
          <path className="mini-dial-fill" d={arc(START, START + frac * SWEEP)} />
        )}
        <circle className="mini-dial-knob" cx={knob.x} cy={knob.y} r={9} />
        <text className="mini-dial-value" x={C} y={C + 6} textAnchor="middle">
          {display}
        </text>
      </svg>
      <div className="mini-ticks">
        <span>{low}</span>
        <span>{high}</span>
      </div>
      {learnMore && (
        <>
          <button type="button" className="mini-learn" onClick={() => setOpen(true)}>
            Learn more
          </button>
          {open && (
            <div className="mini-modal-backdrop" onClick={() => setOpen(false)}>
              <div
                className="mini-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-modal-title`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 id={`${id}-modal-title`}>{label}</h3>
                <p>{learnMore}</p>
                <button type="button" className="mini-learn" autoFocus onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
