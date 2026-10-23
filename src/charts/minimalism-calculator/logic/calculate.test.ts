import { describe, expect, it } from "vitest";
import { arrowPosition, averageUses, recommended, recommendedCount } from "./calculate";

describe("recommended", () => {
  it("scales yearly use by your share", () => {
    expect(recommended(2, 52, 100)).toBeCloseTo(2);
    expect(recommended(2, 52, 50)).toBeCloseTo(1);
  });

  it("never divides by less than 0.1 uses per year", () => {
    expect(recommended(1, 0, 100)).toBeCloseTo(520);
  });
});

describe("recommendedCount", () => {
  it("rounds up but ignores float noise", () => {
    expect(recommendedCount(2.0000000001)).toBe(2);
    expect(recommendedCount(2.2)).toBe(3);
    expect(recommendedCount(-1)).toBe(0);
  });
});

describe("arrowPosition", () => {
  it("sits in the middle when you own what you need", () => {
    expect(arrowPosition(4, 4)).toBeCloseTo(50);
  });

  it("moves a third of the width per doubling and stays within 0-100", () => {
    expect(arrowPosition(8, 4)).toBeCloseTo(50 + 100 / 3);
    expect(arrowPosition(1000, 1)).toBe(100);
    expect(arrowPosition(0, 4)).toBe(0);
  });
});

describe("averageUses", () => {
  it("spreads your share of the use over what you own", () => {
    expect(averageUses(2, 100, 4)).toBeCloseTo(26);
    expect(averageUses(2, 100, 0)).toBeCloseTo(104);
  });
});
