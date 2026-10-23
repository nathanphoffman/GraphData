import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Steam } from "./Part1";

const card = CARD_COLOR;

export function AlleySlime() {
  return (
    <Drawing label="Drawing of a glowing puddle of runoff that has climbed a wall and swallowed a shoe">
      <Shape d="M240 20 H390 V224 H240 Z" w={4} />
      <Line d="M240 60 H390 M240 120 H390 M240 180 H390" w={2} dash="6 6" />
      <Shape d="M30 224 C30 190 120 170 190 180 C230 130 260 130 270 100 C280 60 330 60 330 100 C330 130 300 150 300 180 C320 190 380 200 380 224 Z" />
      <circle cx="310" cy="96" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={310} y={98} r={3} />
      <circle cx="100" cy="200" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="210" cy="206" r="8" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M130 196 C130 176 180 176 184 190 V204 H130 Z" w={4} />
      <Line d="M150 190 H170" w={2} />
      <Line d="M60 214 q10 -8 20 0 M320 216 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function BoilerNewt() {
  return (
    <Drawing label="Drawing of a salamander in a warm pipe hissing scalding steam when cornered">
      <Shape d="M0 120 H400 V170 H0 Z" w={5} />
      <Line d="M60 120 V170 M340 120 V170" w={4} />
      <Shape d="M140 120 C130 70 210 60 250 90 C290 80 330 100 330 120 Z" />
      <Dot x={190} y={96} r={4} />
      <Dot x={226} y={92} r={4} />
      <Line d="M180 108 Q208 120 236 108" w={3} />
      <Line d="M150 120 L136 100 M300 118 L318 100" w={6} />
      <Line d="M330 112 C360 100 370 80 392 84" w={7} />
      <Line d="M180 120 l-2 -8 M200 120 l-2 -8 M222 120 l-2 -8 M244 120 l-2 -8" w={3} />
      <Steam x={180} y={64} />
      <Steam x={250} y={60} />
      <Line d="M150 170 v20 M250 170 v20" w={6} />
    </Drawing>
  );
}

export function TunnelSpawn() {
  return (
    <Drawing label="Drawing of toothy larval horrors crawling in a swarm out of a hull breach">
      <Shape d="M0 0 H140 L110 80 L150 110 L100 150 L140 224 H0 Z" w={5} />
      <Line d="M20 40 H100 M20 100 H70 M20 160 H90" w={2} />
      {/* Repeat the shape at each listed position, turned a little differently each time. */}
      {[[190, 100], [250, 140], [310, 90], [220, 190], [300, 190], [350, 150]].map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y}) rotate(${(index * 23) % 40 - 20})`}>
          <Shape d="M-30 0 C-30 -16 20 -16 24 0 C20 14 -30 14 -30 0 Z" w={4} />
          <Shape d="M18 -6 C30 -10 38 -4 38 0 C38 6 30 10 18 6 Z" w={3} />
          <Solid d="M22 -3 l3 4 l3 -4 Z M22 3 l3 -4 l3 4 Z" />
          <Dot x={4} y={-3} r={2} />
          <Line d="M-18 -6 V6 M-8 -7 V7 M2 -6 V6" w={2} />
        </g>
      ))}
    </Drawing>
  );
}

export function WarpBehemoth() {
  return (
    <Drawing label="Drawing of a twisted tower of flesh and warp-light tearing holes in reality as it moves">
      <path d="M140 224 C100 160 180 150 140 100 C110 60 190 60 170 20 C230 20 250 60 230 100 C290 130 240 170 280 224 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="190" cy="70" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={190} y={72} r={6} />
      <circle cx="226" cy="120" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={226} y={122} r={4} />
      <circle cx="170" cy="150" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={152} r={4} />
      <Shape d="M180 186 Q210 214 240 186 Z" w={4} />
      <Line d="M150 110 L90 90 L70 50 M250 130 L310 110 L330 70" w={10} />
      <Line d="M40 130 L80 140 L60 170 L100 176 M360 150 L320 160 L340 190 L300 194" w={3} />
      <Line d="M30 60 l12 12 M360 40 l-10 14 M20 200 l16 -6" w={3} dash="2 4" />
      <ellipse cx="60" cy="200" rx="18" ry="6" fill="none" {...ink} strokeWidth={3} />
      <ellipse cx="340" cy="210" rx="18" ry="6" fill="none" {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function BiolabEscapee() {
  return (
    <Drawing label="Drawing of a failed corporate experiment with far too many limbs on a body meant to have two">
      <Shape d="M166 76 C160 34 240 34 234 76 C240 100 160 100 166 76 Z" />
      <Dot x={184} y={70} r={4} />
      <Dot x={216} y={70} r={4} />
      <Dot x={200} y={56} r={3} />
      <Line d="M180 88 Q200 98 220 88" w={3} />
      <Shape d="M150 106 H250 L258 190 H142 Z" />
      <Line d="M156 112 L110 96 L90 60 M158 126 L100 134 L70 120 M160 142 L112 170 L84 160 M244 112 L290 96 L310 60 M242 126 L300 134 L330 120 M240 142 L288 170 L316 160" w={6} />
      <Line d="M166 190 L150 224 M200 190 V226 M234 190 L250 224 M180 190 L170 226 M220 190 L230 226" w={6} />
      <Shape d="M60 150 h14 v10 h-14 Z M326 150 h14 v10 h-14 Z" w={3} />
      <Line d="M170 140 q30 14 60 0" w={3} />
    </Drawing>
  );
}

export function OilSlickCrawler() {
  return (
    <Drawing label="Drawing of a pool of living oil sliding under a door and about to ignite">
      <Shape d="M240 20 H320 V224 H240 Z" w={5} />
      <Line d="M240 150 H320" w={3} />
      <Shape d="M20 224 C20 190 100 180 170 190 C220 200 250 196 290 190 C340 184 380 200 380 224 Z" />
      <circle cx="110" cy="206" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="160" cy="210" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={110} y={206} r={3} />
      <Dot x={160} y={210} r={2} />
      <Line d="M170 190 C200 170 230 170 250 190" w={9} />
      <Line d="M270 190 C290 150 300 140 330 150 C350 156 340 180 334 190" w={9} />
      <Solid d="M340 130 C330 110 346 100 350 84 C360 100 370 112 358 130 C352 136 344 136 340 130 Z" />
      <Line d="M20 214 h14 M380 218 h-10" w={3} dash="3 3" />
    </Drawing>
  );
}

export function FurnaceMaw() {
  return (
    <Drawing label="Drawing of a fat coal-eating worm in a factory furnace spitting cinders at an intruder">
      <Shape d="M20 20 H380 V224 H20 Z" w={5} />
      <Shape d="M50 60 H350 V224 H50 Z" w={4} />
      <Shape d="M90 224 C90 160 130 120 200 120 C270 120 310 160 310 224 Z" />
      <Line d="M110 190 q90 14 180 0 M104 160 q96 14 192 0" w={3} />
      <ellipse cx="200" cy="130" rx="46" ry="22" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="130" rx="24" ry="10" fill="currentColor" />
      <Solid d="M162 124 l6 8 l6 -8 Z M182 118 l6 8 l6 -8 Z M206 118 l6 8 l6 -8 Z M226 124 l6 8 l6 -8 Z" />
      <Line d="M120 90 l-6 -18 M160 80 l-2 -20 M240 80 l4 -22 M290 90 l10 -16 M80 110 l-14 -6" w={3} dash="2 4" />
      <Line d="M40 224 H360" w={3} />
      <Shape d="M340 190 l16 -24 l16 24 Z" w={3} />
    </Drawing>
  );
}
