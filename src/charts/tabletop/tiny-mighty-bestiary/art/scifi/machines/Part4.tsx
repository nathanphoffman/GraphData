import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function Swarmling() {
  return (
    <Drawing label="Drawing of a crowd of claw-limbed carapaced hunters pouring in from the dark">
      {/* Repeat the shape at each listed position and scale. */}
      {[[90, 150, 1], [180, 130, 1.2], [270, 150, 1], [60, 210, 0.8], [140, 200, 0.9], [230, 205, 0.9], [330, 200, 0.8], [330, 120, 0.7]].map(([x, y, s], index) => (
        <g key={index} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-30 0 C-30 -24 30 -24 30 0 C30 14 -30 14 -30 0 Z" w={5} />
          <Line d="M-30 6 L-46 26 M-16 12 L-22 32 M16 12 L22 32 M30 6 L46 26" w={5} />
          <Line d="M-30 -6 L-48 -20 l10 2 M30 -6 L48 -20 l-10 2" w={5} />
          <Dot x={-8} y={-6} r={3} />
          <Dot x={8} y={-6} r={3} />
        </g>
      ))}
      <Line d="M20 40 v8 M16 44 h8 M350 50 v8 M346 54 h8 M200 30 v6 M197 33 h6" w={3} />
    </Drawing>
  );
}

export function ChitinCrusher() {
  return (
    <Drawing label="Drawing of a house-sized armored bio-monster with bone cannons and mouths on its limbs">
      <Shape d="M90 190 C70 110 140 60 210 64 C290 68 340 120 320 190 Z" />
      <Line d="M110 130 H300 M104 160 H310" w={4} />
      <Line d="M150 80 V190 M210 66 V190 M270 80 V190" w={3} />
      <Shape d="M120 70 L150 20 L170 70 Z M240 66 L270 16 L290 70 Z" w={4} />
      <Line d="M150 20 L140 4 M270 16 L282 0" w={4} />
      <circle cx="210" cy="110" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={210} y={110} r={5} />
      <Line d="M110 190 L70 224 M200 190 V224 M300 190 L340 224" w={12} />
      <ellipse cx="70" cy="226" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="200" cy="228" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="340" cy="226" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Solid d="M56 224 l4 6 l4 -6 Z M190 228 l4 6 l4 -6 Z M330 224 l4 6 l4 -6 Z" />
    </Drawing>
  );
}

export function NeonGutterCat() {
  return (
    <Drawing label="Drawing of a scruffy alley cat with glowing cyber eyes and a robotic tail knocking over a trash can">
      <Shape d="M270 120 H350 L342 224 H278 Z" />
      <Line d="M270 138 H350 M274 180 H346" w={3} />
      <Shape d="M262 110 H358 V122 H262 Z" w={4} />
      <Shape d="M150 190 C110 160 140 110 200 110 C250 110 270 150 250 190 Z" />
      <Shape d="M100 130 L92 84 L124 104 L170 104 L196 84 L200 130 C200 158 100 158 100 130 Z" />
      <circle cx="132" cy="118" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="166" cy="118" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={132} y={118} r={3} />
      <Dot x={166} y={118} r={3} />
      <Line d="M150 130 v6 M96 126 l-24 -4 M96 134 l-24 6 M204 126 l22 -4" w={3} />
      <Line d="M250 160 L290 150 M290 150 l10 -22 M300 128 l14 -10" w={5} />
      <Shape d="M278 148 h12 v8 h-12 Z M296 120 h12 v8 h-12 Z" w={3} />
      <Line d="M130 190 V220 M180 190 V220 M230 190 V220" w={8} />
      <Line d="M40 80 l10 -4 M30 100 l14 2" w={3} />
    </Drawing>
  );
}

export function SewerGator() {
  return (
    <Drawing label="Drawing of a pale blind alligator lurking in sewer water under a grate">
      <Line d="M10 150 H390" w={4} />
      <Line d="M60 20 V60 M120 20 V60 M180 20 V60 M240 20 V60 M300 20 V60" w={4} />
      <Line d="M50 30 H320" w={4} />
      <Shape d="M40 200 C60 160 160 150 240 160 C300 164 330 180 340 196 L384 200 L340 214 C300 224 100 230 40 200 Z" />
      <Line d="M80 168 l8 -10 l8 10 M120 164 l8 -10 l8 10 M160 162 l8 -10 l8 10 M200 164 l8 -10 l8 10" w={4} />
      <Line d="M350 198 H384" w={3} />
      <Solid d="M352 200 l4 8 l4 -8 Z M366 200 l4 8 l4 -8 Z" />
      <path d="M318 178 q8 -6 16 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <Line d="M10 226 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M40 200 C16 204 8 220 10 230" w={7} />
      <Line d="M240 100 q-6 8 0 16 M270 90 q-6 8 0 16" w={3} dash="2 5" />
    </Drawing>
  );
}

export function ChompBall() {
  return (
    <Drawing label="Drawing of a toothy bouncing ball of meat with a gassy puff">
      <circle cx="220" cy="120" r="76" fill={card} {...ink} />
      <Dot x={196} y={90} r={6} />
      <Dot x={244} y={86} r={6} />
      <Shape d="M156 128 Q220 188 284 128 Q220 150 156 128 Z" w={4} />
      <Solid d="M172 132 l6 14 l6 -10 Z M194 140 l6 16 l6 -14 Z M218 144 l6 16 l6 -14 Z M242 140 l6 14 l6 -14 Z M262 134 l6 12 l6 -12 Z" />
      <Line d="M170 78 q10 -8 20 -2 M236 72 q10 -8 20 0" w={4} />
      <Line d="M150 70 C140 80 140 100 150 110 M290 90 C300 100 298 114 290 124" w={3} />
      <Line d="M70 150 q-14 -6 -26 4 q-14 -6 -22 8 q14 4 24 -2 q10 8 24 0 Z" w={3} />
      <Line d="M150 216 q70 -14 140 0" w={3} dash="2 8" />
    </Drawing>
  );
}

export function SludgePup() {
  return (
    <Drawing label="Drawing of a cheerful ooze shaped like a puppy with a wagging tail, wanting to be petted">
      <Shape d="M90 200 C80 150 120 110 190 110 C240 110 270 140 270 200 C240 210 130 210 90 200 Z" />
      <Shape d="M220 120 C210 80 250 56 290 66 C320 74 322 110 300 126 C280 140 232 140 220 120 Z" />
      <Shape d="M236 74 C220 60 216 90 224 100 Z M296 66 C316 50 324 84 312 100 Z" w={4} />
      <Dot x={262} y={92} r={5} />
      <Dot x={290} y={96} r={5} />
      <Dot x={304} y={108} r={4} />
      <Line d="M264 116 q12 10 24 0" w={3} />
      <Shape d="M276 118 q8 14 16 0 Z" w={3} />
      <Line d="M90 170 C50 170 40 130 60 110" w={9} />
      <Line d="M120 200 V224 M170 204 V224 M230 204 V224" w={9} />
      <Line d="M300 40 l10 -10 M326 54 l14 -4" w={3} />
      <Shape d="M310 12 q-10 -8 -2 -14 q8 4 2 14 Z" w={2} />
      <Line d="M150 210 q-6 12 0 18 M200 214 q-4 10 0 14" w={3} />
    </Drawing>
  );
}
