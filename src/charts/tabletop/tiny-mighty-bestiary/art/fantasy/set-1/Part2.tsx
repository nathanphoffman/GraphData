import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function CaveTroll() {
  return (
    <Drawing label="Drawing of a hulking warty troll holding a club">
      <Shape d="M130 90 C120 150 130 190 150 206 H250 C270 190 280 150 270 90 C250 70 150 70 130 90 Z" />
      <Shape d="M170 86 C170 50 230 50 230 86 C230 100 170 100 170 86 Z" />
      <Dot x={188} y={76} r={4} />
      <Dot x={212} y={76} r={4} />
      <Line d="M186 92 h28 M192 92 v-5 M208 92 v-5" w={3} />
      <Shape d="M130 100 C90 130 80 170 90 200 L116 200 C116 170 130 150 148 130 Z" />
      <Shape d="M270 100 C310 120 320 150 312 170 L286 168 C286 150 270 140 260 128 Z" />
      <Shape d="M298 168 L322 40 L346 48 L330 180 C326 196 296 196 298 168 Z" />
      <Line d="M326 70 l12 -2 M322 100 l12 0 M318 130 l12 2" w={3} />
      <Line d="M170 206 V222 M230 206 V222" w={6} />
      <Dot x={150} y={120} r={3} />
      <Dot x={250} y={140} r={3} />
      <Dot x={190} y={170} r={3} />
      <Line d="M170 150 q10 6 20 0" w={3} />
    </Drawing>
  );
}

export function BefuddledWizard() {
  return (
    <Drawing label="Drawing of a confused bearded wizard in a pointy hat with question marks around him">
      <Shape d="M150 76 L214 6 L240 76 Z" />
      <Line d="M130 78 H260" w={6} />
      <Shape d="M156 82 H234 C240 120 240 150 220 170 H170 C150 150 150 120 156 82 Z" />
      <Dot x={180} y={100} r={4} />
      <Dot x={210} y={100} r={4} />
      <Line d="M170 94 q10 -8 20 0 M200 94 q10 -8 20 0" w={3} />
      <Shape d="M156 112 C150 170 170 210 195 214 C220 210 240 170 234 112 C216 130 174 130 156 112 Z" />
      <Shape d="M140 150 L120 218 H270 L250 150 Z" />
      <Line d="M140 156 L100 140 M250 156 L290 140" />
      <Line d="M300 60 q0 -18 18 -18 q18 0 18 16 q0 12 -18 18 v8" w={4} />
      <Dot x={318} y={100} r={3} />
      <Line d="M70 80 q0 -14 14 -14 q14 0 14 12 q0 9 -14 14 v6" w={4} />
      <Dot x={84} y={110} r={3} />
    </Drawing>
  );
}

export function CaveDwarf() {
  return (
    <Drawing label="Drawing of a short bearded dwarf with a pickaxe and a lantern">
      <Shape d="M150 64 C150 30 250 30 250 64 L254 76 H146 Z" />
      <Line d="M200 30 V18 M186 18 H214" w={4} />
      <Shape d="M156 76 H244 C250 100 244 120 230 130 H170 C156 120 150 100 156 76 Z" />
      <Dot x={182} y={92} r={4} />
      <Dot x={218} y={92} r={4} />
      <Shape d="M150 100 C130 150 150 200 200 206 C250 200 270 150 250 100 C236 124 164 124 150 100 Z" />
      <Line d="M180 150 q10 8 20 0 q10 8 20 0" w={3} />
      <Shape d="M156 160 L140 216 H260 L244 160 Z" />
      <Line d="M254 170 L330 90" w={6} />
      <Shape d="M300 70 Q340 60 356 100 L336 96 Q324 84 312 90 Z" w={4} />
      <Line d="M150 170 L110 170" />
      <Line d="M110 170 V184" w={4} />
      <Shape d="M96 184 H124 V210 H96 Z" w={4} />
      <Line d="M104 190 V204 M116 190 V204" w={2} />
      <Line d="M80 176 l-14 -8 M84 164 l-8 -14 M140 176 l12 -10" w={3} />
    </Drawing>
  );
}

export function BraggartKnight() {
  return (
    <Drawing label="Drawing of a knight with a huge plume, puffing out his chest and holding a sword up">
      <Line d="M180 52 C150 10 90 20 80 50 C130 40 160 50 190 70" w={5} />
      <Shape d="M160 100 C150 50 170 36 200 36 C230 36 250 50 240 100 Z" />
      <Line d="M170 80 H236 M170 66 H230" w={4} />
      <Line d="M200 66 V94" w={3} />
      <Shape d="M150 110 H250 C262 150 250 176 232 188 H168 C150 176 138 150 150 110 Z" />
      <Line d="M200 114 V186 M170 140 H230" w={3} />
      <Shape d="M168 188 H232 V222 H168 Z" w={4} />
      <Line d="M250 124 L290 94 L316 40" />
      <Solid d="M312 46 L326 6 L336 48 Z" />
      <Line d="M300 62 l22 14" w={6} />
      <Shape d="M130 124 C100 124 92 160 110 176 C130 176 144 156 150 140 Z" w={4} />
      <Line d="M92 60 l8 6 M64 40 l10 4 M110 24 l4 8" w={3} />
    </Drawing>
  );
}

export function CastleGuard() {
  return (
    <Drawing label="Drawing of a guard in a helmet and tabard holding a spear, looking uneasy">
      <Line d="M290 20 V222" w={6} />
      <Solid d="M278 40 L290 6 L302 40 Z" />
      <Shape d="M156 76 C156 36 244 36 244 76 V90 H156 Z" />
      <Line d="M156 76 H244 M200 36 V76" w={3} />
      <Dot x={182} y={86} r={3} />
      <Dot x={218} y={86} r={3} />
      <Shape d="M160 100 H240 L250 210 H150 Z" />
      <Line d="M200 100 V210" w={3} />
      <Line d="M176 140 l12 12 l-12 12 M224 140 l-12 12 l12 12" w={3} />
      <Line d="M240 120 L290 140 M160 120 L130 150" />
      <Line d="M170 210 V224 M230 210 V224" w={6} />
      <Line d="M300 60 q8 6 8 14 M312 56 q8 8 6 20" w={3} />
    </Drawing>
  );
}

export function Cutpurse() {
  return (
    <Drawing label="Drawing of a hooded thief holding up a stolen coin purse">
      <Shape d="M150 100 C140 30 260 30 250 100 C250 130 150 130 150 100 Z" />
      <path d="M170 100 C170 74 230 74 230 100 C230 120 170 120 170 100 Z" fill="currentColor" />
      <Dot x={190} y={102} r={3} />
      <circle cx="190" cy="102" r="3" fill={card} />
      <circle cx="210" cy="102" r="3" fill={card} />
      <Shape d="M150 126 C120 160 120 200 130 216 H270 C280 200 280 160 250 126 C230 140 170 140 150 126 Z" />
      <Line d="M170 150 L250 190" w={3} />
      <Line d="M250 140 L292 100" />
      <Shape d="M282 92 L314 92 L322 62 H274 Z" w={4} />
      <Shape d="M270 62 Q298 48 326 62 Z" w={4} />
      <Line d="M298 70 v14" w={3} />
      <circle cx="350" cy="130" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M350 124 v12" w={3} />
      <Line d="M335 100 l-6 -8 M356 100 l6 -8" w={3} />
    </Drawing>
  );
}
