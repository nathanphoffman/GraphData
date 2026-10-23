import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function BrinyKin() {
  return (
    <Drawing label="Drawing of a fish-person with bulging eyes and gills, hands folded as in prayer, dripping on a dock">
      <Line d="M10 214 H390" w={5} />
      <Line d="M60 214 V234 M180 214 V234 M300 214 V234" w={6} />
      <Shape d="M156 82 C150 30 250 30 244 82 C250 108 150 108 156 82 Z" />
      <circle cx="176" cy="62" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="224" cy="62" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={176} y={62} r={5} />
      <Dot x={224} y={62} r={5} />
      <Line d="M178 90 Q200 100 222 90" w={4} />
      <Line d="M180 90 l-4 6 M200 94 v8 M220 90 l4 6" w={2} />
      <Line d="M170 108 l-8 4 M170 116 l-8 4 M230 108 l8 4 M230 116 l8 4" w={3} />
      <Shape d="M160 120 H240 L254 210 H146 Z" />
      <Line d="M170 140 q6 6 12 0 q6 6 12 0 q6 6 12 0 q6 6 12 0 M170 164 q6 6 12 0 q6 6 12 0 q6 6 12 0 q6 6 12 0" w={2} />
      <Line d="M164 130 L192 170 M236 130 L208 170" w={7} />
      <Shape d="M190 160 H210 V176 H190 Z" w={3} />
      <Line d="M150 200 l-10 14 M250 200 l10 14 M130 150 q-8 8 -2 16 M274 150 q8 8 2 16" w={3} dash="2 5" />
    </Drawing>
  );
}

export function FacelessGaunt() {
  return (
    <Drawing label="Drawing of a black rubbery horned flyer with no face and a barbed tail">
      <Shape d="M190 110 C150 80 100 60 50 76 C80 90 90 110 90 134 C130 120 160 124 190 140 Z" />
      <Shape d="M210 110 C250 80 300 60 350 76 C320 90 310 110 310 134 C270 120 240 124 210 140 Z" />
      <Shape d="M170 90 C170 50 230 50 230 90 C230 116 170 116 170 90 Z" />
      <Solid d="M174 62 C160 40 160 20 172 6 C176 24 184 38 190 50 Z M226 62 C240 40 240 20 228 6 C224 24 216 38 210 50 Z" />
      <Shape d="M176 114 H224 L214 190 H186 Z" />
      <Line d="M186 190 C170 210 200 226 190 234 M214 190 C230 210 200 226 212 234" w={4} />
      <Line d="M176 126 L150 160 M224 126 L250 160" w={5} />
      <Line d="M150 160 l-10 6 M150 160 l-4 10 M250 160 l10 6 M250 160 l4 10" w={3} />
      <Line d="M200 190 C220 214 260 214 270 190 l8 -10 l4 14" w={4} />
      <Line d="M60 160 q8 6 16 0 M330 170 q8 6 16 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function PaleFungoid() {
  return (
    <Drawing label="Drawing of a winged crab-like fungus with a jar holding a brain on its back">
      <Shape d="M170 110 C140 70 100 40 60 44 C80 70 80 90 90 116 C120 112 150 116 170 130 Z" />
      <Shape d="M230 110 C260 70 300 40 340 44 C320 70 320 90 310 116 C280 112 250 116 230 130 Z" />
      <Shape d="M150 150 C140 110 260 110 250 150 C250 180 150 180 150 150 Z" />
      <circle cx="178" cy="136" r="5" fill="currentColor" />
      <circle cx="200" cy="130" r="5" fill="currentColor" />
      <circle cx="222" cy="136" r="5" fill="currentColor" />
      <Line d="M180 156 H220 M186 164 H214" w={3} />
      <Line d="M150 150 C120 140 110 160 100 140 M250 150 C280 140 290 160 300 140" w={5} />
      <Line d="M100 140 l-8 -6 M100 140 l-10 6 M300 140 l8 -6 M300 140 l10 6" w={3} />
      <Line d="M158 172 L140 214 M176 178 L170 224 M224 178 L230 224 M242 172 L260 214" w={5} />
      <Shape d="M184 96 H216 V114 H184 Z" w={3} />
      <Shape d="M188 70 H212 V96 H188 Z" w={4} />
      <path d="M192 86 C188 76 208 74 208 84 C208 90 196 92 192 86 Z" fill="currentColor" />
      <Line d="M200 70 V60" w={3} />
    </Drawing>
  );
}

export function StarWing() {
  return (
    <Drawing label="Drawing of a bat-winged steed with a goat skull head flying under stars, a cultist riding on its back">
      <Shape d="M170 110 C130 70 80 40 30 50 C60 70 66 94 60 122 C100 118 140 124 170 140 Z" />
      <Shape d="M230 110 C260 80 300 60 340 64 C330 84 330 100 320 120 C290 114 260 120 230 134 Z" />
      <Shape d="M140 140 C140 110 280 106 290 140 C290 170 140 176 140 140 Z" />
      <Shape d="M270 130 C270 100 300 80 320 86 C340 92 346 112 336 126 L350 144 L316 138 C296 142 272 140 270 130 Z" />
      <Solid d="M292 100 L286 78 L304 92 Z" />
      <Dot x={318} y={106} r={4} />
      <Dot x={332} y={112} r={3} />
      <Line d="M290 80 C276 60 296 40 312 52" w={5} />
      <Line d="M160 164 V206 M200 166 V206 M250 164 V206" w={5} />
      <Shape d="M196 112 L212 92 L228 112 Z" w={4} />
      <circle cx="212" cy="82" r="8" fill={card} {...ink} strokeWidth={3} />
      <Line d="M142 150 C110 150 100 176 120 190" w={5} />
      <Solid d="M80 20 l4 8 l8 1 l-6 6 l2 8 l-8 -4 l-8 4 l2 -8 l-6 -6 l8 -1 Z" />
      <Line d="M360 30 v10 M355 35 h10 M40 160 v10 M35 165 h10 M360 190 v8 M356 194 h8" w={3} />
    </Drawing>
  );
}

export function LampPostGhoul() {
  return (
    <Drawing label="Drawing of a tall pale figure standing under a broken street lamp, humming">
      <Line d="M300 224 V40 C300 20 270 20 260 30" w={6} />
      <Shape d="M240 30 H282 L272 56 H250 Z" w={4} />
      <Line d="M254 40 L262 52 M272 40 L266 50" w={2} />
      <Line d="M250 60 l-6 8 M274 60 l6 8 M262 62 v10" w={2} dash="2 5" />
      <Shape d="M156 56 C152 18 216 18 212 56 C212 76 156 76 156 56 Z" />
      <Dot x={174} y={50} r={3} />
      <Dot x={196} y={50} r={3} />
      <Line d="M176 64 H194" w={3} />
      <Line d="M184 76 V84" w={7} />
      <Shape d="M156 86 H212 L222 214 H146 Z" />
      <Line d="M184 86 V214" w={3} />
      <Line d="M158 96 L138 190 M210 96 L230 190" w={6} />
      <Line d="M138 190 l-4 14 M230 190 l4 14" w={4} />
      <Line d="M90 40 v22 M90 62 q-10 4 -10 -3 q0 -7 10 -3 M110 28 v18 M110 46 q-8 4 -8 -2 q0 -6 8 -2" w={3} />
      <Ground y={226} />
    </Drawing>
  );
}

export function SaloonSpirit() {
  return (
    <Drawing label="Drawing of a cheery ghost bartender pouring a drink into a glass at an empty bar">
      <Shape d="M20 160 H380 V224 H20 Z" />
      <Line d="M20 176 H380" w={3} />
      <Shape d="M120 80 C120 20 240 20 240 80 L246 150 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -24 0 q-12 14 -22 0 Z" />
      <Dot x={158} y={72} r={5} />
      <Dot x={202} y={72} r={5} />
      <Line d="M156 94 Q180 114 206 94" w={4} />
      <Shape d="M130 26 H230 L222 8 H138 Z" w={4} />
      <Line d="M240 100 L286 110" w={6} />
      <Shape d="M276 90 H300 L296 118 H280 Z" w={4} />
      <Line d="M296 118 C318 140 312 160 300 160" w={3} dash="3 4" />
      <Shape d="M290 160 H330 L324 140 H296 Z" w={3} />
      <Shape d="M60 110 H100 V160 H60 Z" w={3} />
      <Shape d="M340 150 H360 V160 H340 Z" w={3} />
      <Line d="M62 60 H100 M62 76 H100" w={3} />
    </Drawing>
  );
}

export function SunkenLighthouseKeeper() {
  return (
    <Drawing label="Drawing of a waterlogged keeper holding a lantern that burns green, standing in water with seaweed hanging from him">
      <Shape d="M270 224 L286 60 H340 L356 224 Z" w={4} />
      <Shape d="M278 60 H348 L342 40 H284 Z" w={4} />
      <Line d="M284 100 H350 M280 150 H352" w={3} />
      <Shape d="M156 70 C152 28 216 28 212 70 C212 92 156 92 156 70 Z" />
      <Line d="M160 52 C170 34 202 34 210 52" w={4} />
      <Dot x={174} y={66} r={3} />
      <Dot x={194} y={66} r={3} />
      <Line d="M170 80 q14 8 28 0" w={3} />
      <Shape d="M146 98 H222 L236 224 H132 Z" />
      <Line d="M184 98 V224 M150 120 q6 10 0 20 M218 150 q6 10 0 20" w={3} />
      <Line d="M150 108 L122 150 M222 108 L250 140" w={6} />
      <Shape d="M236 136 H262 V176 H236 Z" w={4} />
      <Line d="M240 136 V128 H258 V136" w={3} />
      <Line d="M242 160 q8 -22 14 0 M249 142 v10" w={3} />
      <Line d="M144 224 q-6 -20 4 -34 M226 224 q8 -24 -2 -40" w={3} dash="2 5" />
      <Line d="M10 210 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" w={4} />
      <Line d="M320 20 l-10 -10 M320 20 l10 -10 M320 20 v-14" w={3} />
    </Drawing>
  );
}

export function HollowMan() {
  return (
    <Drawing label="Drawing of a tall figure in a trench coat with a blank face and no hands, in an empty street">
      <Line d="M10 224 L190 180 M390 224 L210 180" w={3} />
      <Shape d="M10 40 H70 V190 H10 Z M330 40 H390 V190 H330 Z" w={3} />
      <Line d="M24 70 h32 M24 100 h32 M24 130 h32 M344 70 h32 M344 100 h32 M344 130 h32" w={2} />
      <Shape d="M158 54 H242 L234 26 H166 Z" />
      <Line d="M144 56 H256" w={6} />
      <Shape d="M168 62 H232 V104 C232 120 168 120 168 104 Z" />
      <Shape d="M150 118 H250 L262 224 H138 Z" />
      <Line d="M200 118 V224 M168 150 L232 150" w={3} />
      <Shape d="M176 118 L200 150 L224 118 Z" w={3} />
      <Line d="M152 124 L138 190 M248 124 L262 190" w={9} />
      <Line d="M170 224 H230" w={2} dash="3 8" />
    </Drawing>
  );
}
