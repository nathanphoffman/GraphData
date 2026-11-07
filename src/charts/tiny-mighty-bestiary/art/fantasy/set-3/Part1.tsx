import { Dot, Drawing, Ground, Line, Shape, Solid } from "../../core/artStyle";

export function LivingArmor() {
  return (
    <Drawing label="Drawing of an empty suit of plate armor with a glowing gap in the helmet, clanking forward">
      <Shape d="M166 90 C164 36 236 36 234 90 V100 H166 Z" />
      <Line d="M176 74 H224" w={4} />
      <Dot x={190} y={74} r={2} />
      <Dot x={210} y={74} r={2} />
      <Line d="M200 40 V22 M200 22 Q220 16 230 30" w={4} />
      <Shape d="M130 108 L160 100 H240 L270 108 L262 124 H138 Z" w={4} />
      <Shape d="M148 124 H252 L244 178 H156 Z" />
      <Line d="M200 124 V178 M160 150 H240" w={3} />
      <Shape d="M156 178 H244 L252 200 H148 Z" w={4} />
      <Shape d="M134 118 L112 170 L132 176 L146 130 Z" w={4} />
      <Shape d="M266 118 L288 170 L268 176 L254 130 Z" w={4} />
      <Shape d="M160 200 H190 L186 224 H152 Z M210 200 H240 L248 224 H214 Z" w={4} />
      <Line d="M90 150 l-18 4 M92 170 l-16 8 M310 150 l18 4 M308 170 l16 8" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function MossTortoise() {
  return (
    <Drawing label="Drawing of a huge mossy tortoise with a small village on its shell">
      <Shape d="M60 190 C60 90 320 90 340 190 Z" />
      <Line d="M110 150 q20 -10 40 0 M180 126 q22 -10 44 0 M250 150 q20 -10 40 0 M90 176 q20 -10 40 0" w={3} />
      <Shape d="M130 112 V90 L146 76 L162 90 V112" w={3} />
      <Shape d="M190 100 V70 L210 52 L230 70 V100" w={3} />
      <Shape d="M258 114 V94 L272 82 L286 94 V114" w={3} />
      <Line d="M138 112 V102 H154 V112 M202 100 V86 H218 V100" w={2} />
      <Line d="M210 52 V38 M210 38 l12 4 l-12 4" w={3} />
      <Shape d="M330 160 C350 150 376 156 380 176 C380 196 350 200 332 192 Z" />
      <Dot x={360} y={170} r={3} />
      <Line d="M350 188 q10 4 18 -2" w={3} />
      <Shape d="M60 190 H340 L330 206 H70 Z" w={4} />
      <Shape d="M90 206 H130 V224 H90 Z M270 206 H310 V224 H270 Z" w={4} />
      <Line d="M70 200 l-30 4 l12 -14" w={4} />
      <Line d="M140 130 q-4 6 0 10 M300 150 q4 6 0 10 M110 176 q-4 6 0 10" w={2} />
    </Drawing>
  );
}

export function MountainMammoth() {
  return (
    <Drawing label="Drawing of a shaggy mammoth with huge curved tusks on a snowy mountainside">
      <Shape d="M60 200 C40 130 80 80 160 76 C230 72 290 90 300 150 L300 200 Z" />
      <Shape d="M270 130 C250 80 290 50 330 60 C370 74 372 130 350 150 C340 170 300 168 270 130 Z" />
      <Dot x={318} y={92} r={4} />
      <Shape d="M340 140 C350 200 340 214 322 212 C316 200 320 180 324 160 Z" w={4} />
      <Shape d="M300 150 C330 150 360 160 380 120 C376 170 340 190 300 180 Z" w={4} />
      <Line d="M296 152 C280 184 260 192 260 212" w={5} />
      <Line d="M80 80 q12 8 4 24 M120 70 q12 8 4 26 M160 70 q12 8 4 24 M200 72 q12 8 4 24 M240 82 q12 8 4 22" w={3} />
      <Line d="M90 140 q10 20 0 50 M140 150 q10 20 0 44 M200 150 q10 20 0 44" w={3} />
      <Line d="M90 200 V224 M150 200 V224 M210 200 V224 M290 200 V224" w={9} />
      <Line d="M20 224 L60 190 L90 224 M330 224 L360 196 L384 224" w={3} />
      <Line d="M40 40 l6 8 M60 28 l2 10 M360 30 l-6 10" w={3} />
    </Drawing>
  );
}

export function Orc() {
  return (
    <Drawing label="Drawing of a scarred orc with tusks, mismatched armor and an axe">
      <Shape d="M156 86 C150 34 250 34 244 86 C250 114 150 114 156 86 Z" />
      <Line d="M170 70 L192 76 M230 70 L208 76" w={5} />
      <Dot x={184} y={82} r={4} />
      <Dot x={216} y={82} r={4} />
      <Line d="M180 100 H220" w={4} />
      <Solid d="M180 100 L174 86 L184 98 Z M220 100 L226 86 L216 98 Z" />
      <Line d="M204 44 l-8 20" w={3} />
      <Shape d="M140 124 C150 108 250 108 260 124 L252 186 H148 Z" />
      <Shape d="M130 116 L158 108 L156 134 L128 138 Z M270 116 L242 108 L244 134 L272 138 Z" w={4} />
      <Line d="M200 120 V186 M160 150 H240" w={3} />
      <Line d="M148 186 L142 224 M252 186 L258 224" w={9} />
      <Line d="M138 130 L110 164 M262 130 L300 150" w={7} />
      <Line d="M300 150 L330 40" w={5} />
      <Shape d="M320 50 C350 30 376 40 372 80 C350 70 336 74 328 86 Z" w={4} />
    </Drawing>
  );
}

export function Ogre() {
  return (
    <Drawing label="Drawing of a lumbering ogre swinging a club made from a small tree">
      <Shape d="M160 80 C150 30 250 30 240 80 C250 112 150 112 160 80 Z" />
      <Dot x={184} y={72} r={4} />
      <Dot x={216} y={72} r={4} />
      <Line d="M170 62 L194 68 M230 62 L206 68" w={4} />
      <Line d="M190 98 Q200 106 210 98" w={3} />
      <Solid d="M186 100 l3 6 l3 -6 Z M208 100 l3 6 l3 -6 Z" />
      <Shape d="M120 120 C130 104 270 104 280 120 C300 170 270 210 250 214 H150 C130 210 100 170 120 120 Z" />
      <Line d="M170 160 q30 18 60 0" w={3} />
      <Line d="M130 126 L96 150 L100 110" w={8} />
      <Line d="M270 126 L310 140" w={8} />
      <Line d="M320 150 L338 20" w={7} />
      <Line d="M330 70 L300 56 M332 56 L360 40 M336 36 L310 22" w={4} />
      <Shape d="M300 20 C300 4 380 4 376 22 C370 40 310 40 300 20 Z" w={3} />
      <Line d="M170 214 V228 M230 214 V228" w={9} />
    </Drawing>
  );
}

export function LegendaryChampion() {
  return (
    <Drawing label="Drawing of a scarred, cloaked hero with a great sword planted point-down, and ballad notes in the air">
      <Shape d="M156 90 C154 40 246 40 244 90 C244 112 156 112 156 90 Z" />
      <Line d="M180 66 L196 82 M178 82 L196 66" w={3} />
      <Dot x={212} y={76} r={4} />
      <Line d="M192 98 H214" w={4} />
      <Shape d="M130 100 L170 112 H230 L270 100 L300 220 H100 Z" />
      <Shape d="M168 112 H232 V186 H168 Z" w={4} />
      <Line d="M200 112 V186 M168 150 H232" w={3} />
      <Line d="M190 130 l8 12 M214 160 l6 8" w={3} />
      <Line d="M150 140 L130 190 M250 140 L270 180" w={6} />
      <Line d="M200 26 V200" w={6} />
      <Line d="M180 130 H220" w={7} />
      <Solid d="M194 200 H206 L200 214 Z" />
      <Line d="M326 40 v28 M326 68 q-12 4 -12 -4 q0 -8 12 -4 M350 56 v22 M350 78 q-10 4 -10 -3 q0 -7 10 -3" w={3} />
      <Line d="M50 60 v18 M50 78 q-10 4 -10 -3 q0 -6 10 -3" w={3} />
    </Drawing>
  );
}
