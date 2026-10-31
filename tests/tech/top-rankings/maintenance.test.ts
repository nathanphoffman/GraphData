import { describe, expect, it } from "vitest";
import { DEFAULT_AI_USE, maintenance, nFactor, withQuality, withScaffolding } from "../../../src/charts/tech/top-rankings/maintenance";

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
    expect(result?.current.graded).toBeCloseTo(3 - 0.25, 6);
  });

  it("is null without the columns", () => {
    expect(maintenance({ id: "x", title: "x", columns: [{ label: "A" }], items: [] }, AI_USE)).toBeNull();
  });
});

describe("maintenance growth", () => {
  it("multiplies each project's lines by its xLines for the future n-factor", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
        expect(result?.future.graded).toBeCloseTo(3, 6);
  });
});

describe("decommissioned projects", () => {
  const withDecom = [...columns, { label: "xLines" }, { label: "Decommissioned" }];

  it("count at 1/6 of their lines in all three n-factors", () => {
    const result = maintenance({ id: "x", title: "x", columns: withDecom, items: [{ name: "a", values: [9, 4, 75, 3, 0] }, { name: "b", values: [60, 4, 75, 2, 1] }] }, AI_USE);
    // 9 + 60/6 = 19 lines now, 27 + 120/6 = 47 after growth.
    expect(result?.current.graded).toBeCloseTo(nFactor(19), 6);
    expect(result?.future.graded).toBeCloseTo(nFactor(47), 6);
    expect(result?.current.decommissionedLines).toBe(60);
    expect(result?.future.decommissionedLines).toBe(120);
    expect(result?.projected.decommissionedLines).toBeCloseTo(60 * 0.25 + 120 * 0.75, 6);
  });

  it("projected is 25% current and 75% future", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
    expect(result?.projected.graded).toBeCloseTo((result?.current.graded ?? 0) * 0.25 + (result?.future.graded ?? 0) * 0.75, 6);
  });
});

describe("lines equivalents", () => {
  it("are the n-factor raised to itself, and with the AI use taken off first for manual", () => {
    const result = maintenance({ id: "x", title: "x", columns: [...columns, { label: "xLines" }], items: [{ name: "a", values: [9, 4, 75, 3] }] }, AI_USE);
    const n = result?.projected.graded ?? 0;
    expect(result?.projected.equivalentLines).toBeCloseTo(n ** n, 6);
    expect(result?.projected.manualLines).toBeCloseTo((n - 0.75) ** (n - 0.75), 6);
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
