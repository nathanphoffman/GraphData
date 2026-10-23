import { Dot, Drawing, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { ghostBody } from "./Part1";

const card = CARD_COLOR;

export function NeonShrineFox() {
  return (
    <Drawing label="Drawing of a glowing fox with nine fiber-optic tails guarding a tiny shrine between two skyscrapers">
      <Shape d="M0 20 H110 V224 H0 Z M290 20 H400 V224 H290 Z" w={4} />
      <Line d="M10 60 H100 M10 100 H100 M10 140 H100 M300 60 H390 M300 100 H390 M300 140 H390" w={2} dash="4 4" />
      <Shape d="M150 160 H250 V200 H150 Z" w={4} />
      <Shape d="M140 160 L200 124 L260 160 Z" w={4} />
      <Shape d="M180 200 H220 V224 H180 Z" w={3} />
      <Shape d="M140 150 C130 110 170 94 200 100 C230 106 246 130 236 150 Z" />
      <Shape d="M196 104 C196 74 226 66 244 76 L270 100 L240 112 C226 118 204 116 196 104 Z" w={5} />
      <Shape d="M210 76 L204 50 L226 68 Z M232 74 L242 50 L248 80 Z" w={4} />
      <Dot x={236} y={90} r={3} />
      {[-70, -50, -30, -10, 10, 30, 50, 70, 90].map((a, i) => (
        <path key={i} d={`M150 140 C${100 + i * 2} ${140 - a} ${70 + i * 4} ${120 - a * 0.8} ${60 + i * 6} ${110 - a * 0.9}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={i % 2 ? "2 4" : undefined} />
      ))}
      <Line d="M160 150 V170 M190 150 V170" w={4} />
    </Drawing>
  );
}

export function BoilerGhost() {
  return (
    <Drawing label="Drawing of the ghost of a stoker shoveling coal into a furnace in the dark of a boiler room">
      <Shape d="M240 90 H380 V224 H240 Z" w={5} />
      <Shape d="M270 130 H350 V190 H270 Z" w={4} />
      <Solid d="M290 190 C280 166 300 156 306 140 C316 156 336 166 326 190 Z" />
      <Line d="M240 60 H380 M300 60 V90 M320 60 V90" w={5} />
      <path d={ghostBody(90, 210, 60, 200)} fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" strokeLinejoin="round" />
      <Shape d="M102 70 L150 40 L198 70 Q150 82 102 70 Z" w={4} />
      <Dot x={132} y={96} r={4} />
      <Dot x={164} y={96} r={4} />
      <Line d="M138 116 q12 8 24 0" w={3} />
      <Line d="M196 120 L240 130 L262 150" w={6} />
      <Shape d="M250 146 L280 140 L290 154 L262 164 Z" w={4} />
      <Line d="M20 180 H70 M40 200 H80" w={3} dash="4 4" />
    </Drawing>
  );
}

export function StarlightWisp() {
  return (
    <Drawing label="Drawing of a tiny drifting lantern of starlight leading a traveler off the path for fun">
      <Line d="M0 214 C100 214 120 190 200 190 C280 190 320 214 400 214" w={5} />
      <Line d="M60 226 C120 226 150 210 200 210 C260 210 300 226 380 226" w={3} dash="6 6" />
      <Shape d="M60 150 C56 120 94 120 90 150 L94 190 H56 Z" w={4} />
      <Shape d="M60 128 C60 108 90 108 90 128 Z" w={3} />
      <Line d="M90 156 L110 140" w={4} />
      <Shape d="M170 80 L200 40 L230 80 L200 120 Z" />
      <Solid d="M200 66 l4 10 l10 2 l-8 6 l2 10 l-8 -6 l-8 6 l2 -10 l-8 -6 l10 -2 Z" />
      <Line d="M200 40 V22 M200 120 V138 M170 80 H152 M230 80 H248 M178 58 l-12 -12 M222 58 l12 -12 M178 102 l-12 12 M222 102 l12 12" w={3} />
      <Line d="M240 100 C290 90 330 130 360 100" w={3} dash="3 5" />
      <Line d="M300 40 v10 M295 45 h10 M120 40 v8 M116 44 h8 M340 190 v8 M336 194 h8" w={3} />
    </Drawing>
  );
}

export function WarpImp() {
  return (
    <Drawing label="Drawing of a grinning scrap of warp-stuff popping out of a crack in the hull and chewing wiring">
      <Shape d="M0 0 H200 L170 100 L210 130 L160 180 L200 224 H0 Z" w={5} />
      <Line d="M20 40 H120 M20 110 H110 M20 190 H130" w={2} />
      <Line d="M200 100 C240 90 270 110 300 100 M200 150 C230 160 270 140 310 160" w={4} dash="6 4" />
      <Shape d="M210 130 C200 100 230 70 270 76 C310 84 316 120 296 144 C280 160 220 160 210 130 Z" />
      <Shape d="M226 86 L214 56 L246 76 Z M290 86 L304 56 L274 76 Z" w={4} />
      <Dot x={244} y={104} r={4} />
      <Dot x={274} y={104} r={4} />
      <Shape d="M234 124 Q260 154 288 124 Z" w={3} />
      <Solid d="M240 126 l4 8 l4 -8 Z M254 128 l4 8 l4 -8 Z M268 126 l4 8 l4 -8 Z" />
      <Line d="M296 130 L340 120 M340 120 l10 -14" w={4} />
      <Line d="M300 170 C320 170 330 190 350 186" w={4} />
      <Line d="M350 186 q10 6 20 0 M360 176 l8 -10" w={3} dash="2 3" />
    </Drawing>
  );
}
