import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function BlackKnight() {
  return (
    <Drawing label="Drawing of a knight in black armor standing on a bridge with a sword planted in front of him">
      <Line d="M20 210 H380" w={6} />
      <Line d="M40 210 V230 M120 210 V230 M280 210 V230 M360 210 V230" w={4} />
      <Solid d="M160 90 C158 38 242 38 240 90 V100 H160 Z" />
      <Line d="M172 84 H228" w={4} />
      <path d="M172 82 H228 V88 H172 Z" fill={card} />
      <Solid d="M140 108 H260 L270 170 H130 Z" />
      <Solid d="M150 170 H250 V210 H150 Z" />
      <Solid d="M130 110 L100 150 L116 160 L146 130 Z" />
      <Solid d="M270 110 L296 140 L284 154 L262 130 Z" />
      <Line d="M300 20 V190" w={6} />
      <Solid d="M290 190 H310 L300 200 Z" />
      <Line d="M280 60 H320" w={6} />
      <path d="M200 40 Q220 14 240 22" fill="none" {...ink} strokeWidth={4} />
    </Drawing>
  );
}

export function ChestLurker() {
  return (
    <Drawing label="Drawing of a wooden chest with a toothy open mouth and stubby legs">
      <Shape d="M90 100 C90 40 310 40 310 100 L300 120 H100 Z" />
      <Line d="M130 48 V112 M270 48 V112" w={4} />
      <Dot x={180} y={80} r={6} />
      <Dot x={220} y={80} r={6} />
      <Shape d="M100 120 H300 L310 150 H90 Z" w={4} />
      <Solid d="M112 122 l10 20 l10 -20 Z M150 122 l10 20 l10 -20 Z M190 122 l10 20 l10 -20 Z M230 122 l10 20 l10 -20 Z M268 122 l10 20 l10 -20 Z" />
      <Shape d="M90 150 H310 V206 H90 Z" />
      <Line d="M90 168 H310 M130 150 V206 M270 150 V206" w={3} />
      <Shape d="M186 162 H214 V184 H186 Z" w={4} />
      <Line d="M110 206 V222 M290 206 V222" w={8} />
      <Line d="M120 130 q-4 14 0 20 M160 130 q-4 14 0 20" w={3} />
    </Drawing>
  );
}

export function BouncySlime() {
  return (
    <Drawing label="Drawing of a cheerful round slime blob bouncing">
      <Shape d="M110 200 C70 190 80 80 200 70 C320 80 330 190 290 200 C240 210 160 210 110 200 Z" />
      <Dot x={168} y={120} r={9} />
      <Dot x={232} y={120} r={9} />
      <circle cx="171" cy="116" r="3" fill={card} />
      <circle cx="235" cy="116" r="3" fill={card} />
      <Line d="M170 150 Q200 180 230 150" />
      <Line d="M130 100 q10 -14 26 -14" w={4} />
      <Line d="M300 120 q8 -4 8 -12" w={3} />
      <Line d="M170 224 H230" w={3} />
      <Line d="M130 224 H150 M250 224 H270" w={3} />
      <Line d="M200 34 V50 M170 40 l8 12 M230 40 l-8 12" w={4} />
    </Drawing>
  );
}

export function CaveWurm() {
  return (
    <Drawing label="Drawing of a huge blind worm with a ring of teeth bursting up through the floor">
      <Line d="M20 190 H110 M290 190 H380" w={4} />
      <Shape d="M124 190 C110 120 130 60 200 40 C270 60 290 120 276 190 Z" />
      <Line d="M118 150 q40 10 82 0 q42 10 82 0 M122 110 q38 10 78 0 q40 10 78 0 M134 74 q34 8 66 0 q34 8 66 0" w={3} />
      <ellipse cx="200" cy="60" rx="40" ry="18" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="60" rx="22" ry="8" fill="currentColor" />
      <Solid d="M162 56 l6 8 l6 -8 Z M178 50 l6 8 l6 -8 Z M194 48 l6 8 l6 -8 Z M210 50 l6 8 l6 -8 Z M226 52 l6 8 l6 -8 Z M236 60 l-4 8 l-6 -8 Z M170 64 l6 -8 l6 8 Z" />
      <Line d="M84 190 l-8 -14 l-12 8 M316 190 l8 -14 l12 8 M96 206 l-6 14 M300 206 l8 14" w={3} />
      <Line d="M110 218 q20 8 40 0 M250 218 q20 8 40 0" w={3} />
    </Drawing>
  );
}

export function CloudLeviathan() {
  return (
    <Drawing label="Drawing of a round-bellied whale floating among clouds with a tiny airship nearby">
      <Shape d="M60 120 C60 60 200 40 290 90 C330 110 340 150 316 160 C280 190 180 200 120 180 C80 168 60 150 60 120 Z" />
      <Line d="M130 170 C170 200 250 200 290 170 M150 188 H280" w={3} />
      <Shape d="M60 120 L24 84 L40 130 L20 150 L66 138 Z" />
      <Dot x={290} y={110} r={5} />
      <Line d="M300 136 q20 6 28 -2" w={4} />
      <Line d="M180 110 Q220 80 250 100" w={3} />
      <Shape d="M40 210 q4 -20 28 -18 q10 -16 32 -4 q22 -6 26 14 q14 4 10 14 H44 q-10 -2 -4 -6 Z" w={3} />
      <Shape d="M280 220 q4 -16 24 -14 q10 -12 28 -2 q18 -4 20 12 H280 Z" w={3} />
      <Line d="M110 40 q10 -10 22 -4 q10 -10 22 0 q14 -2 14 10 H110 Z" w={3} />
      <Shape d="M326 30 C326 14 366 14 366 30 C366 42 326 42 326 30 Z" w={3} />
      <Line d="M334 42 v6 M358 42 v6 M334 48 h24" w={2} />
    </Drawing>
  );
}

export function BoneSorcerer() {
  return (
    <Drawing label="Drawing of a robed skeleton with a crown of finger bones and a staff">
      <Line d="M120 20 V224" w={6} />
      <Shape d="M108 20 Q120 4 132 20 Q120 34 108 20 Z" w={4} />
      <Shape d="M182 96 C170 50 230 50 218 96 L216 110 H184 Z" />
      <Dot x={192} y={82} r={6} />
      <Dot x={208} y={82} r={6} />
      <Line d="M200 92 v6" w={3} />
      <Line d="M190 106 V112 M200 106 V112 M210 106 V112" w={3} />
      <Line d="M170 62 V30 M184 58 V22 M200 56 V16 M216 58 V22 M230 62 V30" w={6} />
      <Line d="M162 62 H238" w={5} />
      <Shape d="M170 116 H230 L270 218 H130 Z" />
      <Line d="M184 150 H216 M180 170 H220 M176 190 H224" w={3} />
      <Line d="M170 130 L128 156" />
      <Line d="M230 130 L280 150 L296 124" />
      <Line d="M296 124 l-6 -10 M296 124 l2 -12 M296 124 l8 -8" w={3} />
      <Line d="M330 70 q10 -6 20 0 M320 100 q14 -8 28 0" w={3} />
    </Drawing>
  );
}
