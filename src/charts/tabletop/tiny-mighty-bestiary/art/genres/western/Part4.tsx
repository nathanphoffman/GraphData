import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Hat } from "./Part1";

const card = CARD_COLOR;

export function GreenhornDeputy() {
  return (
    <Drawing label="Drawing of a nervous young deputy with an oversized badge and a trembling hand over a holster">
      <Hat y={64} w={50} />
      <Shape d="M172 68 H228 V104 C228 120 172 120 172 104 Z" />
      <circle cx="188" cy="86" r="5" fill={card} {...ink} strokeWidth={3} />
      <circle cx="212" cy="86" r="5" fill={card} {...ink} strokeWidth={3} />
      <Dot x={189} y={87} r={2} />
      <Dot x={213} y={87} r={2} />
      <Line d="M190 104 q10 -4 20 0" w={3} />
      <Line d="M232 70 q8 8 4 18 M238 60 q10 6 8 16" w={3} dash="2 4" />
      <Shape d="M156 122 H244 L250 200 H150 Z" />
      <Solid d="M184 138 l8 -14 l8 14 l8 -14 l8 14 l-16 20 l-8 -6 Z" />
      <Line d="M156 130 L128 170 L150 190" w={6} />
      <Line d="M244 130 L270 168 L250 190" w={6} />
      <Line d="M142 192 H258" w={6} />
      <Shape d="M236 190 H262 V218 H236 Z" w={4} />
      <Shape d="M156 200 H196 V226 H156 Z M204 200 H244 V226 H204 Z" w={4} />
      <Line d="M100 160 l-10 -4 M104 176 l-12 2 M300 160 l10 -4 M296 176 l12 2" w={3} />
    </Drawing>
  );
}

export function RailroadBaron() {
  return (
    <Drawing label="Drawing of a top-hatted mogul with a watch chain and a cigar, a stack of money bags beside him">
      <Shape d="M164 62 L170 14 H230 L236 62 Z" />
      <Line d="M170 44 H230" w={5} />
      <Line d="M148 64 H252" w={6} />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 86 H194 M206 86 H218" w={4} />
      <Line d="M190 102 H210 M210 102 L240 96" w={4} />
      <Dot x={244} y={94} r={4} />
      <Shape d="M148 124 H252 L262 214 H138 Z" />
      <Shape d="M178 124 L200 164 L222 124 Z" w={3} />
      <Line d="M200 124 V214" w={3} />
      <Line d="M184 160 C170 176 214 190 226 170" w={3} />
      <circle cx="224" cy="172" r="7" fill={card} {...ink} strokeWidth={3} />
      <Line d="M154 134 L124 176 M246 134 L290 150" w={7} />
      <Shape d="M290 190 C280 160 340 160 330 190 Z" w={4} />
      <Shape d="M310 224 C294 190 366 190 350 224 Z" w={4} />
      <Line d="M310 168 v-10 M334 198 v-8" w={3} />
      <Dot x={310} y={186} r={3} />
      <Line d="M148 214 V228 M252 214 V228" w={8} />
      <Line d="M50 200 H100 M50 216 H110 M50 232 H90" w={4} />
    </Drawing>
  );
}

export function OutlawKing() {
  return (
    <Drawing label="Drawing of a legendary bandit wearing a crown of rattlesnake rattles, with a huge gang's hats lined up behind him">
      <Shape d="M20 140 H80 L50 110 Z M60 140 H120 L90 110 Z M300 140 H360 L330 110 Z M340 140 H390 L365 110 Z" w={3} />
      <Line d="M10 150 H390" w={3} dash="3 6" />
      <Shape d="M166 76 C160 40 240 40 234 76 C234 106 166 106 166 76 Z" />
      <Shape d="M160 44 L164 18 L180 38 L194 14 L206 38 L222 14 L238 18 L242 44 Z" w={4} />
      <Line d="M168 28 v10 M184 22 v14 M200 20 v14 M216 22 v14 M232 28 v10" w={2} />
      <Dot x={186} y={72} r={3} />
      <Dot x={214} y={72} r={3} />
      <Line d="M180 62 l10 4 M220 62 l-10 4" w={3} />
      <Line d="M184 92 Q200 104 218 92" w={4} />
      <Shape d="M144 112 H256 L270 224 H130 Z" />
      <Line d="M200 112 V224 M150 150 H250" w={3} />
      <Solid d="M200 118 l8 12 l-8 12 l-8 -12 Z" />
      <Line d="M150 120 L124 172 M250 120 L288 138" w={8} />
      <Solid d="M284 130 L308 134 L304 148 L282 144 Z" />
      <Line d="M170 224 V230 M230 224 V230" w={8} />
    </Drawing>
  );
}

export function FrontierDoc() {
  return (
    <Drawing label="Drawing of a rumpled traveling doctor with a black bag and a bottle of tonic">
      <Shape d="M166 66 C160 34 240 34 234 66 Z" />
      <Line d="M150 68 H250" w={5} />
      <Shape d="M172 72 H228 V102 C228 120 172 120 172 102 Z" />
      <circle cx="188" cy="86" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="212" cy="86" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M196 86 H204" w={2} />
      <Line d="M186 104 Q200 112 214 104" w={3} />
      <Shape d="M150 124 H250 L262 214 H138 Z" />
      <Line d="M200 124 V214" w={3} />
      <Line d="M160 140 L170 160 M240 150 L230 176" w={2} />
      <Line d="M156 132 L122 178" w={7} />
      <Shape d="M96 176 H160 V214 H96 Z" w={4} />
      <Line d="M110 176 V166 H146 V176" w={4} />
      <Line d="M244 132 L284 150" w={7} />
      <Shape d="M276 126 H302 V162 H276 Z" w={4} />
      <Shape d="M282 112 H296 V126 H282 Z" w={3} />
      <Line d="M280 140 H298" w={2} />
      <Line d="M150 214 V228 M250 214 V228" w={8} />
      <Line d="M90 120 v-10 M85 115 h10" w={3} />
    </Drawing>
  );
}

export function GilaGiant() {
  return (
    <Drawing label="Drawing of a truck-sized beaded lizard dozing in the sun with a spotted pattern on its skin">
      <circle cx="340" cy="40" r="22" fill="none" {...ink} strokeWidth={4} />
      <Line d="M340 4 v8 M340 68 v8 M304 40 h8 M368 40 h8 M314 14 l6 6 M366 66 l-6 -6" w={3} />
      <Shape d="M60 190 C50 140 110 110 190 112 C260 114 300 140 310 170 C320 190 300 200 280 200 H80 Z" />
      <Shape d="M290 150 C300 130 340 128 366 144 C384 156 384 178 366 182 C340 190 300 184 290 168 Z" />
      <Dot x={338} y={146} r={3} />
      <Line d="M370 164 H386" w={3} />
      <circle cx="90" cy="150" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="130" cy="136" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="176" cy="132" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="222" cy="134" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="262" cy="148" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="110" cy="176" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="160" cy="166" r="7" fill="none" {...ink} strokeWidth={3} />
      <circle cx="210" cy="168" r="7" fill="none" {...ink} strokeWidth={3} />
      <Line d="M90 200 l-16 16 h34 M280 200 l16 16 h-34" w={8} />
      <Line d="M60 190 C30 190 14 176 18 160" w={9} />
      <Ground y={224} />
    </Drawing>
  );
}

export function GoatSucker() {
  return (
    <Drawing label="Drawing of a hunched, spiny, red-eyed creature crouched next to a drained cow">
      <Shape d="M20 200 C20 160 100 150 150 160 C190 168 190 200 180 210 H30 Z" w={4} />
      <Line d="M40 200 V224 M70 204 V224 M150 206 V224 M170 206 V224" w={5} />
      <Line d="M60 164 l4 -10 M90 160 l4 -10" w={3} />
      <Dot x={36} y={176} r={3} />
      <Line d="M24 176 H34" w={2} />
      <Shape d="M230 190 C210 150 250 100 300 100 C340 100 360 130 350 160 C340 190 290 210 240 214 Z" />
      <Solid d="M232 150 L214 138 L230 134 Z M244 120 L228 100 L248 104 Z M270 106 L260 84 L280 94 Z M300 100 L298 78 L314 94 Z M330 106 L340 86 L344 108 Z" />
      <Shape d="M330 132 C340 120 372 126 376 142 C378 156 352 164 336 154 Z" />
      <circle cx="354" cy="136" r="7" fill={card} {...ink} strokeWidth={3} />
      <Dot x={355} y={136} r={3} />
      <Line d="M346 150 l8 10 l8 -10" w={3} />
      <Line d="M260 200 L252 224 M300 206 L304 226" w={7} />
      <Line d="M230 170 L196 190" w={6} />
      <Line d="M196 190 l-8 -4 M196 190 l-4 8 M196 190 l-10 4" w={3} />
      <circle cx="120" cy="40" r="22" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 4" />
    </Drawing>
  );
}
