import { describe, expect, it } from "vitest";
import { dnContributions } from "../../../src/charts/top-rankings/dnContribution";

const columns = [
  { label: "Completed Lines" },
  { label: "Familiarity" },
  { label: "Computed Quality" },
  { label: "Tech Lines" },
];

describe("dnContributions", () => {
  // Deor is rated much easier than Rust, so a lot of Deor lines pulls the language average (and the n-Factor) down.
  const items = [
    { name: "Deor project", values: [20000, 5, 90, "Deor 20000"] },
    { name: "Rust project", values: [20000, 5, 90, "Rust 20000"] },
    { name: "Small project", values: [500, 5, 90, "Python 500"] },
  ];
  const contributions = dnContributions({ id: "x", title: "x", columns, items });

  it("gives every item's code a share above zero, even in an easy language", () => {
    expect(contributions.get("Deor project")).toBeGreaterThan(0);
    expect(contributions.get("Rust project")).toBeGreaterThan(0);
    expect(contributions.get("Small project")).toBeGreaterThan(0);
  });

  it("gives the same lines the same share whatever the language", () => {
    expect(contributions.get("Deor project")).toBeCloseTo(contributions.get("Rust project") ?? 0, 6);
  });

  it("is empty when there are no lines", () => {
    expect(dnContributions({ id: "x", title: "x", columns, items: [] }).size).toBe(0);
  });
});
