/** The part of each story that names its situation, shown in bold. */
const STORY_SUBJECTS = [
  "A homeless person",
  "a horrible cut",
  "an idea for a new business",
  "lose your job",
  "buy or build a home",
  "Gas prices are high",
  "Rent goes up 20%",
  "cut your hours",
  "buy out your small shop",
  "can't afford college",
  "polluting your town's river",
  "your savings are thin",
  "tech startup is booming",
  "storm wipes out your neighborhood",
  "can't pay your medical bill",
  "The government needs money",
];

// Matches any one subject; the replace puts a backslash before each regex special character so subjects are matched as plain text.
const SUBJECT_PATTERN = new RegExp(
  `(${STORY_SUBJECTS.map((subject) => subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
);

/** One story with its situation in bold. */
function Story({ text }: { text: string }) {
  return (
    <li>
      {/* Split keeps the matched subject as every other piece, so those pieces are the ones to bold. */}
      {text
        .split(SUBJECT_PATTERN)
        .map((piece, index) => (STORY_SUBJECTS.includes(piece) ? <strong key={index}>{piece}</strong> : piece))}
    </li>
  );
}

/** The "Stories" section at the top of a panel: short scenarios showing the system in daily life. */
export default function Stories({ examples }: { examples: string[] }) {
  return (
    <div className="examples">
      <h3>Stories</h3>
      <ul>
        {/* One short story per scenario. */}
        {examples.map((story) => (
          <Story key={story} text={story} />
        ))}
      </ul>
    </div>
  );
}
