import type { ReactNode } from "react";
import { Dot, Drawing, ink, Line, Shape, Solid } from "../core/artStyle";
import { Figure } from "../core/figure";

const card = "var(--b-card)";

const Waves = ({ y = 214, w = 3 }: { y?: number; w?: number }) => (
  <Line d={`M0 ${y} q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} w={w} />
);

/** Three-quarter pirate hat on a head centered at x=200. */
function Tricorn({ y = 52 }: { y?: number }) {
  return (
    <>
      <Shape d={`M148 ${y + 8} L200 ${y - 34} L252 ${y + 8} Q200 ${y + 22} 148 ${y + 8} Z`} />
      <Line d={`M148 ${y + 8} Q200 ${y + 22} 252 ${y + 8}`} w={5} />
    </>
  );
}

function FigureheadGuardian() {
  return (
    <Drawing label="Drawing of a carved wooden maiden on a ship's prow, arms outstretched, guarding the hull">
      <Shape d="M20 230 L60 170 H380 L360 230 Z" w={4} />
      <Line d="M80 190 H350 M100 210 H340" w={3} />
      <Shape d="M60 170 C40 150 50 120 90 110 L120 170 Z" />
      <Shape d="M134 74 C130 36 186 36 182 74 C186 96 130 96 134 74 Z" />
      <Dot x={150} y={68} r={3} />
      <Dot x={168} y={68} r={3} />
      <Line d="M148 82 q10 6 20 0" w={3} />
      <Line d="M130 70 C112 90 110 130 126 150 M186 70 C204 90 206 130 190 150" w={5} />
      <Shape d="M126 100 H192 L210 190 H108 Z" />
      <Line d="M158 100 V190 M126 130 H192" w={3} />
      <Line d="M130 112 L90 90 L60 100 M188 112 L230 90 L262 100" w={7} />
      <Line d="M250 150 q20 -10 40 0 M280 120 q20 -10 40 0" w={3} dash="2 5" />
      <Waves y={226} />
    </Drawing>
  );
}

function KnotSnake() {
  return (
    <Drawing label="Drawing of a length of old rigging that ties itself into knots to trip a sailor">
      <Line d="M20 200 C60 170 90 230 130 200 C170 170 150 130 190 140 C230 150 210 200 250 190 C300 178 290 120 330 130 C360 138 370 170 384 160" w={14} />
      <Line d="M20 200 C60 170 90 230 130 200 C170 170 150 130 190 140 C230 150 210 200 250 190 C300 178 290 120 330 130 C360 138 370 170 384 160" w={7} />
      <circle cx="190" cy="140" r="26" fill="none" {...ink} strokeWidth={6} />
      <circle cx="250" cy="190" r="22" fill="none" {...ink} strokeWidth={6} />
      <Shape d="M370 150 C380 134 398 136 400 152 C396 168 374 170 368 160 Z" w={4} />
      <Dot x={388} y={148} r={3} />
      <Line d="M392 156 l6 6 l-2 -10" w={2} />
      <Line d="M24 192 l-10 -6 M24 200 l-12 4 M26 210 l-8 8" w={3} />
      <Line d="M60 60 L90 90 M60 90 L90 60" w={4} dash="2 4" />
      <Shape d="M300 64 C292 40 330 36 330 60 L336 108 L300 108 Z" w={3} />
      <Line d="M306 108 V132 M326 108 V132" w={5} />
    </Drawing>
  );
}

function RiggingMarionette() {
  return (
    <Drawing label="Drawing of a puppet of old rope and canvas dropping from the rigging">
      <Line d="M20 30 H380 M200 30 V0 M120 30 L90 0 M280 30 L310 0" w={6} />
      <Line d="M200 30 V70 M170 30 L176 118 M230 30 L224 118 M160 30 L148 150 M240 30 L252 150" w={2} />
      <Shape d="M176 70 H224 V108 H176 Z" />
      <Line d="M186 84 L194 92 M194 84 L186 92 M206 84 L214 92 M214 84 L206 92" w={3} />
      <Line d="M184 100 H216 M190 96 v8 M200 96 v8 M210 96 v8" w={2} />
      <Shape d="M168 114 H232 V176 H168 Z" />
      <Line d="M184 114 V176 M200 114 V176 M216 114 V176" w={2} />
      <Line d="M168 120 L134 146 L148 168 M232 120 L268 146 L252 168" w={6} />
      <Line d="M186 176 L172 212 L152 218 M214 176 L226 214 L248 216" w={6} />
      <Line d="M100 180 q10 -8 20 0 M290 190 q10 -8 20 0" w={3} dash="2 5" />
      <Waves y={228} />
    </Drawing>
  );
}

function CursedManOWar() {
  return (
    <Drawing label="Drawing of a warship with tattered sails and a dead crew nailed to the decks, cannons run out">
      <Line d="M130 40 V160 M220 20 V160 M300 50 V160" w={6} />
      <Shape d="M130 50 L180 50 L190 120 L130 130 Z M220 30 L280 36 L290 120 L220 124 Z M300 58 L350 66 L340 124 L300 128 Z" w={4} />
      <Line d="M140 130 l-8 14 M232 124 l8 16 M310 128 l-6 12 M160 50 l6 40 M250 36 l6 40" w={2} />
      <Shape d="M60 160 H370 L346 214 H90 Z" />
      <Line d="M80 180 H356" w={3} />
      <Shape d="M100 182 h20 v8 h-20 Z M150 184 h20 v8 h-20 Z M200 184 h20 v8 h-20 Z M250 184 h20 v8 h-20 Z M300 184 h20 v8 h-20 Z" w={3} />
      <Line d="M100 166 v-14 M122 166 v-16 M150 166 v-14 M270 166 v-14" w={4} />
      <circle cx="100" cy="146" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="150" cy="148" r="6" fill={card} {...ink} strokeWidth={3} />
      <Line d="M60 160 L30 140 L56 150" w={5} />
      <Waves y={222} />
    </Drawing>
  );
}

function IronMaidenCannon() {
  return (
    <Drawing label="Drawing of a cursed ship's cannon on a carriage firing by itself, with a screaming face on the barrel">
      <Shape d="M90 130 L290 110 L300 150 L90 170 Z" />
      <Shape d="M60 130 C40 130 40 170 60 170 L90 170 L90 130 Z" w={4} />
      <circle cx="50" cy="150" r="8" fill="currentColor" />
      <Shape d="M290 104 H330 V156 H290 Z" w={5} />
      <ellipse cx="330" cy="130" rx="10" ry="26" fill="currentColor" />
      <Dot x={308} y={122} r={0} />
      <circle cx="304" cy="124" r="4" fill={card} />
      <circle cx="318" cy="124" r="4" fill={card} />
      <Shape d="M300 138 Q310 152 320 138 Z" w={2} />
      <Shape d="M130 170 H260 L270 190 H120 Z" w={4} />
      <circle cx="150" cy="206" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="250" cy="206" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 206 H250" w={3} />
      <Line d="M350 110 l24 -14 M352 130 l32 0 M350 150 l24 14" w={4} />
      <Solid d="M366 130 a10 10 0 1 0 0.1 0 Z" />
      <Line d="M70 120 q10 -14 0 -26 q-8 -12 6 -22" w={3} dash="3 6" />
      <Line d="M10 224 H390" w={4} />
    </Drawing>
  );
}

function GaleGargoyle() {
  return (
    <Drawing label="Drawing of a stone figurehead come alive in a storm, swooping off the bow with wings spread">
      <Line d="M20 30 l-10 24 M70 20 l-10 24 M120 30 l-10 24 M180 18 l-10 24 M250 26 l-10 24 M310 20 l-10 24 M370 30 l-10 24" w={3} />
      <Shape d="M190 100 C150 60 90 40 30 56 C60 76 70 100 70 124 C110 112 160 116 190 134 Z" />
      <Shape d="M210 100 C250 60 310 40 370 56 C340 76 330 100 330 124 C290 112 240 116 210 134 Z" />
      <Shape d="M176 78 C170 36 230 36 224 78 C230 106 170 106 176 78 Z" />
      <Shape d="M182 48 L170 24 L196 40 Z M218 48 L230 24 L204 40 Z" w={4} />
      <Dot x={190} y={72} r={4} />
      <Dot x={210} y={72} r={4} />
      <Solid d="M190 92 l4 10 l6 -8 l6 8 l4 -10 Z" />
      <Shape d="M178 106 H222 L214 170 H186 Z" />
      <Line d="M190 170 L174 200 M210 170 L226 200" w={5} />
      <Line d="M174 200 l-10 6 M226 200 l10 6" w={3} />
      <Shape d="M150 214 H250 L240 226 H160 Z" w={3} />
      <Line d="M60 88 l8 8 M330 94 l-8 8" w={2} />
    </Drawing>
  );
}

function MastPuppet() {
  return (
    <Drawing label="Drawing of a puppet of rope and sailcloth dropping from the mast to pull a sailor up into the dark">
      <Line d="M200 0 V224" w={9} />
      <Line d="M110 50 H290" w={7} />
      <Shape d="M110 54 H200 V130 H110 Z" w={3} />
      <Shape d="M200 54 H290 V130 H200 Z" w={3} />
      <Shape d="M232 56 H262 V86 H232 Z" />
      <Line d="M240 66 l6 6 M246 66 l-6 6 M250 66 l6 6 M256 66 l-6 6" w={2} />
      <Line d="M244 98 q6 -4 12 0" w={2} />
      <Shape d="M236 90 H258 L262 130 H232 Z" w={3} />
      <Line d="M232 96 L210 114 M262 96 L282 78" w={5} />
      <Line d="M246 130 L240 154 L226 160 M250 130 L260 156" w={5} />
      <Line d="M290 56 q10 -10 20 0 M80 80 q10 -10 20 0" w={3} dash="2 5" />
      <Shape d="M60 150 C50 130 80 120 84 140 L94 200 H56 Z" w={4} />
      <Line d="M84 150 L100 120 L96 90 M96 90 L110 76" w={3} dash="3 4" />
      <Shape d="M0 214 H400 V230 H0 Z" w={3} />
    </Drawing>
  );
}

function ParrotLookout() {
  return (
    <Drawing label="Drawing of a colorful parrot on a spyglass-pointing perch, with a far ship on the horizon">
      <Line d="M10 150 H390" w={3} />
      <Shape d="M300 150 L330 120 L350 150 Z" w={3} />
      <Line d="M330 120 V100 L346 112 Z" w={3} />
      <Line d="M120 214 H220 M170 214 V164" w={7} />
      <Solid d="M150 90 C170 76 220 84 230 120 C238 150 210 170 180 168 C150 164 134 120 150 90 Z" />
      <Shape d="M170 100 C170 80 220 80 226 104 L240 112 L226 122 C206 130 176 124 170 100 Z" w={4} />
      <Shape d="M226 100 L252 108 L228 118 Z" w={4} />
      <circle cx="210" cy="98" r="5" fill={card} />
      <Dot x={211} y={98} r={2} />
      <Line d="M160 112 C140 110 120 120 112 140" w={9} />
      <Line d="M150 168 L120 206 M162 170 L136 212 M174 170 L156 216" w={7} />
      <Line d="M180 168 V186 M196 166 V186" w={4} />
      <Line d="M232 118 Q250 128 244 140 M244 84 L270 62 M270 62 l-8 2 M270 62 l-2 8" w={3} />
      <Line d="M270 56 q10 -8 20 0 M290 40 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function PirateCrab() {
  return (
    <Drawing label="Drawing of a big hermit crab in a pirate-flag shell wearing a tricorn hat, glaring at a gull">
      <Shape d="M70 190 C50 120 150 60 220 80 C280 100 300 160 270 190 Z" />
      <Solid d="M150 130 a10 10 0 1 0 0.1 0 Z" />
      <path d="M138 142 L162 160 M162 142 L138 160" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <path d="M100 150 C90 130 120 110 150 110" fill="none" stroke={card} strokeWidth="3" />
      <Shape d="M90 78 L130 30 L190 54 L216 80 Q150 100 90 78 Z" w={4} />
      <Line d="M90 78 Q150 100 216 80" w={5} />
      <Shape d="M240 190 C230 170 280 150 310 160 C340 170 344 196 320 204 C300 210 250 206 240 190 Z" w={4} />
      <circle cx="274" cy="164" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={274} y={166} r={2} />
      <Line d="M270 156 l-6 -18 M298 160 l6 -18" w={3} />
      <Line d="M310 180 Q340 190 350 170 L368 162 M350 170 L360 192" w={7} />
      <Line d="M350 162 l16 -8 l-4 18" w={5} />
      <Line d="M110 190 L90 214 M150 196 L140 224 M230 196 L250 220" w={5} />
      <Line d="M300 40 q14 -14 30 -4 q16 -14 32 -2" w={4} />
    </Drawing>
  );
}

function ReefShark() {
  return (
    <Drawing label="Drawing of a six-foot grey-finned shark circling above a reef, drawn to a drop of blood">
      <Shape d="M0 224 C40 180 90 200 130 190 C180 176 220 224 280 200 C330 180 360 200 400 224 Z" w={4} />
      <Line d="M50 204 l10 -16 l10 16 M300 206 l10 -18 l10 18" w={3} />
      <Shape d="M40 120 C100 80 250 70 340 112 C300 126 220 150 130 150 C80 150 50 140 40 120 Z" />
      <Shape d="M180 84 L210 36 L240 84 Z" w={4} />
      <Shape d="M60 120 L12 90 L30 122 L8 150 L54 134 Z" />
      <Shape d="M170 140 L200 176 L240 144 Z" w={4} />
      <Dot x={312} y={108} r={4} />
      <Line d="M334 112 q10 8 -2 16 M300 124 l0 -8 M310 126 l2 -8 M320 124 l4 -6" w={3} />
      <Line d="M270 100 l-4 14 M280 98 l-4 14 M290 98 l-4 14" w={3} />
      <circle cx="350" cy="170" r="5" fill="currentColor" />
      <circle cx="362" cy="182" r="3" fill="currentColor" />
      <circle cx="342" cy="188" r="3" fill="currentColor" />
    </Drawing>
  );
}

function HammerheadTerror() {
  return (
    <Drawing label="Drawing of a hammerhead shark with a bull's shoulders ramming a small boat">
      <Shape d="M240 190 L330 170 L390 180 L360 218 H260 Z" w={4} />
      <Line d="M330 170 V120 M330 122 L376 150 L330 154" w={4} />
      <Shape d="M60 130 C100 90 190 90 250 130 C210 150 120 156 60 130 Z" />
      <Shape d="M230 96 L226 80 L300 82 L306 130 L230 132 Z" w={0} />
      <Shape d="M236 90 H262 L270 112 H236 Z" w={0} />
      <Shape d="M222 116 C216 90 240 84 260 100 L276 94 L276 144 L260 138 C240 150 226 140 222 116 Z" />
      <path d="M240 82 L220 124 M276 94 L276 144" fill="none" />
      <Shape d="M236 74 H292 L298 94 H236 Z" w={4} />
      <Shape d="M236 138 H298 L292 158 H236 Z" w={4} />
      <Dot x={296} y={86} r={3} />
      <Shape d="M140 96 L172 50 L196 98 Z" w={4} />
      <Shape d="M62 130 L20 100 L34 130 L14 158 L58 142 Z" />
      <Line d="M110 120 l10 6 M140 122 l10 6 M170 122 l10 6" w={3} />
      <Waves y={206} w={4} />
    </Drawing>
  );
}

function KrakenSpawn() {
  return (
    <Drawing label="Drawing of a ship-sized squid pulling a small boat below the waves">
      <Shape d="M140 20 C100 40 110 110 150 130 L250 130 C290 110 300 40 260 20 C230 4 170 4 140 20 Z" />
      <Shape d="M150 130 H250 V150 H150 Z" w={4} />
      <circle cx="176" cy="104" r="16" fill={card} {...ink} strokeWidth={4} />
      <circle cx="224" cy="104" r="16" fill={card} {...ink} strokeWidth={4} />
      <Dot x={176} y={104} r={8} />
      <Dot x={224} y={104} r={8} />
      <Line d="M160 150 C120 180 80 150 40 180 C20 196 40 214 60 200 M190 150 C170 190 130 200 110 224 M210 150 C230 190 270 200 290 224 M240 150 C280 180 320 150 360 180 C380 196 360 214 340 200" w={9} />
      <circle cx="80" cy="170" r="3" fill={card} />
      <circle cx="110" cy="176" r="3" fill={card} />
      <circle cx="320" cy="170" r="3" fill={card} />
      <Shape d="M310 196 L350 190 L338 210 H316 Z" w={3} />
      <Line d="M330 190 V170" w={3} />
      <Waves y={140} w={4} />
    </Drawing>
  );
}

function DrownedPack() {
  return (
    <Drawing label="Drawing of three drowned hounds following a ship through fog, howling up through the hull">
      <Shape d="M120 100 L350 90 L320 150 H150 Z" w={5} />
      <Line d="M220 90 V30 M220 36 L270 56 L220 80" w={4} />
      {[[100, 190], [200, 200], [290, 190]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <Shape d="M-30 6 C-30 -18 30 -18 30 6 Z" w={4} />
          <Shape d="M18 -8 C16 -28 44 -34 54 -20 L68 -12 L52 -2 C40 6 22 4 18 -8 Z" w={4} />
          <Dot x={44} y={-18} r={3} />
          <Line d="M54 -12 q6 4 4 10" w={2} />
          <Line d="M-30 0 l-10 -6 M-26 6 l-8 8" w={3} />
        </g>
      ))}
      <Line d="M0 164 q20 -10 40 0 t40 0 M260 168 q20 -10 40 0 t40 0 M150 172 q20 -10 40 0" w={3} dash="8 8" />
      <Waves y={226} w={4} />
      <Line d="M130 150 q-4 14 2 24 M230 150 q4 16 -2 28" w={3} dash="2 5" />
    </Drawing>
  );
}

function AlbatrossOmen() {
  return (
    <Drawing label="Drawing of a huge white albatross trailing a ship, with a crossbow bolt on the deck below">
      <Shape d="M200 70 C150 40 80 30 10 60 C60 70 100 86 110 110 C150 98 180 100 194 108 Z" />
      <Shape d="M200 70 C250 40 320 30 390 60 C340 70 300 86 290 110 C250 98 220 100 206 108 Z" />
      <Shape d="M180 108 C176 76 224 76 220 108 L212 150 H188 Z" />
      <Shape d="M184 78 C184 54 216 54 216 78 C216 90 184 90 184 78 Z" />
      <Shape d="M200 70 L230 76 L204 84 Z" w={4} />
      <Dot x={194} y={68} r={3} />
      <Line d="M190 150 L180 170 M210 150 L220 170" w={4} />
      <Shape d="M80 214 H320 L296 228 H104 Z" w={4} />
      <Line d="M200 214 V190 L240 204 L200 208" w={3} />
      <Line d="M126 206 L150 196 M150 196 l-8 -4 M150 196 l-4 8" w={3} />
      <Line d="M60 30 q10 -8 20 0 M330 20 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function GreatWhiteTerror() {
  return (
    <Drawing label="Drawing of a thirty-foot shark with a harpoon still stuck in its jaw">
      <Shape d="M20 130 C100 80 260 76 370 120 C330 140 230 164 120 160 C60 160 30 148 20 130 Z" />
      <Shape d="M170 84 L206 24 L246 84 Z" w={4} />
      <Shape d="M40 130 L6 90 L22 128 L2 170 L42 144 Z" />
      <Shape d="M150 150 L190 196 L240 150 Z" w={4} />
      <Dot x={320} y={112} r={5} />
      <Shape d="M370 120 L388 124 L370 130 Z" w={3} />
      <Line d="M340 130 l-6 12 l8 -6 l6 10 l4 -14" w={3} />
      <Line d="M296 110 l14 -2 M296 118 l14 0" w={3} />
      <Line d="M352 140 L396 190" w={4} />
      <Solid d="M344 132 L356 140 L348 148 Z" />
      <Line d="M396 190 l-8 -2 M396 190 l-2 -8" w={3} />
      <Line d="M230 110 l14 6 M200 112 l14 6" w={3} />
      <Waves y={52} w={4} />
    </Drawing>
  );
}

function DeckhandScallywag() {
  return (
    <Drawing label="Drawing of a barefoot gap-toothed sailor with a mop and a cutlass">
      <Figure arms={<Line d="M154 116 L120 150 M246 116 L274 140" w={7} />}>
        <Line d="M176 60 q24 -22 52 0" w={5} />
        <Line d="M176 60 l-8 20" w={3} />
        <Dot x={188} y={76} r={3} />
        <Dot x={212} y={76} r={3} />
        <Path_Grin />
        <Line d="M152 106 V180 M170 106 V180 M190 106 V180 M210 106 V180 M230 106 V180 M248 106 V180" w={2} />
        <Shape d="M166 180 H196 V200 H166 Z M204 180 H234 V200 H204 Z" w={3} />
        <Line d="M180 200 V226 M220 200 V226" w={7} />
        <Line d="M110 30 V180" w={5} />
        <Shape d="M90 180 H132 L128 206 H94 Z" w={4} />
        <Line d="M276 140 L330 90" w={6} />
        <Line d="M330 90 L354 50 L362 56 L342 98" w={4} />
      </Figure>
    </Drawing>
  );
}

function Path_Grin() {
  return (
    <>
      <Line d="M186 90 Q200 102 214 90" w={3} />
      <Solid d="M194 94 l3 4 l3 -4 Z" />
    </>
  );
}

function PressGanger() {
  return (
    <Drawing label="Drawing of a burly dockside thug with a club and a sack, offering a friendly drink">
      <Shape d="M156 62 H244 V74 H156 Z" w={4} />
      <Shape d="M168 74 H232 V108 C232 124 168 124 168 108 Z" />
      <Line d="M180 88 H194 M206 88 H220" w={4} />
      <Line d="M186 108 Q200 118 214 108" w={3} />
      <Shape d="M128 128 L168 120 H232 L272 128 L264 200 H136 Z" />
      <Line d="M200 120 V200" w={3} />
      <Line d="M140 140 L100 170 L84 150 M260 140 L300 120 L310 90" w={11} />
      <Shape d="M300 40 H334 L338 100 H298 Z" w={4} />
      <Shape d="M40 130 H84 L78 190 H46 Z" w={4} />
      <Line d="M50 130 V120 H74 V130" w={3} />
      <Shape d="M150 200 H196 V226 H150 Z M204 200 H250 V226 H204 Z" w={4} />
      <Shape d="M310 150 H350 V180 H310 Z" w={3} />
      <Line d="M318 150 V140 H342 V150" w={3} />
    </Drawing>
  );
}

function CutlassCorsair() {
  return (
    <Drawing label="Drawing of a swashbuckler swinging on a rope with a cutlass and a red sash">
      <Line d="M200 0 C220 40 250 60 260 90" w={4} />
      <Shape d="M168 90 C164 56 236 56 232 90 C236 112 164 112 168 90 Z" />
      <Shape d="M156 70 Q200 34 244 70 Z" w={4} />
      <Dot x={188} y={88} r={3} />
      <Dot x={212} y={88} r={3} />
      <Line d="M184 100 Q200 110 218 98" w={3} />
      <Shape d="M150 116 H250 L254 180 H146 Z" />
      <Line d="M146 160 L254 168" w={9} />
      <Line d="M152 126 L118 100 L96 56 M248 126 L260 100 L262 90" w={7} />
      <Line d="M96 56 L60 8" w={4} />
      <Solid d="M56 14 L66 0 L72 16 Z" />
      <Line d="M254 130 L300 126" w={5} />
      <Solid d="M298 120 L318 124 L298 134 Z" />
      <Line d="M164 180 L150 224 M236 180 L270 210 L290 190" w={8} />
    </Drawing>
  );
}

function NavyLieutenant() {
  return (
    <Drawing label="Drawing of a crisp blue-coated naval officer with a sword and a spyglass">
      <Tricorn y={58} />
      <Shape d="M170 66 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 84 H194 M206 84 H218" w={4} />
      <Line d="M190 102 H210" w={3} />
      <Shape d="M146 124 H254 L260 200 H140 Z" />
      <Line d="M200 124 V200" w={3} />
      <Solid d="M178 138 h8 v8 h-8 Z M178 156 h8 v8 h-8 Z M214 138 h8 v8 h-8 Z M214 156 h8 v8 h-8 Z" />
      <Line d="M150 130 L118 160 M250 130 L290 100 L308 74" w={7} />
      <Shape d="M300 60 H370 V78 H300 Z" w={4} />
      <Line d="M370 69 H388" w={4} />
      <Line d="M130 160 L90 210" w={4} />
      <Line d="M80 200 l18 12" w={5} />
      <Shape d="M148 200 H196 V226 H148 Z M204 200 H252 V226 H204 Z" w={4} />
    </Drawing>
  );
}

function PirateCaptain() {
  return (
    <Drawing label="Drawing of a bellowing bearded captain with three pistols, a peg leg and a big feathered hat">
      <Tricorn y={58} />
      <Line d="M232 36 C260 10 290 20 280 40 C268 34 256 38 240 46" w={4} />
      <Shape d="M168 66 C164 110 180 134 200 136 C220 134 236 110 232 66 Z" />
      <Line d="M180 82 H194 M206 82 H220" w={4} />
      <Shape d="M186 100 Q200 120 214 100 Z" w={3} />
      <Shape d="M136 138 L168 128 H232 L264 138 L258 200 H142 Z" />
      <Line d="M150 150 L250 190 M250 150 L150 190" w={4} />
      <Shape d="M164 150 h16 v10 h-16 Z M220 150 h16 v10 h-16 Z M190 164 h20 v10 h-20 Z" w={3} />
      <Line d="M146 142 L112 170 L94 142 M254 142 L290 110 L300 80" w={8} />
      <Shape d="M290 66 H336 V82 H290 Z" w={4} />
      <Line d="M162 200 L150 226 M238 200 V214 L252 226" w={9} />
      <Shape d="M232 214 h18 v12 h-18 Z" w={3} />
    </Drawing>
  );
}

function RoyalMarineSergeant() {
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

function PirateKing() {
  return (
    <Drawing label="Drawing of a legendary captain crowned with a tricorn, standing before a hundred-ship flag and the sea">
      <Shape d="M20 20 H160 V100 H20 Z" w={4} />
      <Solid d="M60 40 a16 16 0 1 0 0.1 0 Z" />
      <path d="M46 72 L94 92 M94 72 L46 92" stroke={card} strokeWidth="3" />
      <Line d="M20 20 V224" w={5} />
      {[[250, 60], [310, 50], [350, 70], [280, 80]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
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

function ShipsSurgeon() {
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

function IroncladQuartermaster() {
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

function BarnacleBiter() {
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

function SeaSerpent() {
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

function MaelstromLeviathan() {
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

function CatacombCrawler() {
  return (
    <Drawing label="Drawing of a pale many-armed thing in the dark of a wreck's cargo hold, grabbing for a sailor with a lantern">
      <Shape d="M0 20 H400 V224 H0 Z" w={5} />
      <Line d="M60 20 V224 M340 20 V224" w={5} />
      <Shape d="M60 160 H340 V224 H60 Z" w={3} />
      <Shape d="M110 130 H160 V160 H110 Z M240 120 H300 V160 H240 Z" w={4} />
      <Shape d="M170 106 C150 70 250 60 240 110 C250 140 160 140 170 106 Z" />
      <circle cx="194" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="220" cy="94" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={194} y={96} r={2} />
      <Dot x={220} y={94} r={2} />
      <Line d="M170 110 C130 100 110 130 90 120 M240 110 C280 100 300 130 320 120 M180 130 C150 160 130 180 100 176 M230 130 C260 160 280 180 310 176 M200 134 C196 170 210 190 200 210" w={7} />
      <Line d="M90 120 l-8 -8 M320 120 l8 -8 M100 176 l-10 4 M310 176 l10 4" w={3} />
      <Shape d="M350 140 H376 V168 H350 Z" w={4} />
      <Line d="M363 140 V128" w={3} />
      <Line d="M330 120 l14 -10 M376 120 l12 -10" w={3} dash="2 4" />
    </Drawing>
  );
}

function BilgeSprite() {
  return (
    <Drawing label="Drawing of a slimy little spirit in the bottom of the hold loosening every knot it can find">
      <Shape d="M0 130 H400 V230 H0 Z" w={5} />
      <Line d="M0 170 H400 M0 200 H400" w={2} dash="6 8" />
      <Line d="M10 200 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Shape d="M150 190 C140 150 160 110 200 110 C240 110 260 150 250 190 C230 204 170 204 150 190 Z" />
      <circle cx="184" cy="144" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="144" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={144} r={3} />
      <Dot x={216} y={144} r={3} />
      <Line d="M184 168 Q200 182 218 168" w={3} />
      <Line d="M160 150 L110 130 L90 90 M240 150 L290 134 L310 100" w={6} />
      <Line d="M90 90 C70 90 70 60 90 56 C110 56 110 76 94 78" w={4} />
      <Line d="M310 100 C330 100 334 70 314 66" w={4} />
      <Line d="M200 110 C200 90 180 80 190 60" w={3} />
      <Line d="M170 190 l-4 14 M230 190 l6 14" w={4} />
      <Line d="M100 160 q-6 8 0 16 M300 170 q6 8 0 16" w={3} dash="2 4" />
    </Drawing>
  );
}

function SquallWraith() {
  return (
    <Drawing label="Drawing of a whirlwind of rain with a woman's screaming face riding a storm front">
      <Shape d="M20 70 q16 -30 40 -18 q20 -34 56 -10 q36 -20 54 14 q30 -6 40 20 Z" w={5} />
      <Shape d="M220 56 q16 -30 40 -18 q20 -34 56 -10 q36 -20 54 14 q30 -6 40 20 Z" w={5} />
      <Line d="M50 90 l-10 28 M90 90 l-10 28 M130 94 l-10 28 M250 90 l-10 28 M290 90 l-10 28 M330 94 l-10 28" w={3} />
      <path d="M200 60 C260 70 270 100 220 120 C170 140 180 160 230 170 C260 176 250 200 210 210 C180 218 190 230 220 232" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M200 90 C150 100 160 130 200 140 C240 150 230 170 200 176" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 6" />
      <Shape d="M166 130 C158 84 234 84 226 130 C230 160 162 160 166 130 Z" />
      <Line d="M162 120 C140 140 130 170 140 190 M230 120 C256 140 266 170 256 190" w={5} />
      <Dot x={184} y={112} r={4} />
      <Dot x={208} y={112} r={4} />
      <Shape d="M186 130 Q197 160 208 130 Z" w={3} />
      <Line d="M30 190 q15 -10 30 0 t30 0 M290 200 q15 -10 30 0 t30 0" w={3} />
    </Drawing>
  );
}

function CabinBoyGhost() {
  return (
    <Drawing label="Drawing of the ghost of a young cabin boy trailing a new crew and getting into trouble, a bucket tipped over">
      <path d="M150 90 C146 40 230 40 226 90 L232 190 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -26 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Line d="M164 56 q24 -22 48 0" w={4} />
      <Dot x={176} y={80} r={4} />
      <Dot x={202} y={80} r={4} />
      <Line d="M180 98 Q190 108 200 98" w={3} />
      <Line d="M154 120 L118 100 M226 124 L260 150" w={5} dash="6 5" />
      <Shape d="M260 150 H306 L300 190 H266 Z" w={4} />
      <Line d="M264 150 V140 H302 V150" w={3} />
      <Line d="M306 170 q20 6 30 24 M300 190 q10 20 4 34" w={4} />
      <Line d="M326 180 q10 -4 16 4" w={3} dash="2 4" />
      <Line d="M290 110 l24 -10 M300 124 l30 -2" w={3} dash="3 4" />
      <Shape d="M40 150 H100 L90 200 H50 Z" w={3} />
      <Line d="M60 150 V130 H80 V150" w={3} />
    </Drawing>
  );
}

function LanternKeeperGhost() {
  return (
    <Drawing label="Drawing of the ghost of an old lighthouse keeper steering ships onto reefs with a false light">
      <Shape d="M290 224 L304 80 H356 L370 224 Z" w={4} />
      <Shape d="M298 80 H362 L356 58 H304 Z" w={4} />
      <Shape d="M310 58 H350 V30 H310 Z" w={3} />
      <Line d="M300 120 H366 M296 170 H370" w={3} />
      <Line d="M330 30 V12 M318 12 H342" w={4} />
      <Line d="M300 40 l-60 -10 M360 40 l40 -10" w={3} dash="6 6" />
      <path d="M120 86 C116 40 196 40 192 86 L198 190 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -24 0 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Shape d="M110 54 C130 20 180 20 200 54 Z" w={4} />
      <Dot x={142} y={78} r={4} />
      <Dot x={170} y={78} r={4} />
      <Line d="M142 100 q14 8 30 0" w={3} />
      <Line d="M196 120 L232 100" w={5} dash="6 5" />
      <Shape d="M226 82 H252 V112 H226 Z" w={4} />
      <Line d="M232 82 V72 H246 V82" w={3} />
      <Line d="M10 224 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Shape d="M60 200 L80 190 L96 200 L80 208 Z" w={3} />
    </Drawing>
  );
}

function SpectralLeviathanCaptain() {
  return (
    <Drawing label="Drawing of a ghostly captain in barnacle-covered robes riding the back of a drowned whale-ship">
      <Shape d="M20 150 C20 100 120 80 220 90 C320 100 380 140 370 190 C300 224 120 224 60 190 C30 180 20 170 20 150 Z" />
      <Line d="M60 170 L160 150 L260 154 M60 196 L300 190" w={3} />
      <Shape d="M20 150 L-4 120 L8 160 L-8 186 L26 176 Z" w={4} />
      <circle cx="320" cy="136" r="7" fill="currentColor" />
      <Line d="M150 120 l-10 -30 M190 110 l-4 -30 M230 112 l8 -26" w={5} />
      <Shape d="M168 50 C164 12 232 12 228 50 C232 74 164 74 168 50 Z" w={5} />
      <Shape d="M150 22 L200 -10 L250 22 Q200 36 150 22 Z" w={4} />
      <Dot x={184} y={46} r={3} />
      <Dot x={208} y={46} r={3} />
      <path d="M146 76 H254 L276 118 H124 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <circle cx="160" cy="100" r="5" fill="none" {...ink} strokeWidth={2} />
      <circle cx="200" cy="96" r="4" fill="none" {...ink} strokeWidth={2} />
      <circle cx="240" cy="102" r="5" fill="none" {...ink} strokeWidth={2} />
    </Drawing>
  );
}

function GhostTide() {
  return (
    <Drawing label="Drawing of a wave of pale grasping hands rising from calm water to pull a sailor under">
      <Line d="M0 150 H400" w={3} />
      <Shape d="M60 150 L90 130 H170 L150 150 Z" w={4} />
      <Line d="M110 130 V100 M110 104 L136 114 L110 124" w={3} />
      <Shape d="M110 70 C106 40 150 40 146 70 Z" w={3} />
      <Line d="M118 78 V96 M138 78 V96" w={5} />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 30 + i * 34;
        const h = 36 + ((i * 17) % 30);
        return (
          <g key={i} transform={`translate(${x} ${200})`}>
            <Line d={`M0 0 V${-h}`} w={5} />
            <Line d={`M0 ${-h} l-8 -12 M0 ${-h} l-3 -14 M0 ${-h} l3 -14 M0 ${-h} l8 -12`} w={3} />
          </g>
        );
      })}
      <Line d="M0 200 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M0 224 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
    </Drawing>
  );
}

export const ageOfSailArt: Record<string, () => ReactNode> = {
  "figurehead-guardian": FigureheadGuardian,
  "knot-snake": KnotSnake,
  "rigging-marionette": RiggingMarionette,
  "cursed-man-o-war": CursedManOWar,
  "iron-maiden-cannon": IronMaidenCannon,
  "gale-gargoyle": GaleGargoyle,
  "mast-puppet": MastPuppet,
  "parrot-lookout": ParrotLookout,
  "pirate-crab": PirateCrab,
  "reef-shark": ReefShark,
  "hammerhead-terror": HammerheadTerror,
  "kraken-spawn": KrakenSpawn,
  "drowned-pack": DrownedPack,
  "albatross-omen": AlbatrossOmen,
  "great-white-terror": GreatWhiteTerror,
  "deckhand-scallywag": DeckhandScallywag,
  "press-ganger": PressGanger,
  "cutlass-corsair": CutlassCorsair,
  "navy-lieutenant": NavyLieutenant,
  "pirate-captain": PirateCaptain,
  "royal-marine-sergeant": RoyalMarineSergeant,
  "pirate-king": PirateKing,
  "ships-surgeon": ShipsSurgeon,
  "ironclad-quartermaster": IroncladQuartermaster,
  "barnacle-biter": BarnacleBiter,
  "sea-serpent": SeaSerpent,
  "maelstrom-leviathan": MaelstromLeviathan,
  "catacomb-crawler": CatacombCrawler,
  "bilge-sprite": BilgeSprite,
  "squall-wraith": SquallWraith,
  "cabin-boy-ghost": CabinBoyGhost,
  "lantern-keeper-ghost": LanternKeeperGhost,
  "spectral-leviathan-captain": SpectralLeviathanCaptain,
  "ghost-tide": GhostTide,
};
