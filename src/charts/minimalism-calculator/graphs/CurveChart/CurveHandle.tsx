import type { PointerEvent } from "react";

const CURRENT_RING_RADIUS = 6;
const DRAG_RADIUS = 16;

interface Props {
  /** Where the ring sits, and the y of the axis the dashed line drops to. */
  x: number;
  y: number;
  axisY: number;
  onDragStart: () => void;
  onDragMove: (event: PointerEvent) => void;
  onDragEnd: () => void;
}

/** Your setting: a dashed line down to the axis and a ring you can drag. */
export default function CurveHandle({ x, y, axisY, onDragStart, onDragMove, onDragEnd }: Props) {
  return (
    <>
      <line x1={x} x2={x} y1={y} y2={axisY} stroke="var(--fg)" strokeDasharray="4 3" />
      <circle cx={x} cy={y} r={CURRENT_RING_RADIUS} fill="none" stroke="var(--fg)" strokeWidth={2} />
      <circle
        cx={x}
        cy={y}
        r={DRAG_RADIUS}
        fill="transparent"
        style={{ cursor: "grab", touchAction: "none" }}

        // Capture the pointer so the drag keeps working when the mouse leaves the chart.
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          onDragStart();
        }}

        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      />
    </>
  );
}
