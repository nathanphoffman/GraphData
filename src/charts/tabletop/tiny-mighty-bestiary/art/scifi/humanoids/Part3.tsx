import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";

const card = CARD_COLOR;

export function StreetRazor() {
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

export function WireJockey() {
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

export function ChopShopDoc() {
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

export function ChromePsycho() {
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

export function NeonBusker() {
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

export function GigCourier() {
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

export function OrganBroker() {
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
