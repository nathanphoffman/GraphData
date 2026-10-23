import { Dot, Drawing, Ground, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function NebulaStalker() {
  return (
    <Drawing label="Drawing of a freighter-sized void predator with long jaws trailing a ship's engine wake">
      <Shape d="M20 120 C80 60 220 50 300 90 L384 120 L300 150 C220 190 80 180 20 120 Z" />
      <Line d="M300 90 L340 106 L300 112 M300 150 L340 134 L300 128" w={4} />
      <Solid d="M310 112 l6 10 l6 -10 Z M326 114 l6 10 l6 -10 Z" />
      <Dot x={270} y={104} r={5} />
      <Line d="M120 80 C100 40 80 30 60 36 M160 76 C150 36 130 20 110 22 M120 160 C100 200 80 210 60 204" w={6} />
      <Line d="M60 110 H220 M60 130 H220" w={3} dash="8 6" />
      <Shape d="M340 200 L376 196 L388 202 L376 208 Z" w={3} />
      <Line d="M330 202 H300 M320 212 H290 M326 192 H306" w={3} dash="4 4" />
      <Line d="M30 30 v10 M25 35 h10 M350 40 v8 M346 44 h8" w={3} />
    </Drawing>
  );
}

export function DustRaptor() {
  return (
    <Drawing label="Drawing of a feathered desert predator running with sickle claws, a canyon behind it">
      <Shape d="M0 224 V100 L40 70 L80 110 L110 224 Z" w={4} />
      <Shape d="M400 224 V80 L360 50 L330 100 L300 224 Z" w={4} />
      <Shape d="M130 150 C130 110 220 100 250 130 C270 150 260 180 230 186 H150 Z" />
      <Shape d="M236 124 C240 90 280 70 316 82 L350 96 L316 106 C300 124 262 136 242 134 Z" />
      <Dot x={302} y={88} r={4} />
      <Solid d="M326 98 l6 8 l6 -8 Z" />
      <Line d="M140 140 C100 140 70 120 50 100" w={7} />
      <Line d="M50 100 l-10 -16 M60 108 l-16 -6 M70 116 l-18 0" w={4} />
      <Line d="M170 186 L150 214 M220 186 L236 214" w={7} />
      <Line d="M150 214 l-14 4 M150 214 l-10 10 M236 214 l14 4 M236 214 l10 10" w={4} />
      <Solid d="M132 220 l-6 4 l8 0 Z" />
      <Line d="M160 120 l8 6 M180 112 l8 6 M200 110 l8 6 M220 112 l8 6" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function PlasmaPanther() {
  return (
    <Drawing label="Drawing of a jet-black panther with veins of plasma stalking along a maintenance duct">
      <Line d="M10 60 H390 M10 200 H390" w={5} />
      <Line d="M60 60 V200 M180 60 V200 M300 60 V200" w={3} />
      <Solid d="M70 170 C60 130 140 112 210 118 C260 122 290 140 280 170 L260 178 H100 Z" />
      <Solid d="M260 130 L266 100 L284 114 L316 112 L334 98 L338 134 C338 154 262 156 260 130 Z" />
      <circle cx="300" cy="124" r="5" fill={card} />
      <circle cx="324" cy="126" r="4" fill={card} />
      <Line d="M100 176 V196 M130 178 V196 M236 178 V196 M262 176 V196" w={7} />
      <Line d="M72 150 C40 150 30 120 44 100" w={7} />
      <path d="M100 140 q20 -14 40 -4 q20 10 40 -2 q20 -8 40 4 M120 160 q30 -10 60 0 q30 8 60 -4" fill="none" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <path d="M296 112 q6 -14 18 -6" fill="none" stroke={card} strokeWidth="2" strokeLinecap="round" />
    </Drawing>
  );
}

export function ScoutLizard() {
  return (
    <Drawing label="Drawing of a six-legged survey lizard hissing on a plain">
      <Shape d="M90 170 C80 130 150 112 220 120 C264 126 280 150 268 172 C230 184 130 186 90 170 Z" />
      <Shape d="M258 128 C262 100 296 84 326 94 L366 108 L326 124 C306 140 270 146 258 128 Z" />
      <Dot x={310} y={102} r={4} />
      <Line d="M350 112 l24 -6 M350 118 l24 8" w={3} />
      <Line d="M120 176 L104 214 M160 180 L152 218 M204 182 L204 220 M244 178 L254 216 M274 168 L296 204 M96 164 L70 196" w={6} />
      <Line d="M90 160 C50 160 30 130 48 110 C58 120 66 130 84 140" w={7} />
      <Line d="M130 128 l4 -10 M160 122 l4 -10 M190 120 l4 -10 M220 124 l4 -10" w={4} />
      <Ground y={226} />
    </Drawing>
  );
}

export function VoidKrillSwarm() {
  return (
    <Drawing label="Drawing of a cloud of tiny translucent crustaceans eating through a hull plate">
      <Shape d="M0 200 H400 V230 H0 Z" w={4} />
      <Line d="M40 200 V230 M160 200 V230 M280 200 V230" w={3} />
      <path d="M150 200 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0" fill="none" stroke={card} strokeWidth="4" />
      {[[70, 60], [130, 90], [200, 50], [260, 100], [320, 70], [110, 140], [180, 130], [250, 150], [310, 130], [350, 170], [60, 170], [200, 180], [150, 175]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 60 - 30})`}>
          <path d="M-14 0 C-14 -8 6 -8 12 -2 L20 0 L12 3 C6 8 -14 8 -14 0 Z" fill={card} stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <Line d="M-8 -4 V4 M-2 -5 V5 M4 -4 V4" w={2} />
          <Line d="M-6 6 l-2 8 M0 7 l0 8 M6 6 l2 8" w={2} />
        </g>
      ))}
      <Line d="M30 30 v8 M26 34 h8 M360 24 v8 M356 28 h8" w={3} />
    </Drawing>
  );
}
