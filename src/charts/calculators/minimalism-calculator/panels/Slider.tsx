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
  onChange: (value: number) => void;
}

const SIZE = 160;
const C = SIZE / 2;
const R = 62;
const START = 135; // degrees, clockwise from 3 o'clock; the gap sits at the bottom
const SWEEP = 270;

/** Point on the dial's circle at the given angle, so the arc and the knob share one calculation. */
function point(degrees: number, r = R) {
  const rad = (degrees * Math.PI) / 180;

  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

/** SVG path for the arc between two angles, drawn on the dial. */
function arc(fromDeg: number, toDeg: number) {
  const a = point(fromDeg);
  const b = point(toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;

  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y}`;
}

/** Slider with a number box and keyboard control; the value can be shown as text and snapped to allowed stops. */
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

  // Close the open slider popup when Escape is pressed, and stop listening once it is closed.
  useEffect(() => {
    if (!open) return;
    const onKey = (keyboardEvent: KeyboardEvent) => keyboardEvent.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const frac = max > min ? (value - min) / (max - min) : 0;
  const knob = point(START + frac * SWEEP);

  // Turn a 0-1 position along the slider into a value snapped to the step size.
  const setFromFraction = (f: number) => {
    const rawValue = min + Math.min(1, Math.max(0, f)) * (max - min);
    const snapped = Math.round((rawValue - min) / step) * step + min;
    onChange(Math.min(max, Math.max(min, Number(snapped.toFixed(6)))));
  };

  // Work out where on the dial the pointer is and set the value from it.
  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = event.clientX - (rect.left + rect.width / 2);
    const yPos = event.clientY - (rect.top + rect.height / 2);
    let degrees = (Math.atan2(yPos, xPos) * 180) / Math.PI - START;
    degrees = ((degrees % 360) + 360) % 360;

    // Inside the bottom gap: snap to whichever end is closer.
    if (degrees > SWEEP) degrees = degrees - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0;
    setFromFraction(degrees / SWEEP);
  };

  // Arrow keys step by one, Home and End jump to the ends; anything else is left alone.
  const handleKey = (event: React.KeyboardEvent) => {
    let next = value;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = value + step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = value - step;
    else if (event.key === "Home") next = min;
    else if (event.key === "End") next = max;
    else return;
    event.preventDefault();
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

        // Capture the pointer so the dial keeps following a drag outside its edge.
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          handlePointer(event);
        }}

        // Only react to moves while dragging, not to plain hovering.
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) handlePointer(event);
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
                onClick={(event) => event.stopPropagation()}
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
