/** One dot per whole point of difficulty, plus a partly filled dot for a fraction. The number is always shown too. */
export default function DifficultyDots({ value }: { value: number }) {
  const whole = Math.floor(value);
  const fraction = value - whole;
  return (
    <span className="bestiary-difficulty" aria-label={`Difficulty ${value}`}>
      <span className="bestiary-difficulty-label" aria-hidden="true">
        Difficulty:
      </span>
      <span className="bestiary-dots" aria-hidden="true">
        {Array.from({ length: whole }, (_, i) => (
          <span key={i} className="bestiary-dot bestiary-dot-full" />
        ))}
        {fraction > 0 && <span className="bestiary-dot" style={{ ["--fill" as string]: fraction }} />}
      </span>
      <span className="bestiary-difficulty-num">{value}</span>
    </span>
  );
}
