import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function Owlbear() {
  return (
    <Drawing label="Drawing of a feathered bear with an owl's head and a hatchet beak, rearing up with claws out">
      <Shape d="M130 120 C110 170 130 214 170 220 H230 C270 214 290 170 270 120 C250 100 150 100 130 120 Z" />
      <Line d="M150 150 l10 8 l10 -8 M180 160 l10 8 l10 -8 M210 150 l10 8 l10 -8 M170 190 l10 8 l10 -8" w={3} />
      <Shape d="M156 76 C150 24 250 24 244 76 C250 106 150 106 156 76 Z" />
      <Shape d="M160 40 L150 18 L180 32 Z M240 40 L250 18 L220 32 Z" w={4} />
      <circle cx="180" cy="66" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="220" cy="66" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={180} y={66} r={5} />
      <Dot x={220} y={66} r={5} />
      <Shape d="M190 76 L210 76 L200 106 Z" w={4} />
      <Line d="M140 130 L96 100 M260 130 L304 100" w={9} />
      <Line d="M96 100 l-14 -12 M96 100 l-18 2 M96 100 l-10 14 M304 100 l14 -12 M304 100 l18 2 M304 100 l10 14" w={4} />
      <Line d="M160 220 V228 M240 220 V228" w={10} />
    </Drawing>
  );
}

export function MountainDinosaur() {
  return (
    <Drawing label="Drawing of a mountain-sized spiked and horned dinosaur lying among peaks">
      <Line d="M10 224 L60 150 L110 224 M270 224 L330 160 L380 224" w={3} />
      <Shape d="M40 200 C30 150 90 110 170 106 C250 100 300 120 310 170 L300 200 Z" />
      <Solid d="M80 124 L92 84 L106 118 Z M122 112 L136 66 L150 108 Z M168 104 L182 60 L196 104 Z M214 106 L228 66 L240 110 Z M256 114 L268 80 L280 120 Z" />
      <Shape d="M290 140 C300 100 340 90 366 110 L384 130 L356 144 C340 160 300 164 290 140 Z" />
      <Solid d="M326 104 L334 70 L346 104 Z M350 108 L368 82 L366 114 Z" />
      <Dot x={348} y={120} r={4} />
      <Line d="M340 142 l4 8 l6 -8 l6 8 l6 -8" w={3} />
      <Line d="M110 200 V224 M240 200 V224" w={14} />
      <Line d="M40 190 C20 190 10 170 24 156" w={7} />
      <Line d="M60 224 q10 -6 20 0 M290 224 q10 -6 20 0" w={3} />
      <Line d="M130 88 q8 -8 16 0 M160 70 q8 -8 16 0" w={2} />
    </Drawing>
  );
}

export function PuffDragon() {
  return (
    <Drawing label="Drawing of a tiny sparkly dragon curled up in a hat, sneezing a small flame">
      <Shape d="M60 170 H300 L270 150 C260 100 110 100 100 150 Z" />
      <Line d="M52 176 H308" w={7} />
      <Shape d="M130 150 C124 110 160 90 190 100 C210 106 214 130 206 150 Z" />
      <Shape d="M190 100 C196 80 220 68 240 76 C256 78 270 90 268 104 C260 118 220 120 206 112 Z" />
      <Dot x={238} y={88} r={3} />
      <Line d="M206 82 L210 64 M222 76 L228 60" w={4} />
      <Line d="M138 112 L124 82 L150 96 L152 66 L168 98" w={4} />
      <Shape d="M268 102 C284 96 292 108 284 116 C296 112 296 124 280 124 C268 124 266 112 268 102 Z" w={3} />
      <Line d="M300 90 l10 -6 M304 104 l12 0 M298 118 l10 6" w={3} />
      <Line d="M80 120 v10 M75 125 h10 M310 50 v10 M305 55 h10 M60 70 v8 M56 74 h8 M110 54 v8 M106 58 h8" w={3} />
      <Line d="M150 150 q-20 -6 -30 8" w={4} />
    </Drawing>
  );
}

export function MountainGriffin() {
  return (
    <Drawing label="Drawing of a lion-bodied, eagle-headed griffin with spread wings perched on a cliff top, a coin at its feet">
      <Shape d="M20 224 L60 190 H340 L380 224 Z" w={4} />
      <Shape d="M110 180 C100 130 160 110 220 120 C260 126 270 160 260 184 Z" />
      <Shape d="M150 130 C130 90 100 50 60 40 C80 70 76 90 90 110 C70 100 64 108 60 120 C100 132 130 140 160 144 Z" />
      <Shape d="M190 120 C210 80 250 40 290 30 C280 56 280 80 270 104 C282 100 290 106 292 116 C260 124 230 128 210 130 Z" />
      <Shape d="M230 126 C220 90 240 66 270 70 C296 74 300 100 290 112 L290 124 C270 128 240 134 230 126 Z" />
      <Shape d="M290 82 L330 92 L292 104 Z" w={4} />
      <Dot x={266} y={86} r={4} />
      <Line d="M240 70 L236 50 M256 66 L260 46" w={4} />
      <Line d="M120 176 V196 M160 182 V196 M230 184 V196 M250 184 V196" w={8} />
      <Line d="M112 160 C70 164 60 130 84 120" w={5} />
      <circle cx="320" cy="206" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M320 200 v12" w={2} />
    </Drawing>
  );
}

export function PipeWyrm() {
  return (
    <Drawing label="Drawing of a coiling dragon made from pipes, gears and a boiler with a glowing furnace chest">
      <Line d="M30 200 C30 150 110 150 110 190 C110 224 190 224 190 180 C190 130 270 130 270 170" w={14} />
      <Line d="M30 200 C30 150 110 150 110 190 C110 224 190 224 190 180 C190 130 270 130 270 170" w={6} />
      <Shape d="M260 160 C250 110 290 70 330 80 C360 88 366 120 350 138 C330 150 300 160 290 170 Z" />
      <Shape d="M310 74 L350 56 L346 90 Z" w={4} />
      <Dot x={338} y={106} r={4} />
      <Line d="M350 130 l8 6 l-2 -10" w={3} />
      <circle cx="160" cy="130" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M160 112 V122 M160 138 V148 M142 130 H152 M168 130 H178" w={4} />
      <circle cx="160" cy="130" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="220" cy="110" r="16" fill={card} {...ink} strokeWidth={3} />
      <Line d="M220 98 V104 M220 116 V122 M208 110 H214 M226 110 H232" w={3} />
      <Shape d="M60 120 H110 V150 H60 Z" w={4} />
      <Line d="M72 120 V100 M72 100 q-8 -14 4 -24 M96 120 V104 M96 104 q-8 -14 4 -22" w={4} />
      <Solid d="M300 96 C294 110 304 118 310 128 C318 114 310 104 300 96 Z" />
      <Ground y={228} />
    </Drawing>
  );
}

export function MushroomMayor() {
  return (
    <Drawing label="Drawing of a round little mushroom wearing a mayor's sash, with parade streamers and confetti">
      <Shape d="M110 110 C110 30 290 30 290 110 Z" />
      <circle cx="160" cy="76" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="236" cy="60" r="12" fill="none" {...ink} strokeWidth={3} />
      <circle cx="260" cy="94" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="200" cy="96" r="6" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M160 110 H240 C250 150 240 200 230 212 H170 C160 200 150 150 160 110 Z" />
      <Dot x={184} y={140} r={4} />
      <Dot x={216} y={140} r={4} />
      <Line d="M184 160 Q200 174 216 160" w={4} />
      <Line d="M160 118 L244 202" w={14} />
      <Line d="M160 118 L244 202" w={8} />
      <Line d="M162 150 L130 120 M238 150 L270 120" w={5} />
      <Line d="M170 212 V224 M230 212 V224" w={7} />
      <Line d="M60 40 L110 80 M340 40 L290 80" w={3} dash="4 5" />
      <Line d="M50 130 l8 -4 M338 154 l10 4 M60 190 l10 4 M332 210 l8 -6 M310 30 l4 8 M90 24 l-4 8" w={4} />
    </Drawing>
  );
}
