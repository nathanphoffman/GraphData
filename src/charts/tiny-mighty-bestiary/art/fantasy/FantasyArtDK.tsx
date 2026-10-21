import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";

const card = "var(--b-card)";

function HauntedDoll() {
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

function GhostGalleon() {
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

function GiantSpider() {
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

function HornedJackrabbit() {
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

function DreamCat() {
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

function Goblin() {
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

function GrandpaGiant() {
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

function ErrantKnight() {
  return (
    <Drawing label="Drawing of a dented knight walking with a lance and a battered shield">
      <Shape d="M160 90 C158 40 242 40 240 90 V100 H160 Z" />
      <Line d="M170 78 H232" w={4} />
      <Line d="M180 40 Q200 20 220 40" w={4} />
      <Shape d="M150 106 H250 L246 170 H154 Z" />
      <Line d="M170 106 l10 20 l-6 14 M222 120 l12 8" w={3} />
      <Shape d="M154 170 H246 L254 206 H146 Z" w={4} />
      <Line d="M170 206 V226 M230 206 V226" w={6} />
      <Line d="M150 120 L118 150" />
      <Shape d="M72 126 H116 V170 C116 190 94 196 94 196 C94 196 72 190 72 170 Z" w={4} />
      <Line d="M94 134 V184 M78 156 H112" w={3} />
      <Line d="M250 120 L290 150 L342 40" />
      <Solid d="M338 48 L352 8 L356 46 Z" />
      <Line d="M300 190 q12 -10 24 0" w={3} />
    </Drawing>
  );
}

function GreenwoodArcher() {
  return (
    <Drawing label="Drawing of a hooded archer drawing a longbow">
      <Shape d="M150 100 C140 30 250 30 244 100 C244 126 156 126 150 100 Z" />
      <path d="M168 100 C168 76 226 76 226 100 C226 118 168 118 168 100 Z" fill="currentColor" />
      <Shape d="M148 124 C120 160 126 200 134 218 H262 C270 200 270 160 244 124 C224 138 170 138 148 124 Z" />
      <Line d="M160 150 H250" w={3} />
      <Line d="M180 124 L120 140" />
      <Line d="M224 130 L270 124" />
      <Line d="M276 40 Q310 120 276 200" w={6} />
      <Line d="M276 40 L252 120 L276 200" w={2} />
      <Line d="M110 138 H280" w={3} />
      <Solid d="M96 138 l14 -6 v12 Z" />
      <Shape d="M222 138 H250 V170 H222 Z" w={3} />
      <Line d="M170 218 V230 M230 218 V230" w={6} />
      <Line d="M60 40 q18 14 0 30 M40 60 q14 10 0 22" w={3} />
    </Drawing>
  );
}

function Hexmaster() {
  return (
    <Drawing label="Drawing of a gaunt robed sorcerer with a shadow that lags behind">
      <Line d="M120 214 C100 180 100 120 140 90 C150 70 160 66 180 66 C200 66 210 70 220 90 C260 120 260 180 240 214" w={4} dash="3 9" />
      <Shape d="M190 54 C176 54 176 100 190 104 C204 100 204 54 190 54 Z" w={4} />
      <path d="M170 44 H210 L200 20 H180 Z" fill="currentColor" />
      <Shape d="M170 104 H210 L236 218 H144 Z" />
      <Line d="M190 104 V218" w={3} />
      <Line d="M180 74 l8 0 M196 74 l8 0" w={3} />
      <Line d="M170 120 L124 150 M210 120 L254 100" />
      <Line d="M254 100 l-6 -14 M254 100 l4 -16 M254 100 l12 -10" w={3} />
      <Line d="M300 60 l14 8 l-14 8 l14 8 M316 38 l0 14 M330 90 l-8 8" w={3} />
      <circle cx="340" cy="150" r="22" fill="none" {...ink} strokeWidth={3} strokeDasharray="4 6" />
      <Line d="M340 134 L352 168 L328 148 H352 L328 168 Z" w={2} />
    </Drawing>
  );
}

function DuskEnchantress() {
  return (
    <Drawing label="Drawing of a sorceress in a gown of shadows, one hand raised and whispering">
      <Shape d="M170 80 C160 26 240 26 232 80 C232 104 170 104 170 80 Z" />
      <Line d="M172 70 C150 90 150 130 160 150 M230 70 C252 90 252 130 242 150" w={4} />
      <Dot x={188} y={76} r={3} />
      <Dot x={214} y={76} r={3} />
      <Line d="M192 92 Q201 98 210 92" w={3} />
      <Shape d="M170 106 H232 L250 150 L290 222 H110 L152 150 Z" />
      <Line d="M170 160 q20 20 0 56 M200 160 q16 22 0 56 M230 160 q20 20 0 56" w={3} />
      <Line d="M226 118 L274 96 L276 66" />
      <Line d="M276 66 l-8 -10 M276 66 l0 -14 M276 66 l8 -10" w={3} />
      <Line d="M300 80 q14 -10 22 2 M308 100 q18 -12 30 0 M290 120 q12 -8 20 0" w={3} dash="2 6" />
      <path d="M60 60 a22 22 0 1 0 22 22 a16 16 0 1 1 -22 -22 Z" fill="currentColor" />
    </Drawing>
  );
}

function HoodedHeadsman() {
  return (
    <Drawing label="Drawing of a masked, broad-shouldered executioner with a huge axe">
      <Line d="M300 30 V224" w={6} />
      <Shape d="M300 40 C340 30 360 60 350 100 C340 90 320 96 300 96 Z" />
      <Shape d="M300 40 C270 50 262 70 270 90 L300 96 Z" w={4} />
      <Shape d="M168 90 C160 30 240 30 232 90 L226 112 H174 Z" />
      <path d="M176 66 H224 V80 H176 Z" fill="currentColor" />
      <circle cx="190" cy="73" r="3" fill={card} />
      <circle cx="210" cy="73" r="3" fill={card} />
      <Shape d="M120 120 C130 106 170 110 200 112 C230 110 270 106 280 120 L270 214 H130 Z" />
      <Line d="M200 112 V214 M140 160 H260" w={3} />
      <Line d="M130 126 L122 170 M270 126 L290 120 L300 128" w={7} />
      <Line d="M160 214 V228 M240 214 V228" w={7} />
    </Drawing>
  );
}

function IronWarlord() {
  return (
    <Drawing label="Drawing of a scarred conqueror in spiked iron armor with a banner and a mass of spears behind him">
      <Line d="M30 224 V90 M60 224 V80 M90 224 V94 M310 224 V84 M340 224 V92 M370 224 V80" w={3} />
      <Line d="M30 90 l-6 12 h12 Z M60 80 l-6 12 h12 Z M90 94 l-6 12 h12 Z M310 84 l-6 12 h12 Z M340 92 l-6 12 h12 Z M370 80 l-6 12 h12 Z" w={3} />
      <Shape d="M160 90 C156 36 244 36 240 90 L230 118 H170 Z" />
      <Solid d="M200 20 L192 40 H208 Z" />
      <Solid d="M162 56 L146 36 L170 48 Z M238 56 L254 36 L230 48 Z" />
      <Line d="M170 84 H230" w={4} />
      <Dot x={184} y={74} r={3} />
      <Dot x={216} y={74} r={3} />
      <Line d="M206 56 l-6 30" w={3} />
      <Shape d="M120 126 L170 118 H230 L280 126 L270 214 H130 Z" />
      <Solid d="M130 118 L116 100 L146 120 Z M270 118 L284 100 L254 120 Z" />
      <Line d="M200 124 V214 M150 160 H250" w={3} />
      <Line d="M130 150 L100 180 M270 150 L300 170" w={7} />
      <Line d="M160 214 V230 M240 214 V230" w={7} />
    </Drawing>
  );
}

function HollowThrall() {
  return (
    <Drawing label="Drawing of a pale servant staggering forward with arms outstretched and wide staring eyes">
      <Shape d="M168 90 C160 34 240 34 232 90 C232 118 168 118 168 90 Z" />
      <circle cx="186" cy="74" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="74" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={74} r={2} />
      <Dot x={216} y={74} r={2} />
      <Line d="M190 100 H210" w={3} />
      <Shape d="M166 120 H234 L240 210 H160 Z" />
      <Line d="M200 120 V210 M176 140 H224" w={3} />
      <Line d="M170 128 L110 126 L80 130 M230 128 L290 124 L320 128" />
      <Line d="M186 210 L180 226 M214 210 L224 226" w={6} />
      <Line d="M290 60 q8 -10 18 -4 M300 76 q8 -8 18 -2 M310 94 q6 -6 14 -2" w={3} />
      <Line d="M80 190 q14 4 20 -8" w={3} dash="2 6" />
    </Drawing>
  );
}

function FrostKing() {
  return (
    <Drawing label="Drawing of an ice-bearded giant seated on a throne of glaciers">
      <Shape d="M90 224 V90 L110 40 L130 90 L140 30 L160 90 V224 Z" w={4} />
      <Shape d="M240 224 V90 L260 30 L270 90 L290 44 L310 90 V224 Z" w={4} />
      <Shape d="M170 80 L180 52 L200 66 L220 52 L230 80 Z" w={4} />
      <Shape d="M174 84 C174 54 226 54 226 84 C226 104 174 104 174 84 Z" />
      <Dot x={190} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Shape d="M174 92 L184 130 L192 112 L200 144 L208 112 L216 130 L226 92 Z" w={4} />
      <Shape d="M160 120 H240 L250 204 H150 Z" />
      <Line d="M160 130 L134 170 M240 130 L268 150" />
      <Line d="M268 150 V200 M262 150 h12" w={5} />
      <Line d="M180 224 h40" w={5} />
      <Line d="M30 50 l6 12 M50 30 l0 14 M350 60 l-6 12 M330 28 l0 14 M30 120 l14 0" w={3} />
    </Drawing>
  );
}

function GraveClerk() {
  return (
    <Drawing label="Drawing of a thin clerk behind a desk stamping a death notice">
      <Shape d="M40 150 H360 V224 H40 Z" />
      <Line d="M40 170 H360" w={3} />
      <Shape d="M176 76 C170 30 232 30 226 76 C226 100 176 100 176 76 Z" />
      <Line d="M184 68 h10 M208 68 h10" w={4} />
      <Dot x={190} y={72} r={2} />
      <Dot x={214} y={72} r={2} />
      <Line d="M192 88 H212" w={3} />
      <Line d="M180 44 H226" w={4} />
      <Shape d="M180 98 H224 L232 150 H172 Z" />
      <Line d="M202 100 L196 120 L202 150" w={3} />
      <Line d="M226 108 L262 90 L262 66" />
      <Shape d="M246 58 H278 V68 H246 Z" w={4} />
      <Shape d="M252 68 H272 V82 H252 Z" w={4} />
      <Shape d="M270 140 H340 V150 H270 Z" w={3} />
      <Line d="M280 132 H320 M290 124 H330" w={3} />
      <Line d="M60 130 H110 M60 120 H100 M60 110 H108" w={3} />
    </Drawing>
  );
}

function Dragon() {
  return (
    <Drawing label="Drawing of a winged dragon sitting on a pile of coins and breathing fire">
      <Shape d="M60 224 Q100 170 160 180 Q220 170 260 224 Z" />
      <circle cx="120" cy="200" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="170" cy="196" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="218" cy="204" r="8" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M110 180 C100 120 160 90 210 110 C240 120 250 150 230 180 Z" />
      <Shape d="M120 130 L60 70 L90 60 L80 30 L140 90 Z" />
      <Shape d="M190 100 C196 70 220 56 240 64 C260 60 290 66 300 84 L340 86 L300 100 C290 112 250 118 220 112 Z" />
      <Dot x={238} y={80} r={4} />
      <Line d="M256 86 l-4 14 l-6 -10 M276 90 l-4 12 l-6 -10" w={3} />
      <Line d="M210 66 L220 36 M232 62 L246 36" w={5} />
      <Line d="M120 170 C70 170 50 130 80 120" />
      <Line d="M340 90 q14 -8 20 -22 q8 20 16 10 q-4 30 -24 32 q-10 -4 -12 -20" w={3} />
    </Drawing>
  );
}

function JellyBlock() {
  return (
    <Drawing label="Drawing of a see-through wobbling cube with a skull and coins floating inside">
      <Shape d="M100 90 H280 V210 H100 Z" />
      <Shape d="M100 90 L140 56 H320 L280 90 Z" w={4} />
      <Shape d="M280 90 L320 56 V176 L280 210 Z" w={4} />
      <circle cx="150" cy="180" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="226" cy="124" r="10" fill="none" {...ink} strokeWidth={3} />
      <Line d="M180 150 H210 M170 160 L200 170" w={4} />
      <Shape d="M224 170 C220 152 252 152 248 170 V182 H224 Z" w={3} />
      <Dot x={231} y={168} r={3} />
      <Dot x={241} y={168} r={3} />
      <Line d="M130 110 q10 -8 24 -8 M296 76 q4 -6 12 -8" w={3} />
      <Line d="M90 216 q20 8 50 4 M260 220 q30 6 50 -4" w={3} />
      <Line d="M72 150 q-10 6 -8 18 M330 130 q10 6 8 18" w={3} />
    </Drawing>
  );
}

function GreatRoc() {
  return (
    <Drawing label="Drawing of a giant bird with huge outspread wings carrying an elephant in its talons">
      <Shape d="M200 70 C160 50 100 20 20 40 C60 60 80 90 90 110 C120 100 160 100 190 110 Z" />
      <Shape d="M200 70 C240 50 300 20 380 40 C340 60 320 90 310 110 C280 100 240 100 210 110 Z" />
      <Shape d="M176 110 C170 70 230 70 224 110 L218 160 H182 Z" />
      <Shape d="M176 70 C176 40 224 40 224 70 C224 84 176 84 176 70 Z" />
      <Shape d="M200 58 L220 66 L202 72 Z" w={3} />
      <Dot x={190} y={60} r={3} />
      <Line d="M190 160 L176 190 M210 160 L224 190" w={5} />
      <Line d="M170 190 l-10 6 M176 190 l-2 10 M230 190 l10 6 M224 190 l2 10" w={3} />
      <Shape d="M150 198 C150 184 250 184 250 198 C250 218 230 224 210 220 C190 224 150 220 150 198 Z" w={4} />
      <Line d="M240 196 q16 4 14 18 M150 200 q-14 -2 -18 -12" w={3} />
      <Line d="M60 130 q10 -8 20 0 M310 150 q10 -8 20 0" w={3} />
    </Drawing>
  );
}

function HullCrusher() {
  return (
    <Drawing label="Drawing of a many-armed sea monster wrapped around a ship's hull">
      <Shape d="M120 130 H280 L260 170 H140 Z" />
      <Line d="M200 130 V60 M200 66 L250 90 L200 118" w={4} />
      <Line d="M10 180 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Shape d="M150 230 C140 190 140 160 200 160 C260 160 260 190 250 230 Z" />
      <Dot x={180} y={188} r={5} />
      <Dot x={220} y={188} r={5} />
      <Line d="M150 180 C100 180 90 130 120 120 C140 114 150 130 140 140 M250 180 C300 180 310 130 280 120 C260 114 250 130 260 140" />
      <Line d="M160 170 C120 160 100 190 70 180 M240 170 C280 160 300 190 330 180 M168 200 C130 210 110 220 70 214 M232 200 C270 210 290 220 330 214" />
      <Line d="M120 120 l-8 -12 M280 120 l8 -12" w={3} />
      <Line d="M130 126 l6 4 M270 126 l-6 4 M180 126 l4 6 M220 126 l-4 6" w={3} />
    </Drawing>
  );
}

function GiggleSprite() {
  return (
    <Drawing label="Drawing of a tiny glittering fairy with wings, holding a stolen hat">
      <Shape d="M200 110 C140 50 110 70 120 110 C130 140 180 130 200 120 Z" />
      <Shape d="M200 110 C260 50 290 70 280 110 C270 140 220 130 200 120 Z" />
      <Shape d="M180 90 C180 66 220 66 220 90 C220 108 180 108 180 90 Z" />
      <Dot x={192} y={86} r={3} />
      <Dot x={208} y={86} r={3} />
      <Line d="M190 96 Q200 106 210 96" w={3} />
      <Shape d="M184 108 H216 L212 150 H188 Z" />
      <Line d="M192 150 L186 184 M208 150 L214 184" w={4} />
      <Line d="M184 114 L160 100" w={4} />
      <Shape d="M130 60 H164 L168 74 H126 Z M138 60 C140 40 156 40 158 60" w={4} />
      <Line d="M60 40 v16 M52 48 h16 M330 50 v12 M324 56 h12 M320 160 v16 M312 168 h16 M80 150 v10 M75 155 h10" w={3} />
      <Line d="M150 190 q30 30 60 10" w={3} dash="2 8" />
      <Shape d="M290 190 l20 -6 l20 6 l-8 10 l-6 -4 l-6 4 Z" w={3} />
    </Drawing>
  );
}

function GraveKnight() {
  return (
    <Drawing label="Drawing of a rusted knight with glowing eyes and a notched sword, standing among grave markers">
      <Shape d="M160 90 C158 36 242 36 240 90 V100 H160 Z" />
      <Line d="M170 78 H232" w={4} />
      <circle cx="186" cy="74" r="5" fill="currentColor" />
      <circle cx="214" cy="74" r="5" fill="currentColor" />
      <Line d="M180 66 l-10 -8 M220 66 l10 -8 M200 40 v-14" w={3} />
      <Shape d="M144 104 H256 L248 172 H152 Z" />
      <Line d="M170 120 l8 14 l-6 16 M226 126 l8 6" w={3} />
      <Shape d="M152 172 H248 L256 208 H144 Z" w={4} />
      <Line d="M170 208 V226 M230 208 V226" w={6} />
      <Line d="M150 124 L120 160 M250 124 L290 160" />
      <Shape d="M284 70 L296 70 L296 190 L284 190 Z" w={4} />
      <Line d="M290 190 V204 M276 190 H304" w={5} />
      <Line d="M296 100 l-6 4 M284 130 l6 4" w={3} />
      <Shape d="M40 224 V190 Q40 176 56 176 Q72 176 72 190 V224 Z" w={4} />
      <Line d="M56 186 v14 M50 192 h12" w={3} />
    </Drawing>
  );
}

function Hellspawn() {
  return (
    <Drawing label="Drawing of a horned fiend with bat wings holding a ledger, smoke rising off it">
      <Shape d="M170 110 C120 90 80 50 40 70 C60 90 70 110 80 140 C110 120 140 126 170 140 Z" />
      <Shape d="M230 110 C280 90 320 50 360 70 C340 90 330 110 320 140 C290 120 260 126 230 140 Z" />
      <Shape d="M168 70 C168 40 232 40 232 70 C232 100 168 100 168 70 Z" />
      <Shape d="M174 52 C160 40 150 20 160 10 C170 24 178 34 184 42 Z M226 52 C240 40 250 20 240 10 C230 24 222 34 216 42 Z" w={4} />
      <Line d="M182 66 l12 6 M218 66 l-12 6" w={4} />
      <Line d="M184 86 Q200 98 216 86" w={3} />
      <Shape d="M174 106 H226 L232 190 H168 Z" />
      <Line d="M190 190 L184 224 M210 190 L218 224" w={6} />
      <Line d="M168 190 C130 210 130 160 150 150" w={4} />
      <Shape d="M226 140 H274 V186 H226 Z" w={4} />
      <Line d="M234 152 H266 M234 162 H262 M234 172 H266" w={3} />
      <Line d="M290 40 q-10 14 0 26 q10 14 0 28 M320 70 q-8 10 0 20 M70 150 q-10 12 0 24" w={3} dash="3 6" />
    </Drawing>
  );
}

function HauntedSheriff() {
  return (
    <Drawing label="Drawing of a tattered ghostly lawman with a tin star and a wide-brimmed hat">
      <Shape d="M110 70 H290 L260 54 C260 14 140 14 140 54 Z" />
      <Line d="M140 54 H260" w={4} />
      <Shape d="M166 70 H234 V104 C234 124 166 124 166 104 Z" />
      <Dot x={186} y={90} r={4} />
      <Dot x={214} y={90} r={4} />
      <Line d="M186 108 H214" w={3} />
      <Shape d="M160 124 H240 L250 190 l-12 12 l-12 -12 l-14 12 l-14 -12 l-14 12 l-12 -12 Z" />
      <Solid d="M200 140 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" />
      <Line d="M160 134 L120 160 M240 134 L286 150" />
      <Shape d="M286 142 H330 L334 156 H290 Z" w={4} />
      <Line d="M296 156 L294 172 H310 L312 156" w={4} />
      <Line d="M60 60 q10 -10 20 0 M60 90 q12 -10 24 0" w={3} />
      <Line d="M170 202 q-20 14 -10 22 M230 202 q20 14 10 22" w={3} dash="3 6" />
    </Drawing>
  );
}

function Ghoul() {
  return (
    <Drawing label="Drawing of a hunched rubbery creature crouched over a gravestone">
      <Shape d="M240 224 V150 Q240 124 270 124 Q300 124 300 150 V224 Z" />
      <Line d="M262 150 v22 M252 160 h20" w={4} />
      <Shape d="M90 190 C70 130 110 80 170 84 C210 88 224 120 210 150 C200 176 200 190 210 210 H110 Z" />
      <Shape d="M160 90 C130 80 120 50 150 38 C180 28 200 50 190 78 Z" />
      <Dot x={152} y={58} r={4} />
      <Dot x={172} y={56} r={4} />
      <Line d="M146 74 Q160 84 178 72 M150 74 v6 M160 78 v6 M170 76 v6" w={3} />
      <Line d="M196 112 L240 120 L250 138 M250 138 l-4 10 M250 138 l8 6 M250 138 l10 -2" w={5} />
      <Line d="M120 206 L100 226 M190 210 L200 226" w={6} />
      <Line d="M100 120 q10 4 14 14 M120 150 q10 4 12 12" w={3} />
      <Line d="M40 220 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

function GallowsTree() {
  return (
    <Drawing label="Drawing of a twisted dead tree with a swaying noose and bones at its roots">
      <Shape d="M180 224 C190 190 180 150 186 110 C190 70 170 40 150 20 C170 28 192 52 200 80 C204 50 220 30 250 16 C226 40 216 70 218 110 C220 150 214 190 224 224 Z" />
      <Line d="M150 20 L120 10 M150 20 L136 36 M250 16 L286 14 M250 16 L268 36 M200 80 L160 90" w={4} />
      <Line d="M258 22 C262 40 262 52 262 62" w={4} />
      <path d="M262 62 C244 62 244 90 262 90 C280 90 280 62 262 62 Z" fill="none" {...ink} strokeWidth={4} />
      <Line d="M244 36 q-6 8 0 16 M280 44 q6 8 0 16" w={3} dash="2 6" />
      <Line d="M150 218 h20 M150 218 l6 -8 M170 218 l6 -8 M230 222 h24 M236 222 l-4 -8 M254 222 l4 -8" w={4} />
      <circle cx="270" cy="216" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={268} y={215} r={1.5} />
      <Dot x={273} y={215} r={1.5} />
      <Ground y={226} />
    </Drawing>
  );
}

function GraveImp() {
  return (
    <Drawing label="Drawing of a small skinny imp with bat wings and a long tongue, giggling over a broken cup">
      <Shape d="M190 100 C150 70 120 50 90 60 C110 80 120 100 130 120 C150 112 170 114 190 124 Z" />
      <Shape d="M210 100 C250 70 280 50 310 60 C290 80 280 100 270 120 C250 112 230 114 210 124 Z" />
      <Shape d="M176 84 C176 52 224 52 224 84 C224 110 176 110 176 84 Z" />
      <Line d="M182 62 l-8 -20 M218 62 l8 -20" w={4} />
      <Dot x={192} y={80} r={4} />
      <Dot x={210} y={80} r={4} />
      <Line d="M188 96 Q200 104 214 96" w={3} />
      <Line d="M200 100 C200 124 230 124 232 148" w={4} />
      <Shape d="M186 112 H214 L210 166 H190 Z" />
      <Line d="M190 166 L176 196 M210 166 L222 196" w={4} />
      <Line d="M186 120 L160 150 M214 120 L240 140" w={4} />
      <Line d="M140 224 h40 M150 224 l-4 -14 l14 4 l-2 10" w={4} />
      <Line d="M260 200 l-8 -10 l16 2 z" w={3} />
      <Line d="M118 170 q-10 -8 -2 -18 M262 100 l12 -4 M280 120 l12 2" w={3} />
    </Drawing>
  );
}

function HearthSpirit() {
  return (
    <Drawing label="Drawing of a tiny bearded spirit holding a broom beside a saucer of milk by the fireplace">
      <Shape d="M270 224 V80 H370 V224 Z" />
      <Shape d="M290 224 V120 H350 V224 Z" w={3} />
      <Line d="M320 220 C300 200 330 190 316 170 C340 184 346 206 330 220" w={3} />
      <Shape d="M150 100 C150 60 220 60 220 100 C220 120 150 120 150 100 Z" />
      <Shape d="M150 90 L130 70 L170 70 L160 40 L200 36 L214 70 L226 80 Z" w={4} />
      <Dot x={176} y={92} r={3} />
      <Dot x={196} y={92} r={3} />
      <Shape d="M156 108 C156 160 170 190 186 196 C202 190 216 160 214 108 C200 120 170 120 156 108 Z" />
      <Shape d="M166 150 H206 L212 200 H160 Z" w={4} />
      <Line d="M160 156 L124 140 L100 214" />
      <Shape d="M82 214 H122 L112 200 H92 Z" w={3} />
      <Line d="M170 200 V222 M200 200 V222" w={5} />
      <Shape d="M236 214 H266 L262 224 H240 Z" w={3} />
      <Line d="M238 214 q14 -6 26 0" w={3} />
      <Ground y={226} x2={270} />
    </Drawing>
  );
}

function FerrymanOfSouls() {
  return (
    <Drawing label="Drawing of a hooded boatman poling a skiff across a dark river">
      <Shape d="M150 100 C150 40 220 40 220 100 L226 140 H144 Z" />
      <path d="M170 100 C170 76 200 76 200 100 C200 120 170 120 170 100 Z" fill="currentColor" />
      <Shape d="M150 130 L130 192 H240 L226 130 Z" />
      <Shape d="M70 192 H330 L300 220 H100 Z" />
      <Line d="M108 224 L300 40" w={5} />
      <Line d="M222 122 L225 112 M162 134 L178 157" w={6} />
      <Line d="M10 200 q15 -8 30 0 t30 0 M330 202 q15 -8 30 0 t30 0" w={3} />
      <Line d="M30 224 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <circle cx="288" cy="176" r="10" fill="none" {...ink} strokeWidth={4} />
      <Line d="M288 172 v8" w={2} />
      <Line d="M50 70 q12 -10 24 0 M290 60 q10 -8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function DrownedCaptain() {
  return (
    <Drawing label="Drawing of a captain in a tricorn hat with a tentacled face, hand on a treasure chest">
      <Shape d="M120 70 L160 40 H240 L280 70 L240 62 H160 Z" />
      <Shape d="M160 62 H240 C250 110 230 130 200 132 C170 130 150 110 160 62 Z" />
      <Dot x={182} y={86} r={5} />
      <Dot x={218} y={86} r={5} />
      <Line d="M180 116 C170 150 150 160 146 180 M192 122 C190 156 182 176 172 190 M208 122 C212 156 222 176 234 188 M220 116 C230 150 250 160 256 178" w={5} />
      <Line d="M176 120 q-4 10 4 12 M224 120 q4 10 -4 12" w={3} />
      <Shape d="M150 134 L130 224 H270 L250 134 Z" />
      <Line d="M170 150 H230 M200 134 V224" w={3} />
      <Shape d="M270 170 H350 V224 H270 Z" w={4} />
      <Shape d="M268 170 C268 150 352 150 352 170 Z" w={4} />
      <Line d="M240 150 L270 170" />
      <Dot x={310} y={200} r={5} />
      <Line d="M60 60 q8 -10 18 -2 M80 100 q10 -6 18 2 M50 160 q8 -6 16 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function GaslampSpecter() {
  return (
    <Drawing label="Drawing of a pale figure in a bowler hat standing beside a gas lamp in fog">
      <Line d="M300 224 V50" w={6} />
      <Shape d="M284 50 L292 20 H308 L316 50 Z" w={4} />
      <Line d="M300 34 V44" w={3} />
      <Line d="M270 30 l-14 -6 M330 30 l14 -6 M268 56 l-16 4 M332 56 l16 4" w={3} />
      <Shape d="M168 64 C168 36 232 36 232 64 Z" />
      <Line d="M150 64 H250" w={6} />
      <Shape d="M174 70 H226 V104 C226 122 174 122 174 104 Z" />
      <Line d="M184 84 h8 M208 84 h8" w={4} />
      <Line d="M190 106 H210" w={3} />
      <Shape d="M166 126 H234 L242 200 H158 Z" />
      <Line d="M200 126 V200 M184 126 l16 18 l16 -18" w={3} />
      <Line d="M166 134 L140 170 M234 134 L262 168" w={5} />
      <Line d="M180 200 V214 M220 200 V214" w={6} />
      <Line d="M30 190 q20 -10 40 0 t40 0 M240 200 q20 -10 40 0 t40 0 M60 218 q20 -10 40 0 t40 0 t40 0 t40 0" w={3} dash="8 8" />
    </Drawing>
  );
}

export const fantasyArtDK: Record<string, () => ReactNode> = {
  "haunted-doll": HauntedDoll,
  "ghost-galleon": GhostGalleon,
  "giant-spider": GiantSpider,
  "horned-jackrabbit": HornedJackrabbit,
  "dream-cat": DreamCat,
  goblin: Goblin,
  "grandpa-giant": GrandpaGiant,
  "errant-knight": ErrantKnight,
  "greenwood-archer": GreenwoodArcher,
  hexmaster: Hexmaster,
  "dusk-enchantress": DuskEnchantress,
  "hooded-headsman": HoodedHeadsman,
  "iron-warlord": IronWarlord,
  "hollow-thrall": HollowThrall,
  "frost-king": FrostKing,
  "grave-clerk": GraveClerk,
  dragon: Dragon,
  "jelly-block": JellyBlock,
  "great-roc": GreatRoc,
  "hull-crusher": HullCrusher,
  "giggle-sprite": GiggleSprite,
  "grave-knight": GraveKnight,
  hellspawn: Hellspawn,
  "haunted-sheriff": HauntedSheriff,
  ghoul: Ghoul,
  "gallows-tree": GallowsTree,
  "grave-imp": GraveImp,
  "hearth-spirit": HearthSpirit,
  "ferryman-of-souls": FerrymanOfSouls,
  "drowned-captain": DrownedCaptain,
  "gaslamp-specter": GaslampSpecter,
};
