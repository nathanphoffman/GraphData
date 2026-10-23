import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function ErrantKnight() {
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

export function GreenwoodArcher() {
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

export function Hexmaster() {
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

export function DuskEnchantress() {
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

export function HoodedHeadsman() {
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

export function IronWarlord() {
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

export function HollowThrall() {
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
