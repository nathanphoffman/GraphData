import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function BattleClank() {
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

export function BeepBot() {
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

export function ChromeRevenant() {
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

export function IronColossus() {
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

export function BuzzDrone() {
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

export function WireGhost() {
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

export function RiotWalker() {
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
