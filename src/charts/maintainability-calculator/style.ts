/** Tier colors and labels for the maintainability calculator. */
import type { Tier } from "./types";

/** Ordered easiest to hardest; a position falls into the first tier whose bound it does not pass. */
export const TIERS: Tier[] = [
  { name: "Trivial", upTo: -1, background: "#2b8a3e", color: "#fff" },
  { name: "Very Easy", upTo: -0.67, background: "#40a05a", color: "#fff" },
  { name: "Easy", upTo: -0.33, background: "#82c91e", color: "#1b1f24" },
  { name: "Slightly Easy", upTo: -0.1, background: "#c0eb75", color: "#1b1f24" },
  { name: "Normal", upTo: 0.1, background: "#4dabf7", color: "#1b1f24" },
  { name: "Slightly Hard", upTo: 0.33, background: "#ffd43b", color: "#1b1f24" },
  { name: "Hard", upTo: 0.67, background: "#ff922b", color: "#1b1f24" },
  { name: "Very Hard", upTo: 1, background: "#f03e3e", color: "#fff" },
  { name: "Impossible", upTo: Infinity, background: "#862e2e", color: "#fff" },
];
