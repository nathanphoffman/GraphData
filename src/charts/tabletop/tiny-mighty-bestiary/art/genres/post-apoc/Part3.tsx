import { Dot, Drawing, Ground, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function MutantBrute() {
  return (
    <Drawing label="Drawing of a ten-foot muscle-bound mutant dragging a street sign and screaming for a fight">
      <Shape d="M168 56 C164 20 236 20 232 56 C236 82 164 82 168 56 Z" />
      <Dot x={186} y={48} r={4} />
      <Dot x={214} y={48} r={4} />
      <Shape d="M182 62 Q200 86 218 62 Z" w={3} />
      <Line d="M176 38 l14 6 M224 38 l-14 6" w={4} />
      <Shape d="M100 84 C120 70 280 70 300 84 C320 130 290 180 260 190 H140 C110 180 80 130 100 84 Z" />
      <Line d="M170 110 q30 14 60 0 M160 140 q40 14 80 0" w={3} />
      <Line d="M110 100 L70 150 L96 190 M290 100 L336 140 L324 190" w={14} />
      <Line d="M324 190 L360 224" w={5} />
      <Shape d="M330 20 H380 V50 H330 Z" w={4} />
      <Line d="M355 50 V224" w={5} />
      <Line d="M340 34 h30" w={3} />
      <Line d="M150 190 V226 M250 190 V226" w={16} />
    </Drawing>
  );
}

export function WastelandWarlord() {
  return (
    <Drawing label="Drawing of a scarred skull-masked king of the wastes before his war-rig and raiders">
      <Shape d="M240 100 H390 V190 H240 Z" w={5} />
      <Shape d="M240 80 H300 V100 H240 Z" w={4} />
      <circle cx="270" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <circle cx="356" cy="204" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M260 60 V40 M340 60 V24 M240 100 L220 80" w={4} />
      <Shape d="M110 82 C106 38 190 38 186 82 C190 100 110 100 110 82 Z" />
      <Dot x={132} y={70} r={7} />
      <Dot x={164} y={70} r={7} />
      <Line d="M138 90 V96 M148 90 V98 M158 90 V96" w={3} />
      <Line d="M112 56 l-14 -20 M186 56 l14 -20 M150 40 v-24" w={5} />
      <Shape d="M90 108 H210 L222 200 H78 Z" />
      <Solid d="M90 108 l-18 -14 l24 2 Z M210 108 l18 -14 l-24 2 Z" />
      <Line d="M150 108 V200 M100 150 H200" w={3} />
      <Line d="M96 124 L66 170 M204 124 L230 150" w={9} />
      <Line d="M110 200 V226 M190 200 V226" w={9} />
    </Drawing>
  );
}

export function BottlecapHermit() {
  return (
    <Drawing label="Drawing of a bearded old hermit in a coat of sewn-on bottle caps">
      <Shape d="M168 74 C164 30 236 30 232 74 C236 100 164 100 168 74 Z" />
      <Line d="M170 50 q30 -22 60 0" w={4} />
      <Dot x={188} y={68} r={3} />
      <Dot x={212} y={68} r={3} />
      <Shape d="M172 84 C170 130 190 144 200 146 C210 144 230 130 228 84 C214 98 186 98 172 84 Z" w={4} />
      <Shape d="M144 112 H256 L270 224 H130 Z" />
      {/* Repeat the shape at each listed position. */}
      {[[168, 134], [200, 130], [232, 134], [156, 164], [186, 160], [216, 160], [246, 164], [170, 192], [200, 190], [232, 192], [146, 208], [254, 208]].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="10" fill={card} stroke="currentColor" strokeWidth="2.5" />
          <circle cx={x} cy={y} r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 2.4" />
        </g>
      ))}
      <Line d="M150 118 L124 160 M250 118 L276 160" w={7} />
      <Line d="M290 40 q10 -8 20 0 M310 70 q10 -8 20 0" w={3} dash="2 5" />
    </Drawing>
  );
}

export function VaultTyrant() {
  return (
    <Drawing label="Drawing of a shriveled old ruler in pre-war armor in front of a round vault door">
      <circle cx="320" cy="120" r="64" fill={card} {...ink} />
      <circle cx="320" cy="120" r="46" fill="none" {...ink} strokeWidth={4} />
      <Line d="M320 74 V166 M274 120 H366 M288 88 L352 152 M352 88 L288 152" w={3} />
      <circle cx="320" cy="120" r="10" fill="currentColor" />
      <Shape d="M126 86 C122 46 186 46 182 86 L180 104 H128 Z" />
      <Dot x={144} y={78} r={3} />
      <Dot x={164} y={78} r={3} />
      <Line d="M146 92 H162 M138 70 l8 -4 M170 70 l-8 -4" w={3} />
      <Shape d="M96 110 H208 L220 190 H84 Z" />
      <Shape d="M96 110 L80 130 L96 150 Z M208 110 L224 130 L208 150 Z" w={4} />
      <Line d="M152 110 V190" w={3} />
      <Shape d="M100 190 H148 V226 H100 Z M156 190 H204 V226 H156 Z" w={4} />
      <Line d="M104 122 L74 160 M204 122 L240 160" w={7} />
      <Line d="M226 160 l16 -14 l8 12" w={4} />
    </Drawing>
  );
}

export function ScrapKid() {
  return (
    <Drawing label="Drawing of a kid in a patched helmet carrying a rusty crossbow">
      <Shape d="M176 96 C170 50 230 50 224 96 L220 112 H180 Z" />
      <Line d="M184 86 H216" w={4} />
      <Dot x={192} y={96} r={3} />
      <Dot x={208} y={96} r={3} />
      <Shape d="M168 112 H232 L240 180 H160 Z" />
      <Line d="M200 112 V180" w={3} />
      <Shape d="M176 120 h14 v12 h-14 Z" w={2} />
      <Line d="M170 120 L148 160 M230 120 L270 130" w={6} />
      <Shape d="M260 126 H340 V140 H260 Z" w={4} />
      <Line d="M290 100 Q330 133 290 166" w={5} />
      <Line d="M290 100 L290 166" w={2} />
      <Line d="M170 180 V224 M230 180 V224" w={8} />
      <Shape d="M156 62 l10 -18 l8 14 Z" w={3} />
      <Ground y={228} />
    </Drawing>
  );
}

export function TinkeringGranny() {
  return (
    <Drawing label="Drawing of a cheerful old woman with a ladle beside a toaster built from scrap">
      <Shape d="M168 74 C164 34 236 34 232 74 C236 98 164 98 168 74 Z" />
      <Line d="M170 58 C176 40 224 40 230 58" w={4} />
      <Shape d="M166 40 a34 18 0 0 1 68 0" w={4} />
      <Dot x={186} y={72} r={3} />
      <Dot x={214} y={72} r={3} />
      <Line d="M186 86 Q200 98 214 86" w={4} />
      <circle cx="176" cy="74" r="10" fill="none" {...ink} strokeWidth={2} />
      <circle cx="224" cy="74" r="10" fill="none" {...ink} strokeWidth={2} />
      <Shape d="M150 104 H250 L268 224 H132 Z" />
      <Shape d="M170 140 H230 V224 H170 Z" w={3} />
      <Line d="M158 112 L128 150 L110 128 M242 112 L278 130 L304 100" w={7} />
      <Line d="M304 100 L334 56" w={4} />
      <circle cx="344" cy="48" r="14" fill={card} {...ink} strokeWidth={4} />
      <Shape d="M40 150 H100 V196 H40 Z" w={4} />
      <Line d="M52 150 V138 H88 V150" w={3} />
      <Line d="M52 170 H88" w={2} />
      <Line d="M60 130 l-6 -10 M76 130 l6 -10" w={3} />
    </Drawing>
  );
}

export function ScrapNurse() {
  return (
    <Drawing label="Drawing of a stern wasteland nurse in a patched coat holding a needle and thread">
      <Shape d="M166 70 C162 32 238 32 234 70 C238 96 162 96 166 70 Z" />
      <Shape d="M166 40 H234 V54 H166 Z" w={4} />
      <Line d="M192 40 V54 M180 47 H204" w={2} />
      <Line d="M182 68 H194 M206 68 H218" w={4} />
      <Line d="M188 86 H212" w={3} />
      <Shape d="M148 104 H252 L268 224 H132 Z" />
      <Line d="M200 104 V224 M164 150 h24 M212 170 h24" w={3} />
      <Shape d="M148 104 L170 104 L182 130 L150 130 Z" w={3} />
      <Line d="M158 112 L130 156 M242 112 L276 130 L300 118" w={7} />
      <Line d="M300 118 L340 80" w={3} />
      <Line d="M340 80 q10 -10 4 -20 q-8 -8 -16 0" w={2} />
      <Shape d="M120 150 H146 V176 H120 Z" w={3} />
      <Line d="M126 163 h14 M133 156 v14" w={2} />
      <circle cx="320" cy="194" r="12" fill={card} {...ink} strokeWidth={3} />
      <circle cx="320" cy="194" r="4" fill="none" {...ink} strokeWidth={2} />
    </Drawing>
  );
}

export function AshRoadPreacher() {
  return (
    <Drawing label="Drawing of a fiery preacher on a rusted motorcycle raising a fist, with pilgrims following on foot">
      <circle cx="120" cy="190" r="36" fill={card} {...ink} />
      <circle cx="120" cy="190" r="8" fill="currentColor" />
      <circle cx="300" cy="190" r="36" fill={card} {...ink} />
      <circle cx="300" cy="190" r="8" fill="currentColor" />
      <Shape d="M120 190 L180 150 H260 L300 190 L270 190 L240 164 H190 L160 190 Z" w={4} />
      <Line d="M260 150 L296 120 L316 100" w={6} />
      <Shape d="M176 74 C172 34 228 34 224 74 C228 96 176 96 176 74 Z" />
      <Line d="M184 66 H216 M192 82 l8 6 l8 -6" w={3} />
      <Shape d="M160 96 H236 L246 150 H150 Z" />
      <Line d="M236 106 L270 80 L276 44" w={7} />
      <circle cx="278" cy="36" r="10" fill={card} {...ink} strokeWidth={4} />
      <Line d="M162 110 L196 130 L260 134" w={6} />
      <Line d="M30 214 l8 -26 M50 214 l6 -30 M72 214 l4 -20" w={4} />
      <circle cx="38" cy="180" r="6" fill={card} {...ink} strokeWidth={3} />
      <circle cx="56" cy="176" r="6" fill={card} {...ink} strokeWidth={3} />
    </Drawing>
  );
}

export function WastelandGunslinger() {
  return (
    <Drawing label="Drawing of a tall scarred duelist in a duster with a rebuilt revolver at the draw">
      <Shape d="M156 62 C158 28 242 28 244 62 Z" />
      <Line d="M138 66 Q200 82 262 66" w={6} />
      <Shape d="M174 70 H226 V102 C226 120 174 120 174 102 Z" />
      <Line d="M182 80 L196 90" w={3} />
      <Dot x={190} y={86} r={3} />
      <Dot x={212} y={86} r={3} />
      <Line d="M192 104 H210" w={3} />
      <Shape d="M144 122 C150 112 250 112 256 122 L284 224 H116 Z" />
      <Line d="M200 122 V224" w={3} />
      <Line d="M158 126 L120 170 M242 126 L284 112 L304 90" w={7} />
      <Shape d="M296 78 H340 V94 H296 Z" w={4} />
      <Line d="M340 86 H364" w={4} />
      <Line d="M370 76 l12 -8 M370 96 l14 4" w={3} />
      <Line d="M130 150 H270" w={5} />
      <Ground y={228} />
    </Drawing>
  );
}
