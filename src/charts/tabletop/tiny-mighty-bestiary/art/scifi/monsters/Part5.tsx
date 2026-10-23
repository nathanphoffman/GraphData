import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function StarOracle() {
  return (
    <Drawing label="Drawing of a robed figure of living starlight with a halo of stars seeing ahead">
      <Shape d="M150 100 H250 L284 224 H116 Z" />
      <Shape d="M168 70 C160 24 240 24 232 70 C238 98 162 98 168 70 Z" />
      <circle cx="188" cy="66" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="212" cy="66" r="8" fill="none" {...ink} strokeWidth={3} />
      <Dot x={188} y={66} r={3} />
      <Dot x={212} y={66} r={3} />
      <Line d="M190 86 H210" w={3} />
      <Line d="M158 110 L110 80 M242 110 L290 80" w={6} />
      <circle cx="104" cy="74" r="14" fill={card} {...ink} strokeWidth={3} />
      <circle cx="296" cy="74" r="14" fill={card} {...ink} strokeWidth={3} />
      <Line d="M104 66 v16 M96 74 h16 M296 66 v16 M288 74 h16" w={2} />
      <Solid d="M200 150 l6 14 l14 2 l-10 10 l3 14 l-13 -7 l-13 7 l3 -14 l-10 -10 l14 -2 Z" />
      <Line d="M60 40 v14 M53 47 h14 M340 36 v14 M333 43 h14 M180 10 v10 M175 15 h10 M230 14 v10 M225 19 h10 M30 130 v10 M25 135 h10 M370 150 v10 M365 155 h10" w={3} />
    </Drawing>
  );
}

export function VoidWhisperer() {
  return (
    <Drawing label="Drawing of two soldiers turning on each other as a faint voice curls around them from the dark">
      <Line d="M150 20 C190 40 130 70 180 90 C220 106 160 130 200 150" w={3} dash="3 5" />
      <Line d="M250 30 C210 50 270 80 220 100" w={3} dash="3 5" />
      <Shape d="M70 80 C66 44 124 44 120 80 L116 96 H74 Z" />
      <Line d="M78 70 H112" w={4} />
      <Shape d="M60 100 H130 L140 200 H50 Z" />
      <Line d="M130 120 L180 140" w={8} />
      <Shape d="M176 130 H220 V148 H176 Z" w={4} />
      <Shape d="M330 80 C334 44 276 44 280 80 L284 96 H326 Z" />
      <Line d="M322 70 H288" w={4} />
      <Shape d="M340 100 H270 L260 200 H350 Z" />
      <Line d="M270 120 L240 140" w={8} />
      <Shape d="M180 150 H224 V166 H180 Z" w={4} />
      <Line d="M70 200 V226 M110 200 V226 M290 200 V226 M330 200 V226" w={7} />
      <Dot x={90} y={74} r={0} />
      <Line d="M40 40 v10 M35 45 h10 M360 30 v10 M355 35 h10" w={3} />
    </Drawing>
  );
}

export function NebulaPhantom() {
  return (
    <Drawing label="Drawing of a drifting shape of gas and light wrapping around a ship and draining its power cells">
      <Shape d="M130 130 L170 116 H250 L290 130 L250 144 H170 Z" />
      <Shape d="M190 116 L200 90 H224 L234 116 Z" w={4} />
      <Line d="M130 130 H110 M290 130 H320" w={4} />
      <path d="M40 90 C60 30 160 20 220 50 C300 20 360 60 350 120 C380 170 320 210 260 190 C220 220 140 220 100 190 C40 180 20 130 40 90 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="10 6" strokeLinecap="round" />
      <path d="M90 100 C100 70 160 60 200 80 M210 170 C250 190 300 170 310 140" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" />
      <circle cx="120" cy="70" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="154" cy="62" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={120} y={70} r={3} />
      <Dot x={154} y={62} r={3} />
      <Shape d="M240 120 H262 V138 H240 Z" w={3} />
      <Line d="M262 129 H290" w={3} dash="3 3" />
    </Drawing>
  );
}

export function CometSprite() {
  return (
    <Drawing label="Drawing of a giggling spark of light riding in the exhaust of a starfighter and tickling the pilot">
      <Shape d="M40 150 L120 134 L260 130 L330 150 L260 168 L120 166 Z" />
      <Shape d="M150 134 L160 96 L200 130 Z M150 166 L160 204 L200 170 Z" w={4} />
      <Shape d="M240 130 C240 114 270 112 276 130 Z" w={4} />
      <Line d="M40 150 H10 M44 140 H14 M44 160 H14" w={4} dash="6 5" />
      <circle cx="60" cy="150" r="20" fill={card} {...ink} strokeWidth={4} />
      <path d="M50 150 l-30 -30 l24 14 l-4 -26 l18 22 l12 -22 l4 26 l22 -14 l-12 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <Dot x={54} y={146} r={2} />
      <Dot x={66} y={146} r={2} />
      <Line d="M54 156 Q60 162 68 156" w={2} />
      <Line d="M260 124 q10 -20 30 -22 M276 120 q14 -14 30 -12" w={3} dash="2 5" />
      <Line d="M300 60 v10 M295 65 h10 M360 110 v8 M356 114 h8 M180 40 v8 M176 44 h8" w={3} />
    </Drawing>
  );
}

export function WillOWire() {
  return (
    <Drawing label="Drawing of a drifting ball of blue static in a dark research station corridor, leading the lost on">
      <Line d="M10 30 H390 M10 210 H390" w={6} />
      <Line d="M60 30 V210 M340 30 V210" w={4} />
      <Shape d="M60 70 H110 V160 H60 Z M290 70 H340 V160 H290 Z" w={4} />
      <Line d="M70 90 H100 M70 110 H100 M300 90 H330 M300 110 H330" w={2} />
      <circle cx="200" cy="110" r="30" fill={card} {...ink} />
      <circle cx="200" cy="110" r="14" fill="currentColor" />
      <Line d="M200 70 l-8 -20 M230 82 l16 -14 M240 110 l22 0 M230 138 l16 14 M200 150 l8 22 M170 138 l-16 14 M160 110 l-22 0 M170 82 l-16 -14" w={3} />
      <Line d="M200 150 C190 180 210 190 200 210" w={3} dash="2 5" />
      <Line d="M260 200 q10 -10 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function VoidBride() {
  return (
    <Drawing label="Drawing of a pale veiled figure riding a derelict ship, calling out to a missing crew">
      <Shape d="M20 190 L90 170 L370 160 L390 190 L370 214 L90 214 Z" />
      <Line d="M110 180 H350 M110 200 H350" w={3} />
      <circle cx="150" cy="190" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="190" cy="190" r="7" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M168 88 C160 40 240 40 232 88 L226 110 H174 Z" />
      <Shape d="M150 96 C150 80 170 60 200 60 C230 60 250 80 250 96 C260 150 270 160 290 168 L110 168 C130 160 140 150 150 96 Z" w={4} />
      <Line d="M180 90 H220" w={3} />
      <Dot x={188} y={86} r={2} />
      <Dot x={212} y={86} r={2} />
      <Line d="M200 168 V110" w={2} />
      <Line d="M240 120 L290 100 L300 80" w={5} />
      <Line d="M300 80 l6 -10 M300 80 l-2 -12 M300 80 l-10 -4" w={3} />
      <Line d="M300 40 q10 -12 22 -4 M326 30 q14 -12 28 -4" w={3} dash="2 5" />
      <Dot x={60} y={50} r={2} />
      <Dot x={340} y={90} r={2} />
      <Dot x={30} y={120} r={2} />
    </Drawing>
  );
}
