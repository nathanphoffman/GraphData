import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid } from "./artStyle";
import { Figure } from "./figure";

const card = "var(--b-card)";

/** Short radiation burst lines around a point. */
function Glow({ x, y, r = 30 }: { x: number; y: number; r?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return `M${x + Math.cos(a) * r} ${y + Math.sin(a) * r} l${Math.cos(a) * 10} ${Math.sin(a) * 10}`;
  }).join(" ");
  return <Line d={rays} w={3} />;
}

function ScrapGolem() {
  return (
    <Drawing label="Drawing of a lumbering heap of cars, pipes and appliances held together with wires">
      <Shape d="M150 40 H250 V80 H150 Z" />
      <Shape d="M166 50 H190 V66 H166 Z M210 50 H234 V66 H210 Z" w={3} />
      <Shape d="M110 84 H290 V170 H110 Z" />
      <Shape d="M120 96 H200 V140 H120 Z" w={4} />
      <Line d="M128 100 L192 136 M192 100 L128 136" w={2} />
      <Line d="M210 100 V160 M230 100 V160 M250 100 V160 M270 100 V160" w={5} />
      <Shape d="M60 90 H110 V190 H60 Z" w={4} />
      <Shape d="M290 90 H340 V150 H290 Z" w={4} />
      <circle cx="62" cy="200" r="16" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M130 170 H190 V224 H130 Z M210 170 H270 V224 H210 Z" w={4} />
      <Line d="M110 120 C90 130 80 100 70 110 M290 130 C310 120 320 150 340 140 M200 170 C190 150 210 150 200 140" w={3} />
      <Line d="M260 36 l14 -10 l8 12" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function TinCanPup() {
  return (
    <Drawing label="Drawing of a wobbly dog made of two tin cans, a spring and headlight eyes">
      <Shape d="M90 110 H210 V176 H90 Z" />
      <Line d="M90 126 H210 M90 160 H210" w={3} />
      <Line d="M210 146 q10 -12 20 0 q10 12 20 0" w={5} />
      <Shape d="M250 106 H320 V170 H250 Z" />
      <circle cx="270" cy="128" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="302" cy="128" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={270} y={128} r={3} />
      <Dot x={302} y={128} r={3} />
      <Shape d="M320 140 H350 V156 H320 Z" w={4} />
      <Dot x={340} y={144} r={3} />
      <Line d="M262 106 L252 80 L274 100 M308 106 L318 80 L296 100" w={4} />
      <Line d="M104 176 V212 M190 176 V212 M262 170 V212 M308 170 V212" w={6} />
      <Line d="M90 130 C60 120 50 80 70 70 C90 66 90 90 76 92" w={5} />
      <Line d="M40 90 q-10 6 -8 16 M30 70 q-12 4 -14 14" w={3} dash="2 5" />
      <Ground y={218} />
    </Drawing>
  );
}

function JunkyardGuardBot() {
  return (
    <Drawing label="Drawing of a rusted guard-bot with one working eye in front of a junkyard gate">
      <Line d="M290 224 V60 M350 224 V60" w={6} />
      <Line d="M290 80 L350 110 M290 120 L350 150 M290 160 L350 190" w={4} />
      <Shape d="M150 40 H230 V92 H150 Z" />
      <circle cx="190" cy="66" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={190} y={66} r={5} />
      <Line d="M160 50 l10 14" w={3} />
      <Shape d="M130 100 H250 V174 H130 Z" />
      <Line d="M130 124 H250 M130 150 H250" w={3} />
      <Line d="M130 112 L100 160 L110 190 M250 112 L280 150" w={8} />
      <Shape d="M270 140 H320 V160 H270 Z" w={4} />
      <Shape d="M144 174 H190 V226 H144 Z M200 174 H246 V226 H200 Z" w={4} />
      <Line d="M160 108 l10 8 M220 140 l-10 10" w={2} />
    </Drawing>
  );
}

function WarMachineRemnant() {
  return (
    <Drawing label="Drawing of a six-legged rusted war machine with a minigun on patrol">
      <Shape d="M110 80 H290 V140 H110 Z" />
      <Shape d="M240 90 H320 V108 H240 Z" w={4} />
      <Line d="M320 99 H360 M320 94 H360 M320 104 H360" w={3} />
      <Shape d="M130 60 H200 V80 H130 Z" w={4} />
      <circle cx="170" cy="110" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={110} r={3} />
      <Line d="M130 140 L96 190 L80 224 M170 140 L160 190 L156 224 M210 140 L220 190 L226 224 M250 140 L270 190 L290 224 M150 140 L130 180 M230 140 L250 180" w={7} />
      <Line d="M120 90 v14 M140 92 v18 M260 120 v14" w={2} dash="2 3" />
      <Line d="M370 80 l10 -6 M372 100 l14 0" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function VendingBuddy() {
  return (
    <Drawing label="Drawing of a dented vending machine with a face dispensing a single can of soda">
      <Shape d="M120 20 H280 V218 H120 Z" />
      <Shape d="M136 36 H264 V120 H136 Z" w={4} />
      <circle cx="170" cy="70" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="230" cy="70" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={70} r={3} />
      <Dot x={230} y={70} r={3} />
      <Line d="M170 98 Q200 114 230 98" w={4} />
      <Shape d="M136 132 H190 V156 H136 Z" w={4} />
      <Dot x={220} y={140} r={4} />
      <Dot x={244} y={140} r={4} />
      <Shape d="M150 176 H250 V204 H150 Z" w={4} />
      <Shape d="M172 184 H184 V200 H172 Z" w={3} />
      <Line d="M130 90 l20 8 M268 60 l-10 14" w={3} />
      <Line d="M120 218 V228 M280 218 V228" w={7} />
      <Line d="M300 190 l24 -6 M300 204 l24 4" w={3} />
    </Drawing>
  );
}

function RotorScavenger() {
  return (
    <Drawing label="Drawing of a crude scrap quadcopter with spinning fan blades and a hook claw">
      <Line d="M60 80 H340" w={5} />
      <ellipse cx="80" cy="74" rx="42" ry="8" fill={card} {...ink} strokeWidth={3} />
      <ellipse cx="320" cy="74" rx="42" ry="8" fill={card} {...ink} strokeWidth={3} />
      <Shape d="M150 90 H250 V150 H150 Z" />
      <Line d="M150 108 H250" w={3} />
      <circle cx="200" cy="130" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={130} r={5} />
      <Line d="M80 80 V92 M320 80 V92" w={4} />
      <Line d="M170 150 V184 L152 200 M230 150 V184 L248 200" w={5} />
      <Line d="M152 200 l-8 6 M248 200 l8 6" w={3} />
      <Line d="M200 150 V196 q10 4 14 -8" w={4} />
      <Line d="M130 112 l-10 4 M270 112 l10 4" w={2} />
      <Line d="M90 40 q10 -8 20 0 M290 40 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function PocketWatchSentinel() {
  return (
    <Drawing label="Drawing of a coffin-sized watch-shaped guard standing on mechanical legs">
      <circle cx="200" cy="100" r="76" fill={card} {...ink} />
      <circle cx="200" cy="100" r="60" fill="none" {...ink} strokeWidth={3} />
      <Line d="M200 48 V60 M200 140 V152 M148 100 H160 M240 100 H252 M163 63 l8 8 M237 63 l-8 8 M163 137 l8 -8 M237 137 l-8 -8" w={4} />
      <Line d="M200 100 V64 M200 100 L226 116" w={5} />
      <Dot x={200} y={100} r={5} />
      <Shape d="M186 18 H214 V28 H186 Z" w={4} />
      <circle cx="200" cy="10" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M200 176 V190 M170 170 L150 200 L130 224 M230 170 L250 200 L270 224" w={6} />
      <Line d="M130 224 h24 M270 224 h-24" w={5} />
      <Line d="M124 100 L96 130 M276 100 L304 130" w={6} />
      <Shape d="M86 128 h20 v12 h-20 Z M294 128 h20 v12 h-20 Z" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function GlowRat() {
  return (
    <Drawing label="Drawing of a cat-sized rat glowing in the dark, radiating light">
      <Glow x={214} y={140} r={96} />
      <Line d="M70 150 C40 150 30 110 52 92 C68 80 86 92 70 106" w={5} />
      <Shape d="M90 150 C90 100 170 82 230 94 C262 100 278 112 290 120 L330 126 C344 128 352 134 352 140 C352 148 340 152 326 152 L290 156 C274 186 220 194 170 190 C120 186 90 178 90 150 Z" />
      <Shape d="M262 98 a20 24 0 1 0 0.1 0 Z" w={5} />
      <circle cx="304" cy="124" r="7" fill="currentColor" />
      <circle cx="350" cy="138" r="5" fill="currentColor" />
      <Line d="M112 178 L100 208 L128 208 M150 184 L146 208 L172 208 M250 184 L254 208 L280 208 M222 180 L212 208 L238 208" w={5} />
      <Line d="M338 124 L384 108 M338 130 L386 130 M338 136 L382 152" w={4} />
      <Ground y={216} />
    </Drawing>
  );
}

function AtomicRoach() {
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

function RadHound() {
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

function RadBear() {
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

function DoomHoundAlpha() {
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

function WastelandVulture() {
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

function IrradiatedAurochs() {
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

function JunkScavenger() {
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

function WastelandRaider() {
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

function WastelandMerchant() {
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

function GlowHusk() {
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

function MutantBrute() {
  return (
    <Drawing label="Drawing of a ten-foot muscle-bound mutant dragging a street sign and screaming for a fight">
      <Shape d="M168 56 C164 20 236 20 232 56 C236 82 164 82 168 56 Z" />
      <Dot x={186} y={48} r={4} />
      <Dot x={214} y={48} r={4} />
      <Shape d="M182 62 Q200 86 218 62 Z" w={3} />
      <Line d="M176 38 l14 6 M224 38 l-14 6" w={4} />
      <Shape d="M100 84 C120 70 280 70 300 84 C320 130 290 180 260 190 H140 C110 180 80 130 100 84 Z" />
      <Line d="M170 110 q30 14 60 0 M160 140 q40 14 80 0" w={3} />
      <Line d="M110 100 L70 150 L96 190 M290 100 L336 140 L324 190" w={14} />
      <Line d="M324 190 L360 224" w={5} />
      <Shape d="M330 20 H380 V50 H330 Z" w={4} />
      <Line d="M355 50 V224" w={5} />
      <Line d="M340 34 h30" w={3} />
      <Line d="M150 190 V226 M250 190 V226" w={16} />
    </Drawing>
  );
}

function WastelandWarlord() {
  return (
    <Drawing label="Drawing of a scarred skull-masked king of the wastes before his war-rig and raiders">
      <Shape d="M240 100 H390 V190 H240 Z" w={5} />
      <Shape d="M240 80 H300 V100 H240 Z" w={4} />
      <circle cx="270" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="356" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M260 60 V40 M340 60 V24 M240 100 L220 80" w={4} />
      <Shape d="M110 82 C106 38 190 38 186 82 C190 100 110 100 110 82 Z" />
      <Dot x={132} y={70} r={7} />
      <Dot x={164} y={70} r={7} />
      <Line d="M138 90 V96 M148 90 V98 M158 90 V96" w={3} />
      <Line d="M112 56 l-14 -20 M186 56 l14 -20 M150 40 v-24" w={5} />
      <Shape d="M90 108 H210 L222 200 H78 Z" />
      <Solid d="M90 108 l-18 -14 l24 2 Z M210 108 l18 -14 l-24 2 Z" />
      <Line d="M150 108 V200 M100 150 H200" w={3} />
      <Line d="M96 124 L66 170 M204 124 L230 150" w={9} />
      <Line d="M110 200 V226 M190 200 V226" w={9} />
    </Drawing>
  );
}

function BottlecapHermit() {
  return (
    <Drawing label="Drawing of a bearded old hermit in a coat of sewn-on bottle caps">
      <Shape d="M168 74 C164 30 236 30 232 74 C236 100 164 100 168 74 Z" />
      <Line d="M170 50 q30 -22 60 0" w={4} />
      <Dot x={188} y={68} r={3} />
      <Dot x={212} y={68} r={3} />
      <Shape d="M172 84 C170 130 190 144 200 146 C210 144 230 130 228 84 C214 98 186 98 172 84 Z" w={4} />
      <Shape d="M144 112 H256 L270 224 H130 Z" />
      {[[168, 134], [200, 130], [232, 134], [156, 164], [186, 160], [216, 160], [246, 164], [170, 192], [200, 190], [232, 192], [146, 208], [254, 208]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill={card} stroke="currentColor" strokeWidth="2.5" />
          <circle cx={x} cy={y} r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 2.4" />
        </g>
      ))}
      <Line d="M150 118 L124 160 M250 118 L276 160" w={7} />
      <Line d="M290 40 q10 -8 20 0 M310 70 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function VaultTyrant() {
  return (
    <Drawing label="Drawing of a shriveled old ruler in pre-war armor in front of a round vault door">
      <circle cx="320" cy="120" r="64" fill={card} {...ink} />
      <circle cx="320" cy="120" r="46" fill="none" {...ink} strokeWidth={4} />
      <Line d="M320 74 V166 M274 120 H366 M288 88 L352 152 M352 88 L288 152" w={3} />
      <circle cx="320" cy="120" r="10" fill="currentColor" />
      <Shape d="M126 86 C122 46 186 46 182 86 L180 104 H128 Z" />
      <Dot x={144} y={78} r={3} />
      <Dot x={164} y={78} r={3} />
      <Line d="M146 92 H162 M138 70 l8 -4 M170 70 l-8 -4" w={3} />
      <Shape d="M96 110 H208 L220 190 H84 Z" />
      <Shape d="M96 110 L80 130 L96 150 Z M208 110 L224 130 L208 150 Z" w={4} />
      <Line d="M152 110 V190" w={3} />
      <Shape d="M100 190 H148 V226 H100 Z M156 190 H204 V226 H156 Z" w={4} />
      <Line d="M104 122 L74 160 M204 122 L240 160" w={7} />
      <Line d="M226 160 l16 -14 l8 12" w={4} />
    </Drawing>
  );
}

function ScrapKid() {
  return (
    <Drawing label="Drawing of a kid in a patched helmet carrying a rusty crossbow">
      <Shape d="M176 96 C170 50 230 50 224 96 L220 112 H180 Z" />
      <Line d="M184 86 H216" w={4} />
      <Dot x={192} y={96} r={3} />
      <Dot x={208} y={96} r={3} />
      <Shape d="M168 112 H232 L240 180 H160 Z" />
      <Line d="M200 112 V180" w={3} />
      <Shape d="M176 120 h14 v12 h-14 Z" w={2} />
      <Line d="M170 120 L148 160 M230 120 L270 130" w={6} />
      <Shape d="M260 126 H340 V140 H260 Z" w={4} />
      <Line d="M290 100 Q330 133 290 166" w={5} />
      <Line d="M290 100 L290 166" w={2} />
      <Line d="M170 180 V224 M230 180 V224" w={8} />
      <Shape d="M156 62 l10 -18 l8 14 Z" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function TinkeringGranny() {
  return (
    <Drawing label="Drawing of a cheerful old woman with a ladle beside a toaster built from scrap">
      <Shape d="M168 74 C164 34 236 34 232 74 C236 98 164 98 168 74 Z" />
      <Line d="M170 58 C176 40 224 40 230 58" w={4} />
      <Shape d="M166 40 a34 18 0 0 1 68 0" w={4} />
      <Dot x={186} y={72} r={3} />
      <Dot x={214} y={72} r={3} />
      <Line d="M186 86 Q200 98 214 86" w={4} />
      <circle cx="176" cy="74" r="10" fill="none" {...ink} strokeWidth={2} />
      <circle cx="224" cy="74" r="10" fill="none" {...ink} strokeWidth={2} />
      <Shape d="M150 104 H250 L268 224 H132 Z" />
      <Shape d="M170 140 H230 V224 H170 Z" w={3} />
      <Line d="M158 112 L128 150 L110 128 M242 112 L278 130 L304 100" w={7} />
      <Line d="M304 100 L334 56" w={4} />
      <circle cx="344" cy="48" r="14" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M40 150 H100 V196 H40 Z" w={4} />
      <Line d="M52 150 V138 H88 V150" w={3} />
      <Line d="M52 170 H88" w={2} />
      <Line d="M60 130 l-6 -10 M76 130 l6 -10" w={3} />
    </Drawing>
  );
}

function ScrapNurse() {
  return (
    <Drawing label="Drawing of a stern wasteland nurse in a patched coat holding a needle and thread">
      <Shape d="M166 70 C162 32 238 32 234 70 C238 96 162 96 166 70 Z" />
      <Shape d="M166 40 H234 V54 H166 Z" w={4} />
      <Line d="M192 40 V54 M180 47 H204" w={2} />
      <Line d="M182 68 H194 M206 68 H218" w={4} />
      <Line d="M188 86 H212" w={3} />
      <Shape d="M148 104 H252 L268 224 H132 Z" />
      <Line d="M200 104 V224 M164 150 h24 M212 170 h24" w={3} />
      <Shape d="M148 104 L170 104 L182 130 L150 130 Z" w={3} />
      <Line d="M158 112 L130 156 M242 112 L276 130 L300 118" w={7} />
      <Line d="M300 118 L340 80" w={3} />
      <Line d="M340 80 q10 -10 4 -20 q-8 -8 -16 0" w={2} />
      <Shape d="M120 150 H146 V176 H120 Z" w={3} />
      <Line d="M126 163 h14 M133 156 v14" w={2} />
      <circle cx="320" cy="194" r="12" fill={card} {...ink} strokeWidth={3} />
      <circle cx="320" cy="194" r="4" fill="none" {...ink} strokeWidth={2} />
    </Drawing>
  );
}

function AshRoadPreacher() {
  return (
    <Drawing label="Drawing of a fiery preacher on a rusted motorcycle raising a fist, with pilgrims following on foot">
      <circle cx="120" cy="190" r="36" fill={card} {...ink} />
      <circle cx="120" cy="190" r="8" fill="currentColor" />
      <circle cx="300" cy="190" r="36" fill={card} {...ink} />
      <circle cx="300" cy="190" r="8" fill="currentColor" />
      <Shape d="M120 190 L180 150 H260 L300 190 L270 190 L240 164 H190 L160 190 Z" w={4} />
      <Line d="M260 150 L296 120 L316 100" w={6} />
      <Shape d="M176 74 C172 34 228 34 224 74 C228 96 176 96 176 74 Z" />
      <Line d="M184 66 H216 M192 82 l8 6 l8 -6" w={3} />
      <Shape d="M160 96 H236 L246 150 H150 Z" />
      <Line d="M236 106 L270 80 L276 44" w={7} />
      <circle cx="278" cy="36" r="10" fill={card} {...ink} strokeWidth={4} />
      <Line d="M162 110 L196 130 L260 134" w={6} />
      <Line d="M30 214 l8 -26 M50 214 l6 -30 M72 214 l4 -20" w={4} />
      <circle cx="38" cy="180" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="56" cy="176" r="6" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function WastelandGunslinger() {
  return (
    <Drawing label="Drawing of a tall scarred duelist in a duster with a rebuilt revolver at the draw">
      <Shape d="M156 62 C158 28 242 28 244 62 Z" />
      <Line d="M138 66 Q200 82 262 66" w={6} />
      <Shape d="M174 70 H226 V102 C226 120 174 120 174 102 Z" />
      <Line d="M182 80 L196 90" w={3} />
      <Dot x={190} y={86} r={3} />
      <Dot x={212} y={86} r={3} />
      <Line d="M192 104 H210" w={3} />
      <Shape d="M144 122 C150 112 250 112 256 122 L284 224 H116 Z" />
      <Line d="M200 122 V224" w={3} />
      <Line d="M158 126 L120 170 M242 126 L284 112 L304 90" w={7} />
      <Shape d="M296 78 H340 V94 H296 Z" w={4} />
      <Line d="M340 86 H364" w={4} />
      <Line d="M370 76 l12 -8 M370 96 l14 4" w={3} />
      <Line d="M130 150 H270" w={5} />
      <Ground y={228} />
    </Drawing>
  );
}

function DustTitan() {
  return (
    <Drawing label="Drawing of a hundred-foot dust-colored giant walking through a ruined city, buildings at its knees">
      <Shape d="M20 224 V150 H60 V224 Z M70 224 V120 H110 V224 Z M290 224 V140 H330 V224 Z M340 224 V160 H380 V224 Z" w={4} />
      <Line d="M30 170 h20 M30 190 h20 M80 140 h20 M80 160 h20 M80 180 h20 M300 160 h20 M300 180 h20" w={2} />
      <Shape d="M166 20 C160 -6 240 -6 234 20 C238 40 162 40 166 20 Z" />
      <Dot x={186} y={16} r={4} />
      <Dot x={214} y={16} r={4} />
      <Shape d="M120 50 H280 L300 140 H100 Z" />
      <Line d="M110 60 L70 110 L84 160 M290 60 L330 110 L320 150" w={16} />
      <Shape d="M120 140 H190 V224 H120 Z M210 140 H280 V224 H210 Z" w={5} />
      <Line d="M130 80 q20 10 40 0 M230 90 q20 10 40 0 M150 110 q30 10 60 0" w={3} dash="4 6" />
      <Line d="M20 232 q30 -14 60 0 t60 0 M260 232 q30 -14 60 0 t60 0" w={3} dash="8 8" />
    </Drawing>
  );
}

function HighwayBehemoth() {
  return (
    <Drawing label="Drawing of a freight-truck-sized beetle with a cracked windshield stuck in its shell">
      <Line d="M10 214 H390" w={4} />
      <Line d="M20 226 H380" w={3} dash="12 10" />
      <Shape d="M60 200 C50 130 120 80 200 84 C290 88 350 130 336 200 Z" />
      <Line d="M200 84 V200" w={3} />
      <Shape d="M120 100 L180 96 L176 150 L116 156 Z" w={5} />
      <Line d="M130 106 L170 144 M168 102 L132 136 M150 100 L146 152" w={2} />
      <Shape d="M310 150 C316 120 360 112 380 134 C390 154 372 172 340 174 C320 176 308 166 310 150 Z" />
      <Dot x={356} y={138} r={4} />
      <Line d="M350 112 L360 90 M370 118 L388 100" w={4} />
      <Line d="M110 200 L90 224 M170 200 L166 226 M250 200 L258 226 M320 196 L340 222" w={7} />
      <Line d="M230 120 q20 -10 40 4" w={3} />
    </Drawing>
  );
}

function MutantGrub() {
  return (
    <Drawing label="Drawing of a bloated larva eating tin cans and glowing brighter">
      <Glow x={190} y={140} r={96} />
      <Shape d="M60 190 C30 130 90 100 140 120 C180 90 270 110 280 150 C300 190 240 214 190 204 C130 214 80 214 60 190 Z" />
      <Line d="M110 126 q-6 40 6 70 M150 118 q-4 44 6 84 M200 112 q-2 44 8 90 M250 128 q0 34 -6 66" w={3} />
      <Shape d="M262 130 C270 110 310 108 320 136 C326 158 296 170 276 160 Z" />
      <Dot x={298} y={130} r={4} />
      <Shape d="M300 150 q10 8 20 0 Z" w={3} />
      <Shape d="M330 180 H364 V210 H330 Z M350 200 H384 V224 H350 Z" w={4} />
      <Line d="M330 190 H364 M350 210 H384" w={2} />
      <Line d="M304 164 L326 182" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function SumpLeech() {
  return (
    <Drawing label="Drawing of a glowing dog-sized leech rising from a toxic pond">
      <Glow x={200} y={130} r={76} />
      <Line d="M20 190 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" w={4} />
      <Line d="M10 210 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" w={3} />
      <Line d="M200 190 C200 150 150 150 160 110 C170 70 230 80 220 50" w={32} />
      <Line d="M200 190 C200 150 150 150 160 110 C170 70 230 80 220 50" w={24} />
      <Line d="M184 156 q10 -6 18 2 M160 124 q-8 -4 -4 -12 M190 82 q10 -4 14 4" w={3} />
      <circle cx="220" cy="46" r="20" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M206 44 Q220 60 234 44 Q220 50 206 44 Z" w={3} />
      <Solid d="M212 48 l3 6 l3 -6 Z M222 48 l3 6 l3 -6 Z" />
      <Line d="M60 168 q8 -10 16 0 M310 164 q8 -10 16 0" w={3} dash="2 4" />
    </Drawing>
  );
}

function GlowTroll() {
  return (
    <Drawing label="Drawing of a lumbering radioactive brute with a regrowing arm and a stop sign club">
      <Glow x={200} y={130} r={110} />
      <Shape d="M168 56 C162 18 238 18 232 56 C238 80 162 80 168 56 Z" />
      <Dot x={186} y={46} r={4} />
      <Dot x={214} y={46} r={4} />
      <Line d="M184 66 Q200 78 216 66" w={3} />
      <Shape d="M120 84 C140 70 260 70 280 84 C296 130 276 180 250 190 H150 C124 180 104 130 120 84 Z" />
      <Line d="M130 100 L96 140 L112 190" w={13} />
      <Line d="M270 100 L294 130" w={13} />
      <Line d="M294 130 l14 6 M294 130 l16 -4 M294 130 l10 14" w={4} dash="2 3" />
      <Line d="M110 190 L70 224" w={5} />
      <path d="M50 100 l18 -18 h26 l18 18 v26 l-18 18 h-26 l-18 -18 Z" fill={card} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <Line d="M82 144 V224" w={5} />
      <Line d="M70 114 h24 M70 126 h16" w={3} />
      <Line d="M160 190 V226 M240 190 V226" w={13} />
    </Drawing>
  );
}

function PlagueMammoth() {
  return (
    <Drawing label="Drawing of a mutated mammoth with a cloud of flies and a back full of cysts">
      <Shape d="M60 200 C40 130 80 80 160 76 C230 72 290 90 300 150 L300 200 Z" />
      <Shape d="M270 130 C250 80 290 50 330 60 C370 74 372 130 350 150 C340 170 300 168 270 130 Z" />
      <Dot x={318} y={92} r={4} />
      <Line d="M340 140 C350 190 336 210 320 206" w={9} />
      <Shape d="M300 150 C330 150 360 160 380 120 C376 170 340 190 300 180 Z" w={4} />
      <circle cx="110" cy="100" r="14" fill={card} {...ink} strokeWidth={3} />
      <circle cx="170" cy="90" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="230" cy="100" r="16" fill={card} {...ink} strokeWidth={3} />
      <circle cx="140" cy="140" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={110} y={100} r={3} />
      <Dot x={230} y={100} r={4} />
      <Line d="M90 200 V226 M150 200 V226 M210 200 V226 M290 200 V226" w={12} />
      {[[60, 40], [100, 24], [150, 40], [210, 30], [260, 44], [320, 30]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q4 -6 8 0 q-4 6 -8 0 Z`} fill="currentColor" />
      ))}
    </Drawing>
  );
}

function NuclearColossus() {
  return (
    <Drawing label="Drawing of a cracked glowing giant sleeping under a ruined power plant's cooling towers in the rain">
      <Shape d="M20 200 C30 150 50 110 60 100 L120 100 C130 110 150 150 160 200 Z" w={4} />
      <Shape d="M260 200 C270 150 290 110 300 100 L360 100 C370 110 390 150 400 200 Z" w={4} />
      <Shape d="M130 230 C100 190 120 130 200 120 C280 130 300 190 270 230 Z" />
      <Shape d="M170 150 C170 124 230 124 230 150 C230 170 170 170 170 150 Z" w={4} />
      <Line d="M184 148 H196 M206 148 H218" w={4} />
      <Line d="M150 190 L190 150 L170 130 L220 120 L210 100" w={3} />
      <Glow x={200} y={170} r={56} />
      <Line d="M60 20 l-8 20 M100 10 l-8 20 M150 20 l-8 20 M210 10 l-8 20 M270 20 l-8 20 M330 10 l-8 20" w={3} />
      <Line d="M20 226 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

function MutantHedgehog() {
  return (
    <Drawing label="Drawing of a beachball-sized glowing hedgehog rolling downhill">
      <Line d="M20 120 L380 224" w={4} />
      <Glow x={190} y={140} r={78} />
      <circle cx="190" cy="136" r="54" fill={card} {...ink} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2 + 0.2;
        return <path key={i} d={`M${190 + Math.cos(a) * 54} ${136 + Math.sin(a) * 54} l${Math.cos(a) * 20} ${Math.sin(a) * 20}`} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />;
      })}
      <Shape d="M222 128 C240 118 262 122 266 138 C264 154 236 156 222 148 Z" w={4} />
      <Dot x={250} y={134} r={3} />
      <Dot x={266} y={140} r={3} />
      <Line d="M160 188 l-6 10 M210 190 l4 10" w={4} />
      <Line d="M60 140 H110 M50 160 H100 M70 180 H116" w={3} dash="6 5" />
    </Drawing>
  );
}

function RadMothMatriarch() {
  return (
    <Drawing label="Drawing of a bus-sized moth hovering above a ruined city, wings spraying glowing dust">
      <Shape d="M20 224 V160 H50 V224 Z M60 224 V130 H100 V224 Z M310 224 V150 H350 V224 Z M360 224 V170 H390 V224 Z" w={3} />
      <Shape d="M200 90 C150 30 60 20 20 70 C40 100 90 120 190 116 Z" />
      <Shape d="M200 90 C250 30 340 20 380 70 C360 100 310 120 210 116 Z" />
      <Shape d="M196 110 C170 130 130 150 90 140 C130 110 170 110 196 110 Z" w={4} />
      <Shape d="M204 110 C230 130 270 150 310 140 C270 110 230 110 204 110 Z" w={4} />
      <circle cx="110" cy="76" r="12" fill="none" {...ink} strokeWidth={3} />
      <circle cx="290" cy="76" r="12" fill="none" {...ink} strokeWidth={3} />
      <Dot x={110} y={76} r={4} />
      <Dot x={290} y={76} r={4} />
      <Shape d="M184 84 C184 56 216 56 216 84 L222 150 C222 166 178 166 178 150 Z" />
      <Line d="M192 60 C180 40 160 36 150 40 M208 60 C220 40 240 36 250 40" w={4} />
      <Dot x={192} y={78} r={3} />
      <Dot x={208} y={78} r={3} />
      <Line d="M110 150 v14 M130 154 v18 M270 154 v18 M290 150 v14 M150 160 v12 M250 160 v12" w={3} dash="2 4" />
    </Drawing>
  );
}

function GlowWraith() {
  return (
    <Drawing label="Drawing of a flickering ghost rising from a blast crater and burning everything it touches">
      <Shape d="M20 224 C60 190 140 190 200 214 C260 190 340 190 380 224 Z" w={4} />
      <Shape d="M130 200 C140 150 120 100 160 70 C170 40 230 40 240 70 C280 100 260 150 270 200 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 q-14 14 -28 0 Z" />
      <ellipse cx="180" cy="84" rx="10" ry="14" fill="currentColor" />
      <ellipse cx="220" cy="84" rx="10" ry="14" fill="currentColor" />
      <ellipse cx="200" cy="120" rx="10" ry="14" fill="currentColor" />
      <Line d="M130 120 L90 100 M270 120 L310 100" w={6} />
      <Glow x={200} y={110} r={96} />
      <Line d="M60 160 q10 -10 20 0 M330 170 q10 -10 20 0" w={3} dash="2 4" />
    </Drawing>
  );
}

function DustOracle() {
  return (
    <Drawing label="Drawing of a swirling human-shaped dust devil speaking in many voices, with speech bubbles of faces">
      <path d="M200 30 C260 30 270 60 230 70 C170 80 150 100 210 110 C270 120 250 150 200 160 C150 170 160 196 200 206 C230 214 230 224 200 228" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M200 50 C150 54 150 80 190 88 C240 98 250 120 200 132 C160 142 170 170 200 176" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 6" />
      <Shape d="M178 40 C172 14 228 14 222 40 C226 58 174 58 178 40 Z" />
      <Dot x={192} y={34} r={3} />
      <Dot x={210} y={34} r={3} />
      <Line d="M194 46 Q202 52 210 46" w={3} />
      <Line d="M170 100 L120 90 M230 110 L290 96" w={5} />
      <circle cx="80" cy="60" r="22" fill={card} {...ink} strokeWidth={3} />
      <Dot x={72} y={56} r={2} />
      <Dot x={88} y={56} r={2} />
      <circle cx="326" cy="70" r="22" fill={card} {...ink} strokeWidth={3} />
      <Dot x={318} y={66} r={2} />
      <Dot x={334} y={66} r={2} />
      <Line d="M66 70 Q80 78 96 70 M312 80 Q326 88 342 80" w={2} />
    </Drawing>
  );
}

function LanternGhost() {
  return (
    <Drawing label="Drawing of a small floating lantern flame with a faint smile leading a traveler away from danger">
      <Shape d="M170 40 H230 L240 70 H160 Z" w={4} />
      <Shape d="M160 70 H240 V150 H160 Z" />
      <Line d="M180 70 V150 M220 70 V150" w={3} />
      <Shape d="M168 150 H232 L224 164 H176 Z" w={4} />
      <Line d="M200 40 V22 M188 22 H212" w={4} />
      <Solid d="M200 130 C176 118 190 100 200 84 C210 100 224 118 200 130 Z" />
      <Dot x={190} y={104} r={0} />
      <path d="M192 112 q8 6 16 0" stroke={card} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="194" cy="102" r="2" fill={card} />
      <circle cx="206" cy="102" r="2" fill={card} />
      <Glow x={200} y={104} r={60} />
      <Line d="M40 224 l60 -26 l-20 -4 M360 224 l-60 -26" w={4} dash="3 6" />
      <Shape d="M300 190 l14 -20 l14 20 Z" w={3} />
      <Line d="M314 170 V160" w={3} />
    </Drawing>
  );
}

function FallPoutRevenant() {
  return (
    <Drawing label="Drawing of a figure made of dust and radiation wearing the shape of someone who died in the blast, a shadow burned into the wall behind">
      <Shape d="M240 40 H380 V224 H240 Z" w={4} />
      <Solid d="M290 90 C286 66 322 66 318 90 L324 130 L336 180 H300 L296 140 L284 180 H268 L282 130 Z" />
      <Line d="M240 40 L270 70 M380 40 L350 60" w={3} />
      <Shape d="M110 96 C106 54 170 54 166 96 L162 116 H114 Z" />
      <path d="M126 90 C126 76 150 76 150 90 C150 100 126 100 126 90 Z" fill="currentColor" />
      <Shape d="M96 120 H180 L196 224 H80 Z" />
      <Line d="M100 130 L70 168 M176 130 L206 168" w={6} />
      <Glow x={138} y={150} r={84} />
      <Line d="M60 200 q10 -12 20 0 q10 12 20 0 M180 210 q10 -12 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function AshenHerald() {
  return (
    <Drawing label="Drawing of a tall figure of smoke and ash walking in front of a coming storm">
      <path d="M260 120 C260 60 330 30 390 50 L400 224 L270 224 C250 190 270 160 260 120 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Line d="M280 90 l60 -10 M284 130 l80 -14 M282 170 l90 -12" w={3} dash="6 6" />
      <Line d="M300 60 l-8 28 M340 54 l-8 28 M370 70 l-8 28" w={3} />
      <Shape d="M110 80 C106 34 172 34 168 80 C172 102 106 102 110 80 Z" />
      <path d="M126 76 C126 62 152 62 152 76 C152 88 126 88 126 76 Z" fill="currentColor" />
      <path d="M100 100 C70 130 70 190 90 224 H190 C210 190 200 130 170 100 C150 112 120 112 100 100 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeDasharray="10 6" strokeLinecap="round" />
      <Line d="M100 120 L60 150 M170 120 L210 140" w={5} dash="8 5" />
      <Line d="M40 70 q8 -10 16 0 M60 200 q8 -10 16 0 M200 40 q8 -10 16 0" w={3} dash="2 5" />
    </Drawing>
  );
}

function GlowingMemory() {
  return (
    <Drawing label="Drawing of a friendly shimmer of a person from before the war sitting at a table sharing a meal">
      <Shape d="M60 160 H340 V176 H60 Z" />
      <Line d="M90 176 V224 M310 176 V224" w={7} />
      <Glow x={190} y={100} r={80} />
      <path d="M150 156 C140 100 160 60 190 60 C220 60 240 100 230 156 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="5 6" strokeLinecap="round" />
      <path d="M170 76 C170 50 210 50 210 76 C210 94 170 94 170 76 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="4 5" />
      <Dot x={182} y={72} r={3} />
      <Dot x={198} y={72} r={3} />
      <Line d="M182 84 Q190 92 198 84" w={3} />
      <Line d="M168 120 L140 150 M212 120 L250 146" w={5} dash="6 5" />
      <Shape d="M250 144 H296 L290 160 H256 Z" w={4} />
      <Shape d="M262 128 H276 V144 H262 Z" w={3} />
      <Line d="M262 136 q-6 -12 2 -22" w={3} dash="2 4" />
      <Shape d="M110 144 H150 L146 160 H114 Z" w={4} />
    </Drawing>
  );
}

function FalloutBanshee() {
  return (
    <Drawing label="Drawing of a shrieking shape in a tattered dress walking ahead of a dust storm">
      <path d="M260 224 C260 160 290 120 340 110 C380 100 400 130 400 224 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Line d="M280 150 l100 -6 M278 180 l108 -8 M280 206 l110 -4" w={3} dash="8 6" />
      <Shape d="M126 78 C120 30 190 30 184 78 C188 100 122 100 126 78 Z" />
      <Line d="M126 70 C100 90 90 140 100 170 M184 70 C210 90 220 140 210 170" w={5} />
      <Dot x={144} y={66} r={4} />
      <Dot x={166} y={66} r={4} />
      <Shape d="M142 82 Q155 108 168 82 Z" w={3} />
      <path d="M100 110 L210 110 L236 224 L74 224 Z" fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Line d="M100 224 l10 -16 l10 16 M140 224 l10 -24 l10 24 M190 224 l10 -16 l10 16" w={3} />
      <Line d="M110 122 L70 150 M200 122 L240 150" w={6} />
      <Line d="M60 60 q-10 6 -8 18 M250 50 q10 6 8 18" w={3} dash="2 5" />
    </Drawing>
  );
}

export const postApocArt: Record<string, () => ReactNode> = {
  "scrap-golem": ScrapGolem,
  "tin-can-pup": TinCanPup,
  "junkyard-guard-bot": JunkyardGuardBot,
  "war-machine-remnant": WarMachineRemnant,
  "vending-buddy": VendingBuddy,
  "rotor-scavenger": RotorScavenger,
  "pocket-watch-sentinel": PocketWatchSentinel,
  "glow-rat": GlowRat,
  "atomic-roach": AtomicRoach,
  "rad-hound": RadHound,
  "rad-bear": RadBear,
  "doom-hound-alpha": DoomHoundAlpha,
  "wasteland-vulture": WastelandVulture,
  "irradiated-aurochs": IrradiatedAurochs,
  "junk-scavenger": JunkScavenger,
  "wasteland-raider": WastelandRaider,
  "wasteland-merchant": WastelandMerchant,
  "glow-husk": GlowHusk,
  "mutant-brute": MutantBrute,
  "wasteland-warlord": WastelandWarlord,
  "bottlecap-hermit": BottlecapHermit,
  "vault-tyrant": VaultTyrant,
  "scrap-kid": ScrapKid,
  "tinkering-granny": TinkeringGranny,
  "scrap-nurse": ScrapNurse,
  "ash-road-preacher": AshRoadPreacher,
  "wasteland-gunslinger": WastelandGunslinger,
  "dust-titan": DustTitan,
  "highway-behemoth": HighwayBehemoth,
  "mutant-grub": MutantGrub,
  "sump-leech": SumpLeech,
  "glow-troll": GlowTroll,
  "plague-mammoth": PlagueMammoth,
  "nuclear-colossus": NuclearColossus,
  "mutant-hedgehog": MutantHedgehog,
  "rad-moth-matriarch": RadMothMatriarch,
  "glow-wraith": GlowWraith,
  "dust-oracle": DustOracle,
  "lantern-ghost": LanternGhost,
  "fallout-revenant": FallPoutRevenant,
  "ashen-herald": AshenHerald,
  "glowing-memory": GlowingMemory,
  "fallout-banshee": FalloutBanshee,
};
