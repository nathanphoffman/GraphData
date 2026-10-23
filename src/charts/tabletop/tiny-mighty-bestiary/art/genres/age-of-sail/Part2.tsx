import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Waves } from "./Part1";

const card = CARD_COLOR;

export function MastPuppet() {
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

export function ParrotLookout() {
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

export function PirateCrab() {
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

export function ReefShark() {
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

export function HammerheadTerror() {
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

export function KrakenSpawn() {
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

export function DrownedPack() {
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
