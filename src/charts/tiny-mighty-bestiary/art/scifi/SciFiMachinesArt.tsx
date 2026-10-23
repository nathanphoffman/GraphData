import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../core/artStyle";

const card = CARD_COLOR;

function BattleClank() {
  return (
    <Drawing label="Drawing of a spindly rattling combat robot with a loose head">
      <Shape d="M176 40 H224 V76 H176 Z" />
      <Line d="M186 58 H214" w={5} />
      <Line d="M200 40 V24" w={3} />
      <Line d="M200 76 V90" w={5} />
      <Shape d="M166 90 H234 V150 H166 Z" />
      <Line d="M166 108 H234 M166 128 H234" w={3} />
      <Line d="M166 100 L120 130 L100 110 M234 100 L280 130 L300 150" w={5} />
      <Line d="M184 150 L170 190 L150 224 M216 150 L230 190 L252 224" w={5} />
      <Line d="M130 40 l10 8 M120 60 l14 2 M270 40 l-10 8 M282 62 l-14 2" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function BeepBot() {
  return (
    <Drawing label="Drawing of a domed astro-bot with a screwdriver arm and a projector beam">
      <Shape d="M130 130 C130 50 270 50 270 130 Z" />
      <Shape d="M120 130 H280 V190 H120 Z" />
      <circle cx="200" cy="92" r="16" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={92} r={5} />
      <Line d="M160 156 H200 M160 170 H190" w={3} />
      <Shape d="M280 150 H320 V164 H280 Z" w={4} />
      <Line d="M320 157 H350 M350 150 V164" w={4} />
      <Line d="M200 76 V60 M194 60 H206" w={3} />
      <Line d="M120 150 L80 130 L60 90 L120 100" w={4} dash="4 4" />
      <Line d="M140 190 V210 M260 190 V210" w={5} />
      <circle cx="140" cy="216" r="10" fill={card} {...ink} strokeWidth={4} />
      <circle cx="260" cy="216" r="10" fill={card} {...ink} strokeWidth={4} />
      <Line d="M300 60 q8 -8 16 0 M326 44 q8 -8 16 0" w={3} />
    </Drawing>
  );
}

function ChromeRevenant() {
  return (
    <Drawing label="Drawing of a skeletal metal warrior with green burning eyes rising from sand">
      <Shape d="M176 70 C170 30 230 30 224 70 L220 96 H180 Z" />
      <circle cx="190" cy="64" r="7" fill="currentColor" />
      <circle cx="212" cy="64" r="7" fill="currentColor" />
      <Line d="M186 100 V108 M200 100 V108 M214 100 V108" w={3} />
      <Line d="M200 108 V176" w={6} />
      <Line d="M166 122 Q200 112 234 122 M168 142 Q200 132 232 142 M172 162 Q200 152 228 162" w={5} />
      <Line d="M166 122 L130 150 L122 190 M234 122 L276 140 L300 110" w={5} />
      <Solid d="M296 114 L330 70 L318 118 Z" />
      <Line d="M30 224 q30 -30 60 -10 q40 -40 90 -10 q40 -20 70 -6 q40 -30 100 10" w={4} />
      <Line d="M160 180 L150 224 M240 180 L250 224" w={5} />
      <Ground y={228} />
    </Drawing>
  );
}

function IronColossus() {
  return (
    <Drawing label="Drawing of a city-block-tall god-machine walker carrying a cathedral on its back, crushing a tiny tank">
      <Shape d="M160 60 H240 V100 H160 Z" />
      <Line d="M176 80 H224" w={6} />
      <Shape d="M110 100 H290 V170 H110 Z" />
      <Shape d="M130 100 V60 L150 30 L170 60 V100 Z M230 100 V60 L250 30 L270 60 V100 Z" w={4} />
      <Line d="M150 30 V14 M250 30 V14 M144 20 H156 M244 20 H256" w={3} />
      <Shape d="M120 170 H190 V224 H120 Z M210 170 H280 V224 H210 Z" />
      <Line d="M110 120 L70 160 L70 200 M290 120 L330 160 L330 200" w={12} />
      <Shape d="M330 214 H376 L370 224 H336 Z" w={3} />
      <Line d="M350 214 V206 H368" w={3} />
      <Line d="M140 130 H260 M140 150 H260" w={3} />
    </Drawing>
  );
}

function BuzzDrone() {
  return (
    <Drawing label="Drawing of a fist-sized flying camera drone with a taser prong and a red light">
      <Line d="M110 90 H170 M230 90 H290" w={4} />
      <ellipse cx="140" cy="84" rx="38" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="260" cy="84" rx="38" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M160 96 H240 V150 H160 Z" />
      <circle cx="200" cy="124" r="20" fill={card} {...ink} strokeWidth={4} />
      <circle cx="200" cy="124" r="8" fill="currentColor" />
      <Line d="M180 150 L170 176 M220 150 L230 176" w={4} />
      <Line d="M200 150 V190 M194 190 H206" w={4} />
      <Line d="M190 196 l-8 8 M210 196 l8 8 M200 196 v12" w={3} />
      <circle cx="200" cy="100" r="5" fill="currentColor" />
      <Line d="M184 98 l-14 -8 M216 98 l14 -8 M200 92 v-14" w={3} dash="2 4" />
    </Drawing>
  );
}

function WireGhost() {
  return (
    <Drawing label="Drawing of a face made of wires living in a screen with cables running out of it">
      <Shape d="M110 60 H290 V180 H110 Z" />
      <Shape d="M124 74 H276 V166 H124 Z" w={3} />
      <circle cx="170" cy="112" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="230" cy="112" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={170} y={112} r={5} />
      <Dot x={230} y={112} r={5} />
      <Line d="M160 146 H240 M170 146 v-8 M185 146 v-8 M200 146 v-8 M215 146 v-8 M230 146 v-8" w={3} />
      <Line d="M170 180 V210 H110 M230 180 V224 H300 M200 180 C200 200 160 200 160 224" w={4} />
      <Line d="M290 100 C330 90 330 60 360 60 M110 100 C70 90 70 60 40 60" w={3} />
      <Line d="M250 46 l-10 -14 l12 4 M140 46 l10 -14" w={3} />
      <Shape d="M300 190 H352 V220 H300 Z" w={3} />
      <Line d="M310 200 h30" w={2} />
    </Drawing>
  );
}

function RiotWalker() {
  return (
    <Drawing label="Drawing of a two-legged police robot with a loudspeaker and a riot shield">
      <Shape d="M166 40 H234 V84 H166 Z" />
      <Line d="M180 62 H220" w={6} />
      <Line d="M180 40 V30 H220 V40" w={3} />
      <Shape d="M150 92 H250 V160 H150 Z" />
      <Line d="M200 92 V160" w={3} />
      <Shape d="M240 100 L286 100 L292 150 L248 150 Z" w={3} />
      <Shape d="M66 80 H134 V176 C134 196 100 206 100 206 C100 206 66 196 66 176 Z" />
      <Line d="M82 100 H118 M82 120 H118" w={3} />
      <Line d="M250 112 L300 110" w={7} />
      <Shape d="M296 100 H340 V118 H296 Z" w={4} />
      <Shape d="M156 160 H196 V224 H156 Z M204 160 H244 V224 H204 Z" w={4} />
      <Line d="M290 64 q10 -8 20 0 M296 40 q16 -12 32 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function NoodleCartBot() {
  return (
    <Drawing label="Drawing of a rolling noodle cart with a mechanical arm holding a steaming bowl, under a neon sign">
      <Shape d="M90 130 H300 V200 H90 Z" />
      <Shape d="M80 110 H310 L296 130 H94 Z" w={4} />
      <Line d="M110 110 V80 H280 V110" w={5} />
      <Shape d="M170 40 H250 V70 H170 Z" w={4} />
      <Line d="M180 56 H240" w={3} />
      <circle cx="130" cy="212" r="16" fill={card} {...ink} strokeWidth={4} />
      <circle cx="260" cy="212" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M300 150 L340 130 L350 100" w={6} />
      <Shape d="M334 84 H370 L364 104 H340 Z" w={4} />
      <Line d="M342 78 q-4 -8 4 -12 M356 78 q-4 -8 4 -12" w={3} dash="2 4" />
      <circle cx="190" cy="160" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M176 156 q14 -10 28 0 M176 166 q14 -10 28 0" w={2} />
      <Dot x={240} y={160} r={5} />
      <Line d="M160 100 V110 M230 100 V110" w={3} />
    </Drawing>
  );
}

function ClankWalker() {
  return (
    <Drawing label="Drawing of a two-legged armored scout walker with a chin cannon and a cockpit window">
      <Shape d="M130 60 H280 V130 H130 Z" />
      <Shape d="M150 76 H240 V112 H150 Z" w={4} />
      <Line d="M170 76 V112" w={2} />
      <Shape d="M280 90 H350 V106 H280 Z" w={4} />
      <Line d="M350 98 H376" w={4} />
      <Line d="M160 130 L130 180 L100 190 M250 130 L270 180 L300 190" w={9} />
      <Shape d="M80 190 H130 V210 H80 Z M280 190 H330 V210 H280 Z" w={4} />
      <Dot x={150} y={70} r={3} />
      <Dot x={270} y={120} r={3} />
      <Line d="M200 60 V40 H220" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

function RustedSentinel() {
  return (
    <Drawing label="Drawing of a rust-streaked three-legged military robot guarding a bunker door">
      <Shape d="M260 80 H380 V224 H260 Z" w={4} />
      <Shape d="M290 120 H350 V224 H290 Z" w={3} />
      <Line d="M296 150 H344" w={3} />
      <Shape d="M120 50 C120 20 220 20 220 50 V84 H120 Z" />
      <circle cx="170" cy="56" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={170} y={56} r={5} />
      <Shape d="M110 84 H230 V120 H110 Z" w={4} />
      <Line d="M170 120 L120 224 M170 120 L170 224 M170 120 L230 224" w={8} />
      <Line d="M220 100 H260" w={7} />
      <Line d="M130 40 l-8 -10 M210 40 l8 -10" w={3} />
      <Line d="M130 90 v14 M156 92 v18 M186 90 v12 M214 92 v16" w={2} dash="2 3" />
    </Drawing>
  );
}

function DataCourierDrone() {
  return (
    <Drawing label="Drawing of a flying delivery drone carrying a locked package and a clock">
      <Line d="M80 80 H320" w={4} />
      <ellipse cx="110" cy="74" rx="34" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="290" cy="74" rx="34" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M150 86 H250 V120 H150 Z" />
      <Dot x={175} y={103} r={5} />
      <Dot x={225} y={103} r={5} />
      <Line d="M180 114 H220" w={3} />
      <Line d="M170 120 V150 M230 120 V150" w={4} />
      <Shape d="M150 150 H250 V210 H150 Z" />
      <Line d="M150 180 H250 M200 150 V210" w={3} />
      <Shape d="M188 170 H212 V190 H188 Z" w={3} />
      <Line d="M194 170 V162 H206 V170" w={3} />
      <circle cx="326" cy="130" r="26" fill={card} {...ink} strokeWidth={4} />
      <Line d="M326 130 V114 M326 130 L338 138" w={3} />
      <Line d="M60 130 H110 M50 150 H100" w={3} dash="4 4" />
    </Drawing>
  );
}

function DreadnoughtCore() {
  return (
    <Drawing label="Drawing of a glowing battle-mind core inside a gutted corridor of a ship, with cables like roots">
      <Line d="M20 40 H380 M20 200 H380" w={6} />
      <Line d="M60 40 V200 M340 40 V200" w={4} />
      <Line d="M80 40 L110 76 M320 40 L290 76 M80 200 L110 164 M320 200 L290 164" w={4} />
      <circle cx="200" cy="120" r="48" fill={card} {...ink} />
      <circle cx="200" cy="120" r="32" fill="none" {...ink} strokeWidth={4} />
      <circle cx="200" cy="120" r="14" fill="currentColor" />
      <Line d="M152 120 C110 110 100 80 70 70 M248 120 C290 110 300 80 330 70 M170 160 C150 190 120 190 100 210 M230 160 C250 190 280 190 300 210" w={5} />
      <Line d="M200 72 V40 M180 80 L160 50 M220 80 L240 50" w={4} />
      <Line d="M30 100 l10 6 M360 140 l-10 6 M40 170 l12 -4" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

function CargoLoader() {
  return (
    <Drawing label="Drawing of a yellow forklift droid hauling a stack of crates">
      <Shape d="M150 100 H260 V190 H150 Z" />
      <Shape d="M170 60 H240 V100 H170 Z" w={4} />
      <circle cx="205" cy="80" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={205} y={80} r={3} />
      <Line d="M170 60 V40 H240 V60" w={4} />
      <circle cx="180" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="240" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M150 60 V200" w={6} />
      <Line d="M110 200 H150 M110 60 V200" w={5} />
      <Shape d="M60 120 H110 V160 H60 Z M60 160 H110 V200 H60 Z M70 80 H110 V120 H70 Z" w={4} />
      <Line d="M72 140 H98 M72 180 H98" w={2} />
      <Line d="M280 180 H330 M290 160 H340" w={3} dash="4 4" />
      <Ground y={228} />
    </Drawing>
  );
}

function SiegeWalker() {
  return (
    <Drawing label="Drawing of a four-legged armored walker the size of a building over a line of tiny defenders">
      <Shape d="M90 60 H310 V130 H90 Z" />
      <Shape d="M130 40 H270 V60 H130 Z" w={4} />
      <Line d="M110 80 H290 M110 100 H290" w={3} />
      <Shape d="M300 84 H380 V104 H300 Z" w={4} />
      <Line d="M110 130 L70 178 L44 224 M150 130 L140 190 L130 224 M250 130 L260 190 L270 224 M290 130 L330 178 L356 224" w={12} />
      <Shape d="M30 224 h30 l-4 -6 h-22 Z M116 224 h30 l-4 -6 h-22 Z M256 224 h30 l-4 -6 h-22 Z M342 224 h30 l-4 -6 h-22 Z" w={3} />
      <Line d="M160 212 v-10 M180 212 v-10 M200 212 v-10 M220 212 v-10" w={3} />
      <Dot x={130} y={70} r={3} />
    </Drawing>
  );
}

function ScrapperDroneHive() {
  return (
    <Drawing label="Drawing of a mother drone surrounded by a swarm of tiny scavenger bots">
      <Shape d="M150 90 H250 C270 90 280 120 250 140 H150 C120 120 130 90 150 90 Z" />
      <circle cx="200" cy="114" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={114} r={5} />
      <Line d="M150 90 L120 60 M250 90 L280 60 M120 60 H100 M280 60 H300" w={5} />
      {[[70, 40], [330, 40], [60, 120], [340, 120], [90, 190], [310, 190], [200, 190], [150, 50], [260, 50]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <Shape d="M-12 -6 H12 V8 H-12 Z" w={3} />
          <Line d="M-16 -10 H-6 M6 -10 H16" w={3} />
          <Dot x={0} y={1} r={2} />
        </g>
      ))}
      <Line d="M130 150 L100 180 M270 150 L300 180 M200 150 V176" w={3} dash="3 5" />
    </Drawing>
  );
}

/* Beasts */

function CaveSucker() {
  return (
    <Drawing label="Drawing of a leathery bat-winged leech chewing a power cable">
      <Shape d="M180 100 C140 70 90 50 40 60 C70 80 74 100 70 126 C110 120 150 126 180 140 Z" />
      <Shape d="M220 100 C260 70 310 50 360 60 C330 80 326 100 330 126 C290 120 250 126 220 140 Z" />
      <Shape d="M170 110 C170 80 230 80 230 110 L220 190 C220 206 180 206 180 190 Z" />
      <circle cx="200" cy="206" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M192 204 h16" w={2} />
      <Dot x={188} y={104} r={3} />
      <Dot x={212} y={104} r={3} />
      <Line d="M100 224 C140 210 160 216 196 210 M204 210 C240 216 270 208 310 224" w={7} />
      <Line d="M196 214 l-10 12 M206 214 l12 10" w={3} />
      <Solid d="M180 226 l6 -12 l6 12 Z" />
      <Line d="M190 232 l-6 -10 l10 4 Z" w={2} />
    </Drawing>
  );
}

function FrostStrider() {
  return (
    <Drawing label="Drawing of a shaggy two-legged snow lizard with a saddle, on an ice field">
      <Shape d="M130 150 C130 90 220 80 250 110 C280 130 280 170 250 180 H150 Z" />
      <Shape d="M240 100 C250 60 300 50 330 70 L370 80 L330 96 C310 116 270 120 250 110 Z" />
      <Dot x={316} y={72} r={4} />
      <Line d="M150 170 L140 224 M230 180 L240 224" w={9} />
      <Line d="M140 224 l-16 0 M240 224 l16 0" w={5} />
      <Line d="M130 140 C80 150 60 120 70 100 C90 106 96 120 110 126" w={7} />
      <Line d="M150 100 l-6 -12 M170 92 l-4 -14 M190 90 l-2 -14 M210 94 l2 -14" w={4} />
      <Shape d="M170 82 H220 V96 H170 Z" w={4} />
      <circle cx="195" cy="68" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M195 78 V82" w={3} />
      <Line d="M30 228 H370" w={3} dash="2 10" />
      <Line d="M40 40 l4 8 M70 24 l0 10 M350 30 l-4 8" w={3} />
    </Drawing>
  );
}

function SnowMauler() {
  return (
    <Drawing label="Drawing of a white-furred ice-field hunter dragging its prey by the scruff">
      <Shape d="M90 190 C60 140 120 100 200 104 C270 108 300 140 290 190 Z" />
      <Shape d="M270 130 C262 90 296 66 330 76 C360 86 364 120 344 140 C326 156 280 156 270 130 Z" />
      <Shape d="M276 90 L270 62 L296 78 Z" w={4} />
      <Dot x={326} y={100} r={4} />
      <Line d="M338 128 q8 8 16 0" w={3} />
      <Solid d="M334 134 l4 8 l4 -8 Z M346 132 l4 8 l4 -8 Z" />
      <Line d="M110 190 V224 M160 192 V224 M240 192 V224 M280 190 V224" w={9} />
      <Line d="M110 120 l6 12 M140 112 l6 12 M170 110 l6 12 M200 110 l6 12 M230 114 l6 12" w={3} />
      <Shape d="M340 200 L384 214 L346 224 Z" w={3} />
      <Line d="M360 150 L350 200" w={6} />
      <Line d="M20 228 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

function CosmicWhale() {
  return (
    <Drawing label="Drawing of a ship-sized whale among stars with tiny cargo ships in its slipstream">
      <Shape d="M60 120 C60 60 220 40 310 90 C350 110 360 150 334 160 C290 190 190 200 130 180 C90 168 60 150 60 120 Z" />
      <Shape d="M60 120 L24 84 L36 130 L18 150 L64 138 Z" />
      <Dot x={300} y={110} r={5} />
      <Line d="M150 170 C190 200 260 200 300 168 M170 186 H280" w={3} />
      <Line d="M180 100 Q220 70 260 90" w={3} />
      <Line d="M110 100 l6 6 M140 90 l6 6 M170 80 l6 6 M110 130 l6 6" w={3} />
      <Line d="M340 70 q10 -10 20 0 M350 40 q10 -10 20 0" w={3} dash="2 5" />
      <Shape d="M14 200 L40 196 L52 200 L40 206 Z" w={3} />
      <Shape d="M60 214 L84 210 L94 214 L84 220 Z" w={3} />
      <Line d="M110 206 H160 M120 218 H180" w={2} dash="4 5" />
      <Line d="M30 40 v10 M25 45 h10 M120 30 v8 M116 34 h8 M380 120 v8 M376 124 h8 M200 20 v10 M195 25 h10" w={3} />
    </Drawing>
  );
}

function HiveStalker() {
  return (
    <Drawing label="Drawing of a sleek black insectoid hunter with an eyeless elongated head and an inner jaw">
      <Shape d="M60 150 C70 120 140 110 200 120 C240 126 250 140 240 160 C200 176 100 176 60 150 Z" />
      <Shape d="M236 120 C250 80 300 60 360 76 C340 90 320 96 310 104 C300 110 270 130 244 150 Z" />
      <Solid d="M360 76 L378 82 L360 88 Z" />
      <Line d="M318 98 l-8 8 l-8 -2 M330 92 l-10 6" w={3} />
      <Line d="M110 146 L90 190 L70 224 M150 156 L140 200 L130 224 M210 156 L220 200 L226 224" w={5} />
      <Line d="M60 150 C20 140 10 100 30 80 C40 96 50 110 60 120" w={6} />
      <Line d="M130 120 l-10 -22 M170 116 l-4 -24 M210 124 l4 -22" w={5} />
      <Line d="M270 180 q10 14 0 26 M290 190 q8 10 0 20" w={3} dash="2 5" />
    </Drawing>
  );
}

function Swarmling() {
  return (
    <Drawing label="Drawing of a crowd of claw-limbed carapaced hunters pouring in from the dark">
      {[[90, 150, 1], [180, 130, 1.2], [270, 150, 1], [60, 210, 0.8], [140, 200, 0.9], [230, 205, 0.9], [330, 200, 0.8], [330, 120, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-30 0 C-30 -24 30 -24 30 0 C30 14 -30 14 -30 0 Z" w={5} />
          <Line d="M-30 6 L-46 26 M-16 12 L-22 32 M16 12 L22 32 M30 6 L46 26" w={5} />
          <Line d="M-30 -6 L-48 -20 l10 2 M30 -6 L48 -20 l-10 2" w={5} />
          <Dot x={-8} y={-6} r={3} />
          <Dot x={8} y={-6} r={3} />
        </g>
      ))}
      <Line d="M20 40 v8 M16 44 h8 M350 50 v8 M346 54 h8 M200 30 v6 M197 33 h6" w={3} />
    </Drawing>
  );
}

function ChitinCrusher() {
  return (
    <Drawing label="Drawing of a house-sized armored bio-monster with bone cannons and mouths on its limbs">
      <Shape d="M90 190 C70 110 140 60 210 64 C290 68 340 120 320 190 Z" />
      <Line d="M110 130 H300 M104 160 H310" w={4} />
      <Line d="M150 80 V190 M210 66 V190 M270 80 V190" w={3} />
      <Shape d="M120 70 L150 20 L170 70 Z M240 66 L270 16 L290 70 Z" w={4} />
      <Line d="M150 20 L140 4 M270 16 L282 0" w={4} />
      <circle cx="210" cy="110" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={210} y={110} r={5} />
      <Line d="M110 190 L70 224 M200 190 V224 M300 190 L340 224" w={12} />
      <ellipse cx="70" cy="226" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="200" cy="228" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="340" cy="226" rx="18" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Solid d="M56 224 l4 6 l4 -6 Z M190 228 l4 6 l4 -6 Z M330 224 l4 6 l4 -6 Z" />
    </Drawing>
  );
}

function NeonGutterCat() {
  return (
    <Drawing label="Drawing of a scruffy alley cat with glowing cyber eyes and a robotic tail knocking over a trash can">
      <Shape d="M270 120 H350 L342 224 H278 Z" />
      <Line d="M270 138 H350 M274 180 H346" w={3} />
      <Shape d="M262 110 H358 V122 H262 Z" w={4} />
      <Shape d="M150 190 C110 160 140 110 200 110 C250 110 270 150 250 190 Z" />
      <Shape d="M100 130 L92 84 L124 104 L170 104 L196 84 L200 130 C200 158 100 158 100 130 Z" />
      <circle cx="132" cy="118" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="166" cy="118" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={132} y={118} r={3} />
      <Dot x={166} y={118} r={3} />
      <Line d="M150 130 v6 M96 126 l-24 -4 M96 134 l-24 6 M204 126 l22 -4" w={3} />
      <Line d="M250 160 L290 150 M290 150 l10 -22 M300 128 l14 -10" w={5} />
      <Shape d="M278 148 h12 v8 h-12 Z M296 120 h12 v8 h-12 Z" w={3} />
      <Line d="M130 190 V220 M180 190 V220 M230 190 V220" w={8} />
      <Line d="M40 80 l10 -4 M30 100 l14 2" w={3} />
    </Drawing>
  );
}

function SewerGator() {
  return (
    <Drawing label="Drawing of a pale blind alligator lurking in sewer water under a grate">
      <Line d="M10 150 H390" w={4} />
      <Line d="M60 20 V60 M120 20 V60 M180 20 V60 M240 20 V60 M300 20 V60" w={4} />
      <Line d="M50 30 H320" w={4} />
      <Shape d="M40 200 C60 160 160 150 240 160 C300 164 330 180 340 196 L384 200 L340 214 C300 224 100 230 40 200 Z" />
      <Line d="M80 168 l8 -10 l8 10 M120 164 l8 -10 l8 10 M160 162 l8 -10 l8 10 M200 164 l8 -10 l8 10" w={4} />
      <Line d="M350 198 H384" w={3} />
      <Solid d="M352 200 l4 8 l4 -8 Z M366 200 l4 8 l4 -8 Z" />
      <path d="M318 178 q8 -6 16 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <Line d="M10 226 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <Line d="M40 200 C16 204 8 220 10 230" w={7} />
      <Line d="M240 100 q-6 8 0 16 M270 90 q-6 8 0 16" w={3} dash="2 5" />
    </Drawing>
  );
}

function ChompBall() {
  return (
    <Drawing label="Drawing of a toothy bouncing ball of meat with a gassy puff">
      <circle cx="220" cy="120" r="76" fill={card} {...ink} />
      <Dot x={196} y={90} r={6} />
      <Dot x={244} y={86} r={6} />
      <Shape d="M156 128 Q220 188 284 128 Q220 150 156 128 Z" w={4} />
      <Solid d="M172 132 l6 14 l6 -10 Z M194 140 l6 16 l6 -14 Z M218 144 l6 16 l6 -14 Z M242 140 l6 14 l6 -14 Z M262 134 l6 12 l6 -12 Z" />
      <Line d="M170 78 q10 -8 20 -2 M236 72 q10 -8 20 0" w={4} />
      <Line d="M150 70 C140 80 140 100 150 110 M290 90 C300 100 298 114 290 124" w={3} />
      <Line d="M70 150 q-14 -6 -26 4 q-14 -6 -22 8 q14 4 24 -2 q10 8 24 0 Z" w={3} />
      <Line d="M150 216 q70 -14 140 0" w={3} dash="2 8" />
    </Drawing>
  );
}

function SludgePup() {
  return (
    <Drawing label="Drawing of a cheerful ooze shaped like a puppy with a wagging tail, wanting to be petted">
      <Shape d="M90 200 C80 150 120 110 190 110 C240 110 270 140 270 200 C240 210 130 210 90 200 Z" />
      <Shape d="M220 120 C210 80 250 56 290 66 C320 74 322 110 300 126 C280 140 232 140 220 120 Z" />
      <Shape d="M236 74 C220 60 216 90 224 100 Z M296 66 C316 50 324 84 312 100 Z" w={4} />
      <Dot x={262} y={92} r={5} />
      <Dot x={290} y={96} r={5} />
      <Dot x={304} y={108} r={4} />
      <Line d="M264 116 q12 10 24 0" w={3} />
      <Shape d="M276 118 q8 14 16 0 Z" w={3} />
      <Line d="M90 170 C50 170 40 130 60 110" w={9} />
      <Line d="M120 200 V224 M170 204 V224 M230 204 V224" w={9} />
      <Line d="M300 40 l10 -10 M326 54 l14 -4" w={3} />
      <Shape d="M310 12 q-10 -8 -2 -14 q8 4 2 14 Z" w={2} />
      <Line d="M150 210 q-6 12 0 18 M200 214 q-4 10 0 14" w={3} />
    </Drawing>
  );
}

function NebulaStalker() {
  return (
    <Drawing label="Drawing of a freighter-sized void predator with long jaws trailing a ship's engine wake">
      <Shape d="M20 120 C80 60 220 50 300 90 L384 120 L300 150 C220 190 80 180 20 120 Z" />
      <Line d="M300 90 L340 106 L300 112 M300 150 L340 134 L300 128" w={4} />
      <Solid d="M310 112 l6 10 l6 -10 Z M326 114 l6 10 l6 -10 Z" />
      <Dot x={270} y={104} r={5} />
      <Line d="M120 80 C100 40 80 30 60 36 M160 76 C150 36 130 20 110 22 M120 160 C100 200 80 210 60 204" w={6} />
      <Line d="M60 110 H220 M60 130 H220" w={3} dash="8 6" />
      <Shape d="M340 200 L376 196 L388 202 L376 208 Z" w={3} />
      <Line d="M330 202 H300 M320 212 H290 M326 192 H306" w={3} dash="4 4" />
      <Line d="M30 30 v10 M25 35 h10 M350 40 v8 M346 44 h8" w={3} />
    </Drawing>
  );
}

function DustRaptor() {
  return (
    <Drawing label="Drawing of a feathered desert predator running with sickle claws, a canyon behind it">
      <Shape d="M0 224 V100 L40 70 L80 110 L110 224 Z" w={4} />
      <Shape d="M400 224 V80 L360 50 L330 100 L300 224 Z" w={4} />
      <Shape d="M130 150 C130 110 220 100 250 130 C270 150 260 180 230 186 H150 Z" />
      <Shape d="M236 124 C240 90 280 70 316 82 L350 96 L316 106 C300 124 262 136 242 134 Z" />
      <Dot x={302} y={88} r={4} />
      <Solid d="M326 98 l6 8 l6 -8 Z" />
      <Line d="M140 140 C100 140 70 120 50 100" w={7} />
      <Line d="M50 100 l-10 -16 M60 108 l-16 -6 M70 116 l-18 0" w={4} />
      <Line d="M170 186 L150 214 M220 186 L236 214" w={7} />
      <Line d="M150 214 l-14 4 M150 214 l-10 10 M236 214 l14 4 M236 214 l10 10" w={4} />
      <Solid d="M132 220 l-6 4 l8 0 Z" />
      <Line d="M160 120 l8 6 M180 112 l8 6 M200 110 l8 6 M220 112 l8 6" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function PlasmaPanther() {
  return (
    <Drawing label="Drawing of a jet-black panther with veins of plasma stalking along a maintenance duct">
      <Line d="M10 60 H390 M10 200 H390" w={5} />
      <Line d="M60 60 V200 M180 60 V200 M300 60 V200" w={3} />
      <Solid d="M70 170 C60 130 140 112 210 118 C260 122 290 140 280 170 L260 178 H100 Z" />
      <Solid d="M260 130 L266 100 L284 114 L316 112 L334 98 L338 134 C338 154 262 156 260 130 Z" />
      <circle cx="300" cy="124" r="5" fill={card} />
      <circle cx="324" cy="126" r="4" fill={card} />
      <Line d="M100 176 V196 M130 178 V196 M236 178 V196 M262 176 V196" w={7} />
      <Line d="M72 150 C40 150 30 120 44 100" w={7} />
      <path d="M100 140 q20 -14 40 -4 q20 10 40 -2 q20 -8 40 4 M120 160 q30 -10 60 0 q30 8 60 -4" fill="none" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <path d="M296 112 q6 -14 18 -6" fill="none" stroke={card} strokeWidth="2" strokeLinecap="round" />
    </Drawing>
  );
}

function ScoutLizard() {
  return (
    <Drawing label="Drawing of a six-legged survey lizard hissing on a plain">
      <Shape d="M90 170 C80 130 150 112 220 120 C264 126 280 150 268 172 C230 184 130 186 90 170 Z" />
      <Shape d="M258 128 C262 100 296 84 326 94 L366 108 L326 124 C306 140 270 146 258 128 Z" />
      <Dot x={310} y={102} r={4} />
      <Line d="M350 112 l24 -6 M350 118 l24 8" w={3} />
      <Line d="M120 176 L104 214 M160 180 L152 218 M204 182 L204 220 M244 178 L254 216 M274 168 L296 204 M96 164 L70 196" w={6} />
      <Line d="M90 160 C50 160 30 130 48 110 C58 120 66 130 84 140" w={7} />
      <Line d="M130 128 l4 -10 M160 122 l4 -10 M190 120 l4 -10 M220 124 l4 -10" w={4} />
      <Ground y={226} />
    </Drawing>
  );
}

function VoidKrillSwarm() {
  return (
    <Drawing label="Drawing of a cloud of tiny translucent crustaceans eating through a hull plate">
      <Shape d="M0 200 H400 V230 H0 Z" w={4} />
      <Line d="M40 200 V230 M160 200 V230 M280 200 V230" w={3} />
      <path d="M150 200 q10 -14 20 0 q10 -14 20 0 q10 -14 20 0" fill="none" stroke={card} strokeWidth="4" />
      {[[70, 60], [130, 90], [200, 50], [260, 100], [320, 70], [110, 140], [180, 130], [250, 150], [310, 130], [350, 170], [60, 170], [200, 180], [150, 175]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 60 - 30})`}>
          <path d="M-14 0 C-14 -8 6 -8 12 -2 L20 0 L12 3 C6 8 -14 8 -14 0 Z" fill={card} stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <Line d="M-8 -4 V4 M-2 -5 V5 M4 -4 V4" w={2} />
          <Line d="M-6 6 l-2 8 M0 7 l0 8 M6 6 l2 8" w={2} />
        </g>
      ))}
      <Line d="M30 30 v8 M26 34 h8 M360 24 v8 M356 28 h8" w={3} />
    </Drawing>
  );
}

export const sciFiMachinesArt: Record<string, () => ReactNode> = {
  "battle-clank": BattleClank,
  "beep-bot": BeepBot,
  "chrome-revenant": ChromeRevenant,
  "iron-colossus": IronColossus,
  "buzz-drone": BuzzDrone,
  "wire-ghost": WireGhost,
  "riot-walker": RiotWalker,
  "noodle-cart-bot": NoodleCartBot,
  "clank-walker": ClankWalker,
  "rusted-sentinel": RustedSentinel,
  "data-courier-drone": DataCourierDrone,
  "dreadnought-core": DreadnoughtCore,
  "cargo-loader": CargoLoader,
  "siege-walker": SiegeWalker,
  "scrapper-drone-hive": ScrapperDroneHive,
  "cave-sucker": CaveSucker,
  "frost-strider": FrostStrider,
  "snow-mauler": SnowMauler,
  "cosmic-whale": CosmicWhale,
  "hive-stalker": HiveStalker,
  swarmling: Swarmling,
  "chitin-crusher": ChitinCrusher,
  "neon-gutter-cat": NeonGutterCat,
  "sewer-gator": SewerGator,
  "chomp-ball": ChompBall,
  "sludge-pup": SludgePup,
  "nebula-stalker": NebulaStalker,
  "dust-raptor": DustRaptor,
  "plasma-panther": PlasmaPanther,
  "scout-lizard": ScoutLizard,
  "void-krill-swarm": VoidKrillSwarm,
};
