import { describe, expect, it } from "vitest";
import {
  addBloodPressure,
  healthOf,
  type Pressure_Reading,
} from "../../../src/charts/science/weight-journey/model/bloodPressure";

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
  it("averages the pressure score with the weight WMA and takes off the muscle", () => {
    const [{ pressure }] = addBloodPressure([day("2024-01-01")], READINGS);

    // ((135 - 85) * 0.5 + 135 + 85 + 250) / 2 - 10 = 237.5
    expect(healthOf(250, 10, pressure)).toBeCloseTo(237.5);
    expect(healthOf(250, 10, null)).toBeNull();
    expect(healthOf(null, 10, pressure)).toBeNull();
  });
});
