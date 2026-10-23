import { describe, expect, it } from "vitest";
import { cap, DEFAULT_ITEM_TYPE, findItemType, ITEM_TYPES } from "../../../src/charts/calculators/minimalism-calculator/logic/items";
import { OWNED_STOPS, PER_YEAR_BENCHMARKS, PER_YEAR_STOPS } from "../../../src/charts/calculators/minimalism-calculator/logic/stops";

const strictlyIncreasing = (list: number[]) => list.every((v, i) => i === 0 || v > list[i - 1]);

describe("slider stops", () => {
  it("only go up, with no repeats or floating point noise", () => {
    expect(strictlyIncreasing(PER_YEAR_STOPS)).toBe(true);
    expect(strictlyIncreasing(OWNED_STOPS)).toBe(true);
    expect(PER_YEAR_STOPS.every((v) => Number(v.toFixed(1)) === v)).toBe(true);
  });

  it("cover the full ranges", () => {
    expect(PER_YEAR_STOPS[0]).toBe(0.1);
    expect(PER_YEAR_STOPS[PER_YEAR_STOPS.length - 1]).toBe(365);
    expect(OWNED_STOPS[0]).toBe(1);
    expect(OWNED_STOPS[OWNED_STOPS.length - 1]).toBe(1000);
  });

  it("include every familiar frequency so the benchmark names can show", () => {
    for (const value of Object.keys(PER_YEAR_BENCHMARKS)) expect(PER_YEAR_STOPS).toContain(Number(value));
  });
});

describe("item types", () => {
  it("have unique ids and a usable default", () => {
    const ids = ITEM_TYPES.map((t) => t.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(findItemType(DEFAULT_ITEM_TYPE.id)).toBe(DEFAULT_ITEM_TYPE);
  });

  it("are not found for unknown ids", () => {
    expect(findItemType("nope")).toBeUndefined();
  });
});

describe("cap", () => {
  it("upper-cases only the first letter", () => {
    expect(cap("board games")).toBe("Board games");
    expect(cap("")).toBe("");
  });
});
