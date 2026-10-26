import { describe, expect, it } from "vitest";
import data from "../../../data/economic-systems/economic-systems-map.json";
import { GRID_H, GRID_X0, GRID_Y0, cellNameWidth, fixedObstacles, labelWidth, placeLabels, xToPixels, yToPixels } from "../../../src/charts/tech/economic-systems-map/model/layout";
import type { EconomicSystemsData, Figure } from "../../../src/charts/tech/economic-systems-map/model/types";

const model = data as unknown as EconomicSystemsData;

describe("unit conversion", () => {
  it("puts x 0 on the left edge and y 0 on the bottom edge", () => {
    expect(xToPixels(0)).toBe(GRID_X0);
    expect(yToPixels(0)).toBe(GRID_Y0 + GRID_H);
    expect(yToPixels(3)).toBe(GRID_Y0);
  });

  it("makes longer text wider", () => {
    expect(labelWidth("abcdef")).toBeGreaterThan(labelWidth("abc"));
    expect(cellNameWidth("abcdef")).toBeGreaterThan(cellNameWidth("abc"));
  });
});

describe("fixedObstacles", () => {
  it("has one box per cell name, or none when names are hidden", () => {
    expect(fixedObstacles(model)).toHaveLength(model.cells.length);
    expect(fixedObstacles(model, false)).toEqual([]);
  });
});

describe("placeLabels", () => {
  const overlaps = (first: { cx: number; cy: number; w: number; h: number }, second: typeof first) =>
    Math.abs(first.cx - second.cx) < (first.w + second.w) / 2 && Math.abs(first.cy - second.cy) < (first.h + second.h) / 2;

  it("keeps labels for figures on the same spot from overlapping each other", () => {
    const figures: Figure[] = [
      { name: "Alpha", group: "g", x: 2, y: 1.5 },
      { name: "Bravo", group: "g", x: 2, y: 1.5 },
      { name: "Charlie", group: "g", x: 2, y: 1.5 },
    ];

    const boxes = placeLabels({ ...model, cells: [] }, figures).map((placedLabel) => placedLabel.box);

    expect(boxes).toHaveLength(3);
    expect(overlaps(boxes[0], boxes[1])).toBe(false);
    expect(overlaps(boxes[0], boxes[2])).toBe(false);
    expect(overlaps(boxes[1], boxes[2])).toBe(false);
  });

  it("places a label for every figure in the real data, inside the grid", () => {
    const placed = placeLabels(model, model.figures);

    expect(placed).toHaveLength(model.figures.length);

    for (const placedLabel of placed) {
      expect(placedLabel.box.cy).toBeGreaterThan(GRID_Y0);
      expect(placedLabel.box.cy).toBeLessThan(GRID_Y0 + GRID_H);
    }
  });
});
