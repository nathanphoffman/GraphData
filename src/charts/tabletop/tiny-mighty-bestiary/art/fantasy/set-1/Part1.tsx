import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function CarnivalColossus() {
  return (
    <Drawing label="Drawing of a huge grinning parade float with springy arms and a calliope">
      <Shape d="M120 70 Q120 40 200 40 Q280 40 280 70 L292 190 H108 Z" />
      <Dot x={170} y={90} r={7} />
      <Dot x={230} y={90} r={7} />
      <Line d="M160 125 Q200 160 240 125" />
      <Line d="M172 132 v10 M188 140 v10 M204 142 v10 M220 138 v10 M234 130 v10" w={3} />
      <Line d="M120 100 l-22 -10 l22 -10 l-22 -10 l22 -10 l-22 -10 l-14 -22" />
      <Line d="M280 100 l22 -10 l-22 -10 l22 -10 l-22 -10 l22 -10 l14 -22" />
      <Line d="M150 40 V16 M170 40 V10 M190 40 V16 M210 40 V10 M230 40 V16 M250 40 V10" w={6} />
      <circle cx="140" cy="198" r="16" fill={card} {...ink} />
      <circle cx="260" cy="198" r="16" fill={card} {...ink} />
      <Line d="M50 60 l6 6 M70 30 l6 -4 M330 50 l6 6 M350 90 l-6 4 M60 120 l8 2 M340 130 l-8 4" w={4} />
      <Ground y={216} />
    </Drawing>
  );
}

export function ClockworkSongbird() {
  return (
    <Drawing label="Drawing of a brass wind-up songbird on a branch">
      <Line d="M60 188 H340" />
      <Line d="M170 160 L166 188 M210 160 L214 188" />
      <Shape d="M120 120 C120 70 220 60 262 100 C280 116 270 160 220 164 C170 168 120 160 120 120 Z" />
      <Shape d="M262 100 C266 70 296 62 306 82 C312 96 296 108 278 108 Z" />
      <Shape d="M306 82 L340 92 L308 98 Z" w={4} />
      <Dot x={292} y={80} r={4} />
      <Shape d="M120 120 L70 100 L78 138 Z" />
      <Line d="M160 112 Q200 90 236 130" w={4} />
      <circle cx="190" cy="130" r="12" fill="none" {...ink} strokeWidth={3} />
      <Line d="M190 114 V118 M190 142 V146 M174 130 H178 M202 130 H206" w={3} />
      <Line d="M170 78 L170 56 M156 56 H184" w={4} />
      <Line d="M330 40 v28 M330 68 q-12 4 -12 -4 q0 -8 12 -4 M356 30 v22 M356 52 q-10 4 -10 -3 q0 -7 10 -3" w={3} />
    </Drawing>
  );
}

export function BlinkCat() {
  return (
    <Drawing label="Drawing of a six-legged cat with a faint copy of itself a step to the left">
      <g opacity="0.35">
        <Line d="M60 150 C60 110 150 110 190 130 L230 160 C230 190 100 190 60 150 Z" dash="6 8" w={4} />
        <Line d="M210 120 C210 90 250 90 260 110 L270 120 L240 140 Z" dash="6 8" w={4} />
      </g>
      <Line d="M110 168 L104 206 M150 176 L148 206 M190 176 L192 206" />
      <Shape d="M110 172 C100 126 190 112 250 134 C290 150 290 182 250 186 C200 192 130 192 110 172 Z" />
      <Line d="M230 186 L228 210 M262 184 L270 210 M284 176 L304 206" />
      <Shape d="M270 138 L270 98 L288 114 L312 114 L330 98 L330 138 C330 160 270 160 270 138 Z" />
      <Dot x={289} y={130} r={4} />
      <Dot x={311} y={130} r={4} />
      <Line d="M300 138 v6 M330 134 l24 -6 M330 142 l24 4 M270 134 l-24 -6 M270 142 l-24 4" w={3} />
      <Line d="M110 160 C60 150 56 100 84 92" />
      <Ground />
    </Drawing>
  );
}

export function CarrionCrow() {
  return (
    <Drawing label="Drawing of a scraggly black crow perched on a branch">
      <Line d="M140 198 H270 M270 198 l22 -8" w={4} />
      <Line d="M190 198 L184 172 M210 198 L214 172 M184 198 l-8 4 M190 198 l-2 6 M214 198 l8 4 M210 198 l2 6" />
      <Solid d="M110 70 C130 60 200 60 240 90 C262 108 260 150 224 170 C190 186 150 176 130 140 C116 116 100 90 110 70 Z" />
      <Solid d="M240 90 C250 60 290 56 296 80 C300 96 280 106 262 104 Z" />
      <Solid d="M296 80 L346 92 L296 100 Z" />
      <circle cx="274" cy="78" r="5" fill={card} />
      <Dot x={275} y={78} r={2} />
      <Line d="M110 70 L72 52 M118 96 L64 92 M130 130 L82 150" w={4} />
      <Line d="M150 100 Q190 100 220 140" w={3} />
      <Line d="M124 64 l-10 -14 M142 62 l-4 -16 M166 62 l0 -14 M192 64 l6 -14 M216 72 l10 -12 M238 88 l12 -8" w={3} />
      <Line d="M112 100 l-14 6 M120 118 l-16 10 M128 146 l-14 14 M144 162 l-8 16 M166 174 l-4 18 M196 182 l0 14 M226 170 l8 12 M252 150 l12 6 M258 126 l14 2" w={3} />
      <Line d="M84 90 l-12 -6 M92 136 l-14 -2 M96 156 l-10 8" w={3} />
      <path d="M150 100 l-8 4 M170 92 l-6 8 M190 90 l-4 10 M210 100 l4 -6" fill="none" stroke={card} strokeWidth="2" strokeLinecap="round" />
      <Line d="M40 40 q10 -8 20 0 q10 -8 20 0" w={3} />
    </Drawing>
  );
}

export function AbyssalLeviathan() {
  return (
    <Drawing label="Drawing of a huge sea serpent rising out of the waves beside a small ship">
      <Shape d="M20 200 Q30 120 80 120 Q130 120 140 200 Z" />
      <Shape d="M120 200 Q130 100 200 100 Q250 100 260 200 Z" />
      <Shape d="M240 200 C240 120 270 60 300 50 C320 44 340 52 346 66 L384 84 L346 90 C340 110 330 140 330 200 Z" />
      <Line d="M346 90 L330 108 M346 90 l-8 20 M346 90 l8 18" w={3} />
      <Dot x={318} y={68} r={5} />
      <Line d="M270 90 l-14 -18 M268 118 l-18 -14 M266 146 l-18 -10" w={4} />
      <Line d="M60 140 q10 8 20 0 q10 8 20 0 M160 130 q10 8 20 0 q10 8 20 0" w={3} />
      <Line d="M10 206 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Line d="M30 222 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Shape d="M150 34 L180 34 L190 44 L140 44 Z" w={3} />
      <Line d="M165 34 V14 M165 14 L180 22 L165 26" w={3} />
    </Drawing>
  );
}

export function BarnCatTerror() {
  return (
    <Drawing label="Drawing of a very fat tabby cat with tally marks of its kills">
      <Shape d="M110 200 C60 190 70 90 200 80 C330 90 340 190 290 200 Z" />
      <Line d="M170 120 v26 M200 116 v32 M230 120 v26" w={4} />
      <Shape d="M130 98 L132 40 L164 62 L236 62 L268 40 L270 98 C270 140 130 140 130 98 Z" />
      <Line d="M150 98 Q166 88 182 98 M218 98 Q234 88 250 98" w={4} />
      <Dot x={166} y={98} r={3} />
      <Dot x={234} y={98} r={3} />
      <Solid d="M194 112 h12 l-6 8 Z" />
      <Line d="M200 120 v8 M200 128 q-14 12 -26 4 M200 128 q14 12 26 4" w={3} />
      <Line d="M130 114 l-34 -8 M130 122 l-34 6 M270 114 l34 -8 M270 122 l34 6" w={3} />
      <Line d="M290 190 C340 190 360 150 340 120" />
      <Line d="M100 206 h50 M250 206 h50" />
      <Line d="M326 36 v20 M336 36 v20 M346 36 v20 M356 36 v20 M322 52 l40 -12" w={3} />
      <Ground />
    </Drawing>
  );
}
