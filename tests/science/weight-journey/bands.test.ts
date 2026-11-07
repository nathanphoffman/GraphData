import { describe, expect, it } from "vitest";
import { averageTint, band, deltaBand, healthBand, PALETTE } from "../../../src/charts/science/weight-journey/model/bands";
import { KG_PER_LB } from "../../../src/charts/science/weight-journey/model/units";

const pounds = (kilograms: number) => kilograms / KG_PER_LB;

describe("band", () => {
  it("hits the palette colours at the stops", () => {
    expect(band(pounds(92.5), false)).toEqual(PALETTE.blue);
    expect(band(pounds(105), false)).toEqual(PALETTE.yellow);
    expect(band(pounds(120), false)).toEqual(PALETTE.red);
  });

  it("blends between stops", () => {
    const [red, green, blue] = band(pounds(107.5), false) ?? [];

    // Halfway from yellow to orange.
    expect(red).toBe(Math.round((0xf2 + 0xf4) / 2));
    expect(green).toBe(Math.round((0xd9 + 0xa2) / 2));
    expect(blue).toBe(Math.round((0x5c + 0x59) / 2));
  });

  it("stays at the deep colours past either end", () => {
    expect(band(pounds(60), false)).toEqual(PALETTE.deepViolet);
    expect(band(pounds(150), false)).toEqual(PALETTE.deepRed);
  });

  it("adds 5 kg back for muscle-adjusted values", () => {
    expect(band(pounds(87.5), true)).toEqual(PALETTE.blue);
  });

  it("has no colour without a value", () => {
    expect(band(null, false)).toBeNull();
  });
});

describe("deltaBand", () => {
  it("is blue at the ideal loss, red for a fast loss, deep red for a big gain", () => {
    expect(deltaBand(pounds(-1))).toEqual(PALETTE.blue);
    expect(deltaBand(pounds(-6))).toEqual(PALETTE.red);
    expect(deltaBand(pounds(4))).toEqual(PALETTE.deepRed);
    expect(deltaBand(null)).toBeNull();
  });
});

describe("healthBand", () => {
  it("is blue, green, yellow, orange then red as Health rises", () => {
    expect(healthBand(195)).toEqual(PALETTE.blue);
    expect(healthBand(210)).toEqual(PALETTE.green);
    expect(healthBand(230)).toEqual(PALETTE.yellow);
    expect(healthBand(240)).toEqual(PALETTE.orange);
    expect(healthBand(250)).toEqual(PALETTE.red);
    expect(healthBand(null)).toBeNull();
  });
});

describe("averageTint", () => {
  it("averages the colours it is given and skips missing ones", () => {
    expect(averageTint([[0, 0, 0], null, [100, 50, 10]], 1)).toBe("rgba(50, 25, 5, 1)");
    expect(averageTint([null])).toBeUndefined();
  });
});
