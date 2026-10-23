import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../core/artStyle";

const card = CARD_COLOR;

function LivingArmor() {
  return (
    <Drawing label="Drawing of an empty suit of plate armor with a glowing gap in the helmet, clanking forward">
      <Shape d="M166 90 C164 36 236 36 234 90 V100 H166 Z" />
      <Line d="M176 74 H224" w={4} />
      <Dot x={190} y={74} r={2} />
      <Dot x={210} y={74} r={2} />
      <Line d="M200 40 V22 M200 22 Q220 16 230 30" w={4} />
      <Shape d="M130 108 L160 100 H240 L270 108 L262 124 H138 Z" w={4} />
      <Shape d="M148 124 H252 L244 178 H156 Z" />
      <Line d="M200 124 V178 M160 150 H240" w={3} />
      <Shape d="M156 178 H244 L252 200 H148 Z" w={4} />
      <Shape d="M134 118 L112 170 L132 176 L146 130 Z" w={4} />
      <Shape d="M266 118 L288 170 L268 176 L254 130 Z" w={4} />
      <Shape d="M160 200 H190 L186 224 H152 Z M210 200 H240 L248 224 H214 Z" w={4} />
      <Line d="M90 150 l-18 4 M92 170 l-16 8 M310 150 l18 4 M308 170 l16 8" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function MossTortoise() {
  return (
    <Drawing label="Drawing of a huge mossy tortoise with a small village on its shell">
      <Shape d="M60 190 C60 90 320 90 340 190 Z" />
      <Line d="M110 150 q20 -10 40 0 M180 126 q22 -10 44 0 M250 150 q20 -10 40 0 M90 176 q20 -10 40 0" w={3} />
      <Shape d="M130 112 V90 L146 76 L162 90 V112" w={3} />
      <Shape d="M190 100 V70 L210 52 L230 70 V100" w={3} />
      <Shape d="M258 114 V94 L272 82 L286 94 V114" w={3} />
      <Line d="M138 112 V102 H154 V112 M202 100 V86 H218 V100" w={2} />
      <Line d="M210 52 V38 M210 38 l12 4 l-12 4" w={3} />
      <Shape d="M330 160 C350 150 376 156 380 176 C380 196 350 200 332 192 Z" />
      <Dot x={360} y={170} r={3} />
      <Line d="M350 188 q10 4 18 -2" w={3} />
      <Shape d="M60 190 H340 L330 206 H70 Z" w={4} />
      <Shape d="M90 206 H130 V224 H90 Z M270 206 H310 V224 H270 Z" w={4} />
      <Line d="M70 200 l-30 4 l12 -14" w={4} />
      <Line d="M140 130 q-4 6 0 10 M300 150 q4 6 0 10 M110 176 q-4 6 0 10" w={2} />
    </Drawing>
  );
}

function MountainMammoth() {
  return (
    <Drawing label="Drawing of a shaggy mammoth with huge curved tusks on a snowy mountainside">
      <Shape d="M60 200 C40 130 80 80 160 76 C230 72 290 90 300 150 L300 200 Z" />
      <Shape d="M270 130 C250 80 290 50 330 60 C370 74 372 130 350 150 C340 170 300 168 270 130 Z" />
      <Dot x={318} y={92} r={4} />
      <Shape d="M340 140 C350 200 340 214 322 212 C316 200 320 180 324 160 Z" w={4} />
      <Shape d="M300 150 C330 150 360 160 380 120 C376 170 340 190 300 180 Z" w={4} />
      <Line d="M296 152 C280 184 260 192 260 212" w={5} />
      <Line d="M80 80 q12 8 4 24 M120 70 q12 8 4 26 M160 70 q12 8 4 24 M200 72 q12 8 4 24 M240 82 q12 8 4 22" w={3} />
      <Line d="M90 140 q10 20 0 50 M140 150 q10 20 0 44 M200 150 q10 20 0 44" w={3} />
      <Line d="M90 200 V224 M150 200 V224 M210 200 V224 M290 200 V224" w={9} />
      <Line d="M20 224 L60 190 L90 224 M330 224 L360 196 L384 224" w={3} />
      <Line d="M40 40 l6 8 M60 28 l2 10 M360 30 l-6 10" w={3} />
    </Drawing>
  );
}

function Orc() {
  return (
    <Drawing label="Drawing of a scarred orc with tusks, mismatched armor and an axe">
      <Shape d="M156 86 C150 34 250 34 244 86 C250 114 150 114 156 86 Z" />
      <Line d="M170 70 L192 76 M230 70 L208 76" w={5} />
      <Dot x={184} y={82} r={4} />
      <Dot x={216} y={82} r={4} />
      <Line d="M180 100 H220" w={4} />
      <Solid d="M180 100 L174 86 L184 98 Z M220 100 L226 86 L216 98 Z" />
      <Line d="M204 44 l-8 20" w={3} />
      <Shape d="M140 124 C150 108 250 108 260 124 L252 186 H148 Z" />
      <Shape d="M130 116 L158 108 L156 134 L128 138 Z M270 116 L242 108 L244 134 L272 138 Z" w={4} />
      <Line d="M200 120 V186 M160 150 H240" w={3} />
      <Line d="M148 186 L142 224 M252 186 L258 224" w={9} />
      <Line d="M138 130 L110 164 M262 130 L300 150" w={7} />
      <Line d="M300 150 L330 40" w={5} />
      <Shape d="M320 50 C350 30 376 40 372 80 C350 70 336 74 328 86 Z" w={4} />
    </Drawing>
  );
}

function Ogre() {
  return (
    <Drawing label="Drawing of a lumbering ogre swinging a club made from a small tree">
      <Shape d="M160 80 C150 30 250 30 240 80 C250 112 150 112 160 80 Z" />
      <Dot x={184} y={72} r={4} />
      <Dot x={216} y={72} r={4} />
      <Line d="M170 62 L194 68 M230 62 L206 68" w={4} />
      <Line d="M190 98 Q200 106 210 98" w={3} />
      <Solid d="M186 100 l3 6 l3 -6 Z M208 100 l3 6 l3 -6 Z" />
      <Shape d="M120 120 C130 104 270 104 280 120 C300 170 270 210 250 214 H150 C130 210 100 170 120 120 Z" />
      <Line d="M170 160 q30 18 60 0" w={3} />
      <Line d="M130 126 L96 150 L100 110" w={8} />
      <Line d="M270 126 L310 140" w={8} />
      <Line d="M320 150 L338 20" w={7} />
      <Line d="M330 70 L300 56 M332 56 L360 40 M336 36 L310 22" w={4} />
      <Shape d="M300 20 C300 4 380 4 376 22 C370 40 310 40 300 20 Z" w={3} />
      <Line d="M170 214 V228 M230 214 V228" w={9} />
    </Drawing>
  );
}

function LegendaryChampion() {
  return (
    <Drawing label="Drawing of a scarred, cloaked hero with a great sword planted point-down, and ballad notes in the air">
      <Shape d="M156 90 C154 40 246 40 244 90 C244 112 156 112 156 90 Z" />
      <Line d="M180 66 L196 82 M178 82 L196 66" w={3} />
      <Dot x={212} y={76} r={4} />
      <Line d="M192 98 H214" w={4} />
      <Shape d="M130 100 L170 112 H230 L270 100 L300 220 H100 Z" />
      <Shape d="M168 112 H232 V186 H168 Z" w={4} />
      <Line d="M200 112 V186 M168 150 H232" w={3} />
      <Line d="M190 130 l8 12 M214 160 l6 8" w={3} />
      <Line d="M150 140 L130 190 M250 140 L270 180" w={6} />
      <Line d="M200 26 V200" w={6} />
      <Line d="M180 130 H220" w={7} />
      <Solid d="M194 200 H206 L200 214 Z" />
      <Line d="M326 40 v28 M326 68 q-12 4 -12 -4 q0 -8 12 -4 M350 56 v22 M350 78 q-10 4 -10 -3 q0 -7 10 -3" w={3} />
      <Line d="M50 60 v18 M50 78 q-10 4 -10 -3 q0 -6 10 -3" w={3} />
    </Drawing>
  );
}

function Owlbear() {
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

function MountainDinosaur() {
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

function PuffDragon() {
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

function MountainGriffin() {
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

function PipeWyrm() {
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

function MushroomMayor() {
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

function Moonhorn() {
  return (
    <Drawing label="Drawing of a white steed with a single horn and a crescent moon, daisies in its hoofprints">
      <path d="M330 30 a28 28 0 1 0 28 28 a20 20 0 1 1 -28 -28 Z" fill="currentColor" />
      <Shape d="M90 190 C70 140 120 110 190 116 C250 120 280 146 270 190 Z" />
      <Shape d="M240 128 C240 90 250 60 270 46 L300 60 C300 90 292 120 280 140 Z" />
      <Shape d="M262 46 C262 30 290 24 304 40 C320 52 330 66 322 82 C312 88 296 76 290 64 Z" />
      <Dot x={288} y={52} r={3} />
      <Line d="M294 30 L306 4" w={4} />
      <Line d="M280 46 C262 60 252 80 254 110" w={4} dash="3 6" />
      <Line d="M90 168 C50 168 40 140 56 120" w={5} />
      <Line d="M110 190 V218 M150 190 V218 M230 190 V218 M260 190 V218" w={7} />
      <circle cx="120" cy="226" r="4" fill="none" {...ink} strokeWidth={2} />
      <circle cx="170" cy="226" r="4" fill="none" {...ink} strokeWidth={2} />
      <circle cx="250" cy="226" r="4" fill="none" {...ink} strokeWidth={2} />
      <Line d="M30 224 H370" w={2} dash="2 10" />
    </Drawing>
  );
}

function PocketSprite() {
  return (
    <Drawing label="Drawing of a tiny prankster peeking out of a big pocket, holding a stolen button">
      <Shape d="M60 110 H340 V220 H60 Z" />
      <Line d="M60 130 H340" w={3} dash="6 6" />
      <Shape d="M60 110 H340 V130 H60 Z" w={4} />
      <Line d="M82 150 H318 M82 150 V200 H318" w={2} dash="2 6" />
      <Shape d="M174 100 C174 56 226 56 226 100 Z" />
      <Shape d="M174 74 L152 46 L186 62 Z M226 74 L248 46 L214 62 Z" w={4} />
      <Dot x={190} y={86} r={4} />
      <Dot x={210} y={86} r={4} />
      <Line d="M186 98 Q200 106 214 98" w={3} />
      <Line d="M178 108 L140 90 L136 70 M222 108 L262 84" w={5} />
      <circle cx="136" cy="62" r="12" fill={card} {...ink} strokeWidth={4} />
      <Dot x={132} y={59} r={1.5} />
      <Dot x={140} y={59} r={1.5} />
      <Dot x={132} y={65} r={1.5} />
      <Dot x={140} y={65} r={1.5} />
      <Line d="M290 40 l8 8 M310 60 l10 2 M70 54 l-8 8" w={3} />
      <Shape d="M290 170 q10 -8 20 0 q-10 8 -20 0 Z" w={3} />
      <circle cx="260" cy="180" r="10" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export const fantasyArtLP: Record<string, () => ReactNode> = {
  "living-armor": LivingArmor,
  "moss-tortoise": MossTortoise,
  "mountain-mammoth": MountainMammoth,
  orc: Orc,
  ogre: Ogre,
  "legendary-champion": LegendaryChampion,
  owlbear: Owlbear,
  "mountain-dinosaur": MountainDinosaur,
  "puff-dragon": PuffDragon,
  "mountain-griffin": MountainGriffin,
  "pipe-wyrm": PipeWyrm,
  "mushroom-mayor": MushroomMayor,
  moonhorn: Moonhorn,
  "pocket-sprite": PocketSprite,
};
