import { Dot, Drawing, Ground, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

/** Short radiation burst lines around a point. */
export function Glow({ x, y, r = 30 }: { x: number; y: number; r?: number }) {
  // Evenly spaced rays around the centre.
  const rays = Array.from({ length: 8 }, (_unused, index) => {
    const a = (index / 8) * Math.PI * 2;

    return `M${x + Math.cos(a) * r} ${y + Math.sin(a) * r} l${Math.cos(a) * 10} ${Math.sin(a) * 10}`;
  }).join(" ");

  return <Line d={rays} w={3} />;
}

export function ScrapGolem() {
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

export function TinCanPup() {
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

export function JunkyardGuardBot() {
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

export function WarMachineRemnant() {
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

export function VendingBuddy() {
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

export function RotorScavenger() {
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

export function PocketWatchSentinel() {
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

export function GlowRat() {
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
