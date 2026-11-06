import { techShares } from "./languageBurden";
import { PERCENT } from "./maintenance";

/** The side of a square for a language that is all of a project's code, in em: about the height of a capital letter. */
const FULL_SQUARE_EM = 0.7;

/** Even the smallest language gets a dot you can see. */
const MIN_SQUARE_PX = 2;

/** The side of a square for a share of the project's lines. The side is the square root of the share so the area, not the length, matches the share. */
const sideOf = (share: number) => `max(${MIN_SQUARE_PX}px, ${Math.sqrt(share) * FULL_SQUARE_EM}em)`;

type Square = { label: string; share: number; color: string | undefined };

/** Languages that share a color (the ones grouped as "Other") become one square, so a project never shows several squares of the same color. Biggest first. */
function squaresByColor(shares: { language: string; share: number }[], colors: Map<string, string>): Square[] {
  const groups = new Map<string, Square>();

  for (const { language, share } of shares) {
    const color = colors.get(language);
    const key = color ?? language;
    const group = groups.get(key);

    if (!group) groups.set(key, { label: language, share, color });
    else groups.set(key, { ...group, label: `${group.label}, ${language}`, share: group.share + share });
  }

  return [...groups.values()].sort((first, second) => second.share - first.share);
}

/** Colored squares, one per language in a project, each with an area matching the language's share of the project's lines. The biggest is first; smaller ones stack in columns next to it, no taller than it. */
export function LanguageSquares({ techLines, colors }: { techLines: unknown; colors: Map<string, string> }) {
  const rawShares = techShares(techLines);

  if (!rawShares) return null;

  const shares = squaresByColor(rawShares, colors);

  return (
    // Shares are sorted biggest first, so the first one sets the height that columns of smaller squares wrap at.
    <span className="language-squares" style={{ height: sideOf(shares[0].share) }}>
      {shares.map(({ label, share, color }) => {
        const side = sideOf(share);

        return (
          <span
            key={label}
            title={`${label} ${(share * PERCENT).toFixed(1)}%`}
            style={{ width: side, height: side, backgroundColor: color }}
          />
        );
      })}
    </span>
  );
}
