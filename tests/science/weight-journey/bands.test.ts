import { describe, expect, it } from "vitest";
import { band, deltaBand } from "../../../src/charts/science/weight-journey/model/bands";
import { KG_PER_LB } from "../../../src/charts/science/weight-journey/model/units";

const pounds = (kilograms: number) => kilograms / KG_PER_LB;

describe("band", () => {
  it("colours by kg range", () => {
    expect(band(pounds(80), false)).toBe("band-violet");
    expect(band(pounds(87), false)).toBe("band-green");
    expect(band(pounds(92), false)).toBe("band-blue");
    expect(band(pounds(105), false)).toBe("band-yellow");
    expect(band(pounds(120), false)).toBe("band-red");
  });

  it("adds 5 kg back for muscle-adjusted values", () => {
    expect(band(pounds(80), true)).toBe("band-green");
  });

  it("has no colour without a value", () => {
    expect(band(null, false)).toBe("");
  });
});

describe("deltaBand", () => {
  it("highlights fast loss, ideal loss, slow loss and gain", () => {
    expect(deltaBand(pounds(-4))).toBe("band-orange");
    expect(deltaBand(pounds(-1))).toBe("band-blue");
    expect(deltaBand(pounds(-2.5))).toBe("band-green");
    expect(deltaBand(pounds(0.5))).toBe("band-yellow");
    expect(deltaBand(pounds(2))).toBe("band-red");
    expect(deltaBand(null)).toBe("");
  });
});
