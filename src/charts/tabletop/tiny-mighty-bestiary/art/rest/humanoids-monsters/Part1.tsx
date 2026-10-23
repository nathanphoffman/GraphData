import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";

const card = CARD_COLOR;

export const Steam = ({ x, y }: { x: number; y: number }) => (
  <Line d={`M${x} ${y} q-8 -10 2 -18 q10 -8 0 -18 M${x + 14} ${y} q-8 -10 2 -18`} w={3} dash="3 5" />
);

export const Goggles = ({ y = 70 }: { y?: number }) => (
  <>
    <Line d={`M174 ${y} H226`} w={4} />
    <circle cx="186" cy={y} r="9" fill={card} {...ink} strokeWidth={3} />
    <circle cx="214" cy={y} r="9" fill={card} {...ink} strokeWidth={3} />
    <Dot x={186} y={y} r={2.5} />
    <Dot x={214} y={y} r={2.5} />
  </>
);

export function GoggledInventor() {
  return (
    <Drawing label="Drawing of a soot-smeared inventor in goggles and a lab coat beside a half-built machine">
      <Shape d="M270 120 H370 V200 H270 Z" w={4} />
      <circle cx="300" cy="150" r="14" fill={card} {...ink} strokeWidth={3} />
      <Line d="M326 130 V190 M340 130 V190 M354 130 V190" w={3} />
      <Line d="M290 120 V90 H320" w={4} />
      <Figure arms={<Line d="M154 116 L130 160 M246 116 L270 140" w={7} />}>
        <Goggles />
        <Line d="M188 90 Q200 98 212 90" w={3} />
        <Line d="M176 52 l-6 -16 M200 46 v-16 M224 52 l6 -16" w={4} />
        <Line d="M200 106 V180 M170 140 h12 M218 150 h12" w={3} />
        <Shape d="M122 156 h22 v20 h-22 Z" w={3} />
      </Figure>
      <Steam x={300} y={90} />
    </Drawing>
  );
}

export function AirshipPirate() {
  return (
    <Drawing label="Drawing of a goggled raider swinging on a grapple line toward an airship from a patched balloon">
      <Shape d="M240 20 C200 20 190 100 240 110 C290 100 280 20 240 20 Z" w={4} />
      <Line d="M240 20 V110 M216 40 L224 106 M264 40 L256 106" w={3} />
      <Shape d="M222 110 H258 V130 H222 Z" w={3} />
      <Line d="M300 20 C320 60 310 100 280 130" w={3} />
      <Shape d="M20 150 L120 130 H200 L190 160 L40 170 Z" w={4} />
      <Line d="M120 130 V90 M120 94 L150 110 L120 122" w={3} />
      <Figure arms={<Line d="M154 116 L120 80 L102 40 M246 116 L278 130" w={7} />}>
        <Goggles />
        <Line d="M188 90 Q200 100 212 90" w={3} />
        <Line d="M200 106 V180 M152 140 H248" w={3} />
        <Shape d="M270 126 h40 v14 h-40 Z" w={4} />
      </Figure>
    </Drawing>
  );
}

export function SmogBaron() {
  return (
    <Drawing label="Drawing of a top-hatted soot-grey mill owner with a cane, coughing, with a factory belching smoke behind him">
      <Shape d="M240 120 H390 V224 H240 Z" w={4} />
      <Shape d="M260 40 H284 V120 H260 Z M310 20 H334 V120 H310 Z M360 50 H382 V120 H360 Z" w={4} />
      <path d="M260 30 q-20 -20 10 -30 q40 0 40 20 q30 -14 40 8 q30 0 20 20 H260 Z" fill={card} stroke="currentColor" strokeWidth="4" />
      <Shape d="M166 62 L172 12 H228 L234 62 Z" />
      <Line d="M172 40 H228 M152 64 H248" w={5} />
      <Shape d="M172 68 H228 V100 C228 116 172 116 172 100 Z" />
      <Line d="M184 84 H194 M206 84 H216" w={4} />
      <Line d="M190 102 H210" w={3} />
      <Shape d="M148 120 H252 L262 224 H138 Z" />
      <Line d="M200 120 V224" w={3} />
      <Line d="M154 128 L128 170 M246 128 L270 160 L278 224" w={7} />
      <Line d="M270 160 H286" w={5} />
      <Line d="M222 76 q10 -8 12 -18 M232 82 q12 -6 16 -16" w={2} dash="2 4" />
    </Drawing>
  );
}

export function BackAlleySurgeon() {
  return (
    <Drawing label="Drawing of a cheerful street doctor with six borrowed arms holding tools, each a different shade">
      <Shape d="M168 74 C164 36 236 36 232 74 C236 100 164 100 168 74 Z" />
      <Line d="M182 66 H194 M206 66 H218" w={4} />
      <Line d="M184 84 Q200 98 216 84" w={4} />
      <Shape d="M150 104 H250 L260 214 H140 Z" />
      <Line d="M200 104 V214" w={3} />
      <Line d="M152 114 L112 100 L96 60 M152 130 L108 140 L88 120 M154 148 L120 178 L90 170 M248 114 L288 100 L304 60 M248 130 L292 140 L312 120 M246 148 L280 178 L310 170" w={6} />
      <Shape d="M82 150 h14 v8 h-14 Z" w={3} />
      <Solid d="M92 54 L96 38 L102 56 Z M298 54 L304 38 L308 56 Z" />
      <Shape d="M304 112 h14 v10 h-14 Z" w={3} />
      <Shape d="M84 112 h14 v10 h-14 Z" w={3} />
      <Shape d="M300 160 h18 v10 h-18 Z" w={3} />
      <Line d="M170 214 V228 M230 214 V228" w={7} />
    </Drawing>
  );
}

export function ApprenticeTinker() {
  return (
    <Drawing label="Drawing of a soot-covered kid in oversized goggles with a wrench half their size">
      <Shape d="M176 96 C170 56 230 56 224 96 L220 112 H180 Z" />
      <Line d="M170 86 H230" w={4} />
      <circle cx="186" cy="86" r="11" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="86" r="11" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={86} r={3} />
      <Dot x={214} y={86} r={3} />
      <Line d="M190 106 q10 6 20 0" w={3} />
      <Line d="M184 68 l-6 -14 M216 68 l6 -14" w={3} />
      <Shape d="M166 114 H234 L242 190 H158 Z" />
      <Line d="M200 114 V190" w={3} />
      <Line d="M170 124 L148 160 M230 124 L262 140" w={6} />
      <Line d="M262 140 L324 40" w={7} />
      <Shape d="M310 14 a18 18 0 1 1 22 28 l-8 -12 Z" w={5} />
      <Shape d="M166 190 H196 V226 H166 Z M204 190 H234 V226 H204 Z" w={4} />
      <Line d="M180 140 q8 6 14 0" w={2} />
    </Drawing>
  );
}

export function IndustrialMagnate() {
  return (
    <Drawing label="Drawing of a monocled titan of industry looming over a mill, rail line and airships">
      <Line d="M0 224 H400" w={5} />
      <Line d="M0 214 H400" w={2} dash="6 6" />
      <Shape d="M300 120 H390 V224 H300 Z" w={4} />
      <Shape d="M320 70 H340 V120 H320 Z" w={3} />
      <Shape d="M40 24 C20 24 20 60 40 64 C60 60 60 24 40 24 Z" w={3} />
      <Shape d="M340 30 C320 30 320 66 340 70 C360 66 360 30 340 30 Z" w={3} />
      <Shape d="M156 56 L162 12 H238 L244 56 Z" />
      <Line d="M162 38 H238 M146 58 H254" w={5} />
      <Shape d="M168 64 H232 V104 C232 124 168 124 168 104 Z" />
      <circle cx="214" cy="84" r="12" fill="none" {...ink} strokeWidth={3} />
      <Line d="M226 84 L240 116" w={2} />
      <Line d="M180 84 H194" w={4} />
      <Line d="M184 108 H216" w={3} />
      <Shape d="M130 128 H270 L284 224 H116 Z" />
      <Line d="M200 128 V224 M170 150 q30 20 60 0" w={3} />
      <Line d="M138 136 L110 180 M262 136 L290 180" w={9} />
    </Drawing>
  );
}
