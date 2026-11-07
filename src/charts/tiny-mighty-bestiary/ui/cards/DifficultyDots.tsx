/** Difficulty at which each dot becomes a double dot worth 2. */
const DOUBLE_FROM = 6;

/**
 * One dot per point of difficulty, plus a partly filled dot for a fraction. From 6 up, dots are doubles
 * (two overlapped, offset dots worth 2) so the row stays short. The number is always shown too.
 */
export default function DifficultyDots({ value }: { value: number }) {
  const doubles = value >= DOUBLE_FROM ? Math.floor(value / 2) : 0;
  const rest = value - doubles * 2;
  const whole = Math.floor(rest);
  const fraction = rest - whole;

  return (
    <span className="bestiary-difficulty" aria-label={`Difficulty ${value}`}>
      <span className="bestiary-difficulty-label" aria-hidden="true">
        Difficulty:
      </span>
      <span className="bestiary-dots" aria-hidden="true">
        {/* One double dot for each pair of difficulty points. */}
        {Array.from({ length: doubles }, (_unused, index) => (
          <span key={`d${index}`} className="bestiary-dot-double">
            <span className="bestiary-dot bestiary-dot-full" />
            <span className="bestiary-dot bestiary-dot-full" />
          </span>
        ))}

        {/* One full dot per whole difficulty point. */}
        {Array.from({ length: whole }, (_unused, index) => (
          <span key={index} className="bestiary-dot bestiary-dot-full" />
        ))}

        {fraction > 0 && <span className="bestiary-dot" style={{ ["--fill" as string]: fraction }} />}
      </span>
      <span className="bestiary-difficulty-num">{value}</span>
    </span>
  );
}
