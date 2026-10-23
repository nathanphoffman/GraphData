import { Dot, Drawing, Ground, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

/** Cowboy hat in front view, centered on x=200 with the brim at `y`. */
export function Hat({ y = 62, w = 60 }: { y?: number; w?: number }) {
  return (
    <>
      <Shape d={`M${200 - w * 0.55} ${y} C${200 - w * 0.55} ${y - 44} ${200 + w * 0.55} ${y - 44} ${200 + w * 0.55} ${y} Z`} />
      <Line d={`M${200 - w * 0.55} ${y - 14} H${200 + w * 0.55}`} w={3} />
      <Line d={`M${200 - w - 14} ${y - 6} Q${200 - w} ${y + 8} ${200 - w * 0.5} ${y + 2} H${200 + w * 0.5} Q${200 + w} ${y + 8} ${200 + w + 14} ${y - 6}`} w={5} />
    </>
  );
}

export function Cactus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Shape d="M-10 0 V-70 Q-10 -84 0 -84 Q10 -84 10 -70 V0 Z" w={4} />
      <Line d="M10 -30 H22 V-52 M-10 -42 H-22 V-60" w={5} />
    </g>
  );
}

export function RunawayLocomotive() {
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

export function ClockworkGunslinger() {
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

export function IronHorseAutomaton() {
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

export function GallowsMarionette() {
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
