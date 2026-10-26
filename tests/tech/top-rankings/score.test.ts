import { describe, expect, it } from "vitest";
import { type Ranking, fractionBetween, grade, maxScore, minScore, rankItems, score } from "../../../src/charts/tech/top-rankings/score";

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
    expect(rankItems(ranking).map((row) => row.item.name)).toEqual(["high", "low", "tie"]);
  });

  it("gives equal scores the same rank", () => {
    expect(rankItems(ranking).map((row) => row.rank)).toEqual([1, 2, 2]);
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
    expect(gradeOfAll(4)).toBeGreaterThan(88);
    expect(gradeOfAll(4)).toBeLessThan(92);
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
