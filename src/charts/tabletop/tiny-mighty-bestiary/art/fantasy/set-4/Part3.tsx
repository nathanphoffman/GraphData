import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function TollTroll() {
  return (
    <Drawing label="Drawing of a mossy troll in a fancy hat with a ledger, blocking a bridge">
      <Shape d="M20 190 Q200 130 380 190 V204 H20 Z" />
      <Line d="M80 176 V204 M140 162 V204 M200 156 V204 M260 162 V204 M320 176 V204" w={4} />
      <Shape d="M160 64 L170 20 H230 L240 64 Z" />
      <Line d="M148 66 H252" w={6} />
      <Line d="M170 40 H230" w={4} />
      <Shape d="M166 70 C160 110 240 110 234 70 Z" />
      <Dot x={186} y={80} r={4} />
      <Dot x={214} y={80} r={4} />
      <Line d="M190 96 H210" w={3} />
      <Line d="M170 100 l-4 16 M184 106 l-2 16 M200 108 v18 M216 106 l2 16 M230 100 l4 16" w={3} />
      <Shape d="M132 124 C140 114 260 114 268 124 L276 192 H124 Z" />
      <Line d="M160 142 q10 10 0 20 M240 142 q-10 10 0 20" w={3} />
      <Line d="M140 130 L110 160 M262 130 L296 150" w={8} />
      <Shape d="M290 130 H330 V176 H290 Z" w={4} />
      <Line d="M298 142 H322 M298 152 H322 M298 162 H316" w={2} />
      <Ground y={226} />
    </Drawing>
  );
}

export function StoneGazer() {
  return (
    <Drawing label="Drawing of a woman with living snakes for hair and a statue of a warrior at her feet">
      <Shape d="M156 100 C150 40 250 40 244 100 C240 128 160 128 156 100 Z" />
      <Line d="M156 70 C120 70 110 40 130 28 C146 22 150 40 138 44 M244 70 C280 70 290 40 270 28 C254 22 250 40 262 44 M170 52 C160 20 190 8 196 28 M230 52 C240 20 210 8 204 28 M200 46 C190 20 210 14 212 0" w={5} />
      <Solid d="M122 30 l-6 -6 l10 -2 Z M278 30 l6 -6 l-10 -2 Z M190 24 l-6 -6 l10 0 Z M212 22 l6 -6 l-10 0 Z" />
      <circle cx="184" cy="88" r="12" fill={card} {...ink} strokeWidth={4} />
      <circle cx="216" cy="88" r="12" fill={card} {...ink} strokeWidth={4} />
      <Dot x={184} y={88} r={5} />
      <Dot x={216} y={88} r={5} />
      <Line d="M186 112 Q200 120 214 112" w={3} />
      <Shape d="M162 132 H238 L260 224 H140 Z" />
      <Line d="M200 132 V224" w={3} />
      <Line d="M165 140 L128 170 M235 140 L270 170" w={6} />
      <Shape d="M300 224 V150 Q300 130 320 130 Q340 130 340 150 V224 Z" w={4} />
      <Line d="M312 160 H328 M320 160 V190" w={3} />
      <Line d="M300 120 l-12 -8 M340 120 l12 -8" w={3} />
    </Drawing>
  );
}

export function SpikedHodag() {
  return (
    <Drawing label="Drawing of a grinning toad-headed monster with a spiked back">
      <Shape d="M60 200 C50 140 110 110 190 112 C260 114 300 140 292 200 Z" />
      <Solid d="M96 124 L106 84 L120 118 Z M136 114 L148 72 L162 112 Z M178 110 L190 66 L204 110 Z M220 114 L232 76 L244 118 Z M256 124 L268 92 L276 130 Z" />
      <Shape d="M262 150 C250 106 290 84 334 96 C368 108 372 156 340 170 C310 180 270 176 262 150 Z" />
      <circle cx="288" cy="98" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="326" cy="100" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={290} y={98} r={5} />
      <Dot x={328} y={100} r={5} />
      <Line d="M276 150 Q316 172 352 148" w={4} />
      <Line d="M290 156 v8 M304 162 v8 M318 164 v8 M332 160 v8" w={3} />
      <Line d="M296 124 l2 4 M320 124 l2 4" w={3} />
      <Line d="M100 200 V224 M130 202 V224 M240 202 V224 M270 200 V224" w={10} />
      <Line d="M60 180 C30 190 20 160 34 146" w={6} />
      <Ground y={228} />
    </Drawing>
  );
}

export function SugarWyrm() {
  return (
    <Drawing label="Drawing of a dragon with gumdrop scales, a licorice tail and spun-sugar wings">
      <Shape d="M130 140 C120 70 180 50 220 66 C240 40 280 40 296 60 L344 66 L304 80 C300 104 280 120 250 120 C240 150 200 170 160 170 Z" />
      <Shape d="M150 100 C100 60 60 20 30 30 C40 60 36 80 44 104 C20 100 20 120 30 134 C70 134 120 126 150 120 Z" />
      <Dot x={278} y={64} r={4} />
      <Line d="M250 48 l4 -16 M268 44 l8 -14" w={4} />
      <circle cx="180" cy="110" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="200" cy="130" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="224" cy="100" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="160" cy="140" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M150 150 C110 170 110 210 70 206 C40 202 40 224 70 226" w={8} />
      <Line d="M170 168 V210 M236 140 V210" w={9} />
      <Shape d="M60 224 q10 -16 24 -8 q14 -14 28 0 q16 -8 24 8 Z" w={3} />
      <Shape d="M290 224 q10 -16 24 -8 q14 -14 28 0 q16 -8 24 8 Z" w={3} />
      <Line d="M340 50 v10 M335 55 h10 M100 40 v8 M96 44 h8" w={3} />
    </Drawing>
  );
}

export function VainWyrm() {
  return (
    <Drawing label="Drawing of a jewel-covered dragon admiring himself in a hand mirror">
      <Shape d="M120 200 C100 130 150 90 210 96 C260 100 280 140 270 200 Z" />
      <Shape d="M140 120 C100 80 50 60 24 70 C40 90 34 110 46 130 C80 130 110 132 140 140 Z" />
      <Shape d="M220 100 C220 60 260 40 290 52 C316 54 332 70 330 84 L350 98 L316 100 C300 116 250 120 232 110 Z" />
      <Dot x={296} y={70} r={4} />
      <Line d="M268 54 L270 34 M286 50 L296 32" w={4} />
      <Solid d="M180 130 l10 -12 l10 12 l-10 14 Z" />
      <Solid d="M224 150 l8 -10 l8 10 l-8 12 Z" />
      <Solid d="M150 160 l8 -10 l8 10 l-8 12 Z" />
      <Line d="M190 100 l4 8 M230 116 l4 6 M170 180 l4 6" w={3} />
      <Line d="M268 150 L320 128" w={6} />
      <circle cx="338" cy="116" r="24" fill={card} {...ink} strokeWidth={5} />
      <Line d="M324 108 q8 -8 18 -4" w={3} />
      <Line d="M100 200 V224 M160 202 V224 M230 202 V224 M262 200 V224" w={9} />
      <Line d="M110 60 l-6 -10 M126 50 l0 -12 M142 54 l8 -10 M300 26 l6 -10" w={3} />
    </Drawing>
  );
}

export function Shellback() {
  return (
    <Drawing label="Drawing of a barnacle-crusted sea creature looking like a reef, with one snapping jaw open">
      <Line d="M10 150 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Shape d="M50 200 C40 150 100 120 180 124 C250 126 300 150 300 200 Z" />
      <circle cx="100" cy="160" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="140" cy="146" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="190" cy="152" r="9" fill="none" {...ink} strokeWidth={3} />
      <circle cx="240" cy="156" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="120" cy="184" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="220" cy="182" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M70 140 l-6 -16 l14 6 M170 126 l-4 -18 l12 10 M260 136 l4 -16 l8 14" w={4} />
      <Shape d="M290 160 L380 130 L372 168 L330 172 Z" />
      <Shape d="M290 190 L380 206 L366 176 L330 176 Z" />
      <Solid d="M310 164 l6 10 l6 -10 Z M338 158 l6 10 l6 -10 Z M356 150 l6 10 l6 -10 Z M314 184 l6 -10 l6 10 Z M342 188 l6 -10 l6 10 Z" />
      <circle cx="318" cy="146" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={319} y={147} r={3} />
      <Line d="M20 224 H380" w={3} dash="2 10" />
    </Drawing>
  );
}
