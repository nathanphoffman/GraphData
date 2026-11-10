import { describe, expect, it } from "vitest";
import {
  addBloodPressure,
  healthOf,
  type Pressure_Reading,
} from "../../../src/charts/weight-journey/model/bloodPressure";

const READINGS: Pressure_Reading[] = [
  ["2024-01-01", 140, 90, 130, 80],
  ["2024-01-05", 120, 70, 110, 60],
];

const day = (date: string) => ({ date });

describe("addBloodPressure", () => {
  it("has no pressure before the first reading", () => {
    expect(addBloodPressure([day("2023-12-31")], READINGS)[0].pressure).toBeNull();
  });

  it("uses the readings on their own day", () => {
    const [{ pressure }] = addBloodPressure([day("2024-01-01")], READINGS);

    expect(pressure).toMatchObject({ firstTop: 140, avgTop: 135, avgBottom: 85, pressureEstimated: false });
  });

  it("estimates the days between readings in a straight line", () => {
    const [{ pressure }] = addBloodPressure([day("2024-01-03")], READINGS);

    expect(pressure).toMatchObject({ firstTop: 130, firstBottom: 80, secondTop: 120, secondBottom: 70, avgTop: 125 });
    expect(pressure?.pressureEstimated).toBe(true);
  });

  it("carries the last reading forward", () => {
    const [{ pressure }] = addBloodPressure([day("2024-02-01")], READINGS);

    expect(pressure).toMatchObject({ firstTop: 120, avgBottom: 65, pressureEstimated: true });
  });

  it("has no pressure without readings", () => {
    expect(addBloodPressure([day("2024-01-01")], [])[0].pressure).toBeNull();
  });
});

describe("healthOf", () => {
  it("averages the pressure score with the weight WMA, takes off the muscle and adds both weight losses", () => {
    const [{ pressure }] = addBloodPressure([day("2024-01-01")], READINGS);
    const inputs = { weightWma: 250, muscleTotal: 10, pressure, recentWma: 1, recent: 2 };

    // ((135 - 85) * 0.5 + 135 + 85 + 250) / 2 - 10 + 1 + 2 = 240.5
    expect(healthOf(inputs)).toBeCloseTo(240.5);
  });

  it("is null when the pressure, the weight WMA or either weight loss is missing", () => {
    const [{ pressure }] = addBloodPressure([day("2024-01-01")], READINGS);
    const inputs = { weightWma: 250, muscleTotal: 10, pressure, recentWma: 1, recent: 2 };

    expect(healthOf({ ...inputs, pressure: null })).toBeNull();
    expect(healthOf({ ...inputs, weightWma: null })).toBeNull();
    expect(healthOf({ ...inputs, recentWma: null })).toBeNull();
    expect(healthOf({ ...inputs, recent: null })).toBeNull();
  });
});
