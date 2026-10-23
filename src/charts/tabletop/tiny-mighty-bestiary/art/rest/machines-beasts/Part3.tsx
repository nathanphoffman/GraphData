import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Servant, Steam } from "./Part1";

const card = CARD_COLOR;

export function ServoJanitor() {
  return (
    <Drawing label="Drawing of a cheerful brass janitor humming a hymn while scrubbing a deck with a mop and bucket">
      <Servant />
      <Line d="M156 114 L120 160 M244 114 L290 100" w={7} />
      <Line d="M290 100 L330 36 M330 36 V224" w={4} />
      <Shape d="M300 200 H360 L350 226 H310 Z" w={4} />
      <Shape d="M70 180 H130 L124 224 H76 Z" w={4} />
      <Line d="M76 180 q20 -24 48 0" w={3} />
      <Shape d="M158 190 H196 V226 H158 Z M204 190 H242 V226 H204 Z" w={4} />
      <Line d="M60 40 v14 M60 54 q-10 4 -10 -3 q0 -6 10 -3 M90 24 v14 M90 38 q-8 4 -8 -2 q0 -5 8 -2" w={3} />
      <Line d="M180 224 q20 -8 40 0" w={3} dash="2 4" />
    </Drawing>
  );
}

export function MeatGrinderAutomaton() {
  return (
    <Drawing label="Drawing of a factory automaton with a grinder in its chest">
      <Shape d="M170 36 H230 V80 H170 Z" />
      <Line d="M184 58 H216" w={5} />
      <Shape d="M130 90 H270 V190 H130 Z" />
      <circle cx="200" cy="140" r="38" fill={card} {...ink} strokeWidth={5} />
      <Line d="M200 102 V178 M162 140 H238 M174 114 L226 166 M226 114 L174 166" w={3} />
      <circle cx="200" cy="140" r="10" fill="currentColor" />
      <Line d="M130 110 L90 140 L100 190 M270 110 L310 140 L300 190" w={9} />
      <Shape d="M150 190 H194 V226 H150 Z M206 190 H250 V226 H206 Z" w={4} />
      <Line d="M300 60 V30 H340" w={5} />
      <Steam x={330} y={30} />
    </Drawing>
  );
}

export function ForgeSentinel() {
  return (
    <Drawing label="Drawing of a smoking skull-faced servitor with a plasma torch guarding a forge vault door">
      <circle cx="320" cy="130" r="72" fill={card} {...ink} />
      <circle cx="320" cy="130" r="50" fill="none" {...ink} strokeWidth={4} />
      <Line d="M320 80 V180 M270 130 H370" w={3} />
      <Shape d="M136 64 C130 26 200 26 194 64 L190 82 H140 Z" />
      <Dot x={154} y={56} r={5} />
      <Dot x={176} y={56} r={5} />
      <Line d="M156 76 V82 M166 76 V82" w={2} />
      <Shape d="M100 90 H190 L200 190 H90 Z" />
      <Line d="M146 90 V190" w={3} />
      <Line d="M104 100 L70 150 M190 100 L228 130 L256 128" w={7} />
      <Shape d="M252 120 H290 V136 H252 Z" w={4} />
      <Solid d="M290 122 C310 118 320 126 330 128 C320 136 308 138 290 134 Z" />
      <Line d="M110 190 V226 M170 190 V226" w={8} />
      <Steam x={130} y={26} />
    </Drawing>
  );
}

/* Beasts */

export function SootPigeon() {
  return (
    <Drawing label="Drawing of a grubby sooty pigeon with a message tube on its leg and a big attitude">
      <Solid d="M110 130 C110 80 200 70 250 100 C280 118 270 160 230 170 C180 180 110 170 110 130 Z" />
      <Solid d="M236 100 C240 66 290 60 296 90 C298 108 270 116 252 112 Z" />
      <Shape d="M296 86 L326 96 L296 104 Z" w={4} />
      <circle cx="274" cy="84" r="5" fill={card} />
      <Dot x={275} y={84} r={2} />
      <Line d="M260 70 l16 -6" w={4} />
      <Line d="M110 130 L70 120 M114 150 L76 160" w={5} />
      <Line d="M180 172 L174 200 M210 172 L214 200 M174 200 l-10 6 M174 200 l8 8 M214 200 l-10 6 M214 200 l10 6" w={4} />
      <Shape d="M196 184 H216 V196 H196 Z" w={3} />
      <path d="M140 110 l-6 -10 M170 98 l-4 -12 M200 100 l-2 -12" stroke={card} strokeWidth="3" strokeLinecap="round" fill="none" />
      <Line d="M60 60 q10 -8 20 0 M90 40 q10 -8 20 0 M330 140 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function IronDraftHorse() {
  return (
    <Drawing label="Drawing of a massive calm draft horse with a brass leg brace hauling a steam carriage">
      <Shape d="M20 130 H100 V190 H20 Z" w={4} />
      <circle cx="40" cy="206" r="16" fill={card} {...ink} strokeWidth={4} />
      <circle cx="90" cy="206" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M40 130 V104 H70 V130" w={3} />
      <Steam x={56} y={104} />
      <Line d="M100 150 H140" w={5} />
      <Shape d="M130 190 C120 140 170 110 230 116 C280 120 300 150 290 190 Z" />
      <Shape d="M260 126 C256 90 280 60 316 62 C340 66 350 90 344 108 L350 140 L320 140 C300 150 270 150 260 126 Z" />
      <Dot x={320} y={82} r={4} />
      <Line d="M272 70 C260 90 262 112 270 130" w={5} />
      <Line d="M150 190 V226 M190 192 V226 M250 192 V226 M284 190 V226" w={11} />
      <Shape d="M144 206 h14 v20 h-14 Z M244 206 h14 v20 h-14 Z" w={3} />
      <Line d="M130 150 C108 150 102 176 114 190" w={6} />
    </Drawing>
  );
}

export function ChromeRatKing() {
  return (
    <Drawing label="Drawing of a knot of cybernetic rats wired together into a single scheming sewer lord">
      <Line d="M110 190 C60 200 60 130 120 140 C180 150 150 200 210 190 C260 180 250 140 300 150" w={6} />
      <Shape d="M100 150 C100 90 300 90 300 150 C300 200 100 200 100 150 Z" />
      <Shape d="M130 110 L124 80 L150 98 Z M270 110 L276 80 L250 98 Z" w={4} />
      <circle cx="150" cy="130" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="190" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="230" cy="120" r="9" fill={card} {...ink} strokeWidth={3} />
      <circle cx="262" cy="134" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={150} y={130} r={3} />
      <Dot x={190} y={120} r={3} />
      <Dot x={230} y={120} r={3} />
      <Dot x={262} y={134} r={3} />
      <Line d="M140 100 L170 80 L210 90 M250 100 L280 70 L300 60" w={3} />
      <Line d="M170 150 H230 M180 160 H220" w={3} />
      <Shape d="M284 52 h24 v14 h-24 Z" w={3} />
      <Ground y={216} />
    </Drawing>
  );
}

/** Shared lean hunter in profile facing right, with optional armor plating lines. */
export function Hunter({ plates = false }: { plates?: boolean }) {
  return (
    <>
      <Shape d="M80 170 C70 130 140 110 200 114 C250 118 270 140 260 170 L246 180 H100 Z" />
      <Shape d="M246 128 L252 96 L270 110 L308 108 L330 96 L332 132 C332 150 250 152 246 128 Z" />
      <Dot x={296} y={120} r={4} />
      <Solid d="M330 120 L348 126 L330 136 Z" />
      <Line d="M96 180 V218 M130 182 V218 M226 182 V218 M252 180 V218" w={7} />
      <Line d="M82 150 C50 150 42 124 54 108" w={6} />
      {plates && <Line d="M120 120 V176 M160 114 V180 M200 114 V180 M236 124 V176" w={3} />}
    </>
  );
}

export function HiveHound() {
  return (
    <Drawing label="Drawing of a lean chitin-plated hunter tracking prey, with a second inner jaw">
      <Hunter plates />
      <Line d="M330 128 l12 4 l-6 8 M326 134 l6 10" w={3} />
      <Line d="M256 98 L270 70 M280 96 L296 68" w={4} />
      <Ground y={224} />
    </Drawing>
  );
}

export function BulkheadRavager() {
  return (
    <Drawing label="Drawing of a hulking six-limbed horror tearing through an armored door">
      <Shape d="M20 20 H120 V224 H20 Z M280 20 H380 V224 H280 Z" w={5} />
      <Line d="M120 40 L150 70 L130 100 L150 130 L124 160 M280 40 L250 70 L270 100 L250 130 L276 160" w={5} />
      <Shape d="M150 70 C150 40 250 40 250 70 L260 160 H140 Z" />
      <Shape d="M170 70 C170 54 230 54 230 70 C230 90 170 90 170 70 Z" w={4} />
      <Dot x={186} y={68} r={3} />
      <Dot x={214} y={68} r={3} />
      <Line d="M176 80 l6 8 l6 -8 l6 8 l6 -8 l6 8" w={3} />
      <Line d="M142 100 L110 90 L96 60 M258 100 L290 90 L304 60 M146 130 L110 150 L100 190 M254 130 L290 150 L300 190 M150 160 L140 224 M250 160 L260 224" w={9} />
    </Drawing>
  );
}
