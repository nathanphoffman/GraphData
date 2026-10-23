import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export const Waves = ({ y = 214, w = 3 }: { y?: number; w?: number }) => (
  <Line d={`M0 ${y} q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} w={w} />
);

/** Three-quarter pirate hat on a head centered at x=200. */
export function Tricorn({ y = 52 }: { y?: number }) {
  return (
    <>
      <Shape d={`M148 ${y + 8} L200 ${y - 34} L252 ${y + 8} Q200 ${y + 22} 148 ${y + 8} Z`} />
      <Line d={`M148 ${y + 8} Q200 ${y + 22} 252 ${y + 8}`} w={5} />
    </>
  );
}

export function FigureheadGuardian() {
  return (
    <Drawing label="Drawing of a carved wooden maiden on a ship's prow, arms outstretched, guarding the hull">
      <Shape d="M20 230 L60 170 H380 L360 230 Z" w={4} />
      <Line d="M80 190 H350 M100 210 H340" w={3} />
      <Shape d="M60 170 C40 150 50 120 90 110 L120 170 Z" />
      <Shape d="M134 74 C130 36 186 36 182 74 C186 96 130 96 134 74 Z" />
      <Dot x={150} y={68} r={3} />
      <Dot x={168} y={68} r={3} />
      <Line d="M148 82 q10 6 20 0" w={3} />
      <Line d="M130 70 C112 90 110 130 126 150 M186 70 C204 90 206 130 190 150" w={5} />
      <Shape d="M126 100 H192 L210 190 H108 Z" />
      <Line d="M158 100 V190 M126 130 H192" w={3} />
      <Line d="M130 112 L90 90 L60 100 M188 112 L230 90 L262 100" w={7} />
      <Line d="M250 150 q20 -10 40 0 M280 120 q20 -10 40 0" w={3} dash="2 5" />
      <Waves y={226} />
    </Drawing>
  );
}

export function KnotSnake() {
  return (
    <Drawing label="Drawing of a length of old rigging that ties itself into knots to trip a sailor">
      <Line d="M20 200 C60 170 90 230 130 200 C170 170 150 130 190 140 C230 150 210 200 250 190 C300 178 290 120 330 130 C360 138 370 170 384 160" w={14} />
      <Line d="M20 200 C60 170 90 230 130 200 C170 170 150 130 190 140 C230 150 210 200 250 190 C300 178 290 120 330 130 C360 138 370 170 384 160" w={7} />
      <circle cx="190" cy="140" r="26" fill="none" {...ink} strokeWidth={6} />
      <circle cx="250" cy="190" r="22" fill="none" {...ink} strokeWidth={6} />
      <Shape d="M370 150 C380 134 398 136 400 152 C396 168 374 170 368 160 Z" w={4} />
      <Dot x={388} y={148} r={3} />
      <Line d="M392 156 l6 6 l-2 -10" w={2} />
      <Line d="M24 192 l-10 -6 M24 200 l-12 4 M26 210 l-8 8" w={3} />
      <Line d="M60 60 L90 90 M60 90 L90 60" w={4} dash="2 4" />
      <Shape d="M300 64 C292 40 330 36 330 60 L336 108 L300 108 Z" w={3} />
      <Line d="M306 108 V132 M326 108 V132" w={5} />
    </Drawing>
  );
}

export function RiggingMarionette() {
  return (
    <Drawing label="Drawing of a puppet of old rope and canvas dropping from the rigging">
      <Line d="M20 30 H380 M200 30 V0 M120 30 L90 0 M280 30 L310 0" w={6} />
      <Line d="M200 30 V70 M170 30 L176 118 M230 30 L224 118 M160 30 L148 150 M240 30 L252 150" w={2} />
      <Shape d="M176 70 H224 V108 H176 Z" />
      <Line d="M186 84 L194 92 M194 84 L186 92 M206 84 L214 92 M214 84 L206 92" w={3} />
      <Line d="M184 100 H216 M190 96 v8 M200 96 v8 M210 96 v8" w={2} />
      <Shape d="M168 114 H232 V176 H168 Z" />
      <Line d="M184 114 V176 M200 114 V176 M216 114 V176" w={2} />
      <Line d="M168 120 L134 146 L148 168 M232 120 L268 146 L252 168" w={6} />
      <Line d="M186 176 L172 212 L152 218 M214 176 L226 214 L248 216" w={6} />
      <Line d="M100 180 q10 -8 20 0 M290 190 q10 -8 20 0" w={3} dash="2 5" />
      <Waves y={228} />
    </Drawing>
  );
}

export function CursedManOWar() {
  return (
    <Drawing label="Drawing of a warship with tattered sails and a dead crew nailed to the decks, cannons run out">
      <Line d="M130 40 V160 M220 20 V160 M300 50 V160" w={6} />
      <Shape d="M130 50 L180 50 L190 120 L130 130 Z M220 30 L280 36 L290 120 L220 124 Z M300 58 L350 66 L340 124 L300 128 Z" w={4} />
      <Line d="M140 130 l-8 14 M232 124 l8 16 M310 128 l-6 12 M160 50 l6 40 M250 36 l6 40" w={2} />
      <Shape d="M60 160 H370 L346 214 H90 Z" />
      <Line d="M80 180 H356" w={3} />
      <Shape d="M100 182 h20 v8 h-20 Z M150 184 h20 v8 h-20 Z M200 184 h20 v8 h-20 Z M250 184 h20 v8 h-20 Z M300 184 h20 v8 h-20 Z" w={3} />
      <Line d="M100 166 v-14 M122 166 v-16 M150 166 v-14 M270 166 v-14" w={4} />
      <circle cx="100" cy="146" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="150" cy="148" r="6" fill={card} {...ink} strokeWidth={3} />
      <Line d="M60 160 L30 140 L56 150" w={5} />
      <Waves y={222} />
    </Drawing>
  );
}

export function IronMaidenCannon() {
  return (
    <Drawing label="Drawing of a cursed ship's cannon on a carriage firing by itself, with a screaming face on the barrel">
      <Shape d="M90 130 L290 110 L300 150 L90 170 Z" />
      <Shape d="M60 130 C40 130 40 170 60 170 L90 170 L90 130 Z" w={4} />
      <circle cx="50" cy="150" r="8" fill="currentColor" />
      <Shape d="M290 104 H330 V156 H290 Z" w={5} />
      <ellipse cx="330" cy="130" rx="10" ry="26" fill="currentColor" />
      <Dot x={308} y={122} r={0} />
      <circle cx="304" cy="124" r="4" fill={card} />
      <circle cx="318" cy="124" r="4" fill={card} />
      <Shape d="M300 138 Q310 152 320 138 Z" w={2} />
      <Shape d="M130 170 H260 L270 190 H120 Z" w={4} />
      <circle cx="150" cy="206" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="250" cy="206" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 206 H250" w={3} />
      <Line d="M350 110 l24 -14 M352 130 l32 0 M350 150 l24 14" w={4} />
      <Solid d="M366 130 a10 10 0 1 0 0.1 0 Z" />
      <Line d="M70 120 q10 -14 0 -26 q-8 -12 6 -22" w={3} dash="3 6" />
      <Line d="M10 224 H390" w={4} />
    </Drawing>
  );
}

export function GaleGargoyle() {
  return (
    <Drawing label="Drawing of a stone figurehead come alive in a storm, swooping off the bow with wings spread">
      <Line d="M20 30 l-10 24 M70 20 l-10 24 M120 30 l-10 24 M180 18 l-10 24 M250 26 l-10 24 M310 20 l-10 24 M370 30 l-10 24" w={3} />
      <Shape d="M190 100 C150 60 90 40 30 56 C60 76 70 100 70 124 C110 112 160 116 190 134 Z" />
      <Shape d="M210 100 C250 60 310 40 370 56 C340 76 330 100 330 124 C290 112 240 116 210 134 Z" />
      <Shape d="M176 78 C170 36 230 36 224 78 C230 106 170 106 176 78 Z" />
      <Shape d="M182 48 L170 24 L196 40 Z M218 48 L230 24 L204 40 Z" w={4} />
      <Dot x={190} y={72} r={4} />
      <Dot x={210} y={72} r={4} />
      <Solid d="M190 92 l4 10 l6 -8 l6 8 l4 -10 Z" />
      <Shape d="M178 106 H222 L214 170 H186 Z" />
      <Line d="M190 170 L174 200 M210 170 L226 200" w={5} />
      <Line d="M174 200 l-10 6 M226 200 l10 6" w={3} />
      <Shape d="M150 214 H250 L240 226 H160 Z" w={3} />
      <Line d="M60 88 l8 8 M330 94 l-8 8" w={2} />
    </Drawing>
  );
}
