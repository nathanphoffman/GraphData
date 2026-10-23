import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function GrotGobbler() {
  return (
    <Drawing label="Drawing of a fat dopey creature that swallows anything shiny and burps up a grenade">
      <Shape d="M90 190 C60 120 140 70 200 76 C270 82 330 130 310 190 Z" />
      <Shape d="M240 100 C240 76 290 76 292 100 C294 126 244 130 240 100 Z" />
      <Dot x={262} y={92} r={5} />
      <Dot x={278} y={94} r={5} />
      <Shape d="M246 112 Q268 140 290 112 Z" w={4} />
      <Shape d="M262 116 h12 v10 h-12 Z" w={3} />
      <Line d="M300 112 C330 100 340 70 360 66" w={4} dash="3 4" />
      <circle cx="366" cy="60" r="10" fill={card} {...ink} strokeWidth={4} />
      <Line d="M366 50 V42" w={3} />
      <Line d="M130 150 q30 20 70 0" w={3} />
      <Shape d="M150 110 a8 8 0 1 0 0.1 0 Z M180 130 a6 6 0 1 0 0.1 0 Z" w={3} />
      <Line d="M110 190 V224 M170 194 V224 M250 194 V224 M290 190 V224" w={11} />
      <Line d="M80 100 q-10 -10 -4 -22" w={3} dash="2 4" />
    </Drawing>
  );
}

export function SkyPikeBrood() {
  return (
    <Drawing label="Drawing of a flock of armored sky-fish bred to pierce hulls, trailing a mother larger than a gunship">
      <Shape d="M20 100 C60 40 220 30 300 80 L384 110 L300 140 C220 190 60 170 20 100 Z" />
      <Line d="M80 70 V130 M130 56 V146 M180 54 V150 M230 62 V142" w={3} />
      <Shape d="M300 80 L384 110 L300 140 Z" w={4} />
      <Dot x={270} y={92} r={5} />
      <Shape d="M120 50 L150 10 L170 56 Z M120 150 L150 190 L170 146 Z" w={4} />
      {/* Repeat the shape at each listed position and scale. */}
      {[[250, 190, 0.8], [310, 210, 0.6], [180, 214, 0.7]].map(([x, y, s], index) => (
        <g key={index} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-30 0 C-20 -14 20 -14 36 0 C20 14 -20 14 -30 0 Z" w={5} />
          <Line d="M36 0 L70 0" w={4} />
          <Shape d="M-30 0 L-46 -12 L-46 12 Z" w={4} />
          <Dot x={16} y={-3} r={2.5} />
        </g>
      ))}
    </Drawing>
  );
}

export function SmogDrake() {
  return (
    <Drawing label="Drawing of a pollution-black drake nesting in the exhaust vent of a mega-tower, wheezing toxic breath">
      <Shape d="M240 20 H390 V224 H240 Z" w={4} />
      {/* Evenly spaced horizontal lines. */}
      {Array.from({ length: 8 }, (_unused, index) => (
        <Line key={index} d={`M240 ${50 + index * 22} H390`} w={2} />
      ))}
      <Shape d="M250 130 H310 V170 H250 Z" w={4} />
      <Line d="M258 140 H302 M258 150 H302 M258 160 H302" w={2} />
      <Shape d="M60 150 C60 100 160 90 200 120 C230 140 250 150 280 140 L286 160 C240 180 190 176 150 170 C110 170 60 180 60 150 Z" />
      <Shape d="M110 114 C90 70 50 50 20 60 C40 80 40 100 50 120 Z" w={4} />
      <Shape d="M196 112 C200 80 240 70 270 84 L300 104 L250 118 Z" />
      <Dot x={256} y={92} r={4} />
      <Line d="M300 100 C330 90 350 70 380 76 M300 108 C330 108 350 100 386 110" w={9} dash="4 4" />
      <Line d="M100 170 V200 M150 172 V200" w={7} />
    </Drawing>
  );
}

export function GutterHag() {
  return (
    <Drawing label="Drawing of a hunched creature in the sewer dragging a passerby down a drain with a long arm">
      <Shape d="M0 150 H400 V230 H0 Z" w={4} />
      <ellipse cx="300" cy="150" rx="60" ry="12" fill={card} {...ink} strokeWidth={4} />
      <Line d="M250 150 H350" w={2} />
      <Shape d="M110 120 C80 70 150 40 190 70 C220 100 200 140 170 150 Z" />
      <Dot x={140} y={90} r={4} />
      <Dot x={166} y={92} r={4} />
      <Line d="M138 112 Q154 124 170 108" w={3} />
      <Line d="M120 56 C110 40 120 24 134 28 M180 54 C190 38 204 36 210 46" w={4} />
      <Shape d="M110 120 C100 170 130 200 170 190 C200 170 190 140 170 150 Z" w={5} />
      <Line d="M190 100 C230 100 270 120 300 140" w={9} />
      <Shape d="M290 120 l8 -10 l6 8 l6 -10 l6 12 Z" w={3} />
      <Shape d="M310 70 C306 54 330 54 330 70 V90 H310 Z" w={3} />
      <Line d="M316 90 V120 M326 90 V120" w={4} />
      <Line d="M20 190 q15 -8 30 0 t30 0 t30 0 t30 0" w={3} />
    </Drawing>
  );
}

export function ChromeGargoyle() {
  return (
    <Drawing label="Drawing of a polished chrome winged guard-beast diving off a corporate tower at an intruder">
      <Shape d="M300 140 H390 V224 H300 Z" w={4} />
      <Line d="M300 160 H390 M300 190 H390" w={2} />
      <Shape d="M180 100 C150 60 90 40 40 54 C70 72 76 96 70 120 C110 108 150 110 180 126 Z" />
      <Shape d="M220 100 C250 60 310 40 360 54 C330 72 324 96 330 120 C290 108 250 110 220 126 Z" />
      <Shape d="M176 80 C170 44 230 44 224 80 C230 108 170 108 176 80 Z" />
      <Shape d="M182 52 L170 24 L196 44 Z M218 52 L230 24 L204 44 Z" w={4} />
      <Dot x={190} y={74} r={4} />
      <Dot x={210} y={74} r={4} />
      <Solid d="M190 92 l4 8 l6 -6 l6 6 l4 -8 Z" />
      <Shape d="M176 108 H224 L216 170 H184 Z" />
      <Line d="M184 170 L164 204 L146 200 M216 170 L240 204 L258 200" w={7} />
      <Line d="M146 200 l-8 8 M258 200 l8 8" w={4} />
      <Line d="M110 180 l20 20 M280 120 l24 -6" w={3} dash="4 4" />
    </Drawing>
  );
}
