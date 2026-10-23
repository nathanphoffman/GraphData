import { describe, expect, it } from "vitest";
import { completeAverage, last3, projectAll, recentRate } from "../../../src/charts/science/weight-journey/model/averages";

describe("completeAverage", () => {
  it("skips missing values", () => {
    expect(completeAverage([10, null, 20])).toBe(15);
  });
});

describe("projectAll", () => {
  it("is null until there are enough rows", () => {
    expect(projectAll([1, 2, 3], 1, 2, 1)).toBeNull();
  });

  it("adds 12 times the change over the lag", () => {
    expect(projectAll([100, 99], 1, 1, 1)).toBe(99 + -1 * 12);
  });
});

describe("last3", () => {
  it("averages this row and the two before, skipping nulls", () => {
    expect(last3([null, 4, 8], 2)).toBe(6);
    expect(last3([null], 0)).toBeNull();
  });
});

describe("recentRate", () => {
  it("is null before 30 days of history", () => {
    expect(recentRate([1, 2], 1, 1)).toBeNull();
  });

  it("combines the 15 and 30 day changes", () => {
    const series = Array.from({ length: 31 }, (_, i) => 200 - i);
    expect(recentRate(series, 30, 1)).toBe(-30);
  });
});
