import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Steam } from "./Part1";
import { Hunter } from "./Part3";

const card = CARD_COLOR;

export function GrotHoundPack() {
  return (
    <Drawing label="Drawing of a gangly pack of flying xenos hounds howling through the ceiling vents">
      <Shape d="M20 20 H380 V50 H20 Z" w={5} />
      <Line d="M40 50 V30 M80 50 V30 M120 50 V30 M160 50 V30 M200 50 V30" w={3} />
      {[[110, 140, 1], [250, 110, 0.8], [300, 180, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-60 20 C-60 -10 40 -10 50 20 Z" w={5} />
          <Shape d="M40 8 L48 -14 L66 -2 L96 -2 L100 24 L52 26 Z" w={5} />
          <Dot x={78} y={6} r={3} />
          <Line d="M-30 -8 l-20 -20 M0 -10 l0 -26 M20 -8 l20 -20" w={4} />
          <Shape d="M-30 -12 q-10 -24 -30 -20 q10 14 14 30 Z M20 -12 q10 -24 30 -20 q-10 14 -14 30 Z" w={3} />
          <Line d="M-40 20 l-6 24 M-10 20 l-2 26 M24 20 l4 26 M44 20 l10 22" w={4} />
        </g>
      ))}
      <Line d="M140 90 q-10 -20 -2 -40 M270 74 q-10 -14 -4 -26" w={3} dash="2 5" />
    </Drawing>
  );
}

export function ChaosHydra() {
  return (
    <Drawing label="Drawing of a many-headed horror breathing fire and spitting warp-spawn from every neck">
      <Shape d="M100 224 C80 170 140 130 200 134 C260 130 320 170 300 224 Z" />
      {[[-80, 70], [-40, 40], [0, 20], [40, 44], [80, 76]].map(([dx, top], i) => (
        <g key={i}>
          <Line d={`M200 150 C${200 + dx * 0.4} 120 ${200 + dx} ${top + 60} ${200 + dx} ${top + 24}`} w={12} />
          <Shape d={`M${200 + dx - 20} ${top + 24} C${200 + dx - 20} ${top - 8} ${200 + dx + 20} ${top - 8} ${200 + dx + 20} ${top + 24} L${200 + dx + 10} ${top + 38} H${200 + dx - 10} Z`} w={4} />
          <Dot x={200 + dx - 7} y={top + 14} r={3} />
          <Dot x={200 + dx + 7} y={top + 14} r={3} />
        </g>
      ))}
      <Solid d="M110 56 C94 40 100 24 112 16 C112 30 126 36 120 56 Z M290 62 C306 46 300 30 288 22 C288 36 274 42 280 62 Z" />
      <Line d="M170 224 V190 M230 224 V190" w={3} />
    </Drawing>
  );
}

export function BackAlleyTiger() {
  return (
    <Drawing label="Drawing of a sleek augmented tiger on a leash outside a night-club door">
      <Shape d="M290 40 H390 V224 H290 Z" w={4} />
      <Shape d="M310 70 H370 V108 H310 Z" w={3} />
      <Line d="M318 90 H362" w={3} dash="3 4" />
      <Hunter />
      <Line d="M110 120 l-10 20 M150 116 l-8 24 M190 116 l-6 28 M230 124 l-4 24" w={6} />
      <Shape d="M268 122 a12 12 0 1 0 0.1 0 Z" w={3} />
      <circle cx="296" cy="118" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={296} y={118} r={3} />
      <Line d="M258 150 H284" w={4} />
      <Ground y={224} x2={290} />
    </Drawing>
  );
}

export function BoilerWyrm() {
  return (
    <Drawing label="Drawing of a smoke-belching eel of iron plates coiling through the pipes of a boiler room">
      <Line d="M0 40 H400 M0 200 H400" w={7} />
      <Line d="M60 40 V200 M340 40 V200" w={5} />
      <Line d="M30 150 C80 90 130 210 180 150 C230 90 280 210 330 140 L350 110" w={34} />
      <Line d="M30 150 C80 90 130 210 180 150 C230 90 280 210 330 140 L350 110" w={26} />
      <Line d="M60 130 v34 M110 140 v34 M160 150 v-34 M210 136 v-34 M260 150 v34 M310 140 v-34" w={3} />
      <Shape d="M338 90 C348 66 388 70 392 94 C394 110 360 120 342 108 Z" />
      <Dot x={374} y={86} r={4} />
      <Steam x={376} y={64} />
      <Line d="M30 150 L14 160 L22 174" w={7} />
    </Drawing>
  );
}

export function HiveWyvern() {
  return (
    <Drawing label="Drawing of a bat-winged hunter diving on ground troops to rip armor open">
      <Shape d="M200 50 C150 20 80 20 20 50 C60 60 80 80 90 110 C130 90 170 90 194 100 Z" />
      <Shape d="M200 50 C250 20 320 20 380 50 C340 60 320 80 310 110 C270 90 230 90 206 100 Z" />
      <Shape d="M176 74 C176 44 224 44 224 74 L218 150 H182 Z" />
      <Shape d="M182 60 C182 36 218 36 218 60 L228 80 L200 90 L172 80 Z" w={4} />
      <Dot x={192} y={56} r={3} />
      <Dot x={208} y={56} r={3} />
      <Line d="M186 150 L164 190 L148 186 M214 150 L236 190 L252 186" w={6} />
      <Line d="M148 186 l-8 10 M148 186 l4 12 M252 186 l8 10 M252 186 l-4 12" w={3} />
      <Line d="M200 150 C204 190 190 210 200 222" w={5} />
      <Shape d="M100 214 H140 L136 226 H104 Z M270 214 H310 L306 226 H274 Z" w={3} />
    </Drawing>
  );
}

export function NeonPigeonFlock() {
  return (
    <Drawing label="Drawing of a flock of cybernetic pigeons with LED-lit wings, one carrying an ad banner, one stealing a data chip">
      {[[120, 100, 1], [220, 70, 0.8], [290, 130, 0.9], [180, 170, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-40 10 C-40 -20 30 -22 44 4 C50 20 20 30 -10 28 C-30 26 -40 22 -40 10 Z" w={5} />
          <Shape d="M30 -4 C34 -26 62 -26 62 -8 C62 4 44 8 36 4 Z" w={5} />
          <Shape d="M62 -14 L78 -8 L62 -4 Z" w={3} />
          <Dot x={50} y={-16} r={2.5} />
          <Shape d="M-10 -6 C-30 -34 -60 -30 -70 -20 C-50 -14 -40 -2 -30 8 Z" w={4} />
          <Line d="M-58 -22 l8 8 M-46 -26 l8 10 M-34 -22 l4 14" w={2} />
        </g>
      ))}
      <Shape d="M60 190 H200 V222 H60 Z" w={4} />
      <Line d="M72 206 H188" w={3} dash="5 3" />
      <Line d="M110 126 L100 190 M150 80 L120 40 M280 200 H320" w={2} dash="2 4" />
      <Shape d="M310 190 h24 v14 h-24 Z" w={3} />
    </Drawing>
  );
}
