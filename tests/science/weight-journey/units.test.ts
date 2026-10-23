import { describe, expect, it } from "vitest";
import { makeFormat } from "../../../src/charts/science/weight-journey/model/units";

describe("makeFormat", () => {
  it("shows pounds as stored", () => {
    expect(makeFormat("lb").w(150)).toBe("150.0");
  });

  it("converts to kilograms for display", () => {
    expect(makeFormat("kg").w(100)).toBe("45.4");
  });

  it("puts a plus sign on gains only", () => {
    const { signed } = makeFormat("lb");

    expect(signed(2)).toBe("+2.0");
    expect(signed(-2)).toBe("-2.0");
  });
});
