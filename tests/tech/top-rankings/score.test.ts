import { describe, expect, it } from "vitest";
import { type Ranking, effectiveRating, fractionBetween, grade, letterGrade, maxScore, minScore, rankItems, score } from "../../../src/charts/tech/top-rankings/score";

const columns = [{ label: "Year" }, { label: "Syntax", weight: 10 }, { label: "Skill", weight: 1 }];

describe("score", () => {
  it("adds rating squared times weight for the rated columns", () => {
    expect(score(columns, { name: "A", values: [1990, 3, 2] })).toBe(3 ** 2 * 10 + 2 ** 2 * 1);
  });

  it("ignores information columns and missing ratings", () => {
    expect(score(columns, { name: "A", values: [2020, 2, null] })).toBe(40);
  });

  it("handles half ratings", () => {
    expect(score(columns, { name: "A", values: [2020, 3.5, 1] })).toBe(12.25 * 10 + 1);
  });
});

describe("rankItems", () => {
  const ranking: Ranking = {
    id: "x",
    title: "X",
    columns,
    items: [
      { name: "low", values: [1, 1, 1] },
      { name: "high", values: [1, 5, 5] },
      { name: "tie", values: [1, 1, 1] },
    ],
  };

  it("puts the best score first", () => {
    expect(rankItems(ranking).map((ranked) => ranked.item.name)).toEqual(["high", "low", "tie"]);
  });

  it("gives equal scores the same rank", () => {
    expect(rankItems(ranking).map((ranked) => ranked.rank)).toEqual([1, 2, 2]);
  });
});

describe("fractionBetween", () => {
  it("is 0 at the low end and 1 at the high end", () => {
    expect(fractionBetween(1, 1, 5)).toBe(0);
    expect(fractionBetween(5, 1, 5)).toBe(1);
    expect(fractionBetween(3, 1, 5)).toBe(0.5);
  });

  it("stays within 0 and 1", () => {
    expect(fractionBetween(0, 1, 5)).toBe(0);
    expect(fractionBetween(9, 1, 5)).toBe(1);
  });

  it("is the middle when low and high are the same", () => {
    expect(fractionBetween(4, 4, 4)).toBe(0.5);
  });
});

describe("grade", () => {
  // Weights 3, 2, 1: the best possible score is (3 + 2 + 1) x 25 and the lowest is (3 + 2 + 1) x 1.
  const rated = [{ label: "A", weight: 3 }, { label: "B", weight: 2 }, { label: "C", weight: 1 }];

  const gradeOfAll = (rating: number) => grade(rated.reduce((total, column) => total + rating ** 2 * (column.weight ?? 0), 0), rated);

  it("knows the best and lowest possible scores", () => {
    expect(maxScore(rated)).toBe(150);
    expect(minScore(rated)).toBe(6);
  });

  it("is 0 for all 1s and 100 for all 5s", () => {
    expect(gradeOfAll(1)).toBe(0);
    expect(gradeOfAll(5)).toBeCloseTo(100);
  });

  it("never goes below 0", () => {
    expect(grade(0, rated)).toBe(0);
  });

  it("keeps a lot of 4s a decent grade", () => {
    expect(gradeOfAll(4)).toBeGreaterThan(92);
    expect(gradeOfAll(4)).toBeLessThan(97);
  });

  it("falls faster the lower the score gets", () => {
    const dropNearTop = gradeOfAll(5) - gradeOfAll(4);
    const dropLower = gradeOfAll(3) - gradeOfAll(2);

    expect(dropLower).toBeGreaterThan(dropNearTop * 2);
  });

  it("is 0 when nothing is rated", () => {
    expect(grade(10, [{ label: "Year" }])).toBe(0);
  });
});

describe("effectiveRating", () => {
  it("leaves columns without a best rating alone", () => {
    expect(effectiveRating({ label: "A", weight: 1 }, 2)).toBe(2);
  });

  it("is 5 at the best rating and 1 at the furthest end", () => {
    const column = { label: "Chaos", weight: 1, best: 3 };

    expect(effectiveRating(column, 3)).toBe(5);
    expect(effectiveRating(column, 1)).toBe(1);
    expect(effectiveRating(column, 5)).toBe(1);
    expect(effectiveRating(column, 4)).toBe(3);
  });

  it("measures from the further end when the best rating is off centre", () => {
    const column = { label: "Thinky", weight: 1, best: 3.25 };

    expect(effectiveRating(column, 5)).toBeCloseTo(5 - (4 * 1.75) / 2.25);
    expect(effectiveRating(column, 1)).toBe(1);
  });
});

describe("effectiveRating curves", () => {
  const curves = {
    year: { type: "age", oldest: -3000, offset: 7, steepness: 1 },
    weight: { type: "peak", at: 2, from: 1, fromRating: 3, to: 5 },
    time: { type: "log", from: 5, to: 1200 },
    seasons: { type: "log1p", to: 10 },
    cut: { type: "halving", start: 5 },
    first: { type: "halving", start: 1 },
  } as const;

  const rate = (name: keyof typeof curves, value: number) => effectiveRating({ label: "A", weight: 1, curve: curves[name] }, value);

  it("rates a weight of 2 best, falling in a straight line to 3 at 1 and to 1 at 5", () => {
    expect(rate("weight", 2)).toBe(5);
    expect(rate("weight", 1)).toBe(3);
    expect(rate("weight", 5)).toBe(1);
    expect(rate("weight", 1.5)).toBeCloseTo(4);
    expect(rate("weight", 3.5)).toBeCloseTo(3);
  });

  it("rates the shortest time 5 and the longest 1", () => {
    expect(rate("time", 5)).toBeCloseTo(5);
    expect(rate("time", 1200)).toBeCloseTo(1);
  });

  it("rates no seasons 5, one season about 4, and ten seasons 1", () => {
    expect(rate("seasons", 0)).toBe(5);
    expect(rate("seasons", 0.5)).toBeGreaterThan(rate("seasons", 1));
    expect(rate("seasons", 0.5)).toBeLessThan(5);
    expect(rate("seasons", 1)).toBeCloseTo(3.84, 1);
    expect(rate("seasons", 10)).toBeCloseTo(1);
  });

  it("halves the distance for every cut and every #1", () => {
    expect(rate("cut", 0)).toBe(5);
    expect(rate("cut", 1)).toBe(3);
    expect(rate("cut", 3)).toBe(1.5);
    expect(rate("first", 0)).toBe(1);
    expect(rate("first", 2)).toBe(4);
  });

  it("rates this year 1, older years higher, and only the oldest year 5", () => {
    const thisYear = new Date().getFullYear();

    expect(rate("year", thisYear)).toBe(1);
    expect(rate("year", thisYear - 10)).toBeGreaterThan(rate("year", thisYear - 1));
    expect(rate("year", 1900)).toBeLessThan(5);
    expect(rate("year", -3000)).toBeCloseTo(5);
  });
});

describe("letterGrade", () => {
  it("gives the usual letters", () => {
    expect([100, 96, 90, 85, 75, 61, 59, 0].map(letterGrade)).toEqual(["A+", "A", "A-", "B", "C", "D-", "F", "F"]);
  });
});

describe("peak curve with a knee", () => {
  const column = { label: "Weight", weight: 1, curve: { type: "peak" as const, at: 2, from: 1, fromRating: 3, to: 4.25, kneeAt: 3.25, kneeRating: 3.5 } };

  it("falls gently up to the knee and steeply after it", () => {
    expect(effectiveRating(column, 2)).toBe(5);
    expect(effectiveRating(column, 3.25)).toBeCloseTo(3.5);
    expect(effectiveRating(column, 4.25)).toBe(1);
    expect(effectiveRating(column, 3.75)).toBeCloseTo(2.25);
  });
});

describe("linear curve", () => {
  it("runs from 1 at from to 5 at to, and stays inside", () => {
    const column = { label: "Q", weight: 1, curve: { type: "linear" as const, from: 60, to: 100 } };
    expect(effectiveRating(column, 60)).toBe(1);
    expect(effectiveRating(column, 80)).toBe(3);
    expect(effectiveRating(column, 100)).toBe(5);
    expect(effectiveRating(column, 120)).toBe(5);
  });
});
