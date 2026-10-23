import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";
import { Steam } from "./Part1";

const card = CARD_COLOR;

export function BumblingGuardsman() {
  return (
    <Drawing label="Drawing of a nervous recruit in oversized armor, helmet slipping over his eyes, unsure which side he's on">
      <Shape d="M150 100 C144 40 256 40 250 100 L246 120 H154 Z" />
      <Line d="M160 100 H240" w={8} />
      <Line d="M164 108 q10 6 20 0 M216 108 q10 6 20 0" w={2} />
      <Shape d="M110 126 H290 L296 200 H104 Z" />
      <Shape d="M96 118 H134 V160 H96 Z M266 118 H304 V160 H266 Z" w={5} />
      <Line d="M118 160 L96 200 M282 160 L310 190" w={9} />
      <Line d="M320 40 V224" w={4} />
      <Solid d="M312 44 L320 20 L328 44 Z" />
      <Shape d="M150 200 H196 V226 H150 Z M204 200 H250 V226 H204 Z" w={4} />
      <Line d="M60 60 q8 -10 16 0 M70 90 q8 -10 16 0" w={3} />
      <Line d="M40 50 v12 M34 56 h12" w={3} />
      <Line d="M360 100 q-8 -12 0 -24" w={3} dash="2 4" />
    </Drawing>
  );
}

export function BoilerhouseMender() {
  return (
    <Drawing label="Drawing of a grease-stained mender patching a person and a machine with the same brass toolkit">
      <Shape d="M270 130 H370 V200 H270 Z" w={4} />
      <circle cx="300" cy="160" r="12" fill={card} {...ink} strokeWidth={3} />
      <Line d="M326 140 V190 M342 140 V190" w={3} />
      <Line d="M270 150 H250" w={3} dash="3 3" />
      <Figure arms={<Line d="M154 116 L130 160 M246 116 L268 150" w={7} />}>
        <Line d="M174 52 q26 -20 52 0" w={5} />
        <Dot x={188} y={72} r={3} />
        <Dot x={212} y={72} r={3} />
        <Line d="M190 88 Q200 96 210 88" w={3} />
        <Line d="M200 106 V180 M156 134 H244" w={3} />
        <Shape d="M112 156 h40 v26 h-40 Z" w={4} />
        <Line d="M122 156 v-8 h20 v8 M118 168 h28" w={3} />
        <Line d="M262 150 l16 -20" w={5} />
      </Figure>
    </Drawing>
  );
}

export function StarLanternHealer() {
  return (
    <Drawing label="Drawing of a robed healer holding a hanging lantern of captured starlight and mending a wound with its glow">
      <Shape d="M166 76 C162 34 238 34 234 76 C238 100 162 100 166 76 Z" />
      <Line d="M170 56 C180 38 220 38 230 56" w={4} />
      <Dot x={186} y={72} r={3} />
      <Dot x={214} y={72} r={3} />
      <Line d="M188 86 q12 8 24 0" w={3} />
      <Shape d="M148 104 H252 L282 224 H118 Z" />
      <Line d="M200 104 V224" w={3} />
      <Line d="M244 112 L290 90 L300 60" w={6} />
      <Line d="M300 60 V44" w={3} />
      <Shape d="M280 44 H320 L312 62 H288 Z" w={3} />
      <Shape d="M284 62 H316 V100 H284 Z" w={4} />
      <Solid d="M300 94 l4 -10 l8 -2 l-6 -6 l2 -10 l-8 6 l-8 -6 l2 10 l-6 6 l8 2 Z" />
      <Line d="M270 100 L230 150 M152 112 L120 156" w={6} />
      <Line d="M270 130 l-14 8 M290 116 l-8 14 M316 120 l10 12 M320 100 l16 0" w={3} dash="2 4" />
      <Shape d="M60 160 h50 v24 h-50 Z" w={3} />
    </Drawing>
  );
}

export function HullBreakerGrunt() {
  return (
    <Drawing label="Drawing of a cheerful overmuscled shipbreaker with a huge hammer, a cracked hull plate behind him">
      <Shape d="M0 30 H110 L90 224 H0 Z" w={5} />
      <Line d="M20 80 L60 110 L40 150 L80 180" w={3} />
      <Shape d="M156 76 C150 36 250 36 244 76 C250 104 150 104 156 76 Z" />
      <Dot x={180} y={70} r={4} />
      <Dot x={220} y={70} r={4} />
      <Shape d="M180 84 Q200 102 220 84 Z" w={3} />
      <Shape d="M116 112 C140 100 260 100 284 112 C300 150 284 190 264 196 H136 C116 190 100 150 116 112 Z" />
      <Line d="M126 124 L90 150 L118 174 M274 124 L306 100 L320 70" w={14} />
      <Line d="M320 70 L350 -4" w={7} />
      <Shape d="M320 -10 H390 V40 H320 Z" w={5} />
      <Shape d="M156 196 H196 V226 H156 Z M204 196 H244 V226 H204 Z" w={4} />
    </Drawing>
  );
}

export function SmugglerSparker() {
  return (
    <Drawing label="Drawing of a scrappy mechanic in a cargo bay working on stolen parts and eating a snack">
      <Shape d="M0 170 H400 V224 H0 Z" w={4} />
      <Shape d="M40 100 H120 V170 H40 Z M60 60 H110 V100 H60 Z" w={4} />
      <Shape d="M280 120 H380 V170 H280 Z" w={4} />
      <Line d="M300 120 V104 H360 V120" w={3} />
      <Figure arms={<Line d="M154 116 L130 150 L170 170 M246 116 L270 130 L250 100" w={7} />}>
        <Line d="M174 52 q26 -22 52 0" w={5} />
        <Dot x={188} y={72} r={3} />
        <Dot x={212} y={72} r={3} />
        <Line d="M190 86 Q200 94 210 86" w={3} />
        <Line d="M200 106 V176" w={3} />
        <Shape d="M236 90 h24 v16 h-24 Z" w={3} />
        <Line d="M262 128 l14 -14 l8 8" w={3} />
        <Shape d="M150 156 h30 v16 h-30 Z" w={3} />
      </Figure>
      <Line d="M296 100 l8 -10 M312 96 l6 -12 M330 100 l10 -8" w={3} />
    </Drawing>
  );
}

/* Monsters */

export function VendingMachineMimic() {
  return (
    <Drawing label="Drawing of a street-corner snack dispenser with far too many teeth behind its coin slot">
      <Shape d="M120 20 H280 V224 H120 Z" />
      <Shape d="M136 36 H264 V120 H136 Z" w={4} />
      <Line d="M150 60 H250 M150 84 H250" w={2} />
      <Shape d="M136 134 H264 V164 H136 Z" w={4} />
      <Solid d="M140 134 l8 14 l8 -14 Z M158 134 l8 14 l8 -14 Z M176 134 l8 14 l8 -14 Z M194 134 l8 14 l8 -14 Z M212 134 l8 14 l8 -14 Z M230 134 l8 14 l8 -14 Z M246 134 l8 14 l8 -14 Z M140 164 l8 -14 l8 14 Z M164 164 l8 -14 l8 14 Z M190 164 l8 -14 l8 14 Z M216 164 l8 -14 l8 14 Z M240 164 l8 -14 l8 14 Z" />
      <Line d="M270 40 v16 M270 70 v8" w={4} />
      <Shape d="M150 180 H250 V210 H150 Z" w={4} />
      <circle cx="170" cy="62" r="6" fill={card} {...ink} strokeWidth={2} />
      <circle cx="230" cy="62" r="6" fill={card} {...ink} strokeWidth={2} />
      <Dot x={170} y={62} r={2} />
      <Dot x={230} y={62} r={2} />
      <Line d="M130 224 H270" w={4} />
      <Line d="M310 160 q10 -14 22 -8 M300 190 l24 -6" w={3} dash="3 4" />
    </Drawing>
  );
}

export function SewerVatHorror() {
  return (
    <Drawing label="Drawing of a failed gene experiment outgrowing its tank and spilling over the sides">
      <Shape d="M120 60 H280 V224 H120 Z" w={5} />
      <Line d="M120 100 H280" w={3} />
      <path d="M130 224 C110 160 150 110 190 130 C210 90 270 100 270 150 C300 170 310 224 300 224 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="180" cy="170" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={180} y={172} r={4} />
      <circle cx="236" cy="136" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={236} y={138} r={5} />
      <Shape d="M190 196 Q210 216 230 196 Z" w={3} />
      <Line d="M270 110 C310 90 330 120 350 100 M300 190 C330 180 346 200 370 190" w={9} />
      <Line d="M120 60 L100 40 M280 60 L300 40" w={4} />
      <Line d="M20 214 q15 -8 30 0 t30 0 M320 218 q15 -8 30 0 t30 0" w={3} />
    </Drawing>
  );
}

export function BoilerbackWyrm() {
  return (
    <Drawing label="Drawing of a coal-black wyrm with boiler plates on its back hissing steam">
      <Shape d="M40 200 C40 130 130 100 200 106 C270 110 320 150 330 190 L384 196 L330 214 C280 226 100 230 40 200 Z" />
      <Shape d="M90 124 H130 V146 H90 Z M150 112 H190 V134 H150 Z M210 112 H250 V134 H210 Z M266 124 H300 V146 H266 Z" w={4} />
      <Line d="M110 124 V104 M170 112 V90 M230 112 V90 M284 124 V104" w={4} />
      <Steam x={110} y={100} />
      <Steam x={230} y={86} />
      <Dot x={336} y={190} r={4} />
      <Line d="M360 190 l8 -6 M360 204 l12 4" w={3} />
      <Line d="M80 214 v12 M180 218 v10 M280 218 v10" w={7} />
    </Drawing>
  );
}
