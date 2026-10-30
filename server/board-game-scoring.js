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

/** The weights tried when finding a preference: 1 to 5 in steps of 0.05. */
export const WEIGHT_GRID = Array.from({ length: 81 }, (_, step) => Math.round((1 + step * 0.05) * 100) / 100);

const gameKey = (game) => `${game.title}|${game.releaseDate}`;

/** Places below this earn no points. */
const POINTS_CUTOFF = 1000;

/** How steeply points grow towards the top of the list. */
const POINTS_EXPONENT = 1.5;

/** What a place in the list is worth: the nearer the top, the more it is worth, and nothing from the cutoff down. */
export function pointsForPosition(position) {
  return Math.max(0, POINTS_CUTOFF - position) ** POINTS_EXPONENT;
}

/** The points for a game's place in the ranking for a preference, or 0 when it is not in the list. */
function totalPoints(games) {
  return games.reduce((sum, game) => sum + pointsForPosition(game.position), 0);
}

/**
 * Finds the weight preference that puts the owned games highest in the list: for every weight, each owned game earns points for its
 * place (see pointsForPosition) and the highest total wins, so getting games into the top 100 matters far more than the bottom of the list.
 * Owned games the list has no score for are left out of every total, so they cannot change the winner.
 * When several weights tie, the middle one is the suggestion.
 */
export function findBestWeight(games, owned) {
  const ownedKeys = new Set(owned.map(gameKey));
  const totals = WEIGHT_GRID.map((preference) => {
    const found = rankGames(games, preference).map((game, index) => ({ title: game.title, releaseDate: game.releaseDate, position: index + 1 })).filter((game) => ownedKeys.has(gameKey(game)));

    return { preference, points: totalPoints(found), games: found };
  });

  const highest = Math.max(...totals.map(({ points }) => points));
  const tied = totals.filter(({ points }) => points === highest);
  const best = tied[Math.floor(tied.length / 2)];
  const foundKeys = new Set(best.games.map(gameKey));
  const noPreference = rankGames(games, 0).map((game, index) => ({ ...game, position: index + 1 })).filter((game) => ownedKeys.has(gameKey(game)));

  return {
    best: { preference: best.preference, points: best.points, games: [...best.games].sort((first, second) => first.position - second.position) },
    tied: [tied[0].preference, tied[tied.length - 1].preference],
    noPreferencePoints: totalPoints(noPreference),
    missing: owned.filter((game) => !foundKeys.has(gameKey(game))).map((game) => game.title),
  };
}
