import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Glow } from "./Part1";

const card = CARD_COLOR;

export function GlowWraith() {
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

export function DustOracle() {
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

export function LanternGhost() {
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

export function FallPoutRevenant() {
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

export function AshenHerald() {
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

export function GlowingMemory() {
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

export function FalloutBanshee() {
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
