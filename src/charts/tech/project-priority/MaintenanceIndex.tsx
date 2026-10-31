import { useState } from "react";
import { heat } from "../top-rankings/RankingCells";
import { DEFAULT_AI_USE as aiUse, FUTURE_WEIGHT, PERCENT, maintenance, maintenancePercent } from "../top-rankings/maintenance";
import { type Ranking, fractionBetween } from "../top-rankings/score";

/** The n-Factor is shown to this many decimals. */
const N_FACTOR_DIGITS = 3;

/** The Average Quality card is red at this quality. */
const LOWEST_QUALITY_HEAT = 50;

/** The Average Quality slider moves in tenths of a percent. */
const QUALITY_STEP = 0.1;

const lines = (count: number) => Math.round(count).toLocaleString();

/** The code maintenance summary for rankings that have lines and quality columns. */
export function MaintenanceIndex({ ranking }: { ranking: Ranking }) {
  const [qualityOverride, setQualityOverride] = useState<number | null>(null);
  const actual = maintenance(ranking, aiUse);
  const result = maintenance(ranking, aiUse, qualityOverride ?? undefined);

  if (!result || !actual) return null;

  return (
    <section className="rankings-index">
      <h3>Code Maintenance Index</h3>
      <label title="Average quality used in the numbers below. It starts at the real average; move it to see what the maintenance numbers would be at a different quality.">
        Average Quality: {result.averageQuality.toFixed(1)}%{" "}
        <input type="range" min={0} max={PERCENT} step={QUALITY_STEP} value={result.averageQuality} onChange={(changeEvent) => setQualityOverride(Number(changeEvent.target.value))} />
        {qualityOverride !== null && <button type="button" onClick={() => setQualityOverride(null)}>Reset to {actual.averageQuality.toFixed(1)}%</button>}
      </label>
      <dl>
        <div style={heat(fractionBetween(result.averageQuality, LOWEST_QUALITY_HEAT, PERCENT))} title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines">
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <div style={heat(maintenancePercent(result.gradedNFactor, aiUse) / PERCENT)} title="Total n-Factor minus (average quality - 75) / 100">
          <dt>Graded n-Factor</dt>
          <dd>{result.gradedNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{lines(result.warmLines)} lines warm</small>
          <small>{lines(result.coldLines)} lines cold</small>
          <small>{Math.round(result.gradedManualLines).toLocaleString()} lines manual</small>
        </div>
        <div style={heat(maintenancePercent(result.gradedFutureNFactor, aiUse) / PERCENT)} title="The n-Factor if every project grows by its xLines, minus (average quality - 75) / 100">
          <dt>Graded Future n-Factor</dt>
          <dd>{result.gradedFutureNFactor.toFixed(N_FACTOR_DIGITS)}</dd>
          <small>{lines(result.futureWarmLines)} lines warm</small>
          <small>{lines(result.futureColdLines)} lines cold</small>
          <small>{Math.round(result.gradedFutureManualLines).toLocaleString()} lines manual</small>
        </div>
        <div style={heat(result.maintenancePercent / PERCENT)} title="Graded n-Factor (25%) and Graded Future n-Factor (75%) averaged, then turned into a percent: 100% when the manual n-Factor (n-Factor minus the Extent of AI Use) is 5 or less, falling in a straight line to 0% at 10. The lines are the same average without the quality adjustment (as if quality were 75) turned back into lines (n^n). Manual takes the Extent of AI Use off the n-Factor first">
          <dt>Code Maintenance</dt>
          <dd>{result.maintenancePercent.toFixed(1)}%</dd>
          <small>{result.combinedNFactor.toFixed(N_FACTOR_DIGITS)} n-Factor</small>
          <small>{lines(result.warmLines * (1 - FUTURE_WEIGHT) + result.futureWarmLines * FUTURE_WEIGHT)} lines warm</small>
          <small>{lines(result.coldLines * (1 - FUTURE_WEIGHT) + result.futureColdLines * FUTURE_WEIGHT)} lines cold</small>
          <small>{lines(result.equivalentLines)} lines equivalent</small>
          <small>{Math.round(result.manualLines).toLocaleString()} lines manual</small>
        </div>
      </dl>
    </section>
  );
}
