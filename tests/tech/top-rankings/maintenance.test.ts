import { describe, expect, it } from "vitest";
import { DEFAULT_AI_USE, maintenance, maintenancePercent, nFactor, withQuality, withScaffolding } from "../../../src/charts/tech/top-rankings/maintenance";

const AI_USE = DEFAULT_AI_USE;
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
    const items = [...Array(10)].map((_, index) => ({ name: `s${index}`, values: [500, 3, 50] }));
    items.push({ name: "big", values: [5000, 5, 100] });
    expect(maintenance({ id: "x", title: "x", columns, items }, AI_USE)?.averageQuality).toBe(75);
  });

  it("averages familiarity with computed quality, or uses whichever one a project has", () => {
    const items = [{ name: "a", values: [10, 3, 90] }, { name: "b", values: [10, null, 90] }];
    expect(maintenance({ id: "x", title: "x", columns, items }, AI_USE)?.averageQuality).toBe(80);
  });

  it("subtracts (quality - 75) / 100 from the n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns, items: [{ name: "a", values: [27, 5, 100] }] }, AI_USE);
    expect(result?.gradedNFactor).toBeCloseTo(3 - 0.25, 6);
  });

  it("is null without the columns", () => {
    expect(maintenance({ id: "x", title: "x", columns: [{ label: "A" }], items: [] }, AI_USE)).toBeNull();
  });
});

describe("maintenance growth", () => {
  it("multiplies each project's lines by its xLines for the future n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
    expect(result?.futureLines).toBe(27);
    expect(result?.gradedFutureNFactor).toBeCloseTo(3, 6);
  });
});

describe("maintenancePercent", () => {
  it("is 100% up to a manual n-factor of 5, and 0% from 10", () => {
    expect(maintenancePercent(5.75, 0.75)).toBeCloseTo(100, 6);
    expect(maintenancePercent(1, 0.75)).toBe(100);
    expect(maintenancePercent(10.75, 0.75)).toBeCloseTo(0, 6);
    expect(maintenancePercent(12, 0.75)).toBe(0);
  });

  it("falls in a straight line between them", () => {
    expect(maintenancePercent(7.75, 0.75)).toBeCloseTo(60, 6);
    expect(maintenancePercent(6.924, 0.75)).toBeCloseTo(76.5, 1);
  });

  it("moves with the extent of AI use", () => {
    expect(maintenancePercent(7, 0)).toBeCloseTo(60, 6);
    expect(maintenancePercent(7, 1)).toBeGreaterThan(maintenancePercent(7, 0.75));
  });
});

describe("equivalentLines", () => {
  it("is the combined n-factor raised to itself", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
    expect(result?.equivalentLines).toBeCloseTo((result?.combinedNFactor ?? 0) ** (result?.combinedNFactor ?? 0), 6);
  });

  it("ignores quality", () => {
    const maintenanceAt = (quality: number) => maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, quality / 25 + 1, quality, 3] }] }, AI_USE);
    expect(maintenanceAt(100)?.equivalentLines).toBeCloseTo(maintenanceAt(75)?.equivalentLines ?? 0, 6);
    expect(maintenanceAt(100)?.manualLines).toBeCloseTo(maintenanceAt(75)?.manualLines ?? 0, 6);
  });
});

describe("manualLines", () => {
  it("is the combined n-factor minus the AI use, raised to itself", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
    const adjusted = (result?.combinedNFactor ?? 0) - 0.75;
    expect(result?.manualLines).toBeCloseTo(adjusted ** adjusted, 6);
    const none = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, 0);
    expect(none?.manualLines).toBeCloseTo(none?.equivalentLines ?? 0, 6);
  });
});

describe("withQuality", () => {
  it("sets Quality to the average of familiarity and computed quality", () => {
    const ranking = { id: "x", title: "x", columns: [{ label: "Familiarity" }, { label: "Computed Quality" }, { label: "Quality" }], items: [{ name: "a", values: [4, 91, 0] }] };
    expect(withQuality(ranking).items[0].values).toEqual([4, 91, 83]);
  });
});

describe("withScaffolding", () => {
  it("adds 256 to each project's Completed Lines and leaves other columns alone", () => {
    const ranking = { id: "x", title: "x", columns: [{ label: "Completed Lines" }, { label: "Other" }], items: [{ name: "a", values: [100, 5] }, { name: "b", values: [null, 5] }] };
    const result = withScaffolding(ranking);
    expect(result.items.map((item) => item.values)).toEqual([[356, 5], [null, 5]]);
    expect(ranking.items[0].values[0]).toBe(100);
  });
});
