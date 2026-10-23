import { Dot, Drawing, Ground, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function TumbleweedImp() {
  return (
    <Drawing label="Drawing of a bouncing ball of dried scrub with eyes">
      <circle cx="200" cy="120" r="70" fill={card} {...ink} />
      <Line d="M150 80 C190 60 230 70 250 100 M140 120 C190 100 240 110 262 140 M156 160 C200 140 230 150 246 176 M180 56 C200 100 190 140 170 180 M220 58 C210 100 224 140 236 176" w={3} />
      <Line d="M140 90 L160 124 L136 140 M258 100 L238 134 L262 156 M170 66 L190 108 M232 66 L216 112" w={3} />
      <circle cx="184" cy="112" r="10" fill={card} {...ink} strokeWidth={3} />
      <circle cx="218" cy="112" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={114} r={4} />
      <Dot x={220} y={114} r={4} />
      <Line d="M186 142 Q200 134 216 142" w={3} />
      <Line d="M60 214 q10 -8 20 0 M110 224 q8 -6 16 0 M300 216 q10 -8 20 0 M340 226 q8 -6 16 0" w={3} />
      <Line d="M90 130 q-10 -16 -4 -30 M312 90 q10 -14 6 -28" w={3} dash="3 6" />
      <Ground y={232} />
    </Drawing>
  );
}

export function StoneGolem() {
  return (
    <Drawing label="Drawing of a blocky statue covered in glowing runes">
      <Shape d="M170 90 V50 H230 V90 Z" />
      <Line d="M184 66 H194 M206 66 H216" w={5} />
      <Line d="M190 80 H210" w={3} />
      <Shape d="M130 96 H270 V180 H130 Z" />
      <Line d="M196 112 V164 M180 124 L196 112 L212 124 M184 150 H208" w={3} />
      <Shape d="M90 100 H128 V170 H90 Z" />
      <Shape d="M272 100 H310 V170 H272 Z" />
      <Shape d="M84 170 H134 V196 H84 Z M266 170 H316 V196 H266 Z" w={4} />
      <Shape d="M140 180 H196 V224 H140 Z M204 180 H260 V224 H204 Z" />
      <Line d="M104 112 l8 8 l-8 8 M290 116 l8 8 M148 198 l8 -8 l8 8 M224 198 h20" w={3} />
      <Line d="M150 110 l6 4 M240 150 l8 -4" w={2} />
      <Line d="M170 226 H230" w={2} />
    </Drawing>
  );
}

export function SteamGolem() {
  return (
    <Drawing label="Drawing of a riveted iron giant with a boiler chest venting steam">
      <Shape d="M168 90 V50 H232 V90 Z" />
      <Line d="M180 66 H220" w={5} />
      <Dot x={190} y={66} r={3} />
      <Dot x={210} y={66} r={3} />
      <Line d="M176 34 V50 M224 34 V50" w={5} />
      <Shape d="M130 96 H270 V190 H130 Z" />
      <circle cx="200" cy="140" r="30" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 120 V140 L214 148" w={3} />
      <Dot x={140} y={106} r={3} />
      <Dot x={260} y={106} r={3} />
      <Dot x={140} y={180} r={3} />
      <Dot x={260} y={180} r={3} />
      <Shape d="M96 100 H128 V176 H96 Z M272 100 H304 V176 H272 Z" />
      <Shape d="M144 190 H194 V226 H144 Z M206 190 H256 V226 H206 Z" />
      <Line d="M290 100 V70 H316" w={7} />
      <Line d="M326 60 q14 -10 22 2 M330 40 q18 -12 30 2 M316 20 q14 -12 26 0" w={3} />
      <Line d="M110 100 V76" w={7} />
      <Line d="M100 62 q10 -10 20 0 M104 44 q10 -10 22 0" w={3} />
    </Drawing>
  );
}

export function RuneTeapot() {
  return (
    <Drawing label="Drawing of a small teapot covered in glowing runes, pouring into a cup">
      <Shape d="M120 130 C100 70 260 70 250 130 C250 180 220 200 190 200 C150 200 120 180 120 130 Z" />
      <Shape d="M150 80 H220 C220 60 150 60 150 80 Z" w={4} />
      <Dot x={185} y={56} r={5} />
      <Line d="M120 120 C70 110 70 170 120 160" w={6} />
      <Shape d="M250 120 L296 78 L316 90 L262 150 Z" />
      <Line d="M312 98 C322 130 322 160 316 170" w={4} dash="3 5" />
      <Line d="M160 110 l10 14 l-10 14 M200 106 v36 M184 124 h32 M230 108 l-10 10 l12 8" w={3} />
      <Shape d="M290 176 H350 L342 214 H298 Z" w={4} />
      <Line d="M350 184 C372 184 372 204 346 206" w={4} />
      <Line d="M150 200 V214 M230 200 V214" w={8} />
      <Line d="M90 70 l4 8 M100 50 l8 4 M60 100 l8 0 M330 60 l6 6" w={3} />
      <Ground y={218} x1={80} x2={300} />
    </Drawing>
  );
}

export function ScarecrowSentinel() {
  return (
    <Drawing label="Drawing of a straw-stuffed scarecrow on a post with outstretched arms and a pointed hat">
      <Line d="M200 100 V230 M110 130 H290" w={7} />
      <Shape d="M156 56 L200 6 L244 56 Z" />
      <Line d="M140 60 H260" w={6} />
      <Shape d="M168 62 H232 V104 H168 Z" />
      <Dot x={186} y={80} r={4} />
      <Dot x={214} y={80} r={4} />
      <Line d="M186 94 l28 0 M190 90 v8 M200 90 v8 M210 90 v8" w={3} />
      <Shape d="M168 110 H232 L240 190 H160 Z" />
      <Line d="M180 130 l10 10 M220 130 l-10 10 M176 160 h48" w={3} />
      <Line d="M110 130 l-14 -4 M110 130 l-14 8 M110 130 l-16 -12 M290 130 l14 -4 M290 130 l14 8 M290 130 l16 -12" w={4} />
      <Line d="M170 190 l-4 16 M184 190 l2 18 M216 190 l-2 18 M232 190 l4 16" w={4} />
      <Line d="M60 210 v14 M52 218 h16 M330 200 v14 M322 208 h16" w={3} />
      <Ground y={230} />
    </Drawing>
  );
}

export function RatKing() {
  return (
    <Drawing label="Drawing of a knot of rats with tangled tails and many eyes">
      <Line d="M120 190 C60 200 60 120 140 130 C200 136 150 190 220 180 C280 170 260 120 310 140" w={6} />
      <Shape d="M110 150 C110 90 290 90 290 150 C290 200 110 200 110 150 Z" />
      <Shape d="M130 108 L124 78 L150 96 Z M270 108 L276 78 L250 96 Z" w={4} />
      <Shape d="M176 102 L172 62 L204 86 Z M224 102 L228 62 L196 86 Z" w={4} />
      <circle cx="150" cy="130" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="184" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="218" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="252" cy="130" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="170" cy="156" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="232" cy="156" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={150} y={130} r={3} />
      <Dot x={184} y={120} r={3} />
      <Dot x={218} y={120} r={3} />
      <Dot x={252} y={130} r={3} />
      <Dot x={170} y={156} r={2.5} />
      <Dot x={232} y={156} r={2.5} />
      <Line d="M170 180 l6 10 l6 -10 l6 10 l6 -10 l6 10 l6 -10 l6 10 l6 -10" w={3} />
      <Line d="M90 140 l-24 -6 M90 150 l-26 4 M310 140 l24 -6 M310 150 l26 4" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}
