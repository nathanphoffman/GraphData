import type { ReactNode } from "react";
import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../core/artStyle";

const card = CARD_COLOR;

const Steam = ({ x, y }: { x: number; y: number }) => (
  <Line d={`M${x} ${y} q-8 -10 2 -18 q10 -8 0 -18 M${x + 14} ${y} q-8 -10 2 -18`} w={3} dash="3 5" />
);

/** Front-view robot head and torso on x=200, for the humanoid servants. */
function Servant({ hat, monocle }: { hat?: boolean; monocle?: boolean }) {
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

function ButlerBot() {
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

function ClockworkSpider() {
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

function BrassDuelist() {
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

function ZeppelinDread() {
  return (
    <Drawing label="Drawing of a huge war airship with rows of cannons and a searchlight">
      <Shape d="M20 100 C20 40 340 30 380 100 C340 160 20 160 20 100 Z" />
      <Line d="M60 60 V140 M110 50 V150 M160 46 V154 M210 44 V156 M260 46 V154 M310 54 V146" w={3} />
      <Shape d="M110 156 H290 V196 H110 Z" w={4} />
      <Line d="M110 170 H290" w={2} />
      {[130, 160, 190, 220, 250].map((x) => (
        <Shape key={x} d={`M${x - 8} 196 h16 v14 h-16 Z`} w={3} />
      ))}
      <Shape d="M30 100 L0 70 L10 100 L0 130 Z" w={4} />
      <Line d="M340 160 L360 186 M360 186 L392 176" w={5} />
      <Line d="M392 176 l-70 -20 M392 176 l-60 20" w={2} dash="3 5" />
      <Dot x={340} y={100} r={0} />
      <circle cx="326" cy="96" r="6" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

function NeonKoi() {
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

function ChitteringSkull() {
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

function CrystalSentinel() {
  return (
    <Drawing label="Drawing of a faceted crystal guardian firing prism beams">
      <Shape d="M200 20 L240 60 L226 100 H174 L160 60 Z" />
      <Line d="M200 20 L200 100 M160 60 L240 60" w={3} />
      <Shape d="M150 110 L250 110 L270 160 L200 200 L130 160 Z" />
      <Line d="M200 110 V200 M130 160 H270 M150 110 L200 160 L250 110" w={3} />
      <Shape d="M130 160 L90 150 L100 200 Z M270 160 L310 150 L300 200 Z" w={4} />
      <Shape d="M180 200 L170 226 H230 L220 200 Z" w={4} />
      <Dot x={200} y={64} r={4} />
      <Line d="M270 150 L340 120 M270 150 L350 150 M270 150 L340 180" w={3} />
      <Line d="M60 60 v10 M55 65 h10 M340 50 v10 M335 55 h10" w={3} />
    </Drawing>
  );
}

function CrystalCourier() {
  return (
    <Drawing label="Drawing of a faceted crystal messenger gliding on a cushion of light with a scroll">
      <Shape d="M200 40 L236 80 L200 150 L164 80 Z" />
      <Line d="M164 80 H236 M200 40 V150" w={3} />
      <Shape d="M120 100 L164 80 L170 130 Z M280 100 L236 80 L230 130 Z" w={4} />
      <Shape d="M240 108 H280 V122 H240 Z" w={3} />
      <Line d="M250 108 V100 M270 108 V100" w={3} />
      <ellipse cx="200" cy="190" rx="80" ry="16" fill={card} {...ink} strokeWidth={4} />
      <ellipse cx="200" cy="190" rx="50" ry="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M120 210 l-20 12 M200 218 v12 M280 210 l20 12" w={3} dash="3 4" />
      <Dot x={200} y={78} r={4} />
    </Drawing>
  );
}

function RuneWalker() {
  return (
    <Drawing label="Drawing of a tall war-automaton carved with glowing script, built by a long-dead order of star-priests">
      <Shape d="M168 30 H232 V84 H168 Z" />
      <Line d="M184 56 H216" w={5} />
      <Shape d="M130 94 H270 V160 H130 Z" />
      <Shape d="M110 90 H138 V120 H110 Z M262 90 H290 V120 H262 Z" w={4} />
      <Line d="M122 120 V170 L108 200 M278 120 V170 L292 200" w={9} />
      <Shape d="M152 160 H196 V226 H152 Z M204 160 H248 V226 H204 Z" />
      <Line d="M150 106 l10 10 l-10 10 M175 104 v30 M190 104 h20 M190 130 h20 M224 104 l20 30 M250 104 l-20 30" w={3} />
      <Line d="M168 176 h20 M168 196 l8 -10 l8 10 M212 176 v36 M226 176 l10 16" w={3} />
      <Line d="M184 40 V30 M216 40 V30" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

function ServoCherub() {
  return (
    <Drawing label="Drawing of a chanting brass cherub on a rocket pack">
      <Shape d="M170 80 C170 40 230 40 230 80 C230 106 170 106 170 80 Z" />
      <circle cx="186" cy="72" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="72" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={186} y={72} r={2} />
      <Dot x={214} y={72} r={2} />
      <Line d="M188 92 H212 M196 88 v8 M204 88 v8" w={3} />
      <Line d="M170 50 q30 -20 60 0" w={4} />
      <Shape d="M178 110 H222 L226 160 H174 Z" />
      <Line d="M176 120 L140 140 M224 120 L260 140" w={6} />
      <Shape d="M120 60 C100 40 70 50 70 80 C90 100 120 100 140 90 Z M280 60 C300 40 330 50 330 80 C310 100 280 100 260 90 Z" w={4} />
      <Shape d="M184 160 H216 V190 H184 Z" w={4} />
      <Solid d="M190 190 L200 224 L210 190 Z" />
      <Line d="M170 164 L160 190 M230 164 L240 190" w={5} />
      <Line d="M300 120 l24 -6 M300 134 l30 0" w={3} dash="3 4" />
    </Drawing>
  );
}

function SiegeAutomaton() {
  return (
    <Drawing label="Drawing of a scarred war-machine with a chainfist and a skull for a face, sealed in a vault">
      <Shape d="M170 30 C160 -2 240 -2 230 30 L226 60 H174 Z" />
      <Dot x={186} y={34} r={5} />
      <Dot x={214} y={34} r={5} />
      <Line d="M190 52 V60 M200 52 V60 M210 52 V60" w={3} />
      <Shape d="M110 70 H290 L300 160 H100 Z" />
      <Line d="M200 70 V160 M120 110 H280" w={3} />
      <Shape d="M60 70 H110 V150 H60 Z M290 70 H340 V150 H290 Z" w={4} />
      <Shape d="M40 150 H130 V180 H40 Z" w={5} />
      <Line d="M50 150 v-10 M66 150 v-10 M82 150 v-10 M98 150 v-10 M114 150 v-10" w={4} />
      <Line d="M300 120 L340 160 L360 140" w={8} />
      <Shape d="M130 160 H190 V226 H130 Z M210 160 H270 V226 H210 Z" w={4} />
      <Line d="M150 90 l6 12 M240 130 l-6 12" w={2} />
    </Drawing>
  );
}

function RiotDrone() {
  return (
    <Drawing label="Drawing of a hovering security drone with a shock baton and a warning light">
      <Shape d="M140 90 C140 60 260 60 260 90 L270 130 H130 Z" />
      <circle cx="200" cy="100" r="18" fill={card} {...ink} strokeWidth={4} />
      <Dot x={200} y={100} r={6} />
      <Line d="M200 60 V40 M188 40 H212" w={4} />
      <Dot x={200} y={32} r={5} />
      <Line d="M130 130 L100 170 M270 130 L300 170" w={6} />
      <Shape d="M290 160 L360 100 L372 112 L302 176 Z" w={4} />
      <Line d="M366 94 l12 -14 M378 108 l14 -4" w={3} />
      <Line d="M170 130 V150 M230 130 V150" w={4} />
      <Line d="M110 60 q10 -10 20 0 M270 60 q10 -10 20 0" w={3} dash="2 5" />
      <Ground y={224} x1={120} x2={280} />
    </Drawing>
  );
}

function ArcologyWarden() {
  return (
    <Drawing label="Drawing of a mega-tower with a glowing eye at its core, lines running to every elevator, door and gun turret">
      <Shape d="M140 20 H260 V224 H140 Z" />
      {Array.from({ length: 10 }, (_, i) => (
        <Line key={i} d={`M140 ${44 + i * 18} H260`} w={2} />
      ))}
      <circle cx="200" cy="110" r="30" fill={card} {...ink} strokeWidth={5} />
      <circle cx="200" cy="110" r="12" fill="currentColor" />
      <Line d="M170 110 H90 L70 90 M230 110 H310 L330 90 M200 140 V160 H110 L90 190 M200 140 V160 H290 L310 190" w={3} />
      <Shape d="M50 70 H80 V94 H50 Z M320 70 H350 V94 H320 Z" w={4} />
      <Shape d="M60 186 H100 V214 H60 Z M300 186 H340 V214 H300 Z" w={4} />
      <Line d="M70 70 V56 H84 M330 70 V56 H316" w={3} />
      <Line d="M104 190 l14 -4 M296 190 l-14 -4" w={4} />
    </Drawing>
  );
}

function TinFootman() {
  return (
    <Drawing label="Drawing of a polite tin servant in a doorway announcing a guest, with a fist ready">
      <Shape d="M290 40 H380 V224 H290 Z" w={4} />
      <Shape d="M300 60 H370 V224 H300 Z" w={3} />
      <Servant hat />
      <Line d="M156 114 L124 160 M244 114 L280 90 L282 60" w={7} />
      <Shape d="M270 44 H296 V64 H270 Z" w={4} />
      <Shape d="M158 190 H196 V226 H158 Z M204 190 H242 V226 H204 Z" w={4} />
      <Line d="M110 120 q-8 -10 0 -20" w={3} dash="2 4" />
    </Drawing>
  );
}

function ServoJanitor() {
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

function MeatGrinderAutomaton() {
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

function ForgeSentinel() {
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

function SootPigeon() {
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

function IronDraftHorse() {
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

function ChromeRatKing() {
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
function Hunter({ plates = false }: { plates?: boolean }) {
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

function HiveHound() {
  return (
    <Drawing label="Drawing of a lean chitin-plated hunter tracking prey, with a second inner jaw">
      <Hunter plates />
      <Line d="M330 128 l12 4 l-6 8 M326 134 l6 10" w={3} />
      <Line d="M256 98 L270 70 M280 96 L296 68" w={4} />
      <Ground y={224} />
    </Drawing>
  );
}

function BulkheadRavager() {
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

function CyberHound() {
  return (
    <Drawing label="Drawing of a guard dog with a steel jaw and a red-glowing eye">
      <Hunter />
      <Shape d="M300 132 Q320 150 336 134 L330 130 Z" w={4} />
      <circle cx="296" cy="118" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={296} y={118} r={4} />
      <Line d="M296 110 l0 -10 M300 98 h12" w={3} />
      <Line d="M140 120 h20 M140 130 h14" w={2} />
      <Solid d="M312 138 l3 6 l3 -6 Z M324 138 l3 6 l3 -6 Z" />
      <Ground y={224} />
    </Drawing>
  );
}

function ChromePantherPrime() {
  return (
    <Drawing label="Drawing of a sleek chrome luxury predator with a stealth coat shimmering at its edges">
      <Hunter />
      <Line d="M110 126 H250 M120 146 H240" w={2} dash="6 6" />
      <circle cx="296" cy="118" r="5" fill={card} />
      <Line d="M52 160 C36 190 66 216 100 214" w={5} dash="2 6" />
      <Line d="M270 100 l8 -14 M240 108 l4 -16" w={3} />
      <Line d="M20 140 H70 M10 160 H60" w={3} dash="4 6" />
      <Ground y={224} />
    </Drawing>
  );
}

function BoilerRhino() {
  return (
    <Drawing label="Drawing of a rhino with a coal-burning steam engine on its back and iron plates on its hide">
      <Shape d="M60 190 C40 130 100 100 180 100 C260 100 320 130 310 190 Z" />
      <Shape d="M100 100 H220 V70 H100 Z" w={4} />
      <Shape d="M120 70 L128 36 H152 L160 70 Z" w={4} />
      <Steam x={140} y={36} />
      <Line d="M110 120 V180 M150 118 V184 M190 118 V184 M230 120 V180" w={3} />
      <Shape d="M290 150 C290 100 340 100 370 130 L386 160 L350 164 C320 180 290 170 290 150 Z" />
      <Shape d="M360 130 L396 100 L376 142 Z" w={4} />
      <Shape d="M340 120 L346 96 L356 124 Z" w={3} />
      <Dot x={330} y={124} r={4} />
      <Line d="M80 190 V226 M130 192 V226 M250 192 V226 M290 188 V226" w={13} />
    </Drawing>
  );
}

function SteamDrake() {
  return (
    <Drawing label="Drawing of a brass-plated dragon-engine venting scalding steam in a clockwork cellar">
      <Shape d="M80 200 C70 140 130 100 200 106 C260 110 290 140 280 200 Z" />
      <Line d="M110 120 V200 M150 106 V200 M190 104 V200 M230 108 V200 M264 128 V200" w={3} />
      <Shape d="M260 130 C254 90 290 60 330 70 L384 90 L334 110 C316 130 280 144 260 130 Z" />
      <Dot x={326} y={84} r={4} />
      <Shape d="M300 70 L292 40 L322 62 Z" w={4} />
      <Steam x={370} y={86} />
      <Shape d="M120 108 C100 60 60 40 30 50 C50 70 50 90 60 110 Z" w={4} />
      <circle cx="170" cy="150" r="16" fill={card} {...ink} strokeWidth={4} />
      <Line d="M170 140 V150 L178 154" w={2} />
      <Line d="M90 200 V226 M240 200 V226 M80 160 C40 170 20 150 30 130" w={9} />
    </Drawing>
  );
}

function PrismMoth() {
  return (
    <Drawing label="Drawing of a palm-sized moth with wings of stained starlight scattering the glow of lamps">
      <Shape d="M200 110 C150 40 60 40 40 90 C40 130 100 150 196 130 Z" />
      <Shape d="M200 110 C250 40 340 40 360 90 C360 130 300 150 204 130 Z" />
      <Shape d="M196 130 C160 170 100 190 80 180 C90 150 140 130 196 130 Z" w={4} />
      <Shape d="M204 130 C240 170 300 190 320 180 C310 150 260 130 204 130 Z" w={4} />
      <Line d="M120 70 L100 100 L130 120 M280 70 L300 100 L270 120 M160 70 L160 110 M240 70 L240 110" w={3} />
      <Shape d="M188 100 C188 76 212 76 212 100 L216 150 C216 164 184 164 184 150 Z" />
      <Line d="M192 80 C180 60 164 56 154 60 M208 80 C220 60 236 56 246 60" w={3} />
      <Line d="M60 180 v10 M55 185 h10 M340 190 v10 M335 195 h10 M200 30 v10 M195 35 h10" w={3} />
    </Drawing>
  );
}

function BouncingGrubPup() {
  return (
    <Drawing label="Drawing of a round little bug-dog bouncing in circles and nipping at an ankle">
      <Line d="M60 214 q20 -80 60 -80 M280 214 q-20 -60 -50 -60" w={3} dash="4 6" />
      <Shape d="M130 190 C100 190 100 100 190 100 C270 100 280 190 250 190 Z" />
      <Line d="M150 112 V188 M190 100 V190 M230 112 V188" w={3} />
      <Shape d="M240 120 C240 90 290 90 292 120 C294 144 244 148 240 120 Z" />
      <Dot x={262} y={114} r={4} />
      <Line d="M278 100 L290 76 M254 98 L250 74" w={3} />
      <Solid d="M262 132 l3 6 l3 -6 Z M274 132 l3 6 l3 -6 Z" />
      <Line d="M134 190 l-10 18 M250 190 l10 18" w={4} />
      <Shape d="M300 190 H340 V226 H300 Z" w={4} />
      <Line d="M276 170 L308 196" w={3} />
      <Ground y={228} x1={20} x2={290} />
    </Drawing>
  );
}

function AstralStag() {
  return (
    <Drawing label="Drawing of a towering stag with antlers of woven constellations walking along a ley-line">
      <Line d="M20 214 L380 214" w={3} dash="6 8" />
      <Shape d="M110 170 C100 126 160 108 220 112 C268 116 290 140 280 170 L270 180 H120 Z" />
      <Shape d="M262 124 C256 90 280 66 312 70 L350 96 L322 118 C308 140 270 146 262 124 Z" />
      <Dot x={310} y={90} r={3} />
      <Line d="M282 70 L276 30 L250 6 M276 30 L300 8 M282 62 L252 44 M306 70 L330 34 L360 24 M330 34 L344 10 M318 56 L350 52" w={4} />
      {[[250, 6], [300, 8], [252, 44], [360, 24], [344, 10], [350, 52], [276, 30], [330, 34]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" />
      ))}
      <Line d="M130 180 V222 M160 182 V222 M236 182 V222 M262 180 V222" w={6} />
      <Line d="M112 150 C92 150 84 130 92 116" w={5} />
    </Drawing>
  );
}

function GrotHoundPack() {
  return (
    <Drawing label="Drawing of a gangly pack of flying xenos hounds howling through the ceiling vents">
      <Shape d="M20 20 H380 V50 H20 Z" w={5} />
      <Line d="M40 50 V30 M80 50 V30 M120 50 V30 M160 50 V30 M200 50 V30" w={3} />
      {[[110, 140, 1], [250, 110, 0.8], [300, 180, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-60 20 C-60 -10 40 -10 50 20 Z" w={5} />
          <Shape d="M40 8 L48 -14 L66 -2 L96 -2 L100 24 L52 26 Z" w={5} />
          <Dot x={78} y={6} r={3} />
          <Line d="M-30 -8 l-20 -20 M0 -10 l0 -26 M20 -8 l20 -20" w={4} />
          <Shape d="M-30 -12 q-10 -24 -30 -20 q10 14 14 30 Z M20 -12 q10 -24 30 -20 q-10 14 -14 30 Z" w={3} />
          <Line d="M-40 20 l-6 24 M-10 20 l-2 26 M24 20 l4 26 M44 20 l10 22" w={4} />
        </g>
      ))}
      <Line d="M140 90 q-10 -20 -2 -40 M270 74 q-10 -14 -4 -26" w={3} dash="2 5" />
    </Drawing>
  );
}

function ChaosHydra() {
  return (
    <Drawing label="Drawing of a many-headed horror breathing fire and spitting warp-spawn from every neck">
      <Shape d="M100 224 C80 170 140 130 200 134 C260 130 320 170 300 224 Z" />
      {[[-80, 70], [-40, 40], [0, 20], [40, 44], [80, 76]].map(([dx, top], i) => (
        <g key={i}>
          <Line d={`M200 150 C${200 + dx * 0.4} 120 ${200 + dx} ${top + 60} ${200 + dx} ${top + 24}`} w={12} />
          <Shape d={`M${200 + dx - 20} ${top + 24} C${200 + dx - 20} ${top - 8} ${200 + dx + 20} ${top - 8} ${200 + dx + 20} ${top + 24} L${200 + dx + 10} ${top + 38} H${200 + dx - 10} Z`} w={4} />
          <Dot x={200 + dx - 7} y={top + 14} r={3} />
          <Dot x={200 + dx + 7} y={top + 14} r={3} />
        </g>
      ))}
      <Solid d="M110 56 C94 40 100 24 112 16 C112 30 126 36 120 56 Z M290 62 C306 46 300 30 288 22 C288 36 274 42 280 62 Z" />
      <Line d="M170 224 V190 M230 224 V190" w={3} />
    </Drawing>
  );
}

function BackAlleyTiger() {
  return (
    <Drawing label="Drawing of a sleek augmented tiger on a leash outside a night-club door">
      <Shape d="M290 40 H390 V224 H290 Z" w={4} />
      <Shape d="M310 70 H370 V108 H310 Z" w={3} />
      <Line d="M318 90 H362" w={3} dash="3 4" />
      <Hunter />
      <Line d="M110 120 l-10 20 M150 116 l-8 24 M190 116 l-6 28 M230 124 l-4 24" w={6} />
      <Shape d="M268 122 a12 12 0 1 0 0.1 0 Z" w={3} />
      <circle cx="296" cy="118" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={296} y={118} r={3} />
      <Line d="M258 150 H284" w={4} />
      <Ground y={224} x2={290} />
    </Drawing>
  );
}

function BoilerWyrm() {
  return (
    <Drawing label="Drawing of a smoke-belching eel of iron plates coiling through the pipes of a boiler room">
      <Line d="M0 40 H400 M0 200 H400" w={7} />
      <Line d="M60 40 V200 M340 40 V200" w={5} />
      <Line d="M30 150 C80 90 130 210 180 150 C230 90 280 210 330 140 L350 110" w={34} />
      <Line d="M30 150 C80 90 130 210 180 150 C230 90 280 210 330 140 L350 110" w={26} />
      <Line d="M60 130 v34 M110 140 v34 M160 150 v-34 M210 136 v-34 M260 150 v34 M310 140 v-34" w={3} />
      <Shape d="M338 90 C348 66 388 70 392 94 C394 110 360 120 342 108 Z" />
      <Dot x={374} y={86} r={4} />
      <Steam x={376} y={64} />
      <Line d="M30 150 L14 160 L22 174" w={7} />
    </Drawing>
  );
}

function HiveWyvern() {
  return (
    <Drawing label="Drawing of a bat-winged hunter diving on ground troops to rip armor open">
      <Shape d="M200 50 C150 20 80 20 20 50 C60 60 80 80 90 110 C130 90 170 90 194 100 Z" />
      <Shape d="M200 50 C250 20 320 20 380 50 C340 60 320 80 310 110 C270 90 230 90 206 100 Z" />
      <Shape d="M176 74 C176 44 224 44 224 74 L218 150 H182 Z" />
      <Shape d="M182 60 C182 36 218 36 218 60 L228 80 L200 90 L172 80 Z" w={4} />
      <Dot x={192} y={56} r={3} />
      <Dot x={208} y={56} r={3} />
      <Line d="M186 150 L164 190 L148 186 M214 150 L236 190 L252 186" w={6} />
      <Line d="M148 186 l-8 10 M148 186 l4 12 M252 186 l8 10 M252 186 l-4 12" w={3} />
      <Line d="M200 150 C204 190 190 210 200 222" w={5} />
      <Shape d="M100 214 H140 L136 226 H104 Z M270 214 H310 L306 226 H274 Z" w={3} />
    </Drawing>
  );
}

function NeonPigeonFlock() {
  return (
    <Drawing label="Drawing of a flock of cybernetic pigeons with LED-lit wings, one carrying an ad banner, one stealing a data chip">
      {[[120, 100, 1], [220, 70, 0.8], [290, 130, 0.9], [180, 170, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <Shape d="M-40 10 C-40 -20 30 -22 44 4 C50 20 20 30 -10 28 C-30 26 -40 22 -40 10 Z" w={5} />
          <Shape d="M30 -4 C34 -26 62 -26 62 -8 C62 4 44 8 36 4 Z" w={5} />
          <Shape d="M62 -14 L78 -8 L62 -4 Z" w={3} />
          <Dot x={50} y={-16} r={2.5} />
          <Shape d="M-10 -6 C-30 -34 -60 -30 -70 -20 C-50 -14 -40 -2 -30 8 Z" w={4} />
          <Line d="M-58 -22 l8 8 M-46 -26 l8 10 M-34 -22 l4 14" w={2} />
        </g>
      ))}
      <Shape d="M60 190 H200 V222 H60 Z" w={4} />
      <Line d="M72 206 H188" w={3} dash="5 3" />
      <Line d="M110 126 L100 190 M150 80 L120 40 M280 200 H320" w={2} dash="2 4" />
      <Shape d="M310 190 h24 v14 h-24 Z" w={3} />
    </Drawing>
  );
}

export const restMachinesBeastsArt: Record<string, () => ReactNode> = {
  "butler-bot": ButlerBot,
  "clockwork-spider": ClockworkSpider,
  "brass-duelist": BrassDuelist,
  "zeppelin-dread": ZeppelinDread,
  "neon-koi": NeonKoi,
  "chittering-skull": ChitteringSkull,
  "crystal-sentinel": CrystalSentinel,
  "crystal-courier": CrystalCourier,
  "rune-walker": RuneWalker,
  "servo-cherub": ServoCherub,
  "siege-automaton": SiegeAutomaton,
  "riot-drone": RiotDrone,
  "arcology-warden": ArcologyWarden,
  "tin-footman": TinFootman,
  "servo-janitor": ServoJanitor,
  "meat-grinder-automaton": MeatGrinderAutomaton,
  "forge-sentinel": ForgeSentinel,
  "soot-pigeon": SootPigeon,
  "iron-draft-horse": IronDraftHorse,
  "chrome-rat-king": ChromeRatKing,
  "hive-hound": HiveHound,
  "bulkhead-ravager": BulkheadRavager,
  "cyber-hound": CyberHound,
  "chrome-panther-prime": ChromePantherPrime,
  "boiler-rhino": BoilerRhino,
  "steam-drake": SteamDrake,
  "prism-moth": PrismMoth,
  "bouncing-grub-pup": BouncingGrubPup,
  "astral-stag": AstralStag,
  "grot-hound-pack": GrotHoundPack,
  "chaos-hydra": ChaosHydra,
  "back-alley-tiger": BackAlleyTiger,
  "boiler-wyrm": BoilerWyrm,
  "hive-wyvern": HiveWyvern,
  "neon-pigeon-flock": NeonPigeonFlock,
};
