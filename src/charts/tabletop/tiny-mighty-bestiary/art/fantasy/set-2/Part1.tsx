import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function HauntedDoll() {
  return (
    <Drawing label="Drawing of a cracked porcelain doll with a stitched smile">
      <Shape d="M150 90 C140 30 260 30 250 90 C250 130 150 130 150 90 Z" />
      <Line d="M158 60 Q200 30 242 60" w={4} />
      <Dot x={180} y={84} r={7} />
      <Dot x={220} y={84} r={7} />
      <Line d="M176 108 Q200 120 224 108 M182 104 v10 M194 108 v10 M206 108 v10 M218 104 v10" w={3} />
      <Line d="M206 40 L196 64 L210 76 L200 92" w={3} />
      <Shape d="M156 136 H244 L276 214 H124 Z" />
      <Line d="M156 136 L110 160 M244 136 L290 160" />
      <Line d="M170 214 V228 M230 214 V228" w={6} />
      <Line d="M126 160 l-8 -10 M274 170 l8 -10" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

export function GhostGalleon() {
  return (
    <Drawing label="Drawing of a ghostly galleon with tattered sails">
      <Line d="M200 30 V170 M130 60 V170 M270 70 V170" w={6} />
      <Line d="M200 36 L200 150 L150 130 L170 100 L150 70 Z M200 36 L256 60 L240 100 L260 130 L200 150" w={4} dash="10 5" />
      <Line d="M130 64 L130 140 L100 126 L112 100 L100 80 Z" w={4} dash="10 5" />
      <Line d="M270 74 L270 140 L296 128 L286 104 L298 88 Z" w={4} dash="10 5" />
      <Shape d="M70 170 H330 L300 214 H100 Z" />
      <Line d="M90 188 H310" w={3} />
      <circle cx="150" cy="198" r="4" fill={card} {...ink} strokeWidth={3} />
      <circle cx="200" cy="198" r="4" fill={card} {...ink} strokeWidth={3} />
      <circle cx="250" cy="198" r="4" fill={card} {...ink} strokeWidth={3} />
      <Line d="M180 170 V152 M220 170 V152 M240 170 V156" w={4} />
      <Line d="M10 222 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
    </Drawing>
  );
}

export function GiantSpider() {
  return (
    <Drawing label="Drawing of a large spider hanging from a thread">
      <Line d="M200 0 V90" w={3} />
      <Shape d="M160 120 C160 90 240 90 240 120 C240 150 160 150 160 120 Z" />
      <Shape d="M176 140 C170 190 230 190 224 140 C216 152 184 152 176 140 Z" />
      <Dot x={188} y={112} r={5} />
      <Dot x={212} y={112} r={5} />
      <Dot x={200} y={106} r={3} />
      <Line d="M164 116 L120 70 L90 100 M162 126 L100 120 L70 150 M166 136 L110 170 L90 206 M170 144 L140 190 L136 226" />
      <Line d="M236 116 L280 70 L310 100 M238 126 L300 120 L330 150 M234 136 L290 170 L310 206 M230 144 L260 190 L264 226" />
      <Line d="M192 138 l-6 12 M208 138 l6 12" w={3} />
      <Line d="M190 164 l20 0 M192 174 h16" w={3} />
    </Drawing>
  );
}

export function HornedJackrabbit() {
  return (
    <Drawing label="Drawing of a rabbit with branching antlers and long ears swept back">
      <Shape d="M110 200 C80 150 120 100 200 110 C260 118 290 160 280 200 Z" />
      <Shape d="M276 74 C260 40 214 18 168 20 C208 42 240 66 262 90 Z" w={4} />
      <Shape d="M258 90 C240 70 196 58 150 62 C186 82 220 96 250 108 Z" w={4} />
      <Shape d="M240 120 C230 90 250 66 280 70 C310 74 320 100 306 120 C296 134 250 140 240 120 Z" />
      <Line d="M288 72 C288 52 282 38 272 22 M285 52 l-14 -6 M278 34 l-12 -4 M287 44 l12 -12" w={4} />
      <Line d="M306 76 C312 56 322 42 336 28 M312 58 l16 -2 M322 44 l-2 -16 M330 34 l14 4" w={4} />
      <Dot x={290} y={92} r={4} />
      <Dot x={316} y={104} r={4} />
      <Line d="M300 112 q8 6 14 0" w={3} />
      <Shape d="M110 196 C80 196 76 214 100 214 H170 V196 Z" w={4} />
      <Line d="M110 168 q-14 -4 -18 -16" w={5} />
      <Line d="M326 94 l24 -8 M326 104 l24 4" w={3} />
      <Line d="M340 40 q8 -6 16 0 M336 56 q10 -6 20 0" w={3} />
      <Ground />
    </Drawing>
  );
}

export function DreamCat() {
  return (
    <Drawing label="Drawing of a sleek cat with star-shaped eyes among stars and clouds">
      <Shape d="M90 190 C70 140 140 100 220 120 C270 132 290 170 270 190 Z" />
      <Shape d="M230 126 L232 80 L252 98 L282 98 L302 80 L304 126 C304 150 230 150 230 126 Z" />
      <Solid d="M267 106 l3 7 l7 1 l-5 5 l2 7 l-7 -4 l-7 4 l2 -7 l-5 -5 l7 -1 Z" />
      <Line d="M244 118 l8 0 M244 112 v12 M290 118 l8 0 M294 112 v12" w={3} />
      <Line d="M90 180 C40 190 30 130 70 110 C90 100 100 120 80 126" />
      <Line d="M110 190 V218 M160 190 V218 M230 190 V218 M268 190 V218" w={6} />
      <Line d="M50 40 l6 12 l12 2 l-9 8 l3 12 l-12 -6 l-12 6 l3 -12 l-9 -8 l12 -2 Z" w={3} />
      <Line d="M330 30 v14 M323 37 h14 M170 40 v10 M165 45 h10 M340 150 v10 M335 155 h10" w={3} />
      <Line d="M130 70 q10 -10 22 -4 q10 -10 22 0 q14 -2 14 10 H130 Z" w={3} />
      <Ground />
    </Drawing>
  );
}

export function Goblin() {
  return (
    <Drawing label="Drawing of a cackling goblin with a rusty knife">
      <Shape d="M168 90 L100 70 L160 60 Z M232 90 L300 70 L240 60 Z" w={4} />
      <Shape d="M160 60 C160 30 240 30 240 60 C250 100 230 130 200 132 C170 130 150 100 160 60 Z" />
      <Dot x={184} y={72} r={5} />
      <Dot x={216} y={72} r={5} />
      <Line d="M176 102 Q200 124 224 102" w={4} />
      <Solid d="M184 106 l4 10 l4 -8 Z M208 108 l4 8 l4 -10 Z" />
      <Line d="M200 80 l-4 14 h8" w={3} />
      <Shape d="M168 138 H232 L242 200 H158 Z" />
      <Line d="M170 150 L130 180 M230 150 L276 150" />
      <Shape d="M270 150 L330 112 L338 122 L286 160 Z" w={4} />
      <Line d="M180 200 L170 224 M220 200 L232 224" w={6} />
      <Line d="M336 60 l10 -6 M350 76 l12 0 M60 130 l-8 -8" w={3} />
    </Drawing>
  );
}

export function GrandpaGiant() {
  return (
    <Drawing label="Drawing of a huge bearded giant carrying a giant pie, next to a tiny cottage">
      <Shape d="M130 70 C130 20 230 20 230 70 L232 90 H128 Z" />
      <Shape d="M130 80 C100 150 140 200 180 206 C220 200 260 150 230 80 C210 100 150 100 130 80 Z" />
      <Dot x={160} y={72} r={4} />
      <Dot x={200} y={72} r={4} />
      <Line d="M170 112 q10 8 20 0" w={3} />
      <Line d="M170 206 V228 M200 206 V228" w={7} />
      <Line d="M232 150 L270 160" />
      <Shape d="M260 148 H350 L346 168 H264 Z" w={4} />
      <Shape d="M258 148 C262 126 348 126 352 148 Z" w={4} />
      <Line d="M290 138 l-4 6 M310 134 v8 M330 138 l4 6" w={3} />
      <Line d="M300 128 q-4 -10 4 -16 M316 128 q-4 -10 4 -16" w={3} />
      <Shape d="M40 200 V176 L64 160 L88 176 V200 Z" w={3} />
      <Line d="M56 200 V186 H72 V200" w={2} />
      <Line d="M104 214 l6 4 l6 -4" w={3} />
    </Drawing>
  );
}
