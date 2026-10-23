import { Dot, Drawing, Line, Shape, Solid } from "../../core/artStyle";
import { Figure } from "../../core/figure";
import { Tricorn, Waves } from "./Part1";

export function AlbatrossOmen() {
  return (
    <Drawing label="Drawing of a huge white albatross trailing a ship, with a crossbow bolt on the deck below">
      <Shape d="M200 70 C150 40 80 30 10 60 C60 70 100 86 110 110 C150 98 180 100 194 108 Z" />
      <Shape d="M200 70 C250 40 320 30 390 60 C340 70 300 86 290 110 C250 98 220 100 206 108 Z" />
      <Shape d="M180 108 C176 76 224 76 220 108 L212 150 H188 Z" />
      <Shape d="M184 78 C184 54 216 54 216 78 C216 90 184 90 184 78 Z" />
      <Shape d="M200 70 L230 76 L204 84 Z" w={4} />
      <Dot x={194} y={68} r={3} />
      <Line d="M190 150 L180 170 M210 150 L220 170" w={4} />
      <Shape d="M80 214 H320 L296 228 H104 Z" w={4} />
      <Line d="M200 214 V190 L240 204 L200 208" w={3} />
      <Line d="M126 206 L150 196 M150 196 l-8 -4 M150 196 l-4 8" w={3} />
      <Line d="M60 30 q10 -8 20 0 M330 20 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function GreatWhiteTerror() {
  return (
    <Drawing label="Drawing of a thirty-foot shark with a harpoon still stuck in its jaw">
      <Shape d="M20 130 C100 80 260 76 370 120 C330 140 230 164 120 160 C60 160 30 148 20 130 Z" />
      <Shape d="M170 84 L206 24 L246 84 Z" w={4} />
      <Shape d="M40 130 L6 90 L22 128 L2 170 L42 144 Z" />
      <Shape d="M150 150 L190 196 L240 150 Z" w={4} />
      <Dot x={320} y={112} r={5} />
      <Shape d="M370 120 L388 124 L370 130 Z" w={3} />
      <Line d="M340 130 l-6 12 l8 -6 l6 10 l4 -14" w={3} />
      <Line d="M296 110 l14 -2 M296 118 l14 0" w={3} />
      <Line d="M352 140 L396 190" w={4} />
      <Solid d="M344 132 L356 140 L348 148 Z" />
      <Line d="M396 190 l-8 -2 M396 190 l-2 -8" w={3} />
      <Line d="M230 110 l14 6 M200 112 l14 6" w={3} />
      <Waves y={52} w={4} />
    </Drawing>
  );
}

export function DeckhandScallywag() {
  return (
    <Drawing label="Drawing of a barefoot gap-toothed sailor with a mop and a cutlass">
      <Figure arms={<Line d="M154 116 L120 150 M246 116 L274 140" w={7} />}>
        <Line d="M176 60 q24 -22 52 0" w={5} />
        <Line d="M176 60 l-8 20" w={3} />
        <Dot x={188} y={76} r={3} />
        <Dot x={212} y={76} r={3} />
        <Path_Grin />
        <Line d="M152 106 V180 M170 106 V180 M190 106 V180 M210 106 V180 M230 106 V180 M248 106 V180" w={2} />
        <Shape d="M166 180 H196 V200 H166 Z M204 180 H234 V200 H204 Z" w={3} />
        <Line d="M180 200 V226 M220 200 V226" w={7} />
        <Line d="M110 30 V180" w={5} />
        <Shape d="M90 180 H132 L128 206 H94 Z" w={4} />
        <Line d="M276 140 L330 90" w={6} />
        <Line d="M330 90 L354 50 L362 56 L342 98" w={4} />
      </Figure>
    </Drawing>
  );
}

export function Path_Grin() {
  return (
    <>
      <Line d="M186 90 Q200 102 214 90" w={3} />
      <Solid d="M194 94 l3 4 l3 -4 Z" />
    </>
  );
}

export function PressGanger() {
  return (
    <Drawing label="Drawing of a burly dockside thug with a club and a sack, offering a friendly drink">
      <Shape d="M156 62 H244 V74 H156 Z" w={4} />
      <Shape d="M168 74 H232 V108 C232 124 168 124 168 108 Z" />
      <Line d="M180 88 H194 M206 88 H220" w={4} />
      <Line d="M186 108 Q200 118 214 108" w={3} />
      <Shape d="M128 128 L168 120 H232 L272 128 L264 200 H136 Z" />
      <Line d="M200 120 V200" w={3} />
      <Line d="M140 140 L100 170 L84 150 M260 140 L300 120 L310 90" w={11} />
      <Shape d="M300 40 H334 L338 100 H298 Z" w={4} />
      <Shape d="M40 130 H84 L78 190 H46 Z" w={4} />
      <Line d="M50 130 V120 H74 V130" w={3} />
      <Shape d="M150 200 H196 V226 H150 Z M204 200 H250 V226 H204 Z" w={4} />
      <Shape d="M310 150 H350 V180 H310 Z" w={3} />
      <Line d="M318 150 V140 H342 V150" w={3} />
    </Drawing>
  );
}

export function CutlassCorsair() {
  return (
    <Drawing label="Drawing of a swashbuckler swinging on a rope with a cutlass and a red sash">
      <Line d="M200 0 C220 40 250 60 260 90" w={4} />
      <Shape d="M168 90 C164 56 236 56 232 90 C236 112 164 112 168 90 Z" />
      <Shape d="M156 70 Q200 34 244 70 Z" w={4} />
      <Dot x={188} y={88} r={3} />
      <Dot x={212} y={88} r={3} />
      <Line d="M184 100 Q200 110 218 98" w={3} />
      <Shape d="M150 116 H250 L254 180 H146 Z" />
      <Line d="M146 160 L254 168" w={9} />
      <Line d="M152 126 L118 100 L96 56 M248 126 L260 100 L262 90" w={7} />
      <Line d="M96 56 L60 8" w={4} />
      <Solid d="M56 14 L66 0 L72 16 Z" />
      <Line d="M254 130 L300 126" w={5} />
      <Solid d="M298 120 L318 124 L298 134 Z" />
      <Line d="M164 180 L150 224 M236 180 L270 210 L290 190" w={8} />
    </Drawing>
  );
}

export function NavyLieutenant() {
  return (
    <Drawing label="Drawing of a crisp blue-coated naval officer with a sword and a spyglass">
      <Tricorn y={58} />
      <Shape d="M170 66 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 84 H194 M206 84 H218" w={4} />
      <Line d="M190 102 H210" w={3} />
      <Shape d="M146 124 H254 L260 200 H140 Z" />
      <Line d="M200 124 V200" w={3} />
      <Solid d="M178 138 h8 v8 h-8 Z M178 156 h8 v8 h-8 Z M214 138 h8 v8 h-8 Z M214 156 h8 v8 h-8 Z" />
      <Line d="M150 130 L118 160 M250 130 L290 100 L308 74" w={7} />
      <Shape d="M300 60 H370 V78 H300 Z" w={4} />
      <Line d="M370 69 H388" w={4} />
      <Line d="M130 160 L90 210" w={4} />
      <Line d="M80 200 l18 12" w={5} />
      <Shape d="M148 200 H196 V226 H148 Z M204 200 H252 V226 H204 Z" w={4} />
    </Drawing>
  );
}

export function PirateCaptain() {
  return (
    <Drawing label="Drawing of a bellowing bearded captain with three pistols, a peg leg and a big feathered hat">
      <Tricorn y={58} />
      <Line d="M232 36 C260 10 290 20 280 40 C268 34 256 38 240 46" w={4} />
      <Shape d="M168 66 C164 110 180 134 200 136 C220 134 236 110 232 66 Z" />
      <Line d="M180 82 H194 M206 82 H220" w={4} />
      <Shape d="M186 100 Q200 120 214 100 Z" w={3} />
      <Shape d="M136 138 L168 128 H232 L264 138 L258 200 H142 Z" />
      <Line d="M150 150 L250 190 M250 150 L150 190" w={4} />
      <Shape d="M164 150 h16 v10 h-16 Z M220 150 h16 v10 h-16 Z M190 164 h20 v10 h-20 Z" w={3} />
      <Line d="M146 142 L112 170 L94 142 M254 142 L290 110 L300 80" w={8} />
      <Shape d="M290 66 H336 V82 H290 Z" w={4} />
      <Line d="M162 200 L150 226 M238 200 V214 L252 226" w={9} />
      <Shape d="M232 214 h18 v12 h-18 Z" w={3} />
    </Drawing>
  );
}
