import type { ReactNode } from "react";
import { Dot, Drawing, ink, Line, Shape, Solid } from "../core/artStyle";

const card = "var(--b-card)";

/** Ghostly hem: a wavy bottom edge for sheet-like spirits. */
const ghostBody = (x0: number, x1: number, top: number, bottom: number) =>
  `M${x0} ${bottom} C${x0 - 10} ${top + 40} ${x0 + 10} ${top} ${(x0 + x1) / 2} ${top} C${x1 - 10} ${top} ${x1 + 10} ${top + 40} ${x1} ${bottom} q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 Z`;

function WarpFiend() {
  return (
    <Drawing label="Drawing of a red horned fiend bleeding out of the warp from a pile of skulls">
      <Shape d="M60 224 C80 190 130 190 150 224 Z M140 224 C160 180 240 180 260 224 Z M250 224 C270 190 320 190 340 224 Z" w={4} />
      <circle cx="120" cy="206" r="6" fill="currentColor" />
      <circle cx="200" cy="200" r="7" fill="currentColor" />
      <circle cx="296" cy="206" r="6" fill="currentColor" />
      <Shape d="M170 78 C164 34 236 34 230 78 C236 102 164 102 170 78 Z" />
      <Shape d="M176 50 C160 30 150 14 158 4 C170 18 180 28 188 40 Z M224 50 C240 30 250 14 242 4 C230 18 220 28 212 40 Z" w={4} />
      <Line d="M184 68 L196 74 M216 68 L204 74" w={4} />
      <Shape d="M188 88 Q200 104 212 88 Z" w={3} />
      <Shape d="M144 108 H256 L270 186 H130 Z" />
      <Line d="M200 108 V186 M160 130 L200 150 L240 130" w={3} />
      <Line d="M150 116 L110 150 L120 180 M250 116 L290 150 L280 180" w={9} />
      <Line d="M170 186 L160 224 M230 186 L240 224" w={9} />
      <Line d="M80 80 C60 100 60 150 80 170 M320 80 C340 100 340 150 320 170" w={3} dash="3 5" />
    </Drawing>
  );
}

function DreamEater() {
  return (
    <Drawing label="Drawing of a slender pale thing with too many limbs leaning over a sleeping figure">
      <Shape d="M20 190 H380 V224 H20 Z" w={4} />
      <Shape d="M60 160 H340 V190 H60 Z" w={4} />
      <Shape d="M80 130 C80 112 120 112 120 130 V160 H80 Z" w={4} />
      <Line d="M96 140 q6 4 12 0" w={2} />
      <Shape d="M150 70 C150 40 210 40 210 70 C210 92 150 92 150 70 Z" />
      <Dot x={168} y={66} r={3} />
      <Dot x={192} y={66} r={3} />
      <Line d="M168 80 H192" w={2} />
      <Shape d="M160 90 H200 L190 150 H170 Z" />
      <Line d="M164 98 L120 100 L84 126 M164 110 L110 124 L100 150 M168 124 L134 150 M196 98 L240 80 L270 100 M196 110 L250 110 L280 130 M192 124 L226 140" w={4} />
      <Line d="M170 150 L160 190 M190 150 L196 190" w={4} />
      <Line d="M280 60 q-14 14 -4 34 q12 12 30 4 M260 40 q-12 8 -10 22" w={3} dash="3 5" />
    </Drawing>
  );
}

function WarpLord() {
  return (
    <Drawing label="Drawing of a towering horned and winged tyrant with a burning axe, seated before a throne of skulls">
      <Shape d="M120 224 V100 L150 60 L180 100 L200 50 L220 100 L250 60 L280 100 V224 Z" w={4} />
      <circle cx="150" cy="130" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="200" cy="120" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="250" cy="130" r="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M170 110 C130 80 80 60 30 70 C60 90 64 116 56 140 C100 130 140 134 170 150 Z" />
      <Shape d="M230 110 C270 80 320 60 370 70 C340 90 336 116 344 140 C300 130 260 134 230 150 Z" />
      <Shape d="M178 80 C172 40 228 40 222 80 C228 104 172 104 178 80 Z" />
      <Shape d="M184 54 C164 36 158 14 166 0 C178 14 188 30 194 44 Z M216 54 C236 36 242 14 234 0 C222 14 212 30 206 44 Z" w={4} />
      <Dot x={192} y={74} r={4} />
      <Dot x={208} y={74} r={4} />
      <Shape d="M168 112 H232 L240 190 H160 Z" />
      <Line d="M176 120 L130 140 M224 120 L270 100 L300 60" w={8} />
      <Line d="M300 60 L330 0" w={5} />
      <Shape d="M318 -6 C350 -6 366 20 340 30 L316 20 Z" w={4} />
      <Solid d="M326 14 C316 2 322 -8 330 -14 C334 -2 346 4 338 14 Z" />
    </Drawing>
  );
}

function GhostInTheWire() {
  return (
    <Drawing label="Drawing of the leftover mind of a hacker as a face rippling along city power lines between two poles">
      <Line d="M20 40 V224 M380 40 V224" w={6} />
      <Line d="M10 60 H50 M350 60 H390" w={5} />
      <Line d="M30 60 C120 100 160 100 200 100 C240 100 280 100 370 60" w={4} />
      <Line d="M30 76 C120 120 160 124 200 124 C240 124 280 120 370 76" w={4} />
      <Shape d="M156 120 C152 68 248 68 244 120 C248 160 152 160 156 120 Z" />
      <Dot x={184} y={112} r={5} />
      <Dot x={216} y={112} r={5} />
      <Line d="M184 138 Q200 148 216 138" w={3} />
      <Line d="M160 100 l-20 -20 l14 -2 l-10 -18 M240 100 l20 -20 l-14 -2 l10 -18" w={3} />
      <Line d="M170 160 l-10 16 l10 -4 l-4 20 M230 160 l10 16 l-10 -4 l4 20" w={3} />
      <Line d="M60 160 q10 -10 20 0 M320 170 q10 -10 20 0" w={3} dash="2 4" />
    </Drawing>
  );
}

function RiftWhisperer() {
  return (
    <Drawing label="Drawing of a tall shape leaking out of a tear in the sky, promising everyone what they most want">
      <path d="M200 0 L224 40 L196 70 L228 110 L190 140" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 0 L176 40 L204 70 L172 110 L210 140" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" />
      <Shape d="M176 140 C170 100 230 100 224 140 L232 224 H168 Z" />
      <Shape d="M184 120 C184 96 216 96 216 120 C216 138 184 138 184 120 Z" w={4} />
      <Line d="M170 150 L130 190 L116 224 M230 150 L270 190 L284 224" w={5} />
      <Line d="M130 190 l-10 -4 M130 190 l-6 10 M270 190 l10 -4 M270 190 l6 10" w={3} />
      <Line d="M60 200 q10 -14 20 0 M320 200 q10 -14 20 0" w={3} />
      <Line d="M70 190 v-20 M60 180 h20 M330 190 v-20 M320 180 h20" w={3} dash="2 4" />
      <Line d="M60 60 q10 -8 20 0 M330 80 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function NeonShrineFox() {
  return (
    <Drawing label="Drawing of a glowing fox with nine fiber-optic tails guarding a tiny shrine between two skyscrapers">
      <Shape d="M0 20 H110 V224 H0 Z M290 20 H400 V224 H290 Z" w={4} />
      <Line d="M10 60 H100 M10 100 H100 M10 140 H100 M300 60 H390 M300 100 H390 M300 140 H390" w={2} dash="4 4" />
      <Shape d="M150 160 H250 V200 H150 Z" w={4} />
      <Shape d="M140 160 L200 124 L260 160 Z" w={4} />
      <Shape d="M180 200 H220 V224 H180 Z" w={3} />
      <Shape d="M140 150 C130 110 170 94 200 100 C230 106 246 130 236 150 Z" />
      <Shape d="M196 104 C196 74 226 66 244 76 L270 100 L240 112 C226 118 204 116 196 104 Z" w={5} />
      <Shape d="M210 76 L204 50 L226 68 Z M232 74 L242 50 L248 80 Z" w={4} />
      <Dot x={236} y={90} r={3} />
      {[-70, -50, -30, -10, 10, 30, 50, 70, 90].map((a, i) => (
        <path key={i} d={`M150 140 C${100 + i * 2} ${140 - a} ${70 + i * 4} ${120 - a * 0.8} ${60 + i * 6} ${110 - a * 0.9}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={i % 2 ? "2 4" : undefined} />
      ))}
      <Line d="M160 150 V170 M190 150 V170" w={4} />
    </Drawing>
  );
}

function BoilerGhost() {
  return (
    <Drawing label="Drawing of the ghost of a stoker shoveling coal into a furnace in the dark of a boiler room">
      <Shape d="M240 90 H380 V224 H240 Z" w={5} />
      <Shape d="M270 130 H350 V190 H270 Z" w={4} />
      <Solid d="M290 190 C280 166 300 156 306 140 C316 156 336 166 326 190 Z" />
      <Line d="M240 60 H380 M300 60 V90 M320 60 V90" w={5} />
      <path d={ghostBody(90, 210, 60, 200)} fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Shape d="M102 70 L150 40 L198 70 Q150 82 102 70 Z" w={4} />
      <Dot x={132} y={96} r={4} />
      <Dot x={164} y={96} r={4} />
      <Line d="M138 116 q12 8 24 0" w={3} />
      <Line d="M196 120 L240 130 L262 150" w={6} />
      <Shape d="M250 146 L280 140 L290 154 L262 164 Z" w={4} />
      <Line d="M20 180 H70 M40 200 H80" w={3} dash="4 4" />
    </Drawing>
  );
}

function StarlightWisp() {
  return (
    <Drawing label="Drawing of a tiny drifting lantern of starlight leading a traveler off the path for fun">
      <Line d="M0 214 C100 214 120 190 200 190 C280 190 320 214 400 214" w={5} />
      <Line d="M60 226 C120 226 150 210 200 210 C260 210 300 226 380 226" w={3} dash="6 6" />
      <Shape d="M60 150 C56 120 94 120 90 150 L94 190 H56 Z" w={4} />
      <Shape d="M60 128 C60 108 90 108 90 128 Z" w={3} />
      <Line d="M90 156 L110 140" w={4} />
      <Shape d="M170 80 L200 40 L230 80 L200 120 Z" />
      <Solid d="M200 66 l4 10 l10 2 l-8 6 l2 10 l-8 -6 l-8 6 l2 -10 l-8 -6 l10 -2 Z" />
      <Line d="M200 40 V22 M200 120 V138 M170 80 H152 M230 80 H248 M178 58 l-12 -12 M222 58 l12 -12 M178 102 l-12 12 M222 102 l12 12" w={3} />
      <Line d="M240 100 C290 90 330 130 360 100" w={3} dash="3 5" />
      <Line d="M300 40 v10 M295 45 h10 M120 40 v8 M116 44 h8 M340 190 v8 M336 194 h8" w={3} />
    </Drawing>
  );
}

function WarpImp() {
  return (
    <Drawing label="Drawing of a grinning scrap of warp-stuff popping out of a crack in the hull and chewing wiring">
      <Shape d="M0 0 H200 L170 100 L210 130 L160 180 L200 224 H0 Z" w={5} />
      <Line d="M20 40 H120 M20 110 H110 M20 190 H130" w={2} />
      <Line d="M200 100 C240 90 270 110 300 100 M200 150 C230 160 270 140 310 160" w={4} dash="6 4" />
      <Shape d="M210 130 C200 100 230 70 270 76 C310 84 316 120 296 144 C280 160 220 160 210 130 Z" />
      <Shape d="M226 86 L214 56 L246 76 Z M290 86 L304 56 L274 76 Z" w={4} />
      <Dot x={244} y={104} r={4} />
      <Dot x={274} y={104} r={4} />
      <Shape d="M234 124 Q260 154 288 124 Z" w={3} />
      <Solid d="M240 126 l4 8 l4 -8 Z M254 128 l4 8 l4 -8 Z M268 126 l4 8 l4 -8 Z" />
      <Line d="M296 130 L340 120 M340 120 l10 -14" w={4} />
      <Line d="M300 170 C320 170 330 190 350 186" w={4} />
      <Line d="M350 186 q10 6 20 0 M360 176 l8 -10" w={3} dash="2 3" />
    </Drawing>
  );
}

function GlitchGremlin() {
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

function CogSprite() {
  return (
    <Drawing label="Drawing of a buzzing spark of living gearwork riding a steam vent and jamming a machine">
      <Shape d="M120 224 H280 V200 H120 Z" w={4} />
      <Line d="M200 200 C190 170 220 160 200 130" w={4} dash="4 4" />
      <Line d="M180 196 C168 168 190 150 176 126 M220 196 C232 168 210 150 224 126" w={3} dash="3 5" />
      <circle cx="200" cy="90" r="34" fill={card} {...ink} strokeWidth={5} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <path key={i} d={`M${200 + Math.cos(a) * 34} ${90 + Math.sin(a) * 34} l${Math.cos(a) * 12} ${Math.sin(a) * 12}`} stroke="currentColor" strokeWidth="9" strokeLinecap="round" />;
      })}
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

function NetspaceWraith() {
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

function DeepNetGod() {
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

function AetherPoltergeist() {
  return (
    <Drawing label="Drawing of a spirit haunting steam pipes and sending gouts of hot vapor through the valves">
      <Line d="M0 60 H400 M0 180 H400" w={14} />
      <Line d="M0 60 H400 M0 180 H400" w={7} />
      <Line d="M120 60 V180 M280 60 V180" w={12} />
      <Line d="M120 60 V180 M280 60 V180" w={5} />
      <circle cx="120" cy="120" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M120 108 V132 M108 120 H132" w={3} />
      <circle cx="280" cy="120" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M280 108 V132 M268 120 H292" w={3} />
      <path d="M170 30 C170 6 230 6 230 30 L236 90 q-12 12 -24 0 q-12 12 -24 0 q-12 12 -22 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Dot x={188} y={28} r={4} />
      <Dot x={212} y={28} r={4} />
      <Line d="M190 44 q10 8 20 0" w={3} />
      <Line d="M60 60 q-14 -16 0 -30 q14 -14 0 -26 M340 180 q14 -16 0 -30 q-14 -14 0 -26 M200 180 q-14 20 0 40" w={4} dash="3 5" />
    </Drawing>
  );
}

function AetherSovereign() {
  return (
    <Drawing label="Drawing of an ancient spirit of lightning and brass enthroned between cogs, crackling with bolts">
      <circle cx="70" cy="150" r="56" fill={card} {...ink} strokeWidth={5} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <path key={i} d={`M${70 + Math.cos(a) * 56} ${150 + Math.sin(a) * 56} l${Math.cos(a) * 12} ${Math.sin(a) * 12}`} stroke="currentColor" strokeWidth="9" strokeLinecap="round" />;
      })}
      <circle cx="70" cy="150" r="16" fill="none" {...ink} strokeWidth={3} />
      <circle cx="330" cy="150" r="56" fill={card} {...ink} strokeWidth={5} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 + 0.3;
        return <path key={i} d={`M${330 + Math.cos(a) * 56} ${150 + Math.sin(a) * 56} l${Math.cos(a) * 12} ${Math.sin(a) * 12}`} stroke="currentColor" strokeWidth="9" strokeLinecap="round" />;
      })}
      <circle cx="330" cy="150" r="16" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M176 60 C170 20 230 20 224 60 C230 90 170 90 176 60 Z" />
      <Shape d="M170 36 L178 6 L192 30 L200 0 L208 30 L222 6 L230 36 Z" w={4} />
      <Dot x={190} y={56} r={4} />
      <Dot x={210} y={56} r={4} />
      <Shape d="M150 92 H250 L270 224 H130 Z" />
      <Line d="M200 92 V224" w={3} />
      <Solid d="M120 40 L100 80 L120 78 L96 124 L134 70 L114 72 Z M280 40 L300 80 L280 78 L304 124 L266 70 L286 72 Z" />
    </Drawing>
  );
}

function PocketPetGhost() {
  return (
    <Drawing label="Drawing of a pixelated pet living inside an old handheld, hungry and asking to be fed">
      <Shape d="M100 20 H300 V224 H100 Z" w={5} />
      <Shape d="M126 44 H274 V140 H126 Z" w={4} />
      {[
        [190, 70], [210, 70], [170, 90], [190, 90], [210, 90], [230, 90], [170, 110], [190, 110], [210, 110], [230, 110], [150, 110], [250, 110],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width="18" height="18" fill="currentColor" stroke={card} strokeWidth="2" />
      ))}
      <rect x="182" y="86" width="8" height="8" fill={card} />
      <rect x="210" y="86" width="8" height="8" fill={card} />
      <rect x="196" y="108" width="14" height="6" fill={card} />
      <circle cx="160" cy="180" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="200" cy="190" r="14" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M240 170 h30 v16 h-30 Z" w={4} />
      <Line d="M138 190 l12 -8 M262 200 l-10 -6" w={2} />
      <Line d="M320 100 q14 -8 28 0 M330 130 q10 -6 22 0" w={3} dash="2 5" />
      <Shape d="M340 160 h30 v22 h-30 Z" w={3} />
      <Line d="M346 160 v-8 h18 v8" w={3} />
    </Drawing>
  );
}

function WarpSeer() {
  return (
    <Drawing label="Drawing of a blind psyker with sewn-shut eyes shouting prophecies as the warp bleeds through">
      <Shape d="M170 80 C164 34 236 34 230 80 C236 106 164 106 170 80 Z" />
      <Line d="M180 70 H196 M204 70 H220" w={5} />
      <Line d="M184 66 v8 M190 66 v8 M208 66 v8 M214 66 v8" w={2} />
      <Shape d="M184 90 Q200 116 216 90 Z" w={4} />
      <Shape d="M148 108 H252 L282 224 H118 Z" />
      <Line d="M200 108 V224" w={3} />
      <Line d="M156 120 L100 80 L90 40 M244 120 L300 80 L310 40" w={7} />
      <Line d="M90 40 l-10 -10 M90 40 l0 -14 M90 40 l10 -10 M310 40 l-10 -10 M310 40 l0 -14 M310 40 l10 -10" w={3} />
      <Line d="M20 30 C60 10 90 50 130 20 M270 20 C310 50 340 10 380 30" w={4} dash="4 5" />
      <Line d="M60 130 q-14 14 -4 30 M340 130 q14 14 4 30" w={4} dash="3 5" />
      <Line d="M170 20 q30 -26 60 0" w={3} />
    </Drawing>
  );
}

function WarpJester() {
  return (
    <Drawing label="Drawing of a jingling clown-shaped daemon juggling three skulls">
      <Shape d="M176 76 C170 36 230 36 224 76 C230 100 170 100 176 76 Z" />
      <Shape d="M172 50 L148 20 L132 40 L164 56 Z M228 50 L252 20 L268 40 L236 56 Z" w={4} />
      <circle cx="132" cy="40" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="268" cy="40" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={190} y={72} r={4} />
      <Dot x={210} y={72} r={4} />
      <Line d="M184 86 Q200 108 216 86" w={4} />
      <Shape d="M152 106 H248 L262 190 H138 Z" />
      <Line d="M150 120 L200 190 L250 120 M150 190 L200 120" w={3} />
      <Line d="M156 114 L110 80 M244 114 L290 80" w={7} />
      {[[150, 30], [200, 12], [250, 30]].map(([x, y], i) => (
        <g key={i}>
          <Shape d={`M${x - 14} ${y + 4} C${x - 14} ${y - 18} ${x + 14} ${y - 18} ${x + 14} ${y + 4} L${x + 8} ${y + 14} H${x - 8} Z`} w={3} />
          <Dot x={x - 5} y={y - 2} r={2.5} />
          <Dot x={x + 5} y={y - 2} r={2.5} />
        </g>
      ))}
      <Line d="M170 190 L150 224 M230 190 L250 224" w={8} />
      <Shape d="M130 224 h28 l-4 -8 h-20 Z M242 224 h28 l-4 -8 h-20 Z" w={3} />
      <Line d="M80 120 q-14 -4 -16 8 M320 120 q14 -4 16 8" w={3} dash="2 4" />
    </Drawing>
  );
}

function DataSuccubus() {
  return (
    <Drawing label="Drawing of a seductive net-spirit wearing a lover's face, trailing code and drawing on a hacked victim">
      <Shape d="M166 76 C160 34 240 34 234 76 C240 104 160 104 166 76 Z" />
      <Line d="M170 56 C150 90 140 130 152 160 M230 56 C250 90 260 130 248 160" w={5} />
      <Line d="M182 70 q8 -6 16 0 M202 70 q8 -6 16 0" w={3} />
      <Dot x={190} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Line d="M186 92 Q200 102 214 92" w={3} />
      <Shape d="M168 106 H232 L246 160 H154 Z" />
      <Line d="M154 160 C140 190 130 210 120 224 M246 160 C260 190 270 210 280 224" w={3} dash="3 4" />
      <Line d="M170 116 L130 150 M230 116 L270 150" w={5} />
      <Line d="M290 130 H340 M290 144 H370 M290 158 H350 M300 172 H380" w={2} dash="3 3" />
      <Shape d="M50 150 H110 V210 H50 Z" w={4} />
      <Line d="M60 166 H100 M60 180 H92 M60 194 H100" w={2} dash="3 3" />
      <circle cx="80" cy="130" r="10" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function TickTockWraith() {
  return (
    <Drawing label="Drawing of a pale shape inside a great clock tower whispering the hours of the dead">
      <Shape d="M110 224 V60 L200 10 L290 60 V224 Z" w={5} />
      <circle cx="200" cy="82" r="44" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 46 V54 M200 110 V118 M164 82 H172 M228 82 H236" w={4} />
      <Line d="M200 82 V56 M200 82 L220 94" w={4} />
      <path d={ghostBody(150, 250, 120, 214)} fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Dot x={182} y={150} r={4} />
      <Dot x={218} y={150} r={4} />
      <Line d="M188 172 q12 8 24 0" w={3} />
      <Line d="M150 150 L90 120 L70 140 M250 150 L310 120 L330 140" w={6} />
      <Line d="M50 60 q10 -8 20 0 M330 60 q10 -8 20 0 M40 180 q10 -8 20 0 M340 190 q10 -8 20 0" w={3} dash="2 5" />
      <Line d="M130 224 V210 M270 224 V210" w={4} />
    </Drawing>
  );
}

export const restOtherworldlyArt: Record<string, () => ReactNode> = {
  "warp-fiend": WarpFiend,
  "dream-eater": DreamEater,
  "warp-lord": WarpLord,
  "ghost-in-the-wire": GhostInTheWire,
  "rift-whisperer": RiftWhisperer,
  "neon-shrine-fox": NeonShrineFox,
  "boiler-ghost": BoilerGhost,
  "starlight-wisp": StarlightWisp,
  "warp-imp": WarpImp,
  "glitch-gremlin": GlitchGremlin,
  "cog-sprite": CogSprite,
  "netspace-wraith": NetspaceWraith,
  "deep-net-god": DeepNetGod,
  "aether-poltergeist": AetherPoltergeist,
  "aether-sovereign": AetherSovereign,
  "pocket-pet-ghost": PocketPetGhost,
  "warp-seer": WarpSeer,
  "warp-jester": WarpJester,
  "data-succubus": DataSuccubus,
  "tick-tock-wraith": TickTockWraith,
};
