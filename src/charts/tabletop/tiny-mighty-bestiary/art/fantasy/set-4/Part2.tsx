import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function SmogHound() {
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

export function ThunderRam() {
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

export function RoamingMinstrel() {
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

export function TempleHealer() {
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

export function SchemingChancellor() {
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

export function SellswordCaptain() {
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
