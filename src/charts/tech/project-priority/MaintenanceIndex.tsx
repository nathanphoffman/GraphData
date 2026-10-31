import { useState } from "react";
import { heat } from "../top-rankings/RankingCells";
import { DEFAULT_AI_USE as aiUse, type NFactorResult, PERCENT, maintenance } from "../top-rankings/maintenance";
import { type Ranking, fractionBetween } from "../top-rankings/score";

/** An n-Factor is shown in deci-ns (dn): n x 10, to this many decimals. */
const DN_DIGITS = 1;
const DECI = 10;

/** The Average Quality card is red at this quality. */
const LOWEST_QUALITY_HEAT = 50;

/** The Average Quality slider moves in tenths of a percent. */
const QUALITY_STEP = 0.1;

const lines = (count: number) => Math.round(count).toLocaleString();

/** n-Factor as deci-ns, so 6.75n is 67.5. */
const deciNs = (n: number) => Math.round(n * DECI * 10 ** DN_DIGITS) / 10 ** DN_DIGITS;

/** The heat colour of a deci-n value: blue from 67 to 68, green 66-67 and 68-69, yellow 65-66 and 69-70, red outside 65-70. */
export function deciNHeat(dn: number): { backgroundColor: string } {
  const hue = dn >= GOAL_LOW && dn <= GOAL_HIGH ? 215 : dn >= 66 && dn <= 69 ? 120 : dn >= 65 && dn <= 70 ? 55 : 0;

  return { backgroundColor: `hsl(${hue} 65% 45% / 0.35)` };
}

/** The blue goal, in deci-ns. */
const [GOAL_LOW, GOAL_HIGH] = [67, 68];

/** Which way a deci-n value has to move to reach the blue goal: up, down, or a checkmark when it is already there. */
const goalMark = (dn: number) => (dn < GOAL_LOW ? "↑" : dn > GOAL_HIGH ? "↓" : "✓");

/** How many deci-ns the value is from the nearest edge of the blue goal, 0 inside it. */
const goalDistance = (dn: number) => Math.abs(dn < GOAL_LOW ? GOAL_LOW - dn : dn > GOAL_HIGH ? dn - GOAL_HIGH : 0);

const FACTOR_DESCRIPTIONS = {
  Current: "The n-Factor of today's lines, minus (average quality - 75) / 100",
  Future: "The n-Factor if every project grows by its xLines, minus (average quality - 75) / 100",
  Projected: "Current (25%) and Future (75%) n-Factors averaged",
};

/** One n-factor card: the centi-n value with its equivalent lines, manual equivalent lines and the lines in decommissioned projects. */
function FactorCard({ name, result }: { name: keyof typeof FACTOR_DESCRIPTIONS; result: NFactorResult }) {
  const dn = deciNs(result.graded);

  return (
    <div style={deciNHeat(dn)} title={`${FACTOR_DESCRIPTIONS[name]}. Shown in deci-ns (dn): 67.5dn is 6.75n. Decommissioned projects count at 1/6 of their lines. Manual takes the Extent of AI Use off the n-Factor first`}>
      <dt>{name}</dt>
      <dd>{dn.toFixed(DN_DIGITS)}dn <span title="Which way, and how far, to move to reach the blue goal of 67-68dn">{goalMark(dn)}{dn < GOAL_LOW || dn > GOAL_HIGH ? <small className="rankings-index-delta"> Δ{dn < GOAL_LOW ? "+" : "-"}{goalDistance(dn).toFixed(DN_DIGITS)}</small> : null}</span></dd>
      <small>{lines(result.equivalentLines)} Lines eq.</small>
      <small>{lines(result.manualLines)} Manual Lines eq.</small>
      <small className="rankings-index-decom">({lines(result.decommissionedLines)} Lines in Decom)</small>
    </div>
  );
}

/** The code maintenance summary for rankings that have lines and quality columns. */
export function MaintenanceIndex({ ranking }: { ranking: Ranking }) {
  const [qualityOverride, setQualityOverride] = useState<number | null>(null);
  const actual = maintenance(ranking, aiUse);
  const result = maintenance(ranking, aiUse, qualityOverride ?? undefined);

  if (!result || !actual) return null;

  return (
    <section className="rankings-index">
      <h3>Code Maintenance Index</h3>
      <label title="Average quality used in the numbers below. It starts at the real average; move it to see what the n-factors would be at a different quality.">
        Average Quality: {result.averageQuality.toFixed(1)}%{" "}
        <input type="range" min={0} max={PERCENT} step={QUALITY_STEP} value={result.averageQuality} onChange={(changeEvent) => setQualityOverride(Number(changeEvent.target.value))} />
        {qualityOverride !== null && <button type="button" onClick={() => setQualityOverride(null)}>Reset to {actual.averageQuality.toFixed(1)}%</button>}
      </label>
      <dl>
        <div style={heat(fractionBetween(result.averageQuality, LOWEST_QUALITY_HEAT, PERCENT))} title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines (decommissioned projects at 1/6)">
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <FactorCard name="Current" result={result.current} />
        <FactorCard name="Future" result={result.future} />
        <FactorCard name="Projected" result={result.projected} />
      </dl>
    </section>
  );
}
