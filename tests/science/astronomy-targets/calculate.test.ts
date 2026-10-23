import { describe, expect, it } from "vitest";
import { bortleScale, difficulty, formatHour, formatSize } from "../../../src/charts/science/astronomy-targets/model/calculate";

describe("bortleScale", () => {
  it("boosts positive adjustments under dark skies and fades them under bright ones", () => {
    expect(bortleScale(1, 1)).toBeCloseTo(1.5);
    expect(bortleScale(1, 5)).toBeCloseTo(1);
    expect(bortleScale(1, 9)).toBeCloseTo(0);
  });

  it("does the reverse for negative adjustments", () => {
    expect(bortleScale(-1, 1)).toBeCloseTo(0.5);
    expect(bortleScale(-1, 9)).toBeCloseTo(1.5);
  });

  it("clamps Bortle values outside 1-9", () => {
    expect(bortleScale(1, 0)).toBe(bortleScale(1, 1));
    expect(bortleScale(1, 12)).toBe(bortleScale(1, 9));
  });
});

describe("formatSize", () => {
  it("handles points, arcseconds and arcminutes", () => {
    expect(formatSize(0, 0)).toBe("point");
    expect(formatSize(0.5, 0.5)).toBe("30″");
    expect(formatSize(5, 5)).toBe("5.0′");
    expect(formatSize(12, 12)).toBe("12′");
    expect(formatSize(10, 5)).toBe("10′ × 5.0′");
  });
});

describe("formatHour", () => {
  it("uses a 12 hour clock", () => {
    expect(formatHour(0)).toBe("12 AM");
    expect(formatHour(12)).toBe("12 PM");
    expect(formatHour(22)).toBe("10 PM");
  });
});

describe("difficulty", () => {
  it("maps scores to plain words", () => {
    expect(difficulty(80).label).toBe("Excellent");
    expect(difficulty(20).label).toBe("Moderate");
    expect(difficulty(5).label).toBe("Very hard");
    expect(difficulty(0).label).toBe("Extreme");
  });
});
