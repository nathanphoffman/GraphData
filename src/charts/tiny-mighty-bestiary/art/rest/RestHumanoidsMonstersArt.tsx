import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";
import { Figure } from "../core/figure";

const card = "var(--b-card)";

const Steam = ({ x, y }: { x: number; y: number }) => (
  <Line d={`M${x} ${y} q-8 -10 2 -18 q10 -8 0 -18 M${x + 14} ${y} q-8 -10 2 -18`} w={3} dash="3 5" />
);

const Goggles = ({ y = 70 }: { y?: number }) => (
  <>
    <Line d={`M174 ${y} H226`} w={4} />
    <circle cx="186" cy={y} r="9" fill={card} {...ink} strokeWidth={3} />
    <circle cx="214" cy={y} r="9" fill={card} {...ink} strokeWidth={3} />
    <Dot x={186} y={y} r={2.5} />
    <Dot x={214} y={y} r={2.5} />
  </>
);

function GoggledInventor() {
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

function AirshipPirate() {
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

function SmogBaron() {
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

function BackAlleySurgeon() {
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

function ApprenticeTinker() {
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

function IndustrialMagnate() {
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

function SyndicateEnforcer() {
  return (
    <Drawing label="Drawing of a chrome-armored street boss flanked by smaller silhouettes of his payroll">
      <g opacity="0.5">
        <Shape d="M30 100 C30 76 70 76 70 100 V120 H30 Z M30 120 H70 V200 H30 Z" w={3} />
        <Shape d="M330 100 C330 76 370 76 370 100 V120 H330 Z M330 120 H370 V200 H330 Z" w={3} />
      </g>
      <Shape d="M166 76 C160 28 240 28 234 76 L228 98 H172 Z" />
      <Line d="M180 66 H220" w={5} />
      <Dot x={190} y={66} r={0} />
      <Shape d="M112 106 L150 98 H250 L288 106 L282 140 H118 Z" />
      <Shape d="M148 140 H252 L260 190 H140 Z" />
      <Line d="M200 98 V190 M164 160 H236" w={3} />
      <Line d="M130 130 L100 170 M270 130 L300 170" w={11} />
      <Shape d="M148 190 H196 V226 H148 Z M204 190 H252 V226 H204 Z" w={4} />
      <Line d="M180 56 l8 -10 M220 56 l-8 -10" w={3} />
    </Drawing>
  );
}

function StarforgedSquire() {
  return (
    <Drawing label="Drawing of a teenage squire in glowing runic plate struggling to hold a laser-sword">
      <Shape d="M176 84 C170 44 230 44 224 84 L220 102 H180 Z" />
      <Line d="M186 76 H214" w={4} />
      <Shape d="M130 112 L164 106 H236 L270 112 L264 138 H136 Z" />
      <Shape d="M158 138 H242 L248 184 H152 Z" />
      <Line d="M200 106 V184 M170 150 l8 8 l-8 8 M230 150 l-8 8 l8 8" w={3} />
      <Line d="M138 126 L116 170 M262 126 L296 112 L318 66" w={9} />
      <Line d="M318 66 L360 0" w={10} />
      <Line d="M318 66 L360 0" w={4} />
      <Line d="M308 76 H330" w={6} />
      <Shape d="M156 184 H196 V226 H156 Z M204 184 H244 V226 H204 Z" w={4} />
      <Line d="M300 40 q10 -8 20 0 M340 60 q8 -6 16 0" w={3} dash="2 4" />
    </Drawing>
  );
}

function AstralArchmage() {
  return (
    <Drawing label="Drawing of a robed sorcerer with a halo of orbiting moons bending starlight into a spell">
      <circle cx="200" cy="70" r="70" fill="none" {...ink} strokeWidth={2} strokeDasharray="3 6" />
      <circle cx="140" cy="40" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="270" cy="50" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="250" cy="116" r="12" fill={card} {...ink} strokeWidth={3} />
      <circle cx="150" cy="110" r="6" fill="currentColor" />
      <Shape d="M174 70 C170 36 230 36 226 70 C230 96 170 96 174 70 Z" />
      <Dot x={188} y={66} r={3} />
      <Dot x={212} y={66} r={3} />
      <Shape d="M150 100 H250 L284 224 H116 Z" />
      <Line d="M200 100 V224" w={3} />
      <Solid d="M200 140 l5 12 l12 1 l-9 8 l3 12 l-11 -7 l-11 7 l3 -12 l-9 -8 l12 -1 Z" />
      <Line d="M158 112 L116 90 M242 112 L284 130 L320 120" w={6} />
      <Line d="M320 120 q20 -10 40 0 M320 120 q16 -20 34 -26 M320 120 q16 12 34 14" w={3} dash="3 5" />
    </Drawing>
  );
}

function IronCrusadeLord() {
  return (
    <Drawing label="Drawing of a towering warrior in ancient power armor shouting, with a banner and a sword">
      <Line d="M340 10 V224" w={5} />
      <Shape d="M340 14 H390 V74 L365 60 L340 74 Z" w={4} />
      <Line d="M352 30 H378" w={3} />
      <Shape d="M168 76 C162 28 238 28 232 76 L226 98 H174 Z" />
      <Line d="M180 66 H220" w={5} />
      <Shape d="M110 108 L150 100 H250 L290 108 L284 140 H116 Z" />
      <Solid d="M116 108 l-10 -22 l24 16 Z M284 108 l10 -22 l-24 16 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Line d="M200 100 V190 M160 160 H240" w={3} />
      <Line d="M130 126 L100 80 L112 46 M270 126 L300 150 L330 100" w={12} />
      <Line d="M112 46 L130 0" w={6} />
      <Shape d="M146 190 H198 V226 H146 Z M202 190 H254 V226 H202 Z" w={4} />
      <Line d="M60 60 l12 -6 M50 90 l18 0 M60 120 l12 6" w={3} />
    </Drawing>
  );
}

function BrassWarlord() {
  return (
    <Drawing label="Drawing of a general in a clanking exosuit commanding a row of small mechanical troops">
      <Shape d="M150 80 C146 40 254 40 250 80 L244 108 H156 Z" />
      <Line d="M170 76 H230" w={5} />
      <Dot x={188} y={76} r={3} />
      <Dot x={212} y={76} r={3} />
      <Line d="M200 40 V22 M186 22 H214" w={4} />
      <Shape d="M96 116 H304 L316 200 H84 Z" />
      <Shape d="M70 110 H110 V150 H70 Z M290 110 H330 V150 H290 Z" w={5} />
      <circle cx="200" cy="158" r="26" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 138 V158 L214 164" w={3} />
      <Line d="M90 150 L56 190 M310 150 L344 170 L376 140" w={13} />
      <Shape d="M110 200 H190 V226 H110 Z M210 200 H290 V226 H210 Z" w={5} />
      <Line d="M376 140 L396 120" w={4} />
      {[26, 52].map((x) => (
        <g key={x}><Shape d={`M${x} 170 h18 v30 h-18 Z`} w={3} /><Shape d={`M${x + 2} 150 h14 v20 h-14 Z`} w={3} /></g>
      ))}
    </Drawing>
  );
}

function ChimneyUrchin() {
  return (
    <Drawing label="Drawing of a soot-covered child climbing up a factory chimney with a bag of stolen parts">
      <Shape d="M220 224 L240 20 H320 L340 224 Z" w={5} />
      <Line d="M232 70 H328 M228 120 H332 M224 170 H336" w={3} />
      <Line d="M240 20 L236 4 M320 20 L324 4" w={4} />
      <Shape d="M160 96 C154 66 202 66 198 96 C200 114 160 114 160 96 Z" />
      <Dot x={172} y={92} r={3} />
      <Dot x={186} y={92} r={3} />
      <Line d="M170 102 q8 6 16 0" w={2} />
      <Line d="M162 74 l-6 -10 M180 70 l0 -12 M196 74 l8 -8" w={3} />
      <Shape d="M150 118 H206 L212 170 H144 Z" />
      <Line d="M206 124 L246 150 M150 126 L130 160" w={6} />
      <Shape d="M110 150 H150 L146 196 H114 Z" w={4} />
      <Line d="M124 150 q6 -18 12 0" w={3} />
      <Line d="M160 170 L150 210 M200 170 L226 200 L240 190" w={7} />
      <Ground y={226} x2={220} />
    </Drawing>
  );
}

function CyberSamuraiChampion() {
  return (
    <Drawing label="Drawing of a chrome-plated blade master in an open street, katana drawn, neon signs behind">
      <Shape d="M20 20 H100 V60 H20 Z M300 30 H380 V64 H300 Z" w={4} />
      <Line d="M30 40 H90 M310 46 H370" w={3} dash="5 4" />
      <Shape d="M166 76 C160 30 240 30 234 76 L226 98 H174 Z" />
      <Shape d="M156 52 L200 30 L244 52 Z" w={4} />
      <Line d="M180 74 H220" w={5} />
      <Shape d="M114 108 L150 100 H250 L286 108 L280 136 H120 Z" />
      <Shape d="M150 136 H250 L258 190 H142 Z" />
      <Line d="M200 100 V190 M154 160 H246" w={3} />
      <Line d="M138 124 L110 150 L132 170 M262 124 L296 106 L310 70" w={9} />
      <Line d="M300 90 L384 8" w={4} />
      <Line d="M300 90 L384 8" w={2} />
      <Line d="M290 84 H316" w={6} />
      <Shape d="M148 190 H196 V226 H148 Z M204 190 H252 V226 H204 Z" w={4} />
    </Drawing>
  );
}

function BumblingGuardsman() {
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

function BoilerhouseMender() {
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

function StarLanternHealer() {
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

function HullBreakerGrunt() {
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

function SmugglerSparker() {
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

function VendingMachineMimic() {
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

function SewerVatHorror() {
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

function BoilerbackWyrm() {
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

function AlleySlime() {
  return (
    <Drawing label="Drawing of a glowing puddle of runoff that has climbed a wall and swallowed a shoe">
      <Shape d="M240 20 H390 V224 H240 Z" w={4} />
      <Line d="M240 60 H390 M240 120 H390 M240 180 H390" w={2} dash="6 6" />
      <Shape d="M30 224 C30 190 120 170 190 180 C230 130 260 130 270 100 C280 60 330 60 330 100 C330 130 300 150 300 180 C320 190 380 200 380 224 Z" />
      <circle cx="310" cy="96" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={310} y={98} r={3} />
      <circle cx="100" cy="200" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="210" cy="206" r="8" fill="none" {...ink} strokeWidth={3} />
      <Shape d="M130 196 C130 176 180 176 184 190 V204 H130 Z" w={4} />
      <Line d="M150 190 H170" w={2} />
      <Line d="M60 214 q10 -8 20 0 M320 216 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function BoilerNewt() {
  return (
    <Drawing label="Drawing of a salamander in a warm pipe hissing scalding steam when cornered">
      <Shape d="M0 120 H400 V170 H0 Z" w={5} />
      <Line d="M60 120 V170 M340 120 V170" w={4} />
      <Shape d="M140 120 C130 70 210 60 250 90 C290 80 330 100 330 120 Z" />
      <Dot x={190} y={96} r={4} />
      <Dot x={226} y={92} r={4} />
      <Line d="M180 108 Q208 120 236 108" w={3} />
      <Line d="M150 120 L136 100 M300 118 L318 100" w={6} />
      <Line d="M330 112 C360 100 370 80 392 84" w={7} />
      <Line d="M180 120 l-2 -8 M200 120 l-2 -8 M222 120 l-2 -8 M244 120 l-2 -8" w={3} />
      <Steam x={180} y={64} />
      <Steam x={250} y={60} />
      <Line d="M150 170 v20 M250 170 v20" w={6} />
    </Drawing>
  );
}

function TunnelSpawn() {
  return (
    <Drawing label="Drawing of toothy larval horrors crawling in a swarm out of a hull breach">
      <Shape d="M0 0 H140 L110 80 L150 110 L100 150 L140 224 H0 Z" w={5} />
      <Line d="M20 40 H100 M20 100 H70 M20 160 H90" w={2} />
      {[[190, 100], [250, 140], [310, 90], [220, 190], [300, 190], [350, 150]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 23) % 40 - 20})`}>
          <Shape d="M-30 0 C-30 -16 20 -16 24 0 C20 14 -30 14 -30 0 Z" w={4} />
          <Shape d="M18 -6 C30 -10 38 -4 38 0 C38 6 30 10 18 6 Z" w={3} />
          <Solid d="M22 -3 l3 4 l3 -4 Z M22 3 l3 -4 l3 4 Z" />
          <Dot x={4} y={-3} r={2} />
          <Line d="M-18 -6 V6 M-8 -7 V7 M2 -6 V6" w={2} />
        </g>
      ))}
    </Drawing>
  );
}

function WarpBehemoth() {
  return (
    <Drawing label="Drawing of a twisted tower of flesh and warp-light tearing holes in reality as it moves">
      <path d="M140 224 C100 160 180 150 140 100 C110 60 190 60 170 20 C230 20 250 60 230 100 C290 130 240 170 280 224 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="190" cy="70" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={190} y={72} r={6} />
      <circle cx="226" cy="120" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={226} y={122} r={4} />
      <circle cx="170" cy="150" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={152} r={4} />
      <Shape d="M180 186 Q210 214 240 186 Z" w={4} />
      <Line d="M150 110 L90 90 L70 50 M250 130 L310 110 L330 70" w={10} />
      <Line d="M40 130 L80 140 L60 170 L100 176 M360 150 L320 160 L340 190 L300 194" w={3} />
      <Line d="M30 60 l12 12 M360 40 l-10 14 M20 200 l16 -6" w={3} dash="2 4" />
      <ellipse cx="60" cy="200" rx="18" ry="6" fill="none" {...ink} strokeWidth={3} />
      <ellipse cx="340" cy="210" rx="18" ry="6" fill="none" {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function BiolabEscapee() {
  return (
    <Drawing label="Drawing of a failed corporate experiment with far too many limbs on a body meant to have two">
      <Shape d="M166 76 C160 34 240 34 234 76 C240 100 160 100 166 76 Z" />
      <Dot x={184} y={70} r={4} />
      <Dot x={216} y={70} r={4} />
      <Dot x={200} y={56} r={3} />
      <Line d="M180 88 Q200 98 220 88" w={3} />
      <Shape d="M150 106 H250 L258 190 H142 Z" />
      <Line d="M156 112 L110 96 L90 60 M158 126 L100 134 L70 120 M160 142 L112 170 L84 160 M244 112 L290 96 L310 60 M242 126 L300 134 L330 120 M240 142 L288 170 L316 160" w={6} />
      <Line d="M166 190 L150 224 M200 190 V226 M234 190 L250 224 M180 190 L170 226 M220 190 L230 226" w={6} />
      <Shape d="M60 150 h14 v10 h-14 Z M326 150 h14 v10 h-14 Z" w={3} />
      <Line d="M170 140 q30 14 60 0" w={3} />
    </Drawing>
  );
}

function OilSlickCrawler() {
  return (
    <Drawing label="Drawing of a pool of living oil sliding under a door and about to ignite">
      <Shape d="M240 20 H320 V224 H240 Z" w={5} />
      <Line d="M240 150 H320" w={3} />
      <Shape d="M20 224 C20 190 100 180 170 190 C220 200 250 196 290 190 C340 184 380 200 380 224 Z" />
      <circle cx="110" cy="206" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="160" cy="210" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={110} y={206} r={3} />
      <Dot x={160} y={210} r={2} />
      <Line d="M170 190 C200 170 230 170 250 190" w={9} />
      <Line d="M270 190 C290 150 300 140 330 150 C350 156 340 180 334 190" w={9} />
      <Solid d="M340 130 C330 110 346 100 350 84 C360 100 370 112 358 130 C352 136 344 136 340 130 Z" />
      <Line d="M20 214 h14 M380 218 h-10" w={3} dash="3 3" />
    </Drawing>
  );
}

function FurnaceMaw() {
  return (
    <Drawing label="Drawing of a fat coal-eating worm in a factory furnace spitting cinders at an intruder">
      <Shape d="M20 20 H380 V224 H20 Z" w={5} />
      <Shape d="M50 60 H350 V224 H50 Z" w={4} />
      <Shape d="M90 224 C90 160 130 120 200 120 C270 120 310 160 310 224 Z" />
      <Line d="M110 190 q90 14 180 0 M104 160 q96 14 192 0" w={3} />
      <ellipse cx="200" cy="130" rx="46" ry="22" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="130" rx="24" ry="10" fill="currentColor" />
      <Solid d="M162 124 l6 8 l6 -8 Z M182 118 l6 8 l6 -8 Z M206 118 l6 8 l6 -8 Z M226 124 l6 8 l6 -8 Z" />
      <Line d="M120 90 l-6 -18 M160 80 l-2 -20 M240 80 l4 -22 M290 90 l10 -16 M80 110 l-14 -6" w={3} dash="2 4" />
      <Line d="M40 224 H360" w={3} />
      <Shape d="M340 190 l16 -24 l16 24 Z" w={3} />
    </Drawing>
  );
}

function GrotGobbler() {
  return (
    <Drawing label="Drawing of a fat dopey creature that swallows anything shiny and burps up a grenade">
      <Shape d="M90 190 C60 120 140 70 200 76 C270 82 330 130 310 190 Z" />
      <Shape d="M240 100 C240 76 290 76 292 100 C294 126 244 130 240 100 Z" />
      <Dot x={262} y={92} r={5} />
      <Dot x={278} y={94} r={5} />
      <Shape d="M246 112 Q268 140 290 112 Z" w={4} />
      <Shape d="M262 116 h12 v10 h-12 Z" w={3} />
      <Line d="M300 112 C330 100 340 70 360 66" w={4} dash="3 4" />
      <circle cx="366" cy="60" r="10" fill={card} {...ink} strokeWidth={4} />
      <Line d="M366 50 V42" w={3} />
      <Line d="M130 150 q30 20 70 0" w={3} />
      <Shape d="M150 110 a8 8 0 1 0 0.1 0 Z M180 130 a6 6 0 1 0 0.1 0 Z" w={3} />
      <Line d="M110 190 V224 M170 194 V224 M250 194 V224 M290 190 V224" w={11} />
      <Line d="M80 100 q-10 -10 -4 -22" w={3} dash="2 4" />
    </Drawing>
  );
}

function SkyPikeBrood() {
  return (
    <Drawing label="Drawing of a flock of armored sky-fish bred to pierce hulls, trailing a mother larger than a gunship">
      <Shape d="M20 100 C60 40 220 30 300 80 L384 110 L300 140 C220 190 60 170 20 100 Z" />
      <Line d="M80 70 V130 M130 56 V146 M180 54 V150 M230 62 V142" w={3} />
      <Shape d="M300 80 L384 110 L300 140 Z" w={4} />
      <Dot x={270} y={92} r={5} />
      <Shape d="M120 50 L150 10 L170 56 Z M120 150 L150 190 L170 146 Z" w={4} />
      {[[250, 190, 0.8], [310, 210, 0.6], [180, 214, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-30 0 C-20 -14 20 -14 36 0 C20 14 -20 14 -30 0 Z" w={5} />
          <Line d="M36 0 L70 0" w={4} />
          <Shape d="M-30 0 L-46 -12 L-46 12 Z" w={4} />
          <Dot x={16} y={-3} r={2.5} />
        </g>
      ))}
    </Drawing>
  );
}

function SmogDrake() {
  return (
    <Drawing label="Drawing of a pollution-black drake nesting in the exhaust vent of a mega-tower, wheezing toxic breath">
      <Shape d="M240 20 H390 V224 H240 Z" w={4} />
      {Array.from({ length: 8 }, (_, i) => (
        <Line key={i} d={`M240 ${50 + i * 22} H390`} w={2} />
      ))}
      <Shape d="M250 130 H310 V170 H250 Z" w={4} />
      <Line d="M258 140 H302 M258 150 H302 M258 160 H302" w={2} />
      <Shape d="M60 150 C60 100 160 90 200 120 C230 140 250 150 280 140 L286 160 C240 180 190 176 150 170 C110 170 60 180 60 150 Z" />
      <Shape d="M110 114 C90 70 50 50 20 60 C40 80 40 100 50 120 Z" w={4} />
      <Shape d="M196 112 C200 80 240 70 270 84 L300 104 L250 118 Z" />
      <Dot x={256} y={92} r={4} />
      <Line d="M300 100 C330 90 350 70 380 76 M300 108 C330 108 350 100 386 110" w={9} dash="4 4" />
      <Line d="M100 170 V200 M150 172 V200" w={7} />
    </Drawing>
  );
}

function GutterHag() {
  return (
    <Drawing label="Drawing of a hunched creature in the sewer dragging a passerby down a drain with a long arm">
      <Shape d="M0 150 H400 V230 H0 Z" w={4} />
      <ellipse cx="300" cy="150" rx="60" ry="12" fill={card} {...ink} strokeWidth={4} />
      <Line d="M250 150 H350" w={2} />
      <Shape d="M110 120 C80 70 150 40 190 70 C220 100 200 140 170 150 Z" />
      <Dot x={140} y={90} r={4} />
      <Dot x={166} y={92} r={4} />
      <Line d="M138 112 Q154 124 170 108" w={3} />
      <Line d="M120 56 C110 40 120 24 134 28 M180 54 C190 38 204 36 210 46" w={4} />
      <Shape d="M110 120 C100 170 130 200 170 190 C200 170 190 140 170 150 Z" w={5} />
      <Line d="M190 100 C230 100 270 120 300 140" w={9} />
      <Shape d="M290 120 l8 -10 l6 8 l6 -10 l6 12 Z" w={3} />
      <Shape d="M310 70 C306 54 330 54 330 70 V90 H310 Z" w={3} />
      <Line d="M316 90 V120 M326 90 V120" w={4} />
      <Line d="M20 190 q15 -8 30 0 t30 0 t30 0 t30 0" w={3} />
    </Drawing>
  );
}

function ChromeGargoyle() {
  return (
    <Drawing label="Drawing of a polished chrome winged guard-beast diving off a corporate tower at an intruder">
      <Shape d="M300 140 H390 V224 H300 Z" w={4} />
      <Line d="M300 160 H390 M300 190 H390" w={2} />
      <Shape d="M180 100 C150 60 90 40 40 54 C70 72 76 96 70 120 C110 108 150 110 180 126 Z" />
      <Shape d="M220 100 C250 60 310 40 360 54 C330 72 324 96 330 120 C290 108 250 110 220 126 Z" />
      <Shape d="M176 80 C170 44 230 44 224 80 C230 108 170 108 176 80 Z" />
      <Shape d="M182 52 L170 24 L196 44 Z M218 52 L230 24 L204 44 Z" w={4} />
      <Dot x={190} y={74} r={4} />
      <Dot x={210} y={74} r={4} />
      <Solid d="M190 92 l4 8 l6 -6 l6 6 l4 -8 Z" />
      <Shape d="M176 108 H224 L216 170 H184 Z" />
      <Line d="M184 170 L164 204 L146 200 M216 170 L240 204 L258 200" w={7} />
      <Line d="M146 200 l-8 8 M258 200 l8 8" w={4} />
      <Line d="M110 180 l20 20 M280 120 l24 -6" w={3} dash="4 4" />
    </Drawing>
  );
}

export const restHumanoidsMonstersArt: Record<string, () => ReactNode> = {
  "goggled-inventor": GoggledInventor,
  "airship-pirate": AirshipPirate,
  "smog-baron": SmogBaron,
  "back-alley-surgeon": BackAlleySurgeon,
  "apprentice-tinker": ApprenticeTinker,
  "industrial-magnate": IndustrialMagnate,
  "syndicate-enforcer": SyndicateEnforcer,
  "starforged-squire": StarforgedSquire,
  "astral-archmage": AstralArchmage,
  "iron-crusade-lord": IronCrusadeLord,
  "brass-warlord": BrassWarlord,
  "chimney-urchin": ChimneyUrchin,
  "cyber-samurai-champion": CyberSamuraiChampion,
  "bumbling-guardsman": BumblingGuardsman,
  "boilerhouse-mender": BoilerhouseMender,
  "star-lantern-healer": StarLanternHealer,
  "hull-breaker-grunt": HullBreakerGrunt,
  "smuggler-sparker": SmugglerSparker,
  "vending-machine-mimic": VendingMachineMimic,
  "sewer-vat-horror": SewerVatHorror,
  "boilerback-wyrm": BoilerbackWyrm,
  "alley-slime": AlleySlime,
  "boiler-newt": BoilerNewt,
  "tunnel-spawn": TunnelSpawn,
  "warp-behemoth": WarpBehemoth,
  "biolab-escapee": BiolabEscapee,
  "oil-slick-crawler": OilSlickCrawler,
  "furnace-maw": FurnaceMaw,
  "grot-gobbler": GrotGobbler,
  "sky-pike-brood": SkyPikeBrood,
  "smog-drake": SmogDrake,
  "gutter-hag": GutterHag,
  "chrome-gargoyle": ChromeGargoyle,
};
