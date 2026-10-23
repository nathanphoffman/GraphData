import { describe, expect, it } from "vitest";
import { band, deltaBand } from "../../../src/charts/science/weight-journey/model/bands";
import { KG_PER_LB } from "../../../src/charts/science/weight-journey/model/units";

const lb = (kg: number) => kg / KG_PER_LB;

describe("band", () => {
  it("colours by kg range", () => {
    expect(band(lb(80), false)).toBe("band-violet");
    expect(band(lb(87), false)).toBe("band-green");
    expect(band(lb(92), false)).toBe("band-blue");
    expect(band(lb(105), false)).toBe("band-yellow");
    expect(band(lb(120), false)).toBe("band-red");
  });

  it("adds 5 kg back for muscle-adjusted values", () => {
    expect(band(lb(80), true)).toBe("band-green");
  });

  it("has no colour without a value", () => {
    expect(band(null, false)).toBe("");
  });
});

describe("deltaBand", () => {
  it("highlights fast loss, ideal loss, slow loss and gain", () => {
    expect(deltaBand(lb(-4))).toBe("band-orange");
    expect(deltaBand(lb(-1))).toBe("band-blue");
    expect(deltaBand(lb(-2.5))).toBe("band-green");
    expect(deltaBand(lb(0.5))).toBe("band-yellow");
    expect(deltaBand(lb(2))).toBe("band-red");
    expect(deltaBand(null)).toBe("");
  });
});
