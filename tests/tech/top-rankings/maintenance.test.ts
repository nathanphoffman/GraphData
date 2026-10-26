import { describe, expect, it } from "vitest";
import { maintenance, maintenancePercent, nFactor } from "../../../src/charts/tech/top-rankings/maintenance";

const columns = [{ label: "Completed Lines" }, { label: "Familiarity" }, { label: "Computed Quality" }];

describe("nFactor", () => {
  it("solves n^n = total", () => {
    expect(nFactor(27)).toBeCloseTo(3, 6);
    expect(nFactor(3125)).toBeCloseTo(5, 6);
  });

  it("is 1 for a total of 1 or less", () => {
    expect(nFactor(0)).toBe(1);
  });
});

describe("maintenance", () => {
  it("weights quality by lines", () => {
    const items = [...Array(10)].map((_, i) => ({ name: `s${i}`, values: [500, 50, 50] }));
    items.push({ name: "big", values: [5000, 100, 100] });
    expect(maintenance({ id: "x", title: "x", columns, items })?.averageQuality).toBe(75);
  });

  it("averages familiarity with computed quality, or uses whichever one a project has", () => {
    const items = [{ name: "a", values: [10, 60, 80] }, { name: "b", values: [10, null, 90] }];
    expect(maintenance({ id: "x", title: "x", columns, items })?.averageQuality).toBe(80);
  });

  it("subtracts (quality - 75) / 100 from the n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns, items: [{ name: "a", values: [27, 100, 100] }] });
    expect(result?.gradedNFactor).toBeCloseTo(3 - 0.25, 6);
  });

  it("is null without the columns", () => {
    expect(maintenance({ id: "x", title: "x", columns: [{ label: "A" }], items: [] })).toBeNull();
  });
});

describe("maintenance growth", () => {
  it("multiplies each project's lines by its xLines for the future n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 75, 75, 3] }] });
    expect(result?.futureLines).toBe(27);
    expect(result?.gradedFutureNFactor).toBeCloseTo(3, 6);
  });
});

describe("maintenancePercent", () => {
  it("follows the marks closely and falls as the n-factor rises", () => {
    for (const [n, percent] of [[1, 100], [6, 95], [6.75, 85], [7, 65], [8, 5], [10, 0]]) {
      expect(Math.abs(maintenancePercent(n) - percent)).toBeLessThan(5);
    }
    expect(maintenancePercent(7.5)).toBeLessThan(maintenancePercent(7));
  });
});

describe("equivalentLines", () => {
  it("is the combined n-factor raised to itself", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 75, 75, 3] }] });
    expect(result?.equivalentLines).toBeCloseTo((result?.combinedNFactor ?? 0) ** (result?.combinedNFactor ?? 0), 6);
  });

  it("ignores quality", () => {
    const at = (quality: number) => maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, quality, quality, 3] }] });
    expect(at(100)?.equivalentLines).toBeCloseTo(at(75)?.equivalentLines ?? 0, 6);
    expect(at(100)?.manualLines).toBeCloseTo(at(75)?.manualLines ?? 0, 6);
  });
});

describe("manualLines", () => {
  it("is the combined n-factor minus 0.66, raised to itself", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 75, 75, 3] }] });
    const n = (result?.combinedNFactor ?? 0) - 0.66;
    expect(result?.manualLines).toBeCloseTo(n ** n, 6);
  });
});
