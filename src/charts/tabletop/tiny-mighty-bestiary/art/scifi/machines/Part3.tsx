import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function ScrapperDroneHive() {
  return (
    <Drawing label="Drawing of a mother drone surrounded by a swarm of tiny scavenger bots">
      <Shape d="M150 90 H250 C270 90 280 120 250 140 H150 C120 120 130 90 150 90 Z" />
      <circle cx="200" cy="114" r="14" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={114} r={5} />
      <Line d="M150 90 L120 60 M250 90 L280 60 M120 60 H100 M280 60 H300" w={5} />
      {[[70, 40], [330, 40], [60, 120], [340, 120], [90, 190], [310, 190], [200, 190], [150, 50], [260, 50]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <Shape d="M-12 -6 H12 V8 H-12 Z" w={3} />
          <Line d="M-16 -10 H-6 M6 -10 H16" w={3} />
          <Dot x={0} y={1} r={2} />
        </g>
      ))}
      <Line d="M130 150 L100 180 M270 150 L300 180 M200 150 V176" w={3} dash="3 5" />
    </Drawing>
  );
}

/* Beasts */

export function CaveSucker() {
  return (
    <Drawing label="Drawing of a leathery bat-winged leech chewing a power cable">
      <Shape d="M180 100 C140 70 90 50 40 60 C70 80 74 100 70 126 C110 120 150 126 180 140 Z" />
      <Shape d="M220 100 C260 70 310 50 360 60 C330 80 326 100 330 126 C290 120 250 126 220 140 Z" />
      <Shape d="M170 110 C170 80 230 80 230 110 L220 190 C220 206 180 206 180 190 Z" />
      <circle cx="200" cy="206" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M192 204 h16" w={2} />
      <Dot x={188} y={104} r={3} />
      <Dot x={212} y={104} r={3} />
      <Line d="M100 224 C140 210 160 216 196 210 M204 210 C240 216 270 208 310 224" w={7} />
      <Line d="M196 214 l-10 12 M206 214 l12 10" w={3} />
      <Solid d="M180 226 l6 -12 l6 12 Z" />
      <Line d="M190 232 l-6 -10 l10 4 Z" w={2} />
    </Drawing>
  );
}

export function FrostStrider() {
  return (
    <Drawing label="Drawing of a shaggy two-legged snow lizard with a saddle, on an ice field">
      <Shape d="M130 150 C130 90 220 80 250 110 C280 130 280 170 250 180 H150 Z" />
      <Shape d="M240 100 C250 60 300 50 330 70 L370 80 L330 96 C310 116 270 120 250 110 Z" />
      <Dot x={316} y={72} r={4} />
      <Line d="M150 170 L140 224 M230 180 L240 224" w={9} />
      <Line d="M140 224 l-16 0 M240 224 l16 0" w={5} />
      <Line d="M130 140 C80 150 60 120 70 100 C90 106 96 120 110 126" w={7} />
      <Line d="M150 100 l-6 -12 M170 92 l-4 -14 M190 90 l-2 -14 M210 94 l2 -14" w={4} />
      <Shape d="M170 82 H220 V96 H170 Z" w={4} />
      <circle cx="195" cy="68" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M195 78 V82" w={3} />
      <Line d="M30 228 H370" w={3} dash="2 10" />
      <Line d="M40 40 l4 8 M70 24 l0 10 M350 30 l-4 8" w={3} />
    </Drawing>
  );
}

export function SnowMauler() {
  return (
    <Drawing label="Drawing of a white-furred ice-field hunter dragging its prey by the scruff">
      <Shape d="M90 190 C60 140 120 100 200 104 C270 108 300 140 290 190 Z" />
      <Shape d="M270 130 C262 90 296 66 330 76 C360 86 364 120 344 140 C326 156 280 156 270 130 Z" />
      <Shape d="M276 90 L270 62 L296 78 Z" w={4} />
      <Dot x={326} y={100} r={4} />
      <Line d="M338 128 q8 8 16 0" w={3} />
      <Solid d="M334 134 l4 8 l4 -8 Z M346 132 l4 8 l4 -8 Z" />
      <Line d="M110 190 V224 M160 192 V224 M240 192 V224 M280 190 V224" w={9} />
      <Line d="M110 120 l6 12 M140 112 l6 12 M170 110 l6 12 M200 110 l6 12 M230 114 l6 12" w={3} />
      <Shape d="M340 200 L384 214 L346 224 Z" w={3} />
      <Line d="M360 150 L350 200" w={6} />
      <Line d="M20 228 H380" w={3} dash="2 10" />
    </Drawing>
  );
}

export function CosmicWhale() {
  return (
    <Drawing label="Drawing of a ship-sized whale among stars with tiny cargo ships in its slipstream">
      <Shape d="M60 120 C60 60 220 40 310 90 C350 110 360 150 334 160 C290 190 190 200 130 180 C90 168 60 150 60 120 Z" />
      <Shape d="M60 120 L24 84 L36 130 L18 150 L64 138 Z" />
      <Dot x={300} y={110} r={5} />
      <Line d="M150 170 C190 200 260 200 300 168 M170 186 H280" w={3} />
      <Line d="M180 100 Q220 70 260 90" w={3} />
      <Line d="M110 100 l6 6 M140 90 l6 6 M170 80 l6 6 M110 130 l6 6" w={3} />
      <Line d="M340 70 q10 -10 20 0 M350 40 q10 -10 20 0" w={3} dash="2 5" />
      <Shape d="M14 200 L40 196 L52 200 L40 206 Z" w={3} />
      <Shape d="M60 214 L84 210 L94 214 L84 220 Z" w={3} />
      <Line d="M110 206 H160 M120 218 H180" w={2} dash="4 5" />
      <Line d="M30 40 v10 M25 45 h10 M120 30 v8 M116 34 h8 M380 120 v8 M376 124 h8 M200 20 v10 M195 25 h10" w={3} />
    </Drawing>
  );
}

export function HiveStalker() {
  return (
    <Drawing label="Drawing of a sleek black insectoid hunter with an eyeless elongated head and an inner jaw">
      <Shape d="M60 150 C70 120 140 110 200 120 C240 126 250 140 240 160 C200 176 100 176 60 150 Z" />
      <Shape d="M236 120 C250 80 300 60 360 76 C340 90 320 96 310 104 C300 110 270 130 244 150 Z" />
      <Solid d="M360 76 L378 82 L360 88 Z" />
      <Line d="M318 98 l-8 8 l-8 -2 M330 92 l-10 6" w={3} />
      <Line d="M110 146 L90 190 L70 224 M150 156 L140 200 L130 224 M210 156 L220 200 L226 224" w={5} />
      <Line d="M60 150 C20 140 10 100 30 80 C40 96 50 110 60 120" w={6} />
      <Line d="M130 120 l-10 -22 M170 116 l-4 -24 M210 124 l4 -22" w={5} />
      <Line d="M270 180 q10 14 0 26 M290 190 q8 10 0 20" w={3} dash="2 5" />
    </Drawing>
  );
}
