import { Dot, Drawing, ink, Line, Shape } from "../../core/artStyle";

export function FerrymanOfSouls() {
  return (
    <Drawing label="Drawing of a hooded boatman poling a skiff across a dark river">
      <Shape d="M150 100 C150 40 220 40 220 100 L226 140 H144 Z" />
      <path d="M170 100 C170 76 200 76 200 100 C200 120 170 120 170 100 Z" fill="currentColor" />
      <Shape d="M150 130 L130 192 H240 L226 130 Z" />
      <Shape d="M70 192 H330 L300 220 H100 Z" />
      <Line d="M108 224 L300 40" w={5} />
      <Line d="M222 122 L225 112 M162 134 L178 157" w={6} />
      <Line d="M10 200 q15 -8 30 0 t30 0 M330 202 q15 -8 30 0 t30 0" w={3} />
      <Line d="M30 224 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={3} />
      <circle cx="288" cy="176" r="10" fill="none" {...ink} strokeWidth={4} />
      <Line d="M288 172 v8" w={2} />
      <Line d="M50 70 q12 -10 24 0 M290 60 q10 -8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function DrownedCaptain() {
  return (
    <Drawing label="Drawing of a captain in a tricorn hat with a tentacled face, hand on a treasure chest">
      <Shape d="M120 70 L160 40 H240 L280 70 L240 62 H160 Z" />
      <Shape d="M160 62 H240 C250 110 230 130 200 132 C170 130 150 110 160 62 Z" />
      <Dot x={182} y={86} r={5} />
      <Dot x={218} y={86} r={5} />
      <Line d="M180 116 C170 150 150 160 146 180 M192 122 C190 156 182 176 172 190 M208 122 C212 156 222 176 234 188 M220 116 C230 150 250 160 256 178" w={5} />
      <Line d="M176 120 q-4 10 4 12 M224 120 q4 10 -4 12" w={3} />
      <Shape d="M150 134 L130 224 H270 L250 134 Z" />
      <Line d="M170 150 H230 M200 134 V224" w={3} />
      <Shape d="M270 170 H350 V224 H270 Z" w={4} />
      <Shape d="M268 170 C268 150 352 150 352 170 Z" w={4} />
      <Line d="M240 150 L270 170" />
      <Dot x={310} y={200} r={5} />
      <Line d="M60 60 q8 -10 18 -2 M80 100 q10 -6 18 2 M50 160 q8 -6 16 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function GaslampSpecter() {
  return (
    <Drawing label="Drawing of a pale figure in a bowler hat standing beside a gas lamp in fog">
      <Line d="M300 224 V50" w={6} />
      <Shape d="M284 50 L292 20 H308 L316 50 Z" w={4} />
      <Line d="M300 34 V44" w={3} />
      <Line d="M270 30 l-14 -6 M330 30 l14 -6 M268 56 l-16 4 M332 56 l16 4" w={3} />
      <Shape d="M168 64 C168 36 232 36 232 64 Z" />
      <Line d="M150 64 H250" w={6} />
      <Shape d="M174 70 H226 V104 C226 122 174 122 174 104 Z" />
      <Line d="M184 84 h8 M208 84 h8" w={4} />
      <Line d="M190 106 H210" w={3} />
      <Shape d="M166 126 H234 L242 200 H158 Z" />
      <Line d="M200 126 V200 M184 126 l16 18 l16 -18" w={3} />
      <Line d="M166 134 L140 170 M234 134 L262 168" w={5} />
      <Line d="M180 200 V214 M220 200 V214" w={6} />
      <Line d="M30 190 q20 -10 40 0 t40 0 M240 200 q20 -10 40 0 t40 0 M60 218 q20 -10 40 0 t40 0 t40 0 t40 0" w={3} dash="8 8" />
    </Drawing>
  );
}
