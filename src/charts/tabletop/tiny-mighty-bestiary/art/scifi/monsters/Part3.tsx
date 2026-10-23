import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function DuneGullet() {
  return (
    <Drawing label="Drawing of a huge sandy pit lined with teeth and one patient tentacle reaching out">
      <Line d="M10 150 C60 130 100 150 140 130 M260 130 C300 150 340 130 390 150" w={5} />
      <ellipse cx="200" cy="154" rx="130" ry="58" fill={card} {...ink} />
      <ellipse cx="200" cy="154" rx="96" ry="38" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="154" rx="50" ry="18" fill="currentColor" />
      {/* Teeth evenly spaced around the ellipse. */}
      {Array.from({ length: 18 }, (_unused, index) => {
        const a = (index / 18) * Math.PI * 2;
        const xPos = 200 + Math.cos(a) * 124;
        const yPos = 154 + Math.sin(a) * 52;
        const endX = 200 + Math.cos(a) * 96;
        const endY = 154 + Math.sin(a) * 38;

        return <path key={index} d={`M${xPos - 5} ${yPos} L${endX} ${endY} L${xPos + 5} ${yPos} Z`} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
      })}
      <Line d="M200 140 C200 100 240 90 240 50 C240 30 260 20 276 28" w={12} />
      <Line d="M200 140 C200 100 240 90 240 50 C240 30 260 20 276 28" w={6} />
      <circle cx="280" cy="30" r="6" fill={card} {...ink} strokeWidth={3} />
      <Line d="M60 214 q20 -12 40 0 M300 218 q20 -12 40 0" w={3} />
    </Drawing>
  );
}

export function SlugBoss() {
  return (
    <Drawing label="Drawing of a very large sticky crime lord slug on a throne of stolen cushions">
      <Shape d="M60 180 C40 120 100 100 140 120 L140 200 H60 Z" w={5} />
      <Shape d="M260 200 H360 V120 C320 100 270 120 260 150 Z" w={5} />
      <Shape d="M100 210 H300 V228 H100 Z" w={4} />
      <Shape d="M110 200 C90 130 150 96 220 100 C280 104 310 140 300 200 Z" />
      <Shape d="M240 132 C240 94 290 86 304 116 C316 146 280 160 256 154 Z" />
      <Line d="M260 92 L250 62 M290 90 L300 60" w={4} />
      <circle cx="248" cy="58" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="302" cy="56" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={248} y={58} r={2} />
      <Dot x={302} y={56} r={2} />
      <Line d="M262 136 q14 10 28 0" w={4} />
      <Line d="M130 130 q20 -10 40 0 M190 120 q20 -10 40 0" w={3} />
      <Line d="M130 210 q-4 10 -10 12 M200 212 q2 10 -4 16 M270 210 q4 10 0 16" w={3} />
      <Line d="M100 80 l8 -10 l8 10 l-8 8 Z" w={3} />
    </Drawing>
  );
}

export function AsteroidLeviathan() {
  return (
    <Drawing label="Drawing of a mile-long worm tunneling through a field of asteroids toward a tiny ship">
      <circle cx="50" cy="50" r="30" fill={card} {...ink} strokeWidth={4} />
      <circle cx="350" cy="190" r="28" fill={card} {...ink} strokeWidth={4} />
      <circle cx="200" cy="30" r="14" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M0 130 C50 80 130 90 170 120 C210 150 250 130 280 100 L330 92 L376 120 L330 150 C290 170 240 200 180 190 C120 180 70 190 0 170 Z" />
      <Line d="M40 118 q10 24 0 44 M90 108 q10 28 0 56 M140 124 q8 24 -2 50 M200 150 q10 12 20 8" w={3} />
      <ellipse cx="336" cy="121" rx="34" ry="24" fill={card} {...ink} strokeWidth={4} />
      <Solid d="M310 110 l5 9 l5 -9 Z M324 106 l5 9 l5 -9 Z M312 132 l5 -9 l5 9 Z M328 134 l5 -9 l5 9 Z" />
      <Shape d="M366 30 L388 24 L396 30 L388 36 Z" w={3} />
      <circle cx="120" cy="206" r="8" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function VentCrawler() {
  return (
    <Drawing label="Drawing of a pale many-legged thing dropping out of an air duct onto a walkway">
      <Shape d="M120 20 H280 V60 H120 Z" w={5} />
      <Shape d="M140 60 H260 V72 H140 Z" w={4} />
      <Line d="M150 28 V52 M170 28 V52 M190 28 V52" w={3} />
      <Shape d="M150 100 C150 74 250 74 250 100 C250 124 150 124 150 100 Z" />
      <circle cx="184" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={96} r={2} />
      <Dot x={216} y={96} r={2} />
      <Line d="M160 100 L110 78 L80 110 L60 190 M168 108 L120 126 L96 170 L90 220 M240 100 L290 78 L320 110 L340 190 M232 108 L280 126 L304 170 L310 220 M180 118 L160 160 L150 220 M220 118 L240 160 L250 220" w={5} />
      <Line d="M190 112 H210 M194 108 V116 M200 108 V116 M206 108 V116" w={3} />
      <Line d="M20 226 H380" w={4} />
    </Drawing>
  );
}

export function HangarGrub() {
  return (
    <Drawing label="Drawing of a fat larva burrowing out of a cargo crate">
      <Shape d="M110 100 H310 V224 H110 Z" />
      <Line d="M110 130 H310 M110 160 H310 M110 190 H310 M210 100 V224" w={3} />
      <Line d="M150 100 L170 130 M260 130 L280 100" w={4} />
      <Shape d="M130 100 L150 70 L170 100 Z M270 100 L290 70 L310 100 Z" w={3} />
      <Shape d="M110 150 C80 130 80 90 110 80 C150 70 180 110 220 100 C260 90 290 70 320 90 C340 110 330 140 300 150 C260 160 200 140 160 160 C140 170 120 160 110 150 Z" />
      <Line d="M130 100 V150 M160 110 V156 M190 108 V148 M220 100 V146 M250 98 V150 M280 96 V146" w={3} />
      <Shape d="M300 82 C312 62 344 62 348 86 C348 104 316 108 304 96 Z" />
      <Dot x={330} y={80} r={4} />
      <Line d="M336 96 l6 4 M326 98 l2 6" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}
