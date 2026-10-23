import { describe, expect, it } from "vitest";
import { addAverages, addMuscle, projectTapering, taperToTotal } from "../../../src/charts/science/weight-journey/calculate";
import { buildAllTrend, buildSpread, taperCurve } from "../../../src/charts/science/weight-journey/model/curves";
import type { Row } from "../../../src/charts/science/weight-journey/model/rows";

describe("addAverages", () => {
  const days = [10, 20, 30].map((weight, index) => ({ date: `2024-01-0${index + 1}`, weight, estimated: false }));
  const windows = { short: 2, medium: 3, long: 3 };

  it("averages the day itself and the days before it", () => {
    const result = addAverages(days, windows);

    expect(result.map((d) => d.avg3)).toEqual([10, 15, 25]);
    expect(result.map((d) => d.avg30)).toEqual([10, 15, 20]);
  });

  it("has no monthly change until a full medium window has passed", () => {
    const result = addAverages(days, windows);

    expect(result.every((d) => d.monthly === null)).toBe(true);
  });
});

describe("addMuscle", () => {
  const dates = ["2024-06-18", "2024-06-19", "2024-06-20", "2024-06-21", "2024-06-22", "2024-06-23"];
  const result = addMuscle(dates.map((date) => ({ date, weight: 200, estimated: false })));

  it("gains nothing before the start date", () => {
    expect(result[0].muscleTotal).toBe(0);
    expect(result[1].muscleTotal).toBe(0);
  });

  it("adds up to the full total by the last day, with gains that taper off", () => {
    expect(result[result.length - 1].muscleTotal).toBeCloseTo(14.5);
    expect(result.reduce((total, d) => total + d.muscleDaily, 0)).toBeCloseTo(14.5);
    expect(result[3].muscleDaily).toBeGreaterThan(result[5].muscleDaily);
  });
});

describe("taperToTotal", () => {
  it("loses a twelfth of the total in the first month and gets close to the full total eventually", () => {
    const curve = taperToTotal("2024-01-01", 100, 12, 30);

    expect(curve).toHaveLength(30);
    expect(curve[0].date).toBe("2024-01-02");
    expect(curve[29].weight).toBeCloseTo(99, 1);
  });

  it("never drops below start minus the total", () => {
    const curve = taperToTotal("2024-01-01", 100, 12, 3650);

    expect(curve[curve.length - 1].weight).toBeGreaterThanOrEqual(88);
  });
});

describe("projectTapering", () => {
  it("loses about a month's loss over the first month and tracks muscle separately", () => {
    const points = projectTapering("2024-01-01", 200, 0, 3, 0.1, 30);

    expect(points[29].weight).toBeCloseTo(197.1, 0);
    expect(points[29].adjusted).toBeLessThan(points[29].weight);
  });
});

describe("taperCurve", () => {
  it("starts on the start weight and then follows the taper", () => {
    const curve = taperCurve("2024-01-01", 100, 88, 3);

    expect(curve[0]).toEqual({ date: "2024-01-01", weight: 100 });
    expect(curve).toHaveLength(4);
  });
});

const row = (day: number, avg3: number, allProj3: number | null) =>
  ({ date: `2024-01-${String(day).padStart(2, "0")}`, avg3, allProj3, allProj3Adj: allProj3, adj: { avg3 } }) as unknown as Row;

describe("buildAllTrend", () => {
  it("is null when no row has a projection yet", () => {
    expect(buildAllTrend([row(1, 100, null)], 10)).toBeNull();
    expect(buildAllTrend([], 10)).toBeNull();
  });

  it("builds up to three trend lines, newest first", () => {
    const rows = [row(1, 100, 90), row(2, 100, 90), row(3, 100, 90), row(4, 100, 90)];
    const result = buildAllTrend(rows, 10);

    expect(result?.trends.map((trend) => trend.back)).toEqual([0, 1, 2]);
  });
});

describe("buildSpread", () => {
  it("needs at least two rows with projections", () => {
    expect(buildSpread([row(1, 100, 90)], 10)).toBeNull();
  });

  it("sorts curves from lowest target to highest", () => {
    const result = buildSpread([row(1, 100, 95), row(2, 100, 85), row(3, 100, 90)], 10);

    expect(result?.actual.curves.map((curve) => curve.target)).toEqual([85, 90, 95]);
  });
});
