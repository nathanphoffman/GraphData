import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "./artStyle";

const card = "var(--b-card)";

function CarnivalColossus() {
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

function ClockworkSongbird() {
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

function BlinkCat() {
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

function CarrionCrow() {
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

function AbyssalLeviathan() {
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

function BarnCatTerror() {
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

function CaveTroll() {
  return (
    <Drawing label="Drawing of a hulking warty troll holding a club">
      <Shape d="M130 90 C120 150 130 190 150 206 H250 C270 190 280 150 270 90 C250 70 150 70 130 90 Z" />
      <Shape d="M170 86 C170 50 230 50 230 86 C230 100 170 100 170 86 Z" />
      <Dot x={188} y={76} r={4} />
      <Dot x={212} y={76} r={4} />
      <Line d="M186 92 h28 M192 92 v-5 M208 92 v-5" w={3} />
      <Shape d="M130 100 C90 130 80 170 90 200 L116 200 C116 170 130 150 148 130 Z" />
      <Shape d="M270 100 C310 120 320 150 312 170 L286 168 C286 150 270 140 260 128 Z" />
      <Shape d="M298 168 L322 40 L346 48 L330 180 C326 196 296 196 298 168 Z" />
      <Line d="M326 70 l12 -2 M322 100 l12 0 M318 130 l12 2" w={3} />
      <Line d="M170 206 V222 M230 206 V222" w={6} />
      <Dot x={150} y={120} r={3} />
      <Dot x={250} y={140} r={3} />
      <Dot x={190} y={170} r={3} />
      <Line d="M170 150 q10 6 20 0" w={3} />
    </Drawing>
  );
}

function BefuddledWizard() {
  return (
    <Drawing label="Drawing of a confused bearded wizard in a pointy hat with question marks around him">
      <Shape d="M150 76 L214 6 L240 76 Z" />
      <Line d="M130 78 H260" w={6} />
      <Shape d="M156 82 H234 C240 120 240 150 220 170 H170 C150 150 150 120 156 82 Z" />
      <Dot x={180} y={100} r={4} />
      <Dot x={210} y={100} r={4} />
      <Line d="M170 94 q10 -8 20 0 M200 94 q10 -8 20 0" w={3} />
      <Shape d="M156 112 C150 170 170 210 195 214 C220 210 240 170 234 112 C216 130 174 130 156 112 Z" />
      <Shape d="M140 150 L120 218 H270 L250 150 Z" />
      <Line d="M140 156 L100 140 M250 156 L290 140" />
      <Line d="M300 60 q0 -18 18 -18 q18 0 18 16 q0 12 -18 18 v8" w={4} />
      <Dot x={318} y={100} r={3} />
      <Line d="M70 80 q0 -14 14 -14 q14 0 14 12 q0 9 -14 14 v6" w={4} />
      <Dot x={84} y={110} r={3} />
    </Drawing>
  );
}

function CaveDwarf() {
  return (
    <Drawing label="Drawing of a short bearded dwarf with a pickaxe and a lantern">
      <Shape d="M150 64 C150 30 250 30 250 64 L254 76 H146 Z" />
      <Line d="M200 30 V18 M186 18 H214" w={4} />
      <Shape d="M156 76 H244 C250 100 244 120 230 130 H170 C156 120 150 100 156 76 Z" />
      <Dot x={182} y={92} r={4} />
      <Dot x={218} y={92} r={4} />
      <Shape d="M150 100 C130 150 150 200 200 206 C250 200 270 150 250 100 C236 124 164 124 150 100 Z" />
      <Line d="M180 150 q10 8 20 0 q10 8 20 0" w={3} />
      <Shape d="M156 160 L140 216 H260 L244 160 Z" />
      <Line d="M254 170 L330 90" w={6} />
      <Shape d="M300 70 Q340 60 356 100 L336 96 Q324 84 312 90 Z" w={4} />
      <Line d="M150 170 L110 170" />
      <Line d="M110 170 V184" w={4} />
      <Shape d="M96 184 H124 V210 H96 Z" w={4} />
      <Line d="M104 190 V204 M116 190 V204" w={2} />
      <Line d="M80 176 l-14 -8 M84 164 l-8 -14 M140 176 l12 -10" w={3} />
    </Drawing>
  );
}

function BraggartKnight() {
  return (
    <Drawing label="Drawing of a knight with a huge plume, puffing out his chest and holding a sword up">
      <Line d="M180 52 C150 10 90 20 80 50 C130 40 160 50 190 70" w={5} />
      <Shape d="M160 100 C150 50 170 36 200 36 C230 36 250 50 240 100 Z" />
      <Line d="M170 80 H236 M170 66 H230" w={4} />
      <Line d="M200 66 V94" w={3} />
      <Shape d="M150 110 H250 C262 150 250 176 232 188 H168 C150 176 138 150 150 110 Z" />
      <Line d="M200 114 V186 M170 140 H230" w={3} />
      <Shape d="M168 188 H232 V222 H168 Z" w={4} />
      <Line d="M250 124 L290 94 L316 40" />
      <Solid d="M312 46 L326 6 L336 48 Z" />
      <Line d="M300 62 l22 14" w={6} />
      <Shape d="M130 124 C100 124 92 160 110 176 C130 176 144 156 150 140 Z" w={4} />
      <Line d="M92 60 l8 6 M64 40 l10 4 M110 24 l4 8" w={3} />
    </Drawing>
  );
}

function CastleGuard() {
  return (
    <Drawing label="Drawing of a guard in a helmet and tabard holding a spear, looking uneasy">
      <Line d="M290 20 V222" w={6} />
      <Solid d="M278 40 L290 6 L302 40 Z" />
      <Shape d="M156 76 C156 36 244 36 244 76 V90 H156 Z" />
      <Line d="M156 76 H244 M200 36 V76" w={3} />
      <Dot x={182} y={86} r={3} />
      <Dot x={218} y={86} r={3} />
      <Shape d="M160 100 H240 L250 210 H150 Z" />
      <Line d="M200 100 V210" w={3} />
      <Line d="M176 140 l12 12 l-12 12 M224 140 l-12 12 l12 12" w={3} />
      <Line d="M240 120 L290 140 M160 120 L130 150" />
      <Line d="M170 210 V224 M230 210 V224" w={6} />
      <Line d="M300 60 q8 6 8 14 M312 56 q8 8 6 20" w={3} />
    </Drawing>
  );
}

function Cutpurse() {
  return (
    <Drawing label="Drawing of a hooded thief holding up a stolen coin purse">
      <Shape d="M150 100 C140 30 260 30 250 100 C250 130 150 130 150 100 Z" />
      <path d="M170 100 C170 74 230 74 230 100 C230 120 170 120 170 100 Z" fill="currentColor" />
      <Dot x={190} y={102} r={3} />
      <circle cx="190" cy="102" r="3" fill={card} />
      <circle cx="210" cy="102" r="3" fill={card} />
      <Shape d="M150 126 C120 160 120 200 130 216 H270 C280 200 280 160 250 126 C230 140 170 140 150 126 Z" />
      <Line d="M170 150 L250 190" w={3} />
      <Line d="M250 140 L292 100" />
      <Shape d="M282 92 L314 92 L322 62 H274 Z" w={4} />
      <Shape d="M270 62 Q298 48 326 62 Z" w={4} />
      <Line d="M298 70 v14" w={3} />
      <circle cx="350" cy="130" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M350 124 v12" w={3} />
      <Line d="M335 100 l-6 -8 M356 100 l6 -8" w={3} />
    </Drawing>
  );
}

function BlackKnight() {
  return (
    <Drawing label="Drawing of a knight in black armor standing on a bridge with a sword planted in front of him">
      <Line d="M20 210 H380" w={6} />
      <Line d="M40 210 V230 M120 210 V230 M280 210 V230 M360 210 V230" w={4} />
      <Solid d="M160 90 C158 38 242 38 240 90 V100 H160 Z" />
      <Line d="M172 84 H228" w={4} />
      <path d="M172 82 H228 V88 H172 Z" fill={card} />
      <Solid d="M140 108 H260 L270 170 H130 Z" />
      <Solid d="M150 170 H250 V210 H150 Z" />
      <Solid d="M130 110 L100 150 L116 160 L146 130 Z" />
      <Solid d="M270 110 L296 140 L284 154 L262 130 Z" />
      <Line d="M300 20 V190" w={6} />
      <Solid d="M290 190 H310 L300 200 Z" />
      <Line d="M280 60 H320" w={6} />
      <path d="M200 40 Q220 14 240 22" fill="none" {...ink} strokeWidth={4} />
    </Drawing>
  );
}

function ChestLurker() {
  return (
    <Drawing label="Drawing of a wooden chest with a toothy open mouth and stubby legs">
      <Shape d="M90 100 C90 40 310 40 310 100 L300 120 H100 Z" />
      <Line d="M130 48 V112 M270 48 V112" w={4} />
      <Dot x={180} y={80} r={6} />
      <Dot x={220} y={80} r={6} />
      <Shape d="M100 120 H300 L310 150 H90 Z" w={4} />
      <Solid d="M112 122 l10 20 l10 -20 Z M150 122 l10 20 l10 -20 Z M190 122 l10 20 l10 -20 Z M230 122 l10 20 l10 -20 Z M268 122 l10 20 l10 -20 Z" />
      <Shape d="M90 150 H310 V206 H90 Z" />
      <Line d="M90 168 H310 M130 150 V206 M270 150 V206" w={3} />
      <Shape d="M186 162 H214 V184 H186 Z" w={4} />
      <Line d="M110 206 V222 M290 206 V222" w={8} />
      <Line d="M120 130 q-4 14 0 20 M160 130 q-4 14 0 20" w={3} />
    </Drawing>
  );
}

function BouncySlime() {
  return (
    <Drawing label="Drawing of a cheerful round slime blob bouncing">
      <Shape d="M110 200 C70 190 80 80 200 70 C320 80 330 190 290 200 C240 210 160 210 110 200 Z" />
      <Dot x={168} y={120} r={9} />
      <Dot x={232} y={120} r={9} />
      <circle cx="171" cy="116" r="3" fill={card} />
      <circle cx="235" cy="116" r="3" fill={card} />
      <Line d="M170 150 Q200 180 230 150" />
      <Line d="M130 100 q10 -14 26 -14" w={4} />
      <Line d="M300 120 q8 -4 8 -12" w={3} />
      <Line d="M170 224 H230" w={3} />
      <Line d="M130 224 H150 M250 224 H270" w={3} />
      <Line d="M200 34 V50 M170 40 l8 12 M230 40 l-8 12" w={4} />
    </Drawing>
  );
}

function CaveWurm() {
  return (
    <Drawing label="Drawing of a huge blind worm with a ring of teeth bursting up through the floor">
      <Line d="M20 190 H110 M290 190 H380" w={4} />
      <Shape d="M124 190 C110 120 130 60 200 40 C270 60 290 120 276 190 Z" />
      <Line d="M118 150 q40 10 82 0 q42 10 82 0 M122 110 q38 10 78 0 q40 10 78 0 M134 74 q34 8 66 0 q34 8 66 0" w={3} />
      <ellipse cx="200" cy="60" rx="40" ry="18" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="60" rx="22" ry="8" fill="currentColor" />
      <Solid d="M162 56 l6 8 l6 -8 Z M178 50 l6 8 l6 -8 Z M194 48 l6 8 l6 -8 Z M210 50 l6 8 l6 -8 Z M226 52 l6 8 l6 -8 Z M236 60 l-4 8 l-6 -8 Z M170 64 l6 -8 l6 8 Z" />
      <Line d="M84 190 l-8 -14 l-12 8 M316 190 l8 -14 l12 8 M96 206 l-6 14 M300 206 l8 14" w={3} />
      <Line d="M110 218 q20 8 40 0 M250 218 q20 8 40 0" w={3} />
    </Drawing>
  );
}

function CloudLeviathan() {
  return (
    <Drawing label="Drawing of a round-bellied whale floating among clouds with a tiny airship nearby">
      <Shape d="M60 120 C60 60 200 40 290 90 C330 110 340 150 316 160 C280 190 180 200 120 180 C80 168 60 150 60 120 Z" />
      <Line d="M130 170 C170 200 250 200 290 170 M150 188 H280" w={3} />
      <Shape d="M60 120 L24 84 L40 130 L20 150 L66 138 Z" />
      <Dot x={290} y={110} r={5} />
      <Line d="M300 136 q20 6 28 -2" w={4} />
      <Line d="M180 110 Q220 80 250 100" w={3} />
      <Shape d="M40 210 q4 -20 28 -18 q10 -16 32 -4 q22 -6 26 14 q14 4 10 14 H44 q-10 -2 -4 -6 Z" w={3} />
      <Shape d="M280 220 q4 -16 24 -14 q10 -12 28 -2 q18 -4 20 12 H280 Z" w={3} />
      <Line d="M110 40 q10 -10 22 -4 q10 -10 22 0 q14 -2 14 10 H110 Z" w={3} />
      <Shape d="M326 30 C326 14 366 14 366 30 C366 42 326 42 326 30 Z" w={3} />
      <Line d="M334 42 v6 M358 42 v6 M334 48 h24" w={2} />
    </Drawing>
  );
}

function BoneSorcerer() {
  return (
    <Drawing label="Drawing of a robed skeleton with a crown of finger bones and a staff">
      <Line d="M120 20 V224" w={6} />
      <Shape d="M108 20 Q120 4 132 20 Q120 34 108 20 Z" w={4} />
      <Shape d="M182 96 C170 50 230 50 218 96 L216 110 H184 Z" />
      <Dot x={192} y={82} r={6} />
      <Dot x={208} y={82} r={6} />
      <Line d="M200 92 v6" w={3} />
      <Line d="M190 106 V112 M200 106 V112 M210 106 V112" w={3} />
      <Line d="M170 62 V30 M184 58 V22 M200 56 V16 M216 58 V22 M230 62 V30" w={6} />
      <Line d="M162 62 H238" w={5} />
      <Shape d="M170 116 H230 L270 218 H130 Z" />
      <Line d="M184 150 H216 M180 170 H220 M176 190 H224" w={3} />
      <Line d="M170 130 L128 156" />
      <Line d="M230 130 L280 150 L296 124" />
      <Line d="M296 124 l-6 -10 M296 124 l2 -12 M296 124 l8 -8" w={3} />
      <Line d="M330 70 q10 -6 20 0 M320 100 q14 -8 28 0" w={3} />
    </Drawing>
  );
}

function BloodNoble() {
  return (
    <Drawing label="Drawing of a pale lord with fangs in a high-collared cloak">
      <Shape d="M200 70 L120 20 L90 220 H310 L280 20 Z" />
      <Shape d="M200 70 L150 36 L132 130 H268 L250 36 Z" w={3} />
      <Shape d="M166 60 C160 30 240 30 234 60 C238 100 220 124 200 128 C180 124 162 100 166 60 Z" />
      <Line d="M170 52 Q200 66 230 40 L230 56 Q200 70 170 62 Z" w={3} />
      <Line d="M178 80 l14 4 M222 80 l-14 4" w={4} />
      <Dot x={188} y={88} r={3} />
      <Dot x={212} y={88} r={3} />
      <Line d="M188 108 Q200 114 212 108" w={3} />
      <Solid d="M190 108 l3 12 l3 -11 Z M204 109 l3 11 l3 -12 Z" />
      <Solid d="M200 150 l8 10 l-8 10 l-8 -10 Z" />
      <Line d="M200 170 V216" w={3} />
      <circle cx="330" cy="50" r="22" fill="none" {...ink} strokeWidth={4} />
      <Line d="M320 36 q14 14 0 28" w={4} />
    </Drawing>
  );
}

function CrossroadsFiend() {
  return (
    <Drawing label="Drawing of a well-dressed stranger in a top hat standing at a crossroads signpost">
      <Line d="M20 220 L180 196 M220 196 L380 220 M200 196 V232 M180 196 H220" w={4} />
      <Line d="M300 30 V200" w={6} />
      <Shape d="M300 40 H352 L366 52 L352 64 H300 Z" w={4} />
      <Shape d="M300 78 H252 L238 90 L252 102 H300 Z" w={4} />
      <Shape d="M168 60 H232 L226 20 H174 Z" />
      <Line d="M156 60 H244" w={6} />
      <Shape d="M170 66 H230 V110 C230 124 170 124 170 110 Z" />
      <Line d="M180 82 l8 -4 M220 82 l-8 -4" w={3} />
      <Dot x={190} y={90} r={3} />
      <Dot x={210} y={90} r={3} />
      <Line d="M184 104 Q200 114 218 100" w={3} />
      <Shape d="M156 130 H244 L252 200 H148 Z" />
      <Line d="M200 130 L190 160 L200 200 L210 160 Z" w={3} />
      <Line d="M244 140 L270 158 L282 134" />
      <Solid d="M166 62 L152 40 L174 56 Z" />
      <Solid d="M234 62 L248 40 L226 56 Z" />
    </Drawing>
  );
}

function CheekyPoltergeist() {
  return (
    <Drawing label="Drawing of an invisible prankster shown as a dotted outline, with a spoon, a sock and a chair flying around it">
      <Line d="M160 90 C160 40 240 40 240 90 L250 190 q-12 10 -24 0 q-12 10 -26 0 q-12 10 -26 0 q-12 10 -24 0 Z" dash="3 9" w={5} />
      <Dot x={184} y={90} r={6} />
      <Dot x={216} y={90} r={6} />
      <Line d="M180 118 Q200 138 222 116" />
      <Line d="M60 60 C90 40 100 70 80 84 M82 84 L74 112" w={4} />
      <Shape d="M52 44 C52 30 80 30 80 44 C80 56 52 56 52 44 Z" w={4} />
      <Line d="M66 56 L62 92" w={4} />
      <Shape d="M310 50 L340 50 L346 90 H320 C300 90 300 60 310 50 Z" w={4} />
      <Line d="M316 50 V30 M330 50 V30" w={3} />
      <Shape d="M300 140 V190 M300 150 H350 M350 150 V190 M300 170 H350" w={4} />
      <Line d="M280 30 l10 6 M26 130 l12 -4 M36 150 l12 2 M350 110 l12 -6" w={3} />
    </Drawing>
  );
}

function AetherDjinn() {
  return (
    <Drawing label="Drawing of a smoky djinn with crossed arms rising out of a brass pipe">
      <Shape d="M130 190 H270 V222 H130 Z" />
      <Line d="M150 190 V222 M250 190 V222" w={3} />
      <Shape d="M270 200 H330 V212 H270 Z" w={4} />
      <circle cx="340" cy="206" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M340 196 V206 L346 210" w={3} />
      <Line d="M190 190 C170 170 230 150 200 130 C170 110 230 100 210 80" w={5} />
      <Line d="M212 190 C240 170 190 150 224 130 C250 112 200 100 220 80" w={5} />
      <Shape d="M170 78 C160 20 250 20 242 78 C240 108 172 108 170 78 Z" />
      <Line d="M184 48 Q206 32 230 48" w={4} />
      <Line d="M180 62 l14 4 M232 62 l-14 4" w={4} />
      <Dot x={194} y={72} r={4} />
      <Dot x={218} y={72} r={4} />
      <Line d="M194 92 H220" w={3} />
      <Shape d="M130 140 Q160 120 206 140 Q250 120 280 140 Q260 170 206 160 Q150 170 130 140 Z" />
      <Line d="M130 100 C100 90 100 60 120 50 M280 100 C310 90 310 60 290 50" w={3} dash="3 7" />
      <Line d="M60 160 q10 -8 20 0 q10 8 20 0 M310 170 q10 -8 20 0 q10 8 20 0" w={3} />
    </Drawing>
  );
}

export const fantasyArt: Record<string, () => ReactNode> = {
  "carnival-colossus": CarnivalColossus,
  "clockwork-songbird": ClockworkSongbird,
  "blink-cat": BlinkCat,
  "carrion-crow": CarrionCrow,
  "abyssal-leviathan": AbyssalLeviathan,
  "barn-cat-terror": BarnCatTerror,
  troll: CaveTroll,
  "befuddled-wizard": BefuddledWizard,
  "cave-dwarf": CaveDwarf,
  "braggart-knight": BraggartKnight,
  "castle-guard": CastleGuard,
  cutpurse: Cutpurse,
  "black-knight": BlackKnight,
  "chest-lurker": ChestLurker,
  "bouncy-slime": BouncySlime,
  "cave-wurm": CaveWurm,
  "cloud-leviathan": CloudLeviathan,
  "bone-sorcerer": BoneSorcerer,
  "blood-noble": BloodNoble,
  "crossroads-fiend": CrossroadsFiend,
  "cheeky-poltergeist": CheekyPoltergeist,
  "aether-djinn": AetherDjinn,
};
