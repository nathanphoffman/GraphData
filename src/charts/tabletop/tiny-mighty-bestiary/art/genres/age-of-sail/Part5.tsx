import { Dot, Drawing, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function CatacombCrawler() {
  return (
    <Drawing label="Drawing of a pale many-armed thing in the dark of a wreck's cargo hold, grabbing for a sailor with a lantern">
      <Shape d="M0 20 H400 V224 H0 Z" w={5} />
      <Line d="M60 20 V224 M340 20 V224" w={5} />
      <Shape d="M60 160 H340 V224 H60 Z" w={3} />
      <Shape d="M110 130 H160 V160 H110 Z M240 120 H300 V160 H240 Z" w={4} />
      <Shape d="M170 106 C150 70 250 60 240 110 C250 140 160 140 170 106 Z" />
      <circle cx="194" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="220" cy="94" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={194} y={96} r={2} />
      <Dot x={220} y={94} r={2} />
      <Line d="M170 110 C130 100 110 130 90 120 M240 110 C280 100 300 130 320 120 M180 130 C150 160 130 180 100 176 M230 130 C260 160 280 180 310 176 M200 134 C196 170 210 190 200 210" w={7} />
      <Line d="M90 120 l-8 -8 M320 120 l8 -8 M100 176 l-10 4 M310 176 l10 4" w={3} />
      <Shape d="M350 140 H376 V168 H350 Z" w={4} />
      <Line d="M363 140 V128" w={3} />
      <Line d="M330 120 l14 -10 M376 120 l12 -10" w={3} dash="2 4" />
    </Drawing>
  );
}

export function BilgeSprite() {
  return (
    <Drawing label="Drawing of a slimy little spirit in the bottom of the hold loosening every knot it can find">
      <Shape d="M0 130 H400 V230 H0 Z" w={5} />
      <Line d="M0 170 H400 M0 200 H400" w={2} dash="6 8" />
      <Line d="M10 200 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Shape d="M150 190 C140 150 160 110 200 110 C240 110 260 150 250 190 C230 204 170 204 150 190 Z" />
      <circle cx="184" cy="144" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="144" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={144} r={3} />
      <Dot x={216} y={144} r={3} />
      <Line d="M184 168 Q200 182 218 168" w={3} />
      <Line d="M160 150 L110 130 L90 90 M240 150 L290 134 L310 100" w={6} />
      <Line d="M90 90 C70 90 70 60 90 56 C110 56 110 76 94 78" w={4} />
      <Line d="M310 100 C330 100 334 70 314 66" w={4} />
      <Line d="M200 110 C200 90 180 80 190 60" w={3} />
      <Line d="M170 190 l-4 14 M230 190 l6 14" w={4} />
      <Line d="M100 160 q-6 8 0 16 M300 170 q6 8 0 16" w={3} dash="2 4" />
    </Drawing>
  );
}

export function SquallWraith() {
  return (
    <Drawing label="Drawing of a whirlwind of rain with a woman's screaming face riding a storm front">
      <Shape d="M20 70 q16 -30 40 -18 q20 -34 56 -10 q36 -20 54 14 q30 -6 40 20 Z" w={5} />
      <Shape d="M220 56 q16 -30 40 -18 q20 -34 56 -10 q36 -20 54 14 q30 -6 40 20 Z" w={5} />
      <Line d="M50 90 l-10 28 M90 90 l-10 28 M130 94 l-10 28 M250 90 l-10 28 M290 90 l-10 28 M330 94 l-10 28" w={3} />
      <path d="M200 60 C260 70 270 100 220 120 C170 140 180 160 230 170 C260 176 250 200 210 210 C180 218 190 230 220 232" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M200 90 C150 100 160 130 200 140 C240 150 230 170 200 176" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 6" />
      <Shape d="M166 130 C158 84 234 84 226 130 C230 160 162 160 166 130 Z" />
      <Line d="M162 120 C140 140 130 170 140 190 M230 120 C256 140 266 170 256 190" w={5} />
      <Dot x={184} y={112} r={4} />
      <Dot x={208} y={112} r={4} />
      <Shape d="M186 130 Q197 160 208 130 Z" w={3} />
      <Line d="M30 190 q15 -10 30 0 t30 0 M290 200 q15 -10 30 0 t30 0" w={3} />
    </Drawing>
  );
}

export function CabinBoyGhost() {
  return (
    <Drawing label="Drawing of the ghost of a young cabin boy trailing a new crew and getting into trouble, a bucket tipped over">
      <path d="M150 90 C146 40 230 40 226 90 L232 190 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -26 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Line d="M164 56 q24 -22 48 0" w={4} />
      <Dot x={176} y={80} r={4} />
      <Dot x={202} y={80} r={4} />
      <Line d="M180 98 Q190 108 200 98" w={3} />
      <Line d="M154 120 L118 100 M226 124 L260 150" w={5} dash="6 5" />
      <Shape d="M260 150 H306 L300 190 H266 Z" w={4} />
      <Line d="M264 150 V140 H302 V150" w={3} />
      <Line d="M306 170 q20 6 30 24 M300 190 q10 20 4 34" w={4} />
      <Line d="M326 180 q10 -4 16 4" w={3} dash="2 4" />
      <Line d="M290 110 l24 -10 M300 124 l30 -2" w={3} dash="3 4" />
      <Shape d="M40 150 H100 L90 200 H50 Z" w={3} />
      <Line d="M60 150 V130 H80 V150" w={3} />
    </Drawing>
  );
}

export function LanternKeeperGhost() {
  return (
    <Drawing label="Drawing of the ghost of an old lighthouse keeper steering ships onto reefs with a false light">
      <Shape d="M290 224 L304 80 H356 L370 224 Z" w={4} />
      <Shape d="M298 80 H362 L356 58 H304 Z" w={4} />
      <Shape d="M310 58 H350 V30 H310 Z" w={3} />
      <Line d="M300 120 H366 M296 170 H370" w={3} />
      <Line d="M330 30 V12 M318 12 H342" w={4} />
      <Line d="M300 40 l-60 -10 M360 40 l40 -10" w={3} dash="6 6" />
      <path d="M120 86 C116 40 196 40 192 86 L198 190 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -24 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Shape d="M110 54 C130 20 180 20 200 54 Z" w={4} />
      <Dot x={142} y={78} r={4} />
      <Dot x={170} y={78} r={4} />
      <Line d="M142 100 q14 8 30 0" w={3} />
      <Line d="M196 120 L232 100" w={5} dash="6 5" />
      <Shape d="M226 82 H252 V112 H226 Z" w={4} />
      <Line d="M232 82 V72 H246 V82" w={3} />
      <Line d="M10 224 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Shape d="M60 200 L80 190 L96 200 L80 208 Z" w={3} />
    </Drawing>
  );
}

export function SpectralLeviathanCaptain() {
  return (
    <Drawing label="Drawing of a ghostly captain in barnacle-covered robes riding the back of a drowned whale-ship">
      <Shape d="M20 150 C20 100 120 80 220 90 C320 100 380 140 370 190 C300 224 120 224 60 190 C30 180 20 170 20 150 Z" />
      <Line d="M60 170 L160 150 L260 154 M60 196 L300 190" w={3} />
      <Shape d="M20 150 L-4 120 L8 160 L-8 186 L26 176 Z" w={4} />
      <circle cx="320" cy="136" r="7" fill="currentColor" />
      <Line d="M150 120 l-10 -30 M190 110 l-4 -30 M230 112 l8 -26" w={5} />
      <Shape d="M168 50 C164 12 232 12 228 50 C232 74 164 74 168 50 Z" w={5} />
      <Shape d="M150 22 L200 -10 L250 22 Q200 36 150 22 Z" w={4} />
      <Dot x={184} y={46} r={3} />
      <Dot x={208} y={46} r={3} />
      <path d="M146 76 H254 L276 118 H124 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <circle cx="160" cy="100" r="5" fill="none" {...ink} strokeWidth={2} />
      <circle cx="200" cy="96" r="4" fill="none" {...ink} strokeWidth={2} />
      <circle cx="240" cy="102" r="5" fill="none" {...ink} strokeWidth={2} />
    </Drawing>
  );
}

export function GhostTide() {
  return (
    <Drawing label="Drawing of a wave of pale grasping hands rising from calm water to pull a sailor under">
      <Line d="M0 150 H400" w={3} />
      <Shape d="M60 150 L90 130 H170 L150 150 Z" w={4} />
      <Line d="M110 130 V100 M110 104 L136 114 L110 124" w={3} />
      <Shape d="M110 70 C106 40 150 40 146 70 Z" w={3} />
      <Line d="M118 78 V96 M138 78 V96" w={5} />
      {/* One bar per step across the drawing, with varied heights. */}
      {Array.from({ length: 11 }, (_unused, index) => {
        const xPos = 30 + index * 34;
        const height = 36 + ((index * 17) % 30);

        return (
          <g key={index} transform={`translate(${xPos} ${200})`}>
            <Line d={`M0 0 V${-height}`} w={5} />
            <Line d={`M0 ${-height} l-8 -12 M0 ${-height} l-3 -14 M0 ${-height} l3 -14 M0 ${-height} l8 -12`} w={3} />
          </g>
        );
      })}
      <Line d="M0 200 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M0 224 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
    </Drawing>
  );
}
