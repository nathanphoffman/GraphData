import { useState } from "react";
import NumberSlider from "../../components/NumberSlider";
import { MANUAL_AI_N, maintenance, type NFactorResult, PERCENT } from "../top-rankings/maintenance";
import { heat } from "../top-rankings/RankingCells";
import { fractionBetween, type Ranking } from "../top-rankings/score";
import { deciNHeat } from "./deciNHeat";
import { LanguagePie } from "./LanguagePie";

/** An n-Factor is shown in deci-ns (dn): n x 10, to this many decimals. */
const DN_DIGITS = 1;
const DECI = 10;

/** The Average Quality card is red at this quality. */
const LOWEST_QUALITY_HEAT = 50;

/** The Average Quality slider moves in tenths of a percent. */
const QUALITY_STEP = 0.1;

/** The Target dn slider runs from 60 to 70 in quarter steps, and starts at 67.5. */
const [TARGET_MIN, TARGET_MAX, TARGET_STEP, DEFAULT_TARGET] = [60, 70, 0.25, 67.5];

/** The goal reaches this far (in dn) either side of the target; the arrows point at it and the checkmark shows inside it. */
const GOAL_REACH = 0.5;

const lines = (count: number) => Math.round(count).toLocaleString();

/** n-Factor as deci-ns, so 6.75n is 67.5. */
const deciNs = (n: number) => Math.round(n * DECI * 10 ** DN_DIGITS) / 10 ** DN_DIGITS;

/** Which way a deci-n value has to move to reach the target's goal: up, down, or a checkmark when it is already there. */
const goalMark = (dn: number, target: number) =>
  dn < target - GOAL_REACH ? "↑" : dn > target + GOAL_REACH ? "↓" : "✓";

/** How many deci-ns the value is from the nearest edge of the goal, 0 inside it. */
const goalDistance = (dn: number, target: number) => Math.max(0, Math.abs(dn - target) - GOAL_REACH);

const FACTOR_DESCRIPTIONS = {
  Current: "The n-Factor of today's lines, minus the Avg n Adj",
  Future: "The n-Factor if every project grows by its xLines, minus the Avg n Adj",
  Projected: "Current (25%) and Future (75%) n-Factors averaged",
};

/** One n-factor card: the centi-n value with its equivalent lines, manual equivalent lines and the lines in paused projects. */
function FactorCard({
  name,
  result,
  target,
}: {
  name: keyof typeof FACTOR_DESCRIPTIONS;
  result: NFactorResult;
  target: number;
}) {
  const dn = deciNs(result.graded);

  return (
    <div
      style={deciNHeat(dn, target)}
      title={`${FACTOR_DESCRIPTIONS[name]}. Shown in deci-ns (dn): 67.5dn is 6.75n. Paused projects count at 1/6 of their lines. Manual Eq takes ${MANUAL_AI_N}n (AI) off the n-Factor first`}
    >
      <dt>{name}</dt>
      <dd>
        {dn.toFixed(DN_DIGITS)}dn{" "}
        <span title={`Which way, and how far, to move to reach the goal around ${target}dn`}>
          {goalMark(dn, target)}
          {goalDistance(dn, target) > 0 ? (
            <small className="rankings-index-delta">
              {" "}
              Δ{dn < target ? "+" : "-"}
              {goalDistance(dn, target).toFixed(DN_DIGITS)}
            </small>
          ) : null}
        </span>
      </dd>
      <small>{lines(result.equivalentLines)} Lines eq.</small>
      <small>
        {lines(result.manualLines)} Manual Eq @ -{MANUAL_AI_N}n
      </small>
      <small className="rankings-index-decom">({lines(result.decommissionedLines)} Lines Paused)</small>
    </div>
  );
}

/** The code maintenance summary for rankings that have lines and quality columns. */
export function MaintenanceIndex({ ranking }: { ranking: Ranking }) {
  const [qualityOverride, setQualityOverride] = useState<number | null>(null);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const actual = maintenance(ranking);
  const result = maintenance(ranking, qualityOverride ?? undefined);

  if (!result || !actual) return null;

  return (
    <section className="rankings-index">
      <div className="rankings-index-top">
        <LanguagePie ranking={ranking} />
        <div className="rankings-index-sliders">
          <label title="Average quality used in the numbers below. It starts at the real average; move it to see what the n-factors would be at a different quality.">
            Average Quality: {result.averageQuality.toFixed(1)}%{" "}
            <NumberSlider
              range={{ min: 0, max: PERCENT, step: QUALITY_STEP }}
              value={result.averageQuality}
              onChange={setQualityOverride}
            />
            {qualityOverride !== null && (
              <button type="button" onClick={() => setQualityOverride(null)}>
                Reset to {actual.averageQuality.toFixed(1)}%
              </button>
            )}
          </label>
          <label title="Target dn: the deci-n you are aiming for. The cards are richest green at it, fading to yellow past 1dn, orange past 1.5dn and deep red past 2.5dn; the arrows show which way to move.">
            Target dn: {target.toFixed(2)}{" "}
            <NumberSlider
              range={{ min: TARGET_MIN, max: TARGET_MAX, step: TARGET_STEP }}
              value={target}
              onChange={setTarget}
            />
            {target !== DEFAULT_TARGET && (
              <button type="button" onClick={() => setTarget(DEFAULT_TARGET)}>
                Reset to {DEFAULT_TARGET}
              </button>
            )}
          </label>
        </div>
      </div>
      <dl>
        <div
          style={heat(fractionBetween(result.averageQuality, LOWEST_QUALITY_HEAT, PERCENT))}
          title="Each project's Familiarity and Computed Quality averaged, then averaged across projects weighted by their lines (paused projects at 1/6)"
        >
          <dt>Average Quality</dt>
          <dd>{result.averageQuality.toFixed(1)}%</dd>
        </div>
        <div
          title={
            result.fromLanguages
              ? "Each language's net n (average quality out of 1, divided by the language's burden score, minus 0.25), averaged by lines across all projects. It is taken off the n-Factors. Shown in deci-ns (dn)."
              : "No project has language lines yet, so this is (average quality - 75) / 100. Shown in deci-ns (dn)."
          }
        >
          <dt>Avg n Adj</dt>
          <dd>{deciNs(result.adjustment).toFixed(DN_DIGITS)}dn</dd>
        </div>
        <FactorCard name="Current" result={result.current} target={target} />
        <FactorCard name="Future" result={result.future} target={target} />
        <FactorCard name="Projected" result={result.projected} target={target} />
      </dl>
    </section>
  );
}
