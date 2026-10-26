import { useEffect, useState } from "react";
import { FULL_TURN_DEGREES, HALF_TURN_DEGREES } from "../logic/constants";

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
const DIAL_CENTER = SIZE / 2;
const DIAL_RADIUS = 62;
const START = 135; // degrees, clockwise from 3 o'clock; the gap sits at the bottom
const SWEEP = 270;

/** The knob and the value text on the dial, and how many decimals a snapped value keeps. */
const KNOB_RADIUS = 9;
const VALUE_BASELINE = 6;
const SNAP_DIGITS = 6;

/** Point on the dial's circle at the given angle, so the arc and the knob share one calculation. */
function point(degrees: number, radius = DIAL_RADIUS) {
  const radians = (degrees * Math.PI) / HALF_TURN_DEGREES;

  return { x: DIAL_CENTER + radius * Math.cos(radians), y: DIAL_CENTER + radius * Math.sin(radians) };
}

/** SVG path for the arc between two angles, drawn on the dial. */
function arcPath(fromDeg: number, toDeg: number) {
  const arcStart = point(fromDeg);
  const arcEnd = point(toDeg);
  const large = toDeg - fromDeg > HALF_TURN_DEGREES ? 1 : 0;

  return `M ${arcStart.x} ${arcStart.y} A ${DIAL_RADIUS} ${DIAL_RADIUS} 0 ${large} 1 ${arcEnd.x} ${arcEnd.y}`;
}

/** Slider with a number box and keyboard control; the value can be shown as text and snapped to allowed stops. */
export default function Slider({
  id: sliderId,
  label,
  description,
  value,
  min: minValue,
  max: maxValue,
  step = 1,
  display,
  low: lowLabel,
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

  const frac = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0;
  const knob = point(START + frac * SWEEP);

  // Turn a 0-1 position along the slider into a value snapped to the step size.
  const setFromFraction = (fraction: number) => {
    const rawValue = minValue + Math.min(1, Math.max(0, fraction)) * (maxValue - minValue);
    const snapped = Math.round((rawValue - minValue) / step) * step + minValue;
    onChange(Math.min(maxValue, Math.max(minValue, Number(snapped.toFixed(SNAP_DIGITS)))));
  };

  // Work out where on the dial the pointer is and set the value from it.
  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = event.clientX - (rect.left + rect.width / 2);
    const yPos = event.clientY - (rect.top + rect.height / 2);
    let degrees = (Math.atan2(yPos, xPos) * HALF_TURN_DEGREES) / Math.PI - START;
    degrees = ((degrees % FULL_TURN_DEGREES) + FULL_TURN_DEGREES) % FULL_TURN_DEGREES;

    // Inside the bottom gap: snap to whichever end is closer.
    if (degrees > SWEEP) degrees = degrees - SWEEP < (FULL_TURN_DEGREES - SWEEP) / 2 ? SWEEP : 0;
    setFromFraction(degrees / SWEEP);
  };

  // Arrow keys step by one, Home and End jump to the ends; anything else is left alone.
  const handleKey = (event: React.KeyboardEvent) => {
    let next = value;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = value + step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = value - step;
    else if (event.key === "Home") next = minValue;
    else if (event.key === "End") next = maxValue;
    else return;
    event.preventDefault();
    onChange(Math.min(maxValue, Math.max(minValue, next)));
  };

  return (
    <div className="panel">
      <div className="mini-row">
        <label id={`${sliderId}-label`}>{label}</label>
        <strong>{display}</strong>
      </div>
      {description && (
        <p className="muted mini-description">
          {description}
        </p>
      )}
      <svg
        id={sliderId}
        className="mini-dial"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="slider"
        tabIndex={0}
        aria-labelledby={`${sliderId}-label`}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
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
        <path className="mini-dial-track" d={arcPath(START, START + SWEEP)} />
        {frac > 0 && (
          <path className="mini-dial-fill" d={arcPath(START, START + frac * SWEEP)} />
        )}
        <circle className="mini-dial-knob" cx={knob.x} cy={knob.y} r={KNOB_RADIUS} />
        <text className="mini-dial-value" x={DIAL_CENTER} y={DIAL_CENTER + VALUE_BASELINE} textAnchor="middle">
          {display}
        </text>
      </svg>
      <div className="mini-ticks">
        <span>{lowLabel}</span>
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
                aria-labelledby={`${sliderId}-modal-title`}
                onClick={(event) => event.stopPropagation()}
              >
                <h3 id={`${sliderId}-modal-title`}>{label}</h3>
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
