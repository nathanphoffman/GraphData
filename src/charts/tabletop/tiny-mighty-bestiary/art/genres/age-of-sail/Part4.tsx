import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Tricorn, Waves } from "./Part1";

const card = CARD_COLOR;

export function RoyalMarineSergeant() {
  return (
    <Drawing label="Drawing of a scarlet-coated sergeant with a musket and bayonet at the ready">
      <Shape d="M166 40 H234 L228 12 H172 Z" />
      <Line d="M160 42 H240" w={5} />
      <Shape d="M170 48 H230 V86 C230 106 170 106 170 86 Z" />
      <Line d="M182 68 H194 M206 68 H218" w={4} />
      <Line d="M188 88 H212" w={3} />
      <Shape d="M142 106 H258 L266 200 H134 Z" />
      <Line d="M200 106 V200 M146 106 L254 200 M254 106 L146 200" w={3} />
      <Solid d="M174 124 h10 v8 h-10 Z M216 124 h10 v8 h-10 Z M174 146 h10 v8 h-10 Z M216 146 h10 v8 h-10 Z" />
      <Line d="M146 120 L108 150 M258 120 L290 146" w={8} />
      <Line d="M320 20 V224" w={4} />
      <Solid d="M312 22 L320 0 L328 22 Z" />
      <Line d="M290 146 L320 144" w={6} />
      <Shape d="M148 200 H196 V226 H148 Z M204 200 H252 V226 H204 Z" w={4} />
      <Line d="M142 160 H258" w={5} />
    </Drawing>
  );
}

export function PirateKing() {
  return (
    <Drawing label="Drawing of a legendary captain crowned with a tricorn, standing before a hundred-ship flag and the sea">
      <Shape d="M20 20 H160 V100 H20 Z" w={4} />
      <Solid d="M60 40 a16 16 0 1 0 0.1 0 Z" />
      <path d="M46 72 L94 92 M94 72 L46 92" stroke={card} strokeWidth="3" />
      <Line d="M20 20 V224" w={5} />
      {/* Repeat the shape at each listed position. */}
      {[[250, 60], [310, 50], [350, 70], [280, 80]].map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <Line d="M0 0 V-18 M0 -18 L12 -8 L0 -4" w={2} />
          <Shape d="M-16 0 H16 L12 8 H-12 Z" w={2} />
        </g>
      ))}
      <Tricorn y={86} />
      <Shape d="M178 92 H222 V124 C222 140 178 140 178 124 Z" />
      <Line d="M188 108 H196 M204 108 H212" w={3} />
      <Shape d="M150 148 L178 138 H222 L250 148 L260 224 H140 Z" />
      <Line d="M200 138 V224 M168 170 H232" w={3} />
      <Solid d="M200 150 l6 8 l-6 8 l-6 -8 Z" />
      <Line d="M156 154 L120 186 M250 154 L290 176 L300 120" w={8} />
      <Line d="M300 120 L330 60" w={4} />
      <Waves y={228} w={4} />
    </Drawing>
  );
}

export function ShipsSurgeon() {
  return (
    <Drawing label="Drawing of a sleep-deprived surgeon with a bone saw and a bottle of rum">
      <Shape d="M168 74 C164 36 236 36 232 74 C236 100 164 100 168 74 Z" />
      <Line d="M182 66 H194 M206 66 H218" w={4} />
      <Line d="M178 74 q6 6 12 0 M210 74 q6 6 12 0" w={2} />
      <Line d="M186 88 H214" w={3} />
      <Shape d="M148 106 H252 L260 224 H140 Z" />
      <Shape d="M148 106 H252 V150 H148 Z" w={3} />
      <Line d="M200 106 V224" w={2} />
      <Solid d="M174 150 l-4 18 l10 -6 Z M226 150 l4 18 l-10 -6 Z" />
      <Line d="M152 116 L124 160 M248 116 L276 150" w={7} />
      <Shape d="M276 140 L340 120 L346 130 L282 156 Z" w={3} />
      <Line d="M290 134 l4 8 M304 130 l4 8 M318 126 l4 8 M332 122 l4 8" w={2} />
      <Shape d="M96 140 H124 V190 H96 Z" w={4} />
      <Line d="M104 140 V126 H116 V140" w={4} />
      <Line d="M98 160 H122" w={2} />
    </Drawing>
  );
}

export function IroncladQuartermaster() {
  return (
    <Drawing label="Drawing of a hardened quartermaster with a cutlass and a ledger">
      <Shape d="M158 62 H242 V76 H158 Z" w={4} />
      <Shape d="M170 76 H230 V106 C230 124 170 124 170 106 Z" />
      <Line d="M182 90 L194 94 M218 90 L206 94" w={4} />
      <Line d="M188 108 H212" w={3} />
      <Line d="M180 76 l-4 20" w={2} />
      <Shape d="M142 126 H258 L266 210 H134 Z" />
      <Line d="M200 126 V210 M142 160 H258" w={3} />
      <Line d="M148 134 L120 170 M252 134 L292 112" w={8} />
      <Shape d="M60 150 H118 V204 H60 Z" w={5} />
      <Line d="M70 164 H108 M70 176 H108 M70 188 H98" w={2} />
      <Line d="M292 112 L330 40" w={4} />
      <Solid d="M326 46 L336 24 L342 48 Z" />
      <Line d="M286 120 H304" w={6} />
      <Shape d="M148 210 H196 V228 H148 Z M204 210 H252 V228 H204 Z" w={4} />
    </Drawing>
  );
}

export function BarnacleBiter() {
  return (
    <Drawing label="Drawing of a crab-shelled horror clamped onto a ship's hull, snapping at a sailor leaning over the rail">
      <Shape d="M0 120 H260 L240 224 H0 Z" w={5} />
      <Line d="M0 150 H250 M0 190 H244" w={3} />
      <Line d="M20 120 V90 M60 120 V84 M100 120 V90 M140 120 V84 M180 120 V90" w={4} />
      <Line d="M0 90 H200" w={4} />
      <Shape d="M120 60 C110 40 140 34 140 56 L146 90 H116 Z" w={4} />
      <Shape d="M220 150 C220 120 300 110 340 140 C370 160 360 200 320 214 C280 224 230 200 220 150 Z" />
      <circle cx="260" cy="160" r="9" fill="none" {...ink} strokeWidth={3} />
      <circle cx="300" cy="150" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="320" cy="190" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M230 150 L190 110 L170 90 M238 168 L196 160 L176 130" w={9} />
      <Shape d="M160 76 L184 70 L176 96 Z M168 118 L190 112 L180 140 Z" w={4} />
      <Dot x={300} y={134} r={0} />
      <Line d="M290 134 l-4 -12 M312 134 l4 -12" w={4} />
      <Line d="M300 214 l-8 12 M340 206 l8 14" w={5} />
    </Drawing>
  );
}

export function SeaSerpent() {
  return (
    <Drawing label="Drawing of a hundred-foot black serpent rising from deep water and snapping a ship's mast">
      <Shape d="M60 214 L90 190 H210 L194 214 Z" w={4} />
      <Line d="M130 190 V120 M130 124 L170 140 L130 164" w={4} />
      <Line d="M130 120 L180 90" w={5} dash="" />
      <Shape d="M200 224 C200 150 230 100 260 80 C280 60 300 40 330 44 C356 48 366 70 350 82 L384 96 L346 104 C330 130 300 170 290 224 Z" />
      <Line d="M214 180 q30 8 70 0 M222 140 q26 8 60 -2 M238 104 q22 8 46 -4" w={3} />
      <Dot x={332} y={62} r={4} />
      <Line d="M352 96 l-4 10 l-6 -8 M366 94 l-2 10" w={3} />
      <Shape d="M300 44 L292 12 L316 38 Z" w={4} />
      <Line d="M160 100 L130 88 L116 60" w={3} />
      <Line d="M110 54 l-8 -10 M110 54 l12 -8" w={3} />
      <Waves y={224} w={5} />
    </Drawing>
  );
}

export function MaelstromLeviathan() {
  return (
    <Drawing label="Drawing of an ocean-sized shape rising inside a whirlpool, swallowing a fleet of tiny ships">
      <ellipse cx="200" cy="140" rx="180" ry="80" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="140" rx="132" ry="58" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="140" rx="84" ry="36" fill="none" {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="140" rx="40" ry="16" fill="currentColor" />
      <Shape d="M170 140 L176 126 H190 L194 140 Z" w={0} />
      <Solid d="M168 140 l8 -14 l8 14 Z M184 142 l8 -14 l8 14 Z M200 142 l8 -14 l8 14 Z M216 140 l8 -14 l8 14 Z" />
      <Shape d="M60 100 L80 90 L92 100 L80 108 Z M300 80 L320 70 L332 80 L320 88 Z M300 190 L320 180 L332 190 L320 198 Z M80 180 L100 172 L110 180 L100 188 Z" w={3} />
      <Line d="M100 130 l-24 8 M290 150 l24 -8" w={3} dash="3 4" />
      <circle cx="200" cy="108" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="230" cy="112" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={200} y={108} r={2} />
      <Dot x={230} y={112} r={2} />
    </Drawing>
  );
}
