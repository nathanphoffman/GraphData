import { useMemo } from "react";
import { projectTapering } from "./calculate";
import { buildAllTrend, buildGeneral, buildSpread } from "./model/curves";
import { type Model, buildFat } from "./model/rows";

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
export function useProjections(tool: ProjectionTool, k: number, lines: Lines, fatRatio: number | null, { dailyRows, fit, future, withMuscle }: Model) {
  const monthlyLoss = Number(tool.lossInput) / k;
  const aheadDays = Math.round(Number(tool.months) * 30);
  const ahead = aheadDays > 0 ? aheadDays : 365;

  // Tapering projection: only when a monthly loss was entered, starting from the latest average and muscle gain.
  const tapered = useMemo(() => {
    if (!tool.lossInput || !(monthlyLoss > 0) || !(aheadDays > 0)) return null;
    const lastRow = dailyRows[dailyRows.length - 1];
    const lastMuscle = withMuscle[withMuscle.length - 1];

    return projectTapering(lastRow.date, lastRow.avg3, lastMuscle.muscleTotal, monthlyLoss, lastMuscle.muscleDaily, aheadDays);
  }, [tool.lossInput, monthlyLoss, aheadDays, dailyRows, withMuscle]);

  const fat = useMemo(() => (fatRatio === null ? null : buildFat(fatRatio, withMuscle)), [fatRatio, withMuscle]);
  const allTrend = useMemo(() => (lines.allTrend ? buildAllTrend(dailyRows, ahead, fat) : null), [lines.allTrend, ahead, fat, dailyRows]);
  const spread = useMemo(() => (lines.spread ? buildSpread(dailyRows, ahead) : null), [lines.spread, ahead, dailyRows]);
  const general = useMemo(() => buildGeneral(dailyRows, ahead, [fit[fit.length - 1], ...future]), [ahead, dailyRows, fit, future]);

  return { tapered, allTrend, spread, general, fat };
}
