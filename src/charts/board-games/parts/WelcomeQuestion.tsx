/** What a first-time visitor can answer when asked which weight they prefer; a weight of null means they do not care. */
const FIRST_VISIT_CHOICES: { label: string; weight: number | null }[] = [
  { label: "Don't Care", weight: null },
  { label: "Light Games (1)", weight: 1 },
  { label: "Medium-Light Games (2)", weight: 2 },
  { label: "Medium Games (2.5)", weight: 2.5 },
  { label: "Medium-Heavy Games (3)", weight: 3 },
  { label: "Heavy Games (4)", weight: 4 },
  { label: "Extremely Heavy Games (5)", weight: 5 },
];

interface Props {
  /** Called with the chosen weight, or null for "Don't Care". */
  onAnswer: (weight: number | null) => void;
}

/** The question a first-time visitor sees before the list. */
export default function WelcomeQuestion({ onAnswer }: Props) {
  return (
    <div className="board-games board-games-welcome">
      <h2>What weight do you prefer?</h2>
      <p className="muted">
        Weight is how complex a game is, from 1 (light) to 5 (heavy). It re-ranks the list so games near your weight come
        first. You can change it any time.
      </p>
      <div className="board-games-choices">
        {FIRST_VISIT_CHOICES.map((choice) => (
          <button type="button" key={choice.label} onClick={() => onAnswer(choice.weight)}>
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
