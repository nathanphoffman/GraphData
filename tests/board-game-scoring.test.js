import { describe, expect, it } from "vitest";
import { rankGames, scoreGame } from "../server/board-game-scoring.js";

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
