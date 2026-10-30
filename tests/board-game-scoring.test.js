import { describe, expect, it } from "vitest";
import { findBestWeight, pointsForPosition, rankGames, scoreGame } from "../server/board-game-scoring.js";

const light = { title: "Light", releaseDate: "2020", average: 7.5, weight: 1.5, num: 10000, rank: 200 };
const heavy = { title: "Heavy", releaseDate: "2020", average: 7.5, weight: 4, num: 10000, rank: 100 };

describe("scoreGame", () => {
  it("scores by rating and popularity when there is no preference", () => {
    expect(scoreGame(light, 0)).toBeCloseTo(0.75 ** 2 * 4);
  });

  it("punishes a heavier game twice as much as a lighter one at the same distance", () => {
    const [lighter, heavier] = [{ ...light, weight: 1.5 }, { ...light, weight: 2.5 }];
    expect(scoreGame(heavier, 2)).toBeLessThan(scoreGame(lighter, 2));
  });

  it("caps very high ratings", () => {
    expect(scoreGame({ ...light, average: 9.5 }, 0)).toBe(scoreGame({ ...light, average: 8.75 }, 0));
  });
});

describe("rankGames", () => {
  it("puts games near the preferred weight first", () => {
    expect(rankGames([heavy, light], 1.5)[0].title).toBe("Light");
    expect(rankGames([heavy, light], 4)[0].title).toBe("Heavy");
  });

  it("leaves out games with no usable score", () => {
    expect(rankGames([{ ...light, average: 0 }], 0)).toEqual([]);
  });
});

describe("findBestWeight", () => {
  const games = [
    { title: "A", releaseDate: "2020", average: 7.5, weight: 1.5, num: 10000, rank: 300 },
    { title: "B", releaseDate: "2020", average: 7.4, weight: 1.6, num: 10000, rank: 310 },
    { title: "C", releaseDate: "2020", average: 7.5, weight: 4.5, num: 10000, rank: 320 },
    { title: "D", releaseDate: "2020", average: 7.4, weight: 4.4, num: 10000, rank: 330 },
  ];

  it("suggests a light weight for light games and a heavy one for heavy games", () => {
    expect(findBestWeight(games, [games[0], games[1]]).best.preference).toBeLessThan(3);
    expect(findBestWeight(games, [games[2], games[3]]).best.preference).toBeGreaterThan(3);
  });

  it("adds up points for the owned games' positions and reports games it has no score for", () => {
    const result = findBestWeight(games, [games[0], { title: "Nope", releaseDate: "1999" }]);
    expect(result.best.points).toBe(pointsForPosition(result.best.games[0].position));
    expect(result.missing).toEqual(["Nope"]);
  });
});

describe("pointsForPosition", () => {
  it("is worth (1000 - place) to the power 1.5, and nothing from place 1000 down", () => {
    expect(pointsForPosition(1)).toBeCloseTo(999 ** 1.5);
    expect(pointsForPosition(1000)).toBe(0);
    expect(pointsForPosition(5000)).toBe(0);
  });

  it("rewards the top far more than the same step lower down", () => {
    expect(pointsForPosition(1) - pointsForPosition(11)).toBeGreaterThan(pointsForPosition(901) - pointsForPosition(911));
  });
});
