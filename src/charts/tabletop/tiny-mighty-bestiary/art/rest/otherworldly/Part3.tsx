import { Dot, Drawing, ink, Line, Shape, CARD_COLOR, Spokes } from "../../core/artStyle";
import { ghostBody } from "./Part1";

const card = CARD_COLOR;

export function GlitchGremlin() {
  return (
    <Drawing label="Drawing of a pixelated pest crouched on a cybernetic implant, making it stutter">
      <Shape d="M120 150 H280 V200 H120 Z" w={4} />
      <Line d="M140 150 V200 M180 150 V200 M220 150 V200 M260 150 V200" w={2} />
      {[
        [170, 70], [190, 70], [210, 70], [230, 70],
        [150, 90], [170, 90], [190, 90], [210, 90], [230, 90], [250, 90],
        [150, 110], [170, 110], [210, 110], [250, 110],
        [150, 130], [190, 130], [210, 130], [250, 130],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width="18" height="18" fill={i % 5 === 0 ? card : "currentColor"} stroke="currentColor" strokeWidth="3" />
      ))}
      <rect x="184" y="84" width="10" height="10" fill={card} />
      <rect x="214" y="84" width="10" height="10" fill={card} />
      <Line d="M170 60 V40 H160 M240 60 V40 H250" w={4} />
      <Line d="M280 160 H340 M280 180 H320 M300 140 H380" w={3} dash="8 6" />
      <Line d="M40 100 H110 M60 120 H90" w={3} dash="8 6" />
    </Drawing>
  );
}

export function CogSprite() {
  return (
    <Drawing label="Drawing of a buzzing spark of living gearwork riding a steam vent and jamming a machine">
      <Shape d="M120 224 H280 V200 H120 Z" w={4} />
      <Line d="M200 200 C190 170 220 160 200 130" w={4} dash="4 4" />
      <Line d="M180 196 C168 168 190 150 176 126 M220 196 C232 168 210 150 224 126" w={3} dash="3 5" />
      <circle cx="200" cy="90" r="34" fill={card} {...ink} strokeWidth={5} />
      <Spokes cx={200} cy={90} r={34} count={10} length={12} width={9} />
      <circle cx="200" cy="90" r="14" fill="none" {...ink} strokeWidth={3} />
      <Dot x={192} y={88} r={3} />
      <Dot x={208} y={88} r={3} />
      <Line d="M170 50 l-24 -20 M230 50 l24 -20" w={4} />
      <Shape d="M290 130 H380 V190 H290 Z" w={4} />
      <circle cx="335" cy="160" r="16" fill="none" {...ink} strokeWidth={3} />
      <Line d="M240 100 L286 150" w={3} dash="3 4" />
      <Line d="M60 60 v10 M55 65 h10 M110 30 v8 M106 34 h8" w={3} />
    </Drawing>
  );
}

export function NetspaceWraith() {
  return (
    <Drawing label="Drawing of a digital ghost jumping between two implants, wearing the faces of the dead">
      <Shape d="M20 90 H110 V170 H20 Z" w={5} />
      <circle cx="65" cy="130" r="18" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M290 90 H380 V170 H290 Z" w={5} />
      <circle cx="335" cy="130" r="18" fill={card} {...ink} strokeWidth={4} />
      <path d={ghostBody(150, 250, 50, 190)} fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M190 60 L210 70 L190 90 L210 100" fill="none" stroke="currentColor" strokeWidth="3" />
      <Dot x={180} y={96} r={5} />
      <Dot x={220} y={96} r={5} />
      <Line d="M184 124 H216 M192 120 v8 M200 120 v8 M208 120 v8" w={3} />
      <Line d="M110 120 C130 100 140 100 150 110 M250 110 C260 100 270 100 290 120" w={4} dash="4 4" />
      <circle cx="120" cy="60" r="16" fill={card} {...ink} strokeWidth={3} />
      <Dot x={114} y={58} r={2} />
      <Dot x={126} y={58} r={2} />
      <circle cx="290" cy="50" r="16" fill={card} {...ink} strokeWidth={3} />
      <Dot x={284} y={48} r={2} />
      <Dot x={296} y={48} r={2} />
    </Drawing>
  );
}

export function DeepNetGod() {
  return (
    <Drawing label="Drawing of a vast alien intelligence of eyes and branching lines waking in the lowest layers of the net">
      <Line d="M0 60 H400 M0 110 H400 M0 160 H400 M0 210 H400" w={2} dash="4 8" />
      <circle cx="200" cy="120" r="64" fill={card} {...ink} />
      <circle cx="200" cy="120" r="44" fill="none" {...ink} strokeWidth={3} />
      <circle cx="200" cy="120" r="22" fill="currentColor" />
      <circle cx="200" cy="120" r="8" fill={card} />
      <Line d="M200 56 V0 M200 184 V224 M136 120 H60 M264 120 H340 M154 74 L100 30 M246 74 L300 30 M154 166 L100 210 M246 166 L300 210" w={5} />
      {[[200, 0], [60, 120], [340, 120], [100, 30], [300, 30], [100, 210], [300, 210], [200, 224]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill={card} {...ink} strokeWidth={3} />
          <Dot x={x} y={y} r={4} />
        </g>
      ))}
    </Drawing>
  );
}
