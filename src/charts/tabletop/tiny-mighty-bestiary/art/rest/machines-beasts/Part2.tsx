import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Servant } from "./Part1";

const card = CARD_COLOR;

export function CrystalSentinel() {
  return (
    <Drawing label="Drawing of a faceted crystal guardian firing prism beams">
      <Shape d="M200 20 L240 60 L226 100 H174 L160 60 Z" />
      <Line d="M200 20 L200 100 M160 60 L240 60" w={3} />
      <Shape d="M150 110 L250 110 L270 160 L200 200 L130 160 Z" />
      <Line d="M200 110 V200 M130 160 H270 M150 110 L200 160 L250 110" w={3} />
      <Shape d="M130 160 L90 150 L100 200 Z M270 160 L310 150 L300 200 Z" w={4} />
      <Shape d="M180 200 L170 226 H230 L220 200 Z" w={4} />
      <Dot x={200} y={64} r={4} />
      <Line d="M270 150 L340 120 M270 150 L350 150 M270 150 L340 180" w={3} />
      <Line d="M60 60 v10 M55 65 h10 M340 50 v10 M335 55 h10" w={3} />
    </Drawing>
  );
}

export function CrystalCourier() {
  return (
    <Drawing label="Drawing of a faceted crystal messenger gliding on a cushion of light with a scroll">
      <Shape d="M200 40 L236 80 L200 150 L164 80 Z" />
      <Line d="M164 80 H236 M200 40 V150" w={3} />
      <Shape d="M120 100 L164 80 L170 130 Z M280 100 L236 80 L230 130 Z" w={4} />
      <Shape d="M240 108 H280 V122 H240 Z" w={3} />
      <Line d="M250 108 V100 M270 108 V100" w={3} />
      <ellipse cx="200" cy="190" rx="80" ry="16" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="190" rx="50" ry="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M120 210 l-20 12 M200 218 v12 M280 210 l20 12" w={3} dash="3 4" />
      <Dot x={200} y={78} r={4} />
    </Drawing>
  );
}

export function RuneWalker() {
  return (
    <Drawing label="Drawing of a tall war-automaton carved with glowing script, built by a long-dead order of star-priests">
      <Shape d="M168 30 H232 V84 H168 Z" />
      <Line d="M184 56 H216" w={5} />
      <Shape d="M130 94 H270 V160 H130 Z" />
      <Shape d="M110 90 H138 V120 H110 Z M262 90 H290 V120 H262 Z" w={4} />
      <Line d="M122 120 V170 L108 200 M278 120 V170 L292 200" w={9} />
      <Shape d="M152 160 H196 V226 H152 Z M204 160 H248 V226 H204 Z" />
      <Line d="M150 106 l10 10 l-10 10 M175 104 v30 M190 104 h20 M190 130 h20 M224 104 l20 30 M250 104 l-20 30" w={3} />
      <Line d="M168 176 h20 M168 196 l8 -10 l8 10 M212 176 v36 M226 176 l10 16" w={3} />
      <Line d="M184 40 V30 M216 40 V30" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function ServoCherub() {
  return (
    <Drawing label="Drawing of a chanting brass cherub on a rocket pack">
      <Shape d="M170 80 C170 40 230 40 230 80 C230 106 170 106 170 80 Z" />
      <circle cx="186" cy="72" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="72" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={72} r={2} />
      <Dot x={214} y={72} r={2} />
      <Line d="M188 92 H212 M196 88 v8 M204 88 v8" w={3} />
      <Line d="M170 50 q30 -20 60 0" w={4} />
      <Shape d="M178 110 H222 L226 160 H174 Z" />
      <Line d="M176 120 L140 140 M224 120 L260 140" w={6} />
      <Shape d="M120 60 C100 40 70 50 70 80 C90 100 120 100 140 90 Z M280 60 C300 40 330 50 330 80 C310 100 280 100 260 90 Z" w={4} />
      <Shape d="M184 160 H216 V190 H184 Z" w={4} />
      <Solid d="M190 190 L200 224 L210 190 Z" />
      <Line d="M170 164 L160 190 M230 164 L240 190" w={5} />
      <Line d="M300 120 l24 -6 M300 134 l30 0" w={3} dash="3 4" />
    </Drawing>
  );
}

export function SiegeAutomaton() {
  return (
    <Drawing label="Drawing of a scarred war-machine with a chainfist and a skull for a face, sealed in a vault">
      <Shape d="M170 30 C160 -2 240 -2 230 30 L226 60 H174 Z" />
      <Dot x={186} y={34} r={5} />
      <Dot x={214} y={34} r={5} />
      <Line d="M190 52 V60 M200 52 V60 M210 52 V60" w={3} />
      <Shape d="M110 70 H290 L300 160 H100 Z" />
      <Line d="M200 70 V160 M120 110 H280" w={3} />
      <Shape d="M60 70 H110 V150 H60 Z M290 70 H340 V150 H290 Z" w={4} />
      <Shape d="M40 150 H130 V180 H40 Z" w={5} />
      <Line d="M50 150 v-10 M66 150 v-10 M82 150 v-10 M98 150 v-10 M114 150 v-10" w={4} />
      <Line d="M300 120 L340 160 L360 140" w={8} />
      <Shape d="M130 160 H190 V226 H130 Z M210 160 H270 V226 H210 Z" w={4} />
      <Line d="M150 90 l6 12 M240 130 l-6 12" w={2} />
    </Drawing>
  );
}

export function RiotDrone() {
  return (
    <Drawing label="Drawing of a hovering security drone with a shock baton and a warning light">
      <Shape d="M140 90 C140 60 260 60 260 90 L270 130 H130 Z" />
      <circle cx="200" cy="100" r="18" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={100} r={6} />
      <Line d="M200 60 V40 M188 40 H212" w={4} />
      <Dot x={200} y={32} r={5} />
      <Line d="M130 130 L100 170 M270 130 L300 170" w={6} />
      <Shape d="M290 160 L360 100 L372 112 L302 176 Z" w={4} />
      <Line d="M366 94 l12 -14 M378 108 l14 -4" w={3} />
      <Line d="M170 130 V150 M230 130 V150" w={4} />
      <Line d="M110 60 q10 -10 20 0 M270 60 q10 -10 20 0" w={3} dash="2 5" />
      <Ground y={224} x1={120} x2={280} />
    </Drawing>
  );
}

export function ArcologyWarden() {
  return (
    <Drawing label="Drawing of a mega-tower with a glowing eye at its core, lines running to every elevator, door and gun turret">
      <Shape d="M140 20 H260 V224 H140 Z" />
      {/* Evenly spaced horizontal lines. */}
      {Array.from({ length: 10 }, (_unused, index) => (
        <Line key={index} d={`M140 ${44 + index * 18} H260`} w={2} />
      ))}
      <circle cx="200" cy="110" r="30" fill={card} {...ink} strokeWidth={5} />
      <circle cx="200" cy="110" r="12" fill="currentColor" />
      <Line d="M170 110 H90 L70 90 M230 110 H310 L330 90 M200 140 V160 H110 L90 190 M200 140 V160 H290 L310 190" w={3} />
      <Shape d="M50 70 H80 V94 H50 Z M320 70 H350 V94 H320 Z" w={4} />
      <Shape d="M60 186 H100 V214 H60 Z M300 186 H340 V214 H300 Z" w={4} />
      <Line d="M70 70 V56 H84 M330 70 V56 H316" w={3} />
      <Line d="M104 190 l14 -4 M296 190 l-14 -4" w={4} />
    </Drawing>
  );
}

export function TinFootman() {
  return (
    <Drawing label="Drawing of a polite tin servant in a doorway announcing a guest, with a fist ready">
      <Shape d="M290 40 H380 V224 H290 Z" w={4} />
      <Shape d="M300 60 H370 V224 H300 Z" w={3} />
      <Servant hat />
      <Line d="M156 114 L124 160 M244 114 L280 90 L282 60" w={7} />
      <Shape d="M270 44 H296 V64 H270 Z" w={4} />
      <Shape d="M158 190 H196 V226 H158 Z M204 190 H242 V226 H204 Z" w={4} />
      <Line d="M110 120 q-8 -10 0 -20" w={3} dash="2 4" />
    </Drawing>
  );
}
