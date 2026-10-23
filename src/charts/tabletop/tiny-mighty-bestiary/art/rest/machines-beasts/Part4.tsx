import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Steam } from "./Part1";
import { Hunter } from "./Part3";

const card = CARD_COLOR;

export function CyberHound() {
  return (
    <Drawing label="Drawing of a guard dog with a steel jaw and a red-glowing eye">
      <Hunter />
      <Shape d="M300 132 Q320 150 336 134 L330 130 Z" w={4} />
      <circle cx="296" cy="118" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={296} y={118} r={4} />
      <Line d="M296 110 l0 -10 M300 98 h12" w={3} />
      <Line d="M140 120 h20 M140 130 h14" w={2} />
      <Solid d="M312 138 l3 6 l3 -6 Z M324 138 l3 6 l3 -6 Z" />
      <Ground y={224} />
    </Drawing>
  );
}

export function ChromePantherPrime() {
  return (
    <Drawing label="Drawing of a sleek chrome luxury predator with a stealth coat shimmering at its edges">
      <Hunter />
      <Line d="M110 126 H250 M120 146 H240" w={2} dash="6 6" />
      <circle cx="296" cy="118" r="5" fill={card} />
      <Line d="M52 160 C36 190 66 216 100 214" w={5} dash="2 6" />
      <Line d="M270 100 l8 -14 M240 108 l4 -16" w={3} />
      <Line d="M20 140 H70 M10 160 H60" w={3} dash="4 6" />
      <Ground y={224} />
    </Drawing>
  );
}

export function BoilerRhino() {
  return (
    <Drawing label="Drawing of a rhino with a coal-burning steam engine on its back and iron plates on its hide">
      <Shape d="M60 190 C40 130 100 100 180 100 C260 100 320 130 310 190 Z" />
      <Shape d="M100 100 H220 V70 H100 Z" w={4} />
      <Shape d="M120 70 L128 36 H152 L160 70 Z" w={4} />
      <Steam x={140} y={36} />
      <Line d="M110 120 V180 M150 118 V184 M190 118 V184 M230 120 V180" w={3} />
      <Shape d="M290 150 C290 100 340 100 370 130 L386 160 L350 164 C320 180 290 170 290 150 Z" />
      <Shape d="M360 130 L396 100 L376 142 Z" w={4} />
      <Shape d="M340 120 L346 96 L356 124 Z" w={3} />
      <Dot x={330} y={124} r={4} />
      <Line d="M80 190 V226 M130 192 V226 M250 192 V226 M290 188 V226" w={13} />
    </Drawing>
  );
}

export function SteamDrake() {
  return (
    <Drawing label="Drawing of a brass-plated dragon-engine venting scalding steam in a clockwork cellar">
      <Shape d="M80 200 C70 140 130 100 200 106 C260 110 290 140 280 200 Z" />
      <Line d="M110 120 V200 M150 106 V200 M190 104 V200 M230 108 V200 M264 128 V200" w={3} />
      <Shape d="M260 130 C254 90 290 60 330 70 L384 90 L334 110 C316 130 280 144 260 130 Z" />
      <Dot x={326} y={84} r={4} />
      <Shape d="M300 70 L292 40 L322 62 Z" w={4} />
      <Steam x={370} y={86} />
      <Shape d="M120 108 C100 60 60 40 30 50 C50 70 50 90 60 110 Z" w={4} />
      <circle cx="170" cy="150" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M170 140 V150 L178 154" w={2} />
      <Line d="M90 200 V226 M240 200 V226 M80 160 C40 170 20 150 30 130" w={9} />
    </Drawing>
  );
}

export function PrismMoth() {
  return (
    <Drawing label="Drawing of a palm-sized moth with wings of stained starlight scattering the glow of lamps">
      <Shape d="M200 110 C150 40 60 40 40 90 C40 130 100 150 196 130 Z" />
      <Shape d="M200 110 C250 40 340 40 360 90 C360 130 300 150 204 130 Z" />
      <Shape d="M196 130 C160 170 100 190 80 180 C90 150 140 130 196 130 Z" w={4} />
      <Shape d="M204 130 C240 170 300 190 320 180 C310 150 260 130 204 130 Z" w={4} />
      <Line d="M120 70 L100 100 L130 120 M280 70 L300 100 L270 120 M160 70 L160 110 M240 70 L240 110" w={3} />
      <Shape d="M188 100 C188 76 212 76 212 100 L216 150 C216 164 184 164 184 150 Z" />
      <Line d="M192 80 C180 60 164 56 154 60 M208 80 C220 60 236 56 246 60" w={3} />
      <Line d="M60 180 v10 M55 185 h10 M340 190 v10 M335 195 h10 M200 30 v10 M195 35 h10" w={3} />
    </Drawing>
  );
}

export function BouncingGrubPup() {
  return (
    <Drawing label="Drawing of a round little bug-dog bouncing in circles and nipping at an ankle">
      <Line d="M60 214 q20 -80 60 -80 M280 214 q-20 -60 -50 -60" w={3} dash="4 6" />
      <Shape d="M130 190 C100 190 100 100 190 100 C270 100 280 190 250 190 Z" />
      <Line d="M150 112 V188 M190 100 V190 M230 112 V188" w={3} />
      <Shape d="M240 120 C240 90 290 90 292 120 C294 144 244 148 240 120 Z" />
      <Dot x={262} y={114} r={4} />
      <Line d="M278 100 L290 76 M254 98 L250 74" w={3} />
      <Solid d="M262 132 l3 6 l3 -6 Z M274 132 l3 6 l3 -6 Z" />
      <Line d="M134 190 l-10 18 M250 190 l10 18" w={4} />
      <Shape d="M300 190 H340 V226 H300 Z" w={4} />
      <Line d="M276 170 L308 196" w={3} />
      <Ground y={228} x1={20} x2={290} />
    </Drawing>
  );
}

export function AstralStag() {
  return (
    <Drawing label="Drawing of a towering stag with antlers of woven constellations walking along a ley-line">
      <Line d="M20 214 L380 214" w={3} dash="6 8" />
      <Shape d="M110 170 C100 126 160 108 220 112 C268 116 290 140 280 170 L270 180 H120 Z" />
      <Shape d="M262 124 C256 90 280 66 312 70 L350 96 L322 118 C308 140 270 146 262 124 Z" />
      <Dot x={310} y={90} r={3} />
      <Line d="M282 70 L276 30 L250 6 M276 30 L300 8 M282 62 L252 44 M306 70 L330 34 L360 24 M330 34 L344 10 M318 56 L350 52" w={4} />
      {[[250, 6], [300, 8], [252, 44], [360, 24], [344, 10], [350, 52], [276, 30], [330, 34]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" />
      ))}
      <Line d="M130 180 V222 M160 182 V222 M236 182 V222 M262 180 V222" w={6} />
      <Line d="M112 150 C92 150 84 130 92 116" w={5} />
    </Drawing>
  );
}
