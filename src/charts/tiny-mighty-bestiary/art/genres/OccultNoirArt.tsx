import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../core/artStyle";

const card = CARD_COLOR;

/** Shared hound silhouette: rail-thin body in profile facing right. */
function HoundBody({ eye = "dot" }: { eye?: "dot" | "ring" }) {
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

function MidnightRadio() {
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

function MannequinButler() {
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

function PossessedTypewriter() {
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

function CursedHearse() {
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

function WaxworkStalker() {
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

function HauntedUmbrella() {
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

function GraveShiftGurney() {
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

function VoidHound() {
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

function LibrarySilverfish() {
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

function CrowInformant() {
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

function GraveyardHound() {
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

function HellhoundStalker() {
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

function OverdramaticRaven() {
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

function BarghestWarden() {
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

function RobedCultist() {
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

function CultMagister() {
  return (
    <Drawing label="Drawing of a bald tattooed leader reading from a bleeding book">
      <Shape d="M166 80 C160 30 240 30 234 80 C234 108 166 108 166 80 Z" />
      <Line d="M180 44 q20 -10 40 0 M176 56 l10 -8 M224 56 l-10 -8 M200 36 v10" w={3} />
      <circle cx="186" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <Line d="M192 96 H208" w={3} />
      <Shape d="M150 116 C150 106 250 106 250 116 L270 224 H130 Z" />
      <Line d="M200 116 V224" w={3} />
      <Shape d="M160 140 L200 130 L240 140 V186 L200 176 L160 186 Z" />
      <Line d="M200 130 V176" w={3} />
      <Line d="M170 150 H192 M170 160 H190 M208 150 H232 M208 160 H228" w={2} />
      <Line d="M180 186 V210 M184 186 V200 M220 186 V214" w={3} />
      <Line d="M156 126 L150 150 M244 126 L250 150" w={6} />
      <Shape d="M175 218 q5 -8 10 0 q-5 8 -10 0 Z" w={2} />
    </Drawing>
  );
}

function EagerCultist() {
  return (
    <Drawing label="Drawing of a cheerful new cultist in an oversized robe holding a clipboard and wearing a nametag">
      <Shape d="M150 100 C140 30 260 30 250 100 L240 128 H160 Z" />
      <path d="M170 100 C170 74 230 74 230 100 C230 116 170 116 170 100 Z" fill={card} stroke="currentColor" strokeWidth="4" />
      <Dot x={188} y={96} r={3} />
      <Dot x={212} y={96} r={3} />
      <Line d="M184 106 Q200 118 216 106" w={3} />
      <Shape d="M150 126 H250 L290 224 H110 Z" />
      <Shape d="M162 148 H196 V166 H162 Z" w={3} />
      <Line d="M168 157 H190" w={2} />
      <Line d="M232 134 L276 150 L300 112" w={6} />
      <Shape d="M290 66 H344 V124 H290 Z" w={4} />
      <Line d="M300 82 H334 M300 94 H334 M300 106 H322" w={2} />
      <Shape d="M310 60 H326 V70 H310 Z" w={3} />
      <Line d="M160 134 L134 168" w={6} />
      <Line d="M110 110 l-10 -4 M110 90 l-12 -10 M130 70 l-6 -12" w={3} />
    </Drawing>
  );
}

function CurioDealer() {
  return (
    <Drawing label="Drawing of a bespectacled shopkeeper behind a cluttered counter, holding out a wooden box">
      <Shape d="M30 150 H370 V224 H30 Z" />
      <Shape d="M40 60 H110 V150 H40 Z" w={3} />
      <Line d="M40 90 H110 M40 120 H110" w={3} />
      <circle cx="64" cy="78" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M84 112 V90 H98 V112" w={3} />
      <Shape d="M166 76 C162 30 238 30 234 76 C234 102 166 102 166 76 Z" />
      <circle cx="186" cy="74" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="214" cy="74" r="10" fill="none" {...ink} strokeWidth={3} />
      <Line d="M196 74 H204" w={3} />
      <Line d="M190 92 Q200 98 210 92" w={3} />
      <Shape d="M158 104 H242 L250 150 H150 Z" />
      <Line d="M242 124 L276 140" w={6} />
      <Shape d="M270 126 H330 V148 H270 Z" w={4} />
      <Line d="M270 134 H330 M298 126 V136" w={3} />
      <Line d="M60 170 h40 M120 180 h30 M300 176 h40" w={3} />
      <circle cx="334" cy="108" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M334 98 V84" w={3} />
    </Drawing>
  );
}

function TeaRoomMedium() {
  return (
    <Drawing label="Drawing of a kindly widow at a round table with a crystal ball and a teapot, a faint second shape behind her">
      <Line d="M110 70 C100 140 120 190 160 200" w={3} dash="3 8" />
      <Shape d="M156 72 C150 24 230 24 224 72 C224 98 156 98 156 72 Z" />
      <Line d="M156 64 C170 40 210 40 224 64" w={4} />
      <Dot x={176} y={70} r={3} />
      <Dot x={204} y={70} r={3} />
      <Line d="M180 84 Q190 92 202 84" w={3} />
      <Shape d="M150 100 H230 L250 170 H130 Z" />
      <Line d="M190 100 V170" w={3} />
      <Shape d="M60 170 H340 V184 H60 Z" />
      <Line d="M190 184 V224 M120 184 V224 M260 184 V224" w={7} />
      <circle cx="270" cy="148" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M258 142 q8 -10 18 -4" w={3} />
      <Shape d="M258 170 H282 V164 H258 Z" w={3} />
      <Shape d="M100 150 H130 V170 H100 Z" w={4} />
      <Line d="M100 156 q-14 0 -12 8 q2 6 12 4" w={3} />
      <Line d="M106 146 q-6 -8 2 -14" w={3} dash="2 5" />
      <Line d="M330 60 q10 -10 20 0 M340 90 q10 -10 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

function CultInquisitor() {
  return (
    <Drawing label="Drawing of a pale investigator in a long coat holding a ledger and a silver knife">
      <Shape d="M156 62 H244 L236 30 H164 Z" />
      <Line d="M142 64 H258" w={6} />
      <Shape d="M168 70 H232 V102 C232 120 168 120 168 102 Z" />
      <Line d="M182 84 H194 M206 84 H218" w={4} />
      <Line d="M190 104 H210" w={3} />
      <Shape d="M150 124 H250 L270 224 H130 Z" />
      <Line d="M200 124 V224" w={3} />
      <Shape d="M168 124 L200 160 L232 124 Z" w={3} />
      <Line d="M232 134 L270 156" w={6} />
      <Solid d="M268 150 L290 100 L300 154 Z" />
      <Line d="M262 156 H304" w={5} />
      <Line d="M168 134 L130 160" w={6} />
      <Shape d="M96 140 H148 V190 H96 Z" w={4} />
      <Line d="M106 154 H138 M106 164 H138 M106 174 H128" w={2} />
    </Drawing>
  );
}

function MidnightKingpin() {
  return (
    <Drawing label="Drawing of a smiling crime boss in a pinstripe suit with no shadow, a city skyline behind him">
      <Shape d="M20 224 V130 H70 V90 H110 V224 Z M290 224 V110 H340 V70 H380 V224 Z" w={3} />
      <Line d="M30 150 h30 M30 172 h30 M300 130 h30 M300 152 h30 M300 174 h30 M350 90 h20 M350 112 h20" w={2} />
      <Shape d="M156 62 H244 L236 34 H164 Z" />
      <Line d="M142 64 H258" w={6} />
      <Shape d="M168 70 H232 V102 C232 120 168 120 168 102 Z" />
      <Dot x={186} y={86} r={3} />
      <Dot x={214} y={86} r={3} />
      <Line d="M184 100 Q200 112 216 100" w={4} />
      <Shape d="M144 122 H256 L264 218 H136 Z" />
      <Line d="M200 122 V218 M160 140 V218 M176 140 V218 M224 140 V218 M240 140 V218" w={2} />
      <Shape d="M184 122 L200 150 L216 122 Z" w={3} />
      <Line d="M146 130 L124 170 M254 130 L280 156" w={7} />
      <Line d="M290 160 q8 -8 16 0" w={3} />
      <Line d="M140 224 H260" w={2} dash="3 8" />
    </Drawing>
  );
}

function NosyLandlady() {
  return (
    <Drawing label="Drawing of a small suspicious landlady with a rolling pin, eyes turned up at an attic window">
      <Shape d="M270 30 H370 V224 H270 Z" w={4} />
      <Shape d="M290 50 H350 V100 H290 Z" w={3} />
      <Line d="M320 50 V100 M290 75 H350" w={2} />
      <circle cx="320" cy="75" r="10" fill="none" {...ink} strokeWidth={2} strokeDasharray="2 4" />
      <Shape d="M130 94 C126 48 194 48 190 94 C190 120 130 120 130 94 Z" />
      <Line d="M126 80 C130 52 190 52 194 80" w={5} />
      <circle cx="146" cy="90" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="172" cy="90" r="6" fill="none" {...ink} strokeWidth={3} />
      <Dot x={148} y={87} r={2} />
      <Dot x={174} y={87} r={2} />
      <Line d="M150 108 H170" w={3} />
      <Shape d="M118 124 H202 L220 224 H100 Z" />
      <Shape d="M130 150 H190 L196 200 H124 Z" w={3} />
      <Line d="M204 138 L236 120" w={6} />
      <Shape d="M222 100 H262 V116 H222 Z" w={4} />
      <Line d="M218 108 H222 M262 108 H266" w={5} />
      <Line d="M118 140 L100 180" w={6} />
    </Drawing>
  );
}

function ParishExorcist() {
  return (
    <Drawing label="Drawing of a tired priest holding a wooden cross and a flask of holy water">
      <Shape d="M166 74 C162 28 238 28 234 74 C234 100 166 100 166 74 Z" />
      <Line d="M180 66 H194 M206 66 H220" w={4} />
      <Line d="M190 88 H210" w={3} />
      <Line d="M176 80 q-2 10 2 12 M224 80 q2 10 -2 12" w={2} />
      <Shape d="M150 102 H250 L274 224 H126 Z" />
      <Line d="M200 102 V224" w={3} />
      <Shape d="M180 102 L200 122 L220 102 Z" w={3} />
      <Line d="M240 112 L284 90 L296 50" w={6} />
      <Line d="M296 20 V84 M274 40 H318" w={7} />
      <Line d="M160 112 L130 150 L150 170" w={6} />
      <Shape d="M138 160 H164 V190 H138 Z" w={4} />
      <Line d="M144 160 V150 H158 V160" w={3} />
      <Line d="M150 196 q-4 8 0 14" w={3} dash="2 5" />
      <Line d="M340 70 l10 -4 M340 90 l12 4 M50 60 l10 6" w={3} />
    </Drawing>
  );
}

function BlackOozeMass() {
  return (
    <Drawing label="Drawing of a bubbling mass of black ooze covered in eyes and mouths">
      <Shape d="M40 220 C20 150 70 100 140 110 C170 60 250 60 270 110 C340 100 380 150 360 220 Z" />
      <circle cx="110" cy="150" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={112} y={150} r={5} />
      <circle cx="170" cy="110" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={112} r={4} />
      <circle cx="230" cy="96" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={230} y={98} r={5} />
      <circle cx="290" cy="140" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={290} y={142} r={4} />
      <circle cx="320" cy="190" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={320} y={192} r={3} />
      <circle cx="70" cy="196" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={70} y={198} r={3} />
      <Shape d="M150 170 Q200 214 250 170 Z" w={4} />
      <Solid d="M166 174 l5 12 l5 -12 Z M184 180 l5 14 l5 -14 Z M204 182 l5 14 l5 -14 Z M224 178 l5 12 l5 -12 Z" />
      <circle cx="94" cy="104" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="342" cy="104" r="6" fill="none" {...ink} strokeWidth={3} />
      <Line d="M250 40 q8 -6 14 0 M120 50 q8 -6 14 0" w={3} />
    </Drawing>
  );
}

function TentacledBellhop() {
  return (
    <Drawing label="Drawing of a nervous bellhop in a tight uniform and pillbox hat with tentacles poking out of his coat, carrying a bag">
      <Shape d="M168 56 H232 L226 30 H174 Z" />
      <Line d="M164 58 H236" w={5} />
      <Shape d="M172 64 H228 V96 C228 114 172 114 172 96 Z" />
      <circle cx="188" cy="82" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="212" cy="82" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={188} y={84} r={2} />
      <Dot x={212} y={84} r={2} />
      <Line d="M192 100 q8 -4 16 0" w={3} />
      <Shape d="M152 118 H248 L244 190 H156 Z" />
      <Dot x={200} y={134} r={3} />
      <Dot x={200} y={152} r={3} />
      <Dot x={200} y={170} r={3} />
      <Line d="M156 130 C120 130 110 160 130 170 C146 176 140 150 126 150 M246 128 C290 130 300 170 276 174 C262 176 270 152 284 156" w={5} />
      <Line d="M160 180 C120 200 110 214 126 222 M240 180 C280 200 290 214 276 222 M184 190 C170 212 176 224 190 226" w={5} />
      <Shape d="M300 150 H350 V196 H300 Z" w={4} />
      <Line d="M310 150 V140 H340 V150" w={3} />
      <Line d="M310 104 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function WallpaperThing() {
  return (
    <Drawing label="Drawing of a patch of floral wallpaper peeling off a wall to wrap around a person leaning on it">
      <Shape d="M20 20 H200 V224 H20 Z" w={4} />
      <Line d="M50 40 q10 -10 20 0 q-10 10 -20 0 Z M110 70 q10 -10 20 0 q-10 10 -20 0 Z M50 110 q10 -10 20 0 q-10 10 -20 0 Z M130 150 q10 -10 20 0 q-10 10 -20 0 Z M60 190 q10 -10 20 0 q-10 10 -20 0 Z" w={3} />
      <Line d="M60 40 v14 M120 70 v14 M60 110 v14 M140 150 v14" w={2} />
      <Shape d="M200 40 C240 50 260 90 250 130 C240 170 270 190 250 224 L200 224 Z" />
      <Line d="M214 70 q10 -10 20 0 q-10 10 -20 0 Z M214 130 q10 -10 20 0 q-10 10 -20 0 Z" w={3} />
      <Shape d="M290 100 C290 70 340 70 340 100 C340 124 290 124 290 100 Z" />
      <Dot x={306} y={96} r={3} />
      <Dot x={324} y={96} r={3} />
      <Shape d="M280 128 H350 L360 224 H270 Z" />
      <Line d="M254 110 C270 110 280 130 290 140 M254 150 C270 150 284 160 296 170" w={7} />
      <Line d="M254 130 C280 126 300 160 340 150" w={5} />
      <Line d="M370 140 l10 4 M370 120 l8 -4" w={3} />
    </Drawing>
  );
}

function DrainLeech() {
  return (
    <Drawing label="Drawing of a pale rope-thick leech sliding up out of a sewer drain">
      <Shape d="M60 200 H340 V224 H60 Z" />
      <ellipse cx="200" cy="200" rx="64" ry="14" fill={card} {...ink} />
      <Line d="M156 200 H244 M168 194 V206 M184 194 V206 M200 194 V206 M216 194 V206 M232 194 V206" w={3} />
      <Line d="M200 196 C200 150 140 150 150 110 C160 70 230 80 220 40" w={26} />
      <Line d="M200 196 C200 150 140 150 150 110 C160 70 230 80 220 40" w={18} />
      <Line d="M196 170 q10 -4 14 4 M156 140 q-6 -8 2 -14 M176 94 q10 -2 12 6" w={3} />
      <circle cx="220" cy="36" r="18" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M208 34 Q220 48 232 34 Q220 40 208 34 Z" w={3} />
      <Dot x={212} y={30} r={2} />
      <Dot x={228} y={30} r={2} />
      <Line d="M270 190 q10 -10 4 -20 M300 196 q8 -8 2 -16" w={3} dash="2 5" />
    </Drawing>
  );
}

function BasementElder() {
  return (
    <Drawing label="Drawing of a many-eyed mass under the floorboards of a house, whispering through pipes">
      <Shape d="M30 100 H370 V120 H30 Z" />
      <Line d="M70 100 V120 M130 100 V120 M190 100 V120 M250 100 V120 M310 100 V120" w={3} />
      <Shape d="M60 40 H340 V100 H60 Z" w={3} />
      <Line d="M130 100 V60 H180 V100 M220 100 V60 H270 V100" w={3} />
      <Shape d="M60 224 C40 170 100 130 160 140 C190 120 240 120 260 140 C320 130 360 170 340 224 Z" />
      <circle cx="130" cy="180" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={130} y={182} r={4} />
      <circle cx="180" cy="160" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={180} y={162} r={5} />
      <circle cx="230" cy="168" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={230} y={170} r={4} />
      <circle cx="285" cy="190" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={285} y={192} r={3} />
      <circle cx="92" cy="200" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={92} y={202} r={3} />
      <Line d="M300 120 V150 M340 120 V160" w={8} />
      <Line d="M310 140 q-8 -14 4 -24 M330 150 q-8 -14 4 -24" w={3} dash="2 5" />
      <Line d="M180 210 q20 12 40 0" w={4} />
    </Drawing>
  );
}

function BatSwarmColossus() {
  return (
    <Drawing label="Drawing of a swarm of bats forming a hulking figure in a belfry">
      <Shape d="M120 224 V70 L200 10 L280 70 V224 Z" w={4} />
      <Shape d="M170 90 H230 V120 H170 Z" w={3} />
      <circle cx="200" cy="40" r="12" fill="none" {...ink} strokeWidth={3} />
      <Line d="M200 40 V34 M200 40 H206" w={2} />
      {[
        [160, 100], [200, 80], [240, 100], [140, 130], [180, 120], [220, 120], [260, 130],
        [130, 160], [170, 156], [210, 154], [250, 158], [150, 190], [190, 186], [230, 190],
        [110, 124], [290, 124], [100, 160], [300, 160], [130, 210], [270, 210],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 14} ${y - 4} q7 -10 14 2 q7 -12 14 -2 q-7 2 -14 12 q-7 -10 -14 -8 Z`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="184" cy="64" r="4" fill={card} />
      <circle cx="216" cy="64" r="4" fill={card} />
    </Drawing>
  );
}

function BrainDrinker() {
  return (
    <Drawing label="Drawing of a robed figure with a squid for a face, tentacles reaching toward a jar holding a brain">
      <Shape d="M156 90 C150 30 250 30 244 90 C244 106 156 106 156 90 Z" />
      <circle cx="184" cy="72" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="72" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={72} r={3} />
      <Dot x={216} y={72} r={3} />
      <Line d="M172 98 C164 130 150 140 134 150 M188 102 C184 134 178 150 168 164 M212 102 C216 134 222 150 232 164 M228 98 C236 130 250 140 266 150" w={6} />
      <Shape d="M156 108 L130 224 H270 L244 108 Z" />
      <Line d="M200 120 V224" w={3} />
      <Shape d="M300 150 H356 V214 H300 Z" w={4} />
      <Shape d="M306 140 H350 V150 H306 Z" w={3} />
      <path d="M312 190 C304 170 330 160 344 170 C356 180 340 200 326 198 C316 198 316 192 312 190 Z" fill={card} stroke="currentColor" strokeWidth="3" />
      <Line d="M322 176 q6 6 0 14 M334 174 q6 8 -2 16" w={2} />
      <Line d="M270 130 q14 -4 24 8" w={3} dash="2 5" />
    </Drawing>
  );
}

function BrinyKin() {
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

function FacelessGaunt() {
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

function PaleFungoid() {
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

function StarWing() {
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

function LampPostGhoul() {
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

function SaloonSpirit() {
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

function SunkenLighthouseKeeper() {
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

function HollowMan() {
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

export const occultNoirArt: Record<string, () => ReactNode> = {
  "midnight-radio": MidnightRadio,
  "mannequin-butler": MannequinButler,
  "possessed-typewriter": PossessedTypewriter,
  "cursed-hearse": CursedHearse,
  "waxwork-stalker": WaxworkStalker,
  "haunted-umbrella": HauntedUmbrella,
  "grave-shift-gurney": GraveShiftGurney,
  "void-hound": VoidHound,
  "library-silverfish": LibrarySilverfish,
  "crow-informant": CrowInformant,
  "graveyard-hound": GraveyardHound,
  "hellhound-stalker": HellhoundStalker,
  "overdramatic-raven": OverdramaticRaven,
  "barghest-warden": BarghestWarden,
  "robed-cultist": RobedCultist,
  "cult-magister": CultMagister,
  "eager-cultist": EagerCultist,
  "curio-dealer": CurioDealer,
  "tea-room-medium": TeaRoomMedium,
  "cult-inquisitor": CultInquisitor,
  "midnight-kingpin": MidnightKingpin,
  "nosy-landlady": NosyLandlady,
  "parish-exorcist": ParishExorcist,
  "black-ooze-mass": BlackOozeMass,
  "tentacled-bellhop": TentacledBellhop,
  "wallpaper-thing": WallpaperThing,
  "drain-leech": DrainLeech,
  "basement-elder": BasementElder,
  "bat-swarm-colossus": BatSwarmColossus,
  "brain-drinker": BrainDrinker,
  "briny-kin": BrinyKin,
  "faceless-gaunt": FacelessGaunt,
  "pale-fungoid": PaleFungoid,
  "star-wing": StarWing,
  "lamp-post-ghoul": LampPostGhoul,
  "saloon-spirit": SaloonSpirit,
  "sunken-lighthouse-keeper": SunkenLighthouseKeeper,
  "hollow-man": HollowMan,
};
