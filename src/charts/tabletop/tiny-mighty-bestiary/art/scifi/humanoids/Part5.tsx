import { Dot, Drawing, ink, Line, Shape, Solid, CARD_COLOR } from "../../core/artStyle";
import { Figure } from "../../core/figure";

const card = CARD_COLOR;

export function FleetAdmiral() {
  return (
    <Drawing label="Drawing of a grim commander in a black glass helmet before a bridge window full of ships">
      <Shape d="M20 20 H380 V110 H20 Z" w={4} />
      <Line d="M20 110 L120 20 M200 110 L300 20" w={2} />
      {[[60, 60], [120, 80], [170, 48], [240, 70], [300, 50], [340, 84]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l14 -4 l12 4 l-12 4 Z`} fill="currentColor" />
      ))}
      <Shape d="M166 120 C160 82 240 82 234 120 L228 140 H172 Z" />
      <Solid d="M176 108 H224 V128 H176 Z" />
      <Shape d="M130 150 L170 140 H230 L270 150 L260 224 H140 Z" />
      <Line d="M200 140 V224" w={3} />
      <Solid d="M170 156 h14 v8 h-14 Z M216 156 h14 v8 h-14 Z" />
      <Line d="M150 160 L124 200 M250 160 L276 200" w={8} />
    </Drawing>
  );
}

export function RimScrapper() {
  return (
    <Drawing label="Drawing of a greasy teenage scavenger in a patched flight jacket with a stolen blaster">
      <Figure arms={<Line d="M154 118 L126 160 M246 118 L284 134" w={7} />}>
        <Line d="M176 60 q24 -22 50 0" w={5} />
        <Dot x={188} y={76} r={3} />
        <Dot x={212} y={76} r={3} />
        <Line d="M190 90 Q202 98 214 90" w={3} />
        <Shape d="M150 106 L196 106 L190 180 H144 Z M250 106 L204 106 L210 180 H256 Z" w={4} />
        <Shape d="M160 130 H180 V146 H160 Z" w={2} />
        <Line d="M200 106 V180" w={3} />
        <Shape d="M278 124 H326 V142 H278 Z" w={4} />
        <Line d="M326 133 H344" w={4} />
        <Shape d="M120 160 H144 V176 H120 Z" w={3} />
      </Figure>
    </Drawing>
  );
}

export function ShadowEmperor() {
  return (
    <Drawing label="Drawing of a cloaked tyrant on a throne of black glass shards, hooded, with hands crossed">
      <Solid d="M80 224 L100 60 L140 20 L150 120 L250 120 L260 20 L300 60 L320 224 Z" />
      <path d="M126 224 L136 90 L160 120 M274 224 L264 90 L240 120" stroke={card} strokeWidth="2" fill="none" />
      <Shape d="M160 100 C150 40 250 40 240 100 L236 130 H164 Z" />
      <path d="M176 100 C176 78 224 78 224 100 C224 118 176 118 176 100 Z" fill="currentColor" />
      <circle cx="192" cy="98" r="3" fill={card} />
      <circle cx="208" cy="98" r="3" fill={card} />
      <Shape d="M150 130 H250 L280 224 H120 Z" />
      <Line d="M178 170 H222 M176 184 H224" w={5} />
      <Line d="M170 140 L200 170 L230 140" w={4} />
      <Line d="M110 30 l6 -10 M290 30 l-6 -10 M200 20 v-12" w={3} />
    </Drawing>
  );
}

export function FieldMedicDroid() {
  return (
    <Drawing label="Drawing of a battered white medical droid with a cross on its chest and a bag of stims">
      <Shape d="M160 40 H240 V92 H160 Z" />
      <circle cx="184" cy="66" r="9" fill={card} {...ink} strokeWidth={3} />
      <Dot x={184} y={66} r={3} />
      <Line d="M208 66 H228" w={4} />
      <Line d="M200 40 V24 M194 24 H206" w={3} />
      <Shape d="M150 100 H250 V176 H150 Z" />
      <Shape d="M190 114 H210 V132 H230 V152 H210 V170 H190 V152 H170 V132 H190 Z" w={3} />
      <Line d="M150 112 L120 150 L130 180 M250 112 L286 140" w={7} />
      <Shape d="M276 134 H326 V170 H276 Z" w={4} />
      <Line d="M290 134 V124 H312 V134" w={3} />
      <Line d="M290 150 H312" w={2} />
      <Shape d="M156 176 H196 V226 H156 Z M204 176 H244 V226 H204 Z" w={4} />
      <Line d="M170 80 l6 6 M230 140 l-8 8" w={2} />
      <Line d="M130 190 q-6 8 0 14" w={3} dash="2 4" />
    </Drawing>
  );
}

export function ShipLordRegent() {
  return (
    <Drawing label="Drawing of a cold shaved-headed noble on a throne of cables and glass panels">
      <Line d="M60 224 C70 120 80 80 110 40 M340 224 C330 120 320 80 290 40 M90 224 C100 150 110 110 130 70 M310 224 C300 150 290 110 270 70" w={5} />
      <Shape d="M100 30 H140 V90 H100 Z M260 30 H300 V90 H260 Z" w={4} />
      <Line d="M110 44 H130 M270 44 H290" w={2} />
      <Shape d="M170 86 C170 44 230 44 230 86 C230 110 170 110 170 86 Z" />
      <Line d="M184 82 H196 M204 82 H216" w={4} />
      <Line d="M190 98 H210" w={3} />
      <Line d="M176 60 C190 54 210 54 224 60" w={3} />
      <Shape d="M146 116 H254 L266 224 H134 Z" />
      <Line d="M200 116 V224" w={3} />
      <Line d="M158 126 L136 180 M242 126 L264 180" w={8} />
      <Line d="M130 190 C120 210 100 210 90 224 M270 190 C280 210 300 210 310 224" w={4} />
      <Shape d="M126 176 H146 V192 H126 Z M254 176 H274 V192 H254 Z" w={3} />
    </Drawing>
  );
}
