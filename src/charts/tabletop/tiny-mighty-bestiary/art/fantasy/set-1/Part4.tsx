import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function BloodNoble() {
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

export function CrossroadsFiend() {
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

export function CheekyPoltergeist() {
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

export function AetherDjinn() {
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
