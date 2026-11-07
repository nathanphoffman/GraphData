import { CHART_HEIGHT, MARGIN } from "../model/layout";

/** Language names run at an angle below the axis. */
const NAME_DROP = 16;
const NAME_FONT_SIZE = 13;
const NAME_ANGLE = -45;

/** A language's name, tilted so long names fit under the axis. */
export default function LanguageName({ name, centerX }: { name: string; centerX: number }) {
  const baseline = CHART_HEIGHT - MARGIN.bottom + NAME_DROP;

  return (
    <text
      x={centerX}
      y={baseline}
      textAnchor="end"
      fontSize={NAME_FONT_SIZE}
      fontWeight={500}
      fill="#fff"
      transform={`rotate(${NAME_ANGLE} ${centerX} ${baseline})`}
    >
      {name}
    </text>
  );
}
