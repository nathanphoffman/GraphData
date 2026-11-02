import { describe, expect, it } from "vitest";
import {
  averageNetN,
  burdenScore,
  formatTechLines,
  netN,
  parseTechLines,
} from "../../../src/charts/tech/top-rankings/languageBurden";

import { maintenance, nFactor } from "../../../src/charts/tech/top-rankings/maintenance";

describe("burdenScore", () => {
  it("raises each burden to (sensitivity + unfamiliarity) and multiplies them", () => {
    // Deor: 1 x 1 x 1.33^(0.7 + 0.1)
    expect(burdenScore("Deor")).toBeCloseTo(1.33 ** 0.8, 9);
  });

  it("is null for a language that is not rated", () => {
    expect(burdenScore("Zig")).toBeNull();
  });
});

describe("netN", () => {
  it("is quality over the burden score, minus 0.25", () => {
    expect(netN("Deor", 0.75)).toBeCloseTo(0.75 / 1.33 ** 0.8 - 0.25, 9);
  });
});

describe("tech lines text", () => {
  it("round-trips, biggest first", () => {
    expect(formatTechLines({ Rust: 5, Deor: 10 })).toBe("Deor 10, Rust 5");
    expect(parseTechLines("Deor 10, Rust 5")).toEqual({ Deor: 10, Rust: 5 });
  });

  it("ignores anything that is not text like that", () => {
    expect(parseTechLines(null)).toEqual({});
    expect(parseTechLines("Rust, nonsense")).toEqual({});
  });
});

describe("averageNetN", () => {
  it("averages by lines and skips unrated languages", () => {
    const [deor, rust] = [netN("Deor", 0.8) as number, netN("Rust", 0.8) as number];
    expect(averageNetN({ Deor: 100, Rust: 300, Zig: 5000 }, 0.8)).toBeCloseTo((deor * 100 + rust * 300) / 400, 9);
    expect(averageNetN({ Zig: 5 }, 0.8)).toBeNull();
  });
});

describe("maintenance with Tech Lines", () => {
  const columns = [{ label: "Completed Lines" }, { label: "Computed Quality" }, { label: "Tech Lines" }];

  it("subtracts the lines-weighted language adjustment from the n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns, items: [{ name: "a", values: [27, 80, "Deor 1"] }] });
    const adjustment = netN("Deor", 0.8) as number;

    expect(result?.adjustment).toBeCloseTo(adjustment, 9);
    expect(result?.current.graded).toBeCloseTo(nFactor(27) - adjustment, 9);
  });
});
