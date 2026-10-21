import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";

const card = "var(--b-card)";

function TumbleweedImp() {
  return (
    <Drawing label="Drawing of a bouncing ball of dried scrub with eyes">
      <circle cx="200" cy="120" r="70" fill={card} {...ink} />
      <Line d="M150 80 C190 60 230 70 250 100 M140 120 C190 100 240 110 262 140 M156 160 C200 140 230 150 246 176 M180 56 C200 100 190 140 170 180 M220 58 C210 100 224 140 236 176" w={3} />
      <Line d="M140 90 L160 124 L136 140 M258 100 L238 134 L262 156 M170 66 L190 108 M232 66 L216 112" w={3} />
      <circle cx="184" cy="112" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="218" cy="112" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={114} r={4} />
      <Dot x={220} y={114} r={4} />
      <Line d="M186 142 Q200 134 216 142" w={3} />
      <Line d="M60 214 q10 -8 20 0 M110 224 q8 -6 16 0 M300 216 q10 -8 20 0 M340 226 q8 -6 16 0" w={3} />
      <Line d="M90 130 q-10 -16 -4 -30 M312 90 q10 -14 6 -28" w={3} dash="3 6" />
      <Ground y={232} />
    </Drawing>
  );
}

function StoneGolem() {
  return (
    <Drawing label="Drawing of a blocky statue covered in glowing runes">
      <Shape d="M170 90 V50 H230 V90 Z" />
      <Line d="M184 66 H194 M206 66 H216" w={5} />
      <Line d="M190 80 H210" w={3} />
      <Shape d="M130 96 H270 V180 H130 Z" />
      <Line d="M196 112 V164 M180 124 L196 112 L212 124 M184 150 H208" w={3} />
      <Shape d="M90 100 H128 V170 H90 Z" />
      <Shape d="M272 100 H310 V170 H272 Z" />
      <Shape d="M84 170 H134 V196 H84 Z M266 170 H316 V196 H266 Z" w={4} />
      <Shape d="M140 180 H196 V224 H140 Z M204 180 H260 V224 H204 Z" />
      <Line d="M104 112 l8 8 l-8 8 M290 116 l8 8 M148 198 l8 -8 l8 8 M224 198 h20" w={3} />
      <Line d="M150 110 l6 4 M240 150 l8 -4" w={2} />
      <Line d="M170 226 H230" w={2} />
    </Drawing>
  );
}

function SteamGolem() {
  return (
    <Drawing label="Drawing of a riveted iron giant with a boiler chest venting steam">
      <Shape d="M168 90 V50 H232 V90 Z" />
      <Line d="M180 66 H220" w={5} />
      <Dot x={190} y={66} r={3} />
      <Dot x={210} y={66} r={3} />
      <Line d="M176 34 V50 M224 34 V50" w={5} />
      <Shape d="M130 96 H270 V190 H130 Z" />
      <circle cx="200" cy="140" r="30" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 120 V140 L214 148" w={3} />
      <Dot x={140} y={106} r={3} />
      <Dot x={260} y={106} r={3} />
      <Dot x={140} y={180} r={3} />
      <Dot x={260} y={180} r={3} />
      <Shape d="M96 100 H128 V176 H96 Z M272 100 H304 V176 H272 Z" />
      <Shape d="M144 190 H194 V226 H144 Z M206 190 H256 V226 H206 Z" />
      <Line d="M290 100 V70 H316" w={7} />
      <Line d="M326 60 q14 -10 22 2 M330 40 q18 -12 30 2 M316 20 q14 -12 26 0" w={3} />
      <Line d="M110 100 V76" w={7} />
      <Line d="M100 62 q10 -10 20 0 M104 44 q10 -10 22 0" w={3} />
    </Drawing>
  );
}

function RuneTeapot() {
  return (
    <Drawing label="Drawing of a small teapot covered in glowing runes, pouring into a cup">
      <Shape d="M120 130 C100 70 260 70 250 130 C250 180 220 200 190 200 C150 200 120 180 120 130 Z" />
      <Shape d="M150 80 H220 C220 60 150 60 150 80 Z" w={4} />
      <Dot x={185} y={56} r={5} />
      <Line d="M120 120 C70 110 70 170 120 160" w={6} />
      <Shape d="M250 120 L296 78 L316 90 L262 150 Z" />
      <Line d="M312 98 C322 130 322 160 316 170" w={4} dash="3 5" />
      <Line d="M160 110 l10 14 l-10 14 M200 106 v36 M184 124 h32 M230 108 l-10 10 l12 8" w={3} />
      <Shape d="M290 176 H350 L342 214 H298 Z" w={4} />
      <Line d="M350 184 C372 184 372 204 346 206" w={4} />
      <Line d="M150 200 V214 M230 200 V214" w={8} />
      <Line d="M90 70 l4 8 M100 50 l8 4 M60 100 l8 0 M330 60 l6 6" w={3} />
      <Ground y={218} x1={80} x2={300} />
    </Drawing>
  );
}

function ScarecrowSentinel() {
  return (
    <Drawing label="Drawing of a straw-stuffed scarecrow on a post with outstretched arms and a pointed hat">
      <Line d="M200 100 V230 M110 130 H290" w={7} />
      <Shape d="M156 56 L200 6 L244 56 Z" />
      <Line d="M140 60 H260" w={6} />
      <Shape d="M168 62 H232 V104 H168 Z" />
      <Dot x={186} y={80} r={4} />
      <Dot x={214} y={80} r={4} />
      <Line d="M186 94 l28 0 M190 90 v8 M200 90 v8 M210 90 v8" w={3} />
      <Shape d="M168 110 H232 L240 190 H160 Z" />
      <Line d="M180 130 l10 10 M220 130 l-10 10 M176 160 h48" w={3} />
      <Line d="M110 130 l-14 -4 M110 130 l-14 8 M110 130 l-16 -12 M290 130 l14 -4 M290 130 l14 8 M290 130 l16 -12" w={4} />
      <Line d="M170 190 l-4 16 M184 190 l2 18 M216 190 l-2 18 M232 190 l4 16" w={4} />
      <Line d="M60 210 v14 M52 218 h16 M330 200 v14 M322 208 h16" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

function RatKing() {
  return (
    <Drawing label="Drawing of a knot of rats with tangled tails and many eyes">
      <Line d="M120 190 C60 200 60 120 140 130 C200 136 150 190 220 180 C280 170 260 120 310 140" w={6} />
      <Shape d="M110 150 C110 90 290 90 290 150 C290 200 110 200 110 150 Z" />
      <Shape d="M130 108 L124 78 L150 96 Z M270 108 L276 78 L250 96 Z" w={4} />
      <Shape d="M176 102 L172 62 L204 86 Z M224 102 L228 62 L196 86 Z" w={4} />
      <circle cx="150" cy="130" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="184" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="218" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="252" cy="130" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="170" cy="156" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="232" cy="156" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={150} y={130} r={3} />
      <Dot x={184} y={120} r={3} />
      <Dot x={218} y={120} r={3} />
      <Dot x={252} y={130} r={3} />
      <Dot x={170} y={156} r={2.5} />
      <Dot x={232} y={156} r={2.5} />
      <Line d="M170 180 l6 10 l6 -10 l6 10 l6 -10 l6 10 l6 -10 l6 10 l6 -10" w={3} />
      <Line d="M90 140 l-24 -6 M90 150 l-26 4 M310 140 l24 -6 M310 150 l26 4" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

function SmogHound() {
  return (
    <Drawing label="Drawing of a sooty hound with ember eyes prowling in smoke">
      <Shape d="M80 170 C70 120 130 100 190 108 C250 112 280 130 280 170 Z" />
      <Shape d="M240 120 L250 82 L268 100 L304 100 L324 84 L330 126 C330 150 244 150 240 120 Z" />
      <path d="M226 110 L236 78 L254 98 Z" fill="currentColor" />
      <Dot x={278} y={116} r={5} />
      <Line d="M272 110 l12 6 M288 110 l-12 6" w={2} />
      <Solid d="M322 118 L338 124 L322 134 Z" />
      <Line d="M296 138 l6 8 l6 -8" w={3} />
      <Line d="M100 170 V208 M140 172 V208 M232 172 V208 M268 172 V208" w={8} />
      <Line d="M82 140 C50 140 40 110 56 94" w={6} />
      <Line d="M130 100 q10 -14 0 -26 q-8 -12 6 -22 M170 96 q12 -14 0 -26 M206 100 q10 -12 4 -22" w={3} dash="3 6" />
      <Line d="M20 190 q30 -16 60 0 t60 0 M220 216 q30 -16 60 0 t60 0 M60 226 q30 -12 60 0 t60 0" w={3} dash="8 8" />
    </Drawing>
  );
}

function ThunderRam() {
  return (
    <Drawing label="Drawing of a mountain ram with big curled horns and lightning cracking from them">
      <Shape d="M90 200 C70 150 110 112 180 112 C250 112 280 150 266 200 Z" />
      <Line d="M110 130 q10 10 0 22 M150 124 q10 10 0 22 M190 124 q10 10 0 22 M230 130 q10 10 0 22" w={3} />
      <Shape d="M246 126 C240 90 262 70 292 74 C318 80 330 104 322 126 C310 148 254 150 246 126 Z" />
      <Line d="M254 90 C214 60 220 20 262 28 C296 36 296 70 274 70 C260 70 256 62 264 56" w={9} />
      <Line d="M316 100 C340 70 372 80 366 108 C360 130 334 124 338 108" w={7} />
      <Dot x={296} y={96} r={4} />
      <Line d="M110 200 V226 M140 202 V226 M220 202 V226 M250 200 V226" w={9} />
      <Solid d="M232 24 L216 54 L232 52 L218 82 L246 44 L230 46 Z" />
      <Solid d="M360 24 L344 50 L358 50 L346 76 L372 40 L358 42 Z" />
      <Line d="M30 224 H370" w={2} dash="2 10" />
    </Drawing>
  );
}

function RoamingMinstrel() {
  return (
    <Drawing label="Drawing of a traveling singer in a feathered hat playing a lute">
      <Shape d="M156 66 H244 C240 30 160 30 156 66 Z" />
      <Line d="M140 68 H260" w={6} />
      <Line d="M230 40 C270 10 300 20 296 44 C280 36 266 40 240 52" w={4} />
      <Shape d="M168 72 H232 V104 C232 124 168 124 168 104 Z" />
      <Dot x={188} y={90} r={3} />
      <Dot x={212} y={90} r={3} />
      <Line d="M188 106 Q200 118 214 106" w={3} />
      <Shape d="M160 128 H240 L250 210 H150 Z" />
      <Line d="M200 128 V210" w={3} />
      <Line d="M170 210 V228 M230 210 V228" w={6} />
      <Shape d="M240 190 C220 160 262 142 290 160 C318 178 304 214 270 210 C256 208 248 200 240 190 Z" w={4} />
      <circle cx="274" cy="180" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M290 160 L350 100 M342 96 l16 10" w={5} />
      <Line d="M162 146 L110 160 M236 148 L270 170" w={6} />
      <Line d="M70 60 v28 M70 88 q-12 4 -12 -4 q0 -8 12 -4 M96 40 v24 M96 64 q-10 4 -10 -3 q0 -7 10 -3" w={3} />
    </Drawing>
  );
}

function TempleHealer() {
  return (
    <Drawing label="Drawing of a robed healer with bandages in one pocket and a mace in the other hand">
      <Shape d="M168 70 C164 24 236 24 232 70 C230 100 170 100 168 70 Z" />
      <Line d="M170 56 C180 40 220 40 230 56" w={4} />
      <Dot x={188} y={74} r={3} />
      <Dot x={212} y={74} r={3} />
      <Line d="M190 88 Q200 94 210 88" w={3} />
      <Shape d="M150 100 H250 L276 224 H124 Z" />
      <Line d="M200 100 V224" w={3} />
      <Shape d="M160 150 H190 V180 H160 Z" w={3} />
      <Line d="M166 150 L170 134 H184 L186 150" w={3} />
      <Line d="M165 160 H185 M165 168 H185" w={2} />
      <Line d="M150 110 L120 160" w={7} />
      <Line d="M250 110 L290 140" w={7} />
      <Line d="M290 140 L320 60" w={5} />
      <circle cx="324" cy="48" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M324 38 v20 M314 48 h20" w={3} />
      <Line d="M184 40 v-14 M178 33 h12" w={3} />
    </Drawing>
  );
}

function SchemingChancellor() {
  return (
    <Drawing label="Drawing of a smiling advisor in a long robe holding a cup of wine and ink-stained fingers">
      <Shape d="M160 64 C160 30 240 30 240 64 Z" />
      <Line d="M148 66 H252" w={5} />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M180 84 h12 M208 84 h12" w={3} />
      <Line d="M182 104 Q200 118 220 104" w={4} />
      <Line d="M196 92 l4 6 l4 -6" w={2} />
      <Shape d="M166 124 H234 L252 224 H148 Z" />
      <Line d="M200 124 V224 M176 150 L224 150" w={3} />
      <Solid d="M200 130 l6 8 l-6 8 l-6 -8 Z" />
      <Line d="M170 134 L136 160 L150 186" w={6} />
      <Line d="M232 134 L270 150" w={6} />
      <Shape d="M262 120 H302 L298 156 C296 166 268 166 266 156 Z" w={4} />
      <Line d="M272 134 H296" w={3} />
      <Line d="M150 186 l-4 6 M156 186 l0 8 M142 184 l-6 4" w={3} />
      <Line d="M60 90 L120 74" w={3} />
      <Line d="M300 72 q10 -6 18 0 M310 56 q8 -6 14 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function SellswordCaptain() {
  return (
    <Drawing label="Drawing of a scarred tired veteran in mail with a sword and a purse of coins">
      <Shape d="M164 74 C160 26 240 26 236 74 C236 104 164 104 164 74 Z" />
      <Line d="M178 60 L198 78" w={3} />
      <Dot x={184} y={78} r={3} />
      <Dot x={214} y={78} r={3} />
      <Line d="M186 94 H214" w={3} />
      <Line d="M170 70 q30 -14 60 0" w={3} />
      <Shape d="M144 110 H256 L248 186 H152 Z" />
      <Line d="M160 128 h80 M156 146 h88 M154 164 h92" w={2} />
      <Line d="M150 190 H250" w={8} />
      <Shape d="M258 180 H290 V212 H258 Z" w={4} />
      <Line d="M258 180 q16 -14 32 0" w={3} />
      <Shape d="M156 186 L150 226 H190 L196 186 Z M204 186 L210 226 H250 L244 186 Z" w={4} />
      <Line d="M152 122 L124 168 M248 122 L290 100 L310 30" w={7} />
      <Solid d="M304 36 L316 2 L324 36 Z" />
      <Line d="M296 62 L328 66" w={6} />
      <Line d="M60 80 q10 -10 20 0 M50 110 q10 -8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function TollTroll() {
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

function StoneGazer() {
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

function SpikedHodag() {
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

function SugarWyrm() {
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

function VainWyrm() {
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

function Shellback() {
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

function Stormbird() {
  return (
    <Drawing label="Drawing of a huge seabird with spread wings gliding above a small ship under storm clouds">
      <Line d="M20 30 q14 -14 30 -4 q16 -14 32 0 q18 -4 22 12 H20 Z" w={3} />
      <Line d="M290 24 q14 -14 30 -4 q16 -14 32 0 q18 -4 22 12 H290 Z" w={3} />
      <Shape d="M200 70 C150 60 80 40 10 70 C50 80 80 86 100 106 C140 94 170 96 192 104 Z" />
      <Shape d="M200 70 C250 60 320 40 390 70 C350 80 320 86 300 106 C260 94 230 96 208 104 Z" />
      <Shape d="M182 100 C176 70 224 70 218 100 L212 140 H188 Z" />
      <Shape d="M186 70 C186 52 214 52 214 70 C214 82 186 82 186 70 Z" />
      <Shape d="M200 66 L226 72 L202 78 Z" w={4} />
      <Dot x={196} y={64} r={3} />
      <Line d="M200 140 L190 166 H210 Z" w={4} />
      <Solid d="M310 130 L296 160 L310 158 L298 184 L322 150 L308 152 Z" />
      <Shape d="M150 214 H230 L216 226 H164 Z" w={4} />
      <Line d="M190 214 V190 M190 192 L216 206 L190 208" w={3} />
      <Line d="M130 224 q10 -6 20 0 M240 224 q10 -6 20 0" w={3} />
    </Drawing>
  );
}

function Skeleton() {
  return (
    <Drawing label="Drawing of an animated skeleton with a notched sword">
      <Shape d="M168 80 C160 24 240 24 232 80 L226 100 H174 Z" />
      <Dot x={186} y={64} r={7} />
      <Dot x={214} y={64} r={7} />
      <Line d="M200 76 v8" w={3} />
      <Line d="M184 100 V108 M196 100 V108 M208 100 V108 M220 100 V108" w={3} />
      <Line d="M200 114 V176" w={6} />
      <Line d="M170 126 Q200 118 230 126 M172 144 Q200 136 228 144 M176 162 Q200 154 224 162" w={5} />
      <Line d="M160 178 H240 L226 192 H174 Z" w={5} />
      <Line d="M176 194 V224 M224 194 V224 M166 224 h20 M214 224 h20" w={5} />
      <Line d="M170 128 L130 160 L110 194 M230 128 L270 150 L296 124" w={5} />
      <Line d="M296 124 L318 30" w={5} />
      <Line d="M308 52 l-6 -2 M312 80 l-6 2" w={3} />
      <Line d="M290 82 L330 70" w={6} />
      <Ground y={228} />
    </Drawing>
  );
}

function RestlessGhost() {
  return (
    <Drawing label="Drawing of a pale ghost drifting through a house wall">
      <Shape d="M240 40 H370 V224 H240 Z" w={4} />
      <Line d="M240 80 H370 M240 120 H370 M240 160 H370 M240 200 H370 M300 40 V80 M340 80 V120 M280 120 V160" w={2} />
      <Shape d="M70 100 C70 20 230 20 230 100 L236 200 q-14 18 -28 0 q-14 18 -28 0 q-14 18 -28 0 q-14 18 -28 0 q-14 18 -28 0 Z" />
      <ellipse cx="124" cy="92" rx="14" ry="20" fill="currentColor" />
      <ellipse cx="178" cy="92" rx="14" ry="20" fill="currentColor" />
      <ellipse cx="152" cy="136" rx="12" ry="16" fill="currentColor" />
      <Line d="M60 130 L36 144 M230 130 L262 112" w={5} />
      <Line d="M270 52 q10 -10 20 0 M300 52 q10 -10 20 0" w={3} dash="2 6" />
      <Line d="M40 70 q10 -8 20 0 M30 190 q10 -8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function RainbowTrickster() {
  return (
    <Drawing label="Drawing of a small man in a green coat and top hat sitting on a pot of gold beneath a rainbow arc">
      <Line d="M20 190 C20 40 380 40 380 190" w={6} />
      <Line d="M44 190 C44 64 356 64 356 190" w={4} />
      <Line d="M66 190 C66 86 334 86 334 190" w={3} />
      <Shape d="M150 220 C130 180 140 160 160 160 H240 C260 160 270 180 250 220 Z" />
      <Shape d="M150 160 H250 L254 172 H146 Z" w={4} />
      <circle cx="176" cy="150" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="204" cy="144" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="228" cy="150" r="9" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M176 118 L182 76 H220 L226 118 Z" />
      <Shape d="M170 76 H232 L226 66 H178 Z" w={4} />
      <Line d="M160 118 H242" w={5} />
      <Dot x={190} y={98} r={3} />
      <Dot x={212} y={98} r={3} />
      <Line d="M194 108 Q202 114 210 108" w={3} />
      <Line d="M240 120 L270 100 L282 80" w={5} />
      <Line d="M272 70 q0 -12 12 -12 q12 0 12 10 q0 8 -12 12 v4" w={3} />
    </Drawing>
  );
}

function VoidTentacle() {
  return (
    <Drawing label="Drawing of a mass of writhing limbs, eyes and teeth that does not follow geometry">
      <Line d="M200 230 C150 190 240 170 190 130 C150 100 230 80 200 40" w={9} />
      <Line d="M120 220 C100 170 160 150 140 110 C130 90 80 80 90 50" w={7} />
      <Line d="M280 220 C300 170 240 150 262 110 C272 90 320 80 310 50" w={7} />
      <Line d="M60 200 C50 160 80 150 70 120 M340 200 C350 160 320 150 330 120" w={5} />
      <circle cx="200" cy="130" r="26" fill={card} {...ink} strokeWidth={4} />
      <circle cx="200" cy="130" r="9" fill="currentColor" />
      <circle cx="140" cy="108" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={140} y={108} r={4} />
      <circle cx="262" cy="108" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={262} y={108} r={4} />
      <circle cx="200" cy="44" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={200} y={44} r={3} />
      <Shape d="M170 190 Q200 220 230 190 Z" w={4} />
      <Solid d="M180 192 l4 10 l4 -10 Z M194 194 l4 12 l4 -12 Z M208 194 l4 12 l4 -12 Z M220 192 l4 10 l4 -10 Z" />
      <Line d="M30 40 v12 M24 46 h12 M360 80 v12 M354 86 h12 M40 130 l10 0" w={3} />
      <Line d="M320 20 q8 -6 14 0 M60 20 q8 -6 14 0" w={3} />
    </Drawing>
  );
}

function SwampHag() {
  return (
    <Drawing label="Drawing of a hunched hag stirring a cauldron, with a hut on chicken legs behind her">
      <Line d="M300 120 V190 M340 120 V190" w={5} />
      <Line d="M300 190 l-10 12 M300 190 l8 12 M340 190 l-10 12 M340 190 l8 12" w={4} />
      <Shape d="M280 120 H360 L350 70 L320 50 L290 70 Z" />
      <Line d="M310 120 V98 H330 V120" w={3} />
      <Shape d="M96 90 C80 60 140 40 156 70 C170 100 140 120 110 112 Z" />
      <Dot x={116} y={80} r={3} />
      <Line d="M108 100 q10 4 18 -2 M126 96 l-2 -6" w={3} />
      <Shape d="M60 50 L104 50 L88 20 Z M70 60 H120" w={4} />
      <Shape d="M100 110 C70 150 70 200 90 224 H190 C200 180 180 130 150 110 Z" />
      <Line d="M110 150 q10 10 6 24 M150 140 q10 14 4 30 M130 190 q6 8 4 20" w={3} />
      <Line d="M170 140 L206 164 L226 136" w={5} />
      <Line d="M226 136 L214 188" w={4} />
      <Shape d="M190 186 C182 166 262 166 254 186 C262 214 190 214 190 186 Z" />
      <Line d="M196 224 L184 232 M246 224 L258 232" w={5} />
      <Line d="M210 170 q-6 -12 4 -20 M232 170 q6 -12 -4 -20" w={3} dash="2 5" />
    </Drawing>
  );
}

function SunkenDreamer() {
  return (
    <Drawing label="Drawing of a huge winged titan with a tentacled face rising out of the sea beneath a small moon">
      <path d="M340 30 a22 22 0 1 0 22 22 a16 16 0 1 1 -22 -22 Z" fill="currentColor" />
      <Shape d="M120 224 C110 150 130 100 170 70 C200 40 240 50 260 80 C290 110 300 170 280 224 Z" />
      <Shape d="M130 110 C80 70 40 30 20 40 C30 70 24 90 34 120 C60 120 100 124 130 132 Z" />
      <Shape d="M270 110 C320 70 360 30 380 40 C370 70 376 90 366 120 C340 120 300 124 270 132 Z" />
      <circle cx="184" cy="96" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="236" cy="96" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M170 96 H198 M226 96 H250" w={3} />
      <Line d="M170 120 C160 150 150 170 130 180 M186 126 C184 160 178 182 166 196 M214 126 C216 160 222 182 234 196 M230 120 C240 150 250 170 270 180" w={6} />
      <Line d="M10 200 q15 -10 30 0 t30 0 t30 0 M330 200 q15 -10 30 0 t30 0" w={4} />
      <Line d="M10 218 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M100 50 l4 4 M90 80 l-4 -2 M310 130 l4 4" w={3} />
    </Drawing>
  );
}

function RiddleSphinx() {
  return (
    <Drawing label="Drawing of a lion-bodied sphinx with a human face and wings lying at a desert crossing">
      <Line d="M10 224 H390" w={4} />
      <Line d="M300 224 l30 -40 l30 40" w={3} />
      <Shape d="M90 200 C70 150 120 130 200 134 C260 136 290 156 280 200 Z" />
      <Shape d="M170 140 C140 100 100 60 60 50 C70 80 64 100 74 124 C110 126 150 130 170 150 Z" />
      <Shape d="M210 140 C230 110 250 90 270 70 L310 64 C300 90 290 120 270 150 Z" w={4} />
      <Shape d="M276 150 C260 100 270 60 300 54 C336 48 350 90 330 130 C324 150 290 160 276 150 Z" />
      <Line d="M276 70 C260 54 280 26 304 28 C334 28 350 52 336 70 M276 90 C260 110 262 140 280 150 M336 90 C350 110 346 140 330 150" w={5} />
      <Dot x={300} y={90} r={3} />
      <Dot x={322} y={90} r={3} />
      <Line d="M304 114 Q312 120 320 114" w={3} />
      <Line d="M104 200 H150 M96 200 l-12 14 h30 M180 200 H230" w={8} />
      <Line d="M90 170 C50 170 40 140 56 126" w={5} />
      <Line d="M310 20 q0 -12 12 -12 q12 0 12 10 q0 8 -12 12 v4" w={3} />
    </Drawing>
  );
}

function Siren() {
  return (
    <Drawing label="Drawing of a silver-scaled singer on a rock with sound waves and a reef below">
      <Shape d="M60 224 C60 170 120 150 200 156 C280 160 340 180 340 224 Z" />
      <Shape d="M170 80 C166 36 230 36 226 80 C226 106 172 106 170 80 Z" />
      <Line d="M172 70 C140 90 140 140 160 160 M226 70 C256 90 256 140 236 160" w={5} />
      <Dot x={186} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Shape d="M190 90 Q200 104 210 90 Q200 96 190 90 Z" w={3} />
      <Shape d="M176 106 H220 L226 140 H170 Z" w={4} />
      <Line d="M176 114 L150 130 M220 114 L250 100" w={5} />
      <Shape d="M170 140 H226 C240 176 240 196 220 206 C234 210 250 214 262 224 C230 220 170 220 140 224 C150 212 166 210 180 206 C160 196 160 176 170 140 Z" />
      <Line d="M184 156 q8 6 16 0 q8 6 16 0 M182 174 q8 6 16 0 q8 6 16 0 M186 192 q8 6 16 0 q8 6 16 0" w={3} />
      <Line d="M290 60 q22 20 0 50 M312 44 q32 34 0 82 M80 70 q-22 20 0 50 M58 54 q-32 34 0 82" w={3} />
      <Line d="M10 214 q15 -10 30 0 t30 0 M330 214 q15 -10 30 0 t30 0" w={3} />
    </Drawing>
  );
}

export const fantasyArtQZ: Record<string, () => ReactNode> = {
  "tumbleweed-imp": TumbleweedImp,
  "stone-golem": StoneGolem,
  "steam-golem": SteamGolem,
  "rune-teapot": RuneTeapot,
  "scarecrow-sentinel": ScarecrowSentinel,
  "rat-king": RatKing,
  "smog-hound": SmogHound,
  "thunder-ram": ThunderRam,
  "roaming-minstrel": RoamingMinstrel,
  "temple-healer": TempleHealer,
  "scheming-chancellor": SchemingChancellor,
  "sellsword-captain": SellswordCaptain,
  "toll-troll": TollTroll,
  "stone-gazer": StoneGazer,
  "spiked-hodag": SpikedHodag,
  "sugar-wyrm": SugarWyrm,
  "vain-wyrm": VainWyrm,
  shellback: Shellback,
  stormbird: Stormbird,
  skeleton: Skeleton,
  ghost: RestlessGhost,
  "rainbow-trickster": RainbowTrickster,
  "void-tentacle": VoidTentacle,
  "swamp-hag": SwampHag,
  "sunken-dreamer": SunkenDreamer,
  "riddle-sphinx": RiddleSphinx,
  siren: Siren,
};
