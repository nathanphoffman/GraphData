import { describe, expect, it } from "vitest";
import { CHART_HEIGHT, MARGIN, CHART_WIDTH, arrowPoints, buildYScale, lineSegments, makeXAt } from "../../../src/charts/tech/language-outlook/model/layout";
import type { LanguageOutlookData, LanguageRecord } from "../../../src/charts/tech/language-outlook/model/types";

const language = (name: string, values: Record<string, number | null>) => ({ name, values, tiobe: {}, pop: {} }) as LanguageRecord;

describe("buildYScale", () => {
  const model = {
    series: ["a"],
    lines: ["b"],
    languages: [language("X", { a: 23, b: 5 }), language("Y", { a: 7, b: 41 })],
  } as unknown as LanguageOutlookData;

  it("rounds the top up to the next 10 across everything shown", () => {
    expect(buildYScale(model, { a: true, b: true }).domain()).toEqual([0, 50]);
  });

  it("ignores hidden series and never goes below 10", () => {
    expect(buildYScale(model, { a: true, b: false }).domain()).toEqual([0, 30]);
    expect(buildYScale(model, { a: false, b: false }).domain()).toEqual([0, 10]);
  });

  it("maps zero to the bottom of the plot", () => {
    expect(buildYScale(model, { a: true }).range()).toEqual([CHART_HEIGHT - MARGIN.bottom, MARGIN.top]);
  });
});

describe("arrowPoints", () => {
  const tipY = (change: number) => Number(arrowPoints(100, 100, change).split(" ")[0].split(",")[1]);

  it("points up for gains and down for losses", () => {
    expect(tipY(2)).toBeLessThan(100);
    expect(tipY(-2)).toBeGreaterThan(100);
  });

  it("grows with the size of the change but stops at a maximum", () => {
    expect(Math.abs(tipY(5) - 100)).toBeGreaterThan(Math.abs(tipY(1) - 100));
    expect(tipY(50)).toBe(tipY(500));
  });
});

describe("makeXAt", () => {
  it("spaces languages evenly inside the margins", () => {
    const xOfIndex = makeXAt(4);

    expect(xOfIndex(1) - xOfIndex(0)).toBeCloseTo(xOfIndex(2) - xOfIndex(1));
    expect(xOfIndex(0)).toBeGreaterThan(MARGIN.left);
    expect(xOfIndex(3)).toBeLessThan(CHART_WIDTH - MARGIN.right);
  });
});

describe("lineSegments", () => {
  const xOfIndex = (index: number) => index * 10;

  const yOfValue = (value: number) => value;

  it("splits a line wherever a value is missing", () => {
    const langs = [1, 2, null, 3, 4].map((value, index) => language(`L${index}`, { k: value }));

    expect(lineSegments(langs, "k", xOfIndex, yOfValue)).toEqual(["0,1 10,2", "30,3 40,4"]);
  });

  it("drops stretches that are a single point", () => {
    const langs = [1, null, 3].map((value, index) => language(`L${index}`, { k: value }));

    expect(lineSegments(langs, "k", xOfIndex, yOfValue)).toEqual([]);
  });
});
