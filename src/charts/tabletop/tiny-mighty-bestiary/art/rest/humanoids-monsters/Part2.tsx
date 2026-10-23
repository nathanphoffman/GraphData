import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function SyndicateEnforcer() {
  return (
    <Drawing label="Drawing of a chrome-armored street boss flanked by smaller silhouettes of his payroll">
      <g opacity="0.5">
        <Shape d="M30 100 C30 76 70 76 70 100 V120 H30 Z M30 120 H70 V200 H30 Z" w={3} />
        <Shape d="M330 100 C330 76 370 76 370 100 V120 H330 Z M330 120 H370 V200 H330 Z" w={3} />
      </g>
      <Shape d="M166 76 C160 28 240 28 234 76 L228 98 H172 Z" />
      <Line d="M180 66 H220" w={5} />
      <Dot x={190} y={66} r={0} />
      <Shape d="M112 106 L150 98 H250 L288 106 L282 140 H118 Z" />
      <Shape d="M148 140 H252 L260 190 H140 Z" />
      <Line d="M200 98 V190 M164 160 H236" w={3} />
      <Line d="M130 130 L100 170 M270 130 L300 170" w={11} />
      <Shape d="M148 190 H196 V226 H148 Z M204 190 H252 V226 H204 Z" w={4} />
      <Line d="M180 56 l8 -10 M220 56 l-8 -10" w={3} />
    </Drawing>
  );
}

export function StarforgedSquire() {
  return (
    <Drawing label="Drawing of a teenage squire in glowing runic plate struggling to hold a laser-sword">
      <Shape d="M176 84 C170 44 230 44 224 84 L220 102 H180 Z" />
      <Line d="M186 76 H214" w={4} />
      <Shape d="M130 112 L164 106 H236 L270 112 L264 138 H136 Z" />
      <Shape d="M158 138 H242 L248 184 H152 Z" />
      <Line d="M200 106 V184 M170 150 l8 8 l-8 8 M230 150 l-8 8 l8 8" w={3} />
      <Line d="M138 126 L116 170 M262 126 L296 112 L318 66" w={9} />
      <Line d="M318 66 L360 0" w={10} />
      <Line d="M318 66 L360 0" w={4} />
      <Line d="M308 76 H330" w={6} />
      <Shape d="M156 184 H196 V226 H156 Z M204 184 H244 V226 H204 Z" w={4} />
      <Line d="M300 40 q10 -8 20 0 M340 60 q8 -6 16 0" w={3} dash="2 4" />
    </Drawing>
  );
}

export function AstralArchmage() {
  return (
    <Drawing label="Drawing of a robed sorcerer with a halo of orbiting moons bending starlight into a spell">
      <circle cx="200" cy="70" r="70" fill="none" {...ink} strokeWidth={2} strokeDasharray="3 6" />
      <circle cx="140" cy="40" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="270" cy="50" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="250" cy="116" r="12" fill={card} {...ink} strokeWidth={3} />
      <circle cx="150" cy="110" r="6" fill="currentColor" />
      <Shape d="M174 70 C170 36 230 36 226 70 C230 96 170 96 174 70 Z" />
      <Dot x={188} y={66} r={3} />
      <Dot x={212} y={66} r={3} />
      <Shape d="M150 100 H250 L284 224 H116 Z" />
      <Line d="M200 100 V224" w={3} />
      <Solid d="M200 140 l5 12 l12 1 l-9 8 l3 12 l-11 -7 l-11 7 l3 -12 l-9 -8 l12 -1 Z" />
      <Line d="M158 112 L116 90 M242 112 L284 130 L320 120" w={6} />
      <Line d="M320 120 q20 -10 40 0 M320 120 q16 -20 34 -26 M320 120 q16 12 34 14" w={3} dash="3 5" />
    </Drawing>
  );
}

export function IronCrusadeLord() {
  return (
    <Drawing label="Drawing of a towering warrior in ancient power armor shouting, with a banner and a sword">
      <Line d="M340 10 V224" w={5} />
      <Shape d="M340 14 H390 V74 L365 60 L340 74 Z" w={4} />
      <Line d="M352 30 H378" w={3} />
      <Shape d="M168 76 C162 28 238 28 232 76 L226 98 H174 Z" />
      <Line d="M180 66 H220" w={5} />
      <Shape d="M110 108 L150 100 H250 L290 108 L284 140 H116 Z" />
      <Solid d="M116 108 l-10 -22 l24 16 Z M284 108 l10 -22 l-24 16 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Line d="M200 100 V190 M160 160 H240" w={3} />
      <Line d="M130 126 L100 80 L112 46 M270 126 L300 150 L330 100" w={12} />
      <Line d="M112 46 L130 0" w={6} />
      <Shape d="M146 190 H198 V226 H146 Z M202 190 H254 V226 H202 Z" w={4} />
      <Line d="M60 60 l12 -6 M50 90 l18 0 M60 120 l12 6" w={3} />
    </Drawing>
  );
}

export function BrassWarlord() {
  return (
    <Drawing label="Drawing of a general in a clanking exosuit commanding a row of small mechanical troops">
      <Shape d="M150 80 C146 40 254 40 250 80 L244 108 H156 Z" />
      <Line d="M170 76 H230" w={5} />
      <Dot x={188} y={76} r={3} />
      <Dot x={212} y={76} r={3} />
      <Line d="M200 40 V22 M186 22 H214" w={4} />
      <Shape d="M96 116 H304 L316 200 H84 Z" />
      <Shape d="M70 110 H110 V150 H70 Z M290 110 H330 V150 H290 Z" w={5} />
      <circle cx="200" cy="158" r="26" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 138 V158 L214 164" w={3} />
      <Line d="M90 150 L56 190 M310 150 L344 170 L376 140" w={13} />
      <Shape d="M110 200 H190 V226 H110 Z M210 200 H290 V226 H210 Z" w={5} />
      <Line d="M376 140 L396 120" w={4} />
      {[26, 52].map((x) => (
        <g key={x}><Shape d={`M${x} 170 h18 v30 h-18 Z`} w={3} /><Shape d={`M${x + 2} 150 h14 v20 h-14 Z`} w={3} /></g>
      ))}
    </Drawing>
  );
}

export function ChimneyUrchin() {
  return (
    <Drawing label="Drawing of a soot-covered child climbing up a factory chimney with a bag of stolen parts">
      <Shape d="M220 224 L240 20 H320 L340 224 Z" w={5} />
      <Line d="M232 70 H328 M228 120 H332 M224 170 H336" w={3} />
      <Line d="M240 20 L236 4 M320 20 L324 4" w={4} />
      <Shape d="M160 96 C154 66 202 66 198 96 C200 114 160 114 160 96 Z" />
      <Dot x={172} y={92} r={3} />
      <Dot x={186} y={92} r={3} />
      <Line d="M170 102 q8 6 16 0" w={2} />
      <Line d="M162 74 l-6 -10 M180 70 l0 -12 M196 74 l8 -8" w={3} />
      <Shape d="M150 118 H206 L212 170 H144 Z" />
      <Line d="M206 124 L246 150 M150 126 L130 160" w={6} />
      <Shape d="M110 150 H150 L146 196 H114 Z" w={4} />
      <Line d="M124 150 q6 -18 12 0" w={3} />
      <Line d="M160 170 L150 210 M200 170 L226 200 L240 190" w={7} />
      <Ground y={226} x2={220} />
    </Drawing>
  );
}

export function CyberSamuraiChampion() {
  return (
    <Drawing label="Drawing of a chrome-plated blade master in an open street, katana drawn, neon signs behind">
      <Shape d="M20 20 H100 V60 H20 Z M300 30 H380 V64 H300 Z" w={4} />
      <Line d="M30 40 H90 M310 46 H370" w={3} dash="5 4" />
      <Shape d="M166 76 C160 30 240 30 234 76 L226 98 H174 Z" />
      <Shape d="M156 52 L200 30 L244 52 Z" w={4} />
      <Line d="M180 74 H220" w={5} />
      <Shape d="M114 108 L150 100 H250 L286 108 L280 136 H120 Z" />
      <Shape d="M150 136 H250 L258 190 H142 Z" />
      <Line d="M200 100 V190 M154 160 H246" w={3} />
      <Line d="M138 124 L110 150 L132 170 M262 124 L296 106 L310 70" w={9} />
      <Line d="M300 90 L384 8" w={4} />
      <Line d="M300 90 L384 8" w={2} />
      <Line d="M290 84 H316" w={6} />
      <Shape d="M148 190 H196 V226 H148 Z M204 190 H252 V226 H204 Z" w={4} />
    </Drawing>
  );
}
