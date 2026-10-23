import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export const Steam = ({ x, y }: { x: number; y: number }) => (
  <Line d={`M${x} ${y} q-8 -10 2 -18 q10 -8 0 -18 M${x + 14} ${y} q-8 -10 2 -18`} w={3} dash="3 5" />
);

/** Front-view robot head and torso on x=200, for the humanoid servants. */
export function Servant({ hat, monocle }: { hat?: boolean; monocle?: boolean }) {
  return (
    <>
      <Shape d="M166 46 H234 V96 H166 Z" />
      <Line d="M176 72 H224" w={3} />
      <circle cx="186" cy="70" r="7" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="70" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={70} r={2} />
      <Dot x={214} y={70} r={2} />
      {monocle && <circle cx="214" cy="70" r="12" fill="none" {...ink} strokeWidth={2} />}
      {hat && <Shape d="M174 46 L180 18 H220 L226 46 Z" w={4} />}
      <Line d="M186 88 H214" w={3} />
      <Shape d="M148 104 H252 V190 H148 Z" />
      <Line d="M200 104 V190 M148 130 H252" w={3} />
    </>
  );
}

export function ButlerBot() {
  return (
    <Drawing label="Drawing of a brass butler with a monocle holding a tea tray while a bookcase burns behind it">
      <Shape d="M290 60 H380 V224 H290 Z" w={4} />
      <Line d="M290 110 H380 M290 160 H380" w={3} />
      <Solid d="M320 110 C312 90 330 80 334 62 C342 80 352 92 340 110 Z" />
      <Servant monocle />
      <Line d="M156 114 L124 150 M244 114 L270 144" w={7} />
      <Shape d="M60 150 H180 L176 160 H64 Z" w={4} />
      <Shape d="M96 130 H116 V150 H96 Z M130 134 H146 V150 H130 Z" w={3} />
      <Shape d="M158 190 H196 V226 H158 Z M204 190 H242 V226 H204 Z" w={4} />
      <Steam x={106} y={126} />
    </Drawing>
  );
}

export function ClockworkSpider() {
  return (
    <Drawing label="Drawing of a hand-sized brass spider with a winding key on its back">
      <Shape d="M160 110 C160 80 240 80 240 110 C240 140 160 140 160 110 Z" />
      <circle cx="200" cy="108" r="12" fill="none" {...ink} strokeWidth={3} />
      <Line d="M200 98 V108 L208 112" w={2} />
      <Line d="M200 80 V56 M186 56 H214 M186 56 a8 8 0 1 0 0 -0.1 M214 56 a8 8 0 1 1 0 -0.1" w={4} />
      <Shape d="M240 108 C254 100 284 100 292 112 C292 124 260 130 244 122 Z" w={4} />
      <Dot x={274} y={110} r={3} />
      <Line d="M170 100 L130 70 L100 90 L90 130 M166 112 L110 110 L80 140 L84 190 M170 124 L130 150 L110 190 L120 220 M176 134 L150 176 L150 224" w={5} />
      <Line d="M230 100 L270 70 L300 90 L310 130 M234 124 L270 150 L290 190 L280 220 M226 134 L250 176 L250 224" w={5} />
      <Ground y={228} />
    </Drawing>
  );
}

export function BrassDuelist() {
  return (
    <Drawing label="Drawing of a mustachioed brass automaton with a rapier for an arm in a flawless fencing stance">
      <Shape d="M166 46 H234 V92 H166 Z" />
      <Line d="M180 72 H194 M206 72 H220" w={4} />
      <Line d="M178 84 Q200 76 222 84 M182 84 q-8 4 -12 0 M218 84 q8 4 12 0" w={3} />
      <Shape d="M156 100 H244 V176 H156 Z" />
      <Line d="M200 100 V176" w={3} />
      <Line d="M244 116 L300 120 L384 100" w={7} />
      <Line d="M384 100 L396 98" w={3} />
      <Line d="M156 116 L120 140 L114 100" w={7} />
      <Line d="M170 176 L140 224 M230 176 L280 200 L300 224" w={9} />
      <Shape d="M130 224 h24 v-6 h-24 Z" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function ZeppelinDread() {
  return (
    <Drawing label="Drawing of a huge war airship with rows of cannons and a searchlight">
      <Shape d="M20 100 C20 40 340 30 380 100 C340 160 20 160 20 100 Z" />
      <Line d="M60 60 V140 M110 50 V150 M160 46 V154 M210 44 V156 M260 46 V154 M310 54 V146" w={3} />
      <Shape d="M110 156 H290 V196 H110 Z" w={4} />
      <Line d="M110 170 H290" w={2} />
      {/* Repeat the shape at each listed position. */}
      {[130, 160, 190, 220, 250].map((xPos) => (
        <Shape key={xPos} d={`M${xPos - 8} 196 h16 v14 h-16 Z`} w={3} />
      ))}
      <Shape d="M30 100 L0 70 L10 100 L0 130 Z" w={4} />
      <Line d="M340 160 L360 186 M360 186 L392 176" w={5} />
      <Line d="M392 176 l-70 -20 M392 176 l-60 20" w={2} dash="3 5" />
      <Dot x={340} y={100} r={0} />
      <circle cx="326" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function NeonKoi() {
  return (
    <Drawing label="Drawing of a glowing holographic fish swimming through the air with a noodle ad trailing from it">
      <Shape d="M90 130 C130 70 260 70 300 130 C260 190 130 190 90 130 Z" />
      <Shape d="M300 130 L360 90 L346 130 L360 170 Z" w={4} />
      <Dot x={130} y={120} r={5} />
      <Line d="M180 90 q-10 40 0 80 M220 88 q-10 42 0 84 M260 100 q-8 30 0 60" w={3} dash="4 4" />
      <Line d="M170 76 L190 40 L220 76 M170 184 L190 218 L220 184" w={4} />
      <Shape d="M10 10 H120 V40 H10 Z" w={4} />
      <Line d="M20 26 H110" w={3} dash="4 3" />
      <Line d="M130 28 L160 50" w={2} dash="2 3" />
      <Line d="M60 160 q8 -8 16 0 M40 190 q8 -8 16 0 M330 40 q8 -8 16 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function ChitteringSkull() {
  return (
    <Drawing label="Drawing of a floating hollow skull with a camera in one eye socket and a speaker grille in the other">
      <Shape d="M120 100 C110 40 290 40 280 100 C284 130 260 140 250 150 V170 H150 V150 C140 140 116 130 120 100 Z" />
      <circle cx="166" cy="104" r="26" fill={card} {...ink} strokeWidth={4} />
      <circle cx="166" cy="104" r="12" fill="currentColor" />
      <circle cx="166" cy="104" r="4" fill={card} />
      <circle cx="234" cy="104" r="26" fill={card} {...ink} strokeWidth={4} />
      <Line d="M216 98 H252 M216 110 H252" w={3} />
      <Shape d="M192 132 L200 120 L208 132 Z" w={3} />
      <Line d="M164 170 V150 M180 170 V152 M196 170 V152 M212 170 V152 M228 170 V152 M244 170 V150" w={4} />
      <Line d="M130 180 q-20 20 -40 14 M270 180 q20 20 40 14" w={3} dash="3 5" />
      <Line d="M300 60 q10 -8 20 0 M310 40 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}
