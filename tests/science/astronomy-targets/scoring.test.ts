import { describe, expect, it } from "vitest";
import data from "../../../data/astronomy/astronomy-targets.json";
import {
  DEFAULT_SETTINGS,
  PRESETS,
  buildSchedule,
  effectiveQuality,
  isNakedEye,
  optics,
  scopeFocalLength,
  scoreTargets,
  WINDOW_HOURS,
} from "../../../src/charts/science/astronomy-targets/model/calculate";

import type { AstronomyTargetsData, Settings, Target } from "../../../src/charts/science/astronomy-targets/model/types";

const targets = (data as AstronomyTargetsData).targets;
const settings: Settings = { ...DEFAULT_SETTINGS, preset: "" };

describe("optics", () => {
  it("uses a preset's aperture and focal length when one is chosen", () => {
    const result = optics({ ...settings, preset: "ed80cf" });

    expect(result.mm).toBe(PRESETS.ed80cf.mm);
    expect(scopeFocalLength({ ...settings, preset: "ed80cf" })).toBe(PRESETS.ed80cf.focalMm);
  });

  it("converts a manual telescope from inches to mm", () => {
    expect(optics({ ...settings, manual: true, apertureIn: 8 }).mm).toBeCloseTo(203.2);
  });

  it("uses the size classes otherwise", () => {
    expect(optics({ ...settings, focalLength: "huge", aperture: "tiny" })).toEqual({ fov: 18, mm: 40 });
  });

  it("gives a narrower field for a longer focal length", () => {
    const manual = { ...settings, manual: true };

    expect(optics({ ...manual, scopeFocalMm: 2000 }).fov).toBeLessThan(optics({ ...manual, scopeFocalMm: 500 }).fov);
  });
});

describe("effectiveQuality", () => {
  it("prefers a preset's quality over the slider", () => {
    expect(effectiveQuality({ ...settings, preset: "astroscan", opticalQuality: 90 })).toBe(PRESETS.astroscan.quality);
    expect(effectiveQuality({ ...settings, opticalQuality: 90 })).toBe(90);
  });
});

describe("isNakedEye", () => {
  const star = (magnitude: number): Target => ({ type: "Star", magnitude }) as Target;

  it("needs a star well above the faintest visible one", () => {
    expect(isNakedEye(star(2), 1)).toBe(true);
    expect(isNakedEye(star(6.5), 1)).toBe(false);
  });

  it("gets harder under brighter skies", () => {
    expect(isNakedEye(star(5.5), 1)).toBe(true);
    expect(isNakedEye(star(5.5), 9)).toBe(false);
  });

  it("never applies to things that are not stars", () => {
    expect(isNakedEye({ type: "Galaxy", magnitude: 1 } as Target, 1)).toBe(false);
  });
});

describe("scoreTargets", () => {
  const rows = scoreTargets(targets, settings);

  it("scores every target with a finite number of at most 100 (faint ones can go slightly negative)", () => {
    expect(rows).toHaveLength(targets.length);

    for (const scoredTarget of rows) {
      expect(Number.isFinite(scoredTarget.score)).toBe(true);
      expect(scoredTarget.score).toBeLessThanOrEqual(100);
    }
  });

  it("sorts best first", () => {
    const scores = rows.map((scoredTarget) => scoredTarget.score);

    expect(scores).toEqual([...scores].sort((first, second) => second - first));
  });

  it("scores the same targets lower under a brighter sky", () => {
    const city = scoreTargets(targets, { ...settings, bortle: 9 });

    const total = (list: typeof rows) => list.reduce((total, scoredTarget) => total + scoredTarget.score, 0);

    expect(total(city)).toBeLessThan(total(rows));
  });
});

describe("buildSchedule", () => {
  const rows = scoreTargets(targets, settings);
  const schedule = buildSchedule(rows, "autumn", settings);

  it("only lists targets from the chosen season, with stars kept in their own list", () => {
    const listed = schedule.slots.flatMap((scheduleSlot) => Object.values(scheduleSlot.items).flat());

    expect(listed.every((scheduleItem) => scheduleItem.row.target.bestSeason === "autumn" && scheduleItem.row.target.type !== "Star")).toBe(true);
    expect(schedule.stars.every((scoredTarget) => scoredTarget.target.type === "Star")).toBe(true);
  });

  it("groups slots on window boundaries, in evening-first order", () => {
    expect(schedule.slots.every((scheduleSlot) => scheduleSlot.hour % WINDOW_HOURS === 0)).toBe(true);

    const evening = (height: number) => (height < 10 ? height + 24 : height);
    const hours = schedule.slots.map((scheduleSlot) => evening(scheduleSlot.hour));

    expect(hours).toEqual([...hours].sort((first, second) => first - second));
  });

  it("keeps each slot within its list limits", () => {
    for (const slot of schedule.slots) {
      expect(slot.items.easy.length).toBeLessThanOrEqual(6);
      expect(slot.items.moderate.length).toBeLessThanOrEqual(4);
      expect(slot.items.hard.length).toBeLessThanOrEqual(3);
    }
  });
});
