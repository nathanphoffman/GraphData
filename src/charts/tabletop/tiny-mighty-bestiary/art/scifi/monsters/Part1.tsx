import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function OreMuncher() {
  return (
    <Drawing label="Drawing of a pink armored bug-lizard with feathery antennae nibbling an iron bar">
      <Shape d="M80 170 C70 120 150 100 220 110 C270 116 290 150 270 178 C220 190 120 192 80 170 Z" />
      <Line d="M110 120 V180 M150 112 V186 M190 110 V188 M230 114 V186" w={3} />
      <Shape d="M262 130 C266 100 300 88 330 100 L352 118 L324 138 C300 150 270 150 262 130 Z" />
      <Dot x={306} y={108} r={4} />
      <Line d="M290 92 C280 70 296 52 312 56 M300 90 C300 66 320 52 336 60" w={4} />
      <Line d="M296 56 l-8 -6 M296 56 l4 -10 M312 56 l8 -8 M312 56 l-2 -10" w={2} />
      <Shape d="M340 140 H392 V156 H340 Z" w={4} />
      <Line d="M110 178 L96 214 M160 184 L152 220 M220 184 L226 220 M262 176 L278 212" w={6} />
      <Line d="M80 150 C50 150 40 130 52 114" w={6} />
    </Drawing>
  );
}

export function PitGorger() {
  return (
    <Drawing label="Drawing of a bellowing long-armed brute in a dungeon pit, gripping the edge">
      <Shape d="M0 100 H110 V224 H0 Z M290 100 H400 V224 H290 Z" w={4} />
      <Line d="M110 110 V224 M290 110 V224" w={5} />
      <Line d="M10 130 H100 M10 160 H100 M300 130 H390 M300 160 H390" w={2} />
      <Shape d="M150 190 C130 140 150 100 200 98 C250 100 270 140 250 190 Z" />
      <Shape d="M168 90 C168 56 232 56 232 90 C232 116 168 116 168 90 Z" />
      <Dot x={186} y={80} r={4} />
      <Dot x={214} y={80} r={4} />
      <Shape d="M178 96 Q200 124 222 96 Z" w={3} />
      <Solid d="M184 98 l4 8 l4 -8 Z M208 98 l4 8 l4 -8 Z" />
      <Line d="M158 120 C110 110 90 70 100 40 M242 120 C290 110 310 70 300 40" w={12} />
      <Line d="M100 40 l-10 -10 M100 40 l0 -14 M100 40 l12 -10 M300 40 l-12 -10 M300 40 l0 -14 M300 40 l10 -10" w={4} />
      <Line d="M170 224 H230" w={3} dash="2 6" />
    </Drawing>
  );
}

export function SandMaw() {
  return (
    <Drawing label="Drawing of a tooth-ringed pit in the desert sand">
      <Line d="M10 150 C60 130 100 150 140 130 M260 130 C300 150 340 130 390 150" w={5} />
      <ellipse cx="200" cy="150" rx="120" ry="50" fill={card} {...ink} />
      <ellipse cx="200" cy="150" rx="84" ry="32" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="150" rx="40" ry="14" fill="currentColor" />
      {/* Teeth evenly spaced around the ellipse. */}
      {Array.from({ length: 14 }, (_unused, index) => {
        const a = (index / 14) * Math.PI * 2;
        const xPos = 200 + Math.cos(a) * 112;
        const yPos = 150 + Math.sin(a) * 42;
        const endX = 200 + Math.cos(a) * 84;
        const endY = 150 + Math.sin(a) * 32;

        return <path key={index} d={`M${xPos - 5} ${yPos} L${endX} ${endY} L${xPos + 5} ${yPos} Z`} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
      })}
      <Line d="M40 210 q20 -12 40 0 M300 214 q20 -12 40 0 M160 224 q20 -12 40 0" w={3} />
      <circle cx="340" cy="44" r="20" fill="none" {...ink} strokeWidth={3} />
      <Line d="M340 8 v8 M340 72 v8 M304 44 h8 M368 44 h8" w={3} />
    </Drawing>
  );
}

export function DuneWyrm() {
  return (
    <Drawing label="Drawing of a cliff-sized horned desert serpent rising from sand dunes, bones and pearls scattered below">
      <Line d="M10 200 C60 180 100 200 150 190 C220 176 280 200 390 190" w={5} />
      <Shape d="M40 224 C40 140 120 130 150 160 C180 190 230 160 240 100 C246 50 290 30 330 44 L376 66 L330 82 C310 100 300 140 290 170 C270 224 180 224 40 224 Z" />
      <Line d="M60 200 H260 M80 180 q40 10 80 0 q40 10 80 0" w={3} />
      <Shape d="M310 44 L300 8 L330 36 Z M334 50 L340 12 L350 54 Z" w={4} />
      <Dot x={322} y={60} r={4} />
      <Line d="M350 74 l-4 10 l-6 -8 M364 70 l-2 10" w={3} />
      <circle cx="80" cy="214" r="6" fill="none" {...ink} strokeWidth={2} />
      <circle cx="104" cy="218" r="5" fill="none" {...ink} strokeWidth={2} />
      <Line d="M330 210 h28 M334 210 l-4 -8 M354 210 l4 -8" w={3} />
    </Drawing>
  );
}

export function SlugLord() {
  return (
    <Drawing label="Drawing of a massive slug-bodied crime boss lounging on a dais with a pipe, guards on either side">
      <Shape d="M60 190 H340 V224 H60 Z" w={4} />
      <Shape d="M80 190 C60 130 120 100 200 104 C280 108 340 130 330 190 Z" />
      <Shape d="M290 130 C290 80 340 70 356 100 C372 130 340 160 310 156 Z" />
      <Line d="M300 80 L290 44 M336 76 L346 42" w={5} />
      <circle cx="290" cy="42" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="346" cy="40" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={290} y={42} r={2} />
      <Dot x={346} y={40} r={2} />
      <Line d="M316 126 q14 10 30 -2" w={4} />
      <Line d="M340 134 L370 150 M366 150 l10 -8 l6 8 Z" w={4} />
      <Line d="M110 130 q20 -10 40 0 M170 120 q20 -10 40 0 M230 124 q20 -10 40 0" w={3} />
      <Shape d="M20 120 H50 V190 H20 Z" w={4} />
      <Shape d="M24 90 C24 66 48 66 48 90 V120 H24 Z" w={3} />
      <Line d="M130 190 q-4 10 -14 14 M190 190 q4 12 -4 20 M250 190 q0 14 -10 20" w={3} />
    </Drawing>
  );
}
