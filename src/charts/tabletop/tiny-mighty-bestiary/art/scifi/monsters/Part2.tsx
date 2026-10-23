import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function VatHorror() {
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

export function HiveLurker() {
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

export function RotColossus() {
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

export function VoidSerpent() {
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

export function VoidSultan() {
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
