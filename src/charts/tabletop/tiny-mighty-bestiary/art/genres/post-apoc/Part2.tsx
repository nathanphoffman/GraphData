import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";
import { Glow } from "./Part1";

const card = CARD_COLOR;

export function AtomicRoach() {
  return (
    <Drawing label="Drawing of a dog-sized cockroach looking mildly annoyed with a radiation symbol on its back">
      <Shape d="M80 170 C70 110 160 90 230 100 C290 108 310 150 290 178 C240 194 130 196 80 170 Z" />
      <Line d="M200 100 V190" w={3} />
      <Shape d="M290 140 C296 116 330 104 352 120 C368 134 358 156 334 160 C312 164 292 156 290 140 Z" />
      <Dot x={332} y={128} r={4} />
      <Line d="M340 100 C350 70 380 60 392 64 M330 100 C330 70 350 40 372 36" w={4} />
      <Line d="M110 170 L84 210 L70 224 M150 182 L140 220 L136 228 M230 184 L240 220 L248 228 M270 176 L300 210 L312 224 M120 130 L90 120 L70 100" w={5} />
      <circle cx="150" cy="140" r="16" fill="none" {...ink} strokeWidth={3} />
      <Solid d="M150 140 l-8 -14 h16 Z M150 140 l-14 8 l8 12 Z M150 140 l14 8 l-8 12 Z" />
      <Line d="M300 110 q10 -6 20 0" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

export function RadHound() {
  return (
    <Drawing label="Drawing of a mangy two-headed dog with a glowing eye and a limp">
      <Shape d="M90 170 C80 130 140 110 200 114 C250 118 270 140 260 170 L246 182 H110 Z" />
      <Shape d="M240 124 L244 92 L260 106 L292 104 L310 94 L314 128 C314 148 244 150 240 124 Z" />
      <Shape d="M226 112 L224 78 L242 90 L268 70 L286 76 L290 108 C290 120 230 134 226 112 Z" w={4} />
      <circle cx="290" cy="118" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={290} y={118} r={3} />
      <circle cx="270" cy="92" r="7" fill={card} {...ink} strokeWidth={3} />
      <Line d="M254 90 l8 4" w={3} />
      <Line d="M104 182 V220 M136 184 V220 M232 184 V212 L246 222 M258 182 V220" w={6} />
      <Line d="M92 150 C60 150 50 124 62 108" w={5} />
      <Line d="M130 126 l4 8 M160 122 l4 8 M190 124 l4 8 M120 150 l6 4" w={3} />
      <Glow x={290} y={118} r={18} />
      <Ground y={226} />
    </Drawing>
  );
}

export function RadBear() {
  return (
    <Drawing label="Drawing of a truck-sized mutated grizzly with a glowing hide">
      <Glow x={200} y={130} r={120} />
      <Shape d="M60 200 C40 130 100 90 190 90 C270 90 330 130 320 200 Z" />
      <Shape d="M270 110 C262 70 300 50 340 62 C380 74 384 116 360 134 C340 150 290 148 270 110 Z" />
      <Shape d="M276 66 a14 14 0 1 0 0.1 0 Z M326 54 a12 12 0 1 0 0.1 0 Z" w={4} />
      <circle cx="338" cy="92" r="6" fill="currentColor" />
      <Shape d="M360 110 h22 v18 h-22 Z" w={4} />
      <Line d="M364 130 l6 8 l6 -8" w={3} />
      <Line d="M90 200 V228 M140 202 V228 M240 202 V228 M290 200 V228" w={13} />
      <Line d="M110 120 l-6 14 M150 110 l-4 16 M190 108 l-2 16 M230 112 l2 16" w={4} />
      <Line d="M90 150 q20 14 40 0 M200 150 q20 14 40 0" w={3} />
    </Drawing>
  );
}

export function DoomHoundAlpha() {
  return (
    <Drawing label="Drawing of the scarred leader of a mutant dog pack, with a metal plate in its skull, snarling">
      <Shape d="M70 180 C60 130 130 106 200 110 C260 114 290 140 280 180 L262 192 H96 Z" />
      <Shape d="M258 124 L262 84 L282 102 L318 100 L340 86 L344 124 C344 150 262 152 258 124 Z" />
      <Shape d="M268 90 H300 V104 H268 Z" w={3} />
      <Dot x={270} y={86} r={1.5} />
      <Dot x={292} y={86} r={1.5} />
      <Dot x={308} y={118} r={4} />
      <Shape d="M300 138 Q324 152 346 134 Z" w={3} />
      <Solid d="M308 138 l4 8 l4 -8 Z M324 140 l4 8 l4 -8 Z M334 136 l4 8 l4 -8 Z" />
      <Line d="M300 108 l16 6 M120 130 l30 18 M170 120 l24 24 M220 126 l-14 24" w={3} />
      <Line d="M110 192 V226 M146 194 V226 M242 194 V226 M272 190 V226" w={8} />
      <Line d="M78 160 C44 160 34 130 50 110" w={6} />
      <Line d="M200 30 l-6 -10 M240 40 l8 -10" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

export function WastelandVulture() {
  return (
    <Drawing label="Drawing of a six-foot vulture with a scorched beak circling above something that stopped moving">
      <Shape d="M200 70 C150 50 80 40 20 70 C60 76 90 90 106 120 C140 104 170 104 194 112 Z" />
      <Shape d="M200 70 C250 50 320 40 380 70 C340 76 310 90 294 120 C260 104 230 104 206 112 Z" />
      <Line d="M50 72 L80 94 M70 78 L100 104 M350 72 L320 94 M330 78 L300 104" w={3} />
      <Shape d="M180 112 C176 80 224 80 220 112 L214 150 H186 Z" />
      <Shape d="M184 82 C184 56 216 56 216 82 C216 94 184 94 184 82 Z" />
      <Shape d="M200 74 L222 90 L206 94 Z" w={4} />
      <Dot x={192} y={72} r={3} />
      <Line d="M186 98 Q200 110 214 98" w={3} />
      <Line d="M190 150 L180 176 M210 150 L220 176" w={4} />
      <Line d="M100 220 H300 M140 220 l10 -16 l12 16 M240 220 l14 -12 l10 12" w={3} />
      <Ground y={226} />
    </Drawing>
  );
}

export function IrradiatedAurochs() {
  return (
    <Drawing label="Drawing of a bus-sized wasteland bull with a radioactive glow and one horn like a crowbar">
      <Glow x={190} y={130} r={116} />
      <Shape d="M50 200 C30 120 100 80 190 84 C270 88 330 130 316 200 Z" />
      <Shape d="M280 120 C270 80 310 60 346 74 C382 90 384 128 360 146 C336 160 290 154 280 120 Z" />
      <Line d="M296 76 C280 56 290 36 310 40" w={8} />
      <Line d="M296 76 C280 56 290 36 310 40" w={3} />
      <Line d="M350 72 C370 56 374 36 360 24" w={7} />
      <Line d="M360 24 l8 -6 M360 24 l-6 -8" w={4} />
      <Dot x={346} y={100} r={4} />
      <Line d="M360 132 q-6 14 -16 10" w={4} />
      <Line d="M80 200 V226 M130 202 V226 M240 202 V226 M290 200 V226" w={13} />
      <Line d="M120 110 q10 12 4 28 M170 100 q10 12 4 28 M220 102 q10 12 4 28" w={3} />
      <Line d="M54 150 C30 150 24 120 36 108" w={7} />
    </Drawing>
  );
}

export function JunkScavenger() {
  return (
    <Drawing label="Drawing of a goggle-wearing scrapper in patched leather pushing a cart of junk">
      <Figure arms={<Line d="M156 118 L134 150 L150 176 M244 118 L280 140 L300 152" w={7} />}>
        <Shape d="M172 64 H228 V78 H172 Z" w={4} />
        <circle cx="186" cy="71" r="5" fill={card} {...ink} strokeWidth={3} />
        <circle cx="214" cy="71" r="5" fill={card} {...ink} strokeWidth={3} />
        <Line d="M178 90 H222" w={3} />
        <Line d="M200 106 V180 M156 130 H244 M160 156 H240" w={3} />
        <Shape d="M148 106 L168 106 L160 136 L148 130 Z" w={3} />
      </Figure>
      <Shape d="M290 140 H380 L370 196 H300 Z" w={5} />
      <Line d="M300 140 L310 110 L330 130 L350 100 L366 140" w={4} />
      <Shape d="M320 122 h16 v14 h-16 Z" w={3} />
      <circle cx="316" cy="210" r="14" fill={card} {...ink} strokeWidth={4} />
      <circle cx="360" cy="210" r="14" fill={card} {...ink} strokeWidth={4} />
      <Line d="M270 150 L296 150" w={5} />
    </Drawing>
  );
}

export function WastelandRaider() {
  return (
    <Drawing label="Drawing of a spiked-armor, face-painted road thug on a patched-up motorbike swinging a crowbar">
      <circle cx="90" cy="190" r="34" fill={card} {...ink} />
      <circle cx="90" cy="190" r="8" fill="currentColor" />
      <circle cx="310" cy="190" r="34" fill={card} {...ink} />
      <circle cx="310" cy="190" r="8" fill="currentColor" />
      <Shape d="M90 190 L150 150 H250 L310 190 L270 190 L240 160 H170 L130 190 Z" w={4} />
      <Shape d="M150 140 H250 L240 160 H160 Z" w={4} />
      <Line d="M260 150 L300 120 L320 100" w={6} />
      <Shape d="M168 70 C160 30 220 30 214 70 C216 90 170 92 168 70 Z" />
      <Solid d="M172 40 L178 18 L186 38 Z M190 34 L198 12 L206 34 Z M206 40 L214 20 L218 44 Z" />
      <Line d="M178 66 H206 M184 74 l10 8 M200 74 l-10 8" w={3} />
      <Shape d="M156 92 H226 L236 148 H150 Z" />
      <Solid d="M160 96 l-10 -12 l16 6 Z M222 96 l10 -12 l-16 6 Z" />
      <Line d="M158 100 L128 140 L110 120" w={7} />
      <Line d="M110 120 l-30 -34 l14 -4 l30 36" w={4} />
    </Drawing>
  );
}

export function WastelandMerchant() {
  return (
    <Drawing label="Drawing of a bundled-up trader leading a pack mule with a cart of wares, with a no refunds sign">
      <Shape d="M90 80 H180 V90 H90 Z" w={3} />
      <Line d="M110 90 V126" w={3} />
      <Shape d="M96 36 H170 V80 H96 Z" w={4} />
      <Line d="M106 50 H160 M106 64 H150" w={3} />
      <Shape d="M300 170 C280 120 330 100 360 110 L388 128 L360 144 C340 164 320 190 300 170 Z" w={4} />
      <Line d="M320 108 L314 90 L336 106 Z" w={3} />
      <Line d="M300 190 V226 M336 190 V226 M360 168 V226" w={6} />
      <Shape d="M120 130 H280 L296 180 H104 Z" />
      <circle cx="140" cy="202" r="20" fill={card} {...ink} strokeWidth={4} />
      <circle cx="260" cy="202" r="20" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M150 100 H230 V130 H150 Z M236 108 H274 V130 H236 Z" w={4} />
      <Line d="M170 100 V90 H210 V100" w={3} />
      <Line d="M90 160 L116 156" w={5} />
      <Ground y={228} />
    </Drawing>
  );
}

export function GlowHusk() {
  return (
    <Drawing label="Drawing of a bloated, sickly glowing once-human shambler with arms stretched out groaning for water">
      <Glow x={200} y={130} r={98} />
      <Shape d="M170 80 C164 36 236 36 230 80 C236 106 164 106 170 80 Z" />
      <Dot x={188} y={74} r={4} />
      <Dot x={212} y={74} r={4} />
      <Shape d="M188 92 Q200 112 212 92 Z" w={3} />
      <Shape d="M148 106 C130 150 140 200 200 206 C260 200 270 150 252 106 C220 114 180 114 148 106 Z" />
      <Line d="M160 124 L116 140 L84 150 M240 124 L284 140 L316 150" w={8} />
      <Line d="M180 150 q12 10 4 22 M220 144 q-10 12 -2 26" w={3} />
      <Line d="M170 206 V226 M230 206 V226" w={8} />
      <Line d="M186 62 l-6 -8 M214 62 l6 -8" w={3} />
    </Drawing>
  );
}
