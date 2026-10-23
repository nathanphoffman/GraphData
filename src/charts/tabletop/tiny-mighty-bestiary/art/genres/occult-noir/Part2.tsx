import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { HoundBody } from "./Part1";

const card = CARD_COLOR;

export function VoidHound() {
  return (
    <Drawing label="Drawing of a thin hound stepping out of the corner of a room">
      <Line d="M240 20 V200 M240 200 L380 150 M240 200 L130 224" w={4} />
      <Line d="M240 20 L380 60" w={4} />
      <g transform="translate(-30 20) scale(0.9)">
        <HoundBody />
      </g>
      <Line d="M270 70 l-30 20 M300 84 l-40 24" w={3} dash="3 6" />
    </Drawing>
  );
}

export function LibrarySilverfish() {
  return (
    <Drawing label="Drawing of a cat-sized silverfish nibbling a book, whispers trailing from its mouth">
      <Shape d="M60 190 H240 V224 H60 Z" />
      <Line d="M60 200 H240 M60 212 H240" w={3} />
      <Shape d="M70 160 H230 V190 H70 Z" w={4} />
      <Line d="M90 166 V184 M110 166 V184" w={3} />
      <Shape d="M120 160 C100 110 160 90 220 108 C270 122 300 140 330 160 C300 168 270 166 240 160 Z" />
      <Line d="M150 116 V158 M180 110 V158 M210 112 V158 M240 124 V160 M270 132 V162" w={3} />
      <Shape d="M120 160 C100 150 90 130 100 112 C112 112 124 128 128 150 Z" w={4} />
      <Dot x={112} y={126} r={3} />
      <Line d="M100 112 L70 70 M108 110 L96 60" w={3} />
      <Line d="M330 160 L384 150 M330 160 L384 176" w={4} />
      <Line d="M150 164 L140 186 M200 164 L204 190 M250 164 L262 188" w={4} />
      <Line d="M70 130 q-14 -4 -8 -16 M60 150 q-14 0 -10 -10" w={3} dash="2 5" />
    </Drawing>
  );
}

export function CrowInformant() {
  return (
    <Drawing label="Drawing of a crow in a tiny hat perched on a wire, holding a shiny button">
      <Line d="M10 170 H390" w={3} />
      <Solid d="M120 100 C140 90 200 90 240 110 C260 128 258 160 226 172 C190 184 150 176 130 150 C116 130 108 110 120 100 Z" />
      <Solid d="M240 110 C248 84 284 80 290 100 C294 116 276 124 260 122 Z" />
      <Solid d="M290 100 L336 112 L290 120 Z" />
      <circle cx="274" cy="98" r="5" fill={card} />
      <Dot x={275} y={98} r={2} />
      <Shape d="M246 82 H284 L280 62 H250 Z" w={4} />
      <Line d="M242 82 H290" w={5} />
      <Line d="M120 100 L84 84 M126 130 L76 134" w={4} />
      <Line d="M190 172 V196 M210 172 V196" w={4} />
      <circle cx="338" cy="140" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={335} y={138} r={1.5} />
      <Dot x={341} y={138} r={1.5} />
      <Dot x={335} y={143} r={1.5} />
      <Dot x={341} y={143} r={1.5} />
      <Line d="M326 128 l-4 -8 M352 128 l4 -8" w={3} />
    </Drawing>
  );
}

export function GraveyardHound() {
  return (
    <Drawing label="Drawing of a lean black dog watching from behind a cemetery fence with pale eyes">
      <g transform="translate(-10 4)">
        <HoundBody eye="ring" />
      </g>
      <Line d="M30 70 V224 M80 64 V224 M130 70 V224 M180 64 V224 M230 70 V224 M280 64 V224 M330 70 V224 M380 64 V224" w={4} />
      <Solid d="M30 70 l-5 -12 h10 Z M80 64 l-5 -12 h10 Z M130 70 l-5 -12 h10 Z M180 64 l-5 -12 h10 Z M230 70 l-5 -12 h10 Z M280 64 l-5 -12 h10 Z M330 70 l-5 -12 h10 Z M380 64 l-5 -12 h10 Z" />
      <Line d="M20 100 H390 M20 190 H390" w={4} />
    </Drawing>
  );
}

export function HellhoundStalker() {
  return (
    <Drawing label="Drawing of a smoking hound with burning eyes tracking a pair of footprints">
      <g transform="translate(-20 0)">
        <HoundBody eye="ring" />
      </g>
      <Line d="M110 100 q10 -14 0 -26 q-8 -12 6 -24 M160 96 q12 -14 0 -28 M210 100 q10 -12 2 -26 M260 90 q8 -10 2 -20" w={3} dash="3 6" />
      <Line d="M280 106 L296 100 M296 114 L312 108" w={3} />
      <Shape d="M300 214 q-8 -4 -6 -12 q8 -6 14 2 q2 8 -8 10 Z" w={3} />
      <Shape d="M340 224 q-8 -4 -6 -12 q8 -6 14 2 q2 8 -8 10 Z" w={3} />
      <Line d="M360 200 q14 -8 8 -18" w={3} dash="2 5" />
    </Drawing>
  );
}

export function OverdramaticRaven() {
  return (
    <Drawing label="Drawing of a raven on a windowsill with one wing flung to its chest, reciting poetry">
      <Shape d="M40 50 H210 V200 H40 Z" w={4} />
      <Line d="M125 50 V200 M40 125 H210" w={3} />
      <Shape d="M20 200 H240 V220 H20 Z" w={4} />
      <Solid d="M150 90 C170 76 230 76 260 100 C284 120 280 160 244 186 H170 C140 160 130 112 150 90 Z" />
      <Solid d="M256 96 C262 66 300 62 308 86 C312 104 290 112 274 108 Z" />
      <Solid d="M308 86 L350 98 L308 106 Z" />
      <circle cx="290" cy="82" r="5" fill={card} />
      <Dot x={291} y={82} r={2} />
      <Line d="M210 112 C190 100 170 120 180 150" w={4} />
      <Line d="M200 186 V200 M226 186 V200" w={4} />
      <Line d="M300 40 q8 -14 20 -6 M326 54 q10 -12 22 -4" w={3} />
      <Line d="M330 130 q12 4 14 -8 M340 150 q14 4 18 -10" w={3} dash="2 5" />
    </Drawing>
  );
}

export function BarghestWarden() {
  return (
    <Drawing label="Drawing of a huge black hound with coal eyes sitting before a churchyard gate">
      <Shape d="M240 224 V120 L290 80 L340 120 V224 Z" w={4} />
      <Line d="M290 80 V50 M276 64 H304" w={5} />
      <Shape d="M270 224 V170 Q290 150 310 170 V224 Z" w={3} />
      <Shape d="M60 200 C40 140 90 100 160 104 C220 108 250 140 244 200 Z" />
      <Shape d="M150 110 C140 70 150 40 190 38 C236 36 250 70 240 100 C230 124 160 128 150 110 Z" />
      <Shape d="M156 54 L146 26 L176 44 Z M238 54 L250 26 L222 44 Z" w={4} />
      <circle cx="176" cy="74" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="220" cy="74" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={176} y={74} r={4} />
      <Dot x={220} y={74} r={4} />
      <Solid d="M190 92 h20 l-10 12 Z" />
      <Line d="M170 112 l6 10 l6 -10 M214 112 l6 10 l6 -10" w={3} />
      <Line d="M100 200 V226 M150 200 V226 M200 200 V226 M240 200 V226" w={10} />
      <Ground y={230} />
    </Drawing>
  );
}

export function RobedCultist() {
  return (
    <Drawing label="Drawing of a hooded figure with a wide smile holding a ritual knife">
      <Shape d="M150 100 C140 30 260 30 250 100 L240 130 H160 Z" />
      <path d="M168 100 C168 70 232 70 232 100 C232 120 168 120 168 100 Z" fill="currentColor" />
      <circle cx="186" cy="96" r="3" fill={card} />
      <circle cx="214" cy="96" r="3" fill={card} />
      <path d="M180 110 Q200 124 220 110" fill="none" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <Shape d="M160 126 H240 L276 224 H124 Z" />
      <Line d="M200 126 V224" w={3} />
      <Line d="M230 134 L270 120 L290 90" w={6} />
      <Solid d="M284 96 L296 60 L304 100 Z" />
      <Line d="M280 100 H308" w={5} />
      <Line d="M170 134 L150 180" w={6} />
      <Line d="M320 60 q8 -6 14 0 M60 90 l8 4 M70 110 l8 0" w={3} />
    </Drawing>
  );
}
