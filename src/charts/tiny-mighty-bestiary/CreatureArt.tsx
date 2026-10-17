import type { ReactNode } from "react";

const ink = { stroke: "currentColor", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function GiantRat() {
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label="Drawing of a giant rat in profile">
      <g fill="none" {...ink}>
        <path d="M82 150 C40 150 28 110 52 92 C68 80 86 92 70 106" />
        <path d="M112 178 L100 208 L128 208" />
        <path d="M148 184 L144 208 L170 208" />
        <path d="M250 184 L254 208 L280 208" />
        <path d="M222 180 L212 208 L238 208" />
        <path d="M338 124 L384 108 M338 130 L386 130 M338 136 L382 152" />
      </g>
      <path
        d="M90 150 C90 100 170 82 230 94 C262 100 278 112 290 120 L330 126 C344 128 352 134 352 140 C352 148 340 152 326 152 L290 156 C274 186 220 194 170 190 C120 186 90 178 90 150 Z"
        fill="var(--b-card)"
        {...ink}
      />
      <ellipse cx="262" cy="98" rx="20" ry="24" fill="var(--b-card)" {...ink} />
      <ellipse cx="262" cy="100" rx="9" ry="13" fill="currentColor" />
      <circle cx="304" cy="124" r="6" fill="currentColor" />
      <circle cx="350" cy="138" r="6" fill="currentColor" />
      <path d="M326 152 L326 164 L336 164 L336 152" fill="var(--b-card)" {...ink} strokeWidth={4} />
      <path
        d="M140 112 l8 10 M170 104 l8 10 M200 104 l8 10 M130 140 l8 8 M160 150 l8 8"
        fill="none"
        {...ink}
        strokeWidth={3}
      />
      <path d="M20 214 H380" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 10" />
    </svg>
  );
}

/** Black and white line art keyed by creature id. Creatures without an entry show no art. */
const art: Record<string, () => ReactNode> = {
  "giant-rat": GiantRat,
};

export default function CreatureArt({ id }: { id: string }) {
  const Art = art[id];
  return Art ? (
    <div className="bestiary-art">
      <Art />
    </div>
  ) : null;
}
