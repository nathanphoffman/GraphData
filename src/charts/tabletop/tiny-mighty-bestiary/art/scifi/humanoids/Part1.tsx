import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";

const card = CARD_COLOR;

export function ChromeTrooper() {
  return (
    <Drawing label="Drawing of a white-armored soldier in a faceless helmet firing past you">
      <Figure arms={<Line d="M152 114 L126 160 M248 114 L290 124" w={8} />}>
        <Shape d="M168 78 C164 30 236 30 232 78 L228 98 H172 Z" />
        <Line d="M176 66 H224" w={4} />
        <Line d="M200 106 V176 M160 130 H240" w={3} />
        <Shape d="M276 114 H340 V130 H276 Z" w={4} />
        <Line d="M340 122 H370" w={4} />
        <Line d="M350 108 l10 -8 M356 138 l12 6" w={3} />
      </Figure>
    </Drawing>
  );
}

export function FuzzWarrior() {
  return (
    <Drawing label="Drawing of a knee-high fuzzy forest dweller with a spear and a drum">
      <Shape d="M130 90 C110 130 130 200 200 204 C270 200 290 130 270 90 C250 60 150 60 130 90 Z" />
      <Line d="M130 100 l-8 -6 M126 120 l-10 0 M130 144 l-10 6 M270 100 l8 -6 M274 120 l10 0 M270 144 l10 6 M150 76 l-4 -10 M176 68 l-2 -12 M224 68 l2 -12 M250 76 l4 -10" w={4} />
      <circle cx="176" cy="104" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="224" cy="104" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={176} y={104} r={3} />
      <Dot x={224} y={104} r={3} />
      <Line d="M186 132 Q200 142 214 132" w={3} />
      <Line d="M70 30 V224" w={5} />
      <Solid d="M62 36 L70 8 L78 36 Z" />
      <Shape d="M290 160 H350 V204 H290 Z" w={4} />
      <Line d="M290 172 H350 M290 192 H350" w={2} />
      <Line d="M270 150 L300 160" w={5} />
      <Line d="M160 204 V224 M240 204 V224" w={8} />
    </Drawing>
  );
}

export function DuskMonk() {
  return (
    <Drawing label="Drawing of a hooded warrior in dark robes with a humming blade of light">
      <Shape d="M160 90 C150 28 250 28 240 90 L236 120 H164 Z" />
      <path d="M176 92 C176 66 224 66 224 92 C224 112 176 112 176 92 Z" fill="currentColor" />
      <Shape d="M150 118 H250 L284 224 H116 Z" />
      <Line d="M200 118 V224 M170 150 L230 150" w={3} />
      <Line d="M240 126 L290 110 L300 76" w={8} />
      <Line d="M296 80 L320 4" w={9} />
      <Line d="M296 80 L320 4" w={4} />
      <Line d="M290 86 H304" w={6} />
      <Line d="M160 126 L130 170" w={8} />
      <Line d="M336 30 q10 -4 14 6 M340 56 q12 -4 16 8 M270 40 q-8 -6 -16 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function DreadLord() {
  return (
    <Drawing label="Drawing of a towering figure in black armor with a breath mask, a cape and a crimson blade">
      <Shape d="M120 118 L90 224 H310 L280 118 Z" />
      <Solid d="M150 90 C146 36 254 36 250 90 L244 112 H156 Z" />
      <Shape d="M174 74 L226 74 L216 100 H184 Z" w={3} />
      <Line d="M184 80 H216 M192 90 H208" w={2} />
      <Solid d="M146 112 H254 L262 184 H138 Z" />
      <path d="M180 126 h40 v22 h-40 Z" fill={card} stroke="currentColor" strokeWidth="3" />
      <Dot x={190} y={137} r={2} />
      <Dot x={200} y={137} r={2} />
      <Dot x={210} y={137} r={2} />
      <Line d="M250 130 L290 120 L304 76" w={8} />
      <Line d="M300 82 L326 4" w={8} />
      <Line d="M294 90 H312" w={6} />
      <Line d="M150 130 L124 180" w={8} />
    </Drawing>
  );
}

export function LaserGrunt() {
  return (
    <Drawing label="Drawing of a helmeted foot soldier in flak armor with a laser rifle, others marching behind">
      <g opacity="0.55">
        <Shape d="M40 110 C40 80 80 80 80 110 V130 H40 Z M40 130 H80 V200 H40 Z" w={3} />
        <Shape d="M330 110 C330 80 370 80 370 110 V130 H330 Z M330 130 H370 V200 H330 Z" w={3} />
      </g>
      <Figure arms={<Line d="M154 116 L130 150 M246 116 L282 128" w={8} />}>
        <Shape d="M168 80 C162 30 238 30 232 80 L228 96 H172 Z" />
        <Line d="M172 70 H228" w={4} />
        <Line d="M200 106 V180 M152 128 H248" w={3} />
        <Shape d="M270 112 H350 V128 H270 Z" w={4} />
        <Line d="M350 120 H376" w={4} />
        <Line d="M380 114 l8 6 M380 126 l8 -6" w={2} />
      </Figure>
      <Ground y={228} />
    </Drawing>
  );
}

export function StarTempler() {
  return (
    <Drawing label="Drawing of a seven-foot warrior in sealed power armor with a brotherhood banner">
      <Line d="M320 20 V224" w={5} />
      <Shape d="M320 24 H376 V90 L348 74 L320 90 Z" w={4} />
      <Line d="M334 40 H362 M348 34 V60" w={3} />
      <Shape d="M168 74 C160 20 240 20 232 74 L226 98 H174 Z" />
      <Line d="M180 60 H220 M200 60 V90" w={4} />
      <Shape d="M110 108 L150 100 H250 L290 108 L284 140 H116 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Shape d="M144 190 H198 V226 H144 Z M202 190 H256 V226 H202 Z" w={4} />
      <Line d="M126 134 L108 176 M274 134 L300 120" w={11} />
      <Shape d="M100 170 H128 V196 H100 Z" w={4} />
      <Line d="M176 140 L200 160 L224 140" w={3} />
    </Drawing>
  );
}

export function IronMarshal() {
  return (
    <Drawing label="Drawing of a black-coated officer with a peaked cap and a pistol raised">
      <Shape d="M158 62 H242 L232 36 H168 Z" />
      <Line d="M150 66 H250" w={6} />
      <Solid d="M194 44 l6 8 l6 -8 Z" />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 86 H194 M206 86 H218" w={4} />
      <Line d="M188 104 H212" w={3} />
      <Solid d="M144 122 H256 L270 224 H130 Z" />
      <path d="M200 126 V222" stroke={card} strokeWidth="2" />
      <path d="M178 134 h12 M178 148 h12 M210 134 h12 M210 148 h12" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <Line d="M252 130 L296 110 L310 84" w={8} />
      <Shape d="M300 70 H352 V86 H300 Z" w={4} />
      <Line d="M352 78 H376" w={4} />
      <Line d="M150 130 L130 190" w={8} />
    </Drawing>
  );
}
