import { Dot, Drawing, Ground, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function NoodleCartBot() {
  return (
    <Drawing label="Drawing of a rolling noodle cart with a mechanical arm holding a steaming bowl, under a neon sign">
      <Shape d="M90 130 H300 V200 H90 Z" />
      <Shape d="M80 110 H310 L296 130 H94 Z" w={4} />
      <Line d="M110 110 V80 H280 V110" w={5} />
      <Shape d="M170 40 H250 V70 H170 Z" w={4} />
      <Line d="M180 56 H240" w={3} />
      <circle cx="130" cy="212" r="16" fill={card} {...ink} strokeWidth={4} />
      <circle cx="260" cy="212" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M300 150 L340 130 L350 100" w={6} />
      <Shape d="M334 84 H370 L364 104 H340 Z" w={4} />
      <Line d="M342 78 q-4 -8 4 -12 M356 78 q-4 -8 4 -12" w={3} dash="2 4" />
      <circle cx="190" cy="160" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M176 156 q14 -10 28 0 M176 166 q14 -10 28 0" w={2} />
      <Dot x={240} y={160} r={5} />
      <Line d="M160 100 V110 M230 100 V110" w={3} />
    </Drawing>
  );
}

export function ClankWalker() {
  return (
    <Drawing label="Drawing of a two-legged armored scout walker with a chin cannon and a cockpit window">
      <Shape d="M130 60 H280 V130 H130 Z" />
      <Shape d="M150 76 H240 V112 H150 Z" w={4} />
      <Line d="M170 76 V112" w={2} />
      <Shape d="M280 90 H350 V106 H280 Z" w={4} />
      <Line d="M350 98 H376" w={4} />
      <Line d="M160 130 L130 180 L100 190 M250 130 L270 180 L300 190" w={9} />
      <Shape d="M80 190 H130 V210 H80 Z M280 190 H330 V210 H280 Z" w={4} />
      <Dot x={150} y={70} r={3} />
      <Dot x={270} y={120} r={3} />
      <Line d="M200 60 V40 H220" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

export function RustedSentinel() {
  return (
    <Drawing label="Drawing of a rust-streaked three-legged military robot guarding a bunker door">
      <Shape d="M260 80 H380 V224 H260 Z" w={4} />
      <Shape d="M290 120 H350 V224 H290 Z" w={3} />
      <Line d="M296 150 H344" w={3} />
      <Shape d="M120 50 C120 20 220 20 220 50 V84 H120 Z" />
      <circle cx="170" cy="56" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={170} y={56} r={5} />
      <Shape d="M110 84 H230 V120 H110 Z" w={4} />
      <Line d="M170 120 L120 224 M170 120 L170 224 M170 120 L230 224" w={8} />
      <Line d="M220 100 H260" w={7} />
      <Line d="M130 40 l-8 -10 M210 40 l8 -10" w={3} />
      <Line d="M130 90 v14 M156 92 v18 M186 90 v12 M214 92 v16" w={2} dash="2 3" />
    </Drawing>
  );
}

export function DataCourierDrone() {
  return (
    <Drawing label="Drawing of a flying delivery drone carrying a locked package and a clock">
      <Line d="M80 80 H320" w={4} />
      <ellipse cx="110" cy="74" rx="34" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="290" cy="74" rx="34" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M150 86 H250 V120 H150 Z" />
      <Dot x={175} y={103} r={5} />
      <Dot x={225} y={103} r={5} />
      <Line d="M180 114 H220" w={3} />
      <Line d="M170 120 V150 M230 120 V150" w={4} />
      <Shape d="M150 150 H250 V210 H150 Z" />
      <Line d="M150 180 H250 M200 150 V210" w={3} />
      <Shape d="M188 170 H212 V190 H188 Z" w={3} />
      <Line d="M194 170 V162 H206 V170" w={3} />
      <circle cx="326" cy="130" r="26" fill={card} {...ink} strokeWidth={4} />
      <Line d="M326 130 V114 M326 130 L338 138" w={3} />
      <Line d="M60 130 H110 M50 150 H100" w={3} dash="4 4" />
    </Drawing>
  );
}

export function DreadnoughtCore() {
  return (
    <Drawing label="Drawing of a glowing battle-mind core inside a gutted corridor of a ship, with cables like roots">
      <Line d="M20 40 H380 M20 200 H380" w={6} />
      <Line d="M60 40 V200 M340 40 V200" w={4} />
      <Line d="M80 40 L110 76 M320 40 L290 76 M80 200 L110 164 M320 200 L290 164" w={4} />
      <circle cx="200" cy="120" r="48" fill={card} {...ink} />
      <circle cx="200" cy="120" r="32" fill="none" {...ink} strokeWidth={4} />
      <circle cx="200" cy="120" r="14" fill="currentColor" />
      <Line d="M152 120 C110 110 100 80 70 70 M248 120 C290 110 300 80 330 70 M170 160 C150 190 120 190 100 210 M230 160 C250 190 280 190 300 210" w={5} />
      <Line d="M200 72 V40 M180 80 L160 50 M220 80 L240 50" w={4} />
      <Line d="M30 100 l10 6 M360 140 l-10 6 M40 170 l12 -4" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

export function CargoLoader() {
  return (
    <Drawing label="Drawing of a yellow forklift droid hauling a stack of crates">
      <Shape d="M150 100 H260 V190 H150 Z" />
      <Shape d="M170 60 H240 V100 H170 Z" w={4} />
      <circle cx="205" cy="80" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={205} y={80} r={3} />
      <Line d="M170 60 V40 H240 V60" w={4} />
      <circle cx="180" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="240" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 60 V200" w={6} />
      <Line d="M110 200 H150 M110 60 V200" w={5} />
      <Shape d="M60 120 H110 V160 H60 Z M60 160 H110 V200 H60 Z M70 80 H110 V120 H70 Z" w={4} />
      <Line d="M72 140 H98 M72 180 H98" w={2} />
      <Line d="M280 180 H330 M290 160 H340" w={3} dash="4 4" />
      <Ground y={228} />
    </Drawing>
  );
}

export function SiegeWalker() {
  return (
    <Drawing label="Drawing of a four-legged armored walker the size of a building over a line of tiny defenders">
      <Shape d="M90 60 H310 V130 H90 Z" />
      <Shape d="M130 40 H270 V60 H130 Z" w={4} />
      <Line d="M110 80 H290 M110 100 H290" w={3} />
      <Shape d="M300 84 H380 V104 H300 Z" w={4} />
      <Line d="M110 130 L70 178 L44 224 M150 130 L140 190 L130 224 M250 130 L260 190 L270 224 M290 130 L330 178 L356 224" w={12} />
      <Shape d="M30 224 h30 l-4 -6 h-22 Z M116 224 h30 l-4 -6 h-22 Z M256 224 h30 l-4 -6 h-22 Z M342 224 h30 l-4 -6 h-22 Z" w={3} />
      <Line d="M160 212 v-10 M180 212 v-10 M200 212 v-10 M220 212 v-10" w={3} />
      <Dot x={130} y={70} r={3} />
    </Drawing>
  );
}
