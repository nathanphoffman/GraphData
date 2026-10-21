import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";

const card = "var(--b-card)";

function OreMuncher() {
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

function PitGorger() {
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

function SandMaw() {
  return (
    <Drawing label="Drawing of a tooth-ringed pit in the desert sand">
      <Line d="M10 150 C60 130 100 150 140 130 M260 130 C300 150 340 130 390 150" w={5} />
      <ellipse cx="200" cy="150" rx="120" ry="50" fill={card} {...ink} />
      <ellipse cx="200" cy="150" rx="84" ry="32" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="150" rx="40" ry="14" fill="currentColor" />
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 112;
        const y = 150 + Math.sin(a) * 42;
        const x2 = 200 + Math.cos(a) * 84;
        const y2 = 150 + Math.sin(a) * 32;
        return <path key={i} d={`M${x - 5} ${y} L${x2} ${y2} L${x + 5} ${y} Z`} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
      })}
      <Line d="M40 210 q20 -12 40 0 M300 214 q20 -12 40 0 M160 224 q20 -12 40 0" w={3} />
      <circle cx="340" cy="44" r="20" fill="none" {...ink} strokeWidth={3} />
      <Line d="M340 8 v8 M340 72 v8 M304 44 h8 M368 44 h8" w={3} />
    </Drawing>
  );
}

function DuneWyrm() {
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

function SlugLord() {
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

function VatHorror() {
  return (
    <Drawing label="Drawing of a lumpy mass of failed gene-splicing in a cracked tank, growing out of the glass">
      <Shape d="M110 30 H290 V200 H110 Z" w={4} />
      <Shape d="M100 200 H300 V224 H100 Z" w={4} />
      <Line d="M110 60 H290" w={2} />
      <Shape d="M130 200 C110 150 140 110 180 120 C200 80 260 90 260 130 C290 150 280 190 270 200 Z" />
      <circle cx="170" cy="150" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={150} r={4} />
      <circle cx="226" cy="120" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={226} y={122} r={5} />
      <circle cx="250" cy="170" r="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M190 170 Q210 196 230 170 Z" w={3} />
      <Line d="M290 130 C320 130 330 160 350 170 M290 160 C310 170 320 190 340 190" w={8} />
      <Line d="M270 90 L252 110 L262 130" w={3} />
      <Line d="M140 80 q4 10 0 20 M160 90 q4 8 0 16" w={2} dash="2 4" />
      <Line d="M40 130 H110 M40 150 H100 M290 60 H350" w={3} dash="4 6" />
    </Drawing>
  );
}

function HiveLurker() {
  return (
    <Drawing label="Drawing of a four-armed claw-fingered predator hanging from the ceiling of a vent">
      <Line d="M10 30 H390 M10 90 H390" w={6} />
      <Line d="M60 30 V90 M160 30 V90 M260 30 V90 M360 30 V90" w={3} />
      <Shape d="M150 100 C150 80 250 80 250 100 L240 130 H160 Z" />
      <Line d="M170 100 L120 40 M230 100 L280 40 M176 112 L100 80 M224 112 L300 80" w={5} />
      <Line d="M120 40 l-10 -6 M120 40 l4 -12 M280 40 l10 -6 M280 40 l-4 -12 M100 80 l-14 -4 M100 80 l-6 10 M300 80 l14 -4 M300 80 l6 10" w={3} />
      <Shape d="M168 130 C160 170 200 220 200 220 C200 220 240 170 232 130 Z" />
      <Dot x={188} y={108} r={0} />
      <Line d="M190 140 V150 M200 140 V156 M210 140 V150" w={3} />
      <Solid d="M180 130 l4 10 l4 -10 Z M196 132 l4 12 l4 -12 Z M212 130 l4 10 l4 -10 Z" />
      <Line d="M200 220 V234" w={3} />
    </Drawing>
  );
}

function RotColossus() {
  return (
    <Drawing label="Drawing of a bloated fly-ridden green giant with broken teeth and a swollen belly">
      <Shape d="M150 70 C140 20 260 20 250 70 C260 100 140 100 150 70 Z" />
      <Dot x={180} y={60} r={5} />
      <Dot x={222} y={56} r={4} />
      <Line d="M172 80 l8 -4 M220 80 l8 -6 M164 84 Q200 104 236 84" w={3} />
      <Solid d="M176 86 l4 8 l4 -8 Z M196 90 l4 8 l4 -8 Z M216 88 l4 8 l4 -8 Z" />
      <Shape d="M100 120 C80 190 130 224 200 224 C270 224 320 190 300 120 C260 100 140 100 100 120 Z" />
      <circle cx="170" cy="170" r="14" fill="none" {...ink} strokeWidth={3} />
      <circle cx="240" cy="150" r="10" fill="none" {...ink} strokeWidth={3} />
      <Line d="M110 130 L70 170 L80 210 M290 130 L330 170 L320 210" w={12} />
      <path d="M60 50 q4 -6 8 0 q-4 6 -8 0 Z M92 30 q4 -6 8 0 q-4 6 -8 0 Z M310 40 q4 -6 8 0 q-4 6 -8 0 Z M340 80 q4 -6 8 0 q-4 6 -8 0 Z M280 20 q4 -6 8 0 q-4 6 -8 0 Z" fill="currentColor" />
      <Line d="M64 66 q10 4 14 14 M316 56 q-10 4 -12 14" w={2} dash="2 4" />
    </Drawing>
  );
}

function VoidSerpent() {
  return (
    <Drawing label="Drawing of a kilometer-long rock-colored worm swallowing a small ship among asteroids">
      <Shape d="M10 190 C40 140 100 130 140 160 C180 190 220 170 250 130 C270 100 310 90 340 110 L384 120 L340 146 C310 164 280 180 260 200 C230 230 150 230 100 214 C60 204 30 214 10 190 Z" />
      <Line d="M60 160 q10 16 4 36 M110 150 q10 16 6 40 M170 174 q10 12 20 8 M230 150 q6 14 -2 28" w={3} />
      <ellipse cx="354" cy="122" rx="30" ry="22" fill={card} {...ink} strokeWidth={4} />
      <Solid d="M330 112 l5 8 l5 -8 Z M342 108 l5 8 l5 -8 Z M334 134 l5 -8 l5 8 Z M348 136 l5 -8 l5 8 Z" />
      <Shape d="M300 40 L330 32 L342 40 L330 48 Z" w={3} />
      <Line d="M290 40 H270 M296 52 H278" w={3} dash="3 4" />
      <circle cx="60" cy="60" r="12" fill={card} {...ink} strokeWidth={3} />
      <circle cx="140" cy="40" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="220" cy="70" r="14" fill={card} {...ink} strokeWidth={3} />
      <circle cx="60" cy="210" r="6" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function VoidSultan() {
  return (
    <Drawing label="Drawing of a masked ruler on a throne of bent starlight, with rays curving around him">
      <Line d="M200 120 C160 60 100 40 40 50 M200 120 C240 60 300 40 360 50 M200 120 C150 100 90 110 30 140 M200 120 C250 100 310 110 370 140" w={4} />
      <Line d="M200 120 C170 160 130 190 70 200 M200 120 C230 160 270 190 330 200" w={3} />
      <Shape d="M168 86 C160 30 240 30 232 86 C238 110 162 110 168 86 Z" />
      <Line d="M180 70 H196 M204 70 H220" w={5} />
      <Line d="M200 36 V12 M184 38 L170 18 M216 38 L230 18" w={4} />
      <Line d="M190 94 H210 M200 86 V100" w={3} />
      <Shape d="M150 118 H250 L284 224 H116 Z" />
      <Line d="M200 118 V224 M170 150 L230 150" w={3} />
      <Line d="M150 126 L124 160 L156 176 M250 126 L276 160 L244 176" w={7} />
      <Dot x={50} y={80} r={3} />
      <Dot x={360} y={90} r={3} />
      <Dot x={340} y={30} r={2} />
      <Dot x={60} y={30} r={2} />
    </Drawing>
  );
}

function DuneGullet() {
  return (
    <Drawing label="Drawing of a huge sandy pit lined with teeth and one patient tentacle reaching out">
      <Line d="M10 150 C60 130 100 150 140 130 M260 130 C300 150 340 130 390 150" w={5} />
      <ellipse cx="200" cy="154" rx="130" ry="58" fill={card} {...ink} />
      <ellipse cx="200" cy="154" rx="96" ry="38" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="154" rx="50" ry="18" fill="currentColor" />
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const x = 200 + Math.cos(a) * 124;
        const y = 154 + Math.sin(a) * 52;
        const x2 = 200 + Math.cos(a) * 96;
        const y2 = 154 + Math.sin(a) * 38;
        return <path key={i} d={`M${x - 5} ${y} L${x2} ${y2} L${x + 5} ${y} Z`} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />;
      })}
      <Line d="M200 140 C200 100 240 90 240 50 C240 30 260 20 276 28" w={12} />
      <Line d="M200 140 C200 100 240 90 240 50 C240 30 260 20 276 28" w={6} />
      <circle cx="280" cy="30" r="6" fill={card} {...ink} strokeWidth={3} />
      <Line d="M60 214 q20 -12 40 0 M300 218 q20 -12 40 0" w={3} />
    </Drawing>
  );
}

function SlugBoss() {
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

function AsteroidLeviathan() {
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

function VentCrawler() {
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

function HangarGrub() {
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

function AsteroidDevourer() {
  return (
    <Drawing label="Drawing of a stone-crunching worm the size of a cruiser biting through an asteroid">
      <Shape d="M30 70 L110 40 L190 60 L220 120 L180 190 L90 200 L30 150 Z" />
      <Line d="M70 80 l30 10 M130 110 l-20 20 M60 140 l30 -6" w={3} />
      <Shape d="M190 110 C240 90 310 90 360 120 C390 140 380 190 330 200 C280 210 230 190 190 160 Z" />
      <Line d="M240 100 q10 30 0 80 M290 96 q10 34 0 90" w={3} />
      <ellipse cx="190" cy="136" rx="20" ry="32" fill={card} {...ink} strokeWidth={4} />
      <Solid d="M178 112 l10 4 l-10 4 Z M178 128 l10 4 l-10 4 Z M178 144 l10 4 l-10 4 Z M200 112 l-10 4 l10 4 Z M200 128 l-10 4 l10 4 Z" />
      <Line d="M150 190 l-10 12 M120 70 l-8 -12 M160 60 l8 -14" w={3} />
      <circle cx="350" cy="50" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="70" cy="214" r="8" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function NovaSlug() {
  return (
    <Drawing label="Drawing of a bloated glowing slug in a nebula cloud eating a power cell">
      <Line d="M20 60 q16 -16 32 0 q16 -16 32 0 M300 40 q16 -16 32 0 q16 -16 32 0 M40 210 q16 -16 32 0 q16 -16 32 0 M300 210 q16 -16 32 0 q16 -16 32 0" w={3} dash="3 6" />
      <Shape d="M60 190 C40 130 120 90 210 100 C290 110 330 150 310 190 Z" />
      <Shape d="M270 130 C270 96 316 88 332 116 C346 142 316 158 292 152 Z" />
      <Line d="M290 92 L280 62 M316 92 L328 64" w={4} />
      <circle cx="280" cy="58" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="328" cy="60" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={280} y={58} r={2} />
      <Dot x={328} y={60} r={2} />
      <Line d="M290 134 q12 8 24 0" w={3} />
      <Shape d="M330 160 H370 V190 H330 Z" w={4} />
      <Line d="M340 160 V150 H360 V160 M342 176 H358" w={3} />
      <Line d="M100 130 q12 -10 24 0 M150 120 q12 -10 24 0 M200 126 q12 -10 24 0" w={3} />
      <Line d="M60 190 C40 196 30 210 20 214" w={5} />
      <Line d="M100 80 l-8 -14 M150 70 l-2 -16 M210 74 l4 -14 M260 86 l10 -12" w={3} />
    </Drawing>
  );
}

function VacuumLurker() {
  return (
    <Drawing label="Drawing of a pale boneless thing clinging to the outside of a space station and sliding in through an airlock seal">
      <Shape d="M0 120 H400 V224 H0 Z" w={5} />
      <Line d="M40 120 V224 M120 120 V224 M280 120 V224 M360 120 V224" w={3} />
      <Shape d="M160 150 H240 V224 H160 Z" w={4} />
      <Line d="M200 150 V224" w={3} />
      <Line d="M170 140 L230 140" w={3} />
      <Shape d="M130 120 C110 90 130 50 170 50 C210 50 240 80 230 120 Z" />
      <Dot x={158} y={80} r={4} />
      <Dot x={192} y={78} r={4} />
      <Line d="M150 100 Q175 112 200 100" w={3} />
      <Line d="M230 118 C270 100 290 60 340 60 M130 120 C100 110 70 80 40 90 M200 120 C210 150 200 160 206 190" w={9} />
      <Line d="M340 60 l14 -6 M40 90 l-14 -6" w={4} />
      <Dot x={60} y={30} r={2} />
      <Dot x={340} y={24} r={2} />
      <Dot x={290} y={36} r={2} />
    </Drawing>
  );
}

function UploadGhost() {
  return (
    <Drawing label="Drawing of a half-corrupted face living in the wiring inside a wall, with glitching pixels">
      <Shape d="M40 30 H360 V210 H40 Z" w={4} />
      <Line d="M40 70 H360 M40 110 H360 M40 150 H360" w={2} dash="3 8" />
      <Line d="M80 30 V210 M320 30 V210" w={5} />
      <Shape d="M150 70 C150 40 250 40 250 70 C260 110 240 150 200 156 C160 150 140 110 150 70 Z" />
      <path d="M200 44 L250 70 C260 110 240 150 200 156 Z" fill={card} stroke="currentColor" strokeWidth="3" strokeDasharray="3 4" />
      <circle cx="178" cy="84" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={178} y={84} r={3} />
      <Shape d="M214 76 H240 V92 H214 Z" w={3} />
      <Line d="M180 120 Q200 130 224 118" w={4} />
      <Line d="M170 156 C170 180 150 190 120 200 M230 156 C230 180 250 190 280 200" w={5} />
      <Shape d="M240 100 H264 V110 H240 Z M250 124 H278 V132 H250 Z M130 100 H148 V108 H130 Z" w={2} />
    </Drawing>
  );
}

function StaticSprite() {
  return (
    <Drawing label="Drawing of a crackling blue wisp leaking out of an old comm panel">
      <Shape d="M20 150 H220 V224 H20 Z" w={5} />
      <circle cx="60" cy="186" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="110" cy="186" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 170 H200 M150 186 H200 M150 202 H190" w={3} />
      <Line d="M140 150 V120" w={4} />
      <Line d="M120 120 l20 0 l-4 12 Z" w={3} />
      <Shape d="M240 100 C230 60 270 30 300 50 C330 70 320 100 300 110 C320 130 290 160 270 140 C260 130 250 120 240 100 Z" />
      <Dot x={274} y={78} r={4} />
      <Dot x={296} y={86} r={4} />
      <Line d="M270 100 q10 8 20 0" w={3} />
      <Line d="M240 100 l-20 -14 l12 -2 l-16 -18 M300 50 l12 -22 l-4 12 l20 -6 M320 100 l26 4 l-14 8 l22 14" w={3} />
      <Line d="M190 150 C220 130 230 120 244 110" w={4} dash="2 5" />
    </Drawing>
  );
}

function HangarHaunt() {
  return (
    <Drawing label="Drawing of the flickering echo of a dead pilot running pre-flight checks on a wrecked fighter">
      <Shape d="M60 190 L130 160 L300 150 L370 176 L300 190 Z" />
      <Shape d="M150 160 L160 100 L200 150 Z M280 150 L290 110 L310 148 Z" w={4} />
      <Line d="M300 150 L340 140" w={4} />
      <Line d="M110 180 l-20 18 M200 188 l-6 24 M290 190 l10 20" w={5} />
      <Line d="M170 180 l14 20 l-16 4 M240 186 l12 16" w={3} />
      <path d="M170 84 C170 30 240 30 240 84 L246 130 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -26 0 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="4 7" strokeLinecap="round" />
      <Dot x={190} y={72} r={4} />
      <Dot x={216} y={72} r={4} />
      <Line d="M176 56 q30 -20 60 0" w={4} />
      <Line d="M240 100 L270 90" w={4} dash="3 5" />
      <Shape d="M268 80 H296 V98 H268 Z" w={3} />
      <Line d="M274 88 h16" w={2} />
      <Ground y={226} />
    </Drawing>
  );
}

function StarOracle() {
  return (
    <Drawing label="Drawing of a robed figure of living starlight with a halo of stars seeing ahead">
      <Shape d="M150 100 H250 L284 224 H116 Z" />
      <Shape d="M168 70 C160 24 240 24 232 70 C238 98 162 98 168 70 Z" />
      <circle cx="188" cy="66" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="212" cy="66" r="8" fill="none" {...ink} strokeWidth={3} />
      <Dot x={188} y={66} r={3} />
      <Dot x={212} y={66} r={3} />
      <Line d="M190 86 H210" w={3} />
      <Line d="M158 110 L110 80 M242 110 L290 80" w={6} />
      <circle cx="104" cy="74" r="14" fill={card} {...ink} strokeWidth={3} />
      <circle cx="296" cy="74" r="14" fill={card} {...ink} strokeWidth={3} />
      <Line d="M104 66 v16 M96 74 h16 M296 66 v16 M288 74 h16" w={2} />
      <Solid d="M200 150 l6 14 l14 2 l-10 10 l3 14 l-13 -7 l-13 7 l3 -14 l-10 -10 l14 -2 Z" />
      <Line d="M60 40 v14 M53 47 h14 M340 36 v14 M333 43 h14 M180 10 v10 M175 15 h10 M230 14 v10 M225 19 h10 M30 130 v10 M25 135 h10 M370 150 v10 M365 155 h10" w={3} />
    </Drawing>
  );
}

function VoidWhisperer() {
  return (
    <Drawing label="Drawing of two soldiers turning on each other as a faint voice curls around them from the dark">
      <Line d="M150 20 C190 40 130 70 180 90 C220 106 160 130 200 150" w={3} dash="3 5" />
      <Line d="M250 30 C210 50 270 80 220 100" w={3} dash="3 5" />
      <Shape d="M70 80 C66 44 124 44 120 80 L116 96 H74 Z" />
      <Line d="M78 70 H112" w={4} />
      <Shape d="M60 100 H130 L140 200 H50 Z" />
      <Line d="M130 120 L180 140" w={8} />
      <Shape d="M176 130 H220 V148 H176 Z" w={4} />
      <Shape d="M330 80 C334 44 276 44 280 80 L284 96 H326 Z" />
      <Line d="M322 70 H288" w={4} />
      <Shape d="M340 100 H270 L260 200 H350 Z" />
      <Line d="M270 120 L240 140" w={8} />
      <Shape d="M180 150 H224 V166 H180 Z" w={4} />
      <Line d="M70 200 V226 M110 200 V226 M290 200 V226 M330 200 V226" w={7} />
      <Dot x={90} y={74} r={0} />
      <Line d="M40 40 v10 M35 45 h10 M360 30 v10 M355 35 h10" w={3} />
    </Drawing>
  );
}

function NebulaPhantom() {
  return (
    <Drawing label="Drawing of a drifting shape of gas and light wrapping around a ship and draining its power cells">
      <Shape d="M130 130 L170 116 H250 L290 130 L250 144 H170 Z" />
      <Shape d="M190 116 L200 90 H224 L234 116 Z" w={4} />
      <Line d="M130 130 H110 M290 130 H320" w={4} />
      <path d="M40 90 C60 30 160 20 220 50 C300 20 360 60 350 120 C380 170 320 210 260 190 C220 220 140 220 100 190 C40 180 20 130 40 90 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="10 6" strokeLinecap="round" />
      <path d="M90 100 C100 70 160 60 200 80 M210 170 C250 190 300 170 310 140" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" />
      <circle cx="120" cy="70" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="154" cy="62" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={120} y={70} r={3} />
      <Dot x={154} y={62} r={3} />
      <Shape d="M240 120 H262 V138 H240 Z" w={3} />
      <Line d="M262 129 H290" w={3} dash="3 3" />
    </Drawing>
  );
}

function CometSprite() {
  return (
    <Drawing label="Drawing of a giggling spark of light riding in the exhaust of a starfighter and tickling the pilot">
      <Shape d="M40 150 L120 134 L260 130 L330 150 L260 168 L120 166 Z" />
      <Shape d="M150 134 L160 96 L200 130 Z M150 166 L160 204 L200 170 Z" w={4} />
      <Shape d="M240 130 C240 114 270 112 276 130 Z" w={4} />
      <Line d="M40 150 H10 M44 140 H14 M44 160 H14" w={4} dash="6 5" />
      <circle cx="60" cy="150" r="20" fill={card} {...ink} strokeWidth={4} />
      <path d="M50 150 l-30 -30 l24 14 l-4 -26 l18 22 l12 -22 l4 26 l22 -14 l-12 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <Dot x={54} y={146} r={2} />
      <Dot x={66} y={146} r={2} />
      <Line d="M54 156 Q60 162 68 156" w={2} />
      <Line d="M260 124 q10 -20 30 -22 M276 120 q14 -14 30 -12" w={3} dash="2 5" />
      <Line d="M300 60 v10 M295 65 h10 M360 110 v8 M356 114 h8 M180 40 v8 M176 44 h8" w={3} />
    </Drawing>
  );
}

function WillOWire() {
  return (
    <Drawing label="Drawing of a drifting ball of blue static in a dark research station corridor, leading the lost on">
      <Line d="M10 30 H390 M10 210 H390" w={6} />
      <Line d="M60 30 V210 M340 30 V210" w={4} />
      <Shape d="M60 70 H110 V160 H60 Z M290 70 H340 V160 H290 Z" w={4} />
      <Line d="M70 90 H100 M70 110 H100 M300 90 H330 M300 110 H330" w={2} />
      <circle cx="200" cy="110" r="30" fill={card} {...ink} />
      <circle cx="200" cy="110" r="14" fill="currentColor" />
      <Line d="M200 70 l-8 -20 M230 82 l16 -14 M240 110 l22 0 M230 138 l16 14 M200 150 l8 22 M170 138 l-16 14 M160 110 l-22 0 M170 82 l-16 -14" w={3} />
      <Line d="M200 150 C190 180 210 190 200 210" w={3} dash="2 5" />
      <Line d="M260 200 q10 -10 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function VoidBride() {
  return (
    <Drawing label="Drawing of a pale veiled figure riding a derelict ship, calling out to a missing crew">
      <Shape d="M20 190 L90 170 L370 160 L390 190 L370 214 L90 214 Z" />
      <Line d="M110 180 H350 M110 200 H350" w={3} />
      <circle cx="150" cy="190" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="190" cy="190" r="7" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M168 88 C160 40 240 40 232 88 L226 110 H174 Z" />
      <Shape d="M150 96 C150 80 170 60 200 60 C230 60 250 80 250 96 C260 150 270 160 290 168 L110 168 C130 160 140 150 150 96 Z" w={4} />
      <Line d="M180 90 H220" w={3} />
      <Dot x={188} y={86} r={2} />
      <Dot x={212} y={86} r={2} />
      <Line d="M200 168 V110" w={2} />
      <Line d="M240 120 L290 100 L300 80" w={5} />
      <Line d="M300 80 l6 -10 M300 80 l-2 -12 M300 80 l-10 -4" w={3} />
      <Line d="M300 40 q10 -12 22 -4 M326 30 q14 -12 28 -4" w={3} dash="2 5" />
      <Dot x={60} y={50} r={2} />
      <Dot x={340} y={90} r={2} />
      <Dot x={30} y={120} r={2} />
    </Drawing>
  );
}

export const sciFiMonstersArt: Record<string, () => ReactNode> = {
  "ore-muncher": OreMuncher,
  "pit-gorger": PitGorger,
  "sand-maw": SandMaw,
  "dune-wyrm": DuneWyrm,
  "slug-lord": SlugLord,
  "vat-horror": VatHorror,
  "hive-lurker": HiveLurker,
  "rot-colossus": RotColossus,
  "void-serpent": VoidSerpent,
  "void-sultan": VoidSultan,
  "dune-gullet": DuneGullet,
  "slug-boss": SlugBoss,
  "asteroid-leviathan": AsteroidLeviathan,
  "vent-crawler": VentCrawler,
  "hangar-grub": HangarGrub,
  "asteroid-devourer": AsteroidDevourer,
  "nova-slug": NovaSlug,
  "vacuum-lurker": VacuumLurker,
  "upload-ghost": UploadGhost,
  "static-sprite": StaticSprite,
  "hangar-haunt": HangarHaunt,
  "star-oracle": StarOracle,
  "void-whisperer": VoidWhisperer,
  "nebula-phantom": NebulaPhantom,
  "comet-sprite": CometSprite,
  "will-o-wire": WillOWire,
  "void-bride": VoidBride,
};
