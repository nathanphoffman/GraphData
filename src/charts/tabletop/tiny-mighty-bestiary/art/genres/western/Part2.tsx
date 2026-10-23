import { Dot, Drawing, Ground, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";
import { Cactus } from "./Part1";

const card = CARD_COLOR;

export function TumbleweedWarBot() {
  return (
    <Drawing label="Drawing of a two-legged war walker with a cactus growing from its head, covered in dents and rust">
      <Shape d="M150 70 H250 V110 H150 Z" />
      <Line d="M164 90 H236" w={6} />
      <Line d="M170 90 H190" w={2} />
      <Shape d="M130 110 H270 V170 H130 Z" />
      <Line d="M160 110 V170 M240 110 V170 M130 140 H270" w={3} />
      <Dot x={142} y={122} r={3} />
      <Dot x={258} y={158} r={3} />
      <Shape d="M96 116 H130 V150 H96 Z M270 116 H304 V150 H270 Z" w={4} />
      <Line d="M110 150 V176 M290 150 V176" w={8} />
      <Shape d="M296 176 l20 -12 l10 16 l-20 14 Z" w={4} />
      <Line d="M150 170 L140 210 L116 214 M250 170 L262 210 L286 214" w={10} />
      <Cactus x={200} y={70} s={0.7} />
      <Line d="M170 124 l20 16 M214 130 l14 10" w={2} />
      <Line d="M30 214 q8 -14 20 -6 q10 -12 18 4 M330 216 q8 -12 20 -4" w={3} />
      <Ground y={226} />
    </Drawing>
  );
}

export function DustRattler() {
  return (
    <Drawing label="Drawing of a huge coiled rattlesnake with raised head and rattle">
      <Shape d="M60 200 C40 160 90 140 150 150 C220 160 260 140 280 170 C300 200 220 220 150 214 C100 210 70 214 60 200 Z" />
      <Line d="M90 170 l8 14 M120 166 l8 16 M150 170 l8 16 M180 174 l8 14 M210 168 l8 14 M240 170 l6 12" w={3} />
      <Line d="M270 180 C320 180 330 130 310 100 C300 80 316 64 332 70" w={22} />
      <Line d="M270 180 C320 180 330 130 310 100 C300 80 316 64 332 70" w={15} />
      <Shape d="M320 64 C326 42 366 44 372 66 C376 84 340 90 322 80 Z" />
      <Dot x={352} y={60} r={4} />
      <Line d="M372 72 l16 4 l-10 6 M372 72 l16 -2" w={3} />
      <Line d="M60 200 C30 200 20 184 30 170" w={9} />
      <Shape d="M18 156 L38 148 L40 166 L22 172 Z M30 140 L50 132 L52 150 L34 156 Z" w={4} />
      <Line d="M20 120 q-8 -8 -4 -18 M46 112 q-4 -10 4 -16" w={3} dash="2 6" />
      <Ground y={224} />
    </Drawing>
  );
}

export function ThunderHerd() {
  return (
    <Drawing label="Drawing of a stampeding herd of bison with a huge dust cloud behind them">
      <Shape d="M10 200 C0 170 30 150 60 160 C70 130 110 130 120 160 C150 150 170 180 160 200 Z" w={4} />
      <Shape d="M60 150 C50 110 130 92 190 112 C230 124 250 150 240 190 L110 190 Z" />
      <Shape d="M200 124 C190 94 226 78 258 84 C288 90 294 120 276 140 C262 156 214 156 200 124 Z" />
      <Line d="M214 94 C202 86 200 74 210 70 M268 90 C284 82 292 70 284 64" w={5} />
      <Dot x={256} y={104} r={4} />
      <Line d="M256 144 C250 158 240 164 232 160" w={4} />
      <Line d="M110 190 V222 M140 190 V222 M210 190 V222 M236 190 V222" w={9} />
      <Line d="M80 120 q10 6 8 20 M110 112 q10 6 8 20 M140 108 q10 6 8 20" w={3} />
      <Shape d="M290 190 C300 160 330 150 350 170 C370 156 392 176 384 196 Z" w={3} />
      <Shape d="M320 150 C324 132 350 130 352 150 Z" w={3} />
      <Line d="M360 30 q10 -6 18 0 M30 40 q10 -6 18 0" w={3} />
    </Drawing>
  );
}

export function GreatWhiteBuffalo() {
  return (
    <Drawing label="Drawing of a giant pale bison walking across the plains with hills in its shape">
      <Line d="M10 220 H390" w={3} dash="2 10" />
      <Shape d="M50 200 C30 130 100 70 200 74 C290 78 340 130 330 200 Z" />
      <Shape d="M300 150 C290 100 330 70 364 86 C390 100 390 140 370 156 C350 172 310 176 300 150 Z" />
      <Line d="M316 86 C300 74 300 56 314 52 M366 82 C380 70 384 56 374 48" w={6} />
      <Dot x={354} y={106} r={4} />
      <Line d="M360 140 C354 156 342 164 330 158" w={4} />
      <Line d="M120 100 q10 8 6 22 M160 90 q10 8 6 22 M200 88 q10 8 6 22 M240 94 q10 8 6 22" w={3} />
      <Line d="M90 200 V224 M140 200 V224 M250 200 V224 M300 200 V224" w={11} />
      <Line d="M60 200 C40 190 36 164 50 150" w={6} />
      <Line d="M100 130 C130 100 190 96 230 110" w={3} />
      <Line d="M40 40 l4 8 M70 24 l0 10 M330 30 l-4 8 M360 44 l6 6" w={3} />
      <circle cx="200" cy="30" r="10" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 4" />
    </Drawing>
  );
}

export function JackalopeGang() {
  return (
    <Drawing label="Drawing of three antlered rabbits, one wearing a stolen hat, laughing">
      <g transform="translate(-70 10) scale(0.7)">
        <Shape d="M110 200 C80 150 120 100 200 110 C260 118 290 160 280 200 Z" />
        <Shape d="M240 120 C230 90 250 66 280 70 C310 74 320 100 306 120 C296 134 250 140 240 120 Z" />
        <Shape d="M276 74 C260 40 214 18 168 20 C208 42 240 66 262 90 Z" w={5} />
        <Line d="M288 72 C288 52 282 38 272 22 M285 52 l-14 -6 M306 76 C312 56 322 42 336 28 M312 58 l16 -2" w={5} />
        <Dot x={290} y={92} r={5} />
        <Line d="M298 112 q8 8 16 0" w={4} />
      </g>
      <g transform="translate(110 30) scale(0.6)">
        <Shape d="M110 200 C80 150 120 100 200 110 C260 118 290 160 280 200 Z" />
        <Shape d="M240 120 C230 90 250 66 280 70 C310 74 320 100 306 120 C296 134 250 140 240 120 Z" />
        <Shape d="M276 74 C260 40 214 18 168 20 C208 42 240 66 262 90 Z" w={5} />
        <Line d="M288 72 C288 52 282 38 272 22 M285 52 l-14 -6 M306 76 C312 56 322 42 336 28 M312 58 l16 -2" w={5} />
        <Shape d="M246 82 H316 L310 52 H252 Z" w={5} />
        <Line d="M236 82 H324" w={7} />
        <Dot x={290} y={98} r={5} />
        <Line d="M298 116 q8 8 16 0" w={4} />
      </g>
      <g transform="translate(240 50) scale(0.5)">
        <Shape d="M110 200 C80 150 120 100 200 110 C260 118 290 160 280 200 Z" />
        <Shape d="M240 120 C230 90 250 66 280 70 C310 74 320 100 306 120 C296 134 250 140 240 120 Z" />
        <Shape d="M276 74 C260 40 214 18 168 20 C208 42 240 66 262 90 Z" w={6} />
        <Line d="M288 72 C288 52 282 38 272 22 M306 76 C312 56 322 42 336 28" w={6} />
        <Dot x={290} y={92} r={6} />
        <Line d="M298 112 q8 8 16 0" w={5} />
      </g>
      <Line d="M44 40 q8 -6 16 0 M200 18 q8 -6 16 0 M340 60 q8 -6 16 0" w={3} />
      <Ground y={218} />
    </Drawing>
  );
}

export function PrairieHawk() {
  return (
    <Drawing label="Drawing of a hawk diving at a spilled strip of jerky, with a wagon below">
      <Shape d="M200 50 C150 30 80 20 20 40 C60 56 84 70 96 96 C130 84 170 84 194 94 Z" />
      <Shape d="M200 50 C250 30 320 20 380 40 C340 56 316 70 304 96 C270 84 230 84 206 94 Z" />
      <Shape d="M180 92 C176 60 224 60 220 92 L212 140 H188 Z" />
      <Shape d="M184 58 C184 38 216 38 216 58 C216 70 184 70 184 58 Z" />
      <Shape d="M200 52 L220 60 L202 66 Z" w={4} />
      <Dot x={194} y={52} r={3} />
      <Line d="M196 140 L184 168 M204 140 L218 168" w={5} />
      <Line d="M184 168 l-8 8 M184 168 l2 10 M218 168 l8 8 M218 168 l-2 10" w={3} />
      <Line d="M170 150 q-8 20 -4 46 M230 150 q8 20 4 46" w={3} dash="3 6" />
      <Shape d="M250 210 L290 200 L296 206 L260 218 Z" w={3} />
      <Shape d="M60 216 H140 L134 190 H66 Z" w={3} />
      <Line d="M70 190 Q100 170 130 190" w={3} />
      <circle cx="80" cy="222" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="124" cy="222" r="8" fill={card} {...ink} strokeWidth={3} />
      <Ground y={230} />
    </Drawing>
  );
}
