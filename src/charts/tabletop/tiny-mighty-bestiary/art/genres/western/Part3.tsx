import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Hat } from "./Part1";

const card = CARD_COLOR;

export function PrairieSkyray() {
  return (
    <Drawing label="Drawing of a flat kite-shaped ray gliding above the plains with a whip-like tail">
      <Shape d="M200 20 L330 110 L200 130 L70 110 Z" />
      <Line d="M200 20 L200 130 M120 66 L200 100 L280 66" w={3} />
      <Dot x={180} y={90} r={4} />
      <Dot x={220} y={90} r={4} />
      <Line d="M190 112 q10 6 20 0" w={3} />
      <Line d="M200 130 C220 160 180 180 210 200 C230 214 270 200 290 212 l14 -8 l-4 16" w={4} />
      <Line d="M300 214 l20 -6 M300 214 l16 10" w={3} />
      <Line d="M30 200 H370" w={3} dash="2 10" />
      <Line d="M40 190 q6 -10 12 0 M70 196 q6 -10 12 0 M320 190 q6 -10 12 0" w={3} />
      <Line d="M60 60 q14 -8 28 0 q14 -8 28 0 M290 30 q14 -8 28 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function MaskHunter() {
  return (
    <Drawing label="Drawing of a lone armored figure in a mask with a jetpack and a wrist rocket">
      <Shape d="M150 100 L122 150 L132 190 L150 150 Z M250 100 L278 150 L268 190 L250 150 Z" w={4} />
      <Line d="M130 190 l-6 14 M270 190 l6 14" w={4} />
      <Line d="M126 206 q-4 12 0 20 M274 206 q4 12 0 20" w={3} dash="2 4" />
      <Shape d="M168 72 C160 26 240 26 232 72 L228 104 H172 Z" />
      <Shape d="M176 62 H224 V86 H176 Z" w={4} />
      <Line d="M184 74 H216" w={4} />
      <Line d="M200 62 V86" w={2} />
      <Shape d="M148 108 H252 L260 190 H140 Z" />
      <Line d="M200 108 V190 M150 150 H250" w={3} />
      <Shape d="M144 190 H196 V224 H144 Z M204 190 H256 V224 H204 Z" w={4} />
      <Line d="M150 114 L112 160 M250 114 L290 130" w={8} />
      <Shape d="M282 118 H330 V140 H282 Z" w={4} />
      <Solid d="M330 120 L350 129 L330 138 Z" />
      <Line d="M360 124 l16 -6 M360 134 l18 6" w={3} />
      <Shape d="M236 150 H262 V176 H236 Z" w={3} />
    </Drawing>
  );
}

export function QuickdrawOutlaw() {
  return (
    <Drawing label="Drawing of a hat-wearing stranger with two revolvers at his hips and jingling spurs">
      <Hat y={64} w={54} />
      <Shape d="M170 68 H230 V106 C230 124 170 124 170 106 Z" />
      <Line d="M184 86 H194 M206 86 H216" w={4} />
      <Line d="M188 106 H212" w={3} />
      <Shape d="M150 122 H250 L258 200 H142 Z" />
      <Line d="M200 122 V200" w={3} />
      <Line d="M150 190 H250" w={7} />
      <Shape d="M110 190 H140 L136 218 H114 Z M260 190 H290 L286 218 H264 Z" w={3} />
      <Line d="M156 130 L122 176 M244 130 L278 176" w={7} />
      <Line d="M120 176 L108 192 M280 176 L292 192" w={5} />
      <Solid d="M92 192 L112 186 L116 200 L98 204 Z" />
      <Solid d="M290 188 L310 194 L306 206 L288 200 Z" />
      <Shape d="M160 200 H196 V226 H160 Z M204 200 H240 V226 H204 Z" w={4} />
      <Line d="M152 230 l-10 -2 M248 230 l10 -2" w={5} />
      <circle cx="138" cy="230" r="5" fill="none" {...ink} strokeWidth={3} />
      <circle cx="262" cy="230" r="5" fill="none" {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function BanditChief() {
  return (
    <Drawing label="Drawing of a grinning dust-coated bandit leader with a gold tooth and a bandana, with a train in the background">
      <Line d="M10 200 H390" w={3} />
      <Shape d="M270 150 H380 V200 H270 Z" w={3} />
      <Line d="M290 130 V150 M310 130 V150" w={5} />
      <circle cx="290" cy="206" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="350" cy="206" r="8" fill={card} {...ink} strokeWidth={3} />
      <Hat y={64} w={56} />
      <Shape d="M170 68 H230 V106 C230 124 170 124 170 106 Z" />
      <Shape d="M170 90 H230 V108 C230 124 170 124 170 108 Z" w={4} />
      <Dot x={186} y={80} r={3} />
      <Dot x={214} y={80} r={3} />
      <Line d="M180 74 L194 78 M220 74 L206 78" w={3} />
      <path d="M190 108 L198 100 L204 108" fill="none" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <Shape d="M150 124 H250 L260 214 H140 Z" />
      <Line d="M200 124 V214 M150 180 H250" w={3} />
      <Line d="M156 130 L120 170 M244 130 L280 100 L292 70" w={7} />
      <circle cx="298" cy="60" r="12" fill={card} {...ink} strokeWidth={4} />
      <Line d="M298 54 v12" w={2} />
      <Line d="M60 80 q10 -8 20 0 M80 120 q10 -8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function DoomsdayPreacher() {
  return (
    <Drawing label="Drawing of a gaunt revival preacher raising a battered Bible, with a calendar showing a circled date">
      <Shape d="M166 74 C162 28 238 28 234 74 C234 100 166 100 166 74 Z" />
      <circle cx="186" cy="68" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="68" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={68} r={2} />
      <Dot x={214} y={68} r={2} />
      <Line d="M190 90 q10 -6 20 0" w={3} />
      <Line d="M176 46 q24 -14 48 0" w={4} />
      <Shape d="M150 100 H250 L276 224 H124 Z" />
      <Line d="M200 100 V224" w={3} />
      <Shape d="M182 100 L200 120 L218 100 Z" w={3} />
      <Line d="M240 110 L286 90 L290 56" w={6} />
      <Shape d="M268 22 H316 V60 H268 Z" w={4} />
      <Line d="M292 22 V60 M276 34 H286 M298 34 H308" w={3} />
      <Line d="M160 110 L130 150 L152 164" w={6} />
      <Shape d="M40 40 H110 V110 H40 Z" w={4} />
      <Line d="M40 58 H110" w={3} />
      <circle cx="82" cy="86" r="14" fill="none" {...ink} strokeWidth={3} />
      <Line d="M50 70 h4 M60 70 h4 M70 70 h4 M50 86 h4 M60 86 h4 M50 100 h4 M60 100 h4 M70 100 h4" w={3} />
      <Line d="M250 170 q8 -6 14 2" w={3} dash="2 5" />
    </Drawing>
  );
}

export function SaloonBrawler() {
  return (
    <Drawing label="Drawing of a bearded hatless man with raised fists, standing in a pair of swinging saloon doors">
      <Line d="M60 224 V40 M340 224 V40" w={7} />
      <Shape d="M60 100 H120 V224 H60 Z M280 100 H340 V224 H280 Z" w={4} />
      <Line d="M72 120 H108 M72 140 H108 M72 160 H108 M72 180 H108 M292 120 H328 M292 140 H328 M292 160 H328 M292 180 H328" w={2} />
      <Shape d="M168 72 C160 26 240 26 232 72 C238 102 162 102 168 72 Z" />
      <Line d="M172 44 q28 -14 56 0" w={3} />
      <Dot x={186} y={68} r={3} />
      <Dot x={214} y={68} r={3} />
      <Line d="M180 56 l12 4 M220 56 l-12 4" w={3} />
      <Shape d="M168 78 C160 120 180 140 200 142 C220 140 240 120 232 78 C216 92 184 92 168 78 Z" />
      <Line d="M188 98 Q200 106 212 98" w={3} />
      <Shape d="M156 142 H244 L252 210 H148 Z" />
      <Line d="M200 142 V210" w={3} />
      <Line d="M158 150 L134 112 L156 96 M242 150 L266 112 L244 96" w={9} />
      <circle cx="154" cy="92" r="12" fill={card} {...ink} strokeWidth={4} />
      <circle cx="246" cy="92" r="12" fill={card} {...ink} strokeWidth={4} />
      <Line d="M172 210 V226 M228 210 V226" w={8} />
    </Drawing>
  );
}
