import { describe, expect, it } from "vitest";
import { formatNeurons, scoreAnimals, sortAnimals } from "../../../src/charts/science/neuron-intelligence/calculate";

const human = { name: "Human", neuronsBillions: 86, weightKg: 70 };
const mouse = { name: "Mouse", neuronsBillions: 0.07, weightKg: 0.02 };
const linear = { x: 1, w: 1, k: 1 };

describe("scoreAnimals", () => {
  it("scores neurons per kilogram and rates humans at 100%", () => {
    const [scoredHuman, scoredMouse] = scoreAnimals([human, mouse], linear);

    expect(scoredHuman.score).toBeCloseTo((86e9) / 70);
    expect(scoredHuman.humanPercent).toBeCloseTo(100);
    expect(scoredMouse.humanPercent).toBeCloseTo(((0.07e9 / 0.02) / (86e9 / 70)) * 100);
  });

  it("gives NaN percentages when there is no human to compare with", () => {
    const [scoredMouse] = scoreAnimals([mouse], linear);

    expect(scoredMouse.humanPercent).toBeNaN();
  });
});

describe("sortAnimals", () => {
  const rows = scoreAnimals([human, mouse], linear);

  it("sorts names alphabetically in either direction", () => {
    expect(sortAnimals(rows, "name", true).map((a) => a.name)).toEqual(["Human", "Mouse"]);
    expect(sortAnimals(rows, "name", false).map((a) => a.name)).toEqual(["Mouse", "Human"]);
  });

  it("sorts numbers and leaves the input untouched", () => {
    expect(sortAnimals(rows, "weightKg", true).map((a) => a.name)).toEqual(["Mouse", "Human"]);
    expect(rows[0].name).toBe("Human");
  });
});

describe("formatNeurons", () => {
  it("uses exponent form only for tiny counts", () => {
    expect(formatNeurons(0.0005)).toBe("5.0e-4");
    expect(formatNeurons(86)).toBe("86");
  });
});
