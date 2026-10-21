import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "../core/artStyle";
import { Figure } from "../core/figure";

const card = "var(--b-card)";

function ChromeTrooper() {
  return (
    <Drawing label="Drawing of a white-armored soldier in a faceless helmet firing past you">
      <Figure arms={<Line d="M152 114 L126 160 M248 114 L290 124" w={8} />}>
        <Shape d="M168 78 C164 30 236 30 232 78 L228 98 H172 Z" />
        <Line d="M176 66 H224" w={4} />
        <Line d="M200 106 V176 M160 130 H240" w={3} />
        <Shape d="M276 114 H340 V130 H276 Z" w={4} />
        <Line d="M340 122 H370" w={4} />
        <Line d="M350 108 l10 -8 M356 138 l12 6" w={3} />
      </Figure>
    </Drawing>
  );
}

function FuzzWarrior() {
  return (
    <Drawing label="Drawing of a knee-high fuzzy forest dweller with a spear and a drum">
      <Shape d="M130 90 C110 130 130 200 200 204 C270 200 290 130 270 90 C250 60 150 60 130 90 Z" />
      <Line d="M130 100 l-8 -6 M126 120 l-10 0 M130 144 l-10 6 M270 100 l8 -6 M274 120 l10 0 M270 144 l10 6 M150 76 l-4 -10 M176 68 l-2 -12 M224 68 l2 -12 M250 76 l4 -10" w={4} />
      <circle cx="176" cy="104" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="224" cy="104" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={176} y={104} r={3} />
      <Dot x={224} y={104} r={3} />
      <Line d="M186 132 Q200 142 214 132" w={3} />
      <Line d="M70 30 V224" w={5} />
      <Solid d="M62 36 L70 8 L78 36 Z" />
      <Shape d="M290 160 H350 V204 H290 Z" w={4} />
      <Line d="M290 172 H350 M290 192 H350" w={2} />
      <Line d="M270 150 L300 160" w={5} />
      <Line d="M160 204 V224 M240 204 V224" w={8} />
    </Drawing>
  );
}

function DuskMonk() {
  return (
    <Drawing label="Drawing of a hooded warrior in dark robes with a humming blade of light">
      <Shape d="M160 90 C150 28 250 28 240 90 L236 120 H164 Z" />
      <path d="M176 92 C176 66 224 66 224 92 C224 112 176 112 176 92 Z" fill="currentColor" />
      <Shape d="M150 118 H250 L284 224 H116 Z" />
      <Line d="M200 118 V224 M170 150 L230 150" w={3} />
      <Line d="M240 126 L290 110 L300 76" w={8} />
      <Line d="M296 80 L320 4" w={9} />
      <Line d="M296 80 L320 4" w={4} />
      <Line d="M290 86 H304" w={6} />
      <Line d="M160 126 L130 170" w={8} />
      <Line d="M336 30 q10 -4 14 6 M340 56 q12 -4 16 8 M270 40 q-8 -6 -16 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function DreadLord() {
  return (
    <Drawing label="Drawing of a towering figure in black armor with a breath mask, a cape and a crimson blade">
      <Shape d="M120 118 L90 224 H310 L280 118 Z" />
      <Solid d="M150 90 C146 36 254 36 250 90 L244 112 H156 Z" />
      <Shape d="M174 74 L226 74 L216 100 H184 Z" w={3} />
      <Line d="M184 80 H216 M192 90 H208" w={2} />
      <Solid d="M146 112 H254 L262 184 H138 Z" />
      <path d="M180 126 h40 v22 h-40 Z" fill={card} stroke="currentColor" strokeWidth="3" />
      <Dot x={190} y={137} r={2} />
      <Dot x={200} y={137} r={2} />
      <Dot x={210} y={137} r={2} />
      <Line d="M250 130 L290 120 L304 76" w={8} />
      <Line d="M300 82 L326 4" w={8} />
      <Line d="M294 90 H312" w={6} />
      <Line d="M150 130 L124 180" w={8} />
    </Drawing>
  );
}

function LaserGrunt() {
  return (
    <Drawing label="Drawing of a helmeted foot soldier in flak armor with a laser rifle, others marching behind">
      <g opacity="0.55">
        <Shape d="M40 110 C40 80 80 80 80 110 V130 H40 Z M40 130 H80 V200 H40 Z" w={3} />
        <Shape d="M330 110 C330 80 370 80 370 110 V130 H330 Z M330 130 H370 V200 H330 Z" w={3} />
      </g>
      <Figure arms={<Line d="M154 116 L130 150 M246 116 L282 128" w={8} />}>
        <Shape d="M168 80 C162 30 238 30 232 80 L228 96 H172 Z" />
        <Line d="M172 70 H228" w={4} />
        <Line d="M200 106 V180 M152 128 H248" w={3} />
        <Shape d="M270 112 H350 V128 H270 Z" w={4} />
        <Line d="M350 120 H376" w={4} />
        <Line d="M380 114 l8 6 M380 126 l8 -6" w={2} />
      </Figure>
      <Ground y={228} />
    </Drawing>
  );
}

function StarTempler() {
  return (
    <Drawing label="Drawing of a seven-foot warrior in sealed power armor with a brotherhood banner">
      <Line d="M320 20 V224" w={5} />
      <Shape d="M320 24 H376 V90 L348 74 L320 90 Z" w={4} />
      <Line d="M334 40 H362 M348 34 V60" w={3} />
      <Shape d="M168 74 C160 20 240 20 232 74 L226 98 H174 Z" />
      <Line d="M180 60 H220 M200 60 V90" w={4} />
      <Shape d="M110 108 L150 100 H250 L290 108 L284 140 H116 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Shape d="M144 190 H198 V226 H144 Z M202 190 H256 V226 H202 Z" w={4} />
      <Line d="M126 134 L108 176 M274 134 L300 120" w={11} />
      <Shape d="M100 170 H128 V196 H100 Z" w={4} />
      <Line d="M176 140 L200 160 L224 140" w={3} />
    </Drawing>
  );
}

function IronMarshal() {
  return (
    <Drawing label="Drawing of a black-coated officer with a peaked cap and a pistol raised">
      <Shape d="M158 62 H242 L232 36 H168 Z" />
      <Line d="M150 66 H250" w={6} />
      <Solid d="M194 44 l6 8 l6 -8 Z" />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 86 H194 M206 86 H218" w={4} />
      <Line d="M188 104 H212" w={3} />
      <Solid d="M144 122 H256 L270 224 H130 Z" />
      <path d="M200 126 V222" stroke={card} strokeWidth="2" />
      <path d="M178 134 h12 M178 148 h12 M210 134 h12 M210 148 h12" stroke={card} strokeWidth="3" strokeLinecap="round" />
      <Line d="M252 130 L296 110 L310 84" w={8} />
      <Shape d="M300 70 H352 V86 H300 Z" w={4} />
      <Line d="M352 78 H376" w={4} />
      <Line d="M150 130 L130 190" w={8} />
    </Drawing>
  );
}

function ScrapjawBrawler() {
  return (
    <Drawing label="Drawing of a green tusked bruiser in welded scrap armor with a clumsy gun and a big cleaver">
      <Shape d="M140 94 C140 40 260 40 260 94 C260 120 140 120 140 94 Z" />
      <Line d="M160 76 L190 84 M240 76 L210 84" w={5} />
      <Dot x={180} y={90} r={4} />
      <Dot x={220} y={90} r={4} />
      <Solid d="M170 112 l-6 -20 l12 14 Z M230 112 l6 -20 l-12 14 Z" />
      <Shape d="M110 124 L150 112 H250 L290 124 L280 190 H120 Z" />
      <Line d="M150 140 H250 M140 164 H260" w={3} />
      <Dot x={130} y={134} r={3} />
      <Dot x={270} y={134} r={3} />
      <Shape d="M130 190 H190 V226 H130 Z M210 190 H270 V226 H210 Z" w={4} />
      <Line d="M120 130 L90 170" w={11} />
      <Shape d="M60 160 H110 V180 H60 Z" w={4} />
      <Line d="M60 168 H40" w={4} />
      <Line d="M280 130 L310 100" w={11} />
      <Shape d="M300 20 H350 L346 100 H304 Z" w={4} />
      <Line d="M322 100 V120" w={7} />
    </Drawing>
  );
}

function RuinKnight() {
  return (
    <Drawing label="Drawing of a scarred spiked and horned warrior in corrupted power armor, with a chainsword">
      <Shape d="M168 80 C160 30 240 30 232 80 L226 100 H174 Z" />
      <Shape d="M168 58 L142 20 L170 40 Z M232 58 L258 20 L230 40 Z" w={4} />
      <Dot x={188} y={72} r={4} />
      <Dot x={212} y={72} r={4} />
      <Line d="M180 56 L196 80" w={3} />
      <Shape d="M114 108 L150 100 H250 L286 108 L280 140 H120 Z" />
      <Solid d="M120 108 L108 78 L134 104 Z M280 108 L292 78 L266 104 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Line d="M200 100 V190 M160 160 H240" w={3} />
      <Line d="M150 126 L124 174" w={10} />
      <Line d="M250 126 L290 100 L304 70" w={10} />
      <Shape d="M296 20 H316 V90 H296 Z" w={4} />
      <Solid d="M296 28 l-10 6 l10 4 l-10 6 l10 4 Z M316 28 l10 6 l-10 4 l10 6 l-10 4 Z" />
      <Shape d="M144 190 H198 V226 H144 Z M202 190 H256 V226 H202 Z" w={4} />
    </Drawing>
  );
}

function SilverSeer() {
  return (
    <Drawing label="Drawing of a tall graceful figure in smooth runed armor with a pointed crested helmet and a staff">
      <Shape d="M174 74 C168 30 232 30 226 74 L222 96 H178 Z" />
      <Line d="M200 34 L200 4 M200 4 C220 4 240 20 240 40" w={4} />
      <Line d="M186 70 L200 78 L214 70" w={3} />
      <Shape d="M156 106 H244 L238 176 H162 Z" />
      <Shape d="M162 176 L150 224 H250 L238 176 Z" />
      <Line d="M200 106 V176 M178 124 L200 140 L222 124" w={3} />
      <Line d="M158 112 L134 164 M242 112 L276 140" w={6} />
      <Line d="M280 30 V224" w={4} />
      <circle cx="280" cy="22" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M280 12 v20 M270 22 h20" w={2} />
      <Line d="M170 150 l4 4 M226 150 l-4 4 M190 196 v8 M210 196 v8" w={2} />
      <Line d="M70 60 l6 6 M64 90 l10 -2 M330 90 l8 -6" w={3} />
    </Drawing>
  );
}

function SkyCoalitionWarrior() {
  return (
    <Drawing label="Drawing of a short soldier in sleek armor shooting from behind a floating drone">
      <Figure arms={<Line d="M158 128 L134 168 M242 128 L284 140" w={7} />}>
        <Shape d="M178 94 C172 56 228 56 222 94 L218 104 H182 Z" />
        <Line d="M186 84 H214" w={4} />
        <Line d="M200 106 V176 M164 140 H236" w={3} />
        <Shape d="M276 134 H336 V150 H276 Z" w={4} />
        <Line d="M336 142 H362" w={4} />
      </Figure>
      <Shape d="M60 70 H130 V120 H60 Z" w={5} />
      <circle cx="95" cy="95" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={95} y={95} r={4} />
      <Line d="M70 60 V50 M120 60 V50 M62 46 H78 M112 46 H128" w={3} />
      <Line d="M130 100 L160 114" w={3} dash="3 4" />
    </Drawing>
  );
}

function GearPriest() {
  return (
    <Drawing label="Drawing of a red-robed priest with a mechanical arm, a third eye and cogs in the hood">
      <Shape d="M156 92 C150 30 250 30 244 92 L240 118 H160 Z" />
      <path d="M174 92 C174 68 226 68 226 92 C226 110 174 110 174 92 Z" fill={card} stroke="currentColor" strokeWidth="4" />
      <circle cx="188" cy="92" r="5" fill="currentColor" />
      <circle cx="212" cy="92" r="5" fill="currentColor" />
      <circle cx="200" cy="76" r="5" fill="currentColor" />
      <Shape d="M148 118 H252 L284 224 H116 Z" />
      <circle cx="200" cy="160" r="20" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 144 v-6 M200 176 v6 M184 160 h-6 M216 160 h6" w={4} />
      <Line d="M240 128 L284 114 L300 142" w={5} />
      <Shape d="M290 142 l16 -4 l6 16 l-16 6 Z" w={4} />
      <Line d="M160 128 L130 170 L148 186" w={8} />
      <Line d="M176 36 l-6 -10 M224 36 l6 -10" w={3} />
    </Drawing>
  );
}

function WitchHunter() {
  return (
    <Drawing label="Drawing of a grim armored investigator with a flamethrower and a sealed warrant">
      <Shape d="M156 62 H244 L236 30 H164 Z" />
      <Line d="M142 66 H258" w={6} />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 88 H194 M206 88 H218" w={4} />
      <Shape d="M144 122 H256 L270 224 H130 Z" />
      <Shape d="M168 134 H232 V200 H168 Z" w={4} />
      <Line d="M200 134 V200 M168 166 H232" w={3} />
      <Line d="M252 130 L292 142" w={8} />
      <Shape d="M288 134 H340 V152 H288 Z" w={4} />
      <Line d="M340 143 H360" w={4} />
      <Solid d="M366 130 C380 120 388 108 384 98 C396 112 394 134 376 146 C386 150 368 156 360 150 Z" />
      <Line d="M156 130 L136 178" w={7} />
      <Shape d="M110 170 H148 V196 H110 Z" w={3} />
      <Dot x={129} y={183} r={4} />
    </Drawing>
  );
}

function SuitGuard() {
  return (
    <Drawing label="Drawing of a security officer in a tailored suit and mirror shades with an earpiece">
      <Shape d="M170 74 C170 36 230 36 230 74 C230 100 170 100 170 74 Z" />
      <Shape d="M176 66 H224 V80 H176 Z" w={3} />
      <Line d="M232 70 q10 8 6 20" w={3} />
      <Line d="M188 92 H212" w={3} />
      <Shape d="M148 106 H252 L264 224 H136 Z" />
      <Shape d="M178 106 L200 150 L222 106 Z" w={3} />
      <Line d="M200 106 V224" w={3} />
      <Solid d="M194 112 h12 l4 40 h-20 Z" />
      <Line d="M156 114 L140 170 L152 190 M244 114 L262 170 L250 190" w={8} />
      <Line d="M170 224 V230 M230 224 V230" w={6} />
      <Line d="M276 44 l8 -6 M286 64 l12 0 M60 60 l-8 -6 M50 80 l-12 0" w={3} dash="3 4" />
    </Drawing>
  );
}

function StreetRazor() {
  return (
    <Drawing label="Drawing of a mercenary with mantis blades extending from the forearms and chrome reflexes">
      <Figure arms={<Line d="M152 114 L112 150 M248 114 L288 150" w={7} />}>
        <Line d="M170 60 q30 -26 60 0" w={5} />
        <Line d="M182 78 H218" w={4} />
        <Line d="M200 106 V176 M160 130 H240" w={3} />
        <Line d="M112 150 L50 100 L56 96 L118 142 M288 150 L350 100 L344 96 L282 142" w={5} />
        <Shape d="M104 144 H122 V158 H104 Z M278 144 H296 V158 H278 Z" w={3} />
        <circle cx="214" cy="76" r="7" fill="none" {...ink} strokeWidth={3} />
        <Dot x={214} y={76} r={2} />
        <Line d="M60 60 l8 -4 M340 60 l-8 -4" w={3} />
      </Figure>
    </Drawing>
  );
}

function WireJockey() {
  return (
    <Drawing label="Drawing of a hunched hacker sitting with a laptop on their knees and a cable running to a head port">
      <Shape d="M150 100 C140 50 220 40 240 80 C260 110 240 130 200 130 C170 130 152 120 150 100 Z" />
      <Dot x={196} y={90} r={4} />
      <Line d="M190 110 Q210 122 232 106" w={4} />
      <Line d="M150 90 C120 70 100 100 80 90 M80 90 l-10 -14" w={4} />
      <Shape d="M150 130 C120 150 110 190 130 210 H270 C280 190 260 150 240 130 Z" />
      <Shape d="M190 170 H320 L330 200 H200 Z" w={5} />
      <Shape d="M196 130 L320 130 L320 170 H190 Z" w={4} />
      <Line d="M210 146 H300 M210 156 H280" w={2} />
      <Line d="M180 160 L200 176 M230 180 H250" w={5} />
      <Line d="M130 210 V224 M260 210 V224" w={8} />
      <Line d="M330 150 q20 -4 24 -24 M338 156 q26 -4 30 -34" w={3} dash="2 4" />
    </Drawing>
  );
}

function ChopShopDoc() {
  return (
    <Drawing label="Drawing of a one-eyed tattooed surgeon with mechanical hands and a tray of chrome parts">
      <Shape d="M170 74 C170 36 230 36 230 74 C230 100 170 100 170 74 Z" />
      <Line d="M180 50 l10 8 M220 50 l-10 8" w={3} />
      <circle cx="190" cy="70" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={190} y={70} r={2} />
      <Line d="M208 68 H222 M212 64 v8" w={4} />
      <Line d="M186 88 H214" w={3} />
      <Shape d="M148 106 H252 L262 190 H138 Z" />
      <Line d="M176 120 q10 8 4 18 M222 124 q-10 8 -4 18" w={3} />
      <Line d="M156 114 L120 150 L150 170 M244 114 L270 150 L240 170" w={8} />
      <Shape d="M138 160 L156 176 L146 188 L128 172 Z M254 160 L236 176 L246 188 L264 172 Z" w={3} />
      <Shape d="M60 190 H340 V206 H60 Z" w={4} />
      <Line d="M100 190 L86 160 M120 190 L132 150 M280 190 L296 164 M300 190 L316 170" w={5} />
      <circle cx="132" cy="146" r="6" fill={card} {...ink} strokeWidth={3} />
      <Line d="M170 224 V206 M230 224 V206" w={8} />
    </Drawing>
  );
}

function ChromePsycho() {
  return (
    <Drawing label="Drawing of a twitching half-metal wreck of a person drowned in implants and cables">
      <Shape d="M170 80 C164 36 236 36 230 80 C230 106 170 106 170 80 Z" />
      <Shape d="M200 40 C226 40 236 60 230 80 L200 80 Z" w={4} />
      <circle cx="184" cy="72" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="70" r="8" fill="currentColor" />
      <Line d="M184 94 H220 M192 90 v8 M200 90 v8 M208 90 v8" w={3} />
      <Line d="M170 50 L150 24 M230 50 L254 28" w={3} />
      <Shape d="M150 110 H250 L262 190 H138 Z" />
      <Shape d="M200 110 H250 L262 190 H200 Z" w={3} />
      <Line d="M156 120 L120 160 L130 196 M244 120 L286 150 L300 190" w={7} />
      <Line d="M170 150 H186 M170 164 H182" w={3} />
      <Line d="M190 190 V226 M226 190 V226" w={8} />
      <Line d="M120 80 q-10 -10 -22 -4 M280 70 q10 -10 22 -4 M100 130 l-12 -6 M300 130 l12 -6" w={3} />
      <Line d="M60 160 q12 -8 24 0 M320 170 q12 -8 24 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function NeonBusker() {
  return (
    <Drawing label="Drawing of a street performer covered in LED strips with a glowing guitar">
      <Figure arms={<Line d="M158 122 L140 164 M244 118 L260 150" w={7} />}>
        <Line d="M184 60 q16 -14 32 0" w={5} />
        <Dot x={188} y={76} r={3} />
        <Dot x={212} y={76} r={3} />
        <Line d="M188 90 Q200 100 212 90" w={3} />
        <Line d="M160 124 H240 M162 144 H238 M168 164 H232" w={3} dash="6 5" />
        <Line d="M166 176 V226 M234 176 V226" w={3} dash="6 5" />
        <Shape d="M220 168 C200 150 230 130 260 140 C284 148 280 176 258 184 C246 188 232 180 220 168 Z" w={4} />
        <Line d="M264 148 L350 70" w={5} />
        <Line d="M350 70 l12 -10 l8 10" w={4} />
        <circle cx="250" cy="162" r="8" fill="none" {...ink} strokeWidth={3} />
      </Figure>
      <Line d="M60 60 v10 M55 65 h10 M330 120 v10 M325 125 h10 M60 150 q12 -8 24 0" w={3} />
    </Drawing>
  );
}

function GigCourier() {
  return (
    <Drawing label="Drawing of a delivery runner riding a hoverboard with a big backpack of parcels">
      <Shape d="M110 224 H300 L316 212 H126 Z" w={5} />
      <Line d="M140 232 q60 6 140 0" w={3} dash="4 6" />
      <Shape d="M156 82 C150 40 230 36 232 80 C236 104 160 104 156 82 Z" />
      <Line d="M170 62 q20 -12 50 -2" w={5} />
      <Dot x={206} y={80} r={3} />
      <Shape d="M172 104 L220 104 L250 152 L216 168 L176 150 Z" />
      <Shape d="M110 100 H174 V170 H110 Z" w={5} />
      <Line d="M110 120 H174 M142 100 V170" w={3} />
      <Shape d="M120 82 H160 V100 H120 Z" w={4} />
      <Line d="M232 120 L284 130 M180 150 L140 190 L136 212" w={6} />
      <Line d="M240 168 L270 190 L276 212" w={7} />
      <Line d="M40 130 H90 M30 150 H80 M50 170 H96" w={3} dash="6 5" />
    </Drawing>
  );
}

function OrganBroker() {
  return (
    <Drawing label="Drawing of a smiling immaculate dealer with a cooler and a scalpel">
      <Shape d="M170 74 C170 34 230 34 230 74 C230 100 170 100 170 74 Z" />
      <Line d="M172 56 q28 -24 56 0" w={5} />
      <Dot x={188} y={72} r={3} />
      <Dot x={212} y={72} r={3} />
      <Line d="M184 86 Q200 100 216 86" w={4} />
      <Shape d="M148 106 H252 L262 224 H138 Z" />
      <Shape d="M178 106 L200 150 L222 106 Z" w={3} />
      <Line d="M200 106 V224" w={3} />
      <Line d="M252 116 L290 128" w={7} />
      <Line d="M288 128 L326 100" w={3} />
      <Solid d="M322 100 L340 72 L332 106 Z" />
      <Line d="M156 116 L130 160" w={7} />
      <Shape d="M60 160 H130 V210 H60 Z" w={5} />
      <Shape d="M66 146 H124 V160 H66 Z" w={4} />
      <Line d="M92 146 V136 H98 V146" w={3} />
      <Line d="M72 176 H118 M72 188 H108" w={2} />
    </Drawing>
  );
}

function MegacorpChairman() {
  return (
    <Drawing label="Drawing of a pale immaculate billionaire in front of a hundred-floor tower">
      <Shape d="M270 224 V40 H380 V224 Z" w={4} />
      {Array.from({ length: 10 }, (_, i) => (
        <Line key={i} d={`M280 ${56 + i * 16} H370`} w={2} />
      ))}
      <Line d="M325 40 V16 M318 16 H332" w={3} />
      <Shape d="M170 74 C170 34 230 34 230 74 C230 100 170 100 170 74 Z" />
      <Line d="M172 56 q28 -20 56 0" w={4} />
      <Line d="M184 74 H196 M204 74 H216" w={4} />
      <Line d="M190 90 H210" w={3} />
      <Shape d="M148 106 H252 L262 224 H138 Z" />
      <Shape d="M180 106 L200 150 L220 106 Z" w={3} />
      <Line d="M200 106 V224" w={3} />
      <Line d="M156 116 L130 160 M244 116 L268 140" w={7} />
      <Shape d="M262 130 H284 V146 H262 Z" w={3} />
      <Line d="M120 150 q14 -6 24 4" w={3} />
      <Line d="M170 224 V230 M230 224 V230" w={7} />
    </Drawing>
  );
}

function ScrapGremlin() {
  return (
    <Drawing label="Drawing of a knee-high giggling green runt with a wrench hitting a machine">
      <Shape d="M130 90 L90 60 L130 70 Z M190 90 L210 56 L196 94 Z" w={4} />
      <Shape d="M120 100 C116 56 200 56 200 100 C200 126 124 126 120 100 Z" />
      <Dot x={144} y={92} r={4} />
      <Dot x={176} y={92} r={4} />
      <Line d="M138 108 Q160 126 184 108" w={4} />
      <Solid d="M146 112 l4 8 l4 -8 Z M166 114 l4 8 l4 -8 Z" />
      <Shape d="M130 126 H190 L194 190 H126 Z" />
      <Line d="M190 140 L230 120 L250 100" w={6} />
      <Line d="M240 80 l20 -20 l16 8 l-12 12 l-14 4 Z" w={4} />
      <Line d="M138 190 V224 M184 190 V224" w={7} />
      <Shape d="M260 130 H360 V224 H260 Z" w={5} />
      <Line d="M280 150 H340 M280 170 H340 M280 190 H320" w={3} />
      <Line d="M244 100 l-8 -8 M258 90 l-4 -12 M272 96 l8 -10" w={3} />
    </Drawing>
  );
}

function SandRaider() {
  return (
    <Drawing label="Drawing of a masked robed desert nomad with a hooked staff and a rifle">
      <Line d="M300 20 V224 M300 20 q-26 -4 -26 20" w={5} />
      <Shape d="M156 90 C150 28 250 28 244 90 L240 118 H160 Z" />
      <path d="M172 94 C172 70 228 70 228 94 C228 112 172 112 172 94 Z" fill="currentColor" />
      <path d="M182 88 H218" stroke={card} strokeWidth="4" strokeLinecap="round" />
      <Shape d="M148 118 H252 L280 224 H120 Z" />
      <Line d="M160 140 L240 200 M240 140 L160 200" w={3} />
      <Line d="M244 128 L300 120" w={7} />
      <Line d="M160 126 L130 166" w={7} />
      <Shape d="M60 156 H150 V168 H60 Z" w={4} />
      <Line d="M60 162 H40" w={4} />
      <Line d="M30 224 q30 -20 60 -4 q40 -30 90 -6 q50 -24 100 -4" w={3} />
    </Drawing>
  );
}

function CantinaSmuggler() {
  return (
    <Drawing label="Drawing of a smirking vest-wearing pilot with a blaster on the hip and a ship parked behind him">
      <Shape d="M240 120 C240 90 340 80 380 110 L390 140 L350 150 C300 160 250 150 240 120 Z" w={4} />
      <Line d="M270 130 H350" w={3} />
      <Shape d="M156 66 C156 28 236 28 236 66 C236 98 156 98 156 66 Z" />
      <Line d="M162 50 C180 36 214 36 232 52" w={4} />
      <Dot x={180} y={66} r={3} />
      <Dot x={210} y={66} r={3} />
      <Line d="M176 84 Q192 92 212 80" w={3} />
      <Shape d="M144 104 H224 L232 180 H136 Z" />
      <Shape d="M144 104 L176 104 L170 180 H136 Z M224 104 L192 104 L198 180 H232 Z" w={4} />
      <Line d="M150 112 L126 160 M218 112 L240 150" w={7} />
      <Shape d="M156 180 H196 V226 H156 Z M204 180 H244 V226 H204 Z" w={4} />
      <Shape d="M130 176 H158 V194 H130 Z" w={4} />
      <Line d="M130 184 H112" w={4} />
    </Drawing>
  );
}

function ArenaChampion() {
  return (
    <Drawing label="Drawing of a scarred undefeated pit fighter in armor made from trophies, with a raised fist">
      <Shape d="M168 80 C160 30 240 30 232 80 C238 104 162 104 168 80 Z" />
      <Line d="M180 58 L196 70" w={3} />
      <Dot x={184} y={74} r={3} />
      <Dot x={216} y={74} r={3} />
      <Line d="M188 90 H212" w={4} />
      <Shape d="M112 108 L150 102 H250 L288 108 L280 136 H120 Z" />
      <Shape d="M120 108 L106 80 L130 104 Z M280 108 L294 80 L270 104 Z" w={4} />
      <Shape d="M146 136 H254 L262 188 H138 Z" />
      <circle cx="170" cy="156" r="9" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M196 146 l8 -6 l8 6 l-4 12 h-8 Z" w={3} />
      <Line d="M228 160 l10 10 l-10 10" w={3} />
      <Line d="M142 124 L108 148 L100 100" w={11} />
      <circle cx="98" cy="86" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M262 124 L292 164" w={11} />
      <Shape d="M144 188 H198 V226 H144 Z M202 188 H256 V226 H202 Z" w={4} />
      <Line d="M60 60 l10 8 M44 90 l14 0 M340 70 l-10 8" w={3} />
    </Drawing>
  );
}

function RogueStarAce() {
  return (
    <Drawing label="Drawing of a cocky fighter pilot in a jumpsuit and helmet, thumbs-up beside a fast ship">
      <Shape d="M250 150 L330 130 L390 142 L330 156 Z" w={4} />
      <Shape d="M280 136 L270 98 L304 124 Z M280 150 L270 192 L304 156 Z" w={4} />
      <Line d="M240 144 H210" w={3} dash="4 4" />
      <Shape d="M156 70 C150 30 230 26 230 70 L226 92 H160 Z" />
      <Shape d="M168 56 H218 V74 H168 Z" w={4} />
      <Line d="M176 64 H210" w={3} />
      <Line d="M176 84 q16 8 36 0" w={3} />
      <Shape d="M150 100 H236 L244 190 H142 Z" />
      <Line d="M193 100 V190 M150 150 H236" w={3} />
      <Line d="M156 108 L126 140 L142 156 M232 108 L262 128" w={7} />
      <Shape d="M126 126 l-6 -16 l14 -2 l6 20 Z" w={3} />
      <Shape d="M148 190 H190 V226 H148 Z M196 190 H238 V226 H196 Z" w={4} />
    </Drawing>
  );
}

function FleetAdmiral() {
  return (
    <Drawing label="Drawing of a grim commander in a black glass helmet before a bridge window full of ships">
      <Shape d="M20 20 H380 V110 H20 Z" w={4} />
      <Line d="M20 110 L120 20 M200 110 L300 20" w={2} />
      {[[60, 60], [120, 80], [170, 48], [240, 70], [300, 50], [340, 84]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l14 -4 l12 4 l-12 4 Z`} fill="currentColor" />
      ))}
      <Shape d="M166 120 C160 82 240 82 234 120 L228 140 H172 Z" />
      <Solid d="M176 108 H224 V128 H176 Z" />
      <Shape d="M130 150 L170 140 H230 L270 150 L260 224 H140 Z" />
      <Line d="M200 140 V224" w={3} />
      <Solid d="M170 156 h14 v8 h-14 Z M216 156 h14 v8 h-14 Z" />
      <Line d="M150 160 L124 200 M250 160 L276 200" w={8} />
    </Drawing>
  );
}

function RimScrapper() {
  return (
    <Drawing label="Drawing of a greasy teenage scavenger in a patched flight jacket with a stolen blaster">
      <Figure arms={<Line d="M154 118 L126 160 M246 118 L284 134" w={7} />}>
        <Line d="M176 60 q24 -22 50 0" w={5} />
        <Dot x={188} y={76} r={3} />
        <Dot x={212} y={76} r={3} />
        <Line d="M190 90 Q202 98 214 90" w={3} />
        <Shape d="M150 106 L196 106 L190 180 H144 Z M250 106 L204 106 L210 180 H256 Z" w={4} />
        <Shape d="M160 130 H180 V146 H160 Z" w={2} />
        <Line d="M200 106 V180" w={3} />
        <Shape d="M278 124 H326 V142 H278 Z" w={4} />
        <Line d="M326 133 H344" w={4} />
        <Shape d="M120 160 H144 V176 H120 Z" w={3} />
      </Figure>
    </Drawing>
  );
}

function ShadowEmperor() {
  return (
    <Drawing label="Drawing of a cloaked tyrant on a throne of black glass shards, hooded, with hands crossed">
      <Solid d="M80 224 L100 60 L140 20 L150 120 L250 120 L260 20 L300 60 L320 224 Z" />
      <path d="M126 224 L136 90 L160 120 M274 224 L264 90 L240 120" stroke={card} strokeWidth="2" fill="none" />
      <Shape d="M160 100 C150 40 250 40 240 100 L236 130 H164 Z" />
      <path d="M176 100 C176 78 224 78 224 100 C224 118 176 118 176 100 Z" fill="currentColor" />
      <circle cx="192" cy="98" r="3" fill={card} />
      <circle cx="208" cy="98" r="3" fill={card} />
      <Shape d="M150 130 H250 L280 224 H120 Z" />
      <Line d="M178 170 H222 M176 184 H224" w={5} />
      <Line d="M170 140 L200 170 L230 140" w={4} />
      <Line d="M110 30 l6 -10 M290 30 l-6 -10 M200 20 v-12" w={3} />
    </Drawing>
  );
}

function FieldMedicDroid() {
  return (
    <Drawing label="Drawing of a battered white medical droid with a cross on its chest and a bag of stims">
      <Shape d="M160 40 H240 V92 H160 Z" />
      <circle cx="184" cy="66" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={66} r={3} />
      <Line d="M208 66 H228" w={4} />
      <Line d="M200 40 V24 M194 24 H206" w={3} />
      <Shape d="M150 100 H250 V176 H150 Z" />
      <Shape d="M190 114 H210 V132 H230 V152 H210 V170 H190 V152 H170 V132 H190 Z" w={3} />
      <Line d="M150 112 L120 150 L130 180 M250 112 L286 140" w={7} />
      <Shape d="M276 134 H326 V170 H276 Z" w={4} />
      <Line d="M290 134 V124 H312 V134" w={3} />
      <Line d="M290 150 H312" w={2} />
      <Shape d="M156 176 H196 V226 H156 Z M204 176 H244 V226 H204 Z" w={4} />
      <Line d="M170 80 l6 6 M230 140 l-8 8" w={2} />
      <Line d="M130 190 q-6 8 0 14" w={3} dash="2 4" />
    </Drawing>
  );
}

function ShipLordRegent() {
  return (
    <Drawing label="Drawing of a cold shaved-headed noble on a throne of cables and glass panels">
      <Line d="M60 224 C70 120 80 80 110 40 M340 224 C330 120 320 80 290 40 M90 224 C100 150 110 110 130 70 M310 224 C300 150 290 110 270 70" w={5} />
      <Shape d="M100 30 H140 V90 H100 Z M260 30 H300 V90 H260 Z" w={4} />
      <Line d="M110 44 H130 M270 44 H290" w={2} />
      <Shape d="M170 86 C170 44 230 44 230 86 C230 110 170 110 170 86 Z" />
      <Line d="M184 82 H196 M204 82 H216" w={4} />
      <Line d="M190 98 H210" w={3} />
      <Line d="M176 60 C190 54 210 54 224 60" w={3} />
      <Shape d="M146 116 H254 L266 224 H134 Z" />
      <Line d="M200 116 V224" w={3} />
      <Line d="M158 126 L136 180 M242 126 L264 180" w={8} />
      <Line d="M130 190 C120 210 100 210 90 224 M270 190 C280 210 300 210 310 224" w={4} />
      <Shape d="M126 176 H146 V192 H126 Z M254 176 H274 V192 H254 Z" w={3} />
    </Drawing>
  );
}

export const sciFiHumanoidsArt: Record<string, () => ReactNode> = {
  "chrome-trooper": ChromeTrooper,
  "fuzz-warrior": FuzzWarrior,
  "dusk-monk": DuskMonk,
  "dread-lord": DreadLord,
  "laser-grunt": LaserGrunt,
  "star-templar": StarTempler,
  "iron-marshal": IronMarshal,
  "scrapjaw-brawler": ScrapjawBrawler,
  "ruin-knight": RuinKnight,
  "silver-seer": SilverSeer,
  "sky-coalition-warrior": SkyCoalitionWarrior,
  "gear-priest": GearPriest,
  "witch-hunter": WitchHunter,
  "suit-guard": SuitGuard,
  "street-razor": StreetRazor,
  "wire-jockey": WireJockey,
  "chop-shop-doc": ChopShopDoc,
  "chrome-psycho": ChromePsycho,
  "neon-busker": NeonBusker,
  "gig-courier": GigCourier,
  "organ-broker": OrganBroker,
  "megacorp-chairman": MegacorpChairman,
  "scrap-gremlin": ScrapGremlin,
  "sand-raider": SandRaider,
  "cantina-smuggler": CantinaSmuggler,
  "arena-champion": ArenaChampion,
  "rogue-star-ace": RogueStarAce,
  "fleet-admiral": FleetAdmiral,
  "rim-scrapper": RimScrapper,
  "shadow-emperor": ShadowEmperor,
  "field-medic-droid": FieldMedicDroid,
  "ship-lord-regent": ShipLordRegent,
};
