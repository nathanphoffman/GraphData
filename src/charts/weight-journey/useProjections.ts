import { useMemo } from "react";
import { projectTapering } from "./calculate";
import { buildAllTrend, buildGeneral, buildSpread } from "./model/curves";
import { dailyRows, fit, future, withMuscle } from "./model/rows";

export interface Lines {
  quadratic: boolean;
  general: boolean;
  allTrend: boolean;
  spread: boolean;
}

export interface ProjectionTool {
  lossInput: string;
  months: string;
}

/** The tapering projection from the typed monthly loss, plus the optional trend, spread and general curves. */
export function useProjections(tool: ProjectionTool, k: number, lines: Lines) {
  const monthlyLoss = Number(tool.lossInput) / k;
  const aheadDays = Math.round(Number(tool.months) * 30);
  const ahead = aheadDays > 0 ? aheadDays : 365;

  // Tapering projection: only when a monthly loss was entered, starting from the latest average and muscle gain.
  const tapered = useMemo(() => {
    if (!tool.lossInput || !(monthlyLoss > 0) || !(aheadDays > 0)) return null;
    const lastRow = dailyRows[dailyRows.length - 1];
    const lastMuscle = withMuscle[withMuscle.length - 1];
    return projectTapering(lastRow.date, lastRow.avg3, lastMuscle.muscleTotal, monthlyLoss, lastMuscle.muscleDaily, aheadDays);
  }, [tool.lossInput, monthlyLoss, aheadDays]);

  const allTrend = useMemo(() => (lines.allTrend ? buildAllTrend(dailyRows, ahead) : null), [lines.allTrend, ahead]);
  const spread = useMemo(() => (lines.spread ? buildSpread(dailyRows, ahead) : null), [lines.spread, ahead]);
  const general = useMemo(() => buildGeneral(dailyRows, ahead, [fit[fit.length - 1], ...future]), [ahead]);

  return { tapered, allTrend, spread, general };
}
