import details from "../../../../../../data/astronomy-targets/astronomy-target-details.json";
import { formatHour, formatSize, surfaceBrightness } from "../../../model/calculate";
import type { ScoredTarget, TargetDetails } from "../../../model/types";

const DETAILS = details as Record<string, TargetDetails>;

/** Longest value that fits in a small stat tile; longer facts are listed as sentences instead. */
const TILE_MAX = 28;

/** Stat tiles for the numbers, then the description and how to find it. */
export function previewStats(scoredTarget: ScoredTarget) {
  const t = scoredTarget.target;
  const extra = DETAILS[t.id];
  const tiles: [string, string][] = [
    ["Magnitude", t.magnitude.toFixed(1)],
    ["Size", formatSize(t.major, t.minor)],
  ];

  if (t.type !== "Star" && !t.planet && t.type !== "Moon")
    tiles.push(["Surface br.", `${surfaceBrightness(t).toFixed(1)}`]);

  if (extra) tiles.push(["Distance", extra.distance]);
  tiles.push([
    "Best time",
    `${t.bestSeason === "any" ? "Any season" : t.bestSeason[0].toUpperCase() + t.bestSeason.slice(1)}${scoredTarget.bestHour === null ? "" : `, ${formatHour(scoredTarget.bestHour)}`}`,
  ]);
  tiles.push([
    "Peak altitude",
    scoredTarget.peakAltitude > 0 ? `${scoredTarget.peakAltitude.toFixed(0)}°` : "below horizon",
  ]);
  const notes: { label: string; value: string }[] = [];

  for (const f of extra?.facts ?? []) f.value.length <= TILE_MAX ? tiles.push([f.label, f.value]) : notes.push(f);

  return { tiles, notes, extra };
}
