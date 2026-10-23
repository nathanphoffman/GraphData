import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "./calculate";
import { parseHidden, parseSeasonFilter, parseSettings } from "./storage";

describe("parseSettings", () => {
  it("rejects anything that is not an object", () => {
    expect(parseSettings(null)).toBeNull();
    expect(parseSettings("settings")).toBeNull();
  });

  it("fills a missing save with the defaults", () => {
    expect(parseSettings({})).toEqual({ ...DEFAULT_SETTINGS, preset: "" });
  });

  it("keeps valid values and rounds the bortle to half steps", () => {
    const parsed = parseSettings({ latitude: 51.5, bortle: 6.3, focalLength: "small", manual: true });

    expect(parsed?.latitude).toBe(51.5);
    expect(parsed?.bortle).toBe(6.5);
    expect(parsed?.focalLength).toBe("small");
    expect(parsed?.manual).toBe(true);
  });

  it("replaces out-of-range or wrongly typed values with the defaults", () => {
    const parsed = parseSettings({ latitude: 200, bortle: "dark", aperture: "gigantic", preset: "nope" });

    expect(parsed?.latitude).toBe(DEFAULT_SETTINGS.latitude);
    expect(parsed?.bortle).toBe(DEFAULT_SETTINGS.bortle);
    expect(parsed?.aperture).toBe(DEFAULT_SETTINGS.aperture);
    expect(parsed?.preset).toBe("");
  });

  it("maps the old focal length names to the current ones", () => {
    expect(parseSettings({ focalLength: "medium-long" })?.focalLength).toBe("medium-large");
    expect(parseSettings({ focalLength: "long" })?.focalLength).toBe("large");
  });
});

describe("parseHidden", () => {
  it("keeps only known column ids", () => {
    expect(parseHidden(["not-a-column"])).toEqual([]);
    expect(parseHidden("nope")).toBeNull();
  });
});

describe("parseSeasonFilter", () => {
  it("accepts seasons and any, and nothing else", () => {
    expect(parseSeasonFilter("winter")).toBe("winter");
    expect(parseSeasonFilter("any")).toBe("any");
    expect(parseSeasonFilter("monsoon")).toBeNull();
  });
});
