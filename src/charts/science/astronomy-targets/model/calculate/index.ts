import type { Target } from "../types";
import { clamp } from "./sky";
export * from "./settings";
export * from "./sky";
export * from "./brightness";
export * from "./scoring";
export * from "./schedule";

/** Apparent size as text: "point", arcseconds under 1′, or arcminutes. */
export function formatSize(major: number, minor: number): string {
  if (major === 0) return "point";

  if (major < 1) return `${Math.round(major * 60)}″`;
  const fmt = (value: number) => (value >= 10 ? value.toFixed(0) : value.toFixed(1));

  return major === minor ? `${fmt(major)}′` : `${fmt(major)}′ × ${fmt(minor)}′`;
}

/** 22 becomes "10 PM", 0 becomes "12 AM". */
export const formatHour = (height: number) => `${height % 12 === 0 ? 12 : height % 12} ${height < 12 ? "AM" : "PM"}`;

export interface Difficulty {
  label: string;
  /** 0 (hardest) to 1 (easiest), for colouring. */
  level: number;
}

/** Faintest star seen with the naked eye under each Bortle class (1-9), roughly. */
const NAKED_EYE_LIMIT = [7.6, 7.1, 6.6, 6.2, 5.6, 5.1, 4.6, 4.1, 4.0];

/** A star counts as "Naked Eye" when it is at least 1.5 magnitudes brighter than the faintest star you can see at this Bortle. */
export function isNakedEye(target: Target, bortle: number): boolean {
  const pos = clamp(bortle, 1, 9) - 1;
  const lowest = Math.floor(pos);
  const limit = NAKED_EYE_LIMIT[lowest] + (NAKED_EYE_LIMIT[Math.min(8, lowest + 1)] - NAKED_EYE_LIMIT[lowest]) * (pos - lowest);

  return target.type === "Star" && target.magnitude <= limit - 1.5;
}

/** Plain-words difficulty to see a target, from its score. */
export function difficulty(score: number): Difficulty {
  if (score >= 75) return { label: "Excellent", level: 1 };

  if (score >= 50) return { label: "Very easy", level: 0.85 };

  if (score >= 35) return { label: "Easy", level: 0.65 };

  if (score >= 20) return { label: "Moderate", level: 0.45 };

  if (score >= 10) return { label: "Hard", level: 0.25 };

  if (score > 0) return { label: "Very hard", level: 0.1 };

  return { label: "Extreme", level: 0 };
}
