import { Dot, Drawing, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function Moonhorn() {
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

export function PocketSprite() {
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
