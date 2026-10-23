import { Dot, Drawing, ink, Line, Shape, CARD_COLOR } from "../../core/artStyle";
import { ghostBody } from "./Part1";

const card = CARD_COLOR;

export function WarpJester() {
  return (
    <Drawing label="Drawing of a jingling clown-shaped daemon juggling three skulls">
      <Shape d="M176 76 C170 36 230 36 224 76 C230 100 170 100 176 76 Z" />
      <Shape d="M172 50 L148 20 L132 40 L164 56 Z M228 50 L252 20 L268 40 L236 56 Z" w={4} />
      <circle cx="132" cy="40" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="268" cy="40" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={190} y={72} r={4} />
      <Dot x={210} y={72} r={4} />
      <Line d="M184 86 Q200 108 216 86" w={4} />
      <Shape d="M152 106 H248 L262 190 H138 Z" />
      <Line d="M150 120 L200 190 L250 120 M150 190 L200 120" w={3} />
      <Line d="M156 114 L110 80 M244 114 L290 80" w={7} />
      {/* Repeat the shape at each listed position. */}
      {[[150, 30], [200, 12], [250, 30]].map(([x, y], index) => (
        <g key={index}>
          <Shape d={`M${x - 14} ${y + 4} C${x - 14} ${y - 18} ${x + 14} ${y - 18} ${x + 14} ${y + 4} L${x + 8} ${y + 14} H${x - 8} Z`} w={3} />
          <Dot x={x - 5} y={y - 2} r={2.5} />
          <Dot x={x + 5} y={y - 2} r={2.5} />
        </g>
      ))}
      <Line d="M170 190 L150 224 M230 190 L250 224" w={8} />
      <Shape d="M130 224 h28 l-4 -8 h-20 Z M242 224 h28 l-4 -8 h-20 Z" w={3} />
      <Line d="M80 120 q-14 -4 -16 8 M320 120 q14 -4 16 8" w={3} dash="2 4" />
    </Drawing>
  );
}

export function DataSuccubus() {
  return (
    <Drawing label="Drawing of a seductive net-spirit wearing a lover's face, trailing code and drawing on a hacked victim">
      <Shape d="M166 76 C160 34 240 34 234 76 C240 104 160 104 166 76 Z" />
      <Line d="M170 56 C150 90 140 130 152 160 M230 56 C250 90 260 130 248 160" w={5} />
      <Line d="M182 70 q8 -6 16 0 M202 70 q8 -6 16 0" w={3} />
      <Dot x={190} y={78} r={3} />
      <Dot x={210} y={78} r={3} />
      <Line d="M186 92 Q200 102 214 92" w={3} />
      <Shape d="M168 106 H232 L246 160 H154 Z" />
      <Line d="M154 160 C140 190 130 210 120 224 M246 160 C260 190 270 210 280 224" w={3} dash="3 4" />
      <Line d="M170 116 L130 150 M230 116 L270 150" w={5} />
      <Line d="M290 130 H340 M290 144 H370 M290 158 H350 M300 172 H380" w={2} dash="3 3" />
      <Shape d="M50 150 H110 V210 H50 Z" w={4} />
      <Line d="M60 166 H100 M60 180 H92 M60 194 H100" w={2} dash="3 3" />
      <circle cx="80" cy="130" r="10" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function TickTockWraith() {
  return (
    <Drawing label="Drawing of a pale shape inside a great clock tower whispering the hours of the dead">
      <Shape d="M110 224 V60 L200 10 L290 60 V224 Z" w={5} />
      <circle cx="200" cy="82" r="44" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 46 V54 M200 110 V118 M164 82 H172 M228 82 H236" w={4} />
      <Line d="M200 82 V56 M200 82 L220 94" w={4} />
      <path d={ghostBody(150, 250, 120, 214)} fill={card} stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <Dot x={182} y={150} r={4} />
      <Dot x={218} y={150} r={4} />
      <Line d="M188 172 q12 8 24 0" w={3} />
      <Line d="M150 150 L90 120 L70 140 M250 150 L310 120 L330 140" w={6} />
      <Line d="M50 60 q10 -8 20 0 M330 60 q10 -8 20 0 M40 180 q10 -8 20 0 M340 190 q10 -8 20 0" w={3} dash="2 5" />
      <Line d="M130 224 V210 M270 224 V210" w={4} />
    </Drawing>
  );
}
