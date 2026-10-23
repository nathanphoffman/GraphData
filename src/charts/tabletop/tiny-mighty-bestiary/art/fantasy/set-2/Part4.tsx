import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function GraveKnight() {
  return (
    <Drawing label="Drawing of a rusted knight with glowing eyes and a notched sword, standing among grave markers">
      <Shape d="M160 90 C158 36 242 36 240 90 V100 H160 Z" />
      <Line d="M170 78 H232" w={4} />
      <circle cx="186" cy="74" r="5" fill="currentColor" />
      <circle cx="214" cy="74" r="5" fill="currentColor" />
      <Line d="M180 66 l-10 -8 M220 66 l10 -8 M200 40 v-14" w={3} />
      <Shape d="M144 104 H256 L248 172 H152 Z" />
      <Line d="M170 120 l8 14 l-6 16 M226 126 l8 6" w={3} />
      <Shape d="M152 172 H248 L256 208 H144 Z" w={4} />
      <Line d="M170 208 V226 M230 208 V226" w={6} />
      <Line d="M150 124 L120 160 M250 124 L290 160" />
      <Shape d="M284 70 L296 70 L296 190 L284 190 Z" w={4} />
      <Line d="M290 190 V204 M276 190 H304" w={5} />
      <Line d="M296 100 l-6 4 M284 130 l6 4" w={3} />
      <Shape d="M40 224 V190 Q40 176 56 176 Q72 176 72 190 V224 Z" w={4} />
      <Line d="M56 186 v14 M50 192 h12" w={3} />
    </Drawing>
  );
}

export function Hellspawn() {
  return (
    <Drawing label="Drawing of a horned fiend with bat wings holding a ledger, smoke rising off it">
      <Shape d="M170 110 C120 90 80 50 40 70 C60 90 70 110 80 140 C110 120 140 126 170 140 Z" />
      <Shape d="M230 110 C280 90 320 50 360 70 C340 90 330 110 320 140 C290 120 260 126 230 140 Z" />
      <Shape d="M168 70 C168 40 232 40 232 70 C232 100 168 100 168 70 Z" />
      <Shape d="M174 52 C160 40 150 20 160 10 C170 24 178 34 184 42 Z M226 52 C240 40 250 20 240 10 C230 24 222 34 216 42 Z" w={4} />
      <Line d="M182 66 l12 6 M218 66 l-12 6" w={4} />
      <Line d="M184 86 Q200 98 216 86" w={3} />
      <Shape d="M174 106 H226 L232 190 H168 Z" />
      <Line d="M190 190 L184 224 M210 190 L218 224" w={6} />
      <Line d="M168 190 C130 210 130 160 150 150" w={4} />
      <Shape d="M226 140 H274 V186 H226 Z" w={4} />
      <Line d="M234 152 H266 M234 162 H262 M234 172 H266" w={3} />
      <Line d="M290 40 q-10 14 0 26 q10 14 0 28 M320 70 q-8 10 0 20 M70 150 q-10 12 0 24" w={3} dash="3 6" />
    </Drawing>
  );
}

export function HauntedSheriff() {
  return (
    <Drawing label="Drawing of a tattered ghostly lawman with a tin star and a wide-brimmed hat">
      <Shape d="M110 70 H290 L260 54 C260 14 140 14 140 54 Z" />
      <Line d="M140 54 H260" w={4} />
      <Shape d="M166 70 H234 V104 C234 124 166 124 166 104 Z" />
      <Dot x={186} y={90} r={4} />
      <Dot x={214} y={90} r={4} />
      <Line d="M186 108 H214" w={3} />
      <Shape d="M160 124 H240 L250 190 l-12 12 l-12 -12 l-14 12 l-14 -12 l-14 12 l-12 -12 Z" />
      <Solid d="M200 140 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" />
      <Line d="M160 134 L120 160 M240 134 L286 150" />
      <Shape d="M286 142 H330 L334 156 H290 Z" w={4} />
      <Line d="M296 156 L294 172 H310 L312 156" w={4} />
      <Line d="M60 60 q10 -10 20 0 M60 90 q12 -10 24 0" w={3} />
      <Line d="M170 202 q-20 14 -10 22 M230 202 q20 14 10 22" w={3} dash="3 6" />
    </Drawing>
  );
}

export function Ghoul() {
  return (
    <Drawing label="Drawing of a hunched rubbery creature crouched over a gravestone">
      <Shape d="M240 224 V150 Q240 124 270 124 Q300 124 300 150 V224 Z" />
      <Line d="M262 150 v22 M252 160 h20" w={4} />
      <Shape d="M90 190 C70 130 110 80 170 84 C210 88 224 120 210 150 C200 176 200 190 210 210 H110 Z" />
      <Shape d="M160 90 C130 80 120 50 150 38 C180 28 200 50 190 78 Z" />
      <Dot x={152} y={58} r={4} />
      <Dot x={172} y={56} r={4} />
      <Line d="M146 74 Q160 84 178 72 M150 74 v6 M160 78 v6 M170 76 v6" w={3} />
      <Line d="M196 112 L240 120 L250 138 M250 138 l-4 10 M250 138 l8 6 M250 138 l10 -2" w={5} />
      <Line d="M120 206 L100 226 M190 210 L200 226" w={6} />
      <Line d="M100 120 q10 4 14 14 M120 150 q10 4 12 12" w={3} />
      <Line d="M40 220 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

export function GallowsTree() {
  return (
    <Drawing label="Drawing of a twisted dead tree with a swaying noose and bones at its roots">
      <Shape d="M180 224 C190 190 180 150 186 110 C190 70 170 40 150 20 C170 28 192 52 200 80 C204 50 220 30 250 16 C226 40 216 70 218 110 C220 150 214 190 224 224 Z" />
      <Line d="M150 20 L120 10 M150 20 L136 36 M250 16 L286 14 M250 16 L268 36 M200 80 L160 90" w={4} />
      <Line d="M258 22 C262 40 262 52 262 62" w={4} />
      <path d="M262 62 C244 62 244 90 262 90 C280 90 280 62 262 62 Z" fill="none" {...ink} strokeWidth={4} />
      <Line d="M244 36 q-6 8 0 16 M280 44 q6 8 0 16" w={3} dash="2 6" />
      <Line d="M150 218 h20 M150 218 l6 -8 M170 218 l6 -8 M230 222 h24 M236 222 l-4 -8 M254 222 l4 -8" w={4} />
      <circle cx="270" cy="216" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={268} y={215} r={1.5} />
      <Dot x={273} y={215} r={1.5} />
      <Ground y={226} />
    </Drawing>
  );
}

export function GraveImp() {
  return (
    <Drawing label="Drawing of a small skinny imp with bat wings and a long tongue, giggling over a broken cup">
      <Shape d="M190 100 C150 70 120 50 90 60 C110 80 120 100 130 120 C150 112 170 114 190 124 Z" />
      <Shape d="M210 100 C250 70 280 50 310 60 C290 80 280 100 270 120 C250 112 230 114 210 124 Z" />
      <Shape d="M176 84 C176 52 224 52 224 84 C224 110 176 110 176 84 Z" />
      <Line d="M182 62 l-8 -20 M218 62 l8 -20" w={4} />
      <Dot x={192} y={80} r={4} />
      <Dot x={210} y={80} r={4} />
      <Line d="M188 96 Q200 104 214 96" w={3} />
      <Line d="M200 100 C200 124 230 124 232 148" w={4} />
      <Shape d="M186 112 H214 L210 166 H190 Z" />
      <Line d="M190 166 L176 196 M210 166 L222 196" w={4} />
      <Line d="M186 120 L160 150 M214 120 L240 140" w={4} />
      <Line d="M140 224 h40 M150 224 l-4 -14 l14 4 l-2 10" w={4} />
      <Line d="M260 200 l-8 -10 l16 2 z" w={3} />
      <Line d="M118 170 q-10 -8 -2 -18 M262 100 l12 -4 M280 120 l12 2" w={3} />
    </Drawing>
  );
}

export function HearthSpirit() {
  return (
    <Drawing label="Drawing of a tiny bearded spirit holding a broom beside a saucer of milk by the fireplace">
      <Shape d="M270 224 V80 H370 V224 Z" />
      <Shape d="M290 224 V120 H350 V224 Z" w={3} />
      <Line d="M320 220 C300 200 330 190 316 170 C340 184 346 206 330 220" w={3} />
      <Shape d="M150 100 C150 60 220 60 220 100 C220 120 150 120 150 100 Z" />
      <Shape d="M150 90 L130 70 L170 70 L160 40 L200 36 L214 70 L226 80 Z" w={4} />
      <Dot x={176} y={92} r={3} />
      <Dot x={196} y={92} r={3} />
      <Shape d="M156 108 C156 160 170 190 186 196 C202 190 216 160 214 108 C200 120 170 120 156 108 Z" />
      <Shape d="M166 150 H206 L212 200 H160 Z" w={4} />
      <Line d="M160 156 L124 140 L100 214" />
      <Shape d="M82 214 H122 L112 200 H92 Z" w={3} />
      <Line d="M170 200 V222 M200 200 V222" w={5} />
      <Shape d="M236 214 H266 L262 224 H240 Z" w={3} />
      <Line d="M238 214 q14 -6 26 0" w={3} />
      <Ground y={226} x2={270} />
    </Drawing>
  );
}
