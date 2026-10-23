import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Cactus } from "./Part1";

const card = CARD_COLOR;

export function CactusCrawler() {
  return (
    <Drawing label="Drawing of a walking barrel cactus with fishhook spines and an angry face">
      <Shape d="M130 190 C110 130 130 60 200 56 C270 60 290 130 270 190 Z" />
      <Line d="M170 62 C160 100 160 150 170 188 M200 56 V190 M230 62 C240 100 240 150 230 188" w={3} />
      <Line d="M150 90 l-14 -4 q-6 4 -2 8 M140 130 l-16 2 q-6 6 0 8 M156 170 l-12 8 q-4 6 2 8 M250 90 l14 -4 q6 4 2 8 M260 130 l16 2 q6 6 0 8 M244 170 l12 8 q4 6 -2 8" w={3} />
      <Dot x={180} y={104} r={5} />
      <Dot x={220} y={104} r={5} />
      <Line d="M170 94 L192 100 M230 94 L208 100" w={4} />
      <Line d="M180 136 Q200 126 220 136" w={4} />
      <Line d="M186 136 l4 10 M200 132 l0 12 M214 136 l-4 10" w={3} />
      <Line d="M140 120 C100 110 90 80 110 60 C120 52 134 62 126 72" w={12} />
      <Line d="M260 120 C300 110 310 80 290 60 C280 52 266 62 274 72" w={12} />
      <Line d="M170 190 L160 224 M230 190 L240 224" w={10} />
      <Line d="M150 224 h24 M226 224 h24" w={6} />
      <Line d="M200 56 l-6 -14 l12 0 Z" w={3} />
    </Drawing>
  );
}

export function CanyonWurm() {
  return (
    <Drawing label="Drawing of a rock-colored giant worm bursting out of a canyon floor between two cliffs">
      <Shape d="M0 224 V60 L40 40 L80 80 L100 224 Z" />
      <Shape d="M400 224 V50 L360 30 L320 70 L300 224 Z" />
      <Line d="M20 100 H70 M30 140 H80 M30 180 H92 M380 90 H340 M370 130 H316 M376 170 H308" w={3} />
      <Shape d="M130 224 C120 150 150 90 200 70 C250 90 280 150 270 224 Z" />
      <Line d="M130 190 q70 14 140 0 M132 150 q68 14 136 0 M144 110 q56 14 112 0" w={3} />
      <ellipse cx="200" cy="64" rx="38" ry="18" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="64" rx="20" ry="8" fill="currentColor" />
      <Solid d="M164 58 l6 8 l6 -8 Z M180 52 l6 8 l6 -8 Z M196 50 l6 8 l6 -8 Z M212 52 l6 8 l6 -8 Z M228 56 l6 8 l6 -8 Z" />
      <Line d="M110 224 l-20 -12 M290 224 l20 -12 M120 214 l-24 4 M280 214 l24 4" w={4} />
      <Line d="M150 30 l-6 -10 M250 30 l6 -10 M200 20 v-12" w={3} />
      <Line d="M40 210 q12 -6 24 0 M330 214 q12 -6 24 0" w={3} />
    </Drawing>
  );
}

export function MesaTitan() {
  return (
    <Drawing label="Drawing of a mountain-sized stone giant shaped like a mesa, with a railroad drill in its back">
      <Line d="M10 224 H390" w={3} />
      <Shape d="M90 224 V90 H310 V224 Z" />
      <Line d="M90 120 H310 M90 150 H310 M90 180 H310 M90 206 H310" w={3} />
      <Shape d="M80 94 H320 V74 H80 Z" w={4} />
      <Dot x={160} y={110} r={9} />
      <Dot x={240} y={110} r={9} />
      <Line d="M180 150 H220" w={5} />
      <Line d="M90 140 L40 170 L52 200 M310 140 L360 170 L348 200" w={11} />
      <Line d="M130 224 V204 M270 224 V204" w={14} />
      <Shape d="M344 42 H388 V64 H344 Z" w={3} />
      <Line d="M366 64 V82" w={3} />
      <Line d="M300 90 L360 74 M300 100 L350 84" w={3} />
      <Shape d="M310 70 H330 L336 90 H304 Z" w={3} />
      <Line d="M330 70 V54 M320 54 H340" w={3} />
      <Line d="M290 30 q10 -10 20 0 M60 40 q10 -10 20 0" w={3} />
    </Drawing>
  );
}

export function SandstormRoc() {
  return (
    <Drawing label="Drawing of an enormous bird made of dust and feathers riding a swirling desert storm front">
      <Shape d="M200 90 C150 70 80 50 10 76 C50 86 76 100 90 124 C130 112 170 114 196 124 Z" />
      <Shape d="M200 90 C250 70 320 50 390 76 C350 86 324 100 310 124 C270 112 230 114 204 124 Z" />
      <Line d="M40 90 L90 104 M70 100 L110 112 M360 90 L310 104 M330 100 L290 112" w={3} />
      <Shape d="M178 124 C172 90 228 90 222 124 L216 160 H184 Z" />
      <Shape d="M182 92 C182 66 218 66 218 92 C218 104 182 104 182 92 Z" />
      <Shape d="M200 84 L224 92 L202 98 Z" w={4} />
      <Dot x={194} y={84} r={3} />
      <Line d="M190 160 L176 186 M210 160 L224 186" w={4} />
      <Line d="M10 150 q30 -14 60 0 t60 0 M270 150 q30 -14 60 0 t60 0 M30 176 q30 -14 60 0 t60 0 M230 180 q30 -14 60 0 t60 0 M60 204 q30 -14 60 0 t60 0 t60 0 t60 0" w={4} dash="10 8" />
      <Line d="M150 190 q50 20 100 0 M140 210 q60 20 120 0" w={3} dash="4 8" />
    </Drawing>
  );
}

export function BadlandsDevil() {
  return (
    <Drawing label="Drawing of a smiling stranger in a black duster and wide hat, hand near his hip, with tiny glowing souls at his feet">
      <Solid d="M150 64 C150 30 250 30 250 64 Z" />
      <Line d="M130 68 Q200 84 270 68" w={6} />
      <Shape d="M172 72 H228 V102 C228 120 172 120 172 102 Z" />
      <Dot x={188} y={86} r={3} />
      <Dot x={212} y={86} r={3} />
      <Line d="M184 98 Q200 114 218 98" w={4} />
      <Solid d="M138 126 C150 114 250 114 262 126 L290 224 H110 Z" />
      <path d="M200 130 V220" stroke={card} strokeWidth="3" fill="none" />
      <Line d="M164 130 L128 164" w={7} />
      <Line d="M236 130 L270 170" w={7} />
      <Solid d="M264 164 L290 176 L284 190 L260 180 Z" />
      <path d="M170 150 l-4 14 M230 150 l4 14" stroke={card} strokeWidth="2" strokeLinecap="round" />
      <Line d="M60 200 q8 -12 16 0 q-8 12 -16 0 Z M320 210 q8 -12 16 0 q-8 12 -16 0 Z M90 224 q6 -10 12 0 M300 224 q6 -10 12 0" w={3} />
      <Line d="M40 120 l10 -4 M350 150 l10 4" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

export function DustDevil() {
  return (
    <Drawing label="Drawing of a spinning whirl of sand with a face in the middle sweeping across the desert at dusk">
      <path d="M300 30 a22 22 0 1 0 22 22 a16 16 0 1 1 -22 -22 Z" fill="currentColor" />
      <Line d="M150 30 C250 20 270 40 250 56 C200 70 130 50 160 80 M140 80 C250 76 270 94 240 112 C180 124 130 108 150 134 M150 134 C240 134 260 150 232 166 C190 176 150 164 170 186 M170 186 C230 190 240 204 220 214" w={5} />
      <circle cx="190" cy="104" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="224" cy="104" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={190} y={104} r={3} />
      <Dot x={224} y={104} r={3} />
      <Line d="M196 122 Q208 134 220 122" w={4} />
      <Line d="M40 80 q10 -6 20 0 M60 120 q10 -6 20 0 M320 130 q10 -6 20 0 M330 170 q10 -6 20 0" w={3} dash="3 6" />
      <Cactus x={70} y={216} s={0.8} />
      <Cactus x={340} y={218} s={0.6} />
      <Ground y={224} x1={10} x2={390} />
    </Drawing>
  );
}
