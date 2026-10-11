/** Labels for the owner pills in the rule of authorship page (colors live in styles.css). */
import type { Owner } from "./types";

export const OWNER_LABELS: Record<Owner, string> = {
  arneson: "Arneson",
  gygax: "Gygax",
  kuntz: "Kuntz",
  kask: "Kask",
  ernie: "Ernie Gygax",
  others: "Other contributors",
  joint: "Joint / Chainmail-rooted",
  disputed: "Disputed",
};
