import { describe, expect, it } from "vitest";
import { gapLabel, goalColor, waitBuckets } from "../../../src/charts/calculators/minimalism-calculator/logic/waiting";

describe("waitBuckets", () => {
  it("has probabilities that add up to 1", () => {
    for (const lambda of [0.3, 2, 12, 80]) {
      const total = waitBuckets(lambda).reduce((total, bucket) => total + bucket.p, 0);
      expect(total).toBeCloseTo(1, 5);
    }
  });

  it("breaks the never-used bucket into year groups", () => {
    const labels = waitBuckets(0.5).map((bucket) => bucket.gap).filter(Boolean);
    expect(labels).toContain("10+ years");
  });
});

describe("gapLabel", () => {
  it("names familiar waits", () => {
    expect(gapLabel({ label: "52", mid: 52, p: 0 })).toBe("Every 1–2 weeks");
    expect(gapLabel({ label: "1", mid: 1, p: 0 })).toBe("Yearly");
    expect(gapLabel({ label: "0", mid: 0, p: 0 })).toBe("Over a year");
  });
});

describe("goalColor", () => {
  it("is red at zero and green at the goal", () => {
    expect(goalColor(0, 5)).toBe("hsl(0, 70%, 45%)");
    expect(goalColor(5, 5)).toBe("hsl(120, 70%, 45%)");
  });
});
