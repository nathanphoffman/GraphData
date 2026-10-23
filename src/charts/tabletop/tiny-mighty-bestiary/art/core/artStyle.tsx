import type { ReactNode } from "react";

/** Shared line-art styling for the creature drawings. */
export const CARD_COLOR = "var(--b-card)";

export const ink = { stroke: "currentColor", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Open stroke, no fill. */
export const Line = ({ d, w = 5, dash }: { d: string; w?: number; dash?: string }) => (
  <path d={d} fill="none" {...ink} strokeWidth={w} strokeDasharray={dash} />
);

/** Outlined shape filled with the card color. */
export const Shape = ({ d, w = 5 }: { d: string; w?: number }) => (
  <path d={d} fill={CARD_COLOR} {...ink} strokeWidth={w} />
);

/** Solid ink shape. */
export const Solid = ({ d }: { d: string }) => <path d={d} fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />;

export const Dot = ({ x, y, r = 4 }: { x: number; y: number; r?: number }) => <circle cx={x} cy={y} r={r} fill="currentColor" />;

export const Ground = ({ y = 218, x1 = 20, x2 = 380 }: { y?: number; x1?: number; x2?: number }) => (
  <Line d={`M${x1} ${y} H${x2}`} w={3} dash="2 10" />
);

export const Drawing = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg viewBox="0 0 400 240" role="img" aria-label={label}>
    {children}
  </svg>
);

/** Evenly spaced strokes pointing out from a circle's edge, like gear teeth or sun rays. */
export const Spokes = ({ cx, cy, r, count, length, width, offset = 0 }: { cx: number; cy: number; r: number; count: number; length: number; width: number; offset?: number }) => (
  <>
    {/* One stroke per step around the circle. */}
    {Array.from({ length: count }, (_unused, index) => {
      const a = (index / count) * Math.PI * 2 + offset;

      return <path key={index} d={`M${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} l${Math.cos(a) * length} ${Math.sin(a) * length}`} stroke="currentColor" strokeWidth={width} strokeLinecap="round" />;
    })}
  </>
);
