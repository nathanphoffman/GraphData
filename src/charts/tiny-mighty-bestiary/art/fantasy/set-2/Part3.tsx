import { Dot, Drawing, ink, Line, Shape } from "../../core/artStyle";

export function FrostKing() {
  return (
    <Drawing label="Drawing of an ice-bearded giant seated on a throne of glaciers">
      <Shape d="M90 224 V90 L110 40 L130 90 L140 30 L160 90 V224 Z" w={4} />
      <Shape d="M240 224 V90 L260 30 L270 90 L290 44 L310 90 V224 Z" w={4} />
      <Shape d="M170 80 L180 52 L200 66 L220 52 L230 80 Z" w={4} />
      <Shape d="M174 84 C174 54 226 54 226 84 C226 104 174 104 174 84 Z" />
      <Dot x={190} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Shape d="M174 92 L184 130 L192 112 L200 144 L208 112 L216 130 L226 92 Z" w={4} />
      <Shape d="M160 120 H240 L250 204 H150 Z" />
      <Line d="M160 130 L134 170 M240 130 L268 150" />
      <Line d="M268 150 V200 M262 150 h12" w={5} />
      <Line d="M180 224 h40" w={5} />
      <Line d="M30 50 l6 12 M50 30 l0 14 M350 60 l-6 12 M330 28 l0 14 M30 120 l14 0" w={3} />
    </Drawing>
  );
}

export function GraveClerk() {
  return (
    <Drawing label="Drawing of a thin clerk behind a desk stamping a death notice">
      <Shape d="M40 150 H360 V224 H40 Z" />
      <Line d="M40 170 H360" w={3} />
      <Shape d="M176 76 C170 30 232 30 226 76 C226 100 176 100 176 76 Z" />
      <Line d="M184 68 h10 M208 68 h10" w={4} />
      <Dot x={190} y={72} r={2} />
      <Dot x={214} y={72} r={2} />
      <Line d="M192 88 H212" w={3} />
      <Line d="M180 44 H226" w={4} />
      <Shape d="M180 98 H224 L232 150 H172 Z" />
      <Line d="M202 100 L196 120 L202 150" w={3} />
      <Line d="M226 108 L262 90 L262 66" />
      <Shape d="M246 58 H278 V68 H246 Z" w={4} />
      <Shape d="M252 68 H272 V82 H252 Z" w={4} />
      <Shape d="M270 140 H340 V150 H270 Z" w={3} />
      <Line d="M280 132 H320 M290 124 H330" w={3} />
      <Line d="M60 130 H110 M60 120 H100 M60 110 H108" w={3} />
    </Drawing>
  );
}

export function Dragon() {
  return (
    <Drawing label="Drawing of a winged dragon sitting on a pile of coins and breathing fire">
      <Shape d="M60 224 Q100 170 160 180 Q220 170 260 224 Z" />
      <circle cx="120" cy="200" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="170" cy="196" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="218" cy="204" r="8" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M110 180 C100 120 160 90 210 110 C240 120 250 150 230 180 Z" />
      <Shape d="M120 130 L60 70 L90 60 L80 30 L140 90 Z" />
      <Shape d="M190 100 C196 70 220 56 240 64 C260 60 290 66 300 84 L340 86 L300 100 C290 112 250 118 220 112 Z" />
      <Dot x={238} y={80} r={4} />
      <Line d="M256 86 l-4 14 l-6 -10 M276 90 l-4 12 l-6 -10" w={3} />
      <Line d="M210 66 L220 36 M232 62 L246 36" w={5} />
      <Line d="M120 170 C70 170 50 130 80 120" />
      <Line d="M340 90 q14 -8 20 -22 q8 20 16 10 q-4 30 -24 32 q-10 -4 -12 -20" w={3} />
    </Drawing>
  );
}

export function JellyBlock() {
  return (
    <Drawing label="Drawing of a see-through wobbling cube with a skull and coins floating inside">
      <Shape d="M100 90 H280 V210 H100 Z" />
      <Shape d="M100 90 L140 56 H320 L280 90 Z" w={4} />
      <Shape d="M280 90 L320 56 V176 L280 210 Z" w={4} />
      <circle cx="150" cy="180" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="226" cy="124" r="10" fill="none" {...ink} strokeWidth={3} />
      <Line d="M180 150 H210 M170 160 L200 170" w={4} />
      <Shape d="M224 170 C220 152 252 152 248 170 V182 H224 Z" w={3} />
      <Dot x={231} y={168} r={3} />
      <Dot x={241} y={168} r={3} />
      <Line d="M130 110 q10 -8 24 -8 M296 76 q4 -6 12 -8" w={3} />
      <Line d="M90 216 q20 8 50 4 M260 220 q30 6 50 -4" w={3} />
      <Line d="M72 150 q-10 6 -8 18 M330 130 q10 6 8 18" w={3} />
    </Drawing>
  );
}

export function GreatRoc() {
  return (
    <Drawing label="Drawing of a giant bird with huge outspread wings carrying an elephant in its talons">
      <Shape d="M200 70 C160 50 100 20 20 40 C60 60 80 90 90 110 C120 100 160 100 190 110 Z" />
      <Shape d="M200 70 C240 50 300 20 380 40 C340 60 320 90 310 110 C280 100 240 100 210 110 Z" />
      <Shape d="M176 110 C170 70 230 70 224 110 L218 160 H182 Z" />
      <Shape d="M176 70 C176 40 224 40 224 70 C224 84 176 84 176 70 Z" />
      <Shape d="M200 58 L220 66 L202 72 Z" w={3} />
      <Dot x={190} y={60} r={3} />
      <Line d="M190 160 L176 190 M210 160 L224 190" w={5} />
      <Line d="M170 190 l-10 6 M176 190 l-2 10 M230 190 l10 6 M224 190 l2 10" w={3} />
      <Shape d="M150 198 C150 184 250 184 250 198 C250 218 230 224 210 220 C190 224 150 220 150 198 Z" w={4} />
      <Line d="M240 196 q16 4 14 18 M150 200 q-14 -2 -18 -12" w={3} />
      <Line d="M60 130 q10 -8 20 0 M310 150 q10 -8 20 0" w={3} />
    </Drawing>
  );
}

export function HullCrusher() {
  return (
    <Drawing label="Drawing of a many-armed sea monster wrapped around a ship's hull">
      <Shape d="M120 130 H280 L260 170 H140 Z" />
      <Line d="M200 130 V60 M200 66 L250 90 L200 118" w={4} />
      <Line d="M10 180 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Shape d="M150 230 C140 190 140 160 200 160 C260 160 260 190 250 230 Z" />
      <Dot x={180} y={188} r={5} />
      <Dot x={220} y={188} r={5} />
      <Line d="M150 180 C100 180 90 130 120 120 C140 114 150 130 140 140 M250 180 C300 180 310 130 280 120 C260 114 250 130 260 140" />
      <Line d="M160 170 C120 160 100 190 70 180 M240 170 C280 160 300 190 330 180 M168 200 C130 210 110 220 70 214 M232 200 C270 210 290 220 330 214" />
      <Line d="M120 120 l-8 -12 M280 120 l8 -12" w={3} />
      <Line d="M130 126 l6 4 M270 126 l-6 4 M180 126 l4 6 M220 126 l-4 6" w={3} />
    </Drawing>
  );
}

export function GiggleSprite() {
  return (
    <Drawing label="Drawing of a tiny glittering fairy with wings, holding a stolen hat">
      <Shape d="M200 110 C140 50 110 70 120 110 C130 140 180 130 200 120 Z" />
      <Shape d="M200 110 C260 50 290 70 280 110 C270 140 220 130 200 120 Z" />
      <Shape d="M180 90 C180 66 220 66 220 90 C220 108 180 108 180 90 Z" />
      <Dot x={192} y={86} r={3} />
      <Dot x={208} y={86} r={3} />
      <Line d="M190 96 Q200 106 210 96" w={3} />
      <Shape d="M184 108 H216 L212 150 H188 Z" />
      <Line d="M192 150 L186 184 M208 150 L214 184" w={4} />
      <Line d="M184 114 L160 100" w={4} />
      <Shape d="M130 60 H164 L168 74 H126 Z M138 60 C140 40 156 40 158 60" w={4} />
      <Line d="M60 40 v16 M52 48 h16 M330 50 v12 M324 56 h12 M320 160 v16 M312 168 h16 M80 150 v10 M75 155 h10" w={3} />
      <Line d="M150 190 q30 30 60 10" w={3} dash="2 8" />
      <Shape d="M290 190 l20 -6 l20 6 l-8 10 l-6 -4 l-6 4 Z" w={3} />
    </Drawing>
  );
}
