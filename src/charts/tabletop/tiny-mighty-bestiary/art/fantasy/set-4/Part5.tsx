import { Dot, Drawing, ink, Line, Shape } from "../../core/artStyle";

export function SunkenDreamer() {
  return (
    <Drawing label="Drawing of a huge winged titan with a tentacled face rising out of the sea beneath a small moon">
      <path d="M340 30 a22 22 0 1 0 22 22 a16 16 0 1 1 -22 -22 Z" fill="currentColor" />
      <Shape d="M120 224 C110 150 130 100 170 70 C200 40 240 50 260 80 C290 110 300 170 280 224 Z" />
      <Shape d="M130 110 C80 70 40 30 20 40 C30 70 24 90 34 120 C60 120 100 124 130 132 Z" />
      <Shape d="M270 110 C320 70 360 30 380 40 C370 70 376 90 366 120 C340 120 300 124 270 132 Z" />
      <circle cx="184" cy="96" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="236" cy="96" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M170 96 H198 M226 96 H250" w={3} />
      <Line d="M170 120 C160 150 150 170 130 180 M186 126 C184 160 178 182 166 196 M214 126 C216 160 222 182 234 196 M230 120 C240 150 250 170 270 180" w={6} />
      <Line d="M10 200 q15 -10 30 0 t30 0 t30 0 M330 200 q15 -10 30 0 t30 0" w={4} />
      <Line d="M10 218 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M100 50 l4 4 M90 80 l-4 -2 M310 130 l4 4" w={3} />
    </Drawing>
  );
}

export function RiddleSphinx() {
  return (
    <Drawing label="Drawing of a lion-bodied sphinx with a human face and wings lying at a desert crossing">
      <Line d="M10 224 H390" w={4} />
      <Line d="M300 224 l30 -40 l30 40" w={3} />
      <Shape d="M90 200 C70 150 120 130 200 134 C260 136 290 156 280 200 Z" />
      <Shape d="M170 140 C140 100 100 60 60 50 C70 80 64 100 74 124 C110 126 150 130 170 150 Z" />
      <Shape d="M210 140 C230 110 250 90 270 70 L310 64 C300 90 290 120 270 150 Z" w={4} />
      <Shape d="M276 150 C260 100 270 60 300 54 C336 48 350 90 330 130 C324 150 290 160 276 150 Z" />
      <Line d="M276 70 C260 54 280 26 304 28 C334 28 350 52 336 70 M276 90 C260 110 262 140 280 150 M336 90 C350 110 346 140 330 150" w={5} />
      <Dot x={300} y={90} r={3} />
      <Dot x={322} y={90} r={3} />
      <Line d="M304 114 Q312 120 320 114" w={3} />
      <Line d="M104 200 H150 M96 200 l-12 14 h30 M180 200 H230" w={8} />
      <Line d="M90 170 C50 170 40 140 56 126" w={5} />
      <Line d="M310 20 q0 -12 12 -12 q12 0 12 10 q0 8 -12 12 v4" w={3} />
    </Drawing>
  );
}

export function Siren() {
  return (
    <Drawing label="Drawing of a silver-scaled singer on a rock with sound waves and a reef below">
      <Shape d="M60 224 C60 170 120 150 200 156 C280 160 340 180 340 224 Z" />
      <Shape d="M170 80 C166 36 230 36 226 80 C226 106 172 106 170 80 Z" />
      <Line d="M172 70 C140 90 140 140 160 160 M226 70 C256 90 256 140 236 160" w={5} />
      <Dot x={186} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Shape d="M190 90 Q200 104 210 90 Q200 96 190 90 Z" w={3} />
      <Shape d="M176 106 H220 L226 140 H170 Z" w={4} />
      <Line d="M176 114 L150 130 M220 114 L250 100" w={5} />
      <Shape d="M170 140 H226 C240 176 240 196 220 206 C234 210 250 214 262 224 C230 220 170 220 140 224 C150 212 166 210 180 206 C160 196 160 176 170 140 Z" />
      <Line d="M184 156 q8 6 16 0 q8 6 16 0 M182 174 q8 6 16 0 q8 6 16 0 M186 192 q8 6 16 0 q8 6 16 0" w={3} />
      <Line d="M290 60 q22 20 0 50 M312 44 q32 34 0 82 M80 70 q-22 20 0 50 M58 54 q-32 34 0 82" w={3} />
      <Line d="M10 214 q15 -10 30 0 t30 0 M330 214 q15 -10 30 0 t30 0" w={3} />
    </Drawing>
  );
}
