import { describe, expect, it } from "vitest";
import { aiName, formatCount, letterGrade, position, spans, tierFor } from "../../../src/charts/calculators/maintainability-calculator/calculate";

describe("spans", () => {
  it("uses n^n as the middle and (n-1)^(n-1) for the lower bound", () => {
    const result = spans(2);

    expect(result.mid).toBe(4);
    expect(result.hi).toBe(27);
    expect(result.lo).toBeCloseTo(1);
  });

  it("falls back to the upper span when the lower one is nearly flat", () => {
    const result = spans(1);

    expect(result.down).toBe(result.up);
  });
});

describe("position", () => {
  it("is 0 at the stable line count and 1 at the next step up", () => {
    expect(position(4, 2)).toBeCloseTo(0);
    expect(position(27, 2)).toBeCloseTo(1);
  });

  it("is -1 at the lower bound", () => {
    expect(position(1, 2)).toBeCloseTo(-1);
  });

  it("is -Infinity for an empty project", () => {
    expect(position(0, 2)).toBe(-Infinity);
  });
});

describe("tierFor", () => {
  it("picks the tier whose upper limit the position falls under", () => {
    expect(tierFor(-2).name).toBe("Trivial");
    expect(tierFor(-0.5).name).toBe("Easy");
    expect(tierFor(0).name).toBe("Normal");
    expect(tierFor(0.2).name).toBe("Slightly Hard");
    expect(tierFor(5).name).toBe("Impossible");
  });
});

describe("formatCount", () => {
  it("shortens big counts with a suffix", () => {
    expect(formatCount(1500)).toBe("1.50K");
    expect(formatCount(250000)).toBe("250K");
    expect(formatCount(45600000)).toBe("45.6M");
  });

  it("keeps small counts whole and flags tiny ones", () => {
    expect(formatCount(999)).toBe("999");
    expect(formatCount(0.5)).toBe("<1");
  });
});

describe("aiName", () => {
  it("names each amount of AI help", () => {
    expect(aiName(0)).toBe("No AI");
    expect(aiName(0.3)).toBe("Pair AI");
    expect(aiName(0.7)).toBe("AI‑Written");
    expect(aiName(1)).toBe("Full Vibe AI");
  });
});

describe("letterGrade", () => {
  it("adds plus and minus by the last digit", () => {
    expect(letterGrade(97)).toBe("A+");
    expect(letterGrade(95)).toBe("A");
    expect(letterGrade(91)).toBe("A−");
    expect(letterGrade(100)).toBe("A+");
  });

  it("fails below 60 and bottoms out at 50", () => {
    expect(letterGrade(55)).toBe("F");
    expect(letterGrade(50)).toBe("F−");
  });
});
