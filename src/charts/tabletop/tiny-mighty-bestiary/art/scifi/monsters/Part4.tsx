import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function AsteroidDevourer() {
  return (
    <Drawing label="Drawing of a stone-crunching worm the size of a cruiser biting through an asteroid">
      <Shape d="M30 70 L110 40 L190 60 L220 120 L180 190 L90 200 L30 150 Z" />
      <Line d="M70 80 l30 10 M130 110 l-20 20 M60 140 l30 -6" w={3} />
      <Shape d="M190 110 C240 90 310 90 360 120 C390 140 380 190 330 200 C280 210 230 190 190 160 Z" />
      <Line d="M240 100 q10 30 0 80 M290 96 q10 34 0 90" w={3} />
      <ellipse cx="190" cy="136" rx="20" ry="32" fill={card} {...ink} strokeWidth={4} />
      <Solid d="M178 112 l10 4 l-10 4 Z M178 128 l10 4 l-10 4 Z M178 144 l10 4 l-10 4 Z M200 112 l-10 4 l10 4 Z M200 128 l-10 4 l10 4 Z" />
      <Line d="M150 190 l-10 12 M120 70 l-8 -12 M160 60 l8 -14" w={3} />
      <circle cx="350" cy="50" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="70" cy="214" r="8" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function NovaSlug() {
  return (
    <Drawing label="Drawing of a bloated glowing slug in a nebula cloud eating a power cell">
      <Line d="M20 60 q16 -16 32 0 q16 -16 32 0 M300 40 q16 -16 32 0 q16 -16 32 0 M40 210 q16 -16 32 0 q16 -16 32 0 M300 210 q16 -16 32 0 q16 -16 32 0" w={3} dash="3 6" />
      <Shape d="M60 190 C40 130 120 90 210 100 C290 110 330 150 310 190 Z" />
      <Shape d="M270 130 C270 96 316 88 332 116 C346 142 316 158 292 152 Z" />
      <Line d="M290 92 L280 62 M316 92 L328 64" w={4} />
      <circle cx="280" cy="58" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="328" cy="60" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={280} y={58} r={2} />
      <Dot x={328} y={60} r={2} />
      <Line d="M290 134 q12 8 24 0" w={3} />
      <Shape d="M330 160 H370 V190 H330 Z" w={4} />
      <Line d="M340 160 V150 H360 V160 M342 176 H358" w={3} />
      <Line d="M100 130 q12 -10 24 0 M150 120 q12 -10 24 0 M200 126 q12 -10 24 0" w={3} />
      <Line d="M60 190 C40 196 30 210 20 214" w={5} />
      <Line d="M100 80 l-8 -14 M150 70 l-2 -16 M210 74 l4 -14 M260 86 l10 -12" w={3} />
    </Drawing>
  );
}

export function VacuumLurker() {
  return (
    <Drawing label="Drawing of a pale boneless thing clinging to the outside of a space station and sliding in through an airlock seal">
      <Shape d="M0 120 H400 V224 H0 Z" w={5} />
      <Line d="M40 120 V224 M120 120 V224 M280 120 V224 M360 120 V224" w={3} />
      <Shape d="M160 150 H240 V224 H160 Z" w={4} />
      <Line d="M200 150 V224" w={3} />
      <Line d="M170 140 L230 140" w={3} />
      <Shape d="M130 120 C110 90 130 50 170 50 C210 50 240 80 230 120 Z" />
      <Dot x={158} y={80} r={4} />
      <Dot x={192} y={78} r={4} />
      <Line d="M150 100 Q175 112 200 100" w={3} />
      <Line d="M230 118 C270 100 290 60 340 60 M130 120 C100 110 70 80 40 90 M200 120 C210 150 200 160 206 190" w={9} />
      <Line d="M340 60 l14 -6 M40 90 l-14 -6" w={4} />
      <Dot x={60} y={30} r={2} />
      <Dot x={340} y={24} r={2} />
      <Dot x={290} y={36} r={2} />
    </Drawing>
  );
}

export function UploadGhost() {
  return (
    <Drawing label="Drawing of a half-corrupted face living in the wiring inside a wall, with glitching pixels">
      <Shape d="M40 30 H360 V210 H40 Z" w={4} />
      <Line d="M40 70 H360 M40 110 H360 M40 150 H360" w={2} dash="3 8" />
      <Line d="M80 30 V210 M320 30 V210" w={5} />
      <Shape d="M150 70 C150 40 250 40 250 70 C260 110 240 150 200 156 C160 150 140 110 150 70 Z" />
      <path d="M200 44 L250 70 C260 110 240 150 200 156 Z" fill={card} stroke="currentColor" strokeWidth="3" strokeDasharray="3 4" />
      <circle cx="178" cy="84" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={178} y={84} r={3} />
      <Shape d="M214 76 H240 V92 H214 Z" w={3} />
      <Line d="M180 120 Q200 130 224 118" w={4} />
      <Line d="M170 156 C170 180 150 190 120 200 M230 156 C230 180 250 190 280 200" w={5} />
      <Shape d="M240 100 H264 V110 H240 Z M250 124 H278 V132 H250 Z M130 100 H148 V108 H130 Z" w={2} />
    </Drawing>
  );
}

export function StaticSprite() {
  return (
    <Drawing label="Drawing of a crackling blue wisp leaking out of an old comm panel">
      <Shape d="M20 150 H220 V224 H20 Z" w={5} />
      <circle cx="60" cy="186" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="110" cy="186" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 170 H200 M150 186 H200 M150 202 H190" w={3} />
      <Line d="M140 150 V120" w={4} />
      <Line d="M120 120 l20 0 l-4 12 Z" w={3} />
      <Shape d="M240 100 C230 60 270 30 300 50 C330 70 320 100 300 110 C320 130 290 160 270 140 C260 130 250 120 240 100 Z" />
      <Dot x={274} y={78} r={4} />
      <Dot x={296} y={86} r={4} />
      <Line d="M270 100 q10 8 20 0" w={3} />
      <Line d="M240 100 l-20 -14 l12 -2 l-16 -18 M300 50 l12 -22 l-4 12 l20 -6 M320 100 l26 4 l-14 8 l22 14" w={3} />
      <Line d="M190 150 C220 130 230 120 244 110" w={4} dash="2 5" />
    </Drawing>
  );
}

export function HangarHaunt() {
  return (
    <Drawing label="Drawing of the flickering echo of a dead pilot running pre-flight checks on a wrecked fighter">
      <Shape d="M60 190 L130 160 L300 150 L370 176 L300 190 Z" />
      <Shape d="M150 160 L160 100 L200 150 Z M280 150 L290 110 L310 148 Z" w={4} />
      <Line d="M300 150 L340 140" w={4} />
      <Line d="M110 180 l-20 18 M200 188 l-6 24 M290 190 l10 20" w={5} />
      <Line d="M170 180 l14 20 l-16 4 M240 186 l12 16" w={3} />
      <path d="M170 84 C170 30 240 30 240 84 L246 130 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -26 0 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="4 7" strokeLinecap="round" />
      <Dot x={190} y={72} r={4} />
      <Dot x={216} y={72} r={4} />
      <Line d="M176 56 q30 -20 60 0" w={4} />
      <Line d="M240 100 L270 90" w={4} dash="3 5" />
      <Shape d="M268 80 H296 V98 H268 Z" w={3} />
      <Line d="M274 88 h16" w={2} />
      <Ground y={226} />
    </Drawing>
  );
}
