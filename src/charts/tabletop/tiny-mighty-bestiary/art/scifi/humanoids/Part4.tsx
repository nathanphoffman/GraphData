import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function MegacorpChairman() {
  return (
    <Drawing label="Drawing of a pale immaculate billionaire in front of a hundred-floor tower">
      <Shape d="M270 224 V40 H380 V224 Z" w={4} />
      {/* Evenly spaced horizontal lines. */}
      {Array.from({ length: 10 }, (_unused, index) => (
        <Line key={index} d={`M280 ${56 + index * 16} H370`} w={2} />
      ))}
      <Line d="M325 40 V16 M318 16 H332" w={3} />
      <Shape d="M170 74 C170 34 230 34 230 74 C230 100 170 100 170 74 Z" />
      <Line d="M172 56 q28 -20 56 0" w={4} />
      <Line d="M184 74 H196 M204 74 H216" w={4} />
      <Line d="M190 90 H210" w={3} />
      <Shape d="M148 106 H252 L262 224 H138 Z" />
      <Shape d="M180 106 L200 150 L220 106 Z" w={3} />
      <Line d="M200 106 V224" w={3} />
      <Line d="M156 116 L130 160 M244 116 L268 140" w={7} />
      <Shape d="M262 130 H284 V146 H262 Z" w={3} />
      <Line d="M120 150 q14 -6 24 4" w={3} />
      <Line d="M170 224 V230 M230 224 V230" w={7} />
    </Drawing>
  );
}

export function ScrapGremlin() {
  return (
    <Drawing label="Drawing of a knee-high giggling green runt with a wrench hitting a machine">
      <Shape d="M130 90 L90 60 L130 70 Z M190 90 L210 56 L196 94 Z" w={4} />
      <Shape d="M120 100 C116 56 200 56 200 100 C200 126 124 126 120 100 Z" />
      <Dot x={144} y={92} r={4} />
      <Dot x={176} y={92} r={4} />
      <Line d="M138 108 Q160 126 184 108" w={4} />
      <Solid d="M146 112 l4 8 l4 -8 Z M166 114 l4 8 l4 -8 Z" />
      <Shape d="M130 126 H190 L194 190 H126 Z" />
      <Line d="M190 140 L230 120 L250 100" w={6} />
      <Line d="M240 80 l20 -20 l16 8 l-12 12 l-14 4 Z" w={4} />
      <Line d="M138 190 V224 M184 190 V224" w={7} />
      <Shape d="M260 130 H360 V224 H260 Z" w={5} />
      <Line d="M280 150 H340 M280 170 H340 M280 190 H320" w={3} />
      <Line d="M244 100 l-8 -8 M258 90 l-4 -12 M272 96 l8 -10" w={3} />
    </Drawing>
  );
}

export function SandRaider() {
  return (
    <Drawing label="Drawing of a masked robed desert nomad with a hooked staff and a rifle">
      <Line d="M300 20 V224 M300 20 q-26 -4 -26 20" w={5} />
      <Shape d="M156 90 C150 28 250 28 244 90 L240 118 H160 Z" />
      <path d="M172 94 C172 70 228 70 228 94 C228 112 172 112 172 94 Z" fill="currentColor" />
      <path d="M182 88 H218" stroke={card} strokeWidth="4" strokeLinecap="round" />
      <Shape d="M148 118 H252 L280 224 H120 Z" />
      <Line d="M160 140 L240 200 M240 140 L160 200" w={3} />
      <Line d="M244 128 L300 120" w={7} />
      <Line d="M160 126 L130 166" w={7} />
      <Shape d="M60 156 H150 V168 H60 Z" w={4} />
      <Line d="M60 162 H40" w={4} />
      <Line d="M30 224 q30 -20 60 -4 q40 -30 90 -6 q50 -24 100 -4" w={3} />
    </Drawing>
  );
}

export function CantinaSmuggler() {
  return (
    <Drawing label="Drawing of a smirking vest-wearing pilot with a blaster on the hip and a ship parked behind him">
      <Shape d="M240 120 C240 90 340 80 380 110 L390 140 L350 150 C300 160 250 150 240 120 Z" w={4} />
      <Line d="M270 130 H350" w={3} />
      <Shape d="M156 66 C156 28 236 28 236 66 C236 98 156 98 156 66 Z" />
      <Line d="M162 50 C180 36 214 36 232 52" w={4} />
      <Dot x={180} y={66} r={3} />
      <Dot x={210} y={66} r={3} />
      <Line d="M176 84 Q192 92 212 80" w={3} />
      <Shape d="M144 104 H224 L232 180 H136 Z" />
      <Shape d="M144 104 L176 104 L170 180 H136 Z M224 104 L192 104 L198 180 H232 Z" w={4} />
      <Line d="M150 112 L126 160 M218 112 L240 150" w={7} />
      <Shape d="M156 180 H196 V226 H156 Z M204 180 H244 V226 H204 Z" w={4} />
      <Shape d="M130 176 H158 V194 H130 Z" w={4} />
      <Line d="M130 184 H112" w={4} />
    </Drawing>
  );
}

export function ArenaChampion() {
  return (
    <Drawing label="Drawing of a scarred undefeated pit fighter in armor made from trophies, with a raised fist">
      <Shape d="M168 80 C160 30 240 30 232 80 C238 104 162 104 168 80 Z" />
      <Line d="M180 58 L196 70" w={3} />
      <Dot x={184} y={74} r={3} />
      <Dot x={216} y={74} r={3} />
      <Line d="M188 90 H212" w={4} />
      <Shape d="M112 108 L150 102 H250 L288 108 L280 136 H120 Z" />
      <Shape d="M120 108 L106 80 L130 104 Z M280 108 L294 80 L270 104 Z" w={4} />
      <Shape d="M146 136 H254 L262 188 H138 Z" />
      <circle cx="170" cy="156" r="9" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M196 146 l8 -6 l8 6 l-4 12 h-8 Z" w={3} />
      <Line d="M228 160 l10 10 l-10 10" w={3} />
      <Line d="M142 124 L108 148 L100 100" w={11} />
      <circle cx="98" cy="86" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M262 124 L292 164" w={11} />
      <Shape d="M144 188 H198 V226 H144 Z M202 188 H256 V226 H202 Z" w={4} />
      <Line d="M60 60 l10 8 M44 90 l14 0 M340 70 l-10 8" w={3} />
    </Drawing>
  );
}

export function RogueStarAce() {
  return (
    <Drawing label="Drawing of a cocky fighter pilot in a jumpsuit and helmet, thumbs-up beside a fast ship">
      <Shape d="M250 150 L330 130 L390 142 L330 156 Z" w={4} />
      <Shape d="M280 136 L270 98 L304 124 Z M280 150 L270 192 L304 156 Z" w={4} />
      <Line d="M240 144 H210" w={3} dash="4 4" />
      <Shape d="M156 70 C150 30 230 26 230 70 L226 92 H160 Z" />
      <Shape d="M168 56 H218 V74 H168 Z" w={4} />
      <Line d="M176 64 H210" w={3} />
      <Line d="M176 84 q16 8 36 0" w={3} />
      <Shape d="M150 100 H236 L244 190 H142 Z" />
      <Line d="M193 100 V190 M150 150 H236" w={3} />
      <Line d="M156 108 L126 140 L142 156 M232 108 L262 128" w={7} />
      <Shape d="M126 126 l-6 -16 l14 -2 l6 20 Z" w={3} />
      <Shape d="M148 190 H190 V226 H148 Z M196 190 H238 V226 H196 Z" w={4} />
    </Drawing>
  );
}
