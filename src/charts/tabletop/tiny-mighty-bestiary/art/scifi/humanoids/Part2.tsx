import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";

const card = CARD_COLOR;

export function ScrapjawBrawler() {
  return (
    <Drawing label="Drawing of a green tusked bruiser in welded scrap armor with a clumsy gun and a big cleaver">
      <Shape d="M140 94 C140 40 260 40 260 94 C260 120 140 120 140 94 Z" />
      <Line d="M160 76 L190 84 M240 76 L210 84" w={5} />
      <Dot x={180} y={90} r={4} />
      <Dot x={220} y={90} r={4} />
      <Solid d="M170 112 l-6 -20 l12 14 Z M230 112 l6 -20 l-12 14 Z" />
      <Shape d="M110 124 L150 112 H250 L290 124 L280 190 H120 Z" />
      <Line d="M150 140 H250 M140 164 H260" w={3} />
      <Dot x={130} y={134} r={3} />
      <Dot x={270} y={134} r={3} />
      <Shape d="M130 190 H190 V226 H130 Z M210 190 H270 V226 H210 Z" w={4} />
      <Line d="M120 130 L90 170" w={11} />
      <Shape d="M60 160 H110 V180 H60 Z" w={4} />
      <Line d="M60 168 H40" w={4} />
      <Line d="M280 130 L310 100" w={11} />
      <Shape d="M300 20 H350 L346 100 H304 Z" w={4} />
      <Line d="M322 100 V120" w={7} />
    </Drawing>
  );
}

export function RuinKnight() {
  return (
    <Drawing label="Drawing of a scarred spiked and horned warrior in corrupted power armor, with a chainsword">
      <Shape d="M168 80 C160 30 240 30 232 80 L226 100 H174 Z" />
      <Shape d="M168 58 L142 20 L170 40 Z M232 58 L258 20 L230 40 Z" w={4} />
      <Dot x={188} y={72} r={4} />
      <Dot x={212} y={72} r={4} />
      <Line d="M180 56 L196 80" w={3} />
      <Shape d="M114 108 L150 100 H250 L286 108 L280 140 H120 Z" />
      <Solid d="M120 108 L108 78 L134 104 Z M280 108 L292 78 L266 104 Z" />
      <Shape d="M146 140 H254 L262 190 H138 Z" />
      <Line d="M200 100 V190 M160 160 H240" w={3} />
      <Line d="M150 126 L124 174" w={10} />
      <Line d="M250 126 L290 100 L304 70" w={10} />
      <Shape d="M296 20 H316 V90 H296 Z" w={4} />
      <Solid d="M296 28 l-10 6 l10 4 l-10 6 l10 4 Z M316 28 l10 6 l-10 4 l10 6 l-10 4 Z" />
      <Shape d="M144 190 H198 V226 H144 Z M202 190 H256 V226 H202 Z" w={4} />
    </Drawing>
  );
}

export function SilverSeer() {
  return (
    <Drawing label="Drawing of a tall graceful figure in smooth runed armor with a pointed crested helmet and a staff">
      <Shape d="M174 74 C168 30 232 30 226 74 L222 96 H178 Z" />
      <Line d="M200 34 L200 4 M200 4 C220 4 240 20 240 40" w={4} />
      <Line d="M186 70 L200 78 L214 70" w={3} />
      <Shape d="M156 106 H244 L238 176 H162 Z" />
      <Shape d="M162 176 L150 224 H250 L238 176 Z" />
      <Line d="M200 106 V176 M178 124 L200 140 L222 124" w={3} />
      <Line d="M158 112 L134 164 M242 112 L276 140" w={6} />
      <Line d="M280 30 V224" w={4} />
      <circle cx="280" cy="22" r="10" fill={card} {...ink} strokeWidth={3} />
      <Line d="M280 12 v20 M270 22 h20" w={2} />
      <Line d="M170 150 l4 4 M226 150 l-4 4 M190 196 v8 M210 196 v8" w={2} />
      <Line d="M70 60 l6 6 M64 90 l10 -2 M330 90 l8 -6" w={3} />
    </Drawing>
  );
}

export function SkyCoalitionWarrior() {
  return (
    <Drawing label="Drawing of a short soldier in sleek armor shooting from behind a floating drone">
      <Figure arms={<Line d="M158 128 L134 168 M242 128 L284 140" w={7} />}>
        <Shape d="M178 94 C172 56 228 56 222 94 L218 104 H182 Z" />
        <Line d="M186 84 H214" w={4} />
        <Line d="M200 106 V176 M164 140 H236" w={3} />
        <Shape d="M276 134 H336 V150 H276 Z" w={4} />
        <Line d="M336 142 H362" w={4} />
      </Figure>
      <Shape d="M60 70 H130 V120 H60 Z" w={5} />
      <circle cx="95" cy="95" r="12" fill={card} {...ink} strokeWidth={3} />
      <Dot x={95} y={95} r={4} />
      <Line d="M70 60 V50 M120 60 V50 M62 46 H78 M112 46 H128" w={3} />
      <Line d="M130 100 L160 114" w={3} dash="3 4" />
    </Drawing>
  );
}

export function GearPriest() {
  return (
    <Drawing label="Drawing of a red-robed priest with a mechanical arm, a third eye and cogs in the hood">
      <Shape d="M156 92 C150 30 250 30 244 92 L240 118 H160 Z" />
      <path d="M174 92 C174 68 226 68 226 92 C226 110 174 110 174 92 Z" fill={card} stroke="currentColor" strokeWidth="4" />
      <circle cx="188" cy="92" r="5" fill="currentColor" />
      <circle cx="212" cy="92" r="5" fill="currentColor" />
      <circle cx="200" cy="76" r="5" fill="currentColor" />
      <Shape d="M148 118 H252 L284 224 H116 Z" />
      <circle cx="200" cy="160" r="20" fill={card} {...ink} strokeWidth={4} />
      <Line d="M200 144 v-6 M200 176 v6 M184 160 h-6 M216 160 h6" w={4} />
      <Line d="M240 128 L284 114 L300 142" w={5} />
      <Shape d="M290 142 l16 -4 l6 16 l-16 6 Z" w={4} />
      <Line d="M160 128 L130 170 L148 186" w={8} />
      <Line d="M176 36 l-6 -10 M224 36 l6 -10" w={3} />
    </Drawing>
  );
}

export function WitchHunter() {
  return (
    <Drawing label="Drawing of a grim armored investigator with a flamethrower and a sealed warrant">
      <Shape d="M156 62 H244 L236 30 H164 Z" />
      <Line d="M142 66 H258" w={6} />
      <Shape d="M170 70 H230 V102 C230 120 170 120 170 102 Z" />
      <Line d="M182 88 H194 M206 88 H218" w={4} />
      <Shape d="M144 122 H256 L270 224 H130 Z" />
      <Shape d="M168 134 H232 V200 H168 Z" w={4} />
      <Line d="M200 134 V200 M168 166 H232" w={3} />
      <Line d="M252 130 L292 142" w={8} />
      <Shape d="M288 134 H340 V152 H288 Z" w={4} />
      <Line d="M340 143 H360" w={4} />
      <Solid d="M366 130 C380 120 388 108 384 98 C396 112 394 134 376 146 C386 150 368 156 360 150 Z" />
      <Line d="M156 130 L136 178" w={7} />
      <Shape d="M110 170 H148 V196 H110 Z" w={3} />
      <Dot x={129} y={183} r={4} />
    </Drawing>
  );
}

export function SuitGuard() {
  return (
    <Drawing label="Drawing of a security officer in a tailored suit and mirror shades with an earpiece">
      <Shape d="M170 74 C170 36 230 36 230 74 C230 100 170 100 170 74 Z" />
      <Shape d="M176 66 H224 V80 H176 Z" w={3} />
      <Line d="M232 70 q10 8 6 20" w={3} />
      <Line d="M188 92 H212" w={3} />
      <Shape d="M148 106 H252 L264 224 H136 Z" />
      <Shape d="M178 106 L200 150 L222 106 Z" w={3} />
      <Line d="M200 106 V224" w={3} />
      <Solid d="M194 112 h12 l4 40 h-20 Z" />
      <Line d="M156 114 L140 170 L152 190 M244 114 L262 170 L250 190" w={8} />
      <Line d="M170 224 V230 M230 224 V230" w={6} />
      <Line d="M276 44 l8 -6 M286 64 l12 0 M60 60 l-8 -6 M50 80 l-12 0" w={3} dash="3 4" />
    </Drawing>
  );
}
