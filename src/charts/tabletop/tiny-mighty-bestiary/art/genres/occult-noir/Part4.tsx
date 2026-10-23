import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function BlackOozeMass() {
  return (
    <Drawing label="Drawing of a bubbling mass of black ooze covered in eyes and mouths">
      <Shape d="M40 220 C20 150 70 100 140 110 C170 60 250 60 270 110 C340 100 380 150 360 220 Z" />
      <circle cx="110" cy="150" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={112} y={150} r={5} />
      <circle cx="170" cy="110" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={170} y={112} r={4} />
      <circle cx="230" cy="96" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={230} y={98} r={5} />
      <circle cx="290" cy="140" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={290} y={142} r={4} />
      <circle cx="320" cy="190" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={320} y={192} r={3} />
      <circle cx="70" cy="196" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={70} y={198} r={3} />
      <Shape d="M150 170 Q200 214 250 170 Z" w={4} />
      <Solid d="M166 174 l5 12 l5 -12 Z M184 180 l5 14 l5 -14 Z M204 182 l5 14 l5 -14 Z M224 178 l5 12 l5 -12 Z" />
      <circle cx="94" cy="104" r="8" fill="none" {...ink} strokeWidth={3} />
      <circle cx="342" cy="104" r="6" fill="none" {...ink} strokeWidth={3} />
      <Line d="M250 40 q8 -6 14 0 M120 50 q8 -6 14 0" w={3} />
    </Drawing>
  );
}

export function TentacledBellhop() {
  return (
    <Drawing label="Drawing of a nervous bellhop in a tight uniform and pillbox hat with tentacles poking out of his coat, carrying a bag">
      <Shape d="M168 56 H232 L226 30 H174 Z" />
      <Line d="M164 58 H236" w={5} />
      <Shape d="M172 64 H228 V96 C228 114 172 114 172 96 Z" />
      <circle cx="188" cy="82" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="212" cy="82" r="6" fill={card} {...ink} strokeWidth={3} />
      <Dot x={188} y={84} r={2} />
      <Dot x={212} y={84} r={2} />
      <Line d="M192 100 q8 -4 16 0" w={3} />
      <Shape d="M152 118 H248 L244 190 H156 Z" />
      <Dot x={200} y={134} r={3} />
      <Dot x={200} y={152} r={3} />
      <Dot x={200} y={170} r={3} />
      <Line d="M156 130 C120 130 110 160 130 170 C146 176 140 150 126 150 M246 128 C290 130 300 170 276 174 C262 176 270 152 284 156" w={5} />
      <Line d="M160 180 C120 200 110 214 126 222 M240 180 C280 200 290 214 276 222 M184 190 C170 212 176 224 190 226" w={5} />
      <Shape d="M300 150 H350 V196 H300 Z" w={4} />
      <Line d="M310 150 V140 H340 V150" w={3} />
      <Line d="M310 104 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function WallpaperThing() {
  return (
    <Drawing label="Drawing of a patch of floral wallpaper peeling off a wall to wrap around a person leaning on it">
      <Shape d="M20 20 H200 V224 H20 Z" w={4} />
      <Line d="M50 40 q10 -10 20 0 q-10 10 -20 0 Z M110 70 q10 -10 20 0 q-10 10 -20 0 Z M50 110 q10 -10 20 0 q-10 10 -20 0 Z M130 150 q10 -10 20 0 q-10 10 -20 0 Z M60 190 q10 -10 20 0 q-10 10 -20 0 Z" w={3} />
      <Line d="M60 40 v14 M120 70 v14 M60 110 v14 M140 150 v14" w={2} />
      <Shape d="M200 40 C240 50 260 90 250 130 C240 170 270 190 250 224 L200 224 Z" />
      <Line d="M214 70 q10 -10 20 0 q-10 10 -20 0 Z M214 130 q10 -10 20 0 q-10 10 -20 0 Z" w={3} />
      <Shape d="M290 100 C290 70 340 70 340 100 C340 124 290 124 290 100 Z" />
      <Dot x={306} y={96} r={3} />
      <Dot x={324} y={96} r={3} />
      <Shape d="M280 128 H350 L360 224 H270 Z" />
      <Line d="M254 110 C270 110 280 130 290 140 M254 150 C270 150 284 160 296 170" w={7} />
      <Line d="M254 130 C280 126 300 160 340 150" w={5} />
      <Line d="M370 140 l10 4 M370 120 l8 -4" w={3} />
    </Drawing>
  );
}

export function DrainLeech() {
  return (
    <Drawing label="Drawing of a pale rope-thick leech sliding up out of a sewer drain">
      <Shape d="M60 200 H340 V224 H60 Z" />
      <ellipse cx="200" cy="200" rx="64" ry="14" fill={card} {...ink} />
      <Line d="M156 200 H244 M168 194 V206 M184 194 V206 M200 194 V206 M216 194 V206 M232 194 V206" w={3} />
      <Line d="M200 196 C200 150 140 150 150 110 C160 70 230 80 220 40" w={26} />
      <Line d="M200 196 C200 150 140 150 150 110 C160 70 230 80 220 40" w={18} />
      <Line d="M196 170 q10 -4 14 4 M156 140 q-6 -8 2 -14 M176 94 q10 -2 12 6" w={3} />
      <circle cx="220" cy="36" r="18" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M208 34 Q220 48 232 34 Q220 40 208 34 Z" w={3} />
      <Dot x={212} y={30} r={2} />
      <Dot x={228} y={30} r={2} />
      <Line d="M270 190 q10 -10 4 -20 M300 196 q8 -8 2 -16" w={3} dash="2 5" />
    </Drawing>
  );
}

export function BasementElder() {
  return (
    <Drawing label="Drawing of a many-eyed mass under the floorboards of a house, whispering through pipes">
      <Shape d="M30 100 H370 V120 H30 Z" />
      <Line d="M70 100 V120 M130 100 V120 M190 100 V120 M250 100 V120 M310 100 V120" w={3} />
      <Shape d="M60 40 H340 V100 H60 Z" w={3} />
      <Line d="M130 100 V60 H180 V100 M220 100 V60 H270 V100" w={3} />
      <Shape d="M60 224 C40 170 100 130 160 140 C190 120 240 120 260 140 C320 130 360 170 340 224 Z" />
      <circle cx="130" cy="180" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={130} y={182} r={4} />
      <circle cx="180" cy="160" r="14" fill={card} {...ink} strokeWidth={3} />
      <Dot x={180} y={162} r={5} />
      <circle cx="230" cy="168" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={230} y={170} r={4} />
      <circle cx="285" cy="190" r="10" fill={card} {...ink} strokeWidth={3} />
      <Dot x={285} y={192} r={3} />
      <circle cx="92" cy="200" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={92} y={202} r={3} />
      <Line d="M300 120 V150 M340 120 V160" w={8} />
      <Line d="M310 140 q-8 -14 4 -24 M330 150 q-8 -14 4 -24" w={3} dash="2 5" />
      <Line d="M180 210 q20 12 40 0" w={4} />
    </Drawing>
  );
}

export function BatSwarmColossus() {
  return (
    <Drawing label="Drawing of a swarm of bats forming a hulking figure in a belfry">
      <Shape d="M120 224 V70 L200 10 L280 70 V224 Z" w={4} />
      <Shape d="M170 90 H230 V120 H170 Z" w={3} />
      <circle cx="200" cy="40" r="12" fill="none" {...ink} strokeWidth={3} />
      <Line d="M200 40 V34 M200 40 H206" w={2} />
      {[
        [160, 100], [200, 80], [240, 100], [140, 130], [180, 120], [220, 120], [260, 130],
        [130, 160], [170, 156], [210, 154], [250, 158], [150, 190], [190, 186], [230, 190],
        [110, 124], [290, 124], [100, 160], [300, 160], [130, 210], [270, 210],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 14} ${y - 4} q7 -10 14 2 q7 -12 14 -2 q-7 2 -14 12 q-7 -10 -14 -8 Z`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="184" cy="64" r="4" fill={card} />
      <circle cx="216" cy="64" r="4" fill={card} />
    </Drawing>
  );
}

export function BrainDrinker() {
  return (
    <Drawing label="Drawing of a robed figure with a squid for a face, tentacles reaching toward a jar holding a brain">
      <Shape d="M156 90 C150 30 250 30 244 90 C244 106 156 106 156 90 Z" />
      <circle cx="184" cy="72" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="216" cy="72" r="8" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={72} r={3} />
      <Dot x={216} y={72} r={3} />
      <Line d="M172 98 C164 130 150 140 134 150 M188 102 C184 134 178 150 168 164 M212 102 C216 134 222 150 232 164 M228 98 C236 130 250 140 266 150" w={6} />
      <Shape d="M156 108 L130 224 H270 L244 108 Z" />
      <Line d="M200 120 V224" w={3} />
      <Shape d="M300 150 H356 V214 H300 Z" w={4} />
      <Shape d="M306 140 H350 V150 H306 Z" w={3} />
      <path d="M312 190 C304 170 330 160 344 170 C356 180 340 200 326 198 C316 198 316 192 312 190 Z" fill={card} stroke="currentColor" strokeWidth="3" />
      <Line d="M322 176 q6 6 0 14 M334 174 q6 8 -2 16" w={2} />
      <Line d="M270 130 q14 -4 24 8" w={3} dash="2 5" />
    </Drawing>
  );
}
