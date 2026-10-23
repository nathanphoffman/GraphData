import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR, Spokes } from "../../core/artStyle";
import { Glow } from "./Part1";

const card = CARD_COLOR;

export function DustTitan() {
  return (
    <Drawing label="Drawing of a hundred-foot dust-colored giant walking through a ruined city, buildings at its knees">
      <Shape d="M20 224 V150 H60 V224 Z M70 224 V120 H110 V224 Z M290 224 V140 H330 V224 Z M340 224 V160 H380 V224 Z" w={4} />
      <Line d="M30 170 h20 M30 190 h20 M80 140 h20 M80 160 h20 M80 180 h20 M300 160 h20 M300 180 h20" w={2} />
      <Shape d="M166 20 C160 -6 240 -6 234 20 C238 40 162 40 166 20 Z" />
      <Dot x={186} y={16} r={4} />
      <Dot x={214} y={16} r={4} />
      <Shape d="M120 50 H280 L300 140 H100 Z" />
      <Line d="M110 60 L70 110 L84 160 M290 60 L330 110 L320 150" w={16} />
      <Shape d="M120 140 H190 V224 H120 Z M210 140 H280 V224 H210 Z" w={5} />
      <Line d="M130 80 q20 10 40 0 M230 90 q20 10 40 0 M150 110 q30 10 60 0" w={3} dash="4 6" />
      <Line d="M20 232 q30 -14 60 0 t60 0 M260 232 q30 -14 60 0 t60 0" w={3} dash="8 8" />
    </Drawing>
  );
}

export function HighwayBehemoth() {
  return (
    <Drawing label="Drawing of a freight-truck-sized beetle with a cracked windshield stuck in its shell">
      <Line d="M10 214 H390" w={4} />
      <Line d="M20 226 H380" w={3} dash="12 10" />
      <Shape d="M60 200 C50 130 120 80 200 84 C290 88 350 130 336 200 Z" />
      <Line d="M200 84 V200" w={3} />
      <Shape d="M120 100 L180 96 L176 150 L116 156 Z" w={5} />
      <Line d="M130 106 L170 144 M168 102 L132 136 M150 100 L146 152" w={2} />
      <Shape d="M310 150 C316 120 360 112 380 134 C390 154 372 172 340 174 C320 176 308 166 310 150 Z" />
      <Dot x={356} y={138} r={4} />
      <Line d="M350 112 L360 90 M370 118 L388 100" w={4} />
      <Line d="M110 200 L90 224 M170 200 L166 226 M250 200 L258 226 M320 196 L340 222" w={7} />
      <Line d="M230 120 q20 -10 40 4" w={3} />
    </Drawing>
  );
}

export function MutantGrub() {
  return (
    <Drawing label="Drawing of a bloated larva eating tin cans and glowing brighter">
      <Glow x={190} y={140} r={96} />
      <Shape d="M60 190 C30 130 90 100 140 120 C180 90 270 110 280 150 C300 190 240 214 190 204 C130 214 80 214 60 190 Z" />
      <Line d="M110 126 q-6 40 6 70 M150 118 q-4 44 6 84 M200 112 q-2 44 8 90 M250 128 q0 34 -6 66" w={3} />
      <Shape d="M262 130 C270 110 310 108 320 136 C326 158 296 170 276 160 Z" />
      <Dot x={298} y={130} r={4} />
      <Shape d="M300 150 q10 8 20 0 Z" w={3} />
      <Shape d="M330 180 H364 V210 H330 Z M350 200 H384 V224 H350 Z" w={4} />
      <Line d="M330 190 H364 M350 210 H384" w={2} />
      <Line d="M304 164 L326 182" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function SumpLeech() {
  return (
    <Drawing label="Drawing of a glowing dog-sized leech rising from a toxic pond">
      <Glow x={200} y={130} r={76} />
      <Line d="M20 190 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" w={4} />
      <Line d="M10 210 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" w={3} />
      <Line d="M200 190 C200 150 150 150 160 110 C170 70 230 80 220 50" w={32} />
      <Line d="M200 190 C200 150 150 150 160 110 C170 70 230 80 220 50" w={24} />
      <Line d="M184 156 q10 -6 18 2 M160 124 q-8 -4 -4 -12 M190 82 q10 -4 14 4" w={3} />
      <circle cx="220" cy="46" r="20" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M206 44 Q220 60 234 44 Q220 50 206 44 Z" w={3} />
      <Solid d="M212 48 l3 6 l3 -6 Z M222 48 l3 6 l3 -6 Z" />
      <Line d="M60 168 q8 -10 16 0 M310 164 q8 -10 16 0" w={3} dash="2 4" />
    </Drawing>
  );
}

export function GlowTroll() {
  return (
    <Drawing label="Drawing of a lumbering radioactive brute with a regrowing arm and a stop sign club">
      <Glow x={200} y={130} r={110} />
      <Shape d="M168 56 C162 18 238 18 232 56 C238 80 162 80 168 56 Z" />
      <Dot x={186} y={46} r={4} />
      <Dot x={214} y={46} r={4} />
      <Line d="M184 66 Q200 78 216 66" w={3} />
      <Shape d="M120 84 C140 70 260 70 280 84 C296 130 276 180 250 190 H150 C124 180 104 130 120 84 Z" />
      <Line d="M130 100 L96 140 L112 190" w={13} />
      <Line d="M270 100 L294 130" w={13} />
      <Line d="M294 130 l14 6 M294 130 l16 -4 M294 130 l10 14" w={4} dash="2 3" />
      <Line d="M110 190 L70 224" w={5} />
      <path d="M50 100 l18 -18 h26 l18 18 v26 l-18 18 h-26 l-18 -18 Z" fill={card} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <Line d="M82 144 V224" w={5} />
      <Line d="M70 114 h24 M70 126 h16" w={3} />
      <Line d="M160 190 V226 M240 190 V226" w={13} />
    </Drawing>
  );
}

export function PlagueMammoth() {
  return (
    <Drawing label="Drawing of a mutated mammoth with a cloud of flies and a back full of cysts">
      <Shape d="M60 200 C40 130 80 80 160 76 C230 72 290 90 300 150 L300 200 Z" />
      <Shape d="M270 130 C250 80 290 50 330 60 C370 74 372 130 350 150 C340 170 300 168 270 130 Z" />
      <Dot x={318} y={92} r={4} />
      <Line d="M340 140 C350 190 336 210 320 206" w={9} />
      <Shape d="M300 150 C330 150 360 160 380 120 C376 170 340 190 300 180 Z" w={4} />
      <circle cx="110" cy="100" r="14" fill={card} {...ink} strokeWidth={3} />
      <circle cx="170" cy="90" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="230" cy="100" r="16" fill={card} {...ink} strokeWidth={3} />
      <circle cx="140" cy="140" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={110} y={100} r={3} />
      <Dot x={230} y={100} r={4} />
      <Line d="M90 200 V226 M150 200 V226 M210 200 V226 M290 200 V226" w={12} />
      {/* Repeat the shape at each listed position. */}
      {[[60, 40], [100, 24], [150, 40], [210, 30], [260, 44], [320, 30]].map(([x, y], index) => (
        <path key={index} d={`M${x} ${y} q4 -6 8 0 q-4 6 -8 0 Z`} fill="currentColor" />
      ))}
    </Drawing>
  );
}

export function NuclearColossus() {
  return (
    <Drawing label="Drawing of a cracked glowing giant sleeping under a ruined power plant's cooling towers in the rain">
      <Shape d="M20 200 C30 150 50 110 60 100 L120 100 C130 110 150 150 160 200 Z" w={4} />
      <Shape d="M260 200 C270 150 290 110 300 100 L360 100 C370 110 390 150 400 200 Z" w={4} />
      <Shape d="M130 230 C100 190 120 130 200 120 C280 130 300 190 270 230 Z" />
      <Shape d="M170 150 C170 124 230 124 230 150 C230 170 170 170 170 150 Z" w={4} />
      <Line d="M184 148 H196 M206 148 H218" w={4} />
      <Line d="M150 190 L190 150 L170 130 L220 120 L210 100" w={3} />
      <Glow x={200} y={170} r={56} />
      <Line d="M60 20 l-8 20 M100 10 l-8 20 M150 20 l-8 20 M210 10 l-8 20 M270 20 l-8 20 M330 10 l-8 20" w={3} />
      <Line d="M20 226 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

export function MutantHedgehog() {
  return (
    <Drawing label="Drawing of a beachball-sized glowing hedgehog rolling downhill">
      <Line d="M20 120 L380 224" w={4} />
      <Glow x={190} y={140} r={78} />
      <circle cx="190" cy="136" r="54" fill={card} {...ink} />
      <Spokes cx={190} cy={136} r={54} count={16} length={20} width={5} offset={0.2} />
      <Shape d="M222 128 C240 118 262 122 266 138 C264 154 236 156 222 148 Z" w={4} />
      <Dot x={250} y={134} r={3} />
      <Dot x={266} y={140} r={3} />
      <Line d="M160 188 l-6 10 M210 190 l4 10" w={4} />
      <Line d="M60 140 H110 M50 160 H100 M70 180 H116" w={3} dash="6 5" />
    </Drawing>
  );
}

export function RadMothMatriarch() {
  return (
    <Drawing label="Drawing of a bus-sized moth hovering above a ruined city, wings spraying glowing dust">
      <Shape d="M20 224 V160 H50 V224 Z M60 224 V130 H100 V224 Z M310 224 V150 H350 V224 Z M360 224 V170 H390 V224 Z" w={3} />
      <Shape d="M200 90 C150 30 60 20 20 70 C40 100 90 120 190 116 Z" />
      <Shape d="M200 90 C250 30 340 20 380 70 C360 100 310 120 210 116 Z" />
      <Shape d="M196 110 C170 130 130 150 90 140 C130 110 170 110 196 110 Z" w={4} />
      <Shape d="M204 110 C230 130 270 150 310 140 C270 110 230 110 204 110 Z" w={4} />
      <circle cx="110" cy="76" r="12" fill="none" {...ink} strokeWidth={3} />
      <circle cx="290" cy="76" r="12" fill="none" {...ink} strokeWidth={3} />
      <Dot x={110} y={76} r={4} />
      <Dot x={290} y={76} r={4} />
      <Shape d="M184 84 C184 56 216 56 216 84 L222 150 C222 166 178 166 178 150 Z" />
      <Line d="M192 60 C180 40 160 36 150 40 M208 60 C220 40 240 36 250 40" w={4} />
      <Dot x={192} y={78} r={3} />
      <Dot x={208} y={78} r={3} />
      <Line d="M110 150 v14 M130 154 v18 M270 154 v18 M290 150 v14 M150 160 v12 M250 160 v12" w={3} dash="2 4" />
    </Drawing>
  );
}
