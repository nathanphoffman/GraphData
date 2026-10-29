// Scores board games for a weight preference. Preferring a weight is not a filter, it only pushes games of that weight up the list.

/** How strongly distance from the preferred weight lowers a score. */
const BIAS_BASE = 2;
const BIAS_MULTIPLIER = 1;

/** Averages above this count as this, so a few very high ratings cannot dominate. */
const MAX_AVERAGE_RATING = 8.75;

const RATING_SCALE = 10;

/** Games added by hand; the weight is an override of BGG's. */
export const CUSTOM_GAMES = [
  { title: "Honey Buzz Custom", average: 7.55, weight: 2.5, num: 7676, rank: null, releaseDate: "2020" },
  { title: "Ego Custom", average: 7.22, weight: 2.29, num: 243, rank: null, releaseDate: "2025" },
  { title: "Shadowscape custom", average: 6.2, weight: 2.44, num: 66, rank: null, releaseDate: "2017" },
];

/** A game's score for a weight preference; 0 means no preference. Under 1 is likely bad, 2 to 2.5 decent, 3 and over phenomenal. */
export function scoreGame(game, preference) {
  let distance = Math.abs(game.weight - preference);

  // Games heavier than the preference are punished twice as much as lighter ones, since lighter games are easier to get to the table.
  if (game.weight > preference) distance *= 2;
  const exponent = preference === 0 ? BIAS_BASE : BIAS_BASE + BIAS_MULTIPLIER * distance;

  return (Math.min(game.average, MAX_AVERAGE_RATING) / RATING_SCALE) ** exponent * Math.log10(game.num);
}

/** The games with a score for the preference, best first; games BGG ranks higher win ties and unranked games go last. */
export function rankGames(games, preference) {
  const byBggRank = [...games].sort((first, second) => (first.rank ?? Infinity) - (second.rank ?? Infinity) || 0);
  const scored = byBggRank.map((game) => ({ ...game, score: scoreGame(game, preference) }));

  return scored.filter((game) => Number.isFinite(game.score) && game.score !== 0).sort((first, second) => second.score - first.score);
}
