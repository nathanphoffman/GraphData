import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";

const card = CARD_COLOR;

export function CultMagister() {
  return (
    <Drawing label="Drawing of a bald tattooed leader reading from a bleeding book">
      <Shape d="M166 80 C160 30 240 30 234 80 C234 108 166 108 166 80 Z" />
      <Line d="M180 44 q20 -10 40 0 M176 56 l10 -8 M224 56 l-10 -8 M200 36 v10" w={3} />
      <circle cx="186" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <circle cx="214" cy="76" r="8" fill={card} {...ink} strokeWidth={3} />
      <Line d="M192 96 H208" w={3} />
      <Shape d="M150 116 C150 106 250 106 250 116 L270 224 H130 Z" />
      <Line d="M200 116 V224" w={3} />
      <Shape d="M160 140 L200 130 L240 140 V186 L200 176 L160 186 Z" />
      <Line d="M200 130 V176" w={3} />
      <Line d="M170 150 H192 M170 160 H190 M208 150 H232 M208 160 H228" w={2} />
      <Line d="M180 186 V210 M184 186 V200 M220 186 V214" w={3} />
      <Line d="M156 126 L150 150 M244 126 L250 150" w={6} />
      <Shape d="M175 218 q5 -8 10 0 q-5 8 -10 0 Z" w={2} />
    </Drawing>
  );
}

export function EagerCultist() {
  return (
    <Drawing label="Drawing of a cheerful new cultist in an oversized robe holding a clipboard and wearing a nametag">
      <Shape d="M150 100 C140 30 260 30 250 100 L240 128 H160 Z" />
      <path d="M170 100 C170 74 230 74 230 100 C230 116 170 116 170 100 Z" fill={card} stroke="currentColor" strokeWidth="4" />
      <Dot x={188} y={96} r={3} />
      <Dot x={212} y={96} r={3} />
      <Line d="M184 106 Q200 118 216 106" w={3} />
      <Shape d="M150 126 H250 L290 224 H110 Z" />
      <Shape d="M162 148 H196 V166 H162 Z" w={3} />
      <Line d="M168 157 H190" w={2} />
      <Line d="M232 134 L276 150 L300 112" w={6} />
      <Shape d="M290 66 H344 V124 H290 Z" w={4} />
      <Line d="M300 82 H334 M300 94 H334 M300 106 H322" w={2} />
      <Shape d="M310 60 H326 V70 H310 Z" w={3} />
      <Line d="M160 134 L134 168" w={6} />
      <Line d="M110 110 l-10 -4 M110 90 l-12 -10 M130 70 l-6 -12" w={3} />
    </Drawing>
  );
}

export function CurioDealer() {
  return (
    <Drawing label="Drawing of a bespectacled shopkeeper behind a cluttered counter, holding out a wooden box">
      <Shape d="M30 150 H370 V224 H30 Z" />
      <Shape d="M40 60 H110 V150 H40 Z" w={3} />
      <Line d="M40 90 H110 M40 120 H110" w={3} />
      <circle cx="64" cy="78" r="8" fill="none" {...ink} strokeWidth={3} />
      <Line d="M84 112 V90 H98 V112" w={3} />
      <Shape d="M166 76 C162 30 238 30 234 76 C234 102 166 102 166 76 Z" />
      <circle cx="186" cy="74" r="10" fill="none" {...ink} strokeWidth={3} />
      <circle cx="214" cy="74" r="10" fill="none" {...ink} strokeWidth={3} />
      <Line d="M196 74 H204" w={3} />
      <Line d="M190 92 Q200 98 210 92" w={3} />
      <Shape d="M158 104 H242 L250 150 H150 Z" />
      <Line d="M242 124 L276 140" w={6} />
      <Shape d="M270 126 H330 V148 H270 Z" w={4} />
      <Line d="M270 134 H330 M298 126 V136" w={3} />
      <Line d="M60 170 h40 M120 180 h30 M300 176 h40" w={3} />
      <circle cx="334" cy="108" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M334 98 V84" w={3} />
    </Drawing>
  );
}

export function TeaRoomMedium() {
  return (
    <Drawing label="Drawing of a kindly widow at a round table with a crystal ball and a teapot, a faint second shape behind her">
      <Line d="M110 70 C100 140 120 190 160 200" w={3} dash="3 8" />
      <Shape d="M156 72 C150 24 230 24 224 72 C224 98 156 98 156 72 Z" />
      <Line d="M156 64 C170 40 210 40 224 64" w={4} />
      <Dot x={176} y={70} r={3} />
      <Dot x={204} y={70} r={3} />
      <Line d="M180 84 Q190 92 202 84" w={3} />
      <Shape d="M150 100 H230 L250 170 H130 Z" />
      <Line d="M190 100 V170" w={3} />
      <Shape d="M60 170 H340 V184 H60 Z" />
      <Line d="M190 184 V224 M120 184 V224 M260 184 V224" w={7} />
      <circle cx="270" cy="148" r="22" fill={card} {...ink} strokeWidth={4} />
      <Line d="M258 142 q8 -10 18 -4" w={3} />
      <Shape d="M258 170 H282 V164 H258 Z" w={3} />
      <Shape d="M100 150 H130 V170 H100 Z" w={4} />
      <Line d="M100 156 q-14 0 -12 8 q2 6 12 4" w={3} />
      <Line d="M106 146 q-6 -8 2 -14" w={3} dash="2 5" />
      <Line d="M330 60 q10 -10 20 0 M340 90 q10 -10 20 0" w={3} dash="2 6" />
    </Drawing>
  );
}

export function CultInquisitor() {
  return (
    <Drawing label="Drawing of a pale investigator in a long coat holding a ledger and a silver knife">
      <Shape d="M156 62 H244 L236 30 H164 Z" />
      <Line d="M142 64 H258" w={6} />
      <Shape d="M168 70 H232 V102 C232 120 168 120 168 102 Z" />
      <Line d="M182 84 H194 M206 84 H218" w={4} />
      <Line d="M190 104 H210" w={3} />
      <Shape d="M150 124 H250 L270 224 H130 Z" />
      <Line d="M200 124 V224" w={3} />
      <Shape d="M168 124 L200 160 L232 124 Z" w={3} />
      <Line d="M232 134 L270 156" w={6} />
      <Solid d="M268 150 L290 100 L300 154 Z" />
      <Line d="M262 156 H304" w={5} />
      <Line d="M168 134 L130 160" w={6} />
      <Shape d="M96 140 H148 V190 H96 Z" w={4} />
      <Line d="M106 154 H138 M106 164 H138 M106 174 H128" w={2} />
    </Drawing>
  );
}

export function MidnightKingpin() {
  return (
    <Drawing label="Drawing of a smiling crime boss in a pinstripe suit with no shadow, a city skyline behind him">
      <Shape d="M20 224 V130 H70 V90 H110 V224 Z M290 224 V110 H340 V70 H380 V224 Z" w={3} />
      <Line d="M30 150 h30 M30 172 h30 M300 130 h30 M300 152 h30 M300 174 h30 M350 90 h20 M350 112 h20" w={2} />
      <Shape d="M156 62 H244 L236 34 H164 Z" />
      <Line d="M142 64 H258" w={6} />
      <Shape d="M168 70 H232 V102 C232 120 168 120 168 102 Z" />
      <Dot x={186} y={86} r={3} />
      <Dot x={214} y={86} r={3} />
      <Line d="M184 100 Q200 112 216 100" w={4} />
      <Shape d="M144 122 H256 L264 218 H136 Z" />
      <Line d="M200 122 V218 M160 140 V218 M176 140 V218 M224 140 V218 M240 140 V218" w={2} />
      <Shape d="M184 122 L200 150 L216 122 Z" w={3} />
      <Line d="M146 130 L124 170 M254 130 L280 156" w={7} />
      <Line d="M290 160 q8 -8 16 0" w={3} />
      <Line d="M140 224 H260" w={2} dash="3 8" />
    </Drawing>
  );
}

export function NosyLandlady() {
  return (
    <Drawing label="Drawing of a small suspicious landlady with a rolling pin, eyes turned up at an attic window">
      <Shape d="M270 30 H370 V224 H270 Z" w={4} />
      <Shape d="M290 50 H350 V100 H290 Z" w={3} />
      <Line d="M320 50 V100 M290 75 H350" w={2} />
      <circle cx="320" cy="75" r="10" fill="none" {...ink} strokeWidth={2} strokeDasharray="2 4" />
      <Shape d="M130 94 C126 48 194 48 190 94 C190 120 130 120 130 94 Z" />
      <Line d="M126 80 C130 52 190 52 194 80" w={5} />
      <circle cx="146" cy="90" r="6" fill="none" {...ink} strokeWidth={3} />
      <circle cx="172" cy="90" r="6" fill="none" {...ink} strokeWidth={3} />
      <Dot x={148} y={87} r={2} />
      <Dot x={174} y={87} r={2} />
      <Line d="M150 108 H170" w={3} />
      <Shape d="M118 124 H202 L220 224 H100 Z" />
      <Shape d="M130 150 H190 L196 200 H124 Z" w={3} />
      <Line d="M204 138 L236 120" w={6} />
      <Shape d="M222 100 H262 V116 H222 Z" w={4} />
      <Line d="M218 108 H222 M262 108 H266" w={5} />
      <Line d="M118 140 L100 180" w={6} />
    </Drawing>
  );
}

export function ParishExorcist() {
  return (
    <Drawing label="Drawing of a tired priest holding a wooden cross and a flask of holy water">
      <Shape d="M166 74 C162 28 238 28 234 74 C234 100 166 100 166 74 Z" />
      <Line d="M180 66 H194 M206 66 H220" w={4} />
      <Line d="M190 88 H210" w={3} />
      <Line d="M176 80 q-2 10 2 12 M224 80 q2 10 -2 12" w={2} />
      <Shape d="M150 102 H250 L274 224 H126 Z" />
      <Line d="M200 102 V224" w={3} />
      <Shape d="M180 102 L200 122 L220 102 Z" w={3} />
      <Line d="M240 112 L284 90 L296 50" w={6} />
      <Line d="M296 20 V84 M274 40 H318" w={7} />
      <Line d="M160 112 L130 150 L150 170" w={6} />
      <Shape d="M138 160 H164 V190 H138 Z" w={4} />
      <Line d="M144 160 V150 H158 V160" w={3} />
      <Line d="M150 196 q-4 8 0 14" w={3} dash="2 5" />
      <Line d="M340 70 l10 -4 M340 90 l12 4 M50 60 l10 6" w={3} />
    </Drawing>
  );
}
