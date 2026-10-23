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
