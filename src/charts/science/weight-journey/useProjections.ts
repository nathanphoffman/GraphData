import { useMemo } from "react";
import { projectTapering } from "./calculate";
import { DAYS_PER_MONTH, DAYS_PER_YEAR } from "./constants";
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
export function useProjections(tool: ProjectionTool, unitFactor: number, lines: Lines, fatRatio: number | null, { dailyRows, fit: trendFit, future, withMuscle }: Model) {
  const monthlyLoss = Number(tool.lossInput) / unitFactor;
  const aheadDays = Math.round(Number(tool.months) * DAYS_PER_MONTH);
  const ahead = aheadDays > 0 ? aheadDays : DAYS_PER_YEAR;

  // Tapering projection: only when a monthly loss was entered, starting from the latest average and muscle gain.
  const tapered = useMemo(() => {
    if (!tool.lossInput || !(monthlyLoss > 0) || !(aheadDays > 0)) return null;
    const lastRow = dailyRows[dailyRows.length - 1];
    const lastMuscle = withMuscle[withMuscle.length - 1];

    return projectTapering(lastRow.date, lastRow.avg3, lastMuscle.muscleTotal, monthlyLoss, lastMuscle.muscleDaily, aheadDays);
  }, [tool.lossInput, monthlyLoss, aheadDays, dailyRows, withMuscle]);

  const fatProjection = useMemo(() => (fatRatio === null ? null : buildFat(fatRatio, withMuscle)), [fatRatio, withMuscle]);
  const allTrend = useMemo(() => (lines.allTrend ? buildAllTrend(dailyRows, ahead, fatProjection) : null), [lines.allTrend, ahead, fatProjection, dailyRows]);
  const spread = useMemo(() => (lines.spread ? buildSpread(dailyRows, ahead) : null), [lines.spread, ahead, dailyRows]);
  const general = useMemo(() => buildGeneral(dailyRows, ahead, [trendFit[trendFit.length - 1], ...future]), [ahead, dailyRows, trendFit, future]);

  return { tapered, allTrend, spread, general, fat: fatProjection };
}
