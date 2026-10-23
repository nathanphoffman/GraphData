import { describe, expect, it } from "vitest";
import { estimateScore, knownScore } from "../../../src/charts/science/all-intelligence/calculate";
import type { AllIntelligenceData, Subject } from "../../../src/charts/science/all-intelligence/types";

const subject = (scores: Record<string, number>, outputPrice?: number) => ({ scores, outputPrice }) as unknown as Subject;
const data = (estimateFactors: Record<string, number>) => ({ estimateFactors }) as unknown as AllIntelligenceData;

describe("knownScore", () => {
  it("returns a real score when there is one", () => {
    expect(knownScore(subject({ math: 80 }), "math")).toBe(80);
  });

  it("is undefined for a missing score", () => {
    expect(knownScore(subject({}), "math")).toBeUndefined();
  });

  it("falls back to a price-based guess for efficiency", () => {
    expect(knownScore(subject({}, 1), "efficiency")).toBeCloseTo(60);
    expect(knownScore(subject({}), "efficiency")).toBeUndefined();
  });
});

describe("estimateScore", () => {
  it("uses the geometric mean of known scores times the column factor", () => {
    expect(estimateScore(data({ art: 2 }), subject({ a: 4, b: 16 }), "art")).toBeCloseTo(16);
  });

  it("caps at 100 and never guesses efficiency", () => {
    expect(estimateScore(data({ art: 20 }), subject({ a: 50 }), "art")).toBe(100);
    expect(estimateScore(data({}), subject({ a: 50 }), "efficiency")).toBeNull();
  });

  it("gives up when nothing is measured", () => {
    expect(estimateScore(data({}), subject({}), "art")).toBeNull();
  });
});
