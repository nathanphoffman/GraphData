import { describe, expect, it } from "vitest";
import { type Params, simulate, simulateRun, summarize, unguidedness } from "../../../src/charts/tech/code-quality-entropy/simulate";

const params: Params = { commits: 50, commitImpact: 0.05, baseCommits: 300, baseEntropy: 0.061, startingQuality: 1, intuition: 0.75 };

describe("code quality entropy model", () => {
  it("is fully guided at intuition 1 and most unguided at 0", () => {
    expect(unguidedness(1)).toBe(1);
    expect(unguidedness(0)).toBeCloseTo(Math.E);
  });

  it("has one more point than commits, all between 0 and 1", () => {
    const run = simulateRun(params);
    expect(run).toHaveLength(51);
    expect(run.every((quality) => quality >= 0 && quality <= 1)).toBe(true);
  });

  it("drops when every commit is bad and stays at the top when every commit is good", () => {
    const allBad = simulateRun(params, () => 0);
    const allGood = simulateRun(params, () => 0.999);
    expect(allBad[50]).toBeLessThan(allBad[0]);
    expect(allGood[50]).toBe(1);
  });

  it("summarizes the average, lowest and highest per commit", () => {
    const { average, low, high } = summarize([
      [1, 0.5],
      [1, 0.7],
    ]);
    expect(average[1]).toBeCloseTo(0.6);
    expect(low).toEqual([1, 0.5]);
    expect(high).toEqual([1, 0.7]);
    expect(simulate(params, 5)).toHaveLength(5);
  });
});
