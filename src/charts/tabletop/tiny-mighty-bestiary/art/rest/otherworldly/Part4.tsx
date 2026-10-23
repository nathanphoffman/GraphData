import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR, Spokes } from "../../core/artStyle";

const card = CARD_COLOR;

export function AetherPoltergeist() {
  return (
    <Drawing label="Drawing of a spirit haunting steam pipes and sending gouts of hot vapor through the valves">
      <Line d="M0 60 H400 M0 180 H400" w={14} />
      <Line d="M0 60 H400 M0 180 H400" w={7} />
      <Line d="M120 60 V180 M280 60 V180" w={12} />
      <Line d="M120 60 V180 M280 60 V180" w={5} />
      <circle cx="120" cy="120" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M120 108 V132 M108 120 H132" w={3} />
      <circle cx="280" cy="120" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M280 108 V132 M268 120 H292" w={3} />
      <path d="M170 30 C170 6 230 6 230 30 L236 90 q-12 12 -24 0 q-12 12 -24 0 q-12 12 -22 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Dot x={188} y={28} r={4} />
      <Dot x={212} y={28} r={4} />
      <Line d="M190 44 q10 8 20 0" w={3} />
      <Line d="M60 60 q-14 -16 0 -30 q14 -14 0 -26 M340 180 q14 -16 0 -30 q-14 -14 0 -26 M200 180 q-14 20 0 40" w={4} dash="3 5" />
    </Drawing>
  );
}

export function AetherSovereign() {
  return (
    <Drawing label="Drawing of an ancient spirit of lightning and brass enthroned between cogs, crackling with bolts">
      <circle cx="70" cy="150" r="56" fill={card} {...ink} strokeWidth={5} />
      <Spokes cx={70} cy={150} r={56} count={10} length={12} width={9} />
      <circle cx="70" cy="150" r="16" fill="none" {...ink} strokeWidth={3} />
      <circle cx="330" cy="150" r="56" fill={card} {...ink} strokeWidth={5} />
      <Spokes cx={330} cy={150} r={56} count={10} length={12} width={9} offset={0.3} />
      <circle cx="330" cy="150" r="16" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M176 60 C170 20 230 20 224 60 C230 90 170 90 176 60 Z" />
      <Shape d="M170 36 L178 6 L192 30 L200 0 L208 30 L222 6 L230 36 Z" w={4} />
      <Dot x={190} y={56} r={4} />
      <Dot x={210} y={56} r={4} />
      <Shape d="M150 92 H250 L270 224 H130 Z" />
      <Line d="M200 92 V224" w={3} />
      <Solid d="M120 40 L100 80 L120 78 L96 124 L134 70 L114 72 Z M280 40 L300 80 L280 78 L304 124 L266 70 L286 72 Z" />
    </Drawing>
  );
}

export function PocketPetGhost() {
  return (
    <Drawing label="Drawing of a pixelated pet living inside an old handheld, hungry and asking to be fed">
      <Shape d="M100 20 H300 V224 H100 Z" w={5} />
      <Shape d="M126 44 H274 V140 H126 Z" w={4} />
      {[
        [190, 70], [210, 70], [170, 90], [190, 90], [210, 90], [230, 90], [170, 110], [190, 110], [210, 110], [230, 110], [150, 110], [250, 110],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width="18" height="18" fill="currentColor" stroke={card} strokeWidth="2" />
      ))}
      <rect x="182" y="86" width="8" height="8" fill={card} />
      <rect x="210" y="86" width="8" height="8" fill={card} />
      <rect x="196" y="108" width="14" height="6" fill={card} />
      <circle cx="160" cy="180" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="200" cy="190" r="14" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M240 170 h30 v16 h-30 Z" w={4} />
      <Line d="M138 190 l12 -8 M262 200 l-10 -6" w={2} />
      <Line d="M320 100 q14 -8 28 0 M330 130 q10 -6 22 0" w={3} dash="2 5" />
      <Shape d="M340 160 h30 v22 h-30 Z" w={3} />
      <Line d="M346 160 v-8 h18 v8" w={3} />
    </Drawing>
  );
}

export function WarpSeer() {
  return (
    <Drawing label="Drawing of a blind psyker with sewn-shut eyes shouting prophecies as the warp bleeds through">
      <Shape d="M170 80 C164 34 236 34 230 80 C236 106 164 106 170 80 Z" />
      <Line d="M180 70 H196 M204 70 H220" w={5} />
      <Line d="M184 66 v8 M190 66 v8 M208 66 v8 M214 66 v8" w={2} />
      <Shape d="M184 90 Q200 116 216 90 Z" w={4} />
      <Shape d="M148 108 H252 L282 224 H118 Z" />
      <Line d="M200 108 V224" w={3} />
      <Line d="M156 120 L100 80 L90 40 M244 120 L300 80 L310 40" w={7} />
      <Line d="M90 40 l-10 -10 M90 40 l0 -14 M90 40 l10 -10 M310 40 l-10 -10 M310 40 l0 -14 M310 40 l10 -10" w={3} />
      <Line d="M20 30 C60 10 90 50 130 20 M270 20 C310 50 340 10 380 30" w={4} dash="4 5" />
      <Line d="M60 130 q-14 14 -4 30 M340 130 q14 14 4 30" w={4} dash="3 5" />
      <Line d="M170 20 q30 -26 60 0" w={3} />
    </Drawing>
  );
}
