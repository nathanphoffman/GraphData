import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

/** Shared hound silhouette: rail-thin body in profile facing right. */
export function HoundBody({ eye = "dot" }: { eye?: "dot" | "ring" }) {
  return (
    <>
      <Shape d="M90 160 C80 120 130 104 190 108 C240 110 266 128 262 160 L250 170 H110 Z" />
      <Shape d="M240 124 L246 88 L262 104 L296 104 L318 92 L322 128 C322 148 246 150 240 124 Z" />
      {eye === "dot" ? <Dot x={282} y={116} r={4} /> : <circle cx="282" cy="116" r="7" fill={card} {...ink} strokeWidth={3} />}
      {eye === "ring" && <Dot x={282} y={116} r={3} />}
      <Solid d="M318 114 L334 120 L318 130 Z" />
      <Line d="M104 170 V214 M134 172 V214 M226 172 V214 M252 170 V214" w={6} />
      <Line d="M92 138 C60 138 50 110 64 94" w={5} />
      <Line d="M130 112 l4 10 M150 108 l4 10 M170 108 l4 10 M190 108 l4 10" w={3} />
    </>
  );
}

export function MidnightRadio() {
  return (
    <Drawing label="Drawing of an old wooden radio with a glowing dial and curling sound waves">
      <Shape d="M90 80 H310 V204 H90 Z" />
      <Shape d="M110 100 H220 V184 H110 Z" w={4} />
      <Line d="M124 114 H206 M124 130 H206 M124 146 H206 M124 162 H206 M124 176 H206" w={2} />
      <circle cx="262" cy="118" r="18" fill={card} {...ink} strokeWidth={4} />
      <Line d="M262 118 L272 108" w={3} />
      <circle cx="262" cy="170" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M262 170 L256 162" w={3} />
      <Line d="M230 100 H296" w={3} />
      <Line d="M180 80 L130 30 M230 80 L290 24" w={4} />
      <Line d="M320 110 q22 20 0 50 M342 94 q34 36 0 82" w={3} />
      <Line d="M110 204 V222 M290 204 V222" w={7} />
      <Line d="M40 50 q10 -8 20 0 q10 8 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function MannequinButler() {
  return (
    <Drawing label="Drawing of a stiff mannequin in a tailcoat carrying a tea tray">
      <circle cx="200" cy="56" r="26" fill={card} {...ink} />
      <Line d="M190 56 H194 M206 56 H210" w={3} />
      <Line d="M200 82 V92" w={6} />
      <Shape d="M156 100 H244 L254 190 H146 Z" />
      <Line d="M200 100 V190" w={3} />
      <Shape d="M186 100 L200 130 L214 100 Z" w={3} />
      <Shape d="M146 190 L134 222 H176 L190 190 Z M254 190 L266 222 H224 L210 190 Z" w={4} />
      <Line d="M156 110 L120 150 L150 158 M244 110 L286 134" w={6} />
      <Line d="M270 138 H340" w={5} />
      <Shape d="M290 114 H320 L316 138 H294 Z" w={4} />
      <Line d="M320 122 q10 0 8 8 q-2 6 -10 4" w={3} />
      <Line d="M300 106 q-6 -8 2 -14 M312 106 q-6 -8 2 -14" w={3} dash="2 5" />
      <Ground y={226} />
    </Drawing>
  );
}

export function PossessedTypewriter() {
  return (
    <Drawing label="Drawing of a black typewriter typing a list of names by itself">
      <Shape d="M80 130 H320 L340 214 H60 Z" />
      <Shape d="M110 100 H290 V130 H110 Z" w={4} />
      <Shape d="M140 40 H260 V100 H140 Z" w={3} />
      <Line d="M156 56 H236 M156 70 H224 M156 84 H244" w={3} />
      <Line d="M120 100 V86 M280 100 V86" w={5} />
      <circle cx="104" cy="86" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="296" cy="86" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M96 158 H304 M104 178 H296 M112 198 H288" w={2} dash="2 14" />
      <circle cx="126" cy="158" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="170" cy="158" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="158" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="258" cy="158" r="7" fill={card} {...ink} strokeWidth={3} />
      <Line d="M190 190 H210" w={6} />
      <Shape d="M280 214 q14 -20 40 -8 l10 8 Z" w={3} />
    </Drawing>
  );
}

export function CursedHearse() {
  return (
    <Drawing label="Drawing of a driverless black hearse with curtained windows pulling up to a gate">
      <Shape d="M40 180 V120 H290 L350 140 V180 Z" />
      <Shape d="M60 128 H280 V160 H60 Z" w={4} />
      <Line d="M90 128 V160 M130 128 V160 M170 128 V160 M210 128 V160 M250 128 V160" w={3} />
      <Shape d="M290 124 L342 142 H290 Z" w={3} />
      <circle cx="110" cy="184" r="24" fill={card} {...ink} />
      <circle cx="110" cy="184" r="8" fill="currentColor" />
      <circle cx="290" cy="184" r="24" fill={card} {...ink} />
      <circle cx="290" cy="184" r="8" fill="currentColor" />
      <Line d="M40 140 H20 M40 160 H20" w={4} />
      <Line d="M346 160 l24 -6 M346 168 l24 4" w={4} />
      <Solid d="M360 150 L380 150 L370 162 Z" />
      <Line d="M130 100 V84 M160 100 V84 M190 100 V84 M220 100 V84 M250 100 V84" w={3} />
      <Line d="M130 84 H250" w={3} />
      <Line d="M20 218 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

export function WaxworkStalker() {
  return (
    <Drawing label="Drawing of a life-sized wax figure with a glassy stare and slightly melted features">
      <Shape d="M166 80 C160 30 240 30 234 80 C234 106 166 106 166 80 Z" />
      <Line d="M170 60 Q200 40 230 58" w={4} />
      <circle cx="186" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={76} r={3} />
      <Dot x={214} y={76} r={3} />
      <Line d="M190 94 H210" w={3} />
      <Line d="M180 106 q-2 10 2 16 M222 104 q2 8 -2 14" w={3} />
      <Shape d="M156 120 H244 L256 196 H144 Z" />
      <Line d="M200 120 V196" w={3} />
      <Line d="M160 128 L130 170 L120 188 M240 128 L270 150 L300 140" w={6} />
      <Line d="M170 196 V222 M230 196 V222" w={8} />
      <Shape d="M140 222 H260 V230 H140 Z" w={3} />
      <Line d="M190 112 q-4 14 2 22 M236 160 q2 10 -2 18" w={3} dash="2 4" />
    </Drawing>
  );
}

export function HauntedUmbrella() {
  return (
    <Drawing label="Drawing of a black umbrella open in a doorway with two eyes under the canopy">
      <Shape d="M240 30 H370 V224 H240 Z" w={4} />
      <Line d="M300 30 V224" w={2} />
      <Shape d="M60 120 C60 40 260 40 260 120 Q240 104 220 120 Q200 104 180 120 Q160 104 140 120 Q120 104 100 120 Q80 104 60 120 Z" />
      <Line d="M160 52 L130 116 M160 52 L190 116 M160 52 L100 112 M160 52 L220 112" w={3} />
      <Line d="M160 120 V196 q0 24 -26 24 q-12 0 -12 -12" w={6} />
      <circle cx="132" cy="92" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="190" cy="92" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={134} y={94} r={3} />
      <Dot x={192} y={94} r={3} />
      <Line d="M160 32 V20" w={5} />
      <Line d="M30 150 q10 8 20 0 M20 176 q10 8 20 0" w={3} dash="2 6" />
      <Ground y={228} />
    </Drawing>
  );
}

export function GraveShiftGurney() {
  return (
    <Drawing label="Drawing of a hospital gurney with a draped sheet rolling down a corridor on its own">
      <Line d="M20 214 H380 M20 60 H380" w={3} />
      <Shape d="M90 130 H310 V150 H90 Z" />
      <Shape d="M110 100 C130 70 270 70 290 100 L300 130 H100 Z" />
      <Line d="M130 100 q20 -10 40 0 M200 96 q20 -10 40 0" w={3} />
      <Line d="M120 150 V190 M280 150 V190" w={6} />
      <circle cx="120" cy="198" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="280" cy="198" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M90 130 L70 110 M310 130 L340 114" w={6} />
      <Line d="M326 110 V94 M326 94 H350" w={5} />
      <Line d="M40 160 H70 M30 176 H64 M44 192 H72" w={3} />
      <Shape d="M316 30 H376 V56 H316 Z" w={3} />
      <Line d="M324 43 H368" w={2} />
    </Drawing>
  );
}
