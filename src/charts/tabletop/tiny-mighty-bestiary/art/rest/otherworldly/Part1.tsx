import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

/** Ghostly hem: a wavy bottom edge for sheet-like spirits. */
export const ghostBody = (x0: number, x1: number, top: number, bottom: number) =>
  `M${x0} ${bottom} C${x0 - 10} ${top + 40} ${x0 + 10} ${top} ${(x0 + x1) / 2} ${top} C${x1 - 10} ${top} ${x1 + 10} ${top + 40} ${x1} ${bottom} q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 Z`;

export function WarpFiend() {
  return (
    <Drawing label="Drawing of a red horned fiend bleeding out of the warp from a pile of skulls">
      <Shape d="M60 224 C80 190 130 190 150 224 Z M140 224 C160 180 240 180 260 224 Z M250 224 C270 190 320 190 340 224 Z" w={4} />
      <circle cx="120" cy="206" r="6" fill="currentColor" />
      <circle cx="200" cy="200" r="7" fill="currentColor" />
      <circle cx="296" cy="206" r="6" fill="currentColor" />
      <Shape d="M170 78 C164 34 236 34 230 78 C236 102 164 102 170 78 Z" />
      <Shape d="M176 50 C160 30 150 14 158 4 C170 18 180 28 188 40 Z M224 50 C240 30 250 14 242 4 C230 18 220 28 212 40 Z" w={4} />
      <Line d="M184 68 L196 74 M216 68 L204 74" w={4} />
      <Shape d="M188 88 Q200 104 212 88 Z" w={3} />
      <Shape d="M144 108 H256 L270 186 H130 Z" />
      <Line d="M200 108 V186 M160 130 L200 150 L240 130" w={3} />
      <Line d="M150 116 L110 150 L120 180 M250 116 L290 150 L280 180" w={9} />
      <Line d="M170 186 L160 224 M230 186 L240 224" w={9} />
      <Line d="M80 80 C60 100 60 150 80 170 M320 80 C340 100 340 150 320 170" w={3} dash="3 5" />
    </Drawing>
  );
}

export function DreamEater() {
  return (
    <Drawing label="Drawing of a slender pale thing with too many limbs leaning over a sleeping figure">
      <Shape d="M20 190 H380 V224 H20 Z" w={4} />
      <Shape d="M60 160 H340 V190 H60 Z" w={4} />
      <Shape d="M80 130 C80 112 120 112 120 130 V160 H80 Z" w={4} />
      <Line d="M96 140 q6 4 12 0" w={2} />
      <Shape d="M150 70 C150 40 210 40 210 70 C210 92 150 92 150 70 Z" />
      <Dot x={168} y={66} r={3} />
      <Dot x={192} y={66} r={3} />
      <Line d="M168 80 H192" w={2} />
      <Shape d="M160 90 H200 L190 150 H170 Z" />
      <Line d="M164 98 L120 100 L84 126 M164 110 L110 124 L100 150 M168 124 L134 150 M196 98 L240 80 L270 100 M196 110 L250 110 L280 130 M192 124 L226 140" w={4} />
      <Line d="M170 150 L160 190 M190 150 L196 190" w={4} />
      <Line d="M280 60 q-14 14 -4 34 q12 12 30 4 M260 40 q-12 8 -10 22" w={3} dash="3 5" />
    </Drawing>
  );
}

export function WarpLord() {
  return (
    <Drawing label="Drawing of a towering horned and winged tyrant with a burning axe, seated before a throne of skulls">
      <Shape d="M120 224 V100 L150 60 L180 100 L200 50 L220 100 L250 60 L280 100 V224 Z" w={4} />
      <circle cx="150" cy="130" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="200" cy="120" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="250" cy="130" r="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M170 110 C130 80 80 60 30 70 C60 90 64 116 56 140 C100 130 140 134 170 150 Z" />
      <Shape d="M230 110 C270 80 320 60 370 70 C340 90 336 116 344 140 C300 130 260 134 230 150 Z" />
      <Shape d="M178 80 C172 40 228 40 222 80 C228 104 172 104 178 80 Z" />
      <Shape d="M184 54 C164 36 158 14 166 0 C178 14 188 30 194 44 Z M216 54 C236 36 242 14 234 0 C222 14 212 30 206 44 Z" w={4} />
      <Dot x={192} y={74} r={4} />
      <Dot x={208} y={74} r={4} />
      <Shape d="M168 112 H232 L240 190 H160 Z" />
      <Line d="M176 120 L130 140 M224 120 L270 100 L300 60" w={8} />
      <Line d="M300 60 L330 0" w={5} />
      <Shape d="M318 -6 C350 -6 366 20 340 30 L316 20 Z" w={4} />
      <Solid d="M326 14 C316 2 322 -8 330 -14 C334 -2 346 4 338 14 Z" />
    </Drawing>
  );
}

export function GhostInTheWire() {
  return (
    <Drawing label="Drawing of the leftover mind of a hacker as a face rippling along city power lines between two poles">
      <Line d="M20 40 V224 M380 40 V224" w={6} />
      <Line d="M10 60 H50 M350 60 H390" w={5} />
      <Line d="M30 60 C120 100 160 100 200 100 C240 100 280 100 370 60" w={4} />
      <Line d="M30 76 C120 120 160 124 200 124 C240 124 280 120 370 76" w={4} />
      <Shape d="M156 120 C152 68 248 68 244 120 C248 160 152 160 156 120 Z" />
      <Dot x={184} y={112} r={5} />
      <Dot x={216} y={112} r={5} />
      <Line d="M184 138 Q200 148 216 138" w={3} />
      <Line d="M160 100 l-20 -20 l14 -2 l-10 -18 M240 100 l20 -20 l-14 -2 l10 -18" w={3} />
      <Line d="M170 160 l-10 16 l10 -4 l-4 20 M230 160 l10 16 l-10 -4 l4 20" w={3} />
      <Line d="M60 160 q10 -10 20 0 M320 170 q10 -10 20 0" w={3} dash="2 4" />
    </Drawing>
  );
}

export function RiftWhisperer() {
  return (
    <Drawing label="Drawing of a tall shape leaking out of a tear in the sky, promising everyone what they most want">
      <path d="M200 0 L224 40 L196 70 L228 110 L190 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 0 L176 40 L204 70 L172 110 L210 140" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" />
      <Shape d="M176 140 C170 100 230 100 224 140 L232 224 H168 Z" />
      <Shape d="M184 120 C184 96 216 96 216 120 C216 138 184 138 184 120 Z" w={4} />
      <Line d="M170 150 L130 190 L116 224 M230 150 L270 190 L284 224" w={5} />
      <Line d="M130 190 l-10 -4 M130 190 l-6 10 M270 190 l10 -4 M270 190 l6 10" w={3} />
      <Line d="M60 200 q10 -14 20 0 M320 200 q10 -14 20 0" w={3} />
      <Line d="M70 190 v-20 M60 180 h20 M330 190 v-20 M320 180 h20" w={3} dash="2 4" />
      <Line d="M60 60 q10 -8 20 0 M330 80 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}
