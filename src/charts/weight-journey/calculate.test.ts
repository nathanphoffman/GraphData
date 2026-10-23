import { describe, expect, it } from "vitest";
import { fillDays, project } from "./calculate";

describe("fillDays", () => {
  it("fills gaps in a straight line and marks them estimated", () => {
    const days = fillDays([["2024-01-01", 100], ["2024-01-04", 94]]);

    expect(days.map((d) => d.date)).toEqual(["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"]);
    expect(days.map((d) => d.weight)).toEqual([100, 98, 96, 94]);
    expect(days.map((d) => d.estimated)).toEqual([false, true, true, false]);
  });

  it("returns nothing for no weigh-ins", () => {
    expect(fillDays([])).toEqual([]);
  });
});

describe("project", () => {
  it("continues a straight line downward", () => {
    const days = fillDays([["2024-01-01", 100], ["2024-01-11", 90]]);
    const { future } = project(days, 11, 3);

    expect(future).toHaveLength(3);
    expect(future[0].weight).toBeCloseTo(89, 1);
    expect(future[2].weight).toBeCloseTo(87, 1);
  });
});
