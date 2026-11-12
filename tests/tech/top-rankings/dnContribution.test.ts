import { describe, expect, it } from "vitest";
import { dnContributions } from "../../../src/charts/top-rankings/dnContribution";
import { maintenance } from "../../../src/charts/top-rankings/maintenance/maintenance";

const columns = [
  { label: "Completed Lines" },
  { label: "Familiarity" },
  { label: "Computed Quality" },
  { label: "Tech Lines" },
];

describe("dnContributions", () => {
  // Deor is rated much easier than Rust, so the same lines in Deor add less to the n-Factor.
  const items = [
    { name: "Deor project", values: [20000, 5, 90, "Deor 20000"] },
    { name: "Rust project", values: [20000, 5, 90, "Rust 20000"] },
    { name: "Poor Rust project", values: [20000, 5, 40, "Rust 20000"] },
  ];
  const ranking = { id: "x", title: "x", columns, items };
  const contributions = dnContributions(ranking);

  it("gives the same lines a smaller share in an easier language", () => {
    expect(contributions.get("Deor project")).toBeLessThan(contributions.get("Rust project") ?? 0);
  });

  it("gives the same lines a bigger share at a lower quality", () => {
    expect(contributions.get("Poor Rust project")).toBeGreaterThan(contributions.get("Rust project") ?? 0);
  });

  it("adds up to the current n-Factor in dn", () => {
    const total = [...contributions.values()].reduce((runningTotal, share) => runningTotal + share, 0);

    expect(total).toBeCloseTo((maintenance(ranking)?.current.graded ?? 0) * 10, 6);
  });

  it("is empty when there are no lines", () => {
    expect(dnContributions({ id: "x", title: "x", columns, items: [] }).size).toBe(0);
  });
});
