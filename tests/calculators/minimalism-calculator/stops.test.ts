import { describe, expect, it } from "vitest";
import { capitalize, DEFAULT_ITEM_TYPE, findItemType, ITEM_TYPES } from "../../../src/charts/calculators/minimalism-calculator/logic/items";
import { OWNED_STOPS, PER_YEAR_BENCHMARKS, PER_YEAR_STOPS } from "../../../src/charts/calculators/minimalism-calculator/logic/stops";

const strictlyIncreasing = (list: number[]) => list.every((value, index) => index === 0 || value > list[index - 1]);

describe("slider stops", () => {
  it("only go up, with no repeats or floating point noise", () => {
    expect(strictlyIncreasing(PER_YEAR_STOPS)).toBe(true);
    expect(strictlyIncreasing(OWNED_STOPS)).toBe(true);
    expect(PER_YEAR_STOPS.every((value) => Number(value.toFixed(1)) === value)).toBe(true);
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
    const itemTypeIds = ITEM_TYPES.map((itemType) => itemType.id);

    expect(new Set(itemTypeIds).size).toBe(itemTypeIds.length);
    expect(findItemType(DEFAULT_ITEM_TYPE.id)).toBe(DEFAULT_ITEM_TYPE);
  });

  it("are not found for unknown ids", () => {
    expect(findItemType("nope")).toBeUndefined();
  });
});

describe("cap", () => {
  it("upper-cases only the first letter", () => {
    expect(capitalize("board games")).toBe("Board games");
    expect(capitalize("")).toBe("");
  });
});
