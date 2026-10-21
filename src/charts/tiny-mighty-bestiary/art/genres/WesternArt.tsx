import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";

const card = "var(--b-card)";

/** Cowboy hat in front view, centered on x=200 with the brim at `y`. */
function Hat({ y = 62, w = 60 }: { y?: number; w?: number }) {
  return (
    <>
      <Shape d={`M${200 - w * 0.55} ${y} C${200 - w * 0.55} ${y - 44} ${200 + w * 0.55} ${y - 44} ${200 + w * 0.55} ${y} Z`} />
      <Line d={`M${200 - w * 0.55} ${y - 14} H${200 + w * 0.55}`} w={3} />
      <Line d={`M${200 - w - 14} ${y - 6} Q${200 - w} ${y + 8} ${200 - w * 0.5} ${y + 2} H${200 + w * 0.5} Q${200 + w} ${y + 8} ${200 + w + 14} ${y - 6}`} w={5} />
    </>
  );
}

function Cactus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Shape d="M-10 0 V-70 Q-10 -84 0 -84 Q10 -84 10 -70 V0 Z" w={4} />
      <Line d="M10 -30 H22 V-52 M-10 -42 H-22 V-60" w={5} />
    </g>
  );
}

function RunawayLocomotive() {
  return (
    <Drawing label="Drawing of a steam locomotive barreling down the track with smoke pouring from the stack">
      <Line d="M10 214 H390" w={4} />
      <Line d="M20 224 H380" w={3} dash="10 8" />
      <Shape d="M150 150 H330 V190 H150 Z" />
      <Shape d="M70 110 H170 V190 H70 Z" />
      <Shape d="M60 100 H180 V112 H60 Z" w={4} />
      <Shape d="M190 100 H300 C310 100 320 120 320 150 H190 Z" />
      <Shape d="M310 150 L350 190 H310 Z" w={4} />
      <Shape d="M210 100 L220 66 H250 L260 100 Z" />
      <Line d="M232 66 q-10 -14 6 -26 q16 -10 8 -28 M270 62 q-8 -14 6 -22 q14 -8 6 -24" w={4} dash="3 6" />
      <Shape d="M84 124 H130 V156 H84 Z" w={4} />
      <circle cx="104" cy="196" r="22" fill={card} {...ink} />
      <circle cx="104" cy="196" r="5" fill="currentColor" />
      <circle cx="240" cy="198" r="16" fill={card} {...ink} strokeWidth={4} />
      <circle cx="290" cy="198" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M104 196 L240 198 L290 198" w={4} />
      <Line d="M352 192 L388 202 M352 204 L384 212" w={4} />
      <Line d="M40 140 H60 M30 160 H56 M44 180 H64" w={3} />
    </Drawing>
  );
}

function ClockworkGunslinger() {
  return (
    <Drawing label="Drawing of a brass-plated duelist with gear eyes and a revolver at the draw">
      <Hat y={60} w={52} />
      <Shape d="M170 62 H230 V104 H170 Z" />
      <circle cx="186" cy="82" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="82" r="9" fill={card} {...ink} strokeWidth={3} />
      <Line d="M186 76 V88 M180 82 H192 M214 76 V88 M208 82 H220" w={2} />
      <Line d="M186 96 H214 M192 92 V100 M200 92 V100 M208 92 V100" w={2} />
      <Shape d="M150 110 H250 L256 190 H144 Z" />
      <circle cx="200" cy="148" r="16" fill={card} {...ink} strokeWidth={3} />
      <Line d="M200 136 V160 M188 148 H212" w={2} />
      <Line d="M150 130 L116 160 M250 126 L296 106" w={7} />
      <Shape d="M290 92 H332 V108 H290 Z" w={4} />
      <Line d="M296 108 L300 126" w={4} />
      <Line d="M332 98 l22 -6 M338 80 l10 -8 M340 114 l12 8" w={3} />
      <Shape d="M156 190 H196 V224 H156 Z M204 190 H244 V224 H204 Z" w={4} />
      <Line d="M150 190 H250" w={6} />
      <Shape d="M190 186 H210 V200 H190 Z" w={3} />
    </Drawing>
  );
}

function IronHorseAutomaton() {
  return (
    <Drawing label="Drawing of a steel stallion with a boiler body, rivets and a smokestack">
      <Shape d="M90 100 H270 V160 H90 Z" />
      <circle cx="140" cy="130" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M140 116 V130 L150 136" w={3} />
      <Line d="M190 100 V160 M230 100 V160" w={3} />
      <Dot x={104} y={110} r={3} />
      <Dot x={104} y={150} r={3} />
      <Shape d="M250 100 L268 56 L300 36 L338 56 L342 90 L316 98 L300 120 H270 Z" />
      <Dot x={316} y={68} r={4} />
      <Line d="M300 36 L296 20 M304 40 L316 24" w={4} />
      <Line d="M330 98 q8 8 14 0" w={3} />
      <Shape d="M110 70 L118 40 H140 L148 70 Z" w={4} />
      <Line d="M128 40 q-8 -12 4 -20 q12 -8 4 -18" w={3} dash="3 6" />
      <Line d="M110 160 V218 M156 160 V218 M230 160 V218 M268 160 V218" w={11} />
      <Dot x={110} y={190} r={4} />
      <Dot x={268} y={190} r={4} />
      <Line d="M90 120 C60 120 50 150 66 174" w={6} />
      <Ground y={226} />
    </Drawing>
  );
}

function GallowsMarionette() {
  return (
    <Drawing label="Drawing of a wooden puppet dangling from a gallows beam on strings of rope">
      <Line d="M40 224 V30 H250" w={9} />
      <Line d="M40 70 L80 30" w={6} />
      <Line d="M200 30 V62 M160 30 L170 106 M240 30 L232 106 M180 30 L160 150 M220 30 L240 150" w={2} />
      <Shape d="M176 62 H224 V100 H176 Z" />
      <Line d="M186 78 L194 86 M194 78 L186 86 M206 78 L214 86 M214 78 L206 86" w={3} />
      <Line d="M188 94 q12 6 24 0" w={3} />
      <Shape d="M168 106 H232 V166 H168 Z" />
      <Line d="M168 130 H232" w={3} />
      <Line d="M168 112 L130 140 L148 160 M232 112 L270 138 L252 160" w={6} />
      <circle cx="130" cy="140" r="5" fill={card} {...ink} strokeWidth={3} />
      <circle cx="270" cy="138" r="5" fill={card} {...ink} strokeWidth={3} />
      <Line d="M184 166 L170 214 L150 218 M216 166 L236 206 L256 200" w={6} />
      <Line d="M280 224 H370 M296 224 V190 H356 V224" w={4} />
      <Ground y={228} />
    </Drawing>
  );
}

function TumbleweedWarBot() {
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

function DustRattler() {
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

function ThunderHerd() {
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

function GreatWhiteBuffalo() {
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

function JackalopeGang() {
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

function PrairieHawk() {
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

function PrairieSkyray() {
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

function MaskHunter() {
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

function QuickdrawOutlaw() {
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

function BanditChief() {
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

function DoomsdayPreacher() {
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

function SaloonBrawler() {
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

function GreenhornDeputy() {
  return (
    <Drawing label="Drawing of a nervous young deputy with an oversized badge and a trembling hand over a holster">
      <Hat y={64} w={50} />
      <Shape d="M172 68 H228 V104 C228 120 172 120 172 104 Z" />
      <circle cx="188" cy="86" r="5" fill={card} {...ink} strokeWidth={3} />
      <circle cx="212" cy="86" r="5" fill={card} {...ink} strokeWidth={3} />
      <Dot x={189} y={87} r={2} />
      <Dot x={213} y={87} r={2} />
      <Line d="M190 104 q10 -4 20 0" w={3} />
      <Line d="M232 70 q8 8 4 18 M238 60 q10 6 8 16" w={3} dash="2 4" />
      <Shape d="M156 122 H244 L250 200 H150 Z" />
      <Solid d="M184 138 l8 -14 l8 14 l8 -14 l8 14 l-16 20 l-8 -6 Z" />
      <Line d="M156 130 L128 170 L150 190" w={6} />
      <Line d="M244 130 L270 168 L250 190" w={6} />
      <Line d="M142 192 H258" w={6} />
      <Shape d="M236 190 H262 V218 H236 Z" w={4} />
      <Shape d="M156 200 H196 V226 H156 Z M204 200 H244 V226 H204 Z" w={4} />
      <Line d="M100 160 l-10 -4 M104 176 l-12 2 M300 160 l10 -4 M296 176 l12 2" w={3} />
    </Drawing>
  );
}

function RailroadBaron() {
  return (
    <Drawing label="Drawing of a top-hatted mogul with a watch chain and a cigar, a stack of money bags beside him">
      <Shape d="M164 62 L170 14 H230 L236 62 Z" />
      <Line d="M170 44 H230" w={5} />
      <Line d="M148 64 H252" w={6} />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 86 H194 M206 86 H218" w={4} />
      <Line d="M190 102 H210 M210 102 L240 96" w={4} />
      <Dot x={244} y={94} r={4} />
      <Shape d="M148 124 H252 L262 214 H138 Z" />
      <Shape d="M178 124 L200 164 L222 124 Z" w={3} />
      <Line d="M200 124 V214" w={3} />
      <Line d="M184 160 C170 176 214 190 226 170" w={3} />
      <circle cx="224" cy="172" r="7" fill={card} {...ink} strokeWidth={3} />
      <Line d="M154 134 L124 176 M246 134 L290 150" w={7} />
      <Shape d="M290 190 C280 160 340 160 330 190 Z" w={4} />
      <Shape d="M310 224 C294 190 366 190 350 224 Z" w={4} />
      <Line d="M310 168 v-10 M334 198 v-8" w={3} />
      <Dot x={310} y={186} r={3} />
      <Line d="M148 214 V228 M252 214 V228" w={8} />
      <Line d="M50 200 H100 M50 216 H110 M50 232 H90" w={4} />
    </Drawing>
  );
}

function OutlawKing() {
  return (
    <Drawing label="Drawing of a legendary bandit wearing a crown of rattlesnake rattles, with a huge gang's hats lined up behind him">
      <Shape d="M20 140 H80 L50 110 Z M60 140 H120 L90 110 Z M300 140 H360 L330 110 Z M340 140 H390 L365 110 Z" w={3} />
      <Line d="M10 150 H390" w={3} dash="3 6" />
      <Shape d="M166 76 C160 40 240 40 234 76 C234 106 166 106 166 76 Z" />
      <Shape d="M160 44 L164 18 L180 38 L194 14 L206 38 L222 14 L238 18 L242 44 Z" w={4} />
      <Line d="M168 28 v10 M184 22 v14 M200 20 v14 M216 22 v14 M232 28 v10" w={2} />
      <Dot x={186} y={72} r={3} />
      <Dot x={214} y={72} r={3} />
      <Line d="M180 62 l10 4 M220 62 l-10 4" w={3} />
      <Line d="M184 92 Q200 104 218 92" w={4} />
      <Shape d="M144 112 H256 L270 224 H130 Z" />
      <Line d="M200 112 V224 M150 150 H250" w={3} />
      <Solid d="M200 118 l8 12 l-8 12 l-8 -12 Z" />
      <Line d="M150 120 L124 172 M250 120 L288 138" w={8} />
      <Solid d="M284 130 L308 134 L304 148 L282 144 Z" />
      <Line d="M170 224 V230 M230 224 V230" w={8} />
    </Drawing>
  );
}

function FrontierDoc() {
  return (
    <Drawing label="Drawing of a rumpled traveling doctor with a black bag and a bottle of tonic">
      <Shape d="M166 66 C160 34 240 34 234 66 Z" />
      <Line d="M150 68 H250" w={5} />
      <Shape d="M172 72 H228 V102 C228 120 172 120 172 102 Z" />
      <circle cx="188" cy="86" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="212" cy="86" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M196 86 H204" w={2} />
      <Line d="M186 104 Q200 112 214 104" w={3} />
      <Shape d="M150 124 H250 L262 214 H138 Z" />
      <Line d="M200 124 V214" w={3} />
      <Line d="M160 140 L170 160 M240 150 L230 176" w={2} />
      <Line d="M156 132 L122 178" w={7} />
      <Shape d="M96 176 H160 V214 H96 Z" w={4} />
      <Line d="M110 176 V166 H146 V176" w={4} />
      <Line d="M244 132 L284 150" w={7} />
      <Shape d="M276 126 H302 V162 H276 Z" w={4} />
      <Shape d="M282 112 H296 V126 H282 Z" w={3} />
      <Line d="M280 140 H298" w={2} />
      <Line d="M150 214 V228 M250 214 V228" w={8} />
      <Line d="M90 120 v-10 M85 115 h10" w={3} />
    </Drawing>
  );
}

function GilaGiant() {
  return (
    <Drawing label="Drawing of a truck-sized beaded lizard dozing in the sun with a spotted pattern on its skin">
      <circle cx="340" cy="40" r="22" fill="none" {...ink} strokeWidth={4} />
      <Line d="M340 4 v8 M340 68 v8 M304 40 h8 M368 40 h8 M314 14 l6 6 M366 66 l-6 -6" w={3} />
      <Shape d="M60 190 C50 140 110 110 190 112 C260 114 300 140 310 170 C320 190 300 200 280 200 H80 Z" />
      <Shape d="M290 150 C300 130 340 128 366 144 C384 156 384 178 366 182 C340 190 300 184 290 168 Z" />
      <Dot x={338} y={146} r={3} />
      <Line d="M370 164 H386" w={3} />
      <circle cx="90" cy="150" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="130" cy="136" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="176" cy="132" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="222" cy="134" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="262" cy="148" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="110" cy="176" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="160" cy="166" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="210" cy="168" r="7" fill="none" {...ink} strokeWidth={3} />
      <Line d="M90 200 l-16 16 h34 M280 200 l16 16 h-34" w={8} />
      <Line d="M60 190 C30 190 14 176 18 160" w={9} />
      <Ground y={224} />
    </Drawing>
  );
}

function GoatSucker() {
  return (
    <Drawing label="Drawing of a hunched, spiny, red-eyed creature crouched next to a drained cow">
      <Shape d="M20 200 C20 160 100 150 150 160 C190 168 190 200 180 210 H30 Z" w={4} />
      <Line d="M40 200 V224 M70 204 V224 M150 206 V224 M170 206 V224" w={5} />
      <Line d="M60 164 l4 -10 M90 160 l4 -10" w={3} />
      <Dot x={36} y={176} r={3} />
      <Line d="M24 176 H34" w={2} />
      <Shape d="M230 190 C210 150 250 100 300 100 C340 100 360 130 350 160 C340 190 290 210 240 214 Z" />
      <Solid d="M232 150 L214 138 L230 134 Z M244 120 L228 100 L248 104 Z M270 106 L260 84 L280 94 Z M300 100 L298 78 L314 94 Z M330 106 L340 86 L344 108 Z" />
      <Shape d="M330 132 C340 120 372 126 376 142 C378 156 352 164 336 154 Z" />
      <circle cx="354" cy="136" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={355} y={136} r={3} />
      <Line d="M346 150 l8 10 l8 -10" w={3} />
      <Line d="M260 200 L252 224 M300 206 L304 226" w={7} />
      <Line d="M230 170 L196 190" w={6} />
      <Line d="M196 190 l-8 -4 M196 190 l-4 8 M196 190 l-10 4" w={3} />
      <circle cx="120" cy="40" r="22" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 4" />
    </Drawing>
  );
}

function CactusCrawler() {
  return (
    <Drawing label="Drawing of a walking barrel cactus with fishhook spines and an angry face">
      <Shape d="M130 190 C110 130 130 60 200 56 C270 60 290 130 270 190 Z" />
      <Line d="M170 62 C160 100 160 150 170 188 M200 56 V190 M230 62 C240 100 240 150 230 188" w={3} />
      <Line d="M150 90 l-14 -4 q-6 4 -2 8 M140 130 l-16 2 q-6 6 0 8 M156 170 l-12 8 q-4 6 2 8 M250 90 l14 -4 q6 4 2 8 M260 130 l16 2 q6 6 0 8 M244 170 l12 8 q4 6 -2 8" w={3} />
      <Dot x={180} y={104} r={5} />
      <Dot x={220} y={104} r={5} />
      <Line d="M170 94 L192 100 M230 94 L208 100" w={4} />
      <Line d="M180 136 Q200 126 220 136" w={4} />
      <Line d="M186 136 l4 10 M200 132 l0 12 M214 136 l-4 10" w={3} />
      <Line d="M140 120 C100 110 90 80 110 60 C120 52 134 62 126 72" w={12} />
      <Line d="M260 120 C300 110 310 80 290 60 C280 52 266 62 274 72" w={12} />
      <Line d="M170 190 L160 224 M230 190 L240 224" w={10} />
      <Line d="M150 224 h24 M226 224 h24" w={6} />
      <Line d="M200 56 l-6 -14 l12 0 Z" w={3} />
    </Drawing>
  );
}

function CanyonWurm() {
  return (
    <Drawing label="Drawing of a rock-colored giant worm bursting out of a canyon floor between two cliffs">
      <Shape d="M0 224 V60 L40 40 L80 80 L100 224 Z" />
      <Shape d="M400 224 V50 L360 30 L320 70 L300 224 Z" />
      <Line d="M20 100 H70 M30 140 H80 M30 180 H92 M380 90 H340 M370 130 H316 M376 170 H308" w={3} />
      <Shape d="M130 224 C120 150 150 90 200 70 C250 90 280 150 270 224 Z" />
      <Line d="M130 190 q70 14 140 0 M132 150 q68 14 136 0 M144 110 q56 14 112 0" w={3} />
      <ellipse cx="200" cy="64" rx="38" ry="18" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="64" rx="20" ry="8" fill="currentColor" />
      <Solid d="M164 58 l6 8 l6 -8 Z M180 52 l6 8 l6 -8 Z M196 50 l6 8 l6 -8 Z M212 52 l6 8 l6 -8 Z M228 56 l6 8 l6 -8 Z" />
      <Line d="M110 224 l-20 -12 M290 224 l20 -12 M120 214 l-24 4 M280 214 l24 4" w={4} />
      <Line d="M150 30 l-6 -10 M250 30 l6 -10 M200 20 v-12" w={3} />
      <Line d="M40 210 q12 -6 24 0 M330 214 q12 -6 24 0" w={3} />
    </Drawing>
  );
}

function MesaTitan() {
  return (
    <Drawing label="Drawing of a mountain-sized stone giant shaped like a mesa, with a railroad drill in its back">
      <Line d="M10 224 H390" w={3} />
      <Shape d="M90 224 V90 H310 V224 Z" />
      <Line d="M90 120 H310 M90 150 H310 M90 180 H310 M90 206 H310" w={3} />
      <Shape d="M80 94 H320 V74 H80 Z" w={4} />
      <Dot x={160} y={110} r={9} />
      <Dot x={240} y={110} r={9} />
      <Line d="M180 150 H220" w={5} />
      <Line d="M90 140 L40 170 L52 200 M310 140 L360 170 L348 200" w={11} />
      <Line d="M130 224 V204 M270 224 V204" w={14} />
      <Shape d="M344 42 H388 V64 H344 Z" w={3} />
      <Line d="M366 64 V82" w={3} />
      <Line d="M300 90 L360 74 M300 100 L350 84" w={3} />
      <Shape d="M310 70 H330 L336 90 H304 Z" w={3} />
      <Line d="M330 70 V54 M320 54 H340" w={3} />
      <Line d="M290 30 q10 -10 20 0 M60 40 q10 -10 20 0" w={3} />
    </Drawing>
  );
}

function SandstormRoc() {
  return (
    <Drawing label="Drawing of an enormous bird made of dust and feathers riding a swirling desert storm front">
      <Shape d="M200 90 C150 70 80 50 10 76 C50 86 76 100 90 124 C130 112 170 114 196 124 Z" />
      <Shape d="M200 90 C250 70 320 50 390 76 C350 86 324 100 310 124 C270 112 230 114 204 124 Z" />
      <Line d="M40 90 L90 104 M70 100 L110 112 M360 90 L310 104 M330 100 L290 112" w={3} />
      <Shape d="M178 124 C172 90 228 90 222 124 L216 160 H184 Z" />
      <Shape d="M182 92 C182 66 218 66 218 92 C218 104 182 104 182 92 Z" />
      <Shape d="M200 84 L224 92 L202 98 Z" w={4} />
      <Dot x={194} y={84} r={3} />
      <Line d="M190 160 L176 186 M210 160 L224 186" w={4} />
      <Line d="M10 150 q30 -14 60 0 t60 0 M270 150 q30 -14 60 0 t60 0 M30 176 q30 -14 60 0 t60 0 M230 180 q30 -14 60 0 t60 0 M60 204 q30 -14 60 0 t60 0 t60 0 t60 0" w={4} dash="10 8" />
      <Line d="M150 190 q50 20 100 0 M140 210 q60 20 120 0" w={3} dash="4 8" />
    </Drawing>
  );
}

function BadlandsDevil() {
  return (
    <Drawing label="Drawing of a smiling stranger in a black duster and wide hat, hand near his hip, with tiny glowing souls at his feet">
      <Solid d="M150 64 C150 30 250 30 250 64 Z" />
      <Line d="M130 68 Q200 84 270 68" w={6} />
      <Shape d="M172 72 H228 V102 C228 120 172 120 172 102 Z" />
      <Dot x={188} y={86} r={3} />
      <Dot x={212} y={86} r={3} />
      <Line d="M184 98 Q200 114 218 98" w={4} />
      <Solid d="M138 126 C150 114 250 114 262 126 L290 224 H110 Z" />
      <path d="M200 130 V220" stroke={card} strokeWidth="3" fill="none" />
      <Line d="M164 130 L128 164" w={7} />
      <Line d="M236 130 L270 170" w={7} />
      <Solid d="M264 164 L290 176 L284 190 L260 180 Z" />
      <path d="M170 150 l-4 14 M230 150 l4 14" stroke={card} strokeWidth="2" strokeLinecap="round" />
      <Line d="M60 200 q8 -12 16 0 q-8 12 -16 0 Z M320 210 q8 -12 16 0 q-8 12 -16 0 Z M90 224 q6 -10 12 0 M300 224 q6 -10 12 0" w={3} />
      <Line d="M40 120 l10 -4 M350 150 l10 4" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

function DustDevil() {
  return (
    <Drawing label="Drawing of a spinning whirl of sand with a face in the middle sweeping across the desert at dusk">
      <path d="M300 30 a22 22 0 1 0 22 22 a16 16 0 1 1 -22 -22 Z" fill="currentColor" />
      <Line d="M150 30 C250 20 270 40 250 56 C200 70 130 50 160 80 M140 80 C250 76 270 94 240 112 C180 124 130 108 150 134 M150 134 C240 134 260 150 232 166 C190 176 150 164 170 186 M170 186 C230 190 240 204 220 214" w={5} />
      <circle cx="190" cy="104" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="224" cy="104" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={190} y={104} r={3} />
      <Dot x={224} y={104} r={3} />
      <Line d="M196 122 Q208 134 220 122" w={4} />
      <Line d="M40 80 q10 -6 20 0 M60 120 q10 -6 20 0 M320 130 q10 -6 20 0 M330 170 q10 -6 20 0" w={3} dash="3 6" />
      <Cactus x={70} y={216} s={0.8} />
      <Cactus x={340} y={218} s={0.6} />
      <Ground y={224} x1={10} x2={390} />
    </Drawing>
  );
}

export const westernArt: Record<string, () => ReactNode> = {
  "runaway-locomotive": RunawayLocomotive,
  "clockwork-gunslinger": ClockworkGunslinger,
  "iron-horse-automaton": IronHorseAutomaton,
  "gallows-marionette": GallowsMarionette,
  "tumbleweed-war-bot": TumbleweedWarBot,
  "dust-rattler": DustRattler,
  "thunder-herd": ThunderHerd,
  "great-white-buffalo": GreatWhiteBuffalo,
  "jackalope-gang": JackalopeGang,
  "prairie-hawk": PrairieHawk,
  "prairie-skyray": PrairieSkyray,
  "mask-hunter": MaskHunter,
  "quickdraw-outlaw": QuickdrawOutlaw,
  "bandit-chief": BanditChief,
  "doomsday-preacher": DoomsdayPreacher,
  "saloon-brawler": SaloonBrawler,
  "greenhorn-deputy": GreenhornDeputy,
  "railroad-baron": RailroadBaron,
  "outlaw-king": OutlawKing,
  "frontier-doc": FrontierDoc,
  "gila-giant": GilaGiant,
  "goat-sucker": GoatSucker,
  "cactus-crawler": CactusCrawler,
  "canyon-wurm": CanyonWurm,
  "mesa-titan": MesaTitan,
  "sandstorm-roc": SandstormRoc,
  "badlands-devil": BadlandsDevil,
  "dust-devil": DustDevil,
};
