import { describe, expect, it } from "vitest";
import { type Ranking, fractionBetween, rankItems, score } from "../../../src/charts/tech/top-rankings/score";

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
