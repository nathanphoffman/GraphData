import { describe, expect, it } from "vitest";
import { purchasePlan, yearsToReach } from "./spending";

describe("purchasePlan", () => {
  it("buys nothing when you already own the target and nothing wears out", () => {
    expect(purchasePlan(5, 5, 0, 10, 100, 3)).toEqual([0, 0, 0]);
  });

  it("never buys more than the uses have earned", () => {
    const [first] = purchasePlan(0, 100, 20, 10, 100, 1);
    expect(first).toBeCloseTo(2);
  });
});

describe("yearsToReach", () => {
  it("is 1 year when earned purchases cover the gap", () => {
    expect(yearsToReach(4, 5, 100, 10, 1000)).toBe(1);
  });

  it("is null when nothing is ever earned", () => {
    expect(yearsToReach(0, 5, 0, 10, 100)).toBeNull();
  });
});
