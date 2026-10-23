import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function Stormbird() {
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

export function Skeleton() {
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

export function RestlessGhost() {
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

export function RainbowTrickster() {
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

export function VoidTentacle() {
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

export function SwampHag() {
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
